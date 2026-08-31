import { Link } from "react-router-dom";
import { BookOpen, FileText, Download, Info } from "lucide-react";
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
      <section className="bg-white py-10 lg:py-16 reveal-section">
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
      <section className="bg-slate-50/50 bg-dot-pattern py-10 lg:py-16 reveal-section">
        <div className="container-site">
          <SectionHeading
            kicker="Official Resources"
            title="Syllabus downloads by university"
            subtitle="Download the official syllabus and prospectus PDFs for each university directly below."
          />
          <div className="opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-200 mt-10">
            <Accordion
              className="mx-auto max-w-3xl"
              items={UNIVERSITIES.map((uni) => {
                let downloadPdfPath = uni.exam.syllabusUrl || "/pdf/ALU-CDOE-Prospectus-AY-2026.pdf";
                let downloadFilename = `${uni.shortName.replace(/\s+/g, "_")}_Syllabus_AY_2026.pdf`;

                if (uni.id === "alagappa") {
                  downloadPdfPath = "/pdf/ALU-CDOE-Prospectus-AY-2026.pdf";
                  downloadFilename = "Alagappa_University_CDOE_Prospectus_Syllabus_AY_2026.pdf";
                } else if (uni.id === "bdu") {
                  downloadPdfPath = "/pdf/BDU-New-Sem-Pattern-Courses.pdf";
                  downloadFilename = "BDU_New_Semester_Pattern_Courses_Syllabus.pdf";
                }

                return {
                  id: uni.id,
                  title: `${uni.name} (${uni.shortName})`,
                  badge: "Syllabus PDF",
                  content: (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        Download the official syllabus and course prospectus PDF for {uni.name} ({uni.academicYear}). Collect printed copies at Karur Study Centre.
                      </p>
                      
                      <div className="pt-2 flex flex-wrap gap-3">
                        <a
                          href={downloadPdfPath}
                          download={downloadFilename}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
                        >
                          <Download className="h-4 w-4" /> Download {uni.shortName} Syllabus &amp; Prospectus PDF
                        </a>

                        {uni.id === "bdu" && (
                          <a
                            href="/pdf/Bharathidasan_University_AY_2026-27_Admission_HD.pdf"
                            download="Bharathidasan_University_AY_2026-27_Admission_Guide.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all"
                          >
                            <Download className="h-4 w-4" /> Download BDU Admission &amp; Course Guide PDF
                          </a>
                        )}
                      </div>

                      {uni.id === "bdu" && (
                        <p className="flex items-start gap-2 rounded-xl bg-blue-50/70 border border-blue-100 p-3.5 text-xs text-slate-700 font-medium">
                          <Info className="mt-0.5 h-4 w-4 shrink-0 text-ksc-royal" />
                          BDU — Course list &amp; eligibility for AY 2026-27 is available for direct download using the buttons above.
                        </p>
                      )}
                      {uni.id === "alagappa" && (
                        <p className="flex items-start gap-2 rounded-xl bg-blue-50/70 border border-blue-100 p-3.5 text-xs text-slate-700 font-medium">
                          <Info className="mt-0.5 h-4 w-4 shrink-0 text-ksc-royal" />
                          Alagappa University (CDOE) — The complete prospectus with all programme syllabi, eligibility criteria, and fee structure is included in the PDF download above.
                        </p>
                      )}
                    </div>
                  ),
                };
              })}
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