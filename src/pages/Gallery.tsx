import { useState } from "react";
import { X, ZoomIn, Camera } from "lucide-react";
import { GALLERY } from "../data/gallery";
import { SITE_CONFIG } from "../data/site-content";
import { PageHeader } from "../components/common/PageHeader";

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      {/* Page header */}
      <PageHeader 
        title={`Inside ${SITE_CONFIG.shortName}`} 
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]} 
      />

      {/* Photo grid */}
      <section className="bg-white py-16">
        <div className="container-site">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, i) => (
              <figure
                key={item.id}
                className="card-hover group relative cursor-pointer overflow-hidden"
                onClick={() => setLightbox(i)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ksc-mist">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ksc-dark/0 transition-colors group-hover:bg-ksc-dark/30">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </div>
                <figcaption className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-ksc-dark">
                  <Camera className="h-4 w-4 shrink-0 text-primary" /> {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-ksc-ink/50">
            Real photos from the Karur Study Center — walk in during working hours and see our services
            first-hand.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && GALLERY[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ksc-dark/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[lightbox].caption}
        >
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              className="max-h-[80vh] rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm font-semibold text-white">
              {GALLERY[lightbox].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}