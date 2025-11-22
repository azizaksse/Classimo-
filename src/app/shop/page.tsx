"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { shopProducts as fallbackData } from "@/lib/data";
import { motion } from "framer-motion";

type ShopProduct = {
  id: string;
  name: string;
  description: string | null;
  priceLabel: string;
  priceValue: number;
  image_url?: string | null;
  category: string;
  tag?: string;
  gradient: string;
};

type CartItem = {
  id: string;
  quantity: number;
};

const sortOptions = ["الأحدث", "الأقدم", "السعر الأقل", "السعر الأعلى"];

const fallbackGradients = [
  "linear-gradient(135deg, #0e111b, #2a2e3f)",
  "linear-gradient(135deg, #1b1d26, #3f414a)",
  "linear-gradient(135deg, #2d0a1f, #4e1238)",
  "linear-gradient(135deg, #1d150d, #4a2d16)",
  "linear-gradient(135deg, #0f0f1b, #292425)",
  "linear-gradient(135deg, #121826, #1b2b40)",
];

function parsePrice(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function formatDzd(value: number) {
  return `${Number(value || 0).toLocaleString("fr-DZ")} DZD`;
}

function normalizeFallback(): ShopProduct[] {
  return fallbackData.map((item, idx) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    priceLabel: item.price,
    priceValue: parsePrice(item.price),
    image_url: undefined,
    category: item.category || "أخرى",
    tag: item.tag || "متاح",
    gradient: item.gradient || fallbackGradients[idx % fallbackGradients.length],
  }));
}

export default function ShopPage() {
  const [products, setProducts] = useState<ShopProduct[]>(() => normalizeFallback());
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [sortBy, setSortBy] = useState("الأحدث");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`fetch failed ${res.status}`);
        const body = (await res.json()) as { data?: any[] };
        const data = body.data ?? [];

        if (!active) return;

        const normalized: ShopProduct[] = data.map((item, idx) => ({
          id: String(item.id),
          name: item.name,
          description: item.description,
          priceLabel: formatDzd(Number(item.price) || 0),
          priceValue: Number(item.price) || 0,
          image_url: item.image_url,
          category: item.category || "أخرى",
          tag: "جديد",
          gradient: fallbackGradients[idx % fallbackGradients.length],
        }));

        if (normalized.length > 0) {
          setProducts(normalized);
        }
      } catch {
        // keep fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set<string>(products.map((p) => p.category || "أخرى"));
    return ["الكل", ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const base = products.filter((product) => {
      if (selectedCategory === "الكل") return true;
      return product.category === selectedCategory;
    });
    switch (sortBy) {
      case "السعر الأقل":
        return [...base].sort((a, b) => a.priceValue - b.priceValue);
      case "السعر الأعلى":
        return [...base].sort((a, b) => b.priceValue - a.priceValue);
      default:
        return base;
    }
  }, [products, selectedCategory, sortBy]);

  const cartItemsDetail = cart
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.id),
    }))
    .filter((item): item is CartItem & { product: ShopProduct } => !!item.product);

  const cartTotal = cartItemsDetail.reduce(
    (total, item) => total + item.product.priceValue * item.quantity,
    0,
  );

  const addToCart = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="المتجر"
        title="متجر البيع"
        description="تسوق مجموعات الأزياء المميزة واختر ما يناسب حفلك بثوانٍ وبحسب ميزانيتك."
        lang="ar"
      />

      <div className="glass-panel rounded-[32px] p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]">التصنيف</p>
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em]">الترتيب</p>
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em]">السعر</p>
            <Input placeholder="مثال: من 20,000 إلى 60,000 دج" />
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 p-4 text-sm">
          اضبط الفلترة حسب السعر والمدة لتحصل على نتائج أدق بسرعة.
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            style={{ background: product.gradient }}
            className="glow-border flex h-full flex-col rounded-[28px] border border-white/10 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-xs uppercase tracking-[0.35em]">
              {product.tag || "متاح"}
            </div>
            <h3 className="mt-4 text-2xl font-semibold">{product.name}</h3>
            <p className="mt-2 text-sm">{product.description}</p>
            <p className="mt-auto text-xl font-semibold text-[#d4af37]">
              {product.priceLabel}
            </p>
            <Button
              className="mt-4 w-full"
              onClick={() => addToCart(product.id)}
              disabled={loading}
            >
              أضف إلى السلة
            </Button>
          </motion.div>
        ))}
        {!loading && filteredProducts.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 p-6 text-center text-sm text-white/70">
            لا توجد منتجات لعرضها حالياً.
          </div>
        ) : null}
      </div>

      <Sheet
        title="مراجعة سلة التسوق"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        {cartItemsDetail.length === 0 ? (
          <p className="text-sm">السلة فارغة.</p>
        ) : (
          <div className="space-y-4">
            {cartItemsDetail.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-white">
                      {item.product.priceLabel}
                    </p>
                  </div>
                  <div className="text-sm">x{item.quantity}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-white">المجموع الكلي</p>
              <p className="text-xl font-semibold text-[#d4af37]">
                {cartTotal.toLocaleString("fr-DZ")} DZD
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full">تأكيد الطلب (COD)</Button>
              <Button variant="outline" className="w-full">
                متابعة التسوق
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
