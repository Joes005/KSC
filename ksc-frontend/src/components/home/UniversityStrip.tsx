import React from "react";
import { useSiteData } from "../../services/SiteDataContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function UniversityStrip() {
  const { data: { universities: UNIVERSITIES, pages } } = useSiteData();
  const heading = ((pages?.home?.section_headings as any)?.university_strip || {}) as { kicker?: string; title?: string; subtitle?: string };
  return (
    <section className="bg-slate-50 py-14 lg:py-16 border-t border-b border-slate-200/80 reveal-section">
      <div className="container-site">
        <div className="text-center animate-fade-in-up">
          <p className="section-kicker text-ksc-red bg-white inline-block px-3 py-1 rounded-md mb-3 shadow-xs border border-slate-200/60 uppercase tracking-widest text-[11px] font-black">
            {heading.kicker || "Authorised Centre"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-ksc-navy">
            {heading.title || "Top universities in Tamil Nadu"}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg font-bold text-slate-700 leading-relaxed bg-white/70 p-3.5 sm:p-4 rounded-xl border border-slate-200/60 shadow-xs backdrop-blur-sm">
            {heading.subtitle || "We are the authorised admissions, study and exam centre for highly ranked state universities."}
          </p>
        </div>
        <div className="mx-auto mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl animate-fade-in-up delay-100">
          {UNIVERSITIES.map((uni) => (
            <Link
              key={uni.id}
              to={`/university/${uni.id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-ksc-red/30 hover:shadow-lift w-full h-full"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-ksc-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="relative flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white shadow-sm transition-transform duration-500 group-hover:scale-105"
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  loading="lazy"
                  className="h-full w-full object-contain p-2 sm:p-3"
                />
              </div>
              <div className="mt-5 sm:mt-6 flex h-14 sm:h-16 items-center justify-center w-full">
                <h3 className="text-base sm:text-lg font-black leading-snug text-ksc-navy uppercase transition-colors group-hover:text-ksc-red line-clamp-3">
                  {uni.name}
                </h3>
              </div>
              <div className="mt-2.5 flex items-center justify-center">
                <p className="text-[11px] font-black uppercase tracking-widest text-ksc-red bg-red-50 border border-red-100/80 px-2.5 py-1 rounded-md">
                  {uni.academicYear} admissions
                </p>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-bold min-h-[2.5rem] flex items-center justify-center">
                {uni.categories.length} programmes across UG, PG, Diploma and Certificate courses.
              </p>
              <span className="mt-auto pt-6 flex items-center text-xs font-black uppercase tracking-wider text-ksc-navy group-hover:text-ksc-red transition-colors">
                View Programmes <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
