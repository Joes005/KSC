import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FACILITIES } from "../data/facilities";
import { FACILITIES_INTRO, SITE_CONFIG } from "../data/site-content";
import { SectionHeading } from "../components/common/SectionHeading";

export function Facilities() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-r from-primary to-ksc-dark py-14 text-white">
        <div className="container-site">
          <p className="section-kicker">Facilities</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Facilities &amp; Services at {SITE_CONFIG.shortName}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{FACILITIES_INTRO}</p>
        </div>
      </section>

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
          <p className="mt-8 text-center text-xs text-ksc-ink/50">
            TODO: facility descriptions in src/data/facilities.ts are generic placeholders — refine with
            real copy as it becomes available.
          </p>
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