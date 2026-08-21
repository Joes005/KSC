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

      <section className="bg-gradient-to-br from-[#eaf5ff] via-white to-[#fff7df] py-16 lg:py-24">
        <div className="container-site grid items-center gap-12 md:grid-cols-3">
          {/* Headshot card */}
          <div className="card-hover bg-white p-6 text-center">
            <img
              src={FOUNDER_MESSAGE.image}
              alt={`${FOUNDER_MESSAGE.name} — Founder of ${SITE_CONFIG.shortName}`}
              className="mx-auto aspect-[4/5] w-full max-w-xs rounded-2xl object-cover shadow-lg"
            />
            <p className="mt-5 text-lg font-bold text-ksc-dark">{FOUNDER_MESSAGE.name}</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-ksc-red">{FOUNDER_MESSAGE.role}</p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <SectionHeading align="left" kicker="Founder Message" title="To every learner who walks through our doors" />
            <blockquote className="rounded-r-2xl border-l-4 border-ksc-yellow bg-white p-7 shadow-sm">
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
