
-- Create the storage bucket if it doesn't exist yet
insert into storage.buckets (id, name, public)
values ('quotes-pdfs', 'quotes-pdfs', true)
on conflict (id) do nothing;

-- Grant read access to all users (including anon) for files in this bucket
-- Enable select policy ("download") for public
CREATE POLICY "public read access to quotes-pdfs"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'quotes-pdfs'
  );

-- Optionally: Enable insert/delete/update as well (uncomment if needed for admin UI)
-- CREATE POLICY "public upload quotes-pdfs"
--   ON storage.objects
--   FOR INSERT
--   WITH CHECK (bucket_id = 'quotes-pdfs');

-- CREATE POLICY "public delete quotes-pdfs"
--   ON storage.objects
--   FOR DELETE
--   USING (bucket_id = 'quotes-pdfs');

-- CREATE POLICY "public update quotes-pdfs"
--   ON storage.objects
--   FOR UPDATE
--   USING (bucket_id = 'quotes-pdfs');
