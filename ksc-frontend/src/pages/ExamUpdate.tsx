import { FileText, TicketCheck, ExternalLink, Megaphone } from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { Accordion } from "../components/common/Accordion";

export function ExamUpdate() {
  const { data: { universities: UNIVERSITIES, news_events: NEWS_EVENTS } } = useSiteData();
  return (
    <>
      {/* Page header */}
      <section className="gradient-head relative overflow-hidden py-14 text-white">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-ksc-gold/20 blur-3xl" />
        <div className="container-site relative">
          <p className="section-kicker border-ksc-yellow text-ksc-yellow">Exam Update</p>
          <h1 className="mt-2 text-3xl font-black text-white drop-shadow-md sm:text-4xl">Examinations, Hall Tickets &amp; Timetables</h1>
          <p className="mt-3 max-w-2xl text-white/90 font-medium leading-relaxed">
            Stay on top of your exams. Pick your university below to jump to hall-ticket portals and
            timetable downloads.
          </p>
        </div>
      </section>



      {/* Quick notices */}
      <section className="bg-ksc-mist/60 py-14">
        <div className="container-site max-w-3xl">
          <h2 className="text-xl font-bold text-ksc-dark">Latest notices</h2>
          <ul className="mt-5 space-y-3">
            {NEWS_EVENTS.filter((n) => n.type === "exam").map((n) => (
              <li key={n.text} className="flex items-start gap-3 rounded-lg border border-ksc-green/10 bg-white p-4 text-sm">
                <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-ksc-gold" />
                <span className="text-ksc-ink/90">{n.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ksc-ink/70">
            Need help reading your hall ticket or understanding your timetable? Visit the centre or
            message us on WhatsApp during working hours.
          </p>
        </div>
      </section>
    </>
  );
}