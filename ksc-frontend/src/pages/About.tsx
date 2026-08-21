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
      <section className="bg-white py-16 sm:py-10 lg:py-20 border-b border-slate-100">
        <div className="container-site grid gap-12 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              kicker="Who We Are"
              title="Your local bridge to open-university education"
            />
            <div className="space-y-5 leading-relaxed text-slate-700 font-medium text-sm sm:text-base">
              <p>{ABOUT_PAGE.body[0]}</p>
              
              <div className="my-10 overflow-hidden rounded-3xl shadow-lift border border-slate-200 p-2 bg-white">
                <img 
                  src="/assets/images/about-students.png" 
                  alt="Happy students at Karur Study Centre" 
                  className="w-full h-auto rounded-2xl object-cover transform hover:scale-105 transition-transform duration-700" 
                />
              </div>

              {ABOUT_PAGE.body.slice(1).map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>


          </div>

          {/* Facts sidebar */}
          <aside className="space-y-6 mt-12 lg:mt-0">

            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-slate-100">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <CalendarDays className="h-8 w-8 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Established</p>
              <p className="mt-1 text-3xl font-bold text-slate-800">{ABOUT_PAGE.establishedYear}</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-slate-100">
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
            
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-slate-100">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <Users className="h-8 w-8 stroke-[1.5]" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Students Served</p>
              <p className="mt-1 text-3xl font-bold text-slate-800">50,000+ <span className="text-lg font-semibold text-slate-500">learners</span></p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-ksc-navy mb-5">Membership &amp; Recognition</h3>
              <ul className="flex flex-col gap-4">
                {ABOUT_PAGE.membership.map((m) => (
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
  const { data: { vision_mission: VISION_MISSION_VALUES } } = useSiteData();
  const intro = VISION_MISSION_VALUES;

  return (
    <section className="bg-white py-10 lg:py-10 lg:py-16">
      <div className="container-site">
        <SectionHeading kicker="Our Foundation" title="Vision · Mission · Values" />
        <div className="mx-auto max-w-6xl">
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
                  <div className="card-hover p-8 bg-slate-50 border-2 border-slate-100">
                    <p className="text-xl font-bold leading-relaxed text-ksc-navy">{intro.vision}</p>
                  </div>
                );
              }
              if (activeId === "mission") {
                return (
                  <div className="card-hover p-8 bg-slate-50 border-2 border-slate-100">
                    <ul className="space-y-4">
                      {intro.mission.map((m) => (
                        <li key={m.slice(0, 20)} className="flex items-start gap-3 text-slate-700 font-medium">
                          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-ksc-red" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <div className="grid gap-3 md:grid-cols-3">
                  {intro.values.map((v) => (
                    <div key={v.title} className="card-hover border border-slate-100 bg-slate-50 p-4 text-center">
                      <h4 className="font-bold text-ksc-navy uppercase">{v.title}</h4>
                      <p className="mt-2 text-sm font-medium text-slate-600">{v.description}</p>
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
