/**
 * KSC — GALLERY DATA
 * Real photos are served from /public/assets/gallery/.
 * Captions/order can be swapped freely — keep the image files under public/.
 *
 * ksc-05..ksc-08 were removed on purpose: those files were internal reference
 * photos (photocopied course-eligibility sheets and a handwritten notes page
 * that included a Gmail password) that had been mistakenly placed in the
 * public gallery folder. Do not re-add files with those names here.
 */

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "ksc-09",
    src: "/assets/gallery/ksc-09.jpg",
    alt: "Karur Study Center — wider view of the centre",
    caption: "Study Center Overview",
  },
  {
    id: "ksc-10",
    src: "/assets/gallery/ksc-10.jpg",
    alt: "Karur Study Center — interior and seating area",
    caption: "Center Interior",
  },
  {
    id: "ksc-11",
    src: "/assets/gallery/ksc-11.jpg",
    alt: "Karur Study Center — front and exterior",
    caption: "Center Front & Exterior",
  },
  {
    id: "tnou-flyer",
    src: "/assets/gallery/tnou-ay2026.jpg",
    alt: "Tamil Nadu Open University — Academic Year 2026 admission flyer",
    caption: "TNOU — AY 2026 Admission Flyer",
  },
  {
    id: "ksc-12",
    src: "/assets/gallery/ksc-12.jpg",
    alt: "Karur Study Center computer lab with students at workstations",
    caption: "Our Computer Lab",
  },
  {
    id: "ksc-13",
    src: "/assets/gallery/ksc-13.jpg",
    alt: "A management studies class in session at Karur Study Center",
    caption: "Contact Class in Session",
  },
  {
    id: "ksc-14",
    src: "/assets/gallery/ksc-14.jpg",
    alt: "KSC students at the Alagappa University convocation ceremony",
    caption: "Alagappa University Convocation — Our Graduates",
  },
  {
    id: "ksc-15",
    src: "/assets/gallery/ksc-15.jpg",
    alt: "Shelves of study material and student records at Karur Study Center",
    caption: "Study Material Library",
  },
  {
    id: "ksc-16",
    src: "/assets/gallery/ksc-16.jpg",
    alt: "MRS Plaza — Karur Study Center signage on the building front",
    caption: "MRS Plaza, Karur — Our Building",
  },
];
