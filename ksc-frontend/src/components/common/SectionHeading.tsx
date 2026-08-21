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
        <div className={cn("mb-4 flex", align === "center" && "justify-center")}>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ksc-royal">
            <span className="h-2 w-2 rounded-full bg-ksc-yellow ring-4 ring-ksc-yellow/15" aria-hidden="true" />
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
