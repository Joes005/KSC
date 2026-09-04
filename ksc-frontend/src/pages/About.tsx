import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, Building2, Users, ArrowRight } from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { PageHeader } from "../components/common/PageHeader";
import { VisionMissionValues } from "../components/home/VisionMissionValues";
import { useScrollReveal } from "../components/home/SharedHooks";

export function About() {
  const { data: { pages, about_page: fallbackAboutPage, about_snapshot: secondaryFallback } } = useSiteData();
  const ABOUT_PAGE = (pages?.about?.about_page || fallbackAboutPage || secondaryFallback) as any;
  const bannerImage = (pages?.about?.banner as any)?.image || "/assets/images/about-students.png";

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
            <div className="space-y-5 leading-relaxed text-slate-800 font-bold text-sm sm:text-base mt-6">
              <p>{ABOUT_PAGE.body?.[0]}</p>

              <div className="my-8 overflow-hidden rounded-3xl shadow-xl border border-slate-200/90 p-2 bg-white max-w-xl mx-auto">
                <img
                  src={ABOUT_PAGE.image || "/assets/images/ksc-founder-poster.jpg"}
                  alt="Karur Study Centre — Distance Education Learning Centre"
                  className="w-full h-auto rounded-2xl object-contain transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {ABOUT_PAGE.body?.slice(1).map((para: any, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </div>


          </div>

          {/* Facts sidebar */}
          <aside className="space-y-6 mt-12 lg:mt-0 opacity-0 translate-x-[20px] transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-x-0 delay-300">

            <div className="card-hover p-6">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <CalendarDays className="h-8 w-8 stroke-[2]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Established</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{ABOUT_PAGE.establishedYear}</p>
            </div>

            <div className="card-hover p-6">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <Building2 className="h-8 w-8 stroke-[2]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Leadership</p>
              <p className="mt-1 text-2xl font-black text-slate-900">Founder &amp; Chairman</p>
              <div className="mt-4 flex flex-col gap-3 text-sm font-bold text-ksc-navy">
                <Link to="/founder" className="inline-flex items-center hover:text-ksc-red transition-colors">Read Founder Message <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                <Link to="/chairman" className="inline-flex items-center hover:text-ksc-red transition-colors">Read Chairman Message <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </div>
            </div>

            <div className="card-hover p-6">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-ksc-navy transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-50">
                <Users className="h-8 w-8 stroke-[2]" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Students Served</p>
              <p className="mt-1 text-3xl font-black text-slate-900">50,000+ <span className="text-lg font-bold text-slate-600">learners</span></p>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-xl font-black text-ksc-navy mb-5">Membership &amp; Recognition</h3>
              <ul className="flex flex-col gap-4">
                {ABOUT_PAGE.membership.map((m: any) => (
                  <li key={m} className="flex items-start gap-3 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ksc-yellow stroke-[2.5]" />
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Vision / Mission / Values detail */}
      <VisionMissionValues />
    </>
  );
}
