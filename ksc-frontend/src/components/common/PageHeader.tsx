import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  breadcrumb: Array<{ label: string; to?: string }>;
  bgImage?: string;
}

export function PageHeader({ title, breadcrumb, bgImage }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-ksc-navy via-[#0d276b] to-[#87bdf5] relative h-[300px] w-full overflow-hidden sm:h-[350px] border-b-8 border-ksc-red">
      {bgImage && (
        <img 
          src={bgImage} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-luminosity" 
        />
      )}

      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-ksc-navy/40" />

      {/* Content */}
      <div className="container-site relative z-10 flex h-full flex-col items-center justify-center text-center mt-4">
        <h1 className="mb-8 text-5xl font-black text-white sm:text-6xl lg:text-7xl text-shadow-heavy uppercase tracking-tight">
          {title}
        </h1>

        {/* Breadcrumb Ribbon */}
        <nav className="poster-ribbon shadow-2xl px-8 py-2">
          <div className="poster-ribbon-text flex items-center text-xs sm:text-sm font-bold tracking-widest text-white">
            {breadcrumb.map((crumb, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              return (
                <div key={crumb.label} className="flex items-center">
                  {crumb.to && !isLast ? (
                    <Link to={crumb.to} className="transition-colors hover:text-ksc-yellow drop-shadow-md">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-ksc-yellow drop-shadow-md" : ""}>{crumb.label}</span>
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
