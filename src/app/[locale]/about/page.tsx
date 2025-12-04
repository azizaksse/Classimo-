"use client";

import { SectionHeader } from "@/components/section-header";
import { timelineMilestones } from "@/lib/data";
import { motion } from "framer-motion";

const values = [
  {
    title: "الأناقة",
    description: "نسهر على مزج القصات العالمية مع الروح الجزائرية الراقية.",
  },
  {
    title: "الاحترافية",
    description: "مواعيد دقيقة، توصيل محترف، وتواصل سريع عبر القنوات الرقمية.",
  },
  {
    title: "احترام الزبون",
    description: "شفافية في الأسعار، عقود واضحة، ومتابعة بعد الحدث.",
  },
  {
    title: "العناية بالتفاصيل",
    description: "من الأقمشة إلى التغليف، كل خطوة بلمسة ذهبية داكنة.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="About"
        title="من نحن"
        description="Classimo ولد في قلب الجزائر العاصمة، بطموح تقديم تجربة كراء وبيع بدلات فاخرة تحترم ذوق الشباب الجزائري وتمنحه شعور الثقة."
      />

      <div className="glass-panel rounded-[32px] p-8 text-lg leading-8">
        بدأنا في 2016 بصالون صغير، واليوم نرافق العرسان في أكثر من 12 ولاية.
        التركيز كان دائماً على الحرفية العالية، احترام الزمن، والتواصل الإنساني
        مع كل زبون.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {values.map((value, idx) => (
          <motion.div
            key={value.title}
            className="rounded-[26px] border border-white/10 bg-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-[#d4af37]">
              {value.title}
            </h3>
            <p className="mt-2 text-sm">{value.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">خط زمني</h3>
        <div className="relative border-r border-white/10 pr-8">
          {timelineMilestones.map((milestone, idx) => (
            <div key={milestone.year} className="relative mb-8 pr-6 last:mb-0">
              <span className="absolute right-[-18px] top-2 h-3 w-3 rounded-full bg-[#d4af37]" />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white">
                  {milestone.year}
                </p>
                <h4 className="text-xl font-semibold">{milestone.title}</h4>
                <p className="text-sm">{milestone.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
