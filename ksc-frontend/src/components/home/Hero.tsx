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
  "/assets/user-photos/students.png",
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
            <button onClick={() => setIsOpen(false)} aria-label="Close update" autoFocus className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white shadow-2xl backdrop-blur-md transition-all hover:bg-ksc-red hover:scale-110 hover:border-ksc-red">
              <X className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.5]" />
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

export function Hero() {
  const { data: { settings: SITE_CONFIG, pages, hero: fallbackHero } } = useSiteData();
  const heroData = (pages?.home?.hero || fallbackHero) as any;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <UserUpdatePopup />
      <section className="relative overflow-hidden bg-white bg-dot-pattern">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-slate-50 via-white to-blue-50 lg:w-[58%]" />
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-ksc-sky/40 blur-[100px]" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-ksc-yellow/5 blur-[120px]" />
        <div className="absolute left-0 top-0 h-1.5 w-40 bg-ksc-red" />
        <div className="container-site relative grid items-center gap-12 py-14 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr] lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-ksc-red/20 bg-red-50/50 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ksc-red opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ksc-red"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[.2em] text-ksc-navy">Admissions open · {SITE_CONFIG.admissionYear}</span>
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.14em] text-ksc-royal">{heroData.subHeadline}</p>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ksc-navy sm:text-5xl lg:text-[4rem]">
              <span className="block pb-1 text-gradient-navy">{heroData.headline}</span>
            </h1>
            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-slate-600 sm:text-lg animate-fade-in-up" style={{ animationDelay: '300ms' }}>{heroData.description}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              {heroData.ctas?.map((cta: any, idx: number) => (
                <MagneticButton key={idx}>
                  <Link to={cta.to} className={cn(cta.primary ? "btn-gold gap-2 w-full btn-shimmer" : "btn-outline bg-white/70 w-full")}>
                    {cta.label} {cta.primary && <ArrowRight className="h-4 w-4" />}
                  </Link>
                </MagneticButton>
              ))}
            </div>
            <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 text-sm font-semibold text-ksc-navy sm:grid-cols-3">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Recognised degrees</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Flexible schedules</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Local support</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl bg-gradient-to-br from-ksc-red to-[#910a11] shadow-2xl" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/80 bg-ksc-navy shadow-[0_20px_50px_-12px_rgba(7,27,74,0.35)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2">
              <img key={currentImage} src={HERO_IMAGES[currentImage]} alt="Students supported by Karur Study Centre" className="hero-media h-80 w-full object-cover object-top animate-fade-in sm:h-[480px]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ksc-navy via-ksc-navy/80 to-transparent px-8 pb-8 pt-24 text-white">
                <p className="text-2xl font-bold text-white drop-shadow-md">Education that fits your life</p>
                <p className="mt-1.5 text-sm font-medium text-white/80">Study. Grow. Move forward.</p>
              </div>
            </div>
            <div className="absolute -left-2 top-8 rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] sm:-left-8 backdrop-blur-md">
              <div className="flex flex-col items-center justify-center rounded-xl bg-ksc-red px-5 py-3 text-white">
                <span className="block text-[10px] font-bold uppercase tracking-[.2em] text-white/90">Now open</span>
                <span className="font-heading text-2xl font-black uppercase tracking-tight">{SITE_CONFIG.admissionYear}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-y border-white/10 bg-ksc-navy text-white">
          <div className="container-site grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {[
              [BookOpen, "UG & PG", "Programmes"],
              [MonitorPlay, "Flexible", "Learning"],
              [Globe, "Learn from", "Anywhere"],
              [Award, "Recognised", "Degrees"],
            ].map(([Icon, top, bottom]) => {
              const FeatureIcon = Icon as LucideIcon;
              return <div key={top as string} className="flex items-center gap-3 px-4 py-5 sm:px-7"><FeatureIcon className="h-7 w-7 shrink-0 text-ksc-yellow" /><p className="text-xs font-extrabold uppercase tracking-wider sm:text-sm">{top as string}<span className="block text-white/55">{bottom as string}</span></p></div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

