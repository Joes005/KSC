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
          <div className="inline-flex items-center border-l-4 border-ksc-red pl-3 text-xs font-bold uppercase tracking-[0.16em] text-ksc-red">
            {kicker}
          </div>
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-6 text-ksc-muted sm:text-base sm:leading-7">{subtitle}</p>}
      <div className={cn("mt-5 flex items-center gap-1.5", align === "center" && "justify-center")} aria-hidden="true">
        <span className="h-1 w-9 rounded-full bg-ksc-royal" />
        <span className="h-1 w-5 rounded-full bg-ksc-red" />
        <span className="h-1 w-3 rounded-full bg-ksc-yellow" />
      </div>
    </div>
  );
}
