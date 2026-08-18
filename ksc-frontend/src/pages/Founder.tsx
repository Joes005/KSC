import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { PageHeader } from "../components/common/PageHeader";

export function Founder() {
  const { data: { settings: SITE_CONFIG, founder_message: FOUNDER_MESSAGE } } = useSiteData();
  return (
    <>
      {/* Page header */}
      <PageHeader bgImage="/assets/gallery/ksc-05.jpg" 
        title="Founder Message" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Founder Message" }]} 
      />

      <section className="bg-white py-10 lg:py-16">
        <div className="container-site grid gap-10 md:grid-cols-3">
          {/* Headshot card */}
          <div className="card-hover p-6 text-center">
            <img
              src={FOUNDER_MESSAGE.image}
              alt={`${FOUNDER_MESSAGE.name} — Founder of ${SITE_CONFIG.shortName}`}
              className="mx-auto aspect-square w-full max-w-xs rounded-full border-4 border-ksc-gold object-cover shadow-lg"
            />
            <p className="mt-5 text-lg font-bold text-ksc-dark">{FOUNDER_MESSAGE.name}</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-ksc-gold">{FOUNDER_MESSAGE.role}</p>
            <p className="mt-2 text-xs text-ksc-ink/60">
              TODO: upload the real headshot to public/assets/messages/ and set the path in site-content.ts
            </p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <SectionHeading align="left" kicker="Founder Message" title="To every learner who walks through our doors" />
            <blockquote className="border-l-4 border-ksc-gold pl-6">
              <p className="text-lg leading-relaxed text-ksc-ink/90">{FOUNDER_MESSAGE.message}</p>
            </blockquote>
            <p className="mt-6 text-sm text-ksc-ink/60">
              — {FOUNDER_MESSAGE.name}, {FOUNDER_MESSAGE.role}, {SITE_CONFIG.name} ({SITE_CONFIG.shortName})
            </p>
          </div>
        </div>
      </section>
    </>
  );
}