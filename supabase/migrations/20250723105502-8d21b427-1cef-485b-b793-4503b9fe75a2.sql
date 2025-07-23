-- Add RLS policies for admins to update appointment status
CREATE POLICY "Allow admins to update appointments" 
ON public.appointments 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));