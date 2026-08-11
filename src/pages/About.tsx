import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, Building2, Users } from "lucide-react";
import { ABOUT_PAGE, VISION_MISSION_VALUES } from "../data/site-content";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tabs } from "../components/common/Tabs";
import { PageHeader } from "../components/common/PageHeader";

export function About() {
  return (
    <>
      {/* Page header */}
      <PageHeader 
        title="About Us" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About Us" }]} 
      />

      {/* Long-form copy + facts sidebar */}
      <section className="bg-white py-16">
        <div className="container-site grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              kicker="Who We Are"
              title="Your local bridge to open-university education"
            />
            <div className="space-y-5 leading-relaxed text-ksc-ink/90">
              {ABOUT_PAGE.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-ksc-dark">Membership &amp; Recognition</h3>
              <ul className="mt-4 space-y-2.5">
                {ABOUT_PAGE.membership.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-ksc-ink">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Facts sidebar */}
          <aside className="space-y-5">
            <div className="card-hover p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ksc-mist text-primary">
                <CalendarDays className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm uppercase tracking-wide text-ksc-ink/60">Established</p>
              <p className="text-lg font-bold text-ksc-dark">{ABOUT_PAGE.establishedYear}</p>
              {/* TODO: fill the established year in ABOUT_PAGE (src/data/site-content.ts) */}
            </div>
            <div className="card-hover p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ksc-mist text-primary">
                <Building2 className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm uppercase tracking-wide text-ksc-ink/60">Leadership</p>
              <p className="text-lg font-bold text-ksc-dark">Founder &amp; Chairman</p>
              <div className="mt-2 space-y-1 text-sm text-ksc-ink/80">
                <Link to="/founder">Read Founder Message →</Link>
                <br />
                <Link to="/chairman">Read Chairman Message →</Link>
              </div>
              {/* TODO: chairman + founder names */}
            </div>
            <div className="card-hover p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ksc-mist text-primary">
                <Users className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm uppercase tracking-wide text-ksc-ink/60">Students Served</p>
              <p className="text-lg font-bold text-ksc-dark">5,000+ learners guided</p>
              {/* TODO: real student figure */}
            </div>
          </aside>
        </div>
      </section>

      {/* Vision / Mission / Values detail */}
      <AboutDetail />
    </>
  );
}

function AboutDetail() {
  const intro = VISION_MISSION_VALUES;

  return (
    <section className="bg-ksc-mist/60 py-16">
      <div className="container-site">
        <SectionHeading kicker="Our Foundation" title="Vision · Mission · Values" />
        <div className="mx-auto max-w-4xl">
          <Tabs
            tabs={[
              { id: "vision", label: "Vision" },
              { id: "mission", label: "Mission" },
              { id: "values", label: "Values" },
            ]}
            defaultActive="vision"
          >
            {(activeId) => {
              if (activeId === "vision") {
                return (
                  <div className="card-hover p-8">
                    <p className="text-lg font-medium leading-relaxed text-ksc-dark">{intro.vision}</p>
                  </div>
                );
              }
              if (activeId === "mission") {
                return (
                  <div className="card-hover p-8">
                    <ul className="space-y-3">
                      {intro.mission.map((m) => (
                        <li key={m.slice(0, 20)} className="flex items-start gap-3 text-ksc-ink">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {intro.values.map((v) => (
                    <div key={v.title} className="card-hover p-5">
                      <h4 className="font-bold text-primary">{v.title}</h4>
                      <p className="mt-1.5 text-sm text-ksc-ink/80">{v.description}</p>
                    </div>
                  ))}
                </div>
              );
            }}
          </Tabs>
        </div>
      </div>
    </section>
  );
}