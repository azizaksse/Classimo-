"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  lang?: string;
}
export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  lang,
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mx-auto max-w-3xl space-y-3",
        align === "center" ? "text-center" : "text-left",
      )}
      lang={lang}
    >
      {" "}
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#d4af37]">
          {eyebrow}
        </p>
      ) : null}{" "}
      <h2 className="liquid-glass inline-flex w-full items-center justify-center rounded-[24px] px-6 py-4 text-3xl font-semibold leading-tight md:text-4xl">
        {title}
      </h2>{" "}
      {description ? (
        <p className="liquid-glass rounded-[20px] px-5 py-3 text-base text-white/90">
          {description}
        </p>
      ) : null}{" "}
    </motion.div>
  );
};
