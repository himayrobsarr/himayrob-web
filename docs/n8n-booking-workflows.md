# n8n Booking Workflows

This file defines the contracts used by the public React site, Postgres, Wompi,
Google Calendar, WhatsApp Cloud API and Sheets.

## Shared Rules

- Timezone: `America/Bogota`.
- Price: `75000 COP` per hour.
- Durations: `1`, `2`, or `3` hours only.
- Slots start on exact hours only.
- Bookable window: Monday `00:00` through Saturday `14:00`.
- Rest window: Saturday `14:00` through Monday `00:00`.
- Sunday is fully blocked.
- A slot must fit completely inside the bookable window.
- Rebooking is allowed until 6 hours before `starts_at`.
- Temporary payment reservations expire after 15 minutes.
- Before creating a new reservation, expire old `pending_payment` bookings where
  `expires_at < now()`.

## Environment Variables

Frontend variables:

```env
VITE_N8N_CLASS_WEBHOOK=
VITE_N8N_CONSULTING_AVAILABILITY_WEBHOOK=
VITE_N8N_CONSULTING_INIT_PAYMENT_WEBHOOK=
VITE_WOMPI_PUBLIC_KEY=
```

n8n credentials or variables:

```env
POSTGRES_URL=
WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=
WOMPI_INTEGRITY_SECRET=
WOMPI_EVENTS_SECRET=
GOOGLE_CALENDAR_ID=
GOOGLE_SHEETS_ID=
WHATSAPP_CLOUD_PHONE_NUMBER_ID=
WHATSAPP_CLOUD_TOKEN=
PUBLIC_SITE_URL=https://himayrob.com
```

## Workflow 1: Availability

Webhook: `POST /consulting/availability`

Request from frontend:

```json
{
  "date": "2026-05-14",
  "durationHours": 2,
  "timezone": "America/Bogota",
  "source": "web-consultoria-horas"
}
```

Steps:

1. Validate `durationHours` is `1`, `2`, or `3`.
2. Validate `date` is not Sunday.
3. Generate hourly candidate slots for the requested date.
4. Remove slots that end after Saturday `14:00`.
5. Query Google Calendar busy intervals for that day.
6. Query Postgres `consulting.bookings` with status `pending_payment` or `paid`.
7. Remove candidates that overlap Calendar or Postgres busy intervals.
8. Return slots.

Response:

```json
{
  "ok": true,
  "slots": [
    {
      "start": "2026-05-14T10:00:00-05:00",
      "end": "2026-05-14T12:00:00-05:00",
      "label": "10:00 - 12:00"
    }
  ]
}
```

Empty response:

```json
{
  "ok": true,
  "slots": []
}
```

## Workflow 2: Init Payment

Webhook: `POST /consulting/init-payment`

Request from frontend:

```json
{
  "fullName": "Cliente Demo",
  "email": "cliente@example.com",
  "phone": "3001234567",
  "durationHours": 2,
  "selectedDate": "2026-05-14",
  "selectedStart": "2026-05-14T10:00:00-05:00",
  "selectedEnd": "2026-05-14T12:00:00-05:00",
  "businessType": "profesional-independiente",
  "needType": "clase-ia",
  "projectStage": "aprendizaje-cero",
  "message": "Quiero aprender a usar IA en mi trabajo.",
  "source": "web-consultoria-horas",
  "amountInCents": 15000000,
  "currency": "COP",
  "timezone": "America/Bogota"
}
```

Steps:

1. Expire old `pending_payment` bookings.
2. Validate duration, amount, date window and exact-hour start.
3. Re-check Google Calendar and Postgres availability for the selected slot.
4. Upsert or create `lead`.
5. Create `booking` with status `pending_payment`, `expires_at = now() + 15 minutes`.
6. Create `payment` with status `pending`.
7. Generate unique Wompi reference, for example `booking_<booking_id>`.
8. Generate Wompi integrity signature in n8n:
   `reference + amountInCents + currency + WOMPI_INTEGRITY_SECRET`.
9. Return checkout data to frontend.

Response:

```json
{
  "ok": true,
  "reference": "booking_7cc6e7d7",
  "amountInCents": 15000000,
  "currency": "COP",
  "redirectUrl": "https://himayrob.com/consultoria/gracias",
  "integrity": "sha256_hex_generated_in_n8n",
  "publicKey": "pub_prod_xxx"
}
```

## Workflow 3: Wompi Transaction Updated

Webhook: URL configured in Wompi events dashboard.

Important event: `transaction.updated`.

Steps:

1. Store the raw event in `webhook_events`.
2. Validate the Wompi event signature before trusting the payload.
3. Read transaction `reference`, `id`, `status`, `amount_in_cents`, `currency`.
4. Find `booking` by `wompi_reference`.
5. Update `payments`.
6. If status is `APPROVED`:
   - Mark booking as `paid`.
   - Set `wompi_transaction_id`.
   - Set `paid_at`.
   - Create Google Calendar event with Google Meet.
   - Store `google_calendar_event_id` and `meet_url`.
   - Append or update Google Sheets row.
   - Send confirmation email.
   - Send WhatsApp Cloud API template.
7. If status is `DECLINED`, `VOIDED`, or `ERROR`:
   - Update `payments`.
   - Mark booking as `cancelled` or leave it for expiry depending on desired policy.

## Workflow 4: Rebooking Request

This can be added after the first paid-flow works.

Rules:

- Allow only if `starts_at - now() >= interval '6 hours'`.
- User picks a new available slot.
- n8n updates Google Calendar event.
- n8n updates `bookings` or creates a new booking with
  `rescheduled_from_booking_id`.
- Send updated email and WhatsApp template.

## WhatsApp Templates

Use WhatsApp Cloud API approved templates for:

- Payment approved and booking confirmed.
- Meet link sent.
- Rebooking confirmed.
- Reminder before session.

## Notes

- The frontend never receives `WOMPI_PRIVATE_KEY`, `WOMPI_INTEGRITY_SECRET` or
  `WOMPI_EVENTS_SECRET`.
- The redirect page can show the transaction `id` from Wompi, but the definitive
  confirmation should come from the Wompi webhook and/or server-side transaction
  verification.
