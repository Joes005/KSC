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
  const POSTER_POINTS = [
    "Education brings Knowledge",
    "Education builds Character",
    "Education creates Opportunity",
    "Education reduces Poverty",
    "Education makes you Independent",
    "Education helps to serve the Nation",
    "Education is the key to a Better Tomorrow",
  ];

  return (
    <section className="relative overflow-hidden bg-[#fff8e7] py-12 sm:py-16">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-ksc-yellow/10 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
      <div className="container-site">
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <SectionHeading align="left" kicker="The value of learning" title="Education opens more than doors" subtitle="A recognised qualification can create confidence, independence and opportunity at every stage of life." />
            <div className="grid gap-3 sm:grid-cols-2">
              {POSTER_POINTS.map((para, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-ksc-navy/10 bg-white px-4 py-3 shadow-sm">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ksc-yellow text-xs font-black text-ksc-navy">{i + 1}</span>
                  <span className="text-sm font-bold leading-6 text-ksc-navy">{para}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg reveal-section">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_25px_70px_rgba(7,27,74,.16)]">
              <div className="relative aspect-[4/3] w-full rounded-[1.4rem] overflow-hidden bg-slate-200">
                {/* Cinematic Image Reveal via is-visible class */}
                <div className="absolute inset-0 transition-all duration-1000 [clip-path:inset(15%_15%_15%_15%_round_2rem)] [.is-visible_&]:[clip-path:inset(0%_0%_0%_0%_round_1.4rem)]">
                  <img src="/assets/gallery/ksc-01.jpg" alt="Study materials at Karur Study Centre" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.5s] scale-125 [.is-visible_&]:scale-100" />
                </div>
              </div>
            </div>
            <div className="relative -mt-14 ml-5 max-w-sm rounded-2xl bg-ksc-navy p-6 text-white shadow-xl sm:ml-12 transition-all duration-700 opacity-0 translate-y-12 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-300">
              <BookOpen className="mb-4 h-8 w-8 text-ksc-yellow" aria-hidden="true" />
              <p className="font-heading text-2xl font-bold leading-tight">Education is the most powerful weapon you can use to change the world.</p>
              <p className="mt-4 text-xs font-black uppercase tracking-[.2em] text-ksc-yellow">— Kamarajar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

