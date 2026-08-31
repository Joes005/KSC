import { Link } from "react-router-dom";
import { BookOpen, FileText, ExternalLink, Info } from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { Accordion } from "../components/common/Accordion";
import { PageHeader } from "../components/common/PageHeader";
import { SectionHeading } from "../components/common/SectionHeading";
import { useScrollReveal } from "../components/home/SharedHooks";

export function Curriculum() {
  const { data: { pages, curriculum: fallbackCurriculum, universities: UNIVERSITIES } } = useSiteData();
  const CURRICULUM = (pages?.curriculum?.content || fallbackCurriculum) as any;
  
  useScrollReveal();
  
  return (
    <>
      {/* Page header */}
      <PageHeader bgImage="/assets/gallery/ksc-10.jpg" 
        title="Curriculum & Syllabus" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Curriculum" }]} 
      />

      {/* How it works */}
      <section className="bg-white py-10 lg:py-10 lg:py-16 reveal-section">
        <div className="container-site">
          <SectionHeading kicker="Study Pattern" title="How distance-education courses are structured" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {CURRICULUM.points.map(({ title, description }: any, i: number) => (
              <div key={title} className="card-hover flex gap-4 p-6 opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0" style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ksc-red/10 text-ksc-red">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ksc-dark">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ksc-ink/80">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-university syllabus links */}
      <section className="bg-slate-50/50 bg-dot-pattern py-10 lg:py-10 lg:py-16 reveal-section">
        <div className="container-site">
          <SectionHeading
            kicker="Official Resources"
            title="Syllabus downloads by university"
            subtitle="The definitive syllabus for every programme is published by the parent university. Use the links below to download the PDFs."
          />
          <div className="opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-200 mt-10">
            <Accordion
              className="mx-auto max-w-3xl"
            items={UNIVERSITIES.map((uni) => ({
              id: uni.id,
              title: `${uni.name} (${uni.shortName})`,
              badge: "Syllabus",
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-ksc-ink/85">
                    Official syllabus pages for programmes offered under {uni.academicYear}. Download
                    the syllabus PDF for the programme you plan to pursue, or collect a printed copy at
                    our centre.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href={uni.exam.syllabusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-primary hover:text-ksc-green-mid"
                      >
                        <FileText className="h-4 w-4" /> {uni.name} — Syllabus PDFs
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={uni.website ? `https://${uni.website}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-primary hover:text-ksc-green-mid"
                      >
                        <ExternalLink className="h-4 w-4" /> Official website{uni.website ? "" : " (coming soon)"}
                      </a>
                    </li>
                  </ul>
                  {uni.id === "bdu" && (
                    <p className="flex items-start gap-2 rounded-lg bg-white p-3 text-xs text-ksc-ink/70">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-ksc-gold" />
                      BDU — course list &amp; eligibility for AY 2026-27 is also available as a PDF in
                      the Downloads section on the Admissions page.
                    </p>
                  )}
                  {uni.id === "alagappa" && (
                    <p className="flex items-start gap-2 rounded-lg bg-white p-3 text-xs text-ksc-ink/70">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-ksc-gold" />
                      ALU — the full CDOE prospectus (programmes, eligibility, syllabus, fee structure)
                      is available as a PDF in the Downloads section on the Admissions page.
                    </p>
                  )}
                </div>
              ),
            }))}
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl text-center text-sm text-slate-600 font-medium opacity-0 translate-y-8 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-300">
            {CURRICULUM.note}
            <div className="mt-4">
              <Link to="/academic" className="btn-outline">
                Back to Programme Lists
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}