import { Link } from "react-router-dom";
import { ExternalLink, Building2, Award, MapPin, Globe } from "lucide-react";
import type { University } from "../data/universities";
import { useSiteData } from "../services/SiteDataContext";
import { PageHeader } from "../components/common/PageHeader";
import { Tabs } from "../components/common/Tabs";
import { ProgrammeCards } from "../components/common/ProgrammeCards";

function UniversityProgrammes({ uni }: { uni: University }) {
  return (
    <section id={uni.id} className="scroll-mt-28 relative overflow-hidden py-12 sm:py-16 lg:py-12 lg:py-24 border-b border-slate-100 bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/40 via-white to-white pointer-events-none" />
      <div className="container-site relative z-10">
        {/* University header */}
        <div className="glass-panel p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-ksc-navy uppercase">{uni.name}</h2>
              <p className="mt-2 text-sm sm:text-base font-bold text-slate-500 uppercase tracking-widest">
                <span className="text-ksc-navy">{uni.shortName}</span> · {uni.academicYear}
              </p>
              {uni.pattern && (
                <p className="mt-3 inline-block rounded-md bg-white border-2 border-slate-200 px-4 py-1.5 text-xs font-black tracking-widest uppercase text-ksc-navy shadow-sm">
                  {uni.pattern}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {uni.recognition && (
                <span className="inline-flex items-center gap-2 rounded-md border-2 border-ksc-red bg-red-50 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-widest text-ksc-red shadow-sm">
                  <Award className="h-5 w-5 text-ksc-red" /> {uni.recognition}
                </span>
              )}
            </div>
          </div>

          {(uni.address || uni.website) && (
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
                  className="inline-flex items-center gap-2 font-bold text-ksc-royal hover:text-ksc-red hover:underline transition-colors"
                >
                  <Globe className="h-4 w-4" /> {uni.website}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Category tabs + programme tables */}
        <div className="mt-10">
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
                        <p className="mb-6 rounded-xl bg-ksc-gold/10 px-5 py-3 text-sm font-medium text-ksc-gold border border-ksc-gold/20">
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
  const { data: { universities: UNIVERSITIES } } = useSiteData();
  return (
    <>
      {/* Page header */}
      <PageHeader bgImage="/assets/gallery/ksc-09.jpg" 
        title="Programmes by University" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Academic Programmes" }]} 
      />

      {/* Quick university jump nav */}
      <div className="border-b-4 border-ksc-yellow bg-slate-50 py-5">
        <div className="container-site flex flex-wrap items-center gap-3">
          <Building2 className="h-6 w-6 text-ksc-navy" />
          {UNIVERSITIES.map((uni) => (
            <a
              key={uni.id}
              href={`#${uni.id}`}
              className="rounded-md border-2 border-slate-200 bg-white px-5 py-2 text-sm font-black uppercase tracking-widest text-ksc-navy transition-colors hover:border-ksc-red hover:bg-ksc-red hover:text-white shadow-sm"
            >
              {uni.shortName !== uni.name ? `${uni.shortName} — ${uni.name}` : uni.name}
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
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-12 lg:py-24 border-t border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/60 via-white to-white pointer-events-none" />
        <div className="container-site relative z-10">
          <div className="glass-panel grid lg:grid-cols-2 gap-6 lg:gap-10 items-center p-8 sm:p-12">
            <div className="order-2 lg:order-1 text-sm leading-relaxed text-slate-700 font-medium">
              <p className="font-black text-ksc-red uppercase text-2xl mb-4">Eligibility notes</p>
              <p className="mt-2 text-base">
                General eligibility for most UG programmes is a pass in Higher Secondary (10+2); science
                courses additionally require the corresponding core subject (e.g. Mathematics for B.Sc.
                Maths / BCA). PG programmes require the relevant Bachelor's degree. Final eligibility is
                always as per the respective university's admission notification — our counsellors can
                verify your specific case at the centre.
              </p>
              <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium max-w-2xl mx-auto">
                Programme lists are refreshed for every admission round — Alagappa University, Bharathiar University, Manonmaniam Sundaranar University, and Tamilnadu Open University all admit through our centre. Looking for something not listed?
                Contact us — more programmes may be available for the current admission round.
              </p>
              <div className="mt-8 flex gap-4">
                <Link to="/admissions" className="btn-gold inline-flex">
                  Apply for Admission <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-outline bg-white inline-flex">
                  Talk to Counsellor
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img loading="lazy" 
                  src="/assets/user-photos/study-materials.jpg" 
                  alt="Study Materials" 
                  className="w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
