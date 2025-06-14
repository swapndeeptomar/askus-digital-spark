
-- Create testimonials table for dynamic client reviews
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_initial CHAR(1), -- For avatar circle like "A"
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Optionally, enable RLS if you want to restrict access:
-- ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read" ON public.testimonials FOR SELECT USING (true);
-- CREATE POLICY "Anyone can insert" ON public.testimonials FOR INSERT WITH CHECK (true);

