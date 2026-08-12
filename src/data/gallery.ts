/**
 * KSC — GALLERY DATA
 * Real photos are served from /public/assets/gallery/ (ksc-01..ksc-11).
 * Captions/order can be swapped freely — keep the image files under public/.
 */

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "ksc-01",
    src: "/assets/gallery/ksc-01.jpg",
    alt: "Karur Study Center — reception and front office",
    caption: "Karur Study Center — Front Office",
  },
  {
    id: "ksc-02",
    src: "/assets/gallery/ksc-02.jpg",
    alt: "Study materials and answer-script storage at Karur Study Center",
    caption: "Study Material & Answer-Script Storage",
  },
  {
    id: "ksc-03",
    src: "/assets/gallery/ksc-03.jpg",
    alt: "Students receiving admission guidance at Karur Study Center",
    caption: "Admission Guidance in Action",
  },
  {
    id: "ksc-04",
    src: "/assets/gallery/ksc-04.jpg",
    alt: "Distance education learners at the Karur Study Center",
    caption: "Learners at the Center",
  },
  {
    id: "ksc-05",
    src: "/assets/gallery/ksc-05.jpg",
    alt: "University study material collection at Karur Study Center",
    caption: "University Study Materials",
  },
  {
    id: "ksc-06",
    src: "/assets/gallery/ksc-06.jpg",
    alt: "Document processing and enrolment desk at Karur Study Center",
    caption: "Enrolment & Document Processing",
  },
  {
    id: "ksc-07",
    src: "/assets/gallery/ksc-07.jpg",
    alt: "Counselling session at the Karur Study Center",
    caption: "One-to-One Counselling",
  },
  {
    id: "ksc-08",
    src: "/assets/gallery/ksc-08.jpg",
    alt: "Karur Study Center facilities and learning space",
    caption: "Learning Space",
  },
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
];
