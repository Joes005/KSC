import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  badge?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/** Lightweight accordion used on Exam Update / Curriculum / FAQ-style lists. */
export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border bg-white shadow-sm transition-colors",
              isOpen ? "border-primary/40" : "border-ksc-green/15"
            )}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3 text-base font-semibold text-ksc-dark">
                {item.title}
                {item.badge && (
                  <span className="rounded-full bg-ksc-mist px-2.5 py-0.5 text-xs font-bold text-primary">
                    {item.badge}
                  </span>
                )}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="border-t border-ksc-green/10 px-5 py-4 text-sm leading-relaxed text-ksc-ink">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}