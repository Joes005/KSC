import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  CalendarRange,
  BookOpen,
  Library,
  Headphones,
  MonitorPlay,
  MapPinned,
  MonitorSmartphone,
} from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { PageHeader } from "../components/common/PageHeader";

const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  CalendarRange,
  BookOpen,
  Library,
  Headphones,
  MonitorPlay,
  MapPinned,
  MonitorSmartphone,
  Building2,
};

export function Facilities() {
  const { data: { facilities: FACILITIES, settings: SITE_CONFIG, pages } } = useSiteData();
  const banner = (pages?.facilities?.banner as any) || {};
  const photoStrip: string[] = Array.isArray(banner.strip) && banner.strip.length
    ? banner.strip
    : ["/assets/gallery/ksc-06.jpg", "/assets/gallery/ksc-07.jpg", "/assets/gallery/ksc-09.jpg", "/assets/gallery/ksc-11.jpg"];
  const gridHeading = (pages?.facilities?.grid_heading as any) || {};
  const stripHeading = (pages?.facilities?.strip_heading as any) || {};
  return (
    <>
      {/* Page header */}
      <PageHeader bgImage={banner.image || "/assets/gallery/ksc-11.jpg"}
        title={`Facilities & Services at ${SITE_CONFIG.shortName}`} 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Facilities" }]} 
      />

      {/* Facilities grid */}
      <section className="bg-slate-50 py-10 sm:py-12 lg:py-16 border-b-4 border-ksc-red">
        <div className="container-site">
          <SectionHeading
            kicker={gridHeading.kicker || "What We Provide"}
            title={gridHeading.title || "Support that follows you through the whole degree"}
            subtitle={gridHeading.subtitle || "From the day you walk in to the day your degree is conferred, our centre is with you."}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {FACILITIES.map(({ icon, image, title, description }) => {
              const Icon = typeof icon === "string" ? ICON_MAP[icon] ?? Building2 : icon;
              return (
              <div key={title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ksc-sky/50 hover:shadow-lg">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {image ? (
                    <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover p-2" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-ksc-red group-hover:text-ksc-yellow transition-colors duration-300">
                      <Icon className="h-10 w-10 stroke-[2]" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-ksc-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="bg-white py-10 sm:py-12 lg:py-16 border-b-4 border-ksc-yellow">
        <div className="container-site">
          <SectionHeading
            kicker={stripHeading.kicker || "Inside Our Center"}
            title={stripHeading.title || "Walk through Karur Study Center"}
            subtitle={stripHeading.subtitle || "Front office, study-material storage, counselling and learning spaces — everything you need is close at hand."}
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mt-12">
            {photoStrip.map((src, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={src}
                    alt="Karur Study Center facilities"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="bg-slate-50 py-16 border-b-4 border-ksc-navy">
        <div className="container-site flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-ksc-navy">Want to see for yourself?</h2>
          <p className="max-w-xl text-lg font-medium text-slate-600">
            Visit our Karur centre and let our
            counsellors walk you through the admission process.
          </p>
          <Link to="/contact" className="btn-gold mt-4">
            Contact the Centre <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
