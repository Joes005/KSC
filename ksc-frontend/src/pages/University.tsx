import { Link, Navigate, useParams } from "react-router-dom";
import {
  Award,
  MapPin,
  Globe,
  TicketCheck,
  FileText,
  ExternalLink,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { UNIVERSITIES, getUniversityBySlug } from "../data/universities";
import { SITE_CONFIG } from "../data/site-content";
import { PageHeader } from "../components/common/PageHeader";
import { Tabs } from "../components/common/Tabs";
import { ProgrammeCards } from "../components/common/ProgrammeCards";

export function University() {
  const { id } = useParams<{ id: string }>();
  const uni = getUniversityBySlug(id ?? "");

  if (!uni) {
    return <Navigate to="/academic" replace />;
  }

  return (
    <>
      {/* Page header */}
      <PageHeader
        title={uni.shortName}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Academic", to: "/academic" },
          { label: uni.shortName },
        ]}
      />

      {/* University intro card */}
      <section className="bg-white py-14">
        <div className="container-site">
          <div className="overflow-hidden rounded-2xl border border-ksc-green/15 bg-gradient-to-r from-ksc-mist/70 to-white shadow-sm">
            <div className="grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                <GraduationCap className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-primary sm:text-3xl">{uni.name}</h1>
                <p className="mt-1 text-sm font-semibold text-ksc-ink/80">
                  {uni.academicYear} · {uni.pattern}
                </p>
                {uni.recognition && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ksc-gold/15 px-3 py-1 text-xs font-bold text-ksc-gold">
                    <Award className="h-3.5 w-3.5" /> {uni.recognition}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ksc-ink/75">
                  {uni.address && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> {uni.address}
                    </span>
                  )}
                  {uni.website && (
                    <a
                      href={`https://${uni.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" /> {uni.website}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link to="/admissions" className="btn-gold whitespace-nowrap">
                  Apply Now
                </Link>
                <Link to="/curriculum" className="btn-outline whitespace-nowrap">
                  Syllabus
                </Link>
              </div>
            </div>
          </div>

          {/* Programme categories */}
          <div className="mt-10">
            <Tabs
              tabs={uni.categories.map((c) => ({ id: c.id, label: c.label, badge: c.count }))}
            >
              {(activeId) => {
                const cat = uni.categories.find((c) => c.id === activeId) ?? uni.categories[0];
                return (
                  <div>
                    {cat && (
                      <>
                        {cat.note && (
                          <p className="mb-4 rounded-lg bg-ksc-gold/10 px-4 py-2.5 text-sm font-medium text-ksc-gold">
                            {cat.note}
                          </p>
                        )}
                        <ProgrammeCards programmes={cat.programmes} />
                      </>
                    )}
                  </div>
                );
              }}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Exam resources */}
      <section className="bg-ksc-mist/60 py-14">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-ksc-dark">
              {uni.shortName} — Exam Resources
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ksc-ink/85">{uni.exam.note}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <a
                href={uni.exam.hallTicketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center justify-between gap-3 p-5"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TicketCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-ksc-dark">Hall Ticket Portal</span>
                    <span className="text-xs text-ksc-ink/70">{uni.name}</span>
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-ksc-ink/40" />
              </a>
              <a
                href={uni.exam.timetableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center justify-between gap-3 p-5"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-ksc-dark">Exam Timetable (PDF)</span>
                    <span className="text-xs text-ksc-ink/70">{uni.name}</span>
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-ksc-ink/40" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-primary p-6 text-white shadow-md">
            <h3 className="text-lg font-bold">Need admission guidance?</h3>
            <p className="mt-2 text-sm text-white/85">
              Walk into {SITE_CONFIG.name} in Karur and our counsellors will help you pick the
              right {uni.shortName} programme, complete the application and plan for exams.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded bg-white/15 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-primary"
            >
              Talk to a Counsellor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Other universities */}
      <section className="bg-white py-14">
        <div className="container-site">
          <h2 className="text-center text-xl font-bold text-ksc-dark">Explore other universities</h2>
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-3">
            {UNIVERSITIES.filter((u) => u.id !== uni.id).map((u) => (
              <Link
                key={u.id}
                to={`/university/${u.id}`}
                className="rounded-full border border-ksc-green/20 bg-white px-5 py-2 text-sm font-semibold text-ksc-dark transition-colors hover:border-primary hover:bg-ksc-mist hover:text-primary"
              >
                {u.shortName} — {u.name}
              </Link>
            ))}
            <Link
              to="/academic"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-ksc-dark"
            >
              View All Academic Programmes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
