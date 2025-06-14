
-- Allow public uploads to the quotes-pdfs bucket

-- Make bucket public (if not already public)
update storage.buckets
  set public = true
  where name = 'quotes-pdfs';

-- Remove any existing policies for clarity
drop policy if exists "Public upload on quotes-pdfs" on storage.objects;
drop policy if exists "Public select on quotes-pdfs" on storage.objects;

-- Allow anyone to upload files to quotes-pdfs
create policy "Public upload on quotes-pdfs"
  on storage.objects
  for insert
  with check (bucket_id = 'quotes-pdfs');

-- Allow anyone to read files from quotes-pdfs
create policy "Public select on quotes-pdfs"
  on storage.objects
  for select
  using (bucket_id = 'quotes-pdfs');
