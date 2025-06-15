
-- 1. Create the app_role enum if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END
$$;

-- 2. Create the user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 3. Add RLS to user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Function: check if a user is admin
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- 5. RLS policies for blogs table
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- a) Allow public (everyone) to read blogs (remains unchanged)
DROP POLICY IF EXISTS "Public read" ON public.blogs;
CREATE POLICY "Public read" ON public.blogs
  FOR SELECT
  USING (true);

-- b) Allow only admin users to insert blogs
CREATE POLICY "Admin can insert blog posts" ON public.blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- c) Allow only admin users to update blogs
CREATE POLICY "Admin can update blog posts" ON public.blogs
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- d) Allow only admin users to delete blogs
CREATE POLICY "Admin can delete blog posts" ON public.blogs
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
