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
    <div className="bg-slate-50 min-h-screen">
      {/* Page header */}
      <section className="relative overflow-hidden border-b-4 border-ksc-red bg-gradient-to-br from-[#e8f5ff] via-white to-[#fff4d6] py-20 text-ksc-navy lg:py-12 lg:py-24">
        {/* Background Image */}
        <img 
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
          <h1 className="text-4xl font-heading font-black sm:text-5xl lg:text-6xl tracking-tight uppercase drop-shadow-md">We're here to help</h1>
          <p className="mt-6 max-w-2xl text-lg font-bold text-slate-700 leading-relaxed mx-auto lg:mx-0 bg-white/50 p-4 rounded-xl backdrop-blur-sm border-2 border-white shadow-sm">
            Visit us in Karur, call, WhatsApp or send an enquiry — our counsellors respond quickly and are ready to guide your future.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-12 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          {/* Contact details + map */}
          <div className="animate-fade-in-up">
            <SectionHeading align="left" kicker="Get in Touch" title="Reach the centre" />
            <div className="space-y-4 mt-8">
              <div className="card-hover flex items-start gap-4 p-6 border-2 border-slate-200 bg-white rounded-xl shadow-sm">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-ksc-red border-2 border-slate-200">
                  <MapPin className="h-6 w-6 stroke-[2]" />
                </span>
                <div>
                  <p className="font-black text-ksc-navy text-lg uppercase tracking-wide">Visit us</p>
                  <p className="mt-2 text-sm font-medium text-slate-600 leading-relaxed">{contact.address}</p>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-6 border-2 border-slate-200 bg-white rounded-xl shadow-sm">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-ksc-red border-2 border-slate-200">
                  <Phone className="h-6 w-6 stroke-[2]" />
                </span>
                <div>
                  <p className="font-black text-ksc-navy text-lg uppercase tracking-wide">Call us</p>
                  <a href={`tel:${contact.phone}`} className="mt-2 block text-sm font-bold text-ksc-royal hover:text-ksc-red hover:underline transition-colors tracking-widest">
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-6 border-2 border-slate-200 bg-white rounded-xl shadow-sm">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] border-2 border-[#25D366]/20">
                  <MessageCircle className="h-6 w-6 stroke-[2]" />
                </span>
                <div>
                  <p className="font-black text-ksc-navy text-lg uppercase tracking-wide">WhatsApp</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-bold text-[#25D366] hover:underline transition-colors tracking-widest"
                  >
                    Chat on WhatsApp ({contact.whatsapp})
                  </a>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-6 border-2 border-slate-200 bg-white rounded-xl shadow-sm">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-ksc-red border-2 border-slate-200">
                  <Mail className="h-6 w-6 stroke-[2]" />
                </span>
                <div>
                  <p className="font-black text-ksc-navy text-lg uppercase tracking-wide">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-2 block text-sm font-bold text-ksc-royal hover:text-ksc-red hover:underline transition-colors tracking-wider">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 shadow-xl group">
              <img 
                src="/assets/user-photos/branch-exterior.jpg" 
                alt="Karur Study Centre Branch Exterior" 
                className="w-full h-48 sm:h-72 object-cover transform transition-transform duration-[10000ms] group-hover:scale-110" 
              />
            </div>

            {/* Embedded map */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white p-2">
              <iframe
                title={`${SITE_CONFIG.name} location map`}
                src={contact.mapEmbedUrl}
                className="h-72 sm:h-96 w-full rounded-xl"
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
            <div className="bg-white border-2 border-slate-200 shadow-xl rounded-2xl p-6 sm:p-10 mt-8 relative overflow-hidden">
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
