
-- Create the blogs table to store blog posts
CREATE TABLE public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  cover_image_url text,
  author text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security on the blogs table
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public (anyone) to select (read) blog posts
CREATE POLICY "Public read" ON public.blogs
  FOR SELECT
  USING (true);
