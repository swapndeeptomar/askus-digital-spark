
-- Create the contact_messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  mobile text,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.contact_messages enable row level security;

-- Allow anyone to insert messages via WITH CHECK
drop policy if exists "Allow inserts for all users" on public.contact_messages;

create policy "Allow inserts for all users" on public.contact_messages
  for insert
  with check (true);

-- Allow anyone to select (optional, for debugging or admin reads)
drop policy if exists "Allow select for all" on public.contact_messages;

create policy "Allow select for all" on public.contact_messages
  for select
  using (true);
