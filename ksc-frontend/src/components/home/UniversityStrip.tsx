import React from "react";
import { useSiteData } from "../../services/SiteDataContext";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function UniversityStrip() {
  const { data: { universities: UNIVERSITIES, pages } } = useSiteData();
  const heading = ((pages?.home?.section_headings as any)?.university_strip || {}) as { kicker?: string; title?: string; subtitle?: string };
  return (
    <section className="bg-slate-50 py-16 lg:py-16 border-t border-slate-200">
      <div className="container-site">
        <div className="text-center animate-fade-in-up">
          <p className="section-kicker text-ksc-red bg-white inline-block px-3 py-1 rounded-md mb-4 shadow-sm border border-slate-100 uppercase tracking-widest">{heading.kicker || "Authorised Centre"}</p>
          <h2 className="text-4xl font-heading font-black tracking-tight text-ksc-navy sm:text-5xl lg:text-5xl">{heading.title || "Top universities in Tamil Nadu"}</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg font-bold text-slate-800 leading-relaxed bg-white/50 p-4 rounded-xl border border-white shadow-sm backdrop-blur-sm">{heading.subtitle || "We are the authorised admissions, study and exam centre for highly ranked state universities."}</p>
        </div>
        <div className="mx-auto mt-16 flex flex-wrap justify-center gap-6 sm:gap-8 max-w-7xl animate-fade-in-up delay-100">
          {UNIVERSITIES.map((uni) => (
            <Link
              key={uni.id}
              to={`/university/${uni.id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ksc-red/20 hover:shadow-lift w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.25rem)] xl:w-[260px] flex-grow max-w-[320px]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-ksc-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white shadow-sm transition-transform duration-500 group-hover:scale-105"
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  loading="lazy"
                  className="h-full w-full object-contain p-2 sm:p-3"
                />
              </div>
              <h3 className="mt-6 text-lg sm:text-xl font-black leading-tight text-ksc-navy uppercase transition-colors group-hover:text-ksc-red">
                {uni.name}
              </h3>
              <p className="mt-3 text-xs font-black uppercase tracking-widest text-ksc-red bg-red-50 px-2.5 py-1 rounded-md">
                {uni.academicYear} admissions
              </p>
              <p className="mt-4 text-sm text-slate-700 leading-relaxed font-bold">
                {uni.categories.length} programmes across UG, PG, Diploma and Certificate courses.
              </p>
              <span className="mt-auto pt-6 flex items-center text-xs font-black uppercase tracking-wider text-ksc-navy group-hover:text-ksc-red transition-colors">
                View Programmes <ArrowRight className="ml-1.5 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
