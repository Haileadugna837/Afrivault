-- Foundry production backend: identity, memberships, benefits, events, RSVP,
-- partner verification, analytics, email outbox and public media storage.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create table if not exists public.profiles (
  id text primary key,
  user_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  name text not null,
  phone text default '', city text default '', organization text default '', title text default '',
  role text not null check (role in ('admin','founder','employee','student','unemployed')),
  status text not null default 'active' check (status in ('active','suspended','expired')),
  verification text not null default 'pending' check (verification in ('verified','pending','rejected')),
  expires date, notes text default '', excluded_benefit_ids text[] not null default '{}',
  preferences jsonb not null default '{}', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id text primary key, email text not null, name text not null, role text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  data jsonb not null default '{}', submitted_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.benefit_categories (
  id text primary key, name text not null, color text not null, icon text default '◇', sort_order int not null default 0, updated_at timestamptz not null default now()
);

create table if not exists public.benefits (
  id text primary key, brand text not null, title text not null, category_id text references public.benefit_categories(id),
  label text default '', member_value text default '', color text default '#c8fa48', text_color text default '#151613',
  description text default '', partnership_description text default '', company_description text default '',
  eligibility text[] not null default '{}', featured boolean not null default false,
  status text not null default 'draft' check (status in ('active','draft','archived')),
  visual_mode text not null default 'color' check (visual_mode in ('color','image')),
  image_url text, gallery text[] not null default '{}', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id text primary key, user_id uuid unique references auth.users(id) on delete set null,
  email text unique not null, company text not null, contact_name text default '',
  status text not null default 'active' check (status in ('active','suspended')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.partner_benefits (
  partner_id text references public.partners(id) on delete cascade,
  benefit_id text references public.benefits(id) on delete cascade,
  primary key (partner_id, benefit_id)
);

create table if not exists public.events (
  id text primary key, title text not null, organizer text not null, event_type text not null, custom_type text default '',
  summary text default '', description text default '', status text not null default 'draft' check (status in ('published','draft','cancelled')),
  featured boolean not null default false, start_at timestamptz not null, end_at timestamptz not null,
  timezone text not null default 'Africa/Addis_Ababa', rsvp_deadline timestamptz not null, capacity int not null default 1,
  guest_policy text not null default 'members-only', format text not null default 'in-person', venue text default '', address text default '',
  latitude double precision, longitude double precision, map_label text default '', online_link text default '',
  cost_type text default 'free', price text default '', agenda text default '', requirements text default '', dress_code text default '',
  age_restriction text default '', accessibility text default '', accessibility_options text[] not null default '{}',
  photography_policy text default 'allowed', id_requirement text default 'none', id_requirement_custom text default '',
  contact_email text default '', contact_phone text default '', eligibility text[] not null default '{}',
  visual_mode text not null default 'color', color text default '#c8fa48', image_url text,
  allow_day_selection boolean not null default false, open_registration boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.event_people (
  id text primary key, event_id text not null references public.events(id) on delete cascade,
  type text not null check (type in ('organizer','speaker','host','sponsor')),
  name text not null, title text default '', description text default '', website text default '', image_url text, sort_order int not null default 0
);

create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(), event_id text not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('going','maybe','not-going','cancelled')),
  email text default '', attendance_days date[] not null default '{}', guest_requested boolean not null default false,
  guest_name text default '', guest_email text default '', guest_status text default 'not-requested',
  updated_at timestamptz not null default now(), unique(event_id,user_id)
);

create table if not exists public.guest_registrations (
  id text primary key, event_id text not null references public.events(id) on delete cascade,
  name text not null, email text not null, phone text default '', organization text default '',
  attendance_days date[] not null default '{}', status text not null default 'going', created_at timestamptz not null default now()
);

create table if not exists public.saved_benefits (
  user_id uuid references auth.users(id) on delete cascade, benefit_id text references public.benefits(id) on delete cascade,
  created_at timestamptz not null default now(), primary key(user_id,benefit_id)
);

create table if not exists public.benefit_events (
  id bigint generated always as identity primary key, benefit_id text not null references public.benefits(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null, event_name text not null check (event_name in ('click','claim')),
  created_at timestamptz not null default now()
);

create table if not exists public.usage_logs (
  id text primary key, partner_id text not null references public.partners(id), benefit_id text references public.benefits(id),
  member_id text not null references public.profiles(id), verified_at timestamptz not null default now(),
  status text not null default 'verified' check (status in ('verified','redeemed','not_used','rejected')),
  updated_at timestamptz not null default now(), metadata jsonb not null default '{}'
);

create table if not exists public.admin_settings (
  id text primary key default 'community', settings jsonb not null default '{}', updated_at timestamptz not null default now()
);
create table if not exists public.email_outbox (
  id uuid primary key default gen_random_uuid(), recipient text not null, template text not null,
  payload jsonb not null default '{}', status text not null default 'queued', provider_id text, error text,
  created_at timestamptz not null default now(), sent_at timestamptz
);
create table if not exists public.audit_logs (
  id bigint generated always as identity primary key, actor_id uuid, action text not null, entity_type text not null,
  entity_id text, metadata jsonb not null default '{}', created_at timestamptz not null default now()
);
create table if not exists public.rate_limits (
  key text primary key, window_start timestamptz not null default now(), request_count int not null default 0
);
create or replace function public.consume_rate_limit(p_key text,p_limit int default 5,p_window_seconds int default 3600)
returns boolean language plpgsql security definer set search_path=public as $$
declare current_count int;
begin
  insert into public.rate_limits(key,window_start,request_count) values(p_key,now(),1)
  on conflict(key) do update set
    window_start=case when public.rate_limits.window_start < now()-make_interval(secs=>p_window_seconds) then now() else public.rate_limits.window_start end,
    request_count=case when public.rate_limits.window_start < now()-make_interval(secs=>p_window_seconds) then 1 else public.rate_limits.request_count+1 end
  returning request_count into current_count;
  return current_count<=p_limit;
end $$;

do $$ begin
  create trigger profiles_updated before update on public.profiles for each row execute function public.set_updated_at();
exception when duplicate_object then null; end $$;
do $$ begin
  create trigger applications_updated before update on public.applications for each row execute function public.set_updated_at();
exception when duplicate_object then null; end $$;
do $$ begin
  create trigger benefits_updated before update on public.benefits for each row execute function public.set_updated_at();
exception when duplicate_object then null; end $$;
do $$ begin
  create trigger partners_updated before update on public.partners for each row execute function public.set_updated_at();
exception when duplicate_object then null; end $$;
do $$ begin
  create trigger events_updated before update on public.events for each row execute function public.set_updated_at();
exception when duplicate_object then null; end $$;

create or replace function public.current_profile_role() returns text
language sql stable security definer set search_path=public as $$
  select role from public.profiles where user_id=auth.uid() limit 1
$$;
create or replace function public.current_partner_id() returns text
language sql stable security definer set search_path=public as $$
  select id from public.partners where user_id=auth.uid() and status='active' limit 1
$$;
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path=public as $$
  select coalesce(public.current_profile_role()='admin',false)
$$;

alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.benefit_categories enable row level security;
alter table public.benefits enable row level security;
alter table public.partners enable row level security;
alter table public.partner_benefits enable row level security;
alter table public.events enable row level security;
alter table public.event_people enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.guest_registrations enable row level security;
alter table public.saved_benefits enable row level security;
alter table public.benefit_events enable row level security;
alter table public.usage_logs enable row level security;
alter table public.admin_settings enable row level security;
alter table public.email_outbox enable row level security;
alter table public.audit_logs enable row level security;

create policy "profile own or admin read" on public.profiles for select to authenticated using (user_id=auth.uid() or public.is_admin());
create policy "profile own update" on public.profiles for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "applications public create" on public.applications for insert to anon,authenticated with check (true);
create policy "applications admin manage" on public.applications for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "categories authenticated read" on public.benefit_categories for select to authenticated using (true);
create policy "categories admin manage" on public.benefit_categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "benefits eligible read" on public.benefits for select to authenticated using (
  public.is_admin() or (status='active' and public.current_profile_role()=any(eligibility)) or
  exists(select 1 from public.partner_benefits pb where pb.benefit_id=id and pb.partner_id=public.current_partner_id())
);
create policy "benefits admin manage" on public.benefits for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "partners own or admin read" on public.partners for select to authenticated using (user_id=auth.uid() or public.is_admin());
create policy "partner benefits own or admin read" on public.partner_benefits for select to authenticated using (partner_id=public.current_partner_id() or public.is_admin());
create policy "events eligible read" on public.events for select to authenticated using (public.is_admin() or (status='published' and public.current_profile_role()=any(eligibility)));
create policy "events public open read" on public.events for select to anon using (status='published' and open_registration);
create policy "events admin manage" on public.events for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "event people visible event" on public.event_people for select to anon,authenticated using (exists(select 1 from public.events e where e.id=event_id));
create policy "event people admin manage" on public.event_people for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "rsvp own" on public.event_rsvps for all to authenticated using (user_id=auth.uid() or public.is_admin()) with check (user_id=auth.uid() or public.is_admin());
create policy "guest public create" on public.guest_registrations for insert to anon,authenticated with check (exists(select 1 from public.events e where e.id=event_id and e.open_registration));
create policy "guest admin read" on public.guest_registrations for select to authenticated using (public.is_admin());
create policy "saved own" on public.saved_benefits for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "benefit events create" on public.benefit_events for insert to authenticated with check (user_id=auth.uid());
create policy "benefit events admin read" on public.benefit_events for select to authenticated using (public.is_admin());
create policy "usage partner admin read" on public.usage_logs for select to authenticated using (partner_id=public.current_partner_id() or public.is_admin());
create policy "usage partner admin update" on public.usage_logs for update to authenticated using (partner_id=public.current_partner_id() or public.is_admin());
create policy "admin settings admin" on public.admin_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "email admin read" on public.email_outbox for select to authenticated using (public.is_admin());
create policy "audit admin read" on public.audit_logs for select to authenticated using (public.is_admin());

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values
  ('benefit-images','benefit-images',true,3145728,array['image/jpeg','image/png','image/webp']),
  ('event-images','event-images',true,5242880,array['image/jpeg','image/png','image/webp']),
  ('profile-images','profile-images',true,3145728,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
create policy "public media read" on storage.objects for select to public using (bucket_id in ('benefit-images','event-images','profile-images'));
create policy "admin media insert" on storage.objects for insert to authenticated with check (bucket_id in ('benefit-images','event-images','profile-images') and public.is_admin());
create policy "admin media update" on storage.objects for update to authenticated using (bucket_id in ('benefit-images','event-images','profile-images') and public.is_admin());
create policy "admin media delete" on storage.objects for delete to authenticated using (bucket_id in ('benefit-images','event-images','profile-images') and public.is_admin());

grant execute on function public.current_profile_role() to anon,authenticated;
grant execute on function public.current_partner_id() to anon,authenticated;
grant execute on function public.is_admin() to anon,authenticated;
revoke all on function public.consume_rate_limit(text,int,int) from public,anon,authenticated;
