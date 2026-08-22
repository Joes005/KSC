import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { CONTACT_FORM_FIELDS } from "../data/site-content";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { EnquiryForm } from "../components/common/EnquiryForm";

export function Contact() {
  const { data: { settings: SITE_CONFIG, pages } } = useSiteData();
  const { contact } = SITE_CONFIG;
  const reach_centre = pages?.contact?.reach_centre;

  const waUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I have a question about admissions.`
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen bg-dot-pattern">
      {/* Page header */}
      <section className="relative overflow-hidden border-b-4 border-ksc-red bg-white py-16 text-ksc-navy lg:py-12 lg:py-16">
        {/* Background Image */}
        <img loading="lazy"
          src="/assets/user-photos/branch-exterior.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-multiply"
        />
        {/* Background Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ksc-sky via-transparent to-transparent opacity-80" />

        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-white/40 blur-[100px]" />
        <div className="pointer-events-none absolute -right-16 top-0 h-96 w-96 rounded-full bg-white/40 blur-[100px]" />

        <div className="container-site relative z-10 text-center lg:text-left">
          <p className="section-kicker text-ksc-red bg-white inline-block px-3 py-1 rounded-md mb-4 shadow-sm uppercase tracking-widest">Contact Us</p>
          <h1 className="text-4xl font-heading font-black sm:text-5xl lg:text-6xl tracking-tight uppercase drop-shadow-md text-gradient-navy">We're here to help</h1>
          <p className="mt-6 max-w-2xl text-lg font-bold text-slate-700 leading-relaxed mx-auto lg:mx-0 bg-white/70 p-4 rounded-xl backdrop-blur-md border-2 border-white shadow-sm">
            Visit us in Karur, call, WhatsApp or send an enquiry — our counsellors respond quickly and are ready to guide your future.
          </p>
        </div>
      </section>

      <section className="relative py-12 lg:py-16 reveal-section is-visible overflow-hidden">
        {/* Dynamic ambient background blobs */}
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[800px] h-[800px] bg-ksc-navy/5 rounded-full blur-[100px] pointer-events-none animate-ambient-drift" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-ksc-red/5 rounded-full blur-[100px] pointer-events-none animate-ambient-drift" style={{ animationDelay: '-5s', animationDuration: '25s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ksc-sky/10 rounded-full blur-[120px] pointer-events-none animate-ambient-drift" style={{ animationDelay: '-10s', animationDuration: '30s' }} />
        
        <div className="container-site relative z-10 grid gap-12 lg:grid-cols-2">
          {/* Contact details + map */}
          <div>
            <SectionHeading align="left" kicker={reach_centre?.kicker || "Get in Touch"} title={reach_centre?.title || "Reach the centre"} />
            <div className="space-y-4 mt-8">
              {reach_centre?.items?.map((item: any, idx: number) => {
                const IconComponent = { MapPin, Phone, MessageCircle, Mail }[item.icon as string] || MapPin;
                const isWa = item.icon === 'MessageCircle';
                const linkHref = isWa ? waUrl : item.link || '#';
                return (
                  <div key={idx} className="card-hover flex items-start gap-4 p-6 rounded-xl shadow-soft">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/60 text-ksc-red border border-white/50 shadow-inner">
                      <IconComponent className="h-6 w-6 stroke-[2]" />
                    </span>
                    <div>
                      <p className="font-black text-ksc-navy text-lg uppercase tracking-wide">{item.title}</p>
                      {item.link ? (
                        <a href={linkHref} target={isWa ? "_blank" : undefined} rel={isWa ? "noopener noreferrer" : undefined} className="mt-2 block text-sm font-bold text-ksc-royal hover:text-ksc-red hover:underline transition-colors tracking-widest">
                          {item.button_label || item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm font-medium text-slate-600 leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl glass-panel shadow-lift group">
              <img loading="lazy"
                src={reach_centre?.image || "/assets/user-photos/branch-exterior.jpg"}
                alt="Karur Study Centre Branch Exterior"
                className="w-full h-48 sm:h-72 object-cover transform transition-transform duration-[10000ms] group-hover:scale-110"
              />
            </div>

            {/* Embedded map */}
            <div className="mt-8 overflow-hidden rounded-2xl glass-panel shadow-lift p-2">
              <iframe
                title={`${SITE_CONFIG.name} location map`}
                src={reach_centre?.mapEmbedUrl || contact.mapEmbedUrl}
                className="h-72 sm:h-96 w-full rounded-xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <SectionHeading
              align="left"
              kicker="Send an Enquiry"
              title="Tell us what you're looking for"
              subtitle="Fill in the form and we'll get back to you with programme options and admission guidance."
            />
            <div className="glass-panel shadow-lift rounded-2xl p-6 sm:p-10 mt-8 relative overflow-hidden">
              {/* Form background decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-ksc-yellow/20 rounded-full blur-[80px] pointer-events-none" />
              <EnquiryForm fields={CONTACT_FORM_FIELDS} submitLabel="Send Enquiry" idPrefix="contact" className="relative z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
