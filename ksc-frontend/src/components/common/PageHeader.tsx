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
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-ksc-navy via-ksc-navy/85 to-ksc-royal/55" />
      <div className="absolute bottom-0 left-0 h-1 w-24 bg-ksc-yellow" aria-hidden="true" />

      {/* Content */}
      <div className="container-site relative z-10 flex min-h-56 flex-col items-start justify-center py-9 text-left sm:min-h-64 sm:py-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-ksc-yellow">Karur Study Centre</p>
        <h1 className="mb-6 max-w-4xl text-4xl font-bold normal-case leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>

        {/* Breadcrumb Ribbon */}
        <nav aria-label="Breadcrumb">
          <div className="flex flex-wrap items-center text-xs font-medium text-white/70 sm:text-sm">
            {breadcrumb.map((crumb, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <div key={crumb.label} className="flex items-center">
                  {crumb.to && !isLast ? (
                    <Link to={crumb.to} className="transition-colors hover:text-ksc-yellow">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-white" : ""}>{crumb.label}</span>
                  )}

                  {!isLast && <ChevronRight className="mx-2 h-4 w-4 text-white/50" />}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
