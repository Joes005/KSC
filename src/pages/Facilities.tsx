import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FACILITIES } from "../data/facilities";
import { SITE_CONFIG } from "../data/site-content";
import { SectionHeading } from "../components/common/SectionHeading";
import { PageHeader } from "../components/common/PageHeader";

export function Facilities() {
  return (
    <>
      {/* Page header */}
      <PageHeader 
        title={`Facilities & Services at ${SITE_CONFIG.shortName}`} 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Facilities" }]} 
      />

      {/* Facilities grid */}
      <section className="bg-white py-16">
        <div className="container-site">
          <SectionHeading
            kicker="What We Provide"
            title="Support that follows you through the whole degree"
            subtitle="From the day you walk in to the day your degree is conferred, our centre is with you."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card-hover p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ksc-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ksc-ink/80">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="bg-ksc-mist/60 py-16">
        <div className="container-site">
          <SectionHeading
            kicker="Inside Our Center"
            title="Walk through Karur Study Center"
            subtitle="Front office, study-material storage, counselling and learning spaces — everything you need is close at hand."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              "/assets/gallery/ksc-01.jpg",
              "/assets/gallery/ksc-03.jpg",
              "/assets/gallery/ksc-05.jpg",
              "/assets/gallery/ksc-10.jpg",
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
            Visit our Karur centre during working hours — {SITE_CONFIG.contact.workingHours} — and let our
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