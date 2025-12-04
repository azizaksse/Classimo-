import ShopClient, { type ShopProduct } from "./ShopClient";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { shopProducts as fallbackData } from "@/lib/data";

const fallbackGradients = [
  "linear-gradient(135deg, #0e111b, #2a2e3f)",
  "linear-gradient(135deg, #1b1d26, #3f414a)",
  "linear-gradient(135deg, #2d0a1f, #4e1238)",
  "linear-gradient(135deg, #1d150d, #4a2d16)",
  "linear-gradient(135deg, #0f0f1b, #292425)",
  "linear-gradient(135deg, #121826, #1b2b40)",
];

function formatDzd(value: number) {
  return `${Number(value || 0).toLocaleString("fr-DZ")} DZD`;
}

function normalizeFallback(): ShopProduct[] {
  return fallbackData.map((item, idx) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    priceLabel: item.price,
    priceValue: Number(item.price?.replace(/[^\d]/g, "")) || 0,
    image_url: undefined,
    images: [],
    category: item.category || "غير مصنف",
    tag: item.tag || "منتج",
    gradient: item.gradient || fallbackGradients[idx % fallbackGradients.length],
  }));
}

export default async function ShopPage() {
  const supabase = getSupabaseClient();

  let products: ShopProduct[] = [];

  if (supabase) {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Failed to fetch products from Supabase", error);
    }

    if (data && data.length > 0) {
      products = data.map((item, idx) => {
        const images = Array.isArray(item.images) ? item.images : [];
        const price = Number(item.price) || 0;

        return {
          id: String(item.id),
          name: item.title ?? "منتج",
          description:
            typeof item.specs === "object" && item.specs !== null
              ? (item.specs.description as string | undefined) ?? null
              : null,
          priceLabel: formatDzd(price),
          priceValue: price,
          image_url: images[0] ?? null,
          images,
          category: item.category_id ? String(item.category_id) : "غير مصنف",
          tag: "منتج",
          gradient: fallbackGradients[idx % fallbackGradients.length],
        };
      });
    }
  }

  if (products.length === 0) {
    products = normalizeFallback();
  }

  return <ShopClient products={products} />;
}
