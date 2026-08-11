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
  title: string;
  description: string;
}

export const FACILITIES: Facility[] = [
  {
    icon: Wallet,
    title: "Low Fees",
    description: "Distance-education fee structures that fit an ordinary family budget, with no hidden charges.", // TODO: real copy
  },
  {
    icon: CalendarRange,
    title: "Flexible Payment",
    description: "Pay in convenient instalments spread across the academic year.", // TODO: real copy
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    description: "Printed and digital Self-Learning Materials from the university, collected at our centre.", // TODO: real copy
  },
  {
    icon: Library,
    title: "Digital Library",
    description: "e-resources and reference access to support self-study from home.", // TODO: real copy
  },
  {
    icon: Headphones,
    title: "Student Support",
    description: "A dedicated local team to answer queries on admissions, exams and results.", // TODO: real copy
  },
  {
    icon: MonitorPlay,
    title: "Online Admission",
    description: "Guided online application filling at our centre for candidates who need help.", // TODO: real copy
  },
  {
    icon: MapPinned,
    title: "Easy Access",
    description: "Located in the heart of Karur with convenient timings for working learners.", // TODO: real copy
  },
  {
    icon: MonitorSmartphone,
    title: "Offline / Online Classes",
    description: "Optional contact classes and online sessions to supplement self-study.", // TODO: real copy
  },
  {
    icon: Building2,
    title: "Infrastructure",
    description: "Well-maintained premises for counselling, document processing and study-material distribution.", // TODO: real copy
  },
];