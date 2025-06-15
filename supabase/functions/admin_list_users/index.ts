
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Database } from "../_shared/database.types.ts";

serve(async (req) => {
  // Admin service key is provided in env on the edge runtime in Lovable
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const supabase = createClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  // Parse page & pageSize from query params
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "0");
  const pageSize = Number(searchParams.get("pageSize") || "10");
  const from = page * pageSize;
  const to = from + pageSize - 1;

  // Query auth.users directly
  const { data, error } = await supabase
    .from("users", { schema: "auth" })
    .select("id, email, created_at")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify({ users: data }), {
    headers: { "Content-Type": "application/json" },
  });
});
