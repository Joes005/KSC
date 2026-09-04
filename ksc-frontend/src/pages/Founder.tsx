import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { PageHeader } from "../components/common/PageHeader";

export function Founder() {
  const { data: { settings: SITE_CONFIG, founder_message: fallbackFounder, pages } } = useSiteData();
  const founderMsg = (pages?.founder?.message || fallbackFounder) as any;
  const imageUrl = founderMsg.image || fallbackFounder.image;
  const displayImage = imageUrl?.startsWith('http') || imageUrl?.startsWith('/assets') 
    ? imageUrl 
    : `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/storage/${imageUrl}`;
  const bannerImage = (pages?.founder?.banner as any)?.image || "/assets/campus/building-exterior.jpg";

  return (
    <>
      {/* Page header */}
      <PageHeader bgImage={bannerImage}
        title="Founder Message" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Founder Message" }]} 
      />

      <section className="bg-gradient-to-br from-[#eaf5ff] via-white to-[#fff7df] py-10 sm:py-14 lg:py-16">
        <div className="container-site grid items-center gap-8 md:gap-12 md:grid-cols-3">
          {/* Headshot card */}
          <div className="card-hover bg-white p-5 sm:p-6 text-center shadow-lg rounded-2xl border border-slate-100">
            <img
              src={displayImage}
              alt={`${founderMsg.name || 'Founder'} — Founder of ${SITE_CONFIG.shortName}`}
              loading="lazy"
              className="mx-auto aspect-[4/5] w-full max-w-xs rounded-2xl object-cover shadow-md"
            />
            <p className="mt-4 sm:mt-5 text-xl font-extrabold text-ksc-dark">{founderMsg.name || 'Founder'}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-ksc-red mt-1">{founderMsg.role || 'Founder'}</p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <SectionHeading align="left" kicker={founderMsg.title || "Founder Message"} title={founderMsg.subtitle || "To every learner who walks through our doors"} />
            <blockquote className="rounded-r-2xl border-l-4 border-ksc-yellow bg-white p-5 sm:p-7 shadow-sm">
              <p className="text-sm sm:text-lg leading-relaxed text-slate-800 font-bold">{founderMsg.message || founderMsg.content}</p>
            </blockquote>
            <p className="mt-6 text-sm text-slate-700 font-bold">
              — {founderMsg.name || 'Founder'}, {founderMsg.role || 'Founder'}, {SITE_CONFIG.name} ({SITE_CONFIG.shortName})
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
