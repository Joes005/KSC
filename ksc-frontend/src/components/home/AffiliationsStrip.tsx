import React, { useState, useEffect, useRef } from "react";
import { useSiteData } from "../../services/SiteDataContext";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  ClipboardList,
  Wallet,
  Package,
  MapPin,
  Phone,
  X,
  CalendarRange,
  BookOpen,
  Library,
  Headphones,
  MonitorPlay,
  MapPinned,
  MonitorSmartphone,
  Building2,
  Award,
  Globe
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "../../components/common/SectionHeading";
import { StatCounter } from "../../components/common/StatCounter";
import { Tabs } from "../../components/common/Tabs";
import { Button } from "../../components/ui/Button";
import { cn } from "../../utils/cn";
import { CustomCursor, MagneticButton, useScrollReveal } from "./SharedHooks";

const DEFAULT_AFFILIATIONS = [
  { badge: "UGC", line1: "Approved", line2: "Institute" },
  { badge: "ISO 9001", line1: "Certified", line2: "Center" },
  { badge: "NCTE", line1: "Recognized", line2: "Courses" },
];

export function AffiliationsStrip() {
  useScrollReveal();
  const { data: { pages } } = useSiteData();
  const affiliations = (pages?.home?.affiliations as any[]) || [];
  const items = affiliations.length ? affiliations : DEFAULT_AFFILIATIONS;
  return (
    <section className="bg-white py-10 border-b border-slate-100 reveal-section">
      <div className="container-site flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-20 opacity-0 translate-y-8 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0">
        {items.map((item, i) => (
          <div key={i} className="group flex items-center gap-4 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center font-bold text-ksc-navy text-[10px] sm:text-xs text-center bg-white leading-tight group-hover:bg-ksc-yellow group-hover:text-ksc-navy group-hover:border-ksc-yellow transition-colors">{item.badge}</div>
            <span className="font-semibold text-xs sm:text-sm text-slate-600 leading-tight uppercase tracking-wider">{item.line1}{item.line2 && <><br />{item.line2}</>}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

