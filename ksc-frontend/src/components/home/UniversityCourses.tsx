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
  return (
    <section className="bg-slate-50 py-10 lg:py-16 border-t border-slate-100" id="programmes">
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
              <div>
                <div className="mb-6 rounded-none bg-slate-900 p-6 border border-slate-900">
                  <h3 className="text-2xl font-black text-white uppercase">{uni.name}</h3>
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
                  {uni.categories.map((cat) => (
                    <div key={cat.id} className="card-hover flex flex-col p-6 sm:p-8">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black uppercase text-slate-900">{cat.label}</h4>
                        {cat.count !== undefined && (
                          <span className="rounded-none bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                            {cat.count}
                          </span>
                        )}
                      </div>
                      {cat.note && <p className="mt-2 text-xs font-medium text-slate-500">{cat.note}</p>}
                      <Link
                        to={`/academic#${uni.id}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-black uppercase text-slate-900 hover:text-slate-500 transition-colors"
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

