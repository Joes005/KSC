import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface TabsProps {
  /** tab id -> label */
  tabs: { id: string; label: string; badge?: number | string }[];
  defaultActive?: string;
  onChange?: (id: string) => void;
  children: (activeId: string) => ReactNode;
  className?: string;
}

/**
 * Accessible, scrollable tab bar. Children render once with the active tab id,
 * so each panel decides what to show (keep children components mounted if you
 * want to preserve state across tab switches).
 */
export function Tabs({ tabs, defaultActive, onChange, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultActive ?? tabs[0]?.id ?? "");
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (defaultActive) {
      setActive(defaultActive);
    }
  }, [defaultActive]);

  const select = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Programme categories"
        className="flex flex-wrap items-center gap-2 pb-4 pt-1"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => select(tab.id)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "border-secondary bg-secondary text-ksc-navy-dark shadow-md ring-4 ring-secondary/20"
                  : "border-white/10 bg-white/5 text-white/80 hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary hover:-translate-y-0.5 hover:shadow-sm"
              )}
            >
              <span className="leading-none mt-0.5">{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold shadow-sm",
                    isActive ? "bg-ksc-navy-dark/20 text-ksc-navy-dark" : "bg-white/10 text-white/60"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="mt-6">
        {children(active)}
      </div>
    </div>
  );
}

