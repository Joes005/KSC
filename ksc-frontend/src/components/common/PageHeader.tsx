import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  breadcrumb: Array<{ label: string; to?: string }>;
}

export function PageHeader({ title, breadcrumb }: PageHeaderProps) {
  return (
    <section className="gradient-head relative h-[250px] w-full overflow-hidden sm:h-[300px]">
      {/* Decorative blurred colour blobs */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-ksc-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-ksc-saffron/20 blur-3xl" />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
        style={{ backgroundImage: "url('/assets/images/bookshelf-bg.png')" }}
      />

      {/* Content */}
      <div className="container-site relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="mb-8 text-4xl font-extrabold text-white tracking-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 shadow-xl backdrop-blur-md">
          {breadcrumb.map((crumb, idx) => {
            const isLast = idx === breadcrumb.length - 1;
            return (
              <div key={crumb.label} className="flex items-center">
                {crumb.to && !isLast ? (
                  <Link to={crumb.to} className="transition-colors hover:text-ksc-gold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-bold text-ksc-gold drop-shadow-sm" : ""}>{crumb.label}</span>
                )}

                {!isLast && <ChevronRight className="mx-2.5 h-4 w-4 text-white/40" />}
              </div>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
