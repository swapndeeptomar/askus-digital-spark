-- Create the missing updated_at function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create current_partner table for active partners with task assignment
CREATE TABLE public.current_partner (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_id uuid NOT NULL REFERENCES public.digital_partners(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  domain text NOT NULL,
  experience text,
  skills text,
  portfolio text,
  resume_url text,
  status text NOT NULL DEFAULT 'active',
  
  -- Task assignment fields
  current_task_title text,
  current_task_description text,
  current_task_image_url text,
  current_task_document_url text,
  current_task_deadline date,
  task_status text DEFAULT 'pending',
  
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  UNIQUE(user_id),
  UNIQUE(partner_id)
);

-- Enable RLS
ALTER TABLE public.current_partner ENABLE ROW LEVEL SECURITY;

-- Policies for current_partner
CREATE POLICY "Users can view their own partner data" 
ON public.current_partner 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all current partners" 
ON public.current_partner 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert current partners" 
ON public.current_partner 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update current partners" 
ON public.current_partner 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete current partners" 
ON public.current_partner 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update digital_partners table to require user_id
ALTER TABLE public.digital_partners 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create updated_at trigger for current_partner
CREATE TRIGGER update_current_partner_updated_at
BEFORE UPDATE ON public.current_partner
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();