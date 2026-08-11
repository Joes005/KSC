import { Link } from "react-router-dom";
import { ExternalLink, Building2, Award, MapPin, Globe } from "lucide-react";
import { UNIVERSITIES, type University } from "../data/universities";
import { PageHeader } from "../components/common/PageHeader";
import { Tabs } from "../components/common/Tabs";
import { ProgrammeCards } from "../components/common/ProgrammeCards";

function UniversityProgrammes({ uni }: { uni: University }) {
  return (
    <section id={uni.id} className="scroll-mt-28 py-14">
      <div className="container-site">
        {/* University header */}
        <div className="rounded-2xl border border-ksc-green/15 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-primary">{uni.name}</h2>
              <p className="mt-1 text-sm text-ksc-ink/80">
                <span className="font-semibold">{uni.shortName}</span> · {uni.academicYear}
              </p>
              {uni.pattern && (
                <p className="mt-1 inline-block rounded-full bg-ksc-mist px-3 py-1 text-xs font-semibold text-primary">
                  {uni.pattern}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {uni.recognition && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ksc-green/15 bg-white px-3 py-1.5 text-xs font-semibold text-ksc-dark">
                  <Award className="h-3.5 w-3.5 text-ksc-gold" /> {uni.recognition}
                </span>
              )}
            </div>
          </div>

          {(uni.address || uni.website) && (
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
                  className="inline-flex items-center gap-1.5 hover:text-primary"
                >
                  <Globe className="h-3.5 w-3.5 text-primary" /> {uni.website}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Category tabs + programme tables */}
        <div className="mt-8">
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
  );
}

export function Academic() {
  return (
    <>
      {/* Page header */}
      <PageHeader 
        title="Programmes by University" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Academic Programmes" }]} 
      />

      {/* Quick university jump nav */}
      <div className="border-b border-ksc-green/10 bg-white py-4">
        <div className="container-site flex flex-wrap items-center gap-2">
          <Building2 className="h-4 w-4 text-ksc-gold" />
          {UNIVERSITIES.map((uni) => (
            <a
              key={uni.id}
              href={`#${uni.id}`}
              className="rounded-full border border-ksc-green/20 px-4 py-1.5 text-sm font-semibold text-ksc-dark transition-colors hover:border-primary hover:bg-ksc-mist hover:text-primary"
            >
              {uni.shortName} — {uni.name}
            </a>
          ))}
        </div>
      </div>

      {/* One section per university */}
      <div className="divide-y divide-ksc-green/10 bg-ksc-mist/40">
        {UNIVERSITIES.map((uni) => (
          <UniversityProgrammes key={uni.id} uni={uni} />
        ))}
      </div>

      {/* Eligibility note */}
      <section className="bg-white py-12">
        <div className="container-site">
          <div className="rounded-2xl border border-ksc-green/15 bg-ksc-mist/60 p-6 text-sm leading-relaxed text-ksc-ink/90">
            <p className="font-bold text-primary">Eligibility notes</p>
            <p className="mt-2">
              General eligibility for most UG programmes is a pass in Higher Secondary (10+2); science
              courses additionally require the corresponding core subject (e.g. Mathematics for B.Sc.
              Maths / BCA). PG programmes require the relevant Bachelor's degree. Final eligibility is
              always as per the respective university's admission notification — our counsellors can
              verify your specific case at the centre.
            </p>
            <p className="mt-3">
              Looking for something not listed? Contact us — more programmes may be available for the
              current admission round.
            </p>
            <div className="mt-5">
              <Link to="/admissions" className="btn-gold inline-flex">
                Apply for Admission <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}