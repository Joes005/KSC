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

export function AboutSnapshot() {
  const { data: { pages, about_snapshot: fallbackAboutSnapshot } } = useSiteData();
  const ABOUT_SNAPSHOT = (pages?.home?.about_snapshot || fallbackAboutSnapshot) as any;
  const heading = ((pages?.home?.section_headings as any)?.about_snapshot || {}) as { kicker?: string; title?: string; subtitle?: string };

  return (
    <section className="relative overflow-hidden bg-[#fff8e7] py-12 sm:py-16">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-ksc-yellow/10 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
      <div className="container-site">
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <SectionHeading align="left" kicker={heading.kicker || "The value of learning"} title={heading.title || "Education opens more than doors"} subtitle={heading.subtitle || "A recognised qualification can create confidence, independence and opportunity at every stage of life."} />
            <div className="grid gap-4">
              {ABOUT_SNAPSHOT.text?.map((para: any, i: number) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-ksc-navy/10 bg-white px-4 py-4 shadow-sm">
                  <span className="text-sm sm:text-base font-bold leading-relaxed text-slate-800">{para}</span>
                </div>
              ))}
              {ABOUT_SNAPSHOT.readMoreLink && (
                <div className="mt-2">
                  <Link to={ABOUT_SNAPSHOT.readMoreLink} className="text-sm font-bold text-ksc-red hover:underline flex items-center">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg reveal-section">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_25px_70px_rgba(7,27,74,.16)]">
              <div className="relative aspect-[4/3] w-full rounded-[1.4rem] overflow-hidden bg-slate-200">
                {/* Cinematic Image Reveal via is-visible class */}
                <div className="absolute inset-0 transition-all duration-1000 [clip-path:inset(15%_15%_15%_15%_round_2rem)] [.is-visible_&]:[clip-path:inset(0%_0%_0%_0%_round_1.4rem)]">
                  <img src={ABOUT_SNAPSHOT.image || "/assets/gallery/ksc-01.jpg"} alt="Study materials at Karur Study Centre" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.5s] scale-125 [.is-visible_&]:scale-100" />
                </div>
              </div>
            </div>
            <div className="relative -mt-8 sm:-mt-14 mx-3 sm:mx-0 sm:ml-12 max-w-sm rounded-2xl bg-ksc-navy p-5 sm:p-6 text-white shadow-xl transition-all duration-700 opacity-0 translate-y-12 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-300">
              <BookOpen className="mb-3 sm:mb-4 h-7 w-7 sm:h-8 sm:w-8 text-ksc-yellow" aria-hidden="true" />
              <p className="font-heading text-lg sm:text-2xl font-bold leading-tight">Education is the most powerful weapon you can use to change the world.</p>
              <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs font-black uppercase tracking-[.2em] text-ksc-yellow">— Kamarajar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

