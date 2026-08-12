/**
 * KSC — FACILITIES / SERVICES DATA
 * Copy is deliberately kept generic (structure-only). Refine each description
 * with real copy when KSC provides it (TODO).
 */
import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  CalendarRange,
  BookOpen,
  Library,
  Headphones,
  MonitorPlay,
  MapPinned,
  MonitorSmartphone,
  Building2,
} from "lucide-react";

export interface Facility {
  icon: LucideIcon;
  image?: string;
  title: string;
  description: string;
}

export const FACILITIES: Facility[] = [
  {
    icon: Wallet,
    image: "/assets/images/low_fees_icon.png",
    title: "Low Fees",
    description: "Distance-education fee structures that fit an ordinary family budget, with no hidden charges.",
  },
  {
    icon: CalendarRange,
    image: "/assets/images/flexible_payment_icon.png",
    title: "Flexible Payment",
    description: "Pay in convenient instalments spread across the academic year.",
  },
  {
    icon: BookOpen,
    image: "/assets/user-photos/study-materials.jpg",
    title: "Study Materials",
    description: "Printed and digital Self-Learning Materials from the university, collected at our centre.",
  },
  {
    icon: Library,
    image: "/assets/images/bookshelf-bg.png",
    title: "Digital Library",
    description: "e-resources and reference access to support self-study from home.",
  },
  {
    icon: Headphones,
    image: "/assets/gallery/ksc-10.jpg",
    title: "Student Support",
    description: "A dedicated local team to answer queries on admissions, exams and results.",
  },
  {
    icon: MonitorPlay,
    image: "/assets/gallery/ksc-05.jpg",
    title: "Online Admission",
    description: "Guided online application filling at our centre for candidates who need help.",
  },
  {
    icon: MapPinned,
    image: "/assets/gallery/ksc-11.jpg",
    title: "Easy Access",
    description: "Located in the heart of Karur with convenient timings for working learners.",
  },
  {
    icon: MonitorSmartphone,
    image: "/assets/user-photos/distance-student.png",
    title: "Offline / Online Classes",
    description: "Optional contact classes and online sessions to supplement self-study.",
  },
  {
    icon: Building2,
    image: "/assets/user-photos/branch-exterior.jpg",
    title: "Infrastructure",
    description: "Well-maintained premises for counselling, document processing and study-material distribution.",
  },
];