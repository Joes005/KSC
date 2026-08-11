import { SITE_CONFIG, CHAIRMAN_MESSAGE } from "../data/site-content";
import { SectionHeading } from "../components/common/SectionHeading";

export function Chairman() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-r from-primary to-ksc-dark py-14 text-white">
        <div className="container-site">
          <p className="section-kicker">Chairman Message</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">A word from our Chairman</h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site grid gap-10 md:grid-cols-3">
          {/* Headshot card */}
          <div className="card-hover p-6 text-center">
            <img
              src={CHAIRMAN_MESSAGE.image}
              alt={`${CHAIRMAN_MESSAGE.name} — Chairman of ${SITE_CONFIG.shortName}`}
              className="mx-auto aspect-square w-full max-w-xs rounded-full border-4 border-ksc-gold object-cover shadow-lg"
            />
            <p className="mt-5 text-lg font-bold text-ksc-dark">{CHAIRMAN_MESSAGE.name}</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-ksc-gold">{CHAIRMAN_MESSAGE.role}</p>
            <p className="mt-2 text-xs text-ksc-ink/60">
              TODO: upload the real headshot to public/assets/messages/ and set the path in site-content.ts
            </p>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <SectionHeading align="left" kicker="Chairman Message" title="With the community, for the community" />
            <blockquote className="border-l-4 border-ksc-gold pl-6">
              <p className="text-lg leading-relaxed text-ksc-ink/90">{CHAIRMAN_MESSAGE.message}</p>
            </blockquote>
            <p className="mt-6 text-sm text-ksc-ink/60">
              — {CHAIRMAN_MESSAGE.name}, {CHAIRMAN_MESSAGE.role}, {SITE_CONFIG.name} ({SITE_CONFIG.shortName})
            </p>
          </div>
        </div>
      </section>
    </>
  );
}