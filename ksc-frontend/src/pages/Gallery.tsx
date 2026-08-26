import { useState } from "react";
import { X, ZoomIn, Camera } from "lucide-react";
import { useSiteData } from "../services/SiteDataContext";
import { PageHeader } from "../components/common/PageHeader";
import { useScrollReveal } from "../components/home/SharedHooks";

export function Gallery() {
  const { data: { gallery_images: GALLERY, settings: SITE_CONFIG } } = useSiteData();
  const [lightbox, setLightbox] = useState<number | null>(null);
  
  useScrollReveal();

  return (
    <>
      {/* Page header */}
      <PageHeader bgImage="/assets/gallery/ksc-01.jpg" 
        title={`Inside ${SITE_CONFIG.shortName}`} 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]} 
      />

      {/* Photo grid */}
      <section className="bg-slate-50 py-10 lg:py-10 lg:py-16 border-t-4 border-ksc-yellow border-b-4 border-ksc-red reveal-section">
        <div className="container-site">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, i) => (
              <button
                type="button"
                key={item.id}
                className="card-hover group relative overflow-hidden rounded-2xl bg-white text-left opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0"
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => setLightbox(i)}
                aria-label={`Open photo: ${item.caption}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ksc-navy/0 transition-colors group-hover:bg-ksc-navy/40">
                    <ZoomIn className="h-10 w-10 text-white opacity-0 transition-opacity group-hover:opacity-100 drop-shadow-md" />
                  </span>
                </div>
                <figcaption className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-ksc-navy uppercase tracking-wide">
                  <Camera className="h-5 w-5 shrink-0 text-ksc-red" /> {item.caption}
                </figcaption>
              </button>
            ))}
          </div>

          <p className="mt-12 text-center text-sm font-medium text-slate-500 max-w-2xl mx-auto bg-slate-100 border-2 border-slate-200 p-4 rounded-xl opacity-0 translate-y-8 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-300">
            Real photos from the Karur Study Center — walk in during working hours and see our services
            first-hand.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && GALLERY[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ksc-navy/95 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[lightbox].caption}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ksc-red hover:bg-ksc-yellow hover:text-ksc-navy shadow-xl border-[3px] border-ksc-navy transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 stroke-[3]" />
          </button>
          <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              className="max-h-[80vh] rounded-2xl object-contain shadow-2xl border-[6px] border-white"
            />
            <figcaption className="mt-4 text-center text-lg font-black uppercase tracking-widest text-white drop-shadow-md">
              {GALLERY[lightbox].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
