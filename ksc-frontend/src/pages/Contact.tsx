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
    <>
      {/* Page header */}
      <section className="gradient-head relative overflow-hidden py-14 text-white">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-ksc-gold/20 blur-3xl" />
        <div className="container-site relative">
          <p className="section-kicker">Contact Us</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">We're here to help</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Visit us in Karur, call, WhatsApp or send an enquiry — our counsellors respond quickly.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          {/* Contact details + map */}
          <div>
            <SectionHeading align="left" kicker="Get in Touch" title="Reach the centre" />
            <div className="space-y-4">
              <div className="card-hover flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ksc-dark">Visit us</p>
                  <p className="mt-1 text-sm text-ksc-ink/85">{contact.address}</p>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ksc-dark">Call us</p>
                  <a href={`tel:${contact.phone}`} className="mt-1 block text-sm font-semibold text-primary hover:text-ksc-green-mid">
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ksc-dark">WhatsApp</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-2 inline-flex text-xs"
                  >
                    <MessageCircle className="mr-1.5 h-4 w-4" /> Chat on WhatsApp ({contact.whatsapp})
                  </a>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ksc-dark">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-1 block text-sm font-semibold text-primary hover:text-ksc-green-mid">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="card-hover flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ksc-dark">Email</p>
                  <a href={`mailto:${contact.email}`} className="mt-1 block text-sm font-semibold text-primary hover:text-ksc-green-mid">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl shadow-lg border border-gray-100">
              <img 
                src="/assets/user-photos/branch-exterior.jpg" 
                alt="Karur Study Centre Branch Exterior" 
                className="w-full h-48 sm:h-64 object-cover transform hover:scale-105 transition-transform duration-700" 
              />
            </div>

            {/* Embedded map — TODO: replace placeholder coordinates */}
            <div className="mt-6 overflow-hidden rounded-xl border border-ksc-green/15">
              <iframe
                title={`${SITE_CONFIG.name} location map`}
                src={contact.mapEmbedUrl}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="bg-ksc-mist/60 px-4 py-2 text-xs text-ksc-ink/60">
                TODO: update contact.mapEmbedUrl in src/data/site-content.ts with the exact KSC location.
              </p>
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
            <div className="card-hover p-6 sm:p-8">
              <EnquiryForm fields={CONTACT_FORM_FIELDS} submitLabel="Send Enquiry" idPrefix="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}