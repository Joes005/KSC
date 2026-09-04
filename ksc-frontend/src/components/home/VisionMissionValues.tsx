import React from "react";
import { useSiteData } from "../../services/SiteDataContext";
import {
  CheckCircle2,
  CalendarRange,
  BookOpen,
  Award,
  Globe,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Target,
  Compass,
  Quote,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "../../components/common/SectionHeading";
import { Tabs } from "../../components/common/Tabs";

const VALUE_ICONS: Record<string, LucideIcon> = {
  Accessibility: Globe,
  Integrity: ShieldCheck,
  "Student-First Support": HeartHandshake,
  "Academic Excellence": Award,
  Flexibility: CalendarRange,
  "Lifelong Learning": BookOpen,
};

function highlightLocations(text: string) {
  if (!text) return null;
  const parts = text.split(/(Karur|Dindigul|Kangeyam|Kangayam)/gi);
  return parts.map((part, idx) => {
    if (/^(Karur|Dindigul|Kangeyam|Kangayam)$/i.test(part)) {
      return (
        <span key={idx} className="font-extrabold text-ksc-red">
          {part}
        </span>
      );
    }
    return part;
  });
}

export function VisionMissionValues() {
  const { data: { pages, vision_mission: fallbackIntro } } = useSiteData();
  const intro = (pages?.home?.vision_mission || fallbackIntro) as any;
  const heading = ((pages?.home?.section_headings as any)?.vision_mission || {}) as { kicker?: string; title?: string };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 sm:py-16 border-t border-slate-100 bg-dot-pattern">
      {/* Dynamic ambient background glow */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-red-500/10 blur-[90px] animate-pulse" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-[90px] animate-pulse [animation-delay:2s]" />

      <div className="container-site relative z-10">
        <SectionHeading kicker={heading.kicker || "Our Foundation"} />
        <div className="mx-auto max-w-5xl mt-2">
          <Tabs
            tabs={[
              { id: "vision", label: "Vision" },
              { id: "mission", label: "Mission" },
              { id: "values", label: "Values" },
            ]}
            defaultActive="vision"
            centerTabs
          >
            {(activeId) => {
              if (activeId === "vision") {
                return (
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-red-50/30 to-amber-50/40 p-8 sm:p-12 shadow-xl border-2 border-red-100/90 group animate-fade-in-up max-w-3xl mx-auto text-center transition-all duration-500 hover:shadow-2xl hover:border-red-200">
                    {/* Decorative Top Accent Glow Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ksc-red via-ksc-yellow to-ksc-navy" />

                    {/* Decorative quote mark */}
                    <div className="absolute -top-3 -right-2 text-[100px] font-black text-ksc-red/10 font-heading leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                      "
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-200 px-4 py-1 text-xs font-black uppercase tracking-[0.16em] text-ksc-red mb-6 shadow-2xs">
                      <Target className="h-4 w-4 text-ksc-red animate-spin-slow" />
                      <span>Our Guiding Vision</span>
                    </div>

                    <p className="text-base sm:text-lg lg:text-xl font-bold leading-relaxed text-slate-800 relative z-10">
                      {highlightLocations(intro.vision)}
                    </p>

                    {/* Bottom subtle glow ribbon */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                      <span className="h-0.5 w-8 rounded-full bg-gradient-to-r from-transparent to-ksc-red" />
                      <Sparkles className="h-3.5 w-3.5 text-ksc-yellow" />
                      <span>Empowering Higher Education Since 2001</span>
                      <span className="h-0.5 w-8 rounded-full bg-gradient-to-l from-transparent to-ksc-navy" />
                    </div>
                  </div>
                );
              }

              if (activeId === "mission") {
                return (
                  <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up text-left max-w-4xl mx-auto">
                    {intro.mission.map((m: any, idx: number) => (
                      <div
                        key={idx}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-red-50/40 p-5 sm:p-6 shadow-sm border-2 border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-ksc-red/50 hover:-translate-y-1.5"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        {/* Gradient left accent */}
                        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-ksc-red to-ksc-yellow transition-all duration-300 group-hover:w-2" />

                        {/* Step number watermark */}
                        <div className="absolute right-3 -bottom-2 text-5xl font-black text-slate-100 transition-colors duration-300 group-hover:text-red-100/60 pointer-events-none select-none">
                          0{idx + 1}
                        </div>

                        <div className="relative z-10 flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-rose-100 text-ksc-red border border-red-200/80 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-ksc-red group-hover:text-white group-hover:shadow-md">
                            <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-ksc-red">
                              Objective 0{idx + 1}
                            </span>
                            <p className="text-sm sm:text-base text-slate-800 font-bold leading-relaxed mt-0.5">
                              {m}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 animate-fade-in-up text-left max-w-4xl mx-auto">
                  {intro.values.map((v: any, i: number) => {
                    const IconComponent = VALUE_ICONS[v.title] || Award;
                    return (
                      <div
                        key={v.title}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white via-white to-slate-50 p-5 sm:p-6 shadow-xs border-2 border-slate-100 transition-all duration-300 hover:shadow-xl hover:border-ksc-red/50 hover:-translate-y-1.5"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        {/* Top gradient highlight bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ksc-red via-ksc-yellow to-ksc-navy transition-all duration-300 group-hover:h-1.5" />

                        {/* Large number watermark */}
                        <div className="absolute -bottom-2 right-3 text-[64px] font-black text-slate-100 transition-colors duration-300 group-hover:text-red-50 pointer-events-none select-none leading-none z-0">
                          {i + 1}
                        </div>

                        <div className="relative z-10">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-ksc-red border border-red-200/60 shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:bg-ksc-navy group-hover:text-ksc-yellow">
                              <IconComponent className="h-5 w-5 stroke-[2.5]" />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Value 0{i + 1}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-base sm:text-lg text-ksc-navy uppercase tracking-wide group-hover:text-ksc-red transition-colors">
                            {v.title}
                          </h4>
                          <p className="mt-2 text-xs sm:text-sm font-semibold leading-relaxed text-slate-600">
                            {v.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
