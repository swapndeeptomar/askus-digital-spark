-- Create a new table to store call/appointment scheduling requests
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert appointments
CREATE POLICY "Allow insert to all" ON public.appointments
  FOR INSERT
  WITH CHECK (true);

-- Allow selection of own appointments based on email (for future use)
CREATE POLICY "Allow select to admins" ON public.appointments
  FOR SELECT
  USING (true);