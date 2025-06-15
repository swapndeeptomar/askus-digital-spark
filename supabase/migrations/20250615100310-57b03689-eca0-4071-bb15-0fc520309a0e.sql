
-- Create payments table for storing Razorpay/UPI payment details
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  number TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL
);

-- (Optional) You can enable Row Level Security if you want to restrict access
-- ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- (Optional) Policy examples for RLS if desired
-- CREATE POLICY "Allow all access to payments" ON public.payments FOR ALL USING (true);
