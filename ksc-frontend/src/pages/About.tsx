import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, Building2, Users, ArrowRight } from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tabs } from "../components/common/Tabs";
import { PageHeader } from "../components/common/PageHeader";
import { useScrollReveal } from "../components/home/SharedHooks";

export function About() {
  const { data: { pages, about_snapshot: fallbackAboutPage } } = useSiteData();
  const ABOUT_PAGE = (pages?.about?.about_page || fallbackAboutPage) as any;
  const bannerImage = (pages?.about?.banner as any)?.image || "/assets/campus/building-exterior.jpg";

  useScrollReveal();

  return (
    <>
      {/* Page header */}
      <PageHeader bgImage={bannerImage}
        title="About Us"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* Long-form copy + facts sidebar */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-10 lg:py-12 border-b border-slate-100 bg-dot-pattern reveal-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />
        <div className="container-site relative grid gap-12 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2 opacity-0 translate-x-[-20px] transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-x-0 delay-100">
            <SectionHeading
              align="left"
              kicker={ABOUT_PAGE.heading?.kicker || "Who We Are"}
              title={ABOUT_PAGE.heading?.title || "Your local bridge to open-university education"}
            />
            <div className="space-y-5 leading-relaxed text-slate-700 font-medium text-sm sm:text-base mt-6">
              <p>{ABOUT_PAGE.body[0]}</p>

              <div className="my-10 overflow-hidden rounded-3xl shadow-lift border border-slate-200 p-2 bg-white">
                <img
                  src={ABOUT_PAGE.image || "/assets/campus/convocation-alagappa.jpg"}
                  alt="Happy students at Karur Study Centre"
                  className="w-full h-auto rounded-2xl object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {ABOUT_PAGE.body.slice(1).map((para: any) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>


          </div>

          {/* Facts sidebar */}
          <aside className="space-y-6 mt-12 lg:mt-0 opacity-0 translate-x-[20px] transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-x-0 delay-300">

            <div className="card-hover p-6">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <CalendarDays className="h-8 w-8 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Established</p>
              <p className="mt-1 text-3xl font-bold text-slate-800">{ABOUT_PAGE.establishedYear}</p>
            </div>

            <div className="card-hover p-6">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <Building2 className="h-8 w-8 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Leadership</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">Founder &amp; Chairman</p>
              <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-ksc-navy">
                <Link to="/founder" className="inline-flex items-center hover:text-ksc-red transition-colors">Read Founder Message <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                <Link to="/chairman" className="inline-flex items-center hover:text-ksc-red transition-colors">Read Chairman Message <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </div>
            </div>

            <div className="card-hover p-6">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <Users className="h-8 w-8 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Students Served</p>
              <p className="mt-1 text-3xl font-bold text-slate-800">50,000+ <span className="text-lg font-semibold text-slate-500">learners</span></p>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-ksc-navy mb-5">Membership &amp; Recognition</h3>
              <ul className="flex flex-col gap-4">
                {ABOUT_PAGE.membership.map((m: any) => (
                  <li key={m} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ksc-yellow" />
                    <span className="leading-relaxed">{m}</span>
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
  const { data: { pages, vision_mission: fallbackIntro } } = useSiteData();
  const intro = (pages?.home?.vision_mission || fallbackIntro) as any;
  const heading = ((pages?.home?.section_headings as any)?.vision_mission || {}) as { kicker?: string; title?: string };

  return (
    <section className="relative bg-white py-10 lg:py-10 lg:py-16 bg-dot-pattern reveal-section">
      <div className="container-site opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
        <SectionHeading kicker={heading.kicker || "Our Foundation"} title={heading.title || "Vision · Mission · Values"} />
        <div className="mx-auto max-w-6xl mt-8">
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
                  <div className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-slate-100 group animate-fade-in-up max-w-4xl mx-auto">
                    {/* Decorative quote mark */}
                    <div className="absolute -top-4 -right-2 text-[120px] font-black text-ksc-red/5 font-heading leading-none transition-transform duration-700 group-hover:scale-110 group-hover:text-ksc-red/10 select-none pointer-events-none">"</div>
                    {/* Animated bottom border */}
                    <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-ksc-red to-ksc-yellow transition-all duration-700 ease-out group-hover:w-full" />
                    
                    <p className="text-xl sm:text-2xl font-heading font-black leading-relaxed text-ksc-navy relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                      {intro.vision}
                    </p>
                  </div>
                );
              }
              if (activeId === "mission") {
                return (
                  <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up">
                    {intro.mission.map((m: any) => (
                      <div key={m.slice(0, 20)} className="group relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-ksc-red/30 hover:-translate-y-1">
                        {/* Decorative corner shape */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-ksc-sky/30 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 pointer-events-none" />
                        
                        <div className="relative z-10 flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-ksc-red transition-all duration-300 group-hover:bg-ksc-red group-hover:text-white group-hover:shadow-sm group-hover:rotate-6">
                            <CheckCircle2 className="h-5 w-5 stroke-[2]" />
                          </div>
                          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed transition-colors duration-300 group-hover:text-ksc-navy mt-0.5">{m}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 animate-fade-in-up">
                  {intro.values.map((v: any, i: number) => (
                    <div key={v.title} className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      {/* Shadow Number */}
                      <div className="absolute -bottom-2 right-4 text-[100px] font-black text-slate-100/80 transition-colors duration-500 group-hover:text-white/10 pointer-events-none select-none leading-none z-0">
                        {i + 1}
                      </div>
                      
                      {/* Hover background fill */}
                      <div className="absolute inset-0 bg-gradient-to-br from-ksc-navy to-ksc-royal opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0" />
                      
                      <div className="relative z-10">
                        <h4 className="font-black text-xl text-ksc-navy uppercase tracking-wide transition-colors duration-500 group-hover:text-white">{v.title}</h4>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-white/80">{v.description}</p>
                      </div>
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
