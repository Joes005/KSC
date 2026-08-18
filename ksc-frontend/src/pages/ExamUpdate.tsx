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
          <p className="section-kicker">Exam Update</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Examinations, Hall Tickets &amp; Timetables</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Stay on top of your exams. Pick your university below to jump to hall-ticket portals and
            timetable downloads.
          </p>
        </div>
      </section>

      {/* University accordions */}
      <section className="bg-white py-10 lg:py-10 lg:py-16">
        <div className="container-site">
          <SectionHeading
            kicker="Per-University"
            title="Exam resources by university"
            subtitle="Hall-ticket portals and exam-timetable PDFs are published by each university. Use the official links below, or download the course/prospectus PDFs from the Downloads section."
          />
          <Accordion
            className="mx-auto max-w-3xl"
            items={UNIVERSITIES.map((uni) => ({
              id: uni.id,
              title: `${uni.shortName} — ${uni.academicYear}`,
              badge: "Exam",
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-ksc-ink/85">{uni.exam.note}</p>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a
                        href={uni.exam.hallTicketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-3 rounded-lg border border-ksc-green/15 bg-ksc-mist/60 px-4 py-3 font-semibold text-primary transition-colors hover:border-primary"
                      >
                        <span className="inline-flex items-center gap-2">
                          <TicketCheck className="h-4 w-4" /> {uni.name} — Hall Ticket Portal
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={uni.exam.timetableUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-3 rounded-lg border border-ksc-green/15 bg-ksc-mist/60 px-4 py-3 font-semibold text-primary transition-colors hover:border-primary"
                      >
                        <span className="inline-flex items-center gap-2">
                          <FileText className="h-4 w-4" /> {uni.name} — Exam Timetable (PDF)
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                  </ul>
                  <p className="rounded-lg bg-ksc-gold/10 px-3 py-2 text-xs text-ksc-ink/70">
                    Tips: For BDU & ALU, the timetable/prospectus PDFs are also available in the
                    Downloads section of the Admissions page.
                  </p>
                </div>
              ),
            }))}
          />
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