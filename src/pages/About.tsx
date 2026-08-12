import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, Building2, Users, ArrowRight } from "lucide-react";
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
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              kicker="Who We Are"
              title="Your local bridge to open-university education"
            />
            <div className="space-y-5 leading-relaxed text-ksc-ink/90 text-sm sm:text-base">
              <p>{ABOUT_PAGE.body[0]}</p>
              
              <div className="my-10 overflow-hidden rounded-3xl shadow-xl border border-gray-100">
                <img 
                  src="/assets/images/about-students.png" 
                  alt="Happy students at Karur Study Centre" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
                />
              </div>

              {ABOUT_PAGE.body.slice(1).map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-ksc-mist/50 p-6 sm:p-8 border border-ksc-green/10">
              <h3 className="text-xl font-bold text-ksc-dark mb-5">Membership &amp; Recognition</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {ABOUT_PAGE.membership.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-sm text-ksc-ink/90">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> 
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Facts sidebar */}
          <aside className="space-y-6">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
              <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <CalendarDays className="h-6 w-6 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-ksc-gold">Established</p>
              <p className="mt-1 text-2xl font-bold text-ksc-dark">{ABOUT_PAGE.establishedYear}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
              <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <Building2 className="h-6 w-6 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-ksc-gold">Leadership</p>
              <p className="mt-1 text-xl font-bold text-ksc-dark">Founder &amp; Chairman</p>
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-primary">
                <Link to="/founder" className="inline-flex items-center hover:text-ksc-dark transition-colors">Read Founder Message <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                <Link to="/chairman" className="inline-flex items-center hover:text-ksc-dark transition-colors">Read Chairman Message <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
              <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <Users className="h-6 w-6 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-ksc-gold">Students Served</p>
              <p className="mt-1 text-2xl font-bold text-ksc-dark">50,000+ <span className="text-base font-medium text-ksc-ink/70">learners</span></p>
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