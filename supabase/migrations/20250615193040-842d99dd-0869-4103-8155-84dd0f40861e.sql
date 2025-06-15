
-- 1. Create the services table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  icon text, -- optional: you can store an icon name as a string, or a URL if you want to use images
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (RLS) for services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 3. Public (everyone) can read services
DROP POLICY IF EXISTS "Public read" ON public.services;
CREATE POLICY "Public read" ON public.services
  FOR SELECT
  USING (true);

-- 4. Only admins can insert services
DROP POLICY IF EXISTS "Admin can insert services" ON public.services;
CREATE POLICY "Admin can insert services" ON public.services
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Only admins can update services
DROP POLICY IF EXISTS "Admin can update services" ON public.services;
CREATE POLICY "Admin can update services" ON public.services
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. Only admins can delete services
DROP POLICY IF EXISTS "Admin can delete services" ON public.services;
CREATE POLICY "Admin can delete services" ON public.services
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
