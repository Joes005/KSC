import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  breadcrumb: Array<{ label: string; to?: string }>;
  bgImage?: string;
}

export function PageHeader({ title, breadcrumb, bgImage }: PageHeaderProps) {
  return (
    <section className="relative min-h-56 w-full overflow-hidden bg-gradient-to-br from-ksc-navy to-ksc-royal sm:min-h-64">
      {bgImage && (
        <img 
          src={bgImage} 
          alt="" 
          className="page-header-image absolute inset-0 h-full w-full object-cover opacity-25 pointer-events-none"
        />
      )}

      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-ksc-navy via-ksc-navy/85 to-ksc-royal/55 backdrop-blur-[2px]" />
      <div className="absolute bottom-0 left-0 h-1.5 w-32 bg-gradient-to-r from-ksc-yellow to-amber-500" aria-hidden="true" />

      {/* Content */}
      <div className="container-site relative z-10 flex min-h-48 sm:min-h-56 lg:min-h-64 flex-col items-start justify-center py-7 sm:py-9 lg:py-10 text-left">
        <p className="mb-2 sm:mb-3 animate-fade-in text-[11px] sm:text-xs font-bold uppercase tracking-[.2em] text-ksc-yellow">Karur Study Centre</p>
        <h1 className="mb-4 sm:mb-6 max-w-4xl animate-fade-in-up text-2xl sm:text-4xl lg:text-5xl font-extrabold normal-case leading-tight tracking-tight text-white drop-shadow-md">
          {title}
        </h1>

        {/* Breadcrumb Ribbon */}
        <nav aria-label="Breadcrumb" className="animate-fade-in-up delay-100">
          <div className="flex flex-wrap items-center rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] font-medium text-white/70 backdrop-blur-md sm:text-sm shadow-sm">
            {breadcrumb.map((crumb, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <div key={crumb.label} className="flex items-center">
                  {crumb.to && !isLast ? (
                    <Link to={crumb.to} className="transition-all hover:text-white hover:drop-shadow-glow">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "font-bold text-white" : ""}>{crumb.label}</span>
                  )}

                  {!isLast && <ChevronRight className="mx-2 h-3.5 w-3.5 text-white/40" />}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
