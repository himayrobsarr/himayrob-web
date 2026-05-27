# Import Guide

## 1. Prepare Postgres

Run:

```sql
\i docs/postgres-booking-schema.sql
```

Or paste the content of `docs/postgres-booking-schema.sql` into your database
client.

## 2. Import Availability Workflow

Import this file in n8n:

```text
docs/n8n/workflows/consulting-availability.json
```

After importing:

1. Open `Google Calendar - Busy Events`.
2. Select your Google Calendar credential.
3. Confirm the calendar ID. The workflow uses `$env.GOOGLE_CALENDAR_ID`.
4. Open `Postgres - Busy Bookings`.
5. Select your Postgres credential.
6. Save the workflow.
7. Activate it.

## 3. n8n Environment Variables

Set these in n8n:

```env
GOOGLE_CALENDAR_ID=your_calendar_id
```

Postgres should be configured as an n8n credential. In your current setup, use
the `hostinger_db` credential and query the `consulting` schema.

## 4. Test The Webhook

Use the production webhook URL from n8n and send:

```json
{
  "date": "2026-05-14",
  "durationHours": 2,
  "timezone": "America/Bogota",
  "source": "web-consultoria-horas"
}
```

Expected response:

```json
{
  "ok": true,
  "slots": [
    {
      "start": "2026-05-14T15:00:00.000Z",
      "end": "2026-05-14T17:00:00.000Z",
      "label": "10:00 - 12:00"
    }
  ]
}
```

Important: if labels show shifted hours, check the n8n server timezone and the
Code node output. The frontend can consume ISO dates, but the label should be
shown in `America/Bogota`.

## 5. Connect Frontend

In `.env`, set:

```env
VITE_N8N_CONSULTING_AVAILABILITY_WEBHOOK=https://your-n8n-domain/webhook/consulting/availability
```

Restart Vite after changing `.env`.

## 6. What To Validate In Browser

On `/consultoria`:

- Select `1`, `2`, or `3` hours.
- Select a weekday.
- Slots should appear.
- Select Sunday. It should return no slots.
- Select Saturday with `3 horas`. The last valid start should be `11:00`.
- Select Saturday with `1 hora`. The last valid start should be `13:00`.

## Notes

- The workflow is intentionally inactive after import.
- Credentials are placeholders and must be selected inside n8n.
- If your n8n version imports the nodes but flags parameter differences, keep
  the Code nodes and reconnect Google Calendar/Postgres using the UI.

## Import Init Payment Workflow

Import:

```text
docs/n8n/workflows/consulting-init-payment.json
```

After importing:

1. Select the `hostinger_db` credential in `Postgres - Create Pending Booking`.
2. Open `Sign Wompi Integrity`.
3. Replace `REPLACE_WITH_WOMPI_PUBLIC_KEY` with the Wompi public key.
4. Replace `REPLACE_WITH_WOMPI_INTEGRITY_SECRET` with the Wompi integrity secret.
5. Save.
6. Test with `webhook-test/consulting/init-payment`.
7. Activate only after the test response returns `ok: true`.

This workflow writes only into the `consulting` schema:

- `consulting.leads`
- `consulting.bookings`
- `consulting.payments`

## Import Wompi Transaction Workflow

Import:

```text
docs/n8n/workflows/wompi-transaction-updated.json
```

After importing:

1. Select the `hostinger_db` credential in `Postgres - Update Payment And Booking`.
2. Open `Validate Wompi Event`.
3. Replace `REPLACE_WITH_WOMPI_EVENTS_SECRET` with the Wompi events secret.
4. Save.
5. Test with `webhook-test/wompi/transaction-updated`.
6. Activate when the checksum test passes.

Register this URL in Wompi events:

```text
https://n8n.himayrob.com/webhook/wompi/transaction-updated
```

This workflow validates the Wompi event checksum before updating:

- `consulting.webhook_events`
- `consulting.payments`
- `consulting.bookings`

For `APPROVED`, the booking becomes `paid`. For `DECLINED`, `VOIDED` or
`ERROR`, the booking becomes `cancelled`.

## Import Test Payment Workflow

Before importing, make sure `consulting.bookings` supports test bookings:

```sql
alter table consulting.bookings
add column if not exists is_test boolean not null default false;

alter table consulting.bookings
drop constraint if exists consulting_bookings_amount_matches_duration;

alter table consulting.bookings
add constraint consulting_bookings_amount_matches_duration
check (
  amount_in_cents = duration_hours * 75000 * 100
  or (is_test = true and amount_in_cents in (150000, 100000, 10000, 100))
);
```

Import:

```text
docs/n8n/workflows/consulting-init-payment-test.json
```

After importing:

1. Select `hostinger_db` in `Postgres - Create Test Booking`.
2. Open `Sign Wompi Test Integrity`.
3. Replace `REPLACE_WITH_WOMPI_PUBLIC_KEY`.
4. Replace `REPLACE_WITH_WOMPI_INTEGRITY_SECRET`.
5. Activate or test with:

```text
https://n8n.himayrob.com/webhook-test/consulting/init-payment-test
```

Payload:

```json
{
  "testAmountInCents": 150000
}
```

Wompi usually requires at least `$1.500 COP` for a real checkout. If you need to retry with another test amount, use:

```json
{
  "testAmountInCents": 100000
}
```
