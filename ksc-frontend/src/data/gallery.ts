/**
 * KSC — GALLERY DATA
 * Real photos are served from /public/assets/gallery/.
 * Captions/order can be swapped freely — keep the image files under public/assets/gallery/.
 */

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "ksc-mba-orientation",
    src: "/assets/gallery/ksc-mba-orientation.jpg",
    alt: "MBA Orientation Program conducted by Dr. S. Chandramohan, Dean & Director, Alagappa Institute of Management",
    caption: "MBA Orientation by Dr. S. Chandramohan (Alagappa University)",
  },
  {
    id: "ksc-computer-lab",
    src: "/assets/gallery/ksc-computer-lab.jpg",
    alt: "Students attending practical sessions in the Karur Study Centre Computer Lab",
    caption: "Karur Study Centre — Computer Lab",
  },
  {
    id: "ksc-classroom-lecture",
    src: "/assets/gallery/ksc-classroom-lecture.jpg",
    alt: "Interactive classroom lecture session in Management Studies for distance education students",
    caption: "Management Studies Classroom Lecture",
  },
  {
    id: "ksc-office-counselling",
    src: "/assets/gallery/ksc-office-counselling.jpg",
    alt: "Staff assisting students with admission registration and record verification at Karur Study Centre",
    caption: "Student Counselling & Admission Office",
  },
  {
    id: "ksc-admission-desk",
    src: "/assets/gallery/ksc-admission-desk.jpg",
    alt: "Admission Open desk and student consultation at Karur Study Centre",
    caption: "Admission Desk — Karur Study Centre",
  },
  {
    id: "ksc-05",
    src: "/assets/gallery/ksc-05.jpg",
    alt: "Admission guidance desk at Karur Study Centre",
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
    alt: "Karur Study Centre — wider view of the centre",
    caption: "Study Center Overview",
  },
  {
    id: "ksc-10",
    src: "/assets/gallery/ksc-10.jpg",
    alt: "Karur Study Centre — interior and seating area",
    caption: "Center Interior",
  },
  {
    id: "ksc-11",
    src: "/assets/gallery/ksc-11.jpg",
    alt: "Karur Study Centre — front and exterior",
    caption: "Center Front & Exterior",
  },
  {
    id: "tnou-flyer",
    src: "/assets/gallery/tnou-ay2026.jpg",
    alt: "Tamil Nadu Open University — Academic Year 2026 admission flyer",
    caption: "TNOU — AY 2026 Admission Flyer",
  },
];
