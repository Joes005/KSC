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

export function UniversityCourses() {
  const { data: { universities: UNIVERSITIES } } = useSiteData();
  useScrollReveal();
  return (
    <section className="bg-slate-50 py-10 lg:py-16 border-t border-slate-100 reveal-section" id="programmes">
      <div className="container-site">
        <SectionHeading
          kicker="Programmes Offered"
          title="Choose your university, choose your course"
          subtitle="One tab per affiliated university. Browse the programme categories each university offers under distance education."
        />
        <Tabs
          tabs={UNIVERSITIES.map((u) => ({ id: u.id, label: u.shortName }))}
          defaultActive={UNIVERSITIES[0]?.id}
        >
          {(activeId) => {
            const uni = UNIVERSITIES.find((u) => u.id === activeId) ?? UNIVERSITIES[0];
            return (
              <div className="opacity-0 translate-y-12 transition-all duration-700 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-100">
                <div className="mb-6 rounded-2xl bg-ksc-navy p-6 shadow-md border-l-4 border-ksc-yellow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-ksc-yellow/5 rounded-full blur-[40px] pointer-events-none transition-transform duration-700 group-hover:scale-150" />
                  <h3 className="text-2xl font-black text-white uppercase relative z-10">{uni.name}</h3>
                  <p className="mt-1 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {uni.academicYear} · {uni.pattern}
                  </p>
                  {uni.recognition && (
                    <p className="mt-2 inline-block rounded-md bg-red-50 border border-red-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-ksc-red">
                      {uni.recognition}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {uni.categories.map((cat, i) => (
                    <div key={cat.id} className="card-hover group flex flex-col p-6 sm:p-8" style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="flex items-center justify-between">
                        <h4 className="font-black uppercase text-ksc-navy group-hover:text-ksc-royal transition-colors">{cat.label}</h4>
                        {cat.count !== undefined && (
                          <span className="rounded-xl bg-ksc-navy/5 px-2.5 py-1 text-xs font-bold text-ksc-navy border border-ksc-navy/10 group-hover:bg-ksc-yellow group-hover:border-ksc-yellow transition-colors">
                            {cat.count}
                          </span>
                        )}
                      </div>
                      {cat.note && <p className="mt-2 text-xs font-medium text-slate-500">{cat.note}</p>}
                      <Link
                        to={`/academic#${uni.id}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-black uppercase text-ksc-navy hover:text-ksc-red transition-colors"
                      >
                        View All Programmes <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        </Tabs>
      </div>
    </section>
  );
}

