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
import { useSiteData } from "../services/SiteDataContext";
import { PageHeader } from "../components/common/PageHeader";
import { Tabs } from "../components/common/Tabs";
import { ProgrammeCards } from "../components/common/ProgrammeCards";

export function University() {
  const { id } = useParams<{ id: string }>();
  const { data: { universities: UNIVERSITIES, settings: SITE_CONFIG } } = useSiteData();
  const uni = UNIVERSITIES.find((u) => u.id === id);

  if (!uni) {
    return <Navigate to="/academic" replace />;
  }

  return (
    <>
      {/* Page header */}
      <PageHeader bgImage="/assets/gallery/tnou-ay2026.jpg"
        title={uni.shortName}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Academic", to: "/academic" },
          { label: uni.shortName },
        ]}
      />

      {/* University intro card */}
      <section className="bg-slate-50 py-14 border-b-4 border-ksc-yellow">
        <div className="container-site">
          <div className="overflow-hidden rounded-3xl border-[6px] border-white bg-white shadow-xl">
            <div className="grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:p-10">
              <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-2xl border-4 border-slate-100 bg-white shadow-md overflow-hidden">
                {uni.logo ? (
                  <img src={uni.logo} alt={`${uni.shortName} Logo`} className="h-full w-full object-contain p-2" />
                ) : (
                  <GraduationCap className="h-10 w-10 text-ksc-navy" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-black text-ksc-navy uppercase sm:text-4xl leading-tight">{uni.name}</h1>
                <p className="mt-2 text-sm sm:text-base font-bold text-slate-500 uppercase tracking-widest">
                  {uni.academicYear} · {uni.pattern}
                </p>
                {uni.recognition && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-red-50 border-2 border-ksc-red px-4 py-1.5 text-xs font-black uppercase tracking-widest text-ksc-red">
                    <Award className="h-4 w-4" /> {uni.recognition}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-slate-600">
                  {uni.address && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-ksc-red" /> {uni.address}
                    </span>
                  )}
                  {uni.website && (
                    <a
                      href={`https://${uni.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-bold text-ksc-royal hover:text-ksc-red hover:underline"
                    >
                      <Globe className="h-4 w-4" /> {uni.website}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:justify-center">
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
          <div className="mt-12">
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
                          <p className="mb-6 rounded-md border-2 border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm">
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
      <section className="bg-white py-14 border-t-4 border-ksc-yellow">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black uppercase text-ksc-navy">
              {uni.shortName} — Exam Resources
            </h2>
            <p className="mt-2 text-sm leading-relaxed font-medium text-slate-600">{uni.exam.note}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href={uni.exam.hallTicketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center justify-between gap-3 p-5 bg-slate-50 border-2 border-slate-100"
              >
                <span className="inline-flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-ksc-red border-2 border-slate-200 shadow-sm">
                    <TicketCheck className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-bold text-ksc-navy uppercase text-sm">Hall Ticket Portal</span>
                    <span className="text-xs font-bold text-slate-500">{uni.name}</span>
                  </span>
                </span>
                <ExternalLink className="h-5 w-5 shrink-0 text-slate-400" />
              </a>
              <a
                href={uni.exam.timetableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center justify-between gap-3 p-5 bg-slate-50 border-2 border-slate-100"
              >
                <span className="inline-flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-ksc-red border-2 border-slate-200 shadow-sm">
                    <FileText className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-bold text-ksc-navy uppercase text-sm">Exam Timetable (PDF)</span>
                    <span className="text-xs font-bold text-slate-500">{uni.name}</span>
                  </span>
                </span>
                <ExternalLink className="h-5 w-5 shrink-0 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border-4 border-white bg-slate-100 p-8 text-ksc-navy shadow-xl">
            <h3 className="text-xl font-black uppercase">Need admission guidance?</h3>
            <p className="mt-4 text-sm font-medium text-slate-700 leading-relaxed">
              Walk into {SITE_CONFIG.name} in Karur and our counsellors will help you pick the
              right {uni.shortName} programme, complete the application and plan for exams.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-white border-2 border-ksc-navy px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-ksc-navy transition-colors hover:bg-ksc-navy hover:text-white"
            >
              Talk to a Counsellor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Other universities */}
      <section className="bg-slate-50 py-14 border-t-4 border-ksc-red">
        <div className="container-site">
          <h2 className="text-center text-xl font-black uppercase text-ksc-navy">Explore other universities</h2>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-4">
            {UNIVERSITIES.filter((u) => u.id !== uni.id).map((u) => (
              <Link
                key={u.id}
                to={`/university/${u.id}`}
                className="rounded-md border-2 border-slate-200 bg-white px-5 py-2 text-sm font-bold uppercase tracking-widest text-slate-600 shadow-sm transition-colors hover:border-ksc-red hover:bg-ksc-red hover:text-white"
              >
                {u.shortName !== u.name ? `${u.shortName} — ${u.name}` : u.name}
              </Link>
            ))}
            <Link
              to="/academic"
              className="rounded-md bg-ksc-navy px-5 py-2 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-ksc-royal"
            >
              View All Academic Programmes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
