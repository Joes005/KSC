import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { CONTACT_FORM_FIELDS } from "../data/site-content";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { EnquiryForm } from "../components/common/EnquiryForm";

export function Contact() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  const { contact } = SITE_CONFIG;

  const waUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I have a question about admissions.`
  )}`;

  return (
    <div className="bg-ksc-navy min-h-screen">
      {/* Page header */}
      <section className="bg-ksc-navy-dark relative overflow-hidden py-20 lg:py-24 text-white border-b border-white/5">
        {/* Background Image */}
        <img 
          src="/assets/user-photos/branch-exterior.jpg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none" 
        />
        {/* Background Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ksc-navy via-ksc-navy-dark/80 to-transparent" />

        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-16 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-[100px]" />
        
        <div className="container-site relative z-10">
          <p className="section-kicker mb-4">Contact Us</p>
          <h1 className="text-4xl font-heading font-extrabold sm:text-5xl lg:text-6xl tracking-tight drop-shadow-lg">We're here to help</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Visit us in Karur, call, WhatsApp or send an enquiry — our counsellors respond quickly and are ready to guide your future.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          {/* Contact details + map */}
          <div className="animate-fade-in-up">
            <SectionHeading align="left" kicker="Get in Touch" title="Reach the centre" />
            <div className="space-y-4 mt-8">
              <div className="card-hover flex items-start gap-4 p-6 border border-white/5 bg-white/5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-white text-lg">Visit us</p>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{contact.address}</p>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-6 border border-white/5 bg-white/5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-white text-lg">Call us</p>
                  <a href={`tel:${contact.phone}`} className="mt-2 block text-sm font-semibold text-secondary hover:text-white transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-6 border border-white/5 bg-white/5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-white text-lg">WhatsApp</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-[#25D366] hover:text-white transition-colors"
                  >
                    Chat on WhatsApp ({contact.whatsapp})
                  </a>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-6 border border-white/5 bg-white/5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-white text-lg">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-2 block text-sm font-semibold text-secondary hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl shadow-2xl border border-white/10 group">
              <img 
                src="/assets/user-photos/branch-exterior.jpg" 
                alt="Karur Study Centre Branch Exterior" 
                className="w-full h-48 sm:h-72 object-cover transform transition-transform duration-[10000ms] group-hover:scale-110 opacity-80" 
              />
            </div>

            {/* Embedded map */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <iframe
                title={`${SITE_CONFIG.name} location map`}
                src={contact.mapEmbedUrl}
                className="h-72 sm:h-96 w-full filter invert hue-rotate-180 contrast-75 brightness-75 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Enquiry form */}
          <div className="animate-fade-in-up delay-200">
            <SectionHeading
              align="left"
              kicker="Send an Enquiry"
              title="Tell us what you're looking for"
              subtitle="Fill in the form and we'll get back to you with programme options and admission guidance."
            />
            <div className="glass-panel rounded-2xl p-6 sm:p-10 mt-8 border-t border-white/20 relative overflow-hidden">
               {/* Form background decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />
              <EnquiryForm fields={CONTACT_FORM_FIELDS} submitLabel="Send Enquiry" idPrefix="contact" className="relative z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}