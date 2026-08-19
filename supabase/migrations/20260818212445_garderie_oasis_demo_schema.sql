-- Garderie Oasis Digital Experience: bounded, multi-tenant demonstration schema.
-- Public tour submissions remain persistence-disabled in the initial release.

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  default_locale text not null default 'en' check (default_locale in ('en', 'fr')),
  created_at timestamptz not null default now()
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  name text not null,
  timezone text not null default 'America/Toronto',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (tenant_id, name)
);
create index locations_tenant_id_idx on public.locations(tenant_id);

create table public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  display_name text not null,
  role text not null check (role in ('director', 'assistant_director', 'educator', 'support')),
  preferred_locale text not null default 'en' check (preferred_locale in ('en', 'fr')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index staff_profiles_tenant_id_idx on public.staff_profiles(tenant_id);
create index staff_profiles_location_id_idx on public.staff_profiles(location_id);

create table public.tour_inquiries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  reference text not null unique,
  guardian_first_name text not null,
  guardian_last_name text not null,
  email text not null check (email = lower(email)),
  phone text not null,
  preferred_language text not null check (preferred_language in ('en', 'fr')),
  preferred_contact_method text not null check (preferred_contact_method in ('email', 'phone')),
  child_age_group text not null check (child_age_group in ('infant', 'toddler', 'preschool')),
  program_interest text not null check (program_interest in ('infant', 'toddler', 'preschool', 'unsure')),
  desired_start_month date not null,
  care_schedule text not null check (care_schedule in ('full_time', 'part_time', 'unsure')),
  preferred_tour_date date not null,
  preferred_tour_time text not null check (preferred_tour_time in ('morning', 'midday', 'afternoon')),
  adult_attendee_count smallint not null check (adult_attendee_count between 1 and 4),
  accessibility_request text check (char_length(accessibility_request) <= 500),
  general_question text check (char_length(general_question) <= 800),
  status text not null default 'new' check (status in ('new', 'reviewing', 'tour_offered', 'confirmed', 'completed', 'follow_up', 'cancelled', 'closed')),
  source text not null default 'website_demo',
  assigned_to uuid references public.staff_profiles(id) on delete set null,
  privacy_notice_version text not null,
  privacy_acknowledged_at timestamptz not null,
  communication_consent boolean not null check (communication_consent),
  communication_consented_at timestamptz not null,
  registry_acknowledgement boolean not null check (registry_acknowledgement),
  registry_acknowledged_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  delete_after timestamptz not null default (now() + interval '24 months')
);
create index tour_inquiries_tenant_id_idx on public.tour_inquiries(tenant_id);
create index tour_inquiries_location_id_idx on public.tour_inquiries(location_id);
create index tour_inquiries_assigned_to_idx on public.tour_inquiries(assigned_to);
create index tour_inquiries_status_created_at_idx on public.tour_inquiries(tenant_id, status, created_at desc);
create index tour_inquiries_delete_after_idx on public.tour_inquiries(delete_after);

create table public.tour_slots (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  capacity smallint not null default 3 check (capacity between 1 and 20),
  reserved_count smallint not null default 0 check (reserved_count >= 0 and reserved_count <= capacity),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (location_id, starts_at)
);
create index tour_slots_tenant_id_idx on public.tour_slots(tenant_id);
create index tour_slots_location_starts_at_idx on public.tour_slots(location_id, starts_at);

