import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, Building2, Users, ArrowRight } from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tabs } from "../components/common/Tabs";
import { PageHeader } from "../components/common/PageHeader";

export function About() {
  const { data: { about_snapshot: ABOUT_PAGE } } = useSiteData(); // Note: reusing about_snapshot structure for fallback or create separate
  return (
    <>
      {/* Page header */}
      <PageHeader bgImage="/assets/images/about-students.png" 
        title="About Us" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About Us" }]} 
      />

      {/* Long-form copy + facts sidebar */}
      <section className="bg-ksc-navy py-16 sm:py-10 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              kicker="Who We Are"
              title="Your local bridge to open-university education"
            />
            <div className="space-y-5 leading-relaxed text-white/80 text-sm sm:text-base">
              <p>{ABOUT_PAGE.body[0]}</p>
              
              <div className="my-10 overflow-hidden rounded-3xl shadow-xl border border-white/10">
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


          </div>

          {/* Facts sidebar */}
          <aside className="space-y-6">

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-secondary/20">
              <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-ksc-navy-dark/5 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ksc-navy-dark/10 to-primary/5 text-secondary shadow-inner ring-1 ring-secondary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-ksc-navy-dark group-hover:text-white">
                <CalendarDays className="h-6 w-6 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-ksc-gold">Established</p>
              <p className="mt-1 text-2xl font-bold text-white">{ABOUT_PAGE.establishedYear}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-secondary/20">
              <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-ksc-navy-dark/5 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ksc-navy-dark/10 to-primary/5 text-secondary shadow-inner ring-1 ring-secondary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-ksc-navy-dark group-hover:text-white">
                <Building2 className="h-6 w-6 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-ksc-gold">Leadership</p>
              <p className="mt-1 text-xl font-bold text-white">Founder &amp; Chairman</p>
              <div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-secondary">
                <Link to="/founder" className="inline-flex items-center hover:text-white transition-colors">Read Founder Message <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                <Link to="/chairman" className="inline-flex items-center hover:text-white transition-colors">Read Chairman Message <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-secondary/20">
              <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-ksc-navy-dark/5 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ksc-navy-dark/10 to-primary/5 text-secondary shadow-inner ring-1 ring-secondary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-ksc-navy-dark group-hover:text-white">
                <Users className="h-6 w-6 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-ksc-gold">Students Served</p>
              <p className="mt-1 text-2xl font-bold text-white">50,000+ <span className="text-base font-medium text-white/60">learners</span></p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-5">Membership &amp; Recognition</h3>
              <ul className="flex flex-col gap-4">
                {ABOUT_PAGE.membership.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /> 
                    <span className="leading-snug">{m}</span>
                  </li>
                ))}
              </ul>
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
  const { data: { vision_mission: VISION_MISSION_VALUES } } = useSiteData();
  const intro = VISION_MISSION_VALUES;

  return (
    <section className="bg-ksc-navy py-10 lg:py-10 lg:py-16">
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
                    <p className="text-lg font-medium leading-relaxed text-white">{intro.vision}</p>
                  </div>
                );
              }
              if (activeId === "mission") {
                return (
                  <div className="card-hover p-8">
                    <ul className="space-y-3">
                      {intro.mission.map((m) => (
                        <li key={m.slice(0, 20)} className="flex items-start gap-3 text-white/80">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /> {m}
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
                      <h4 className="font-bold text-secondary">{v.title}</h4>
                      <p className="mt-1.5 text-sm text-white/70">{v.description}</p>
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
