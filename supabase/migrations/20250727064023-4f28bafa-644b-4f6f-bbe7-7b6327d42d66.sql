-- Fix RLS and security issues for missing tables
ALTER TABLE public.chatbot ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for chatbot table
CREATE POLICY "Admin can view all chatbot messages" 
ON public.chatbot 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Allow insert to all for chatbot" 
ON public.chatbot 
FOR INSERT 
WITH CHECK (true);

-- Create policies for payments table
CREATE POLICY "Admin can view all payments" 
ON public.payments 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin can insert payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for user_roles table
CREATE POLICY "Admin can view all user roles" 
ON public.user_roles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin can insert user roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create policies for about_stats table
CREATE POLICY "Public can view about stats" 
ON public.about_stats 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can update about stats" 
ON public.about_stats 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix function security by setting search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix has_role function security
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
SECURITY DEFINER
SET search_path = public
LANGUAGE sql
STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;
