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

const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  CalendarRange,
  BookOpen,
  Library,
  Headphones,
  MonitorPlay,
  MapPinned,
  MonitorSmartphone,
  Building2,
};

export function FacilitiesSpotlight() {
  const { data: { facilities: FACILITIES, pages } } = useSiteData();
  const heading = ((pages?.home?.section_headings as any)?.facilities_spotlight || {}) as { kicker?: string; title?: string; subtitle?: string };
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevIndexRef = useRef(0);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FACILITIES.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [isAutoPlaying, FACILITIES.length]);

  // Handle manual user clicks and resume autoplay later
  const handleUserInteraction = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      // Force an immediate tick so the user sees it resume instantly, 
      // then turn the auto-player back on
      setActiveIndex((prev) => (prev + 1) % FACILITIES.length);
      setIsAutoPlaying(true);
    }, 5000); // Resume autoplay after 5s of inactivity
  };

  // Auto-scroll to keep active item at the top without jumping the main page
  useEffect(() => {
    if (containerRef.current && itemRefs.current[activeIndex]) {
      const container = containerRef.current;

      // Find a fully collapsed item to measure its exact height
      let collapsedItem = itemRefs.current.find((el, i) => i !== activeIndex && i !== prevIndexRef.current && el !== null);
      let collapsedHeight = collapsedItem ? collapsedItem.offsetHeight : (window.innerWidth >= 640 ? 106 : 90);

      const gap = 12; // gap-3 = 12px
      const targetTop = activeIndex * (collapsedHeight + gap);

      container.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  return (
    <section className="facilities-showcase bg-slate-50 py-16 lg:py-16 border-t border-slate-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ksc-navy/5 -skew-x-12 transform origin-top" />
      <div className="container-site relative z-10">
        <SectionHeading
          kicker={heading.kicker || "Facilities & Services"}
          title={heading.title || "Everything you need under one roof"}
          subtitle={heading.subtitle || "Admission guidance, study material, exam support — all from your local study centre."}
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-7xl mx-auto">

          {/* Left Side: Cinematic Sticky Display */}
          <div className="lg:sticky lg:top-24 h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden bg-slate-200 relative isolate">
            {FACILITIES.map((facility, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0 pointer-events-none"
                  )}
                >
                  {/* Fallback pattern if no image */}
                  <div className="absolute inset-0 bg-ksc-navy/5" />
                  {facility.image && (
                    <img src={facility.image} alt={facility.title} loading="lazy" className="h-full w-full object-cover" />
                  )}
                  {/* Bottom Gradient for Text Legibility if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ksc-navy/90 via-ksc-navy/20 to-transparent opacity-80" />
                </div>
              );
            })}

            {/* Floating Glass Badge Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20 flex items-center gap-3 sm:gap-4 rounded-2xl bg-white/10 p-3.5 sm:p-5 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500">
              {FACILITIES.map((facility, index) => {
                const isActive = index === activeIndex;
                const Icon = typeof facility.icon === "string" ? ICON_MAP[facility.icon] ?? Building2 : facility.icon;
                if (!isActive) return null;
                return (
                  <div key={index} className="flex items-center gap-3 sm:gap-5 w-full animate-fade-in">
                    <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-ksc-yellow text-ksc-navy shadow-lg">
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-xl font-bold text-white tracking-tight">{facility.title}</h4>
                      <p className="text-xs sm:text-sm font-medium text-white/80 mt-0.5 sm:mt-1 uppercase tracking-wider">Highlight Feature</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Expanding Accordion List with Fixed Bottom Button */}
          <div className="flex flex-col h-[400px] sm:h-[500px] lg:h-[600px] w-full">

            {/* Scrollable List */}
            <div
              ref={containerRef}
              className="relative flex flex-col gap-3 py-4 overflow-y-hidden pr-2 lg:pr-4 flex-1 scroll-smooth"
              style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
            >
              {FACILITIES.map((facility, index) => {
                const isActive = index === activeIndex;
                const Icon = typeof facility.icon === "string" ? ICON_MAP[facility.icon] ?? Building2 : facility.icon;

                return (
                  <button
                    key={index}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    onClick={() => {
                      if (isActive) {
                        navigate('/facilities');
                      } else {
                        handleUserInteraction(index);
                      }
                    }}
                    className={cn(
                      "group relative flex w-full flex-col items-start rounded-2xl p-4 sm:p-6 text-left transition-all duration-500 ease-in-out border overflow-hidden shrink-0 scroll-mt-4 lg:scroll-mt-6",
                      isActive
                        ? "bg-white shadow-lift border-ksc-navy/10 ring-1 ring-ksc-navy/5"
                        : "bg-transparent border-transparent hover:bg-white/60"
                    )}
                  >
                    {/* Progress Line */}
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1.5 bg-slate-200">
                        <div
                          className="w-full bg-ksc-red origin-top"
                          style={{
                            height: '100%',
                            animation: isAutoPlaying ? 'progress 4s linear forwards' : 'none',
                            transform: !isAutoPlaying ? 'scaleY(1)' : undefined
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-3.5 sm:gap-5 w-full relative z-10">
                      <div className={cn(
                        "flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
                        isActive ? "bg-ksc-navy text-white shadow-md rotate-3 scale-110" : "bg-white text-slate-400 border border-slate-100 group-hover:text-ksc-red group-hover:scale-105"
                      )}>
                        <Icon className="h-5 w-5 sm:h-7 sm:w-7 stroke-[1.5]" />
                      </div>
                      <h4 className={cn(
                        "text-base sm:text-xl font-bold transition-colors duration-300 tracking-tight",
                        isActive ? "text-ksc-navy" : "text-slate-500 group-hover:text-slate-700"
                      )}>
                        {facility.title}
                      </h4>
                    </div>

                    {/* Accordion Content */}
                    <div className={cn(
                      "grid transition-all duration-500 ease-in-out w-full",
                      isActive ? "grid-rows-[1fr] opacity-100 mt-3 sm:mt-5" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-base font-medium leading-relaxed text-slate-600 pl-2 sm:pl-[4.5rem] pr-2">
                          {facility.description}
                        </p>
                        <div className="pl-2 sm:pl-[4.5rem] mt-3 sm:mt-4 pb-2">
                          <Link to="/facilities" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ksc-navy hover:text-ksc-red transition-colors group/link">
                            Read full details
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fixed Bottom Button */}
            <div className="mt-4 pt-4 border-t border-slate-200/60 pl-2">
              <Link to="/facilities" className="btn-outline border-slate-300 text-slate-600 hover:border-ksc-navy hover:bg-ksc-navy hover:text-white transition-all text-sm h-10 px-6">
                View all facilities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

