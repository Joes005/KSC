import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { CONTACT_FORM_FIELDS } from "../data/site-content";
import { useSiteData } from "../services/SiteDataContext";
import { SectionHeading } from "../components/common/SectionHeading";
import { EnquiryForm } from "../components/common/EnquiryForm";
import { useScrollReveal } from "../components/home/SharedHooks";
import { cn } from "../utils/cn";

export function Contact() {
  const { data: { settings: SITE_CONFIG, pages, branches } } = useSiteData();
  const { contact } = SITE_CONFIG;
  const reach_centre = (pages?.contact?.reach_centre || {}) as any;
  const bannerImage = (pages?.contact?.banner as any)?.image || "/assets/user-photos/branch-exterior.jpg";
  const enquiryFormHeading = (pages?.contact?.enquiry_form as any) || {};
  const contactFields = (Array.isArray(pages?.contact?.contact_fields) && (pages!.contact!.contact_fields as any[]).length
    ? pages!.contact!.contact_fields
    : CONTACT_FORM_FIELDS) as typeof CONTACT_FORM_FIELDS;

  const officeBranches = (Array.isArray(branches) ? branches : []) as Array<{ name: string; address: string; phone?: string; isHead?: boolean }>;
  const [activeBranchIdx, setActiveBranchIdx] = useState(() => {
    const headIdx = officeBranches.findIndex((b) => b.isHead);
    return headIdx >= 0 ? headIdx : 0;
  });
  const activeBranch = officeBranches[activeBranchIdx];
  const branchMapSrc = (activeBranch as any)?.mapEmbedUrl || (activeBranch
    ? (activeBranch.name.includes("Karur") || (activeBranch as any).location === "Karur"
      ? "https://maps.google.com/maps?q=Karur+Study+Centre,+M.R.S.+Plaza,+Covai+Road,+Ramakrishna+Puram,+Karur,+Tamil+Nadu+639001&t=&z=16&ie=UTF8&iwloc=&output=embed"
      : activeBranch.name.includes("Dindigul") || (activeBranch as any).location === "Dindigul"
      ? "https://maps.google.com/maps?q=S.S.+Institute,+75/38,+Scheme+Road,+2nd+Floor,+Raja+Complex,+Dindigul&t=&z=16&ie=UTF8&iwloc=&output=embed"
      : `https://maps.google.com/maps?q=${encodeURIComponent(`${activeBranch.name}, ${activeBranch.address}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`)
    : (reach_centre?.mapEmbedUrl || contact.mapEmbedUrl));

  useScrollReveal();

  const waUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I have a question about admissions.`
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen bg-dot-pattern">
      {/* Page header */}
      <section className="relative overflow-hidden border-b-4 border-ksc-red bg-white py-16 text-ksc-navy lg:py-12 lg:py-16">
        {/* Background Image */}
        <img loading="lazy"
          src={bannerImage}
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
          <p className="mt-6 max-w-2xl text-base sm:text-lg font-bold text-slate-700 leading-relaxed mx-auto lg:mx-0 bg-white/80 p-4 sm:p-5 rounded-2xl backdrop-blur-md border-2 border-white shadow-sm">
            Visit us across our centres in <span className="font-extrabold text-ksc-red">Karur</span>, <span className="font-extrabold text-ksc-red">Dindigul</span>, and <span className="font-extrabold text-ksc-red">Kangeyam</span> — or connect with us via phone, WhatsApp, or enquiry form. Our expert counsellors are ready to guide your academic future.
          </p>
        </div>
      </section>

      <section className="relative py-12 lg:py-16 reveal-section overflow-hidden">
        {/* Dynamic ambient background blobs */}
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[800px] h-[800px] bg-ksc-navy/5 rounded-full blur-[100px] pointer-events-none animate-ambient-drift" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-ksc-red/5 rounded-full blur-[100px] pointer-events-none animate-ambient-drift" style={{ animationDelay: '-5s', animationDuration: '25s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ksc-sky/10 rounded-full blur-[120px] pointer-events-none animate-ambient-drift" style={{ animationDelay: '-10s', animationDuration: '30s' }} />
        
        <div className="container-site relative z-10 grid gap-12 lg:grid-cols-2">
          {/* Contact details + map */}
          <div className="opacity-0 translate-x-[-20px] transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-x-0 delay-100">
            <SectionHeading align="left" kicker={reach_centre?.kicker || "Get in Touch"} title={reach_centre?.title || "Reach the centre"} />
            <div className="space-y-4 mt-8">
              {reach_centre?.items?.map((item: any, idx: number) => {
                const IconComponent = { MapPin, Phone, MessageCircle, Mail }[item.icon as string] || MapPin;
                const isWa = item.icon === 'MessageCircle';
                const isMap = item.icon === 'MapPin';
                const linkHref = isWa ? waUrl : isMap ? "https://maps.app.goo.gl/MJFWjrveBV3DQhi4A" : item.link || '#';
                return (
                  <div key={idx} className="card-hover flex items-start gap-4 p-6 rounded-xl shadow-soft">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/60 text-ksc-red border border-white/50 shadow-inner">
                      <IconComponent className="h-6 w-6 stroke-[2]" />
                    </span>
                    <div>
                      <p className="font-black text-ksc-navy text-lg uppercase tracking-wide">{item.title}</p>
                      {item.link || isMap ? (
                        <a href={linkHref} target={isWa || isMap ? "_blank" : undefined} rel={isWa || isMap ? "noopener noreferrer" : undefined} className="mt-2 block text-sm font-bold text-ksc-royal hover:text-ksc-red hover:underline transition-colors tracking-widest">
                          {item.button_label || item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm font-bold text-slate-800 leading-relaxed">{item.value}</p>
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
            <div className="mt-8">
              {officeBranches.length > 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {officeBranches.map((branch, idx) => {
                    const loc = (branch as any).location || (branch.name.includes("Dindigul") || branch.address.includes("Dindigul") ? "Dindigul" : (branch.name.includes("Kang") || branch.address.includes("Kang")) ? "Kangeyam" : "Karur");
                    return (
                      <button
                        key={branch.name}
                        type="button"
                        onClick={() => setActiveBranchIdx(idx)}
                        aria-pressed={idx === activeBranchIdx}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors flex items-center gap-1.5",
                          idx === activeBranchIdx
                            ? "border-ksc-red bg-ksc-red text-white shadow-sm"
                            : "border-slate-200 bg-white text-ksc-navy hover:border-ksc-red/40 hover:text-ksc-red"
                        )}
                      >
                        <span>{branch.name}</span>
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded font-extrabold",
                          idx === activeBranchIdx ? "bg-white/20 text-white" : "bg-red-50 text-ksc-red border border-red-200"
                        )}>
                          {loc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="overflow-hidden rounded-2xl glass-panel shadow-lift p-2">
                <iframe
                  key={branchMapSrc}
                  title={activeBranch ? `${activeBranch.name} location map` : `${SITE_CONFIG.name} location map`}
                  src={branchMapSrc}
                  className="h-72 sm:h-96 w-full rounded-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {activeBranch && (
                <div className="mt-3 px-1 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold text-slate-700">{activeBranch.address}</p>
                  <a
                    href={(activeBranch as any).mapUrl || (activeBranch.name.includes("Karur") || (activeBranch as any).location === "Karur" ? "https://maps.app.goo.gl/MJFWjrveBV3DQhi4A" : activeBranch.name.includes("Dindigul") || (activeBranch as any).location === "Dindigul" ? "https://maps.app.goo.gl/5MT1b3oKCiyhkxos6" : `https://maps.google.com/maps?q=${encodeURIComponent(`${activeBranch.name}, ${activeBranch.address}`)}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-ksc-red text-white px-3 py-1.5 text-xs font-bold hover:bg-ksc-navy transition-colors shadow-xs shrink-0"
                  >
                    <MapPin className="h-3.5 w-3.5" /> Open Google Maps ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Enquiry form */}
          <div className="opacity-0 translate-x-[20px] transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-x-0 delay-300">
            <SectionHeading
              align="left"
              kicker={enquiryFormHeading?.kicker || "Send an Enquiry"}
              title={enquiryFormHeading?.title || "Tell us what you're looking for"}
              subtitle={enquiryFormHeading?.subtitle || "Fill in the form and we'll get back to you with programme options and admission guidance."}
            />
            <div className="glass-panel shadow-lift rounded-2xl p-6 sm:p-10 mt-8 relative overflow-hidden">
              {/* Form background decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-ksc-yellow/20 rounded-full blur-[80px] pointer-events-none" />
              <EnquiryForm fields={contactFields} submitLabel={enquiryFormHeading?.submitLabel || "Send Enquiry"} idPrefix="contact" className="relative z-10" formType="contact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
