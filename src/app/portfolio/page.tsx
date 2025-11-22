"use client";

import { useState } from "react";
import { portfolioShots, storyStrip } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";
import { motion } from "framer-motion";

const eventFilters = ["الكل", "أعراس", "خطوبات", "حفلات", "سهرات"];

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState("الكل");

  const filteredShots = portfolioShots.filter(() => {
    if (selectedFilter === "الكل") return true;
    return true;
  });

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Portfolio"
        title="بورتفوليو الإطلالات الحقيقية"
        description="صور مستوحاة من مناسبات حقيقية لعرسان وضيوف Classimo عبر مختلف الولايات."
      />

      <div className="flex flex-wrap gap-3">
        {eventFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setSelectedFilter(filter)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              selectedFilter === filter
                ? "border-[#d4af37]/70 text-[#d4af37]"
                : "border-white/10 text-white hover:border-white/40"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredShots.map((shot, idx) => (
          <motion.div
            key={shot.id}
            className="glow-border space-y-3 rounded-[28px] border border-white/10 p-6"
            style={{ background: shot.gradient }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <p className="text-sm">{shot.title}</p>
            <p className="text-xs uppercase tracking-[0.35em]">{shot.tag}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Story Strip</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {storyStrip.map((story) => (
            <div
              key={story.title}
              className="min-w-[260px] rounded-[24px] border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm font-semibold text-[#d4af37]">
                {story.title}
              </p>
              <p className="mt-2 text-sm">{story.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
