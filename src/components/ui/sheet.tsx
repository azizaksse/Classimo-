import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
interface SheetProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const Sheet: React.FC<SheetProps> = ({
  title,
  open,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {" "}
      {open ? (
        <div className="fixed inset-0 z-50">
          {" "}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />{" "}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-[#050509]/95 p-6"
          >
            {" "}
            <div className="mb-6 flex items-center justify-between">
              {" "}
              <p className="text-lg font-semibold">{title}</p>{" "}
              <button
                type="button"
                className="rounded-full border border-white/10 p-2 hover:border-[#d4af37]/50"
                onClick={onClose}
                aria-label="Close panel"
              >
                {" "}
                <X className="h-4 w-4 text-white" />{" "}
              </button>{" "}
            </div>{" "}
            <div className="h-[calc(100%-4rem)] overflow-y-auto pr-2">
              {children}
            </div>{" "}
          </motion.aside>{" "}
        </div>
      ) : null}{" "}
    </AnimatePresence>
  );
};
