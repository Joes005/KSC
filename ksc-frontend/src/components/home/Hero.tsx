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

const HERO_IMAGES = [
  "/assets/campus/lecture-hall.jpg",
  "/assets/gallery/ksc-10.jpg",
  "/assets/gallery/ksc-09.jpg",
];

export function UserUpdatePopup() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: { user_update_modal: modalData, user_update_posters: posters = [] } } = useSiteData();
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  useEffect(() => {
    if (posters.length > 1) {
      const timer = setInterval(() => {
        setCurrentPosterIndex((prev) => (prev + 1) % posters.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [posters.length]);

  useEffect(() => {
    if (!isOpen || !modalData?.enabled) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, modalData?.enabled]);

  if (!isOpen || !modalData?.enabled) return null;

  // Fallback to static modal image if no API posters are present
  const displayImageUrl = posters.length > 0
    ? (posters[currentPosterIndex].image_path.startsWith('http') ? posters[currentPosterIndex].image_path : `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/storage/${posters[currentPosterIndex].image_path}`)
    : modalData.imageUrl;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ksc-navy/75 p-4 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true" aria-labelledby="update-title">
      <div className="animate-fade-in flex w-full max-w-4xl justify-center">
        {displayImageUrl ? (
          <div className="relative inline-block rounded-3xl bg-white/10 p-2 sm:p-3 shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} aria-label="Close update" autoFocus className="absolute -right-2 -top-2 sm:-right-6 sm:-top-6 z-20 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-2xl backdrop-blur-md transition-all hover:bg-ksc-red hover:scale-110 hover:border-ksc-red">
              <X className="h-5 w-5 sm:h-7 sm:w-7 stroke-[2.5]" />
            </button>
            <img src={displayImageUrl} alt="Update" className="w-auto h-auto object-contain max-h-[80vh] max-w-full rounded-2xl shadow-inner" key={displayImageUrl} />
          </div>
        ) : (
          <div className="relative w-full max-w-2xl rounded-2xl bg-white/5 p-8 text-center border border-white/10">
            <button onClick={() => setIsOpen(false)} aria-label="Close update" autoFocus className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <h3 id="update-title" className="mb-2 text-2xl font-bold text-white">{modalData.title}</h3>
            <p className="text-white/80 font-medium">{modalData.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function highlightLocations(text: string) {
  if (!text) return null;
  const parts = text.split(/(Karur|Dindigul|Kangeyam|Kangayam)/gi);
  return parts.map((part, idx) => {
    if (/^(Karur|Dindigul|Kangeyam|Kangayam)$/i.test(part)) {
      return (
        <span key={idx} className="font-bold text-ksc-red">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function Hero() {
  const { data: { settings: SITE_CONFIG, pages, hero: fallbackHero } } = useSiteData();
  const heroData = (pages?.home?.hero || fallbackHero) as any;
  const heroImages: string[] = Array.isArray(heroData.images) && heroData.images.length
    ? heroData.images
    : HERO_IMAGES;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <>
      <UserUpdatePopup />
      <section className="relative overflow-hidden bg-white bg-dot-pattern">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-slate-50 via-white to-blue-50 lg:w-[58%]" />
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-ksc-sky/40 blur-[100px]" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-ksc-yellow/5 blur-[120px]" />
        <div className="absolute left-0 top-0 h-1.5 w-40 bg-ksc-red" />
        <div className="container-site relative grid items-center gap-8 py-8 sm:gap-12 sm:py-14 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr] lg:py-16">
          <div className="relative z-10 max-w-2xl">
            {/* Admissions Banner Pill */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-ksc-red/20 bg-red-50/70 px-3 py-1.5 sm:px-4 sm:py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ksc-red opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ksc-red"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[.15em] sm:tracking-[.2em] text-ksc-navy">
                Admissions open · {SITE_CONFIG.admissionYear}
              </span>
            </div>

            <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-ksc-royal">
              {heroData.subHeadline}
            </p>

            <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.8rem] sm:leading-[1.08]">
              <span className="inline-block pb-1 text-gradient-red drop-shadow-sm">
                {heroData.headline || "Karur Study Centre"}
              </span>
            </h1>

            {/* Branch Locations Highlight */}
            <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mr-0.5">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-ksc-red" /> Branches:
              </span>
              {[
                { name: "Karur", label: "Head Office" },
                { name: "Dindigul", label: "Branch" },
                { name: "Kangeyam", label: "Branch" },
              ].map((branch) => (
                <Link
                  key={branch.name}
                  to="/contact"
                  className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-gradient-to-r from-red-50 to-rose-50 px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold text-ksc-red shadow-xs transition-all duration-300 hover:bg-ksc-red hover:text-white hover:border-ksc-red hover:shadow-md hover:-translate-y-0.5 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ksc-red group-hover:bg-white animate-pulse" />
                  <span className="tracking-wide">{branch.name}</span>
                  {branch.label === "Head Office" && (
                    <span className="text-[9px] sm:text-[10px] font-semibold text-ksc-red/75 group-hover:text-white/90">({branch.label})</span>
                  )}
                </Link>
              ))}
            </div>

            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-[17px] font-semibold leading-relaxed sm:leading-8 text-slate-700 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              {highlightLocations(heroData.description)}
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-9 flex flex-col gap-3 sm:flex-row animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              {heroData.ctas?.map((cta: any, idx: number) => (
                <MagneticButton key={idx}>
                  <Link to={cta.to} className={cn(cta.primary ? "btn-gold gap-2 w-full justify-center btn-shimmer py-3 sm:py-3.5" : "btn-outline bg-white/80 w-full justify-center py-3 sm:py-3.5")}>
                    {cta.label} {cta.primary && <ArrowRight className="h-4 w-4" />}
                  </Link>
                </MagneticButton>
              ))}
            </div>

            {/* Trust Points */}
            <div className="mt-7 sm:mt-10 grid grid-cols-1 gap-2 border-t border-slate-200 pt-4 sm:pt-6 text-xs sm:text-sm font-black text-ksc-navy sm:grid-cols-3">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-ksc-red shrink-0" /> Recognised degrees</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-ksc-red shrink-0" /> Flexible schedules</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-ksc-red shrink-0" /> Local support</span>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end mt-2 sm:mt-0">
            <div className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 h-full w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-ksc-red to-[#910a11] shadow-xl sm:shadow-2xl" />
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white/80 bg-ksc-navy shadow-[0_20px_50px_-12px_rgba(7,27,74,0.35)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 sm:hover:-translate-y-2">
              <img key={currentImage} src={heroImages[currentImage]} alt="Students supported by Karur Study Centre" fetchPriority="high" className="hero-media h-64 sm:h-80 md:h-[420px] lg:h-[480px] w-full object-cover object-top animate-fade-in" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ksc-navy via-ksc-navy/80 to-transparent px-4 pb-4 pt-12 text-white sm:px-8 sm:pb-8 sm:pt-24">
                <p className="text-lg font-black text-white drop-shadow-md sm:text-2xl">Education that fits your life</p>
                <p className="mt-0.5 text-xs font-bold text-white/90 sm:mt-1.5 sm:text-sm">Study. Grow. Move forward.</p>
              </div>
            </div>

            {/* Floating Academic Badge */}
            <div className="absolute left-2 top-2 sm:-left-6 sm:top-6 rounded-lg sm:rounded-2xl bg-white/95 sm:bg-white p-1.5 sm:p-3.5 shadow-lg sm:shadow-[0_12px_30px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all">
              <div className="flex flex-col items-center justify-center rounded-md sm:rounded-xl bg-ksc-red px-2.5 py-1 sm:px-4 sm:py-2 text-white">
                <span className="block text-[8px] sm:text-[10px] font-black uppercase tracking-[.15em] sm:tracking-[.2em] text-white/90">Now open</span>
                <span className="font-heading text-xs sm:text-lg md:text-xl font-black uppercase tracking-tight">{SITE_CONFIG.admissionYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Icons Strip */}
        <div className="relative border-y border-white/10 bg-ksc-navy text-white shadow-inner">
          <div className="container-site grid grid-cols-2 divide-x divide-y md:divide-y-0 divide-white/10 md:grid-cols-4">
            {[
              [BookOpen, "UG & PG", "Programmes"],
              [MonitorPlay, "Flexible", "Learning"],
              [Globe, "Learn from", "Anywhere"],
              [Award, "Recognised", "Degrees"],
            ].map(([Icon, top, bottom]) => {
              const FeatureIcon = Icon as LucideIcon;
              return (
                <div key={top as string} className="flex items-center gap-2.5 sm:gap-3.5 px-3 py-3.5 sm:px-7 sm:py-5">
                  <FeatureIcon className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-ksc-yellow drop-shadow-sm" />
                  <div className="text-[11px] sm:text-sm font-black uppercase tracking-wider leading-tight text-white">
                    <span className="block text-white font-black drop-shadow-xs">{top as string}</span>
                    <span className="block text-[10px] sm:text-xs font-bold text-slate-200 mt-0.5">{bottom as string}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

