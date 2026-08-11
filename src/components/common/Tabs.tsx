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
        className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none"
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
                "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-ksc-green/20 bg-white text-ksc-dark hover:border-primary hover:text-primary"
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-ksc-mist text-primary"
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

