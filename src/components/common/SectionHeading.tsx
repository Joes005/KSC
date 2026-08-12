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
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {kicker && (
        <div className={cn("mb-5 flex", align === "center" && "justify-center")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-ksc-gold/30 bg-ksc-gold/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-ksc-gold shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-ksc-gold animate-pulse" />
            {kicker}
          </div>
        </div>
      )}
      <h2 className="section-title tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ksc-ink/70 leading-relaxed font-medium">{subtitle}</p>}
    </div>
  );
}
