import { Link } from "react-router-dom";
import {
  FileDown,
  ClipboardList,
  Wallet,
  Package,
  CheckCircle2,
  BadgeCheck,
  ArrowRight,
  Download,
  Phone,
} from "lucide-react";
import { ADMISSIONS_FORM_FIELDS } from "../data/site-content";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { EnquiryForm } from "../components/common/EnquiryForm";
import { useScrollReveal } from "../components/home/SharedHooks";

const ELIGIBILITY_SUMMARY = [
  {
    level: "UG Programmes",
    detail: "A pass in Higher Secondary Examination (10+2) or equivalent / 3-year Diploma from a recognized board or institution.",
  },
  {
    level: "PG Programmes",
    detail: "A relevant Bachelor's degree from a recognized university. Specific prerequisites are available under each course on the Academic page.",
  },
  {
    level: "Diploma / Certificate / Vocational",
    detail: "A pass in Higher Secondary Examination (10+2) or equivalent from a recognized board.",
  },
  {
    level: "Distance & Open learning",
    detail: "Programmes are UGC-DEB recognised where applicable; no regular attendance required — study comfortably with our complete guidance.",
  },
];

export function Admissions() {
  const { data: { settings: SITE_CONFIG, admission_steps: fallbackSteps, universities: UNIVERSITIES, pages } } = useSiteData();
  const stepIcons = [FileDown, ClipboardList, Wallet, Package];
  const headerData = (pages?.admissions?.header || {}) as any;
  const stepsData = (pages?.home?.admission_steps || fallbackSteps) as any[];
  const eligibilityData = (pages?.admissions?.eligibility_summary || ELIGIBILITY_SUMMARY) as any[];
  const bannerImage = (pages?.admissions?.banner as any)?.image || "/assets/campus/convocation-alagappa.jpg";
  const sectionHeadings = ((pages?.admissions?.section_headings as any) || {}) as Record<string, { kicker?: string; title?: string; subtitle?: string }>;
  const stepsHeading = sectionHeadings.steps || {};
  const downloadsHeading = sectionHeadings.downloads || {};
  const eligibilityHeading = sectionHeadings.eligibility || {};
  const applyFormHeading = sectionHeadings.apply_form || {};
  const universitiesSidebarHeading = sectionHeadings.universities_sidebar || {};
  const applicationFields = (Array.isArray(pages?.admissions?.application_fields) && (pages!.admissions!.application_fields as any[]).length
    ? pages!.admissions!.application_fields
    : ADMISSIONS_FORM_FIELDS) as typeof ADMISSIONS_FORM_FIELDS;

  useScrollReveal();

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-ksc-red/20 bg-ksc-navy/5 py-16 lg:py-20 text-ksc-navy">
        {/* Background Image */}
        <img loading="lazy"
          src={bannerImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none mix-blend-multiply"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e8f5ff]/90 via-white/95 to-[#fff4d6]/90" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-grid-slate-800/[0.04] bg-[bottom_1px_center] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }} />
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-white/60 blur-[80px]" />
        <div className="container-site relative z-10">
          <p className="section-kicker text-ksc-red bg-white inline-block px-3 py-1 rounded-md mb-2 shadow-sm">{headerData.kicker || 'Admissions'}</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">{headerData.title || `Admissions — ${SITE_CONFIG.admissionYear}`}</h1>
          <p className="mt-4 max-w-2xl text-slate-700 font-bold leading-relaxed">
            {headerData.description || 'Apply for UG, PG, Diploma, Certificate, Vocational and Short-Term programmes through our centre. We guide you through every step — from form to study material.'}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="relative overflow-hidden bg-slate-50/50 bg-dot-pattern py-10 lg:py-16 border-b border-slate-100 reveal-section">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ksc-sky/10 rounded-full blur-[100px] pointer-events-none animate-ambient-drift" />
        <div className="container-site relative z-10">
          <SectionHeading kicker={stepsHeading.kicker || "How to Apply"} title={stepsHeading.title || "Your admission journey in four steps"} />
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 sm:mt-12">
            {stepsData.map((step, i) => {
              const Icon = stepIcons[i] ?? FileDown;
              return (
                <div key={step.step || i} className="card-hover group p-4 sm:p-6 text-center opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0" style={{ transitionDelay: `${i * 150}ms` }}>
                  <span className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy border border-slate-200 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-ksc-red group-hover:text-white">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2]" />
                  </span>
                  <h3 className="mt-4 sm:mt-5 font-black uppercase text-ksc-navy text-base sm:text-lg">
                    {step.step}. {step.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed font-bold text-slate-700">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flyer + downloads */}
      <section className="relative bg-white py-10 lg:py-16 reveal-section overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-ksc-red/5 rounded-full blur-[120px] pointer-events-none animate-ambient-drift" style={{ animationDelay: '-5s' }} />
        <div className="container-site max-w-5xl mx-auto relative z-10">
          <div>
            <SectionHeading
              align="center"
              kicker={downloadsHeading.kicker || "Download"}
              title={downloadsHeading.title || "University prospectus & admission details"}
              subtitle={downloadsHeading.subtitle || "Bring the flyers and prospectus below, or download them here. All four universities admit through our centre."}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 opacity-0 scale-95 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:scale-100 delay-200">
              {UNIVERSITIES.map((uni) => {
                // Prefer the PDF uploaded via the admin panel; fall back to the
                // bundled legacy PDFs before falling back to contact enquiry.
                const legacyFallback: Record<string, string> = {
                  alagappa: "/pdf/ALU-CDOE-Prospectus-AY-2026.pdf",
                  bdu: "/pdf/Bharathidasan_University_AY_2026-27_Admission_HD.pdf",
                };
                const pdfHref = uni.exam.syllabusUrl || legacyFallback[uni.id] || "";
<<<<<<< Updated upstream
                const hasPdf = /\.pdf$/i.test(pdfHref);
                const href = pdfHref || uni.website || "/contact";
=======
                const hasPdf = Boolean(pdfHref);
                const href = hasPdf ? pdfHref : "/contact";
>>>>>>> Stashed changes
                return (
                  <a
                    key={uni.id}
                    href={href}
                    target={hasPdf ? "_blank" : undefined}
                    rel={hasPdf ? "noopener noreferrer" : undefined}
                    className="card-hover flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-ksc-red border-2 border-slate-200 shadow-sm">
                      <Download className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-black text-ksc-navy uppercase text-sm">{uni.name}</span>
                      <span className="text-xs font-bold text-slate-600 tracking-widest">
                        {hasPdf ? `Prospectus — ${uni.academicYear} (PDF)` : "Enquire at Centre"}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
            <p className="mt-10 text-center text-sm font-bold text-slate-800 max-w-2xl mx-auto bg-slate-50 border-2 border-slate-100 p-4 rounded-xl">
              Not sure which programme suits you? Talk to our counsellors — we'll point you to the right
              course and documents before you apply.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility summary */}
      <section className="relative bg-slate-50/80 bg-dot-pattern py-10 lg:py-16 border-t border-slate-100 reveal-section overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-ksc-yellow/5 rounded-full blur-[100px] pointer-events-none animate-ambient-drift" style={{ animationDelay: '-10s' }} />
        <div className="container-site relative z-10">
          <SectionHeading kicker={eligibilityHeading.kicker || "Eligibility at a Glance"} title={eligibilityHeading.title || "Who can apply"} />
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 mt-12">
            {eligibilityData.map((item, i) => (
              <div key={item.level} className="card-hover p-6 opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-6 w-6 shrink-0 text-ksc-red" />
                  <h3 className="font-black uppercase text-ksc-navy">{item.level}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed font-bold text-slate-700">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center text-sm font-bold text-slate-700">
            Final eligibility is decided by the respective university. Not sure you qualify?{" "}
            <Link to="/contact" className="font-black text-ksc-royal hover:text-ksc-red hover:underline">
              Ask our counsellors
            </Link>{" "}
            — we verify every case before you apply.
          </p>
        </div>
      </section>

      {/* Apply form + universities sidebar */}
      <section className="relative overflow-hidden bg-white py-10 lg:py-16 border-t border-slate-100 reveal-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-ksc-navy/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="container-site relative z-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              kicker={applyFormHeading.kicker || "Apply Now"}
              title={applyFormHeading.title || "Start your application"}
              subtitle={applyFormHeading.subtitle || "Share your details and we'll call you back with the exact documents, fees and next steps for your chosen course."}
            />
            <div className="glass-panel p-6 sm:p-8 mt-10 opacity-0 translate-x-[-20px] transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-x-0 delay-200">
              <EnquiryForm fields={applicationFields} submitLabel="Submit Application Request" idPrefix="admission" formType="admissions" />
            </div>
          </div>

          <aside className="opacity-0 translate-x-[20px] transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-x-0 delay-300">
            <SectionHeading align="left" kicker={universitiesSidebarHeading.kicker || "Universities"} title={universitiesSidebarHeading.title || "Programmes available"} />
            <ul className="space-y-4 mt-8">
              {UNIVERSITIES.map((uni) => (
                <li key={uni.id}>
                  <Link
                    to={`/academic#${uni.id}`}
                    className="card-hover flex items-center justify-between gap-3 p-5"
                  >
                    <span>
                      <span className="block font-black uppercase text-ksc-navy">{uni.name}</span>
                      <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                        {uni.academicYear} · {uni.categories.length} categories
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-ksc-red" />
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="tel:9865223107"
              className="mt-6 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-ksc-navy to-ksc-royal p-5 text-white shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ksc-yellow text-ksc-navy">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-white/70">UG / PG programme guidance</span>
                <span className="block text-lg font-black">98652 23107</span>
              </span>
            </a>

            <div className="glass-panel mt-8 p-8">
              <CheckCircle2 className="h-10 w-10 text-ksc-red" />
              <h3 className="mt-4 text-lg font-black uppercase text-ksc-navy">Documents you'll usually need</h3>
              <ul className="mt-4 space-y-2 text-sm font-bold text-slate-800">
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> 10th / 12th mark sheets &amp; certificates</li>
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> Degree certificates (for PG applicants)</li>
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> Passport-size photographs</li>
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> Aadhaar / ID proof</li>
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> Community Certificate (if applicable)</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
