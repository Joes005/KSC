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

export function CtaBand() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  return (
    <section className="compact-section relative overflow-hidden border-t border-slate-200 bg-ksc-sky/10 py-6 text-ksc-navy sm:py-7">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
      <div className="container-site relative flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="mb-2 inline-block rounded-md bg-ksc-navy px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Ready to begin?</p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{SITE_CONFIG.admissionOpen}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">{SITE_CONFIG.lastDate}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <MagneticButton>
            <Button size="default" className="btn-gold" asChild>
              <Link to="/admissions">Apply Now</Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button size="default" className="btn-outline" asChild>
              <Link to="/contact">Talk to a Counsellor</Link>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export function NewsAndEventsBanner() {
  const { data: { news_events: newsEvents } } = useSiteData();

  return (
    <section className="relative overflow-hidden border-y border-white/15 bg-gradient-to-r from-ksc-navy via-[#0c245c] to-ksc-navy py-4 sm:py-5 text-white shadow-lg">
      <div className="pointer-events-none absolute -left-12 -top-16 h-40 w-40 animate-float rounded-full bg-ksc-sky/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 right-8 h-44 w-44 animate-float rounded-full bg-ksc-yellow/15 blur-2xl [animation-delay:1.2s]" />
      <div className="container-site relative grid items-center gap-4 sm:gap-6 md:grid-cols-[220px_1fr_auto]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-ksc-red px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-white shadow-sm border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            Latest updates
          </span>
          <h2 className="mt-2.5 text-xl font-extrabold text-white sm:text-2xl lg:text-3xl tracking-tight drop-shadow-sm">News &amp; Events</h2>
          <p className="mt-1 text-xs text-white/70 font-medium hidden sm:block">Important admissions and examination notices.</p>
        </div>

        <div className="group relative h-44 sm:h-48 overflow-hidden rounded-2xl border border-white/20 bg-white/[0.09] px-4 sm:px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all hover:bg-white/[0.12] hover:border-white/30">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-[#071B4A] via-[#071B4A]/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-[#071B4A] via-[#071B4A]/60 to-transparent" />
          <div className="flex w-full animate-marqueeVertical flex-col items-start gap-5 py-5 hover:[animation-play-state:paused]">
            {[...newsEvents, ...newsEvents].map((news, index) => (
              <div key={`${news.text}-${index}`} className="flex w-full items-start gap-3 text-sm font-semibold leading-relaxed text-white/95 sm:text-base transition-colors hover:text-ksc-yellow group/item">
                <span className="relative flex h-2.5 w-2.5 shrink-0 mt-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ksc-yellow opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ksc-yellow shadow-[0_0_8px_rgba(245,196,0,0.8)]"></span>
                </span>
                <div className="flex-1 min-w-0">
                  {news.date && (
                    <span className="inline-block mb-1 px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase tracking-wider text-ksc-yellow border border-white/10">
                      {news.date}
                    </span>
                  )}
                  <p className="leading-snug text-white/90 drop-shadow-sm">{news.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <Link
            to="/exam-update"
            className="btn whitespace-nowrap border border-white/40 bg-white/10 text-white hover:bg-white hover:text-ksc-navy transition-all"
          >
            View all updates <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}


