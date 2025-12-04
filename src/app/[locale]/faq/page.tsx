"use client";

import { SectionHeader } from "@/components/section-header";
import { faqList } from "@/lib/data";
import { Accordion } from "@/components/ui/accordion";

export default function FaqPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="FAQ"
        title="الأسئلة الشائعة"
        description="أجوبة مختصرة حول شروط الكراء، الدفع، وخدمات التوصيل."
      />
      <Accordion
        items={faqList.map((item) => ({
          value: item.question,
          trigger: item.question,
          content: item.answer,
        }))}
      />
    </div>
  );
}
