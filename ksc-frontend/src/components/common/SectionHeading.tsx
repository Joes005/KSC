import { cn } from "../../utils/cn";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 max-w-3xl sm:mb-10",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {kicker && (
        <div className={cn("mb-6 flex", align === "center" && "justify-center")}>
          <div className="inline-flex items-center rounded-full bg-white pl-4 pr-5 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-ksc-red shadow-sm border border-slate-100 border-l-[6px] border-l-ksc-red transition-transform hover:-translate-y-0.5">
            {kicker}
          </div>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-6 text-ksc-muted sm:text-base sm:leading-7">{subtitle}</p>}
      <div className={cn("mt-5 h-0.5 w-12 rounded-full bg-ksc-sky", align === "center" && "mx-auto")} aria-hidden="true" />
    </div>
  );
}
