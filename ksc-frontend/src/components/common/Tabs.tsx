import { useState, useEffect, type KeyboardEvent, type ReactNode } from "react";
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
  useEffect(() => {
    if (defaultActive) {
      setActive(defaultActive);
    }
  }, [defaultActive]);

  const select = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    select(tabs[nextIndex].id);
    document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Programme categories"
        className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-2 pt-1"
      >
        {tabs.map((tab, index) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={(event) => handleKeys(event, index)}
              className={cn(
                "flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200",
                isActive
                  ? "border-ksc-royal bg-ksc-royal text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-ksc-sky/60 hover:text-ksc-royal"
              )}
            >
              <span className="leading-none mt-0.5">{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold shadow-sm",
                    isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
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

