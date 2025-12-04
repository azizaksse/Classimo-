"use client";

import { SectionHeader } from "@/components/section-header";
import { motion } from "framer-motion";

const articles = [
  {
    title: "ألوان الكوستيم في موسم الخريف",
    summary:
      "كيفية مزج الدرجات الرملية مع التفاصيل الذهبية الداكنة لإطلالة عصرية.",
    read: "6 دقائق",
  },
  {
    title: "دليل اختيار الأقمشة الرسمية",
    summary: "متى نختار الصوف الإيطالي، المخمل الجزائري، أو الكتان الفاخر؟",
    read: "5 دقائق",
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Blog"
        title="مذكرات الأناقة"
        description="نصائح Styling وملخصات من جلسات حقيقية مع عرسان Classimo."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article, idx) => (
          <motion.div
            key={article.title}
            className="rounded-[26px] border border-white/10 bg-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white">
              {article.read}
            </p>
            <h3 className="mt-3 text-2xl font-semibold">{article.title}</h3>
            <p className="mt-2 text-sm">{article.summary}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
