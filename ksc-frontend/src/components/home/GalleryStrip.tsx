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

export function GalleryStrip() {
  const { data: { gallery_images: GALLERY } } = useSiteData();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="gallery-showcase overflow-hidden bg-slate-50 py-12 lg:py-16 border-t border-slate-100 cursor-none">
      <CustomCursor isHovering={isHovering} />
      <div className="container-site">
        <SectionHeading
          kicker="Life at KSC"
          title="Take a look inside"
          subtitle="Real photos from our centre — front office, study materials, counselling and more."
        />
      </div>

      {/* Marquee Container */}
      <div
        className="relative mt-12 flex w-full overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Fade gradients for smooth entry/exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-40" />

        <div className="flex w-max animate-marqueeHorizontal gap-5 px-5 hover:[animation-play-state:paused]">
          {[...GALLERY, ...GALLERY].map((item, index) => (
            <Link key={`${item.caption}-${index}`} to="/gallery" className="group relative block h-[220px] w-[320px] shrink-0 overflow-hidden rounded-[2rem] border-4 border-white bg-slate-200 shadow-md sm:h-[300px] sm:w-[450px] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="absolute inset-0">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-ksc-navy/90 via-ksc-navy/40 to-transparent p-6 pt-20 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="translate-y-4 text-lg font-bold text-white transition-transform duration-500 ease-out group-hover:translate-y-0">{item.caption}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container-site mt-14 text-center">
        <Link to="/gallery" className="btn-outline">
          View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

