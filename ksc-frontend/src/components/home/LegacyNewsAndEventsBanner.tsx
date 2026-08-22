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

export function UpdatesBar() {
  const { data: { news_events: news } } = useSiteData();
  const latest = news.slice(0, 2);
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-site flex flex-col gap-4 py-5 lg:flex-row lg:items-center">
        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-full bg-ksc-red px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-white">Latest updates</span>
          <span className="hidden h-7 w-px bg-slate-200 lg:block" />
        </div>
        <div className="grid flex-1 gap-2 md:grid-cols-2">
          {latest.map((item, index) => (
            <p key={index} className="flex items-start gap-2 text-sm font-semibold text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ksc-yellow" />{item.text}</p>
          ))}
        </div>
        <Link to="/exam-update" className="inline-flex shrink-0 items-center gap-2 text-xs font-black uppercase tracking-wider text-ksc-navy hover:text-ksc-red">View all <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

export function NewsAndEventsBanner() {
  const { data: { news_events: newsEvents } } = useSiteData();

  return (
    <section className="compact-section relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-ksc-navy via-ksc-royal to-ksc-navy py-7 text-white sm:py-8">
      <div className="pointer-events-none absolute -left-12 -top-16 h-40 w-40 animate-float rounded-full bg-ksc-sky/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 right-8 h-44 w-44 animate-float rounded-full bg-ksc-yellow/15 blur-2xl [animation-delay:1.2s]" />
      <div className="container-site relative grid items-center gap-6 md:grid-cols-[240px_1fr_auto]">
        <div>
          <span className="inline-flex items-center rounded-full bg-ksc-red px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-white">Latest updates</span>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">News &amp; Events</h2>
          <p className="mt-2 text-sm text-white/65">Important admissions and examination notices.</p>
        </div>

        <div className="group relative h-28 overflow-hidden rounded-2xl border border-white/10 bg-white/[.07] px-5 backdrop-blur-sm sm:h-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-ksc-royal/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-ksc-royal/90 to-transparent" />
          <div className="flex w-full animate-marqueeVertical flex-col items-start gap-7 py-9 hover:[animation-play-state:paused]">
            {[...newsEvents, ...newsEvents].map((news, index) => (
              <p key={`${news.text}-${index}`} className="flex min-h-7 w-full items-start gap-3 text-sm font-medium leading-6 text-white/90 sm:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ksc-yellow shadow-[0_0_0_4px_rgba(255,210,26,.12)]" />
                {news.text}
              </p>
            ))}
          </div>
        </div>

        <Link to="/exam-update" className="btn-outline border-white/40 bg-white/10 text-white hover:bg-white hover:text-ksc-navy">View all updates <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </div>
    </section>
  );
}

export function LegacyNewsAndEventsBanner() {
  const { data: { news_events: NEWS_EVENTS } } = useSiteData();

  return (
    <section className="bg-ksc-navy py-8 sm:py-12 border-y border-white/10 shadow-inner relative z-20">
      <div className="w-full max-w-[96%] 2xl:max-w-[1400px] mx-auto px-2 sm:px-4 grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-12 md:items-center">

        {/* Left: Poster */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start pl-0 xl:pl-8">
          <div className="relative overflow-hidden rounded-md shadow-xl bg-[#0070bc] text-white w-full max-w-[280px] p-4 text-center transform transition-transform hover:scale-105 border-4 border-white cursor-pointer">
            <h4 className="text-yellow-400 font-black text-2xl leading-tight mb-2 uppercase drop-shadow-md tracking-tighter">
              ADMISSION<br />OPEN <span className="text-3xl">2025-26</span>
            </h4>
            <div className="text-[10px] text-white/90 mb-3 tracking-widest uppercase font-semibold">Explore Top UG & PG Courses</div>
            <div className="space-y-1 mt-2">
              <div className="bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-sm inline-block shadow mb-1">
                UG Courses
              </div>
              <p className="text-[11px] font-bold tracking-widest border-b border-white/20 pb-2 mb-2">BA • B.Com • B.Sc • BBA</p>

              <div className="bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-sm inline-block shadow mb-1 mt-1">
                PG Courses
              </div>
              <p className="text-[11px] font-bold tracking-widest pb-3">MBA • MA • M.Com • M.Sc</p>
            </div>
            <div className="mt-2 pb-2">
              <span className="bg-yellow-400 text-blue-900 text-xs font-black px-6 py-1.5 rounded-full uppercase shadow-lg shadow-black/20 hover:bg-white/5 transition-colors">
                Apply Now
              </span>
            </div>
          </div>
        </div>

        {/* Center: News List */}
        <div className="md:col-span-4 lg:col-span-6 flex flex-col items-center text-center space-y-4 px-2 xl:px-8">
          <h2 className="text-2xl sm:text-[32px] font-extrabold text-white tracking-tight drop-shadow-sm pb-3 border-b-2 border-white/10 w-full sm:w-4/5">
            News & Events
          </h2>
          <div className="relative w-full h-[140px] overflow-hidden group">
            {/* Gradient masks for smooth fading at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-ksc-navy to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-ksc-navy to-transparent z-10 pointer-events-none"></div>

            <div className="space-y-6 w-full flex flex-col items-center animate-marqueeVertical hover:[animation-play-state:paused] pt-8 pb-8">
              {[...NEWS_EVENTS, ...NEWS_EVENTS].map((news, i) => (
                <p key={i} className={`text-base sm:text-[18px] lg:text-[19px] leading-relaxed cursor-pointer hover:underline underline-offset-4 px-4 sm:px-8 max-w-2xl ${i % NEWS_EVENTS.length === 0 ? "text-white font-bold" : "text-white/80 font-semibold"}`}>
                  {news.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Notice Board */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-end pr-0 xl:pr-8">
          <div className="relative flex flex-col items-center transform transition-transform hover:rotate-2 hover:scale-105 cursor-pointer mt-4 md:mt-0">
            {/* Pin */}
            <div className="absolute -top-1.5 z-20 w-3.5 h-3.5 rounded-full bg-red-600 shadow-[2px_3px_5px_rgba(0,0,0,0.4)] border border-red-800">
              <div className="absolute top-[2px] left-[2px] w-1 h-1 bg-white/5/60 rounded-full"></div>
            </div>
            {/* Strings */}
            <svg className="absolute top-0 z-10 w-[120px] h-[45px]" viewBox="0 0 100 50">
              <path d="M50 0 L15 45" stroke="#737373" strokeWidth="2" fill="none" />
              <path d="M50 0 L85 45" stroke="#737373" strokeWidth="2" fill="none" />
            </svg>
            {/* Board */}
            <div className="mt-[36px] bg-gradient-to-br from-[#2E4A22] to-[#1E3016] border-[8px] border-[#a3a3a3] rounded-lg p-5 shadow-2xl relative z-10 min-w-[160px] shadow-black/30">
              <h3 className="text-[#f1f5f9] font-serif font-bold text-center leading-snug drop-shadow-md text-[18px] tracking-wide">
                NEWS<br />&amp; EVENTS
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