create table public.inquiry_events (
  id bigint generated always as identity primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  inquiry_id uuid not null references public.tour_inquiries(id) on delete cascade,
  actor_id uuid references public.staff_profiles(id) on delete set null,
  event_type text not null check (event_type in ('created', 'status_changed', 'note_added', 'proposal_created', 'proposal_approved', 'proposal_rejected')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index inquiry_events_tenant_id_idx on public.inquiry_events(tenant_id);
create index inquiry_events_inquiry_created_at_idx on public.inquiry_events(inquiry_id, created_at desc);

create table public.public_faq_articles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  slug text not null,
  language text not null check (language in ('en', 'fr')),
  question text not null,
  answer text not null,
  status text not null default 'draft' check (status in ('draft', 'approved', 'archived')),
  approved_by uuid references public.staff_profiles(id) on delete set null,
  approved_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (tenant_id, slug, language)
);
create index public_faq_articles_tenant_status_idx on public.public_faq_articles(tenant_id, status);

create table public.ai_proposals (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  inquiry_id uuid not null references public.tour_inquiries(id) on delete cascade,
  proposal_type text not null check (proposal_type in ('reply_draft', 'follow_up_summary')),
  provider text not null default 'deterministic_demo',
  model text not null default 'rules-v1',
  prompt_version text not null,
  proposed_content jsonb not null,
  evidence jsonb not null default '[]'::jsonb,
  warnings jsonb not null default '[]'::jsonb,
  state text not null default 'pending_review' check (state in ('pending_review', 'approved', 'rejected')),
  created_by uuid references public.staff_profiles(id) on delete set null,
  reviewed_by uuid references public.staff_profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index ai_proposals_tenant_id_idx on public.ai_proposals(tenant_id);
create index ai_proposals_inquiry_id_idx on public.ai_proposals(inquiry_id);
create index ai_proposals_state_created_at_idx on public.ai_proposals(tenant_id, state, created_at desc);

create function public.prevent_inquiry_event_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$ begin raise exception 'inquiry_events is append-only'; end; $$;
revoke all on function public.prevent_inquiry_event_mutation() from public, anon, authenticated;
create trigger inquiry_events_append_only before update or delete on public.inquiry_events for each row execute function public.prevent_inquiry_event_mutation();

alter table public.tenants enable row level security; alter table public.tenants force row level security;
alter table public.locations enable row level security; alter table public.locations force row level security;
alter table public.staff_profiles enable row level security; alter table public.staff_profiles force row level security;
alter table public.tour_inquiries enable row level security; alter table public.tour_inquiries force row level security;
alter table public.tour_slots enable row level security; alter table public.tour_slots force row level security;
alter table public.inquiry_events enable row level security; alter table public.inquiry_events force row level security;
alter table public.public_faq_articles enable row level security; alter table public.public_faq_articles force row level security;
alter table public.ai_proposals enable row level security; alter table public.ai_proposals force row level security;

revoke all on all tables in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.public_faq_articles to anon, authenticated;
grant select on public.tenants, public.locations, public.staff_profiles, public.tour_inquiries, public.tour_slots, public.inquiry_events, public.ai_proposals to authenticated;
grant insert, update on public.tour_inquiries, public.tour_slots, public.public_faq_articles, public.ai_proposals to authenticated;
grant insert on public.inquiry_events to authenticated;
grant usage, select on sequence public.inquiry_events_id_seq to authenticated;

create policy faq_public_approved_select on public.public_faq_articles for select to anon using (status = 'approved');
create policy staff_self_select on public.staff_profiles for select to authenticated using (id = (select auth.uid()));
create policy tenant_member_select on public.tenants for select to authenticated using (id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active));
create policy location_member_select on public.locations for select to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active));
create policy inquiry_member_select on public.tour_inquiries for select to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active));
create policy inquiry_director_insert on public.tour_inquiries for insert to authenticated with check (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director')));
create policy inquiry_director_update on public.tour_inquiries for update to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director'))) with check (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director')));
create policy slot_member_select on public.tour_slots for select to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active));
create policy slot_director_write on public.tour_slots for all to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director'))) with check (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director')));
create policy event_member_select on public.inquiry_events for select to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active));
create policy event_member_insert on public.inquiry_events for insert to authenticated with check (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active) and actor_id = (select auth.uid()));
create policy faq_member_select on public.public_faq_articles for select to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active));
create policy faq_director_write on public.public_faq_articles for all to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director'))) with check (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director')));
create policy proposal_member_select on public.ai_proposals for select to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active));
create policy proposal_director_write on public.ai_proposals for all to authenticated using (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director'))) with check (tenant_id in (select sp.tenant_id from public.staff_profiles sp where sp.id = (select auth.uid()) and sp.active and sp.role in ('director','assistant_director')));