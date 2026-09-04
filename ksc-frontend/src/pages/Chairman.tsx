import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { PageHeader } from "../components/common/PageHeader";

export function Chairman() {
  const { data: { settings: SITE_CONFIG, chairman_message: fallbackChairman, pages } } = useSiteData();
  const chairmanMsg = (pages?.chairman?.message || fallbackChairman) as any;
  const imageUrl = chairmanMsg.image || fallbackChairman.image;
  const displayImage = imageUrl?.startsWith('http') || imageUrl?.startsWith('/assets') 
    ? imageUrl 
    : `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/storage/${imageUrl}`;
  const bannerImage = (pages?.chairman?.banner as any)?.image || "/assets/campus/lecture-hall.jpg";

  return (
    <>
      {/* Page header */}
      <PageHeader bgImage={bannerImage}
        title="Chairman Message" 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Chairman Message" }]} 
      />

      <section className="bg-gradient-to-br from-[#eaf5ff] via-white to-[#fff7df] py-10 sm:py-14 lg:py-16">
        <div className="container-site grid items-center gap-8 md:gap-12 md:grid-cols-3">
          {/* Headshot card */}
          <div className="card-hover bg-white p-5 sm:p-6 text-center shadow-lg rounded-2xl border border-slate-100">
            <img
              src={displayImage}
              alt={`${chairmanMsg.name || 'Chairman'} — Chairman of ${SITE_CONFIG.shortName}`}
              loading="lazy"
              className="mx-auto aspect-[4/5] w-full max-w-xs rounded-2xl object-cover shadow-md"
            />
            <p className="mt-4 sm:mt-5 text-xl font-extrabold text-ksc-dark">{chairmanMsg.name || 'Chairman'}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-ksc-red mt-1">{chairmanMsg.role || 'Chairman'}</p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <SectionHeading align="left" kicker={chairmanMsg.title || "Chairman Message"} title={chairmanMsg.subtitle || "With the community, for the community"} />
            <blockquote className="rounded-r-2xl border-l-4 border-ksc-yellow bg-white p-5 sm:p-7 shadow-sm">
              <p className="text-sm sm:text-lg leading-relaxed text-slate-800 font-bold">{chairmanMsg.message || chairmanMsg.content}</p>
            </blockquote>
            <p className="mt-6 text-sm text-slate-700 font-bold">
              — {chairmanMsg.name || 'Chairman'}, {chairmanMsg.role || 'Chairman'}, {SITE_CONFIG.name} ({SITE_CONFIG.shortName})
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
