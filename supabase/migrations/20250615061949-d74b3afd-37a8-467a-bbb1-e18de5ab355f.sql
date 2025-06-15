
-- Create a new table to store quotes
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  project_details text not null,
  selected_services jsonb not null,
  total_estimate numeric not null,
  pdf_filename text not null,
  pdf_url text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS) (allow all for demo, restrict as needed)
alter table public.quotes enable row level security;

-- Allow anyone to insert (can be tightened up for authenticated scenarios)
drop policy if exists "Allow insert to all" on public.quotes;

create policy "Allow insert to all" on public.quotes
  for insert
  with check (true);

-- Allow anyone to select (optional, for admin or debugging)
drop policy if exists "Allow select to all" on public.quotes;

create policy "Allow select to all" on public.quotes
  for select
  using (true);
