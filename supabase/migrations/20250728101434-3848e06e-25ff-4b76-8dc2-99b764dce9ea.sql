-- Add missing task lifecycle fields to current_partner table
ALTER TABLE public.current_partner 
ADD COLUMN IF NOT EXISTS completed_by_partner boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS verified_by_admin boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS feedback_rating integer CHECK (feedback_rating >= 1 AND feedback_rating <= 5);

-- Fix RLS policies for admin access to payments and chatbot tables
-- Remove restrictive policies and add admin-friendly ones

-- Update chatbot policies
DROP POLICY IF EXISTS "Admin can view all chatbot messages" ON public.chatbot;
DROP POLICY IF EXISTS "Allow insert to all for chatbot" ON public.chatbot;

CREATE POLICY "Admins can manage chatbot messages" 
ON public.chatbot 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR auth.uid() IS NULL);

CREATE POLICY "Allow insert for chatbot from public" 
ON public.chatbot 
FOR INSERT 
WITH CHECK (true);

-- Update payments policies  
DROP POLICY IF EXISTS "Admin can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Admin can insert payments" ON public.payments;

CREATE POLICY "Admins can manage payments" 
ON public.payments 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for partner files if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('partner-files', 'partner-files', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for partner files
CREATE POLICY "Admins can upload partner files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'partner-files' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view partner files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'partner-files' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Partners can view their files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'partner-files');