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

export function Branches() {
  const { data: { branches: BRANCHES } } = useSiteData();
  useScrollReveal();
  return (
    <section className="bg-white py-10 lg:py-16 border-t-4 border-ksc-red bg-wavy-pattern reveal-section">
      <div className="container-site relative z-10">
        <SectionHeading
          kicker="Visit Us"
          title="Our Branchs"
          subtitle="Visit our centres — our counsellors will help you at every step."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {BRANCHES.map((branch, i) => (
            <div key={branch.name} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(8,59,130,0.15)] hover:border-ksc-yellow/50 border border-slate-100 opacity-0 translate-y-12 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0" style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <span className={cn(
                    "inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                    branch.isHead ? "bg-red-50 text-ksc-red" : "bg-blue-50 text-ksc-navy"
                  )}>
                    {branch.isHead ? "Head Office" : "Branch"}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-800 group-hover:text-ksc-royal transition-colors">{branch.name}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-ksc-navy transition-colors duration-300 group-hover:bg-ksc-yellow group-hover:text-ksc-navy shadow-inner group-hover:shadow-[0_0_15px_rgba(255,212,0,0.4)]">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 space-y-4 text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ksc-navy" />
                  <p className="text-sm leading-relaxed">{branch.address}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <Phone className="h-4 w-4 shrink-0 text-ksc-navy" />
                  <a href={`tel:${branch.phone}`} className="text-sm font-semibold hover:text-ksc-red transition-colors w-fit">
                    {branch.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

