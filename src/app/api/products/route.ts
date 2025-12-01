import { getSupabaseAdmin } from "@/lib/supabaseAdminClient";
import { NextResponse } from "next/server";

export const revalidate = 30;

const isMissingCategoryColumn = (error?: { code?: string; message?: string } | null) =>
  !!error &&
  (error.code === "42703" ||
    error.message?.toLowerCase().includes("category") ||
    error.message?.toLowerCase().includes('column "category"'));

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();

  if (!supabaseAdmin) {
    // Gracefully degrade if env vars are not present at runtime.
    return NextResponse.json({ data: [] });
  }


  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, name, description, price, image_url, category, created_at")
    .order("created_at", { ascending: false });

  if (isMissingCategoryColumn(error)) {
    const { data: fallbackData, error: fallbackError } = await supabaseAdmin
      .from("products")
      .select("id, name, description, price, image_url, created_at")
      .order("created_at", { ascending: false });

    if (fallbackError) {
      return NextResponse.json({ error: fallbackError.message }, { status: 500 });
    }

    return NextResponse.json({
      data:
        fallbackData?.map((item) => ({
          ...item,
          category: null,
        })) ?? [],
    });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
