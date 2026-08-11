import type { Programme } from "../../data/universities";
import { cn } from "../../utils/cn";

interface ProgrammeTableProps {
  programmes: Programme[];
  className?: string;
}

/**
 * Renders a clean programme table. Columns adapt to the data:
 * Programme (always), Pattern + Medium (+ Eligibility) shown only when present.
 */
export function ProgrammeTable({ programmes, className }: ProgrammeTableProps) {
  const hasPattern = programmes.some((p) => p.pattern);
  const hasEligibility = programmes.some((p) => p.eligibility);

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-ksc-green/10", className)}>
      <table className="w-full min-w-[480px] border-collapse bg-white text-left text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-3 pl-4 pr-3 font-semibold">#</th>
            <th className="px-4 py-3 font-semibold">Programme</th>
            {hasPattern && <th className="px-4 py-3 font-semibold">Pattern</th>}
            <th className="px-4 py-3 font-semibold">Medium</th>
            {hasEligibility && <th className="px-4 py-3 font-semibold">Eligibility</th>}
          </tr>
        </thead>
        <tbody>
          {programmes.map((p, i) => (
            <tr
              key={p.name}
              className={cn(
                "border-t border-ksc-green/10 align-top",
                i % 2 === 1 ? "bg-ksc-mist/50" : "bg-white"
              )}
            >
              <td className="py-3 pl-4 pr-3 font-medium text-ksc-gold">{i + 1}</td>
              <td className="px-4 py-3 font-semibold text-ksc-dark">{p.name}</td>
              {hasPattern && (
                <td className="px-4 py-3">
                  <span className="rounded-full bg-ksc-gold/15 px-2.5 py-0.5 text-xs font-medium text-ksc-gold">
                    {p.pattern ?? "—"}
                  </span>
                </td>
              )}
              <td className="px-4 py-3 text-ksc-ink">{p.medium}</td>
              {hasEligibility && <td className="px-4 py-3 text-xs leading-relaxed text-ksc-ink/90">{p.eligibility ?? "—"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}