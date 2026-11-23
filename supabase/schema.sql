-- ProductiveScroll database (Stage 2A)
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- Every table has Row-Level Security: a user can only read and change their own rows.

-- 1. Profiles: one row per user, created automatically at sign-up.
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  onboarding_step text not null default 'save' check (onboarding_step in ('save', 'board', 'done')),
  created_at timestamptz not null default now()
);

create function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- 2. Captures: every saved link.
create table captures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  url text not null,
  source text not null,              -- YouTube, TikTok, Instagram, X, Reddit, Pinterest, Substack, Web
  title text,
  author text,
  thumbnail_url text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index captures_user_created on captures (user_id, created_at desc);

-- 3. Boards: canvas holds the saved tldraw layout.
create table boards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  name text not null,
  canvas jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Which captures are on which board (many-to-many).
create table board_captures (
  board_id uuid references boards on delete cascade,
  capture_id uuid references captures on delete cascade,
  added_at timestamptz not null default now(),
  primary key (board_id, capture_id)
);

-- Accounts created before this script ran (your test sign-ups) get a profile too.
insert into profiles (id) select id from auth.users on conflict do nothing;

-- Logged-in users may use these tables; the policies below decide which rows.
grant select, insert, update, delete on profiles, captures, boards, board_captures to authenticated;

-- Row-Level Security
alter table profiles enable row level security;
alter table captures enable row level security;
alter table boards enable row level security;
alter table board_captures enable row level security;

create policy "own profile" on profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

create policy "own captures" on captures
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "own boards" on boards
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- A link is allowed only when both the board and the capture belong to the user.
create policy "own board links" on board_captures
  for all
  using (exists (select 1 from boards where id = board_id and user_id = auth.uid()))
  with check (
    exists (select 1 from boards where id = board_id and user_id = auth.uid())
    and exists (select 1 from captures where id = capture_id and user_id = auth.uid())
  );