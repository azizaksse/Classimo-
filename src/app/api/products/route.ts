import { getSupabaseAdmin } from "@/lib/supabaseAdminClient";
import { NextResponse } from "next/server";

export const revalidate = 30;

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Missing Supabase environment variables" },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, name, description, price, image_url, category, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
