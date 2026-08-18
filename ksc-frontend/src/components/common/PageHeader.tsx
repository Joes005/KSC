import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  breadcrumb: Array<{ label: string; to?: string }>;
  bgImage?: string;
}

export function PageHeader({ title, breadcrumb, bgImage }: PageHeaderProps) {
  return (
    <section className="bg-ksc-navy-dark relative h-[300px] w-full overflow-hidden sm:h-[350px] border-b border-white/5">
      {bgImage && (
        <img 
          src={bgImage} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none" 
        />
      )}

      {/* Decorative blurred colour blobs */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-[100px]" />

      {/* Background Overlay */}
      <div className={`absolute inset-0 pointer-events-none ${bgImage ? "bg-gradient-to-t from-ksc-navy-dark via-ksc-navy-dark/80 to-transparent" : "bg-gradient-to-t from-ksc-navy-dark to-transparent opacity-80"}`} />

      {/* Content */}
      <div className="container-site relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="mb-6 text-4xl font-heading font-extrabold text-white tracking-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/70 shadow-xl backdrop-blur-md">
          {breadcrumb.map((crumb, idx) => {
            const isLast = idx === breadcrumb.length - 1;
            return (
              <div key={crumb.label} className="flex items-center">
                {crumb.to && !isLast ? (
                  <Link to={crumb.to} className="transition-colors hover:text-secondary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-bold text-secondary drop-shadow-sm" : ""}>{crumb.label}</span>
                )}

                {!isLast && <ChevronRight className="mx-2.5 h-4 w-4 text-white/30" />}
              </div>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
