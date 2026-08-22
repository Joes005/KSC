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
} from "lucide-react";
import { ADMISSIONS_FORM_FIELDS } from "../data/site-content";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { EnquiryForm } from "../components/common/EnquiryForm";

const ELIGIBILITY_SUMMARY = [
  {
    level: "UG Programmes",
    detail: "Pass in Higher Secondary (10+2). Science courses need the corresponding core subject in 10+2 (e.g. Mathematics for B.Sc. Maths / BCA).",
  },
  {
    level: "PG Programmes",
    detail: "A relevant Bachelor's degree (e.g. B.Sc. Chemistry for M.Sc. Chemistry). Specific prerequisites appear under each course on the Academic page.",
  },
  {
    level: "Diploma / Certificate / Vocational",
    detail: "Varies by programme — 10th pass (SSLC) is sufficient for most. Confirm your case with our counsellors.",
  },
  {
    level: "Distance & Open learning",
    detail: "Programmes are UGC-DEB recognised where applicable; no regular attendance required — study from home with our support.",
  },
];

export function Admissions() {
  const { data: { settings: SITE_CONFIG, admission_steps: ADMISSION_STEPS, universities: UNIVERSITIES } } = useSiteData();
  const stepIcons = [FileDown, ClipboardList, Wallet, Package];

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-ksc-red/20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e8f5ff] via-white to-[#fff4d6] py-14 text-ksc-navy">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-white/60 blur-[80px]" />
        <div className="container-site relative z-10">
          <p className="section-kicker text-ksc-red bg-white inline-block px-3 py-1 rounded-md mb-2 shadow-sm">Admissions</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Admissions — {SITE_CONFIG.admissionYear}</h1>
          <p className="mt-4 max-w-2xl text-slate-700 font-bold leading-relaxed">
            Apply for UG, PG, Diploma, Certificate, Vocational and Short-Term programmes through our
            centre. We guide you through every step — from form to study material.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="relative overflow-hidden bg-slate-50/50 py-10 lg:py-16 border-b border-slate-100">
        <div className="container-site relative z-10">
          <SectionHeading kicker="How to Apply" title="Your admission journey in four steps" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADMISSION_STEPS.map((step, i) => {
              const Icon = stepIcons[i] ?? FileDown;
              return (
                <div key={step.step} className="card-hover p-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy border border-slate-200 shadow-sm transition-transform duration-300 hover:scale-110 hover:bg-ksc-red hover:text-white">
                    <Icon className="h-8 w-8 stroke-[2]" />
                  </span>
                  <h3 className="mt-5 font-black uppercase text-ksc-navy">
                    {step.step}. {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-slate-500">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flyer + downloads */}
      <section className="bg-white py-10 lg:py-10 lg:py-16">
        <div className="container-site max-w-5xl mx-auto">
          <div>
            <SectionHeading
              align="center"
              kicker="Download"
              title="University prospectus & admission details"
              subtitle="Bring the flyers and prospectus below, or download them here. All four universities admit through our centre."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href="/pdf/ALU-CDOE-Prospectus-AY-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-ksc-red border-2 border-slate-200 shadow-sm">
                  <Download className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-ksc-navy uppercase text-sm">Alagappa University</span>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">CDOE Prospectus — AY 2026 (PDF)</span>
                </span>
              </a>
              <a
                href="/pdf/Bharathidasan_University_AY_2026-27_Admission_HD.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-ksc-red border-2 border-slate-200 shadow-sm">
                  <Download className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-ksc-navy uppercase text-sm">Bharathidasan University</span>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">AY 2026-27 Admission (PDF)</span>
                </span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-ksc-red border-2 border-slate-200 shadow-sm">
                  <Download className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-ksc-navy uppercase text-sm">Manonmaniam Sundaranar</span>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">AY 2026 Admission Flyer (PDF)</span>
                </span>
              </a>

              <a
                href="/pdf/Tamilnadu_Open_University_AY_2026_Admission_HD.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-ksc-red border-2 border-slate-200 shadow-sm">
                  <Download className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-ksc-navy uppercase text-sm">Tamilnadu Open University</span>
                  <span className="text-xs font-bold text-slate-500 tracking-widest">AY 2026 Admission Flyer (PDF)</span>
                </span>
              </a>
            </div>
            <p className="mt-10 text-center text-sm font-medium text-slate-600 max-w-2xl mx-auto bg-slate-50 border-2 border-slate-100 p-4 rounded-xl">
              Not sure which programme suits you? Talk to our counsellors — we'll point you to the right
              course and documents before you apply.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility summary */}
      <section className="bg-slate-50/50 py-10 lg:py-16 border-t border-slate-100">
        <div className="container-site">
          <SectionHeading kicker="Eligibility at a Glance" title="Who can apply" />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 mt-8">
            {ELIGIBILITY_SUMMARY.map((item) => (
              <div key={item.level} className="card-hover p-6">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-6 w-6 shrink-0 text-ksc-red" />
                  <h3 className="font-black uppercase text-ksc-navy">{item.level}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed font-medium text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center text-sm font-medium text-slate-600">
            Final eligibility is decided by the respective university. Not sure you qualify?{" "}
            <Link to="/contact" className="font-bold text-ksc-royal hover:text-ksc-red hover:underline">
              Ask our counsellors
            </Link>{" "}
            — we verify every case before you apply.
          </p>
        </div>
      </section>

      {/* Apply form + universities sidebar */}
      <section className="relative overflow-hidden bg-white py-10 lg:py-16 border-t border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/40 via-white to-white pointer-events-none" />
        <div className="container-site relative z-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              kicker="Apply Now"
              title="Start your application"
              subtitle="Share your details and we'll call you back with the exact documents, fees and next steps for your chosen course."
            />
            <div className="glass-panel p-6 sm:p-8 mt-8">
              <EnquiryForm fields={ADMISSIONS_FORM_FIELDS} submitLabel="Submit Application Request" idPrefix="admission" />
            </div>
          </div>

          <aside>
            <SectionHeading align="left" kicker="Universities" title="Programmes available" />
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

            <div className="glass-panel mt-8 p-8">
              <CheckCircle2 className="h-10 w-10 text-ksc-red" />
              <h3 className="mt-4 text-lg font-black uppercase text-ksc-navy">Documents you'll usually need</h3>
              <ul className="mt-4 space-y-2 text-sm font-medium text-slate-700">
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> 10th / 12th mark sheets &amp; certificates</li>
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> Degree certificates (for PG applicants)</li>
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> Passport-size photographs</li>
                <li className="flex gap-2 items-start"><span className="text-ksc-red font-bold">·</span> Aadhaar / ID proof</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
