import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label?: string;
  duration?: number;
}

/** Counts up from 0 to `value` when scrolled into view. */
export function StatCounter({ value, suffix = "", label, duration = 1500 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
        {display.toLocaleString("en-IN")}
        <span className="text-ksc-gold">{suffix}</span>
      </p>
      {label && <p className="mt-2 text-sm font-medium uppercase tracking-wide text-ksc-ink/80">{label}</p>}
    </div>
  );
}