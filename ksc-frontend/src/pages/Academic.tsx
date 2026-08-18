import { Link } from "react-router-dom";
import { ExternalLink, Building2, Award, MapPin, Globe } from "lucide-react";
import type { University } from "../data/universities";
import { useSiteData } from "../services/SiteDataContext";
import { PageHeader } from "../components/common/PageHeader";
import { Tabs } from "../components/common/Tabs";
import { ProgrammeCards } from "../components/common/ProgrammeCards";

function UniversityProgrammes({ uni }: { uni: University }) {
  return (
    <section id={uni.id} className="scroll-mt-28 py-12 sm:py-16 lg:py-12 lg:py-24">
      <div className="container-site">
        {/* University header */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">{uni.name}</h2>
              <p className="mt-2 text-sm sm:text-base text-white/70">
                <span className="font-semibold">{uni.shortName}</span> · {uni.academicYear}
              </p>
              {uni.pattern && (
                <p className="mt-3 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-secondary">
                  {uni.pattern}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {uni.recognition && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs sm:text-sm font-semibold text-white">
                  <Award className="h-4 w-4 text-ksc-gold" /> {uni.recognition}
                </span>
              )}
            </div>
          </div>

          {(uni.address || uni.website) && (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs sm:text-sm text-white/60">
              {uni.address && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" /> {uni.address}
                </span>
              )}
              {uni.website && (
                <a
                  href={`https://${uni.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-secondary transition-colors"
                >
                  <Globe className="h-4 w-4 text-secondary" /> {uni.website}
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
      <div className="border-b border-white/5 bg-white/5 py-5">
        <div className="container-site flex flex-wrap items-center gap-3">
          <Building2 className="h-5 w-5 text-ksc-gold" />
          {UNIVERSITIES.map((uni) => (
            <a
              key={uni.id}
              href={`#${uni.id}`}
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-primary hover:bg-white/10 hover:text-secondary shadow-sm"
            >
              {uni.shortName !== uni.name ? `${uni.shortName} — ${uni.name}` : uni.name}
            </a>
          ))}
        </div>
      </div>

      {/* One section per university */}
      <div className="divide-y divide-ksc-green/10 bg-ksc-navy">
        {UNIVERSITIES.map((uni) => (
          <UniversityProgrammes key={uni.id} uni={uni} />
        ))}
      </div>

      {/* Eligibility note */}
      <section className="bg-white/5 py-12 sm:py-16 lg:py-12 lg:py-24">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 shadow-xl">
            <div className="order-2 lg:order-1 text-sm leading-relaxed text-white/80">
              <p className="font-bold text-secondary text-xl mb-4">Eligibility notes</p>
              <p className="mt-2">
                General eligibility for most UG programmes is a pass in Higher Secondary (10+2); science
                courses additionally require the corresponding core subject (e.g. Mathematics for B.Sc.
                Maths / BCA). PG programmes require the relevant Bachelor's degree. Final eligibility is
                always as per the respective university's admission notification — our counsellors can
                verify your specific case at the centre.
              </p>
              <p className="mt-2 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
                Programme lists are refreshed for every admission round — Alagappa University, Bharathiar University, Manonmaniam Sundaranar University, and Tamilnadu Open University all admit through our centre. Looking for something not listed?
                Contact us — more programmes may be available for the current admission round.
              </p>
              <div className="mt-8">
                <Link to="/admissions" className="btn-gold inline-flex">
                  Apply for Admission <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl shadow-md border border-white/10">
                <img 
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