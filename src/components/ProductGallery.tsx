import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: number | string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
};

export default async function ProductGallery() {
  const fetchProducts = async () => {
    const query = supabase
      .from("products")
      .select("id, name, description, price, image_url")
      .order("created_at", { ascending: false });

    // Avoid stalling the page if Supabase is slow; fall back to static items after ~0.6s.
    const timeout = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 600)
    );

    const result = (await Promise.race([query, timeout])) as
      | { data: Product[] | null }
      | null;

    return result?.data ?? [];
  };

  const products = await fetchProducts();

  const fallbackImages = [
    "/gallery%20(1).jpg",
    "/gallery%20(2).jpg",
    "/gallery%20(3).jpg",
    "/gallery%20(4).jpg",
    "/gallery%20(5).jpg",
  ];
  const galleryItems: Product[] =
    products.length > 0
      ? products
      : fallbackImages.map((src, idx) => ({
          id: `fallback-${idx}`,
          name: `Gallery ${idx + 1}`,
          description: null,
          price: null,
          image_url: src,
        }));

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {galleryItems.map((product) => (
        <div
          key={product.id}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.02]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-60" />
          <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-40">
            <div className="absolute inset-0 rounded-3xl ring-1 ring-[#d4af37]/30 shadow-[0_10px_50px_-20px_rgba(212,175,55,0.6)]" />
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl m-3 ring-1 ring-white/5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              {product.image_url || fallbackImages.length ? (
                <img
                  src={
                    product.image_url ||
                    fallbackImages[
                      Math.abs(
                        (typeof product.id === "number"
                          ? product.id
                          : product.id.length) % fallbackImages.length
                      )
                    ]
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="relative h-full w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                </div>
              )}
            </div>
          </div>

          <div className="relative m-3 mt-0 rounded-2xl border border-white/5 bg-black/30 px-3 py-2 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <p className="line-clamp-1 text-sm font-semibold text-white/90 md:text-base">
                {product.name}
              </p>
              {product.price !== null && product.price !== undefined ? (
                <span className="text-xs font-medium text-[#d4af37] md:text-sm">
                  ${Number(product.price).toFixed(2)}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
