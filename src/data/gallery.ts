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
    id: "ksc-05",
    src: "/assets/gallery/ksc-05.jpg",
    alt: "Admission guidance desk at Karur Study Center",
    caption: "Counselling and Admission Desk",
  },
  {
    id: "ksc-06",
    src: "/assets/gallery/ksc-06.jpg",
    alt: "Study materials arranged for student distribution",
    caption: "Study Material Distribution",
  },
  {
    id: "ksc-07",
    src: "/assets/gallery/ksc-07.jpg",
    alt: "Students interacting at the centre",
    caption: "Student Interaction",
  },
  {
    id: "ksc-08",
    src: "/assets/gallery/ksc-08.jpg",
    alt: "Examinations support team",
    caption: "Exams & Evaluation Team",
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
