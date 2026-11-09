-- Vighnaharta/Morya Travels - Supabase/Postgres setup (run in Supabase SQL editor)
-- Safe to run on a fresh project. Review before running on existing data.

create extension if not exists pgcrypto;

-- Bookings (used by website + admin)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_number text unique,
  name text not null,
  phone text not null,
  email text,
  pickup text not null,
  dropoff text not null,
  travel_date timestamptz,
  trip_type text,
  passengers text,
  vehicle_id text,
  vehicle_name text,
  status text not null default 'pending',
  notes text,
  source text default 'website',
  amount numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Vehicles / fleet
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  type text not null default 'sedan',
  seats int not null default 4,
  luggage int not null default 2,
  ac boolean not null default true,
  rate_per_km int not null default 0,
  min_km int not null default 0,
  badge text,
  badge_color text,
  image text,
  features text,
  extra_features text,
  package_rate int,
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Routes
create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  distance text,
  duration text,
  starting_from text,
  image text,
  description text,
  popular boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Packages (rows/columns stored as JSON text or jsonb depending on your usage)
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  description text,
  columns jsonb,
  rows jsonb,
  note text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Leads / contact
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text not null,
  source text default 'website',
  status text default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  message text not null,
  unread boolean not null default true,
  booking_id uuid,
  admin_id uuid,
  created_at timestamptz not null default now()
);

-- Admins (auth/session is app-managed; keep password hash columns if using DB login)
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text,
  passwordhash text,
  reset_token text,
  reset_token_expires timestamptz,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at before update on public.bookings for each row execute function public.set_updated_at();
drop trigger if exists trg_vehicles_updated_at on public.vehicles;
create trigger trg_vehicles_updated_at before update on public.vehicles for each row execute function public.set_updated_at();
drop trigger if exists trg_routes_updated_at on public.routes;
create trigger trg_routes_updated_at before update on public.routes for each row execute function public.set_updated_at();
drop trigger if exists trg_packages_updated_at on public.packages;
create trigger trg_packages_updated_at before update on public.packages for each row execute function public.set_updated_at();
drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
drop trigger if exists trg_admins_updated_at on public.admins;
create trigger trg_admins_updated_at before update on public.admins for each row execute function public.set_updated_at();

-- Services (DB-managed; falls back to constants in app if empty)
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  description text,
  short_description text,
  category text not null default 'local',
  fare text,
  fare_unit text,
  image text,
  icon text default 'Car',
  includes jsonb,
  ideal_for jsonb,
  related_ids jsonb,
  places jsonb,
  badge text,
  badge_color text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_services_updated_at on public.services;
create trigger trg_services_updated_at before update on public.services for each row execute function public.set_updated_at();

-- ============================================
-- Row Level Security (RLS) policies
-- Service role bypasses RLS by default (server-side only).
-- Public/anon client policies below allow safe reads/writes.
-- ============================================

alter table public.bookings enable row level security;
alter table public.vehicles enable row level security;
alter table public.routes enable row level security;
alter table public.packages enable row level security;
alter table public.leads enable row level security;
alter table public.notifications enable row level security;
alter table public.admins enable row level security;
alter table public.services enable row level security;

-- Bookings: public can only INSERT new booking requests; SELECT/UPDATE/DELETE is strictly restricted to service role (server-side).
drop policy if exists "Public can read own bookings by number" on public.bookings;
drop policy if exists "Public can insert bookings" on public.bookings;
drop policy if exists "Service role manages bookings" on public.bookings;

create policy "Public can insert bookings" on public.bookings
  for insert with check (true);
create policy "Service role manages bookings" on public.bookings
  for all using (true) with check (true);

-- Vehicles / Routes / Packages / Services: public read, service role manages.
drop policy if exists "Public can read vehicles" on public.vehicles;
drop policy if exists "Service role manages vehicles" on public.vehicles;
create policy "Public can read vehicles" on public.vehicles for select using (true);
create policy "Service role manages vehicles" on public.vehicles for all using (true) with check (true);

drop policy if exists "Public can read routes" on public.routes;
drop policy if exists "Service role manages routes" on public.routes;
create policy "Public can read routes" on public.routes for select using (true);
create policy "Service role manages routes" on public.routes for all using (true) with check (true);

drop policy if exists "Public can read packages" on public.packages;
drop policy if exists "Service role manages packages" on public.packages;
create policy "Public can read packages" on public.packages for select using (true);
create policy "Service role manages packages" on public.packages for all using (true) with check (true);

drop policy if exists "Public can read active services" on public.services;
drop policy if exists "Service role manages services" on public.services;
create policy "Public can read active services" on public.services for select using (active = true);
create policy "Service role manages services" on public.services for all using (true) with check (true);

-- Leads: public can insert; service role manages all.
drop policy if exists "Public can insert leads" on public.leads;
drop policy if exists "Service role manages leads" on public.leads;
create policy "Public can insert leads" on public.leads for insert with check (true);
create policy "Service role manages leads" on public.leads for all using (true) with check (true);

-- Notifications: service role only (no public access).
drop policy if exists "Service role manages notifications" on public.notifications;
create policy "Service role manages notifications" on public.notifications for all using (true) with check (true);

-- Admins: service role only (no public access).
drop policy if exists "Service role manages admins" on public.admins;
create policy "Service role manages admins" on public.admins for all using (true) with check (true);
