import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
interface AccordionItemType {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}
interface AccordionProps {
  items: AccordionItemType[];
  defaultValue?: string;
}
export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultValue,
}) => {
  const [openValue, setOpenValue] = React.useState(
    defaultValue ?? items[0]?.value,
  );
  return (
    <div className="space-y-4">
      {" "}
      {items.map((item) => {
        const isOpen = openValue === item.value;
        return (
          <div
            key={item.value}
            className="rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#d4af37]/40"
          >
            {" "}
            <button
              type="button"
              className="flex w-full items-center justify-between text-left text-base font-semibold"
              onClick={() => setOpenValue(isOpen ? "" : item.value)}
            >
              {" "}
              <span>{item.trigger}</span>{" "}
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-[#fbbf24] transition-transform",
                  isOpen && "rotate-180",
                )}
              />{" "}
            </button>{" "}
            <div
              className={cn(
                "grid overflow-hidden transition-all",
                isOpen
                  ? "grid-rows-[1fr] pt-3 text-sm text-white"
                  : "grid-rows-[0fr]",
              )}
            >
              {" "}
              <div className="min-h-0">{item.content}</div>{" "}
            </div>{" "}
          </div>
        );
      })}{" "}
    </div>
  );
};
