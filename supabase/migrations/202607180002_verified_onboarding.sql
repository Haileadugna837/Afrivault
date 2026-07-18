-- Verified membership onboarding: application credentials live only in Auth,
-- approval gates email verification, and member access gates phone verification.

alter table public.applications
  add column if not exists auth_user_id uuid unique references auth.users(id) on delete set null,
  add column if not exists phone text not null default '',
  add column if not exists preferred_otp_channel text not null default 'whatsapp',
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by uuid references auth.users(id) on delete set null;

do $$ begin
  alter table public.applications add constraint applications_otp_channel_check
    check (preferred_otp_channel in ('whatsapp','telegram'));
exception when duplicate_object then null; end $$;

create unique index if not exists applications_open_email_unique
  on public.applications (lower(email)) where status in ('pending','approved');

alter table public.profiles
  add column if not exists onboarding_status text not null default 'complete',
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by uuid references auth.users(id) on delete set null,
  add column if not exists phone_verified_at timestamptz,
  add column if not exists phone_verification_channel text;

do $$ begin
  alter table public.profiles add constraint profiles_onboarding_status_check
    check (onboarding_status in ('email_pending','phone_pending','complete'));
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.profiles add constraint profiles_phone_channel_check
    check (phone_verification_channel is null or phone_verification_channel in ('whatsapp','telegram'));
exception when duplicate_object then null; end $$;

create table if not exists public.verification_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  channel text not null check (channel in ('whatsapp','telegram')),
  phone text not null,
  provider_request_id text not null,
  status text not null default 'pending' check (status in ('pending','approved','failed','expired')),
  attempts int not null default 0,
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists verification_challenges_user_created
  on public.verification_challenges (user_id, created_at desc);

do $$ begin
  create trigger verification_challenges_updated before update on public.verification_challenges
    for each row execute function public.set_updated_at();
exception when duplicate_object then null; end $$;

alter table public.verification_challenges enable row level security;
-- No client policy is intentional. Challenges are service-role only.

-- All membership applications and profile mutations go through the validated
-- Vercel API. This prevents clients from bypassing Auth creation or marking
-- their own verification fields as complete.
drop policy if exists "applications public create" on public.applications;
drop policy if exists "profile own update" on public.profiles;

create or replace function public.current_member_is_ready() returns boolean
language sql stable security definer set search_path=public as $$
  select exists(
    select 1 from public.profiles
    where user_id=auth.uid() and status='active' and verification='verified' and onboarding_status='complete'
  )
$$;

grant execute on function public.current_member_is_ready() to authenticated;

drop policy if exists "benefits eligible read" on public.benefits;
create policy "benefits eligible read" on public.benefits for select to authenticated using (
  public.is_admin() or
  exists(select 1 from public.partner_benefits pb where pb.benefit_id=id and pb.partner_id=public.current_partner_id()) or
  (status='active' and public.current_member_is_ready() and public.current_profile_role()=any(eligibility))
);

drop policy if exists "events eligible read" on public.events;
create policy "events eligible read" on public.events for select to authenticated using (
  public.is_admin() or (status='published' and public.current_member_is_ready() and public.current_profile_role()=any(eligibility))
);
