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

export function Stats() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  useScrollReveal();
  return (
    <section className="bg-ksc-navy py-16 relative overflow-hidden reveal-section">
      <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay"></div>
      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-3 lg:grid-cols-5 divide-x-0 md:divide-x-2 divide-white/10">
          {SITE_CONFIG.stats.map((s, index) => (
            <div
              key={s.label}
              className={cn(
                "px-2 sm:px-4 opacity-0 scale-95 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:scale-100",
                index === SITE_CONFIG.stats.length - 1 && SITE_CONFIG.stats.length % 2 === 1 && "col-span-2 md:col-span-1 max-w-xs mx-auto md:max-w-none"
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} duration={1200 + index * 140} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

