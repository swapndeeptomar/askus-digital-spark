
-- Create a table for user-submitted chatbot issues
CREATE TABLE public.chatbot (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_input TEXT NOT NULL,
  source VARCHAR(32) NOT NULL, -- e.g., 'technical_support', 'other_financial', 'general_inquiry'
  user_email TEXT,             -- optional, if you want to associate with email (can set via future auth, or chatbot collection)
  page_path TEXT               -- optional, record the path where the user submitted
);

-- (Optional) Enable RLS, but since chatbot issues can be non-auth, we'll skip RLS for now unless you request.
