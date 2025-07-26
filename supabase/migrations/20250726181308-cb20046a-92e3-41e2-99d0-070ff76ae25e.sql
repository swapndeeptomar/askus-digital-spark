-- Create digital_partners table
CREATE TABLE public.digital_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  domain TEXT NOT NULL,
  experience TEXT,
  skills TEXT,
  portfolio TEXT,
  message TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.digital_partners ENABLE ROW LEVEL SECURITY;

-- Create policies for digital_partners
CREATE POLICY "Allow insert to all" 
ON public.digital_partners 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow select to admins" 
ON public.digital_partners 
FOR SELECT 
USING (true);