import { Link } from "react-router-dom";
import { ExternalLink, Building2, Award, MapPin, Globe, GraduationCap, Download } from "lucide-react";
import type { University } from "../data/universities";
import { useSiteData } from "../services/SiteDataContext";
import { PageHeader } from "../components/common/PageHeader";
import { Tabs } from "../components/common/Tabs";
import { ProgrammeCards } from "../components/common/ProgrammeCards";
import { useScrollReveal } from "../components/home/SharedHooks";

/** A distinct accent colour per university so each "Explore Programme" block reads as its own section. */
const UNI_ACCENT: Record<string, { bar: string; badge: string; ring: string }> = {
  alagappa: { bar: "from-ksc-red to-[#7a0d12]", badge: "border-ksc-red bg-red-50 text-ksc-red", ring: "hover:border-ksc-red" },
  bdu: { bar: "from-ksc-royal to-[#0c245c]", badge: "border-ksc-royal bg-blue-50 text-ksc-royal", ring: "hover:border-ksc-royal" },
  msu: { bar: "from-emerald-600 to-ksc-chalk", badge: "border-emerald-600 bg-emerald-50 text-emerald-700", ring: "hover:border-emerald-600" },
  tnou: { bar: "from-ksc-gold to-amber-600", badge: "border-ksc-gold bg-amber-50 text-amber-700", ring: "hover:border-ksc-gold" },
};
const DEFAULT_ACCENT = { bar: "from-ksc-navy via-ksc-red to-ksc-gold", badge: "border-slate-300 bg-slate-50 text-slate-600", ring: "hover:border-ksc-navy" };

function UniversityProgrammes({ uni }: { uni: University }) {
  const accent = UNI_ACCENT[uni.id] || DEFAULT_ACCENT;
  const prospectusHref = uni.exam?.syllabusUrl || uni.website || "/contact";
  const isPdf = /\.pdf$/i.test(prospectusHref);
  return (
    <section id={uni.id} className="scroll-mt-28 relative overflow-hidden py-10 sm:py-12 lg:py-16 border-b border-slate-100 bg-white bg-dot-pattern reveal-section">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/40 via-white to-white pointer-events-none" />
      <div className="container-site relative z-10">
        {/* University header */}
        <div className={`group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-xl transition-all duration-700 hover:shadow-2xl opacity-0 translate-y-12 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-100 ${accent.ring}`}>
          <div className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${accent.bar}`} />
          
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl border-2 border-slate-100 bg-slate-50 shadow-sm overflow-hidden">
                {uni.logo ? (
                  <img loading="lazy" src={uni.logo} alt={`${uni.shortName} Logo`} className="h-full w-full object-contain p-2" />
                ) : (
                  <GraduationCap className="h-8 w-8 text-ksc-navy" />
                )}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-ksc-navy">{uni.name}</h2>
                <p className="mt-2 text-sm sm:text-base font-extrabold text-slate-700 uppercase tracking-widest">
                  <span className="text-ksc-navy font-black">{uni.shortName}</span> · {uni.academicYear}
                </p>
                {uni.pattern && (
                  <p className="mt-3 inline-block rounded-md bg-white border-2 border-slate-300 px-4 py-1.5 text-xs font-black tracking-widest uppercase text-ksc-navy shadow-xs">
                    {uni.pattern}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {uni.recognition && (
                <span className="inline-flex items-center gap-2 rounded-md border-2 border-ksc-red bg-red-50 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-widest text-ksc-red shadow-xs">
                  <Award className="h-5 w-5 text-ksc-red shrink-0" /> {uni.recognition}
                </span>
              )}
            </div>
          </div>

          {(uni.address || uni.website) && (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm font-bold text-slate-700">
              {uni.address && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-ksc-red" /> {uni.address}
                </span>
              )}
              {uni.website && (
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-extrabold text-ksc-royal hover:text-ksc-red hover:underline transition-colors"
                >
                  <Globe className="h-4 w-4" /> {uni.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          )}

          {/* Eligibility + prospectus callout */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              Eligibility is shown against each programme below. For the full official {isPdf ? "prospectus" : "admission details"}, use the link.
            </p>
            <a
              href={prospectusHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg border-2 px-4 py-2 text-xs font-black uppercase tracking-widest shadow-sm transition-colors ${accent.badge} hover:text-white hover:bg-ksc-navy hover:border-ksc-navy`}
            >
              {isPdf ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
              {isPdf ? "Download Prospectus" : "Eligibility & Admission Details"}
            </a>
          </div>
        </div>

        {/* Category tabs + programme tables */}
        <div className="mt-10 opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-300">
          <Tabs
            key={uni.id}
            tabs={uni.categories.map((c) => ({
              id: c.id,
              label: c.label,
              badge: c.count,
            }))}
          >
            {(activeId) => {
              const cat = uni.categories.find((c) => c.id === activeId) ?? uni.categories[0];
              return (
                <div>
                  {cat && (
                    <>
                      {cat.note && (
                        <p className="mb-6 rounded-xl bg-amber-50 px-5 py-3 text-sm sm:text-base font-bold text-amber-950 border-2 border-amber-200 shadow-2xs">
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
  );
}

export function Academic() {
  const { data: { universities: UNIVERSITIES, pages } } = useSiteData();
  const banner = (pages?.academic?.banner as any) || {};

  useScrollReveal();

  return (
    <>
      {/* Page header */}
      <PageHeader bgImage={banner.image || "/assets/gallery/ksc-09.jpg"}
        title="Programmes by University"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Academic Programmes" }]}
      />

      {/* Quick university jump nav */}
      <div className="border-b-4 border-ksc-yellow bg-slate-50 py-3 sm:py-5 reveal-section">
        <div className="container-site flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x snap-mandatory touch-pan-x opacity-0 translate-y-8 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 sm:flex-wrap">
          <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-ksc-navy shrink-0 hidden sm:block" />
          {UNIVERSITIES.map((uni) => (
            <a
              key={uni.id}
              href={`#${uni.id}`}
              className="shrink-0 snap-start rounded-xl border-2 border-slate-300 bg-white px-3.5 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-black uppercase tracking-wider text-ksc-navy transition-all active:scale-95 hover:border-ksc-red hover:bg-ksc-red hover:text-white shadow-xs"
            >
              {uni.shortName}
            </a>
          ))}
        </div>
      </div>

      {/* One section per university */}
      <div className="bg-slate-50">
        {UNIVERSITIES.map((uni) => (
          <UniversityProgrammes key={uni.id} uni={uni} />
        ))}
      </div>

      {/* Eligibility note */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-16 border-t border-slate-100 bg-dot-pattern reveal-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/60 via-white to-white pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="glass-panel grid lg:grid-cols-2 gap-6 lg:gap-10 items-center p-5 sm:p-8 lg:p-12 opacity-0 scale-95 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:scale-100">
            <div className="order-2 lg:order-1 text-sm leading-relaxed text-slate-800 font-bold">
              <p className="font-black text-ksc-red uppercase text-2xl mb-4">Eligibility notes</p>
              <p className="mt-2 text-base font-bold text-slate-800 leading-relaxed">
                General eligibility for most Undergraduate (UG) programmes is a pass in Higher Secondary (10+2) or equivalent from a recognized board. Postgraduate (PG) programmes require a relevant Bachelor's degree. Diploma and Certificate courses require 10th or 12th qualification. Final eligibility and admission guidelines are as per the respective university's notification — our counsellors at Karur Study Centre will assist with complete verification.
              </p>
              <p className="mt-4 text-sm sm:text-base text-slate-700 font-bold max-w-2xl mx-auto leading-relaxed">
                Programme lists are refreshed for every admission round — Alagappa University, Bharathidasan University, Manonmaniam Sundaranar University, and Tamilnadu Open University all admit through our centre. Looking for something not listed?
                Contact us — more programmes may be available for the current admission round.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/admissions" className="btn-gold inline-flex justify-center items-center btn-shimmer">
                  Apply for Admission <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-outline bg-white inline-flex justify-center items-center">
                  Talk to Counsellor
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img loading="lazy"
                  src={banner.secondary_image || "/assets/user-photos/study-materials.jpg"}
                  alt="Study Materials"
                  className="w-full h-[220px] sm:h-[300px] object-cover transform hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
