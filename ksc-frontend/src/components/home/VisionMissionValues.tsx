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

export function VisionMissionValues() {
  const { data: { pages, vision_mission: fallbackIntro } } = useSiteData();
  const intro = (pages?.home?.vision_mission || fallbackIntro) as any;

  return (
    <section className="relative bg-slate-50 py-12 sm:py-16 lg:py-16 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading kicker="Our Foundation" title="Vision · Mission · Values" />
        <div className="mx-auto max-w-6xl">
          <Tabs
            tabs={[
              { id: "vision", label: "Vision" },
              { id: "mission", label: "Mission" },
              { id: "values", label: "Values" },
            ]}
            defaultActive="vision"
          >
            {(activeId) => {
              if (activeId === "vision") {
                return (
                  <div className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-slate-100 group animate-fade-in-up max-w-4xl mx-auto">
                    {/* Decorative quote mark */}
                    <div className="absolute -top-4 -right-2 text-[120px] font-black text-ksc-red/5 font-heading leading-none transition-transform duration-700 group-hover:scale-110 group-hover:text-ksc-red/10 select-none pointer-events-none">"</div>
                    {/* Animated bottom border */}
                    <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-ksc-red to-ksc-yellow transition-all duration-700 ease-out group-hover:w-full" />

                    <p className="text-xl sm:text-2xl font-heading font-black leading-relaxed text-ksc-navy relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                      {intro.vision}
                    </p>
                  </div>
                );
              }
              if (activeId === "mission") {
                return (
                  <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up">
                    {intro.mission.map((m: any) => (
                      <div key={m.slice(0, 20)} className="group relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-ksc-red/30 hover:-translate-y-1">
                        {/* Decorative corner shape */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-ksc-sky/30 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 pointer-events-none" />

                        <div className="relative z-10 flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-ksc-red transition-all duration-300 group-hover:bg-ksc-red group-hover:text-white group-hover:shadow-sm group-hover:rotate-6">
                            <CheckCircle2 className="h-5 w-5 stroke-[2]" />
                          </div>
                          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed transition-colors duration-300 group-hover:text-ksc-navy mt-0.5">{m}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 animate-fade-in-up">
                  {intro.values.map((v: any, i: number) => (
                    <div key={v.title} className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      {/* Shadow Number */}
                      <div className="absolute -bottom-2 right-4 text-[100px] font-black text-slate-100/80 transition-colors duration-500 group-hover:text-white/10 pointer-events-none select-none leading-none z-0">
                        {i + 1}
                      </div>

                      {/* Hover background fill */}
                      <div className="absolute inset-0 bg-gradient-to-br from-ksc-navy to-ksc-royal opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0" />

                      <div className="relative z-10">
                        <h4 className="font-black text-xl text-ksc-navy uppercase tracking-wide transition-colors duration-500 group-hover:text-white">{v.title}</h4>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-white/80">{v.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

