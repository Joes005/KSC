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
  const { data: { facilities: FACILITIES, settings: SITE_CONFIG } } = useSiteData();
  return (
    <>
      {/* Page header */}
      <PageHeader 
        title={`Facilities & Services at ${SITE_CONFIG.shortName}`} 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Facilities" }]} 
      />

      {/* Facilities grid */}
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <div className="container-site">
          <SectionHeading
            kicker="What We Provide"
            title="Support that follows you through the whole degree"
            subtitle="From the day you walk in to the day your degree is conferred, our centre is with you."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map(({ icon, image, title, description }) => {
              const Icon = typeof icon === "string" ? ICON_MAP[icon] ?? Building2 : icon;
              return (
              <div key={title} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl shadow-inner ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:ring-primary/50 bg-primary/10">
                  {image ? (
                    <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="h-7 w-7 stroke-[1.5]" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-ksc-dark transition-colors duration-300 group-hover:text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ksc-ink/80">{description}</p>
                {/* Decorative background glow on hover */}
                <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="bg-ksc-mist/60 py-12 sm:py-16 lg:py-24">
        <div className="container-site">
          <SectionHeading
            kicker="Inside Our Center"
            title="Walk through Karur Study Center"
            subtitle="Front office, study-material storage, counselling and learning spaces — everything you need is close at hand."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-8">
            {[
              "/assets/gallery/ksc-06.jpg",
              "/assets/gallery/ksc-07.jpg",
              "/assets/gallery/ksc-09.jpg",
              "/assets/gallery/ksc-11.jpg",
            ].map((src, i) => (
              <div key={i} className="group overflow-hidden rounded-xl border border-ksc-green/10 bg-white shadow-soft">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={src}
                    alt="Karur Study Center facilities"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="bg-ksc-mist/60 py-14">
        <div className="container-site flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-extrabold text-ksc-dark">Want to see for yourself?</h2>
          <p className="max-w-xl text-ksc-ink/80">
            Visit our Karur centre and let our
            counsellors walk you through the admission process.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact the Centre <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}