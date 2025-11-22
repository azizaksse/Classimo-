"use client";
import { motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
export const FloatingActions = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3">
      {" "}
      <motion.a
        href="https://wa.me/213000000000"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22c55e] text-[#050509] shadow-[0_15px_45px_rgba(34,197,94,0.45)]"
        aria-label="راسلنا على واتساب"
      >
        {" "}
        <MessageCircle className="h-5 w-5" />{" "}
      </motion.a>{" "}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white/5 text-white"
        onClick={scrollToTop}
        aria-label="عد للأعلى"
      >
        {" "}
        <ArrowUp className="h-5 w-5" />{" "}
      </motion.button>{" "}
    </div>
  );
};
