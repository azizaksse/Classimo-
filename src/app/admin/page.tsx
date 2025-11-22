"use client";

import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const dashboardCards = [
  { title: "طلبات الكراء", value: "14", status: "+5 خلال 24سا" },
  { title: "طلبات البيع", value: "9", status: "3 قيد التأكيد" },
  { title: "مواعيد التعديل", value: "6", status: "اليوم" },
];

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Admin"
        title="لوحة تحكم Classimo (Placeholder)"
        description="تصور لتكامل الواجهة الحالية مع نظام إدارة حقيقي للطلبات والمواعيد."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {dashboardCards.map((card, idx) => (
          <motion.div
            key={card.title}
            className="rounded-[26px] border border-white/10 bg-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.35em]">{card.title}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
            <p className="text-xs text-white">{card.status}</p>
          </motion.div>
        ))}
      </div>
      <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm">
          النظام سيتضمن تتبعاً فورياً للطلبات، جداول للقياسات، وتقارير تصدَّر
          إلى ملف CSV.
        </p>
        <Button variant="outline" className="mt-4">
          تصدير تقرير وهمي
        </Button>
      </div>
    </div>
  );
}
