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

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
}

export function CustomCursor({ isHovering }: { isHovering: boolean }) {
  const { x, y } = useMousePosition();
  if (typeof window === 'undefined') return null;
  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-ksc-navy font-bold text-xs uppercase tracking-widest shadow-2xl transition-all duration-300 ease-out",
        isHovering ? "opacity-100 h-20 w-20 scale-100" : "opacity-0 h-4 w-4 scale-0"
      )}
      style={{ transform: `translate3d(${x - (isHovering ? 40 : 8)}px, ${y - (isHovering ? 40 : 8)}px, 0)` }}
    >
      <span className={cn("transition-opacity duration-300", isHovering ? "opacity-100" : "opacity-0")}>View</span>
    </div>
  );
}

export function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, transition: position.x === 0 ? "transform 0.5s ease-out" : "transform 0.1s ease-out" }}
    >
      {children}
    </div>
  );
}

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll(".reveal-section").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

