import { getSupabaseClient } from "./src/lib/supabaseClient";
import { getSupabaseAdmin } from "./src/lib/supabaseAdminClient";

async function check() {
  console.log("Checking Supabase Config...");
  const client = getSupabaseClient();
  if (client) {
    console.log("✅ Supabase Client initialized (URL and Anon Key present)");
    try {
        const { data, error } = await client.from('test').select('*').limit(1);
        if (error) {
            console.log("⚠️ Connection test failed (might be expected if table doesn't exist):", error.message);
        } else {
            console.log("✅ Connection test successful (or at least no auth error)");
        }
    } catch (e) {
        console.log("❌ Error connecting:", e);
    }
  } else {
    console.log("❌ Supabase Client FAILED to initialize (Missing URL or Anon Key)");
  }

  const admin = getSupabaseAdmin();
  if (admin) {
    console.log("✅ Supabase Admin initialized (Service Role Key present)");
  } else {
    console.log("❌ Supabase Admin FAILED to initialize (Missing Service Role Key)");
  }
}

check();
