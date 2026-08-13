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
      <section className="gradient-head relative overflow-hidden py-14 text-white">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-ksc-gold/20 blur-3xl" />
        <div className="container-site relative">
          <p className="section-kicker">Admissions</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Admissions — {SITE_CONFIG.admissionYear}</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Apply for UG, PG, Diploma, Certificate, Vocational and Short-Term programmes through our
            centre. We guide you through every step — from form to study material.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-10 lg:py-16">
        <div className="container-site">
          <SectionHeading kicker="How to Apply" title="Your admission journey in four steps" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADMISSION_STEPS.map((step, i) => {
              const Icon = stepIcons[i] ?? FileDown;
              return (
                <div key={step.step} className="card-hover p-6 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-bold text-ksc-dark">
                    {step.step}. {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ksc-ink/80">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flyer + downloads */}
      <section className="bg-ksc-mist/60 py-10 lg:py-16">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              kicker="Download"
              title="University prospectus & admission details"
              subtitle="Bring the flyers and prospectus below, or download them here. All three universities admit through our centre."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href="/pdf/ALU-CDOE-Prospectus-AY-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Download className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-ksc-dark">Alagappa University</span>
                  <span className="text-xs text-ksc-ink/70">CDOE Prospectus — AY 2026 (PDF)</span>
                </span>
              </a>
              <a
                href="/pdf/Bharathidasan_University_AY_2026-27_Admission_HD.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Download className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-ksc-dark">Bharathidasan University</span>
                  <span className="text-xs text-ksc-ink/70">AY 2026-27 Admission (PDF)</span>
                </span>
              </a>
              <a
                href="/assets/gallery/tnou-ay2026.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Download className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-ksc-dark">Tamil Nadu Open University</span>
                  <span className="text-xs text-ksc-ink/70">AY 2026 Admission Flyer (Image)</span>
                </span>
              </a>
            </div>
            <p className="mt-4 text-xs text-ksc-ink/60">
              Not sure which programme suits you? Talk to our counsellors — we'll point you to the right
              course and documents before you apply.
            </p>
          </div>
          <div className="order-1 lg:order-2 mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-xl border border-ksc-green/15 bg-white shadow-soft">
              <img
                src="/assets/gallery/tnou-ay2026.jpg"
                alt="TNOU — Academic Year 2026 admission flyer"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility summary */}
      <section className="bg-ksc-mist/60 py-10 lg:py-16">
        <div className="container-site">
          <SectionHeading kicker="Eligibility at a Glance" title="Who can apply" />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {ELIGIBILITY_SUMMARY.map((item) => (
              <div key={item.level} className="card-hover p-5">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="font-bold text-ksc-dark">{item.level}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ksc-ink/85">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-ksc-ink/70">
            Final eligibility is decided by the respective university. Not sure you qualify?{" "}
            <Link to="/contact" className="font-semibold text-primary hover:underline">
              Ask our counsellors
            </Link>{" "}
            — we verify every case before you apply.
          </p>
        </div>
      </section>

      {/* Apply form + universities sidebar */}
      <section className="bg-white py-10 lg:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              kicker="Apply Now"
              title="Start your application"
              subtitle="Share your details and we'll call you back with the exact documents, fees and next steps for your chosen course."
            />
            <div className="card-hover p-6 sm:p-8">
              <EnquiryForm fields={ADMISSIONS_FORM_FIELDS} submitLabel="Submit Application Request" idPrefix="admission" />
            </div>
          </div>

          <aside>
            <SectionHeading align="left" kicker="Universities" title="Programmes available" />
            <ul className="space-y-3">
              {UNIVERSITIES.map((uni) => (
                <li key={uni.id}>
                  <Link
                    to={`/academic#${uni.id}`}
                    className="card-hover flex items-center justify-between gap-3 p-5"
                  >
                    <span>
                      <span className="block font-bold text-ksc-dark">{uni.name}</span>
                      <span className="text-xs text-ksc-ink/70">
                        {uni.academicYear} · {uni.categories.length} programme categories
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="card-hover mt-6 bg-primary p-6 text-white">
              <CheckCircle2 className="h-8 w-8 text-ksc-gold" />
              <h3 className="mt-3 text-lg font-bold">Documents you'll usually need</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-white/85">
                <li>· 10th / 12th mark sheets &amp; certificates</li>
                <li>· Degree certificates (for PG applicants)</li>
                <li>· Passport-size photographs</li>
                <li>· Aadhaar / ID proof</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}