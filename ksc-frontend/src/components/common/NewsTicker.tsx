import { Newspaper, CalendarClock, Megaphone, FileText } from "lucide-react";

type NewsItem = { text: string; type: string };

interface NewsTickerProps {
  items: readonly NewsItem[];
}

const TYPE_ICON: Record<string, typeof Megaphone> = {
  admission: Megaphone,
  deadline: CalendarClock,
  exam: FileText,
};

/** Scrolling news & events strip shown under the hero. */
export function NewsTicker({ items }: NewsTickerProps) {
  const doubled = [...items, ...items];

  return (
    <div className="relative flex items-stretch overflow-hidden border-y border-ksc-gold/30 bg-gradient-to-r from-ksc-dark via-primary to-ksc-dark py-3">
      <span className="flex shrink-0 items-center gap-2 pl-4 sm:pl-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          <Newspaper className="h-4 w-4" /> News &amp; Events
        </span>
      </span>
      <div className="marquee flex w-full overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center">
          {doubled.map((item, i) => {
            const Icon = TYPE_ICON[item.type] ?? Megaphone;
            return (
              <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm text-white">
                <Icon className="h-4 w-4 shrink-0 text-ksc-gold" />
                {item.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}