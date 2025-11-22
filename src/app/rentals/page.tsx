"use client";

import { useMemo, useState } from "react";
import { rentalCatalog } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

const suitTypes = ["الكل", "عرس", "سهرة", "خطوبة", "تقليدي"];
const colors = ["كل الألوان", "أسود", "ذهبي", "كحلي", "رمادي", "أبيض"];

export default function RentalsPage() {
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [colorFilter, setColorFilter] = useState("كل الألوان");
  const [query, setQuery] = useState("");
  const [selectedSuit, setSelectedSuit] = useState<
    (typeof rentalCatalog)[0] | null
  >(null);

  const filteredCatalog = useMemo(() => {
    return rentalCatalog.filter((item) => {
      const matchesType =
        typeFilter === "الكل" || item.category.includes(typeFilter);
      const matchesColor =
        colorFilter === "كل الألوان" || item.color === colorFilter;
      const matchesQuery =
        query.length === 0 ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesColor && matchesQuery;
    });
  }, [typeFilter, colorFilter, query]);

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Rentals"
        title="كراء كوستيم الأفراح"
        description="طريقة كراء شفافة: احجز موديلك، نضبط المقاسات، نستلم عربون بسيط، ونسلم البدلة في حقيبة فاخرة يومين قبل المناسبة."
      />

      <div className="glass-panel space-y-6 rounded-[30px] p-6">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <Input
            placeholder="ابحث عن الموديل أو الكود…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              {suitTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
              value={colorFilter}
              onChange={(event) => setColorFilter(event.target.value)}
            >
              {colors.map((color) => (
                <option key={color}>{color}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white">
          {["نظافة فاخرة", "COD", "تعديل سريع", "دعم عبر واتساب"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 px-4 py-2"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredCatalog.map((item) => (
          <motion.div
            key={item.id}
            className="glow-border space-y-4 rounded-[28px] border border-white/10 p-6"
            style={{ background: item.gradient }}
            whileHover={{ y: -6 }}
          >
            <div className="flex items-center justify-between text-sm">
              <span>{item.id}</span>
              <span>{item.color}</span>
            </div>
            <h3 className="text-2xl font-semibold">{item.name}</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {item.category.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-white/20 px-3 py-1"
                >
                  {cat}
                </span>
              ))}
            </div>
            <p className="text-sm">{item.price}</p>
            <p
              className={`text-sm font-semibold ${
                item.availability.includes("متاح")
                  ? "text-[#22c55e]"
                  : "text-[#fbbf24]"
              }`}
            >
              {item.availability}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSelectedSuit(item)}
            >
              طلب الكراء
            </Button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSuit ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="glass-panel w-full max-w-lg rounded-[30px] p-8"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white">حجز كراء</p>
                  <h3 className="text-2xl font-semibold">
                    {selectedSuit.name}
                  </h3>
                  <p className="text-xs tracking-[0.35em]">{selectedSuit.id}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/20 px-4 py-1"
                  onClick={() => setSelectedSuit(null)}
                >
                  إغلاق
                </button>
              </div>

              <form className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="الاسم الكامل" />
                  <Input placeholder="رقم الهاتف" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="المدينة / الولاية" />
                  <Input placeholder="تاريخ الحدث" type="date" />
                </div>
                <Textarea placeholder="تفاصيل إضافية أو مقاسات خاصة" />
                <Button className="w-full">تأكيد الطلب (COD)</Button>
                <p className="text-xs text-white">
                  سنتواصل معك خلال ساعتين لتأكيد التواريخ والخيارات المتاحة.
                </p>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
