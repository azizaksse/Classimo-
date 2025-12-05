import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedAdmin: SupabaseClient | null = null;

export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  if (!cachedAdmin) {
    cachedAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  return cachedAdmin;
};
