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

export function WhyDistance() {
  const { data: { pages, why_distance: fallbackWhyDistance } } = useSiteData();
  const WHY_DISTANCE = (pages?.home?.why_distance || fallbackWhyDistance) as any;
  const whyDistanceImage = (pages?.home?.why_distance_image as any)?.image || "/assets/campus/computer-lab.jpg";
  const heading = ((pages?.home?.section_headings as any)?.why_distance || {}) as { kicker?: string; title?: string; subtitle?: string };
  const [activeIndex, setActiveIndex] = useState(0);

  useScrollReveal();

  return (
    <section className="relative bg-white py-12 sm:py-16 lg:py-16 border-t border-slate-100 bg-wavy-pattern reveal-section">
      <div className="container-site relative z-10">
        <SectionHeading
          kicker={heading.kicker || "Why Distance Education"}
          title={heading.title || "Road to a degree, without leaving home"}
          subtitle={heading.subtitle || "Affordable, flexible and recognised — distance education fits around your life, not the other way around."}
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start mt-12 opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-100">
          <div className="lg:col-span-5 hidden lg:block sticky top-28">
            <div className="relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[500px] border-4 border-white">
              <img src={whyDistanceImage} alt="Student studying distance education" loading="lazy" className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ksc-navy via-ksc-navy/80 to-transparent p-7 pt-24 text-white"><p className="font-heading text-3xl font-black uppercase drop-shadow-md">Learn on your terms</p></div>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl bg-[#f8fbff] p-3 lg:col-span-7 border border-ksc-navy/5 shadow-soft">
            {WHY_DISTANCE.map((item: any, index: number) => {
              const isActive = index === activeIndex;
              return (
                <div key={item.title} className="border-b border-slate-200 last:border-b-0 group">
                  <button onClick={() => setActiveIndex(index)} className="flex w-full items-center justify-between rounded-2xl px-4 py-6 text-left transition-all hover:bg-white hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-lg font-black transition-colors ${isActive ? 'bg-ksc-yellow text-ksc-navy shadow-[0_0_15px_rgba(255,212,0,0.5)]' : 'bg-white text-ksc-navy group-hover:bg-ksc-yellow/20 group-hover:text-ksc-navy'}`}>{String(index + 1).padStart(2, "0")}</div>
                      <span className={`text-lg font-bold sm:text-xl transition-colors ${isActive ? 'text-ksc-red' : 'text-ksc-navy group-hover:text-ksc-royal'}`}>{item.title}</span>
                    </div>
                    <span className={`ml-4 text-2xl font-light transition-transform duration-300 ${isActive ? 'text-ksc-yellow rotate-180' : 'text-ksc-navy rotate-0'}`}>{isActive ? '−' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden px-4 transition-all duration-500 ${isActive ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}><p className="pl-15 pr-8 text-sm font-medium leading-7 text-slate-600 sm:text-base">{item.description}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

