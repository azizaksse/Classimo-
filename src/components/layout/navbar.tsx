"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 mx-auto mt-4 flex w-[94%] max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/50 px-5 py-3 backdrop-blur-xl",
          scrolled &&
            "border-[#d4af37]/40 bg-black/70 shadow-[0_10px_60px_rgba(0,0,0,0.45)]",
        )}
      >
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            className="relative h-12 w-12 overflow-hidden rounded-full border border-white/40 bg-white/10 p-1 shadow-inner shadow-[#d4af37]/40 transition-all duration-300"
            whileHover={{ y: -4, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <Image
              src="/logo.jpg"
              alt="Classimo Logo"
              fill
              sizes="48px"
              className="rounded-full object-cover"
              priority
            />
          </motion.div>
          <div className="text-xs uppercase tracking-[0.4em] text-white">
            Classimo
          </div>
        </Link>
        <div className="hidden items-center gap-6 text-sm uppercase tracking-[0.3em] lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors",
                pathname === link.href
                  ? "text-[#d4af37]"
                  : "text-white hover:text-[#d4af37]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block">
          <Button className="px-8">احجز بدلتك</Button>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/20 p-2 text-white lg:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="فتح القائمة"
        >
          <Menu className="h-5 w-5" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-xs bg-[#050509]/95 p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="text-lg font-semibold">Classimo</p>
                <button
                  type="button"
                  className="rounded-full border border-white/15 p-2"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold",
                      pathname === link.href
                        ? "border-[#d4af37] text-[#d4af37]"
                        : "text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="w-full" size="lg">
                  احجز بدلتك
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
