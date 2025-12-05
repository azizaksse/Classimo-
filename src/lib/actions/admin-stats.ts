 "use server";

import { getSupabaseAdmin } from "@/lib/supabaseAdminClient";

export async function getAdminStats() {
  const supabaseAdmin = getSupabaseAdmin();

  if (!supabaseAdmin) {
    return { pendingOrders: 0, totalProducts: 0 };
  }

  const [{ count: pendingOrders = 0 }, { count: totalProducts = 0 }] =
    await Promise.all([
      supabaseAdmin
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabaseAdmin
        .from("products")
        .select("id", { count: "exact", head: true }),
    ]);

  return {
    pendingOrders: pendingOrders ?? 0,
    totalProducts: totalProducts ?? 0,
  };
}
