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
        "mb-10 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {kicker && (
        <p
          className={cn(
            "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ksc-gold",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-0.5 w-6 rounded-full bg-ksc-saffron" />
          {kicker}
          <span className="h-0.5 w-6 rounded-full bg-ksc-saffron" />
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="mt-3 text-ksc-ink/80 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
