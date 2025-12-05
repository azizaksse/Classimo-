"use client";

import { motion } from "framer-motion";

type DashboardCardsProps = {
  pendingOrders: number;
  totalProducts: number;
};

const cardsConfig = (pendingOrders: number, totalProducts: number) => [
  {
    title: "الطلبات قيد الانتظار",
    value: pendingOrders.toString(),
    status: "تحتاج معالجة",
  },
  {
    title: "إجمالي المنتجات",
    value: totalProducts.toString(),
    status: "مضاف في الكتالوج",
  },
  {
    title: "تذكير سريع",
    value: "جاهز",
    status: "تأكد من التحقق من الأسعار",
  },
];

export default function DashboardCards({
  pendingOrders,
  totalProducts,
}: DashboardCardsProps) {
  const cards = cardsConfig(pendingOrders, totalProducts);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          className="glow-border rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            {card.title}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
          <p className="text-xs text-white/80">{card.status}</p>
        </motion.div>
      ))}
    </div>
  );
}
