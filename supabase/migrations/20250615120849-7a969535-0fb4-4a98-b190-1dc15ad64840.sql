
-- Create a table to store About Us stats
CREATE TABLE public.about_stats (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value INTEGER NOT NULL DEFAULT 0
);

-- Insert default stats keys
INSERT INTO public.about_stats (key, value) VALUES
  ('projects_completed', 20),
  ('happy_clients', 25),
  ('team_members', 5),
  ('years_experience', 1);

