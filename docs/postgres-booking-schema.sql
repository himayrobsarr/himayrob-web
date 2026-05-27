-- Booking MVP schema for Himayrob consultations.
-- Run this in the Postgres database used by n8n and the private panel.

create extension if not exists pgcrypto;
create extension if not exists btree_gist;

do $$
begin
  create type booking_status as enum (
    'pending_payment',
    'paid',
    'cancelled',
    'expired',
    'rescheduled'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type payment_status as enum (
    'pending',
    'approved',
    'declined',
    'voided',
    'error'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  business_type text,
  need_type text,
  project_stage text,
  message text,
  source text not null default 'web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id),
  status booking_status not null default 'pending_payment',
  duration_hours integer not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  timezone text not null default 'America/Bogota',
  amount_in_cents integer not null,
  currency text not null default 'COP',
  wompi_reference text not null unique,
  wompi_transaction_id text unique,
  google_calendar_event_id text unique,
  meet_url text,
  expires_at timestamptz not null default now() + interval '15 minutes',
  paid_at timestamptz,
  cancelled_at timestamptz,
  rescheduled_from_booking_id uuid references bookings(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_duration_range check (duration_hours between 1 and 3),
  constraint bookings_amount_matches_duration check (
    amount_in_cents = duration_hours * 75000 * 100
  ),
  constraint bookings_positive_range check (ends_at > starts_at),
  constraint bookings_duration_matches_range check (
    ends_at = starts_at + (duration_hours || ' hours')::interval
  ),
  constraint bookings_hourly_start check (
    extract(minute from starts_at at time zone 'America/Bogota') = 0
    and extract(second from starts_at at time zone 'America/Bogota') = 0
  ),
  constraint bookings_hourly_end check (
    extract(minute from ends_at at time zone 'America/Bogota') = 0
    and extract(second from ends_at at time zone 'America/Bogota') = 0
  ),
  constraint bookings_allowed_window check (
    (
      extract(isodow from starts_at at time zone 'America/Bogota') between 1 and 5
      and extract(isodow from ends_at at time zone 'America/Bogota') between 1 and 6
    )
    or (
      extract(isodow from starts_at at time zone 'America/Bogota') = 6
      and extract(isodow from ends_at at time zone 'America/Bogota') = 6
      and (ends_at at time zone 'America/Bogota')::time <= time '14:00'
    )
  )
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id),
  wompi_transaction_id text unique,
  wompi_reference text not null,
  status payment_status not null default 'pending',
  amount_in_cents integer not null,
  currency text not null default 'COP',
  payment_method_type text,
  status_message text,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reschedule_requests (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id),
  requested_starts_at timestamptz not null,
  requested_ends_at timestamptz not null,
  reason text,
  status text not null default 'requested',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_name text not null,
  external_id text,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, external_id)
);

create index if not exists idx_leads_email on leads (lower(email));
create index if not exists idx_bookings_status_starts_at on bookings (status, starts_at);
create index if not exists idx_bookings_wompi_reference on bookings (wompi_reference);
create index if not exists idx_payments_booking_id on payments (booking_id);

alter table bookings
  drop constraint if exists bookings_no_confirmed_overlap;

alter table bookings
  add constraint bookings_no_confirmed_overlap
  exclude using gist (
    tstzrange(starts_at, ends_at, '[)') with &&
  )
  where (status in ('pending_payment', 'paid'));

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_leads_updated_at on leads;
create trigger set_leads_updated_at
before update on leads
for each row execute function set_updated_at();

drop trigger if exists set_bookings_updated_at on bookings;
create trigger set_bookings_updated_at
before update on bookings
for each row execute function set_updated_at();

drop trigger if exists set_payments_updated_at on payments;
create trigger set_payments_updated_at
before update on payments
for each row execute function set_updated_at();
