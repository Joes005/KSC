import { Megaphone, ExternalLink, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { PageHeader } from "../components/common/PageHeader";

function highlightNoticeText(text: string) {
  if (!text) return null;

  // Split on key phrases for smooth, clean inline emphasis without fake hyperlinks or awkward boxes
  const regex = /(TNOU|BDU|Alagappa University|Karur Study Centre|exam time-table released|hall tickets available|exam hall tickets & time-tables)/gi;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (/^(TNOU|BDU|Alagappa University)$/i.test(part)) {
      return (
        <span key={i} className="font-extrabold text-ksc-navy">
          {part}
        </span>
      );
    }
    if (/^(Karur Study Centre)$/i.test(part)) {
      return (
        <span key={i} className="font-extrabold text-ksc-red">
          {part}
        </span>
      );
    }
    if (/^(exam time-table released)$/i.test(part)) {
      return (
        <span key={i} className="font-extrabold text-ksc-red">
          {part}
        </span>
      );
    }
    if (/^(hall tickets available|exam hall tickets & time-tables)$/i.test(part)) {
      return (
        <span key={i} className="font-extrabold text-emerald-700">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function ExamUpdate() {
  const { data: { news_events: NEWS_EVENTS, settings: SITE_CONFIG, pages } } = useSiteData();
  const headerData = (pages?.exam_update?.header || {}) as any;
  const examNotices = NEWS_EVENTS.filter((n) => n.type === "exam");

  return (
    <div className="bg-gradient-to-b from-slate-50 via-amber-50/20 to-slate-50 min-h-screen pb-16">
      {/* Page header */}
      <PageHeader
        title={headerData.title || "Examinations, Hall Tickets & Timetables"}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Exam Update" }]}
        bgImage="/assets/gallery/ksc-08.jpg"
      />

      {/* Quick notices */}
      <section className="py-8 sm:py-14">
        <div className="container-site max-w-4xl px-4 sm:px-6">
          <div className="mb-5 sm:mb-7 flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-3xl font-extrabold text-ksc-navy tracking-tight">
              Latest notices
            </h2>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-ksc-red bg-red-100/90 border border-red-300 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-2xs">
              Live Updates
            </span>
          </div>

          <ul className="space-y-3.5 sm:space-y-4">
            {examNotices.map((n, idx) => (
              <li
                key={`${n.text}-${idx}`}
                className="group relative overflow-hidden flex items-start gap-3 sm:gap-4 rounded-2xl border border-amber-200/90 bg-gradient-to-r from-[#fffdf5] via-[#fffdfa] to-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-ksc-red/40 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Accent left highlight bar */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-ksc-red to-ksc-yellow" />

                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100/80 text-amber-700 border border-amber-300/70 transition-all duration-300 group-hover:bg-ksc-red group-hover:text-white group-hover:border-ksc-red shadow-2xs">
                  <Megaphone className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm sm:text-base md:text-lg font-bold leading-relaxed text-slate-900">
                    {highlightNoticeText(n.text)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Support callout note */}
          <div className="mt-6 sm:mt-8 rounded-2xl border border-blue-200/90 bg-gradient-to-br from-blue-50/90 via-white to-sky-50/70 p-4 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <span className="text-xl sm:text-2xl shrink-0 mt-0.5 sm:mt-0">💡</span>
                <p className="text-xs sm:text-base font-semibold leading-relaxed text-slate-800">
                  {headerData.supportNote || "Need help reading your hall ticket or understanding your timetable? Visit the centre or message us on WhatsApp during working hours."}
                </p>
              </div>
              
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Karur%20Study%20Centre,%20I%20need%20help%20with%20my%20exam%20timetable/hall%20ticket`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#20ba5c] hover:shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}