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

export function AdmissionSteps() {
  const { data: { pages, admission_steps: fallbackAdmissionSteps } } = useSiteData();
  const ADMISSION_STEPS = pages?.home?.admission_steps || fallbackAdmissionSteps;
  const STEPS = ADMISSION_STEPS.map((s, i) => ({ ...s, icon: [FileDown, ClipboardList, Wallet, Package][i] }));

  return (
    <section className="bg-slate-50 py-10 lg:py-16 border-t-4 border-ksc-yellow">
      <div className="container-site">
        <SectionHeading
          kicker="How It Works"
          title="Four simple steps to begin"
          subtitle="Download the form, submit documents, pay the fee, and start learning."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 border-t-2 border-dashed border-slate-300" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="group relative flex flex-col items-center text-center">
                {/* Icon Badge */}
                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 group-hover:scale-110">
                  <Icon className="relative z-20 h-10 w-10 text-ksc-navy transition-colors duration-300 group-hover:text-ksc-red stroke-[1.5]" />
                  {/* Step Number Bubble */}
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-ksc-yellow text-sm font-bold text-ksc-navy shadow-sm">
                    {parseInt(step.step)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative w-full rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg border border-slate-100">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-ksc-red">Step {step.step}</div>
                  <h3 className="mb-3 text-lg font-bold text-slate-800">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="btn-gold"
            asChild
          >
            <Link to="/admissions">Start Your Application</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

