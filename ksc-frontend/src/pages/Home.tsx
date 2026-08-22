import { useState, useEffect, useRef } from "react";
import { useSiteData } from "../services/SiteDataContext";
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
} from "lucide-react";
import {
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
import { SectionHeading } from "../components/common/SectionHeading";
import { StatCounter } from "../components/common/StatCounter";
import { Tabs } from "../components/common/Tabs";
import { Button } from "../components/ui/Button";
import { cn } from "../utils/cn";

/* --------------------------------------------------------------------------- */
/* PREMIUM STUDIO ANIMATIONS / HOOKS                                            */
/* --------------------------------------------------------------------------- */
function useMousePosition() {
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

function CustomCursor({ isHovering }: { isHovering: boolean }) {
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

function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
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

function useScrollReveal() {
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

/* --------------------------------------------------------------------------- */
/* HERO                                                                            */
/* --------------------------------------------------------------------------- */
const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  CalendarRange,
  BookOpen,
  Library,
  Headphones,
  MonitorPlay,
  MapPinned,
  MonitorSmartphone,
  Building2,
};

const HERO_IMAGES = [
  "/assets/user-photos/students.png",
  "/assets/gallery/ksc-10.jpg",
  "/assets/gallery/ksc-09.jpg",
];

function UserUpdatePopup() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: { user_update_modal: modalData, user_update_posters: posters = [] } } = useSiteData();
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  useEffect(() => {
    if (posters.length > 1) {
      const timer = setInterval(() => {
        setCurrentPosterIndex((prev) => (prev + 1) % posters.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [posters.length]);

  useEffect(() => {
    if (!isOpen || !modalData?.enabled) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, modalData?.enabled]);

  if (!isOpen || !modalData?.enabled) return null;

  // Fallback to static modal image if no API posters are present
  const displayImageUrl = posters.length > 0
    ? (posters[currentPosterIndex].image_path.startsWith('http') ? posters[currentPosterIndex].image_path : `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/storage/${posters[currentPosterIndex].image_path}`)
    : modalData.imageUrl;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ksc-navy/75 p-4 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true" aria-labelledby="update-title">
      <div className="animate-fade-in flex w-full max-w-4xl justify-center">
        {displayImageUrl ? (
          <div className="relative inline-block rounded-3xl bg-white/10 p-2 sm:p-3 shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md transition-transform duration-500 hover:scale-[1.02]">
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} aria-label="Close update" autoFocus className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white shadow-2xl backdrop-blur-md transition-all hover:bg-ksc-red hover:scale-110 hover:border-ksc-red">
              <X className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.5]" />
            </button>
            <img src={displayImageUrl} alt="Update" className="w-auto h-auto object-contain max-h-[80vh] max-w-full rounded-2xl shadow-inner" key={displayImageUrl} />
          </div>
        ) : (
          <div className="relative w-full max-w-2xl rounded-2xl bg-white/5 p-8 text-center border border-white/10">
            <button onClick={() => setIsOpen(false)} aria-label="Close update" autoFocus className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <h3 id="update-title" className="mb-2 text-2xl font-bold text-white">{modalData.title}</h3>
            <p className="text-white/80 font-medium">{modalData.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <UserUpdatePopup />
      <section className="relative overflow-hidden bg-white">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-slate-50 via-white to-blue-50 lg:w-[58%]" />
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-ksc-sky/40 blur-[100px]" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-ksc-yellow/5 blur-[120px]" />
        <div className="absolute left-0 top-0 h-1.5 w-40 bg-ksc-red" />
        <div className="container-site relative grid items-center gap-12 py-14 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-ksc-red/20 bg-red-50/50 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ksc-red opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ksc-red"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[.2em] text-ksc-navy">Admissions open · {SITE_CONFIG.admissionYear}</span>
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.14em] text-ksc-royal">Your next chapter starts here</p>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ksc-navy sm:text-5xl lg:text-[4rem]">
              <span className="block overflow-hidden pb-1"><span className="block animate-slideUpWord">Karur Study</span></span>
              <span className="block overflow-hidden pb-2"><span className="block animate-slideUpWord bg-gradient-to-r from-ksc-royal to-blue-500 bg-clip-text text-transparent" style={{ animationDelay: '150ms' }}>Center</span></span>
            </h1>
            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-slate-600 sm:text-lg animate-fade-in-up" style={{ animationDelay: '300ms' }}>Recognised UG, PG and diploma programmes with personal guidance, flexible learning and complete student support—right here in Karur.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <MagneticButton>
                <Link to="/admissions" className="btn-gold gap-2 w-full">Explore admissions <ArrowRight className="h-4 w-4" /></Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/academic" className="btn-outline bg-white/70 w-full">View programmes</Link>
              </MagneticButton>
            </div>
            <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 text-sm font-semibold text-ksc-navy sm:grid-cols-3">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Recognised degrees</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Flexible schedules</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Local support</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl bg-gradient-to-br from-ksc-red to-[#910a11] shadow-2xl" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/80 bg-ksc-navy shadow-[0_20px_50px_-12px_rgba(7,27,74,0.35)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2">
              <img key={currentImage} src={HERO_IMAGES[currentImage]} alt="Students supported by Karur Study Centre" className="hero-media h-80 w-full object-cover object-top animate-fade-in sm:h-[480px]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ksc-navy via-ksc-navy/80 to-transparent px-8 pb-8 pt-24 text-white">
                <p className="text-2xl font-bold text-white drop-shadow-md">Education that fits your life</p>
                <p className="mt-1.5 text-sm font-medium text-white/80">Study. Grow. Move forward.</p>
              </div>
            </div>
            <div className="absolute -left-2 top-8 rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] sm:-left-8 backdrop-blur-md">
              <div className="flex flex-col items-center justify-center rounded-xl bg-ksc-red px-5 py-3 text-white">
                <span className="block text-[10px] font-bold uppercase tracking-[.2em] text-white/90">Now open</span>
                <span className="font-heading text-2xl font-black uppercase tracking-tight">{SITE_CONFIG.admissionYear}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-y border-white/10 bg-ksc-navy text-white">
          <div className="container-site grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {[
              [BookOpen, "UG & PG", "Programmes"],
              [MonitorPlay, "Flexible", "Learning"],
              [Globe, "Learn from", "Anywhere"],
              [Award, "Recognised", "Degrees"],
            ].map(([Icon, top, bottom]) => {
              const FeatureIcon = Icon as LucideIcon;
              return <div key={top as string} className="flex items-center gap-3 px-4 py-5 sm:px-7"><FeatureIcon className="h-7 w-7 shrink-0 text-ksc-yellow" /><p className="text-xs font-extrabold uppercase tracking-wider sm:text-sm">{top as string}<span className="block text-white/55">{bottom as string}</span></p></div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------------------------------------------------------- */
/* AFFILIATIONS STRIP                                                           */
/* --------------------------------------------------------------------------- */
function AffiliationsStrip() {
  return (
    <section className="bg-white py-10 border-b border-slate-100 animate-fade-in-up delay-100">
      <div className="container-site flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-20">
        <div className="flex items-center gap-4 transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center font-bold text-ksc-navy text-sm sm:text-base bg-white">UGC</div>
          <span className="font-semibold text-xs sm:text-sm text-slate-600 leading-tight uppercase tracking-wider">Approved<br />Institute</span>
        </div>
        <div className="flex items-center gap-4 transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center font-bold text-ksc-navy text-[10px] sm:text-xs text-center bg-white leading-tight">ISO<br />9001</div>
          <span className="font-semibold text-xs sm:text-sm text-slate-600 leading-tight uppercase tracking-wider">Certified<br />Center</span>
        </div>
        <div className="flex items-center gap-4 transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center font-bold text-ksc-navy text-sm sm:text-base bg-white">NCTE</div>
          <span className="font-semibold text-xs sm:text-sm text-slate-600 leading-tight uppercase tracking-wider">Recognized<br />Courses</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* ABOUT SNAPSHOT (POSTER THEME)                                               */
/* --------------------------------------------------------------------------- */
function AboutSnapshot() {
  const POSTER_POINTS = [
    "Education brings Knowledge",
    "Education builds Character",
    "Education creates Opportunity",
    "Education reduces Poverty",
    "Education makes you Independent",
    "Education helps to serve the Nation",
    "Education is the key to a Better Tomorrow",
  ];

  return (
    <section className="relative overflow-hidden bg-[#fff8e7] py-16 sm:py-24">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-ksc-yellow/10 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
      <div className="container-site">
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <SectionHeading align="left" kicker="The value of learning" title="Education opens more than doors" subtitle="A recognised qualification can create confidence, independence and opportunity at every stage of life." />
            <div className="grid gap-3 sm:grid-cols-2">
              {POSTER_POINTS.map((para, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-ksc-navy/10 bg-white px-4 py-3 shadow-sm">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ksc-yellow text-xs font-black text-ksc-navy">{i + 1}</span>
                  <span className="text-sm font-bold leading-6 text-ksc-navy">{para}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg reveal-section">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_25px_70px_rgba(7,27,74,.16)]">
              <div className="relative aspect-[4/3] w-full rounded-[1.4rem] overflow-hidden bg-slate-200">
                {/* Cinematic Image Reveal via is-visible class */}
                <div className="absolute inset-0 transition-all duration-1000 [clip-path:inset(15%_15%_15%_15%_round_2rem)] [.is-visible_&]:[clip-path:inset(0%_0%_0%_0%_round_1.4rem)]">
                  <img src="/assets/gallery/ksc-01.jpg" alt="Study materials at Karur Study Centre" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.5s] scale-125 [.is-visible_&]:scale-100" />
                </div>
              </div>
            </div>
            <div className="relative -mt-14 ml-5 max-w-sm rounded-2xl bg-ksc-navy p-6 text-white shadow-xl sm:ml-12 transition-all duration-700 opacity-0 translate-y-12 [.is-visible_&]:opacity-100 [.is-visible_&]:translate-y-0 delay-300">
              <BookOpen className="mb-4 h-8 w-8 text-ksc-yellow" aria-hidden="true" />
              <p className="font-heading text-2xl font-bold leading-tight">Education is the most powerful weapon you can use to change the world.</p>
              <p className="mt-4 text-xs font-black uppercase tracking-[.2em] text-ksc-yellow">— Kamarajar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* WHY DISTANCE EDUCATION                                                       */
/* --------------------------------------------------------------------------- */
function WhyDistance() {
  const { data: { why_distance: WHY_DISTANCE } } = useSiteData();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading
          kicker="Why Distance Education"
          title="Road to a degree, without leaving home"
          subtitle="Affordable, flexible and recognised — distance education fits around your life, not the other way around."
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start mt-12">
          <div className="lg:col-span-5 hidden lg:block sticky top-28">
            <div className="relative overflow-hidden rounded-3xl shadow-xl h-full min-h-[500px]">
              <img src="/assets/user-photos/distance-student.png" alt="Student studying distance education" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ksc-navy to-transparent p-7 pt-24 text-white"><p className="font-heading text-3xl font-black uppercase">Learn on your terms</p></div>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl bg-[#f8fbff] p-3 lg:col-span-7">
            {WHY_DISTANCE.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={item.title} className="border-b border-slate-200 last:border-b-0">
                  <button onClick={() => setActiveIndex(index)} className="group flex w-full items-center justify-between rounded-2xl px-4 py-6 text-left transition-all hover:bg-white hover:shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-lg font-black transition-colors ${isActive ? 'bg-ksc-red text-white' : 'bg-white text-ksc-navy'}`}>{String(index + 1).padStart(2, "0")}</div>
                      <span className={`text-lg font-bold sm:text-xl ${isActive ? 'text-ksc-red' : 'text-ksc-navy'}`}>{item.title}</span>
                    </div>
                    <span className="ml-4 text-2xl font-light text-ksc-red">{isActive ? '−' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden px-4 transition-all duration-500 ${isActive ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}><p className="pl-15 pr-8 text-sm font-medium leading-7 text-slate-600 sm:text-base">{item.description}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* VISION / MISSION / VALUES                                                    */
/* --------------------------------------------------------------------------- */
function VisionMissionValues() {
  const { data: { vision_mission: intro } } = useSiteData();

  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-24 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading kicker="Our Foundation" title="Vision · Mission · Values" />
        <div className="mx-auto max-w-6xl">
          <Tabs
            tabs={[
              { id: "vision", label: "Vision" },
              { id: "mission", label: "Mission" },
              { id: "values", label: "Values" },
            ]}
            defaultActive="vision"
          >
            {(activeId) => {
              if (activeId === "vision") {
                return (
                  <div className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-md border border-slate-100 group animate-fade-in-up max-w-4xl mx-auto">
                    {/* Decorative quote mark */}
                    <div className="absolute -top-4 -right-2 text-[120px] font-black text-ksc-red/5 font-heading leading-none transition-transform duration-700 group-hover:scale-110 group-hover:text-ksc-red/10 select-none pointer-events-none">"</div>
                    {/* Animated bottom border */}
                    <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-ksc-red to-ksc-yellow transition-all duration-700 ease-out group-hover:w-full" />

                    <p className="text-xl sm:text-2xl font-heading font-black leading-relaxed text-ksc-navy relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                      {intro.vision}
                    </p>
                  </div>
                );
              }
              if (activeId === "mission") {
                return (
                  <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up">
                    {intro.mission.map((m) => (
                      <div key={m.slice(0, 20)} className="group relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:border-ksc-red/30 hover:-translate-y-1">
                        {/* Decorative corner shape */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-ksc-sky/30 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 pointer-events-none" />

                        <div className="relative z-10 flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-ksc-red transition-all duration-300 group-hover:bg-ksc-red group-hover:text-white group-hover:shadow-sm group-hover:rotate-6">
                            <CheckCircle2 className="h-5 w-5 stroke-[2]" />
                          </div>
                          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed transition-colors duration-300 group-hover:text-ksc-navy mt-0.5">{m}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 animate-fade-in-up">
                  {intro.values.map((v, i) => (
                    <div key={v.title} className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                      {/* Shadow Number */}
                      <div className="absolute -bottom-2 right-4 text-[100px] font-black text-slate-100/80 transition-colors duration-500 group-hover:text-white/10 pointer-events-none select-none leading-none z-0">
                        {i + 1}
                      </div>

                      {/* Hover background fill */}
                      <div className="absolute inset-0 bg-gradient-to-br from-ksc-navy to-ksc-royal opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0" />

                      <div className="relative z-10">
                        <h4 className="font-black text-xl text-ksc-navy uppercase tracking-wide transition-colors duration-500 group-hover:text-white">{v.title}</h4>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-white/80">{v.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          </Tabs>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* UNIVERSITIES WE SERVE                                                        */
/* --------------------------------------------------------------------------- */
function UniversityStrip() {
  const { data: { universities: UNIVERSITIES } } = useSiteData();
  return (
    <section className="bg-slate-50 py-16 lg:py-24 border-t border-slate-200">
      <div className="container-site">
        <div className="text-center animate-fade-in-up">
          <p className="section-kicker text-ksc-red bg-white inline-block px-3 py-1 rounded-md mb-4 shadow-sm border border-slate-100 uppercase tracking-widest">Authorised Centre</p>
          <h2 className="text-4xl font-heading font-black tracking-tight text-ksc-navy sm:text-5xl lg:text-5xl">Top universities in Tamil Nadu</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg font-medium text-slate-600 leading-relaxed bg-white/50 p-4 rounded-xl border border-white shadow-sm backdrop-blur-sm">We are the official admissions, study and exam centre for highly ranked state universities.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up delay-100">
          {UNIVERSITIES.map((uni) => (
            <Link
              key={uni.id}
              to={`/university/${uni.id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ksc-red/20 hover:shadow-lift"
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
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-ksc-red bg-red-50 px-2 py-1 rounded-md">
                {uni.academicYear} admissions
              </p>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed font-medium">
                {uni.categories.length} programmes across UG, PG, Diploma and Certificate courses.
              </p>
              <span className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-ksc-navy group-hover:text-ksc-red transition-colors">
                View Programmes <ArrowRight className="ml-1.5 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* STATS COUNTERS                                                               */
/* --------------------------------------------------------------------------- */
function Stats() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  return (
    <section className="bg-ksc-navy py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay"></div>
      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5 divide-x-0 md:divide-x-2 divide-white/10">
          {SITE_CONFIG.stats.map((s, index) => (
            <div key={s.label} className="px-4">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} duration={1200 + index * 140} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* UNIVERSITY-WISE COURSE TABS (core section)                                   */
/* --------------------------------------------------------------------------- */
function UniversityCourses() {
  const { data: { universities: UNIVERSITIES } } = useSiteData();
  return (
    <section className="bg-slate-50 py-10 lg:py-20 border-t border-slate-100" id="programmes">
      <div className="container-site">
        <SectionHeading
          kicker="Programmes Offered"
          title="Choose your university, choose your course"
          subtitle="One tab per affiliated university. Browse the programme categories each university offers under distance education."
        />
        <Tabs
          tabs={UNIVERSITIES.map((u) => ({ id: u.id, label: u.shortName }))}
          defaultActive={UNIVERSITIES[0]?.id}
        >
          {(activeId) => {
            const uni = UNIVERSITIES.find((u) => u.id === activeId) ?? UNIVERSITIES[0];
            return (
              <div>
                <div className="mb-6 rounded-none bg-slate-900 p-6 border border-slate-900">
                  <h3 className="text-2xl font-black text-white uppercase">{uni.name}</h3>
                  <p className="mt-1 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {uni.academicYear} · {uni.pattern}
                  </p>
                  {uni.recognition && (
                    <p className="mt-2 inline-block rounded-md bg-red-50 border border-red-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-ksc-red">
                      {uni.recognition}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {uni.categories.map((cat) => (
                    <div key={cat.id} className="card-hover flex flex-col p-6 sm:p-8">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black uppercase text-slate-900">{cat.label}</h4>
                        {cat.count !== undefined && (
                          <span className="rounded-none bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                            {cat.count}
                          </span>
                        )}
                      </div>
                      {cat.note && <p className="mt-2 text-xs font-medium text-slate-500">{cat.note}</p>}
                      <Link
                        to={`/academic#${uni.id}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-black uppercase text-slate-900 hover:text-slate-500 transition-colors"
                      >
                        View All Programmes <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        </Tabs>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* FACILITIES GRID                                                              */
/* --------------------------------------------------------------------------- */
function FacilitiesSpotlight() {
  const { data: { facilities: FACILITIES } } = useSiteData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevIndexRef = useRef(0);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FACILITIES.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [isAutoPlaying, FACILITIES.length]);

  // Handle manual user clicks and resume autoplay later
  const handleUserInteraction = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      // Force an immediate tick so the user sees it resume instantly, 
      // then turn the auto-player back on
      setActiveIndex((prev) => (prev + 1) % FACILITIES.length);
      setIsAutoPlaying(true);
    }, 5000); // Resume autoplay after 5s of inactivity
  };

  // Auto-scroll to keep active item at the top without jumping the main page
  useEffect(() => {
    if (containerRef.current && itemRefs.current[activeIndex]) {
      const container = containerRef.current;

      // Find a fully collapsed item to measure its exact height
      let collapsedItem = itemRefs.current.find((el, i) => i !== activeIndex && i !== prevIndexRef.current && el !== null);
      let collapsedHeight = collapsedItem ? collapsedItem.offsetHeight : (window.innerWidth >= 640 ? 106 : 90);

      const gap = 12; // gap-3 = 12px
      const targetTop = activeIndex * (collapsedHeight + gap);

      container.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  return (
    <section className="facilities-showcase bg-slate-50 py-16 lg:py-24 border-t border-slate-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ksc-navy/5 -skew-x-12 transform origin-top" />
      <div className="container-site relative z-10">
        <SectionHeading
          kicker="Facilities & Services"
          title="Everything you need under one roof"
          subtitle="Admission guidance, study material, exam support — all from your local study centre."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-7xl mx-auto">

          {/* Left Side: Cinematic Sticky Display */}
          <div className="lg:sticky lg:top-24 h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden bg-slate-200 relative isolate">
            {FACILITIES.map((facility, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0 pointer-events-none"
                  )}
                >
                  {/* Fallback pattern if no image */}
                  <div className="absolute inset-0 bg-ksc-navy/5" />
                  {facility.image && (
                    <img src={facility.image} alt={facility.title} loading="lazy" className="h-full w-full object-cover" />
                  )}
                  {/* Bottom Gradient for Text Legibility if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ksc-navy/90 via-ksc-navy/20 to-transparent opacity-80" />
                </div>
              );
            })}

            {/* Floating Glass Badge Overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500">
              {FACILITIES.map((facility, index) => {
                const isActive = index === activeIndex;
                const Icon = typeof facility.icon === "string" ? ICON_MAP[facility.icon] ?? Building2 : facility.icon;
                if (!isActive) return null;
                return (
                  <div key={index} className="flex items-center gap-5 w-full animate-fade-in">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ksc-yellow text-ksc-navy shadow-lg">
                      <Icon className="h-7 w-7 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-tight">{facility.title}</h4>
                      <p className="text-sm font-medium text-white/80 mt-1 uppercase tracking-wider">Highlight Feature</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Expanding Accordion List with Fixed Bottom Button */}
          <div className="flex flex-col h-[400px] sm:h-[500px] lg:h-[600px] w-full">

            {/* Scrollable List */}
            <div
              ref={containerRef}
              className="relative flex flex-col gap-3 py-4 overflow-y-hidden pr-2 lg:pr-4 flex-1 scroll-smooth"
              style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
            >
              {FACILITIES.map((facility, index) => {
                const isActive = index === activeIndex;
                const Icon = typeof facility.icon === "string" ? ICON_MAP[facility.icon] ?? Building2 : facility.icon;

                return (
                  <button
                    key={index}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    onClick={() => {
                      if (isActive) {
                        navigate('/facilities');
                      } else {
                        handleUserInteraction(index);
                      }
                    }}
                    className={cn(
                      "group relative flex w-full flex-col items-start rounded-2xl p-5 sm:p-6 text-left transition-all duration-500 ease-in-out border overflow-hidden shrink-0 scroll-mt-4 lg:scroll-mt-6",
                      isActive
                        ? "bg-white shadow-lift border-ksc-navy/10 ring-1 ring-ksc-navy/5"
                        : "bg-transparent border-transparent hover:bg-white/60"
                    )}
                  >
                    {/* Progress Line */}
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-slate-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1.5 bg-slate-200">
                        <div
                          className="w-full bg-ksc-red origin-top"
                          style={{
                            height: '100%',
                            animation: isAutoPlaying ? 'progress 4s linear forwards' : 'none',
                            transform: !isAutoPlaying ? 'scaleY(1)' : undefined
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-5 w-full relative z-10">
                      <div className={cn(
                        "flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
                        isActive ? "bg-ksc-navy text-white shadow-md rotate-3 scale-110" : "bg-white text-slate-400 border border-slate-100 group-hover:text-ksc-red group-hover:scale-105"
                      )}>
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 stroke-[1.5]" />
                      </div>
                      <h4 className={cn(
                        "text-lg sm:text-xl font-bold transition-colors duration-300 tracking-tight",
                        isActive ? "text-ksc-navy" : "text-slate-500 group-hover:text-slate-700"
                      )}>
                        {facility.title}
                      </h4>
                    </div>

                    {/* Accordion Content */}
                    <div className={cn(
                      "grid transition-all duration-500 ease-in-out w-full",
                      isActive ? "grid-rows-[1fr] opacity-100 mt-4 sm:mt-5" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-600 pl-[4.5rem] pr-2">
                          {facility.description}
                        </p>
                        <div className="pl-[4.5rem] mt-4 pb-2">
                          <Link to="/facilities" className="inline-flex items-center gap-1.5 text-sm font-bold text-ksc-navy hover:text-ksc-red transition-colors group/link">
                            Read full details
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fixed Bottom Button */}
            <div className="mt-4 pt-4 border-t border-slate-200/60 pl-2">
              <Link to="/facilities" className="btn-outline border-slate-300 text-slate-600 hover:border-ksc-navy hover:bg-ksc-navy hover:text-white transition-all text-sm h-10 px-6">
                View all facilities <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* ADMISSION PROCESS STEPS                                                      */
/* --------------------------------------------------------------------------- */
function AdmissionSteps() {
  const { data: { admission_steps: ADMISSION_STEPS } } = useSiteData();
  const STEPS = ADMISSION_STEPS.map((s, i) => ({ ...s, icon: [FileDown, ClipboardList, Wallet, Package][i] }));

  return (
    <section className="bg-slate-50 py-10 lg:py-20 border-t-4 border-ksc-yellow">
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

/* --------------------------------------------------------------------------- */
/* BRANCHES                                                                     */
/* --------------------------------------------------------------------------- */
function Branches() {
  const { data: { branches: BRANCHES } } = useSiteData();
  return (
    <section className="bg-white py-10 lg:py-20 border-t-4 border-ksc-red">
      <div className="container-site">
        <SectionHeading
          kicker="Visit Us"
          title="Our Branchs"
          subtitle="Visit our centres — our counsellors will help you at every step."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {BRANCHES.map((branch) => (
            <div key={branch.name} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border border-slate-100">
              <div className="flex items-start justify-between">
                <div>
                  <span className={cn(
                    "inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                    branch.isHead ? "bg-red-50 text-ksc-red" : "bg-blue-50 text-ksc-navy"
                  )}>
                    {branch.isHead ? "Head Office" : "Branch"}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-800">{branch.name}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-ksc-navy transition-colors duration-300 group-hover:bg-ksc-navy group-hover:text-white">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 space-y-4 text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ksc-navy" />
                  <p className="text-sm leading-relaxed">{branch.address}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <Phone className="h-4 w-4 shrink-0 text-ksc-navy" />
                  <a href={`tel:${branch.phone}`} className="text-sm font-semibold hover:text-ksc-red transition-colors w-fit">
                    {branch.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* PHOTO GALLERY STRIP                                                          */
/* --------------------------------------------------------------------------- */
function GalleryStrip() {
  const { data: { gallery_images: GALLERY } } = useSiteData();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="gallery-showcase overflow-hidden bg-slate-50 py-12 lg:py-24 border-t border-slate-100 cursor-none">
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

/* --------------------------------------------------------------------------- */
/* CTA BAND                                                                     */
/* --------------------------------------------------------------------------- */
function CtaBand() {
  const { data: { settings: SITE_CONFIG } } = useSiteData();
  return (
    <section className="compact-section relative overflow-hidden border-t border-slate-200 bg-ksc-sky/10 py-6 text-ksc-navy sm:py-7">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
      <div className="container-site relative flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="mb-2 inline-block rounded-md bg-ksc-navy px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Ready to begin?</p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{SITE_CONFIG.admissionOpen}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">{SITE_CONFIG.lastDate}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <MagneticButton>
            <Button size="default" className="btn-gold" asChild>
              <Link to="/admissions">Apply Now</Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button size="default" className="btn-outline" asChild>
              <Link to="/contact">Talk to a Counsellor</Link>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function UpdatesBar() {
  const { data: { news_events: news } } = useSiteData();
  const latest = news.slice(0, 2);
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-site flex flex-col gap-4 py-5 lg:flex-row lg:items-center">
        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-full bg-ksc-red px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-white">Latest updates</span>
          <span className="hidden h-7 w-px bg-slate-200 lg:block" />
        </div>
        <div className="grid flex-1 gap-2 md:grid-cols-2">
          {latest.map((item, index) => (
            <p key={index} className="flex items-start gap-2 text-sm font-semibold text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ksc-yellow" />{item.text}</p>
          ))}
        </div>
        <Link to="/exam-update" className="inline-flex shrink-0 items-center gap-2 text-xs font-black uppercase tracking-wider text-ksc-navy hover:text-ksc-red">View all <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

function NewsAndEventsBanner() {
  const { data: { news_events: newsEvents } } = useSiteData();

  return (
    <section className="compact-section relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-ksc-navy via-ksc-royal to-ksc-navy py-7 text-white sm:py-8">
      <div className="pointer-events-none absolute -left-12 -top-16 h-40 w-40 animate-float rounded-full bg-ksc-sky/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 right-8 h-44 w-44 animate-float rounded-full bg-ksc-yellow/15 blur-2xl [animation-delay:1.2s]" />
      <div className="container-site relative grid items-center gap-6 md:grid-cols-[240px_1fr_auto]">
        <div>
          <span className="inline-flex items-center rounded-full bg-ksc-red px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-white">Latest updates</span>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">News &amp; Events</h2>
          <p className="mt-2 text-sm text-white/65">Important admissions and examination notices.</p>
        </div>

        <div className="group relative h-28 overflow-hidden rounded-2xl border border-white/10 bg-white/[.07] px-5 backdrop-blur-sm sm:h-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-ksc-royal/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-ksc-royal/90 to-transparent" />
          <div className="flex w-full animate-marqueeVertical flex-col items-start gap-7 py-9 hover:[animation-play-state:paused]">
            {[...newsEvents, ...newsEvents].map((news, index) => (
              <p key={`${news.text}-${index}`} className="flex min-h-7 w-full items-start gap-3 text-sm font-medium leading-6 text-white/90 sm:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ksc-yellow shadow-[0_0_0_4px_rgba(255,210,26,.12)]" />
                {news.text}
              </p>
            ))}
          </div>
        </div>

        <Link to="/exam-update" className="btn-outline border-white/40 bg-white/10 text-white hover:bg-white hover:text-ksc-navy">View all updates <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </div>
    </section>
  );
}

function LegacyNewsAndEventsBanner() {
  const { data: { news_events: NEWS_EVENTS } } = useSiteData();

  return (
    <section className="bg-ksc-navy py-8 sm:py-12 border-y border-white/10 shadow-inner relative z-20">
      <div className="w-full max-w-[96%] 2xl:max-w-[1400px] mx-auto px-2 sm:px-4 grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-12 md:items-center">

        {/* Left: Poster */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start pl-0 xl:pl-8">
          <div className="relative overflow-hidden rounded-md shadow-xl bg-[#0070bc] text-white w-full max-w-[280px] p-4 text-center transform transition-transform hover:scale-105 border-4 border-white cursor-pointer">
            <h4 className="text-yellow-400 font-black text-2xl leading-tight mb-2 uppercase drop-shadow-md tracking-tighter">
              ADMISSION<br />OPEN <span className="text-3xl">2025-26</span>
            </h4>
            <div className="text-[10px] text-white/90 mb-3 tracking-widest uppercase font-semibold">Explore Top UG & PG Courses</div>
            <div className="space-y-1 mt-2">
              <div className="bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-sm inline-block shadow mb-1">
                UG Courses
              </div>
              <p className="text-[11px] font-bold tracking-widest border-b border-white/20 pb-2 mb-2">BA • B.Com • B.Sc • BBA</p>

              <div className="bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-sm inline-block shadow mb-1 mt-1">
                PG Courses
              </div>
              <p className="text-[11px] font-bold tracking-widest pb-3">MBA • MA • M.Com • M.Sc</p>
            </div>
            <div className="mt-2 pb-2">
              <span className="bg-yellow-400 text-blue-900 text-xs font-black px-6 py-1.5 rounded-full uppercase shadow-lg shadow-black/20 hover:bg-white/5 transition-colors">
                Apply Now
              </span>
            </div>
          </div>
        </div>

        {/* Center: News List */}
        <div className="md:col-span-4 lg:col-span-6 flex flex-col items-center text-center space-y-4 px-2 xl:px-8">
          <h2 className="text-2xl sm:text-[32px] font-extrabold text-white tracking-tight drop-shadow-sm pb-3 border-b-2 border-white/10 w-full sm:w-4/5">
            News & Events
          </h2>
          <div className="relative w-full h-[140px] overflow-hidden group">
            {/* Gradient masks for smooth fading at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-ksc-navy to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-ksc-navy to-transparent z-10 pointer-events-none"></div>

            <div className="space-y-6 w-full flex flex-col items-center animate-marqueeVertical hover:[animation-play-state:paused] pt-8 pb-8">
              {[...NEWS_EVENTS, ...NEWS_EVENTS].map((news, i) => (
                <p key={i} className={`text-base sm:text-[18px] lg:text-[19px] leading-relaxed cursor-pointer hover:underline underline-offset-4 px-4 sm:px-8 max-w-2xl ${i % NEWS_EVENTS.length === 0 ? "text-white font-bold" : "text-white/80 font-semibold"}`}>
                  {news.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Notice Board */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-end pr-0 xl:pr-8">
          <div className="relative flex flex-col items-center transform transition-transform hover:rotate-2 hover:scale-105 cursor-pointer mt-4 md:mt-0">
            {/* Pin */}
            <div className="absolute -top-1.5 z-20 w-3.5 h-3.5 rounded-full bg-red-600 shadow-[2px_3px_5px_rgba(0,0,0,0.4)] border border-red-800">
              <div className="absolute top-[2px] left-[2px] w-1 h-1 bg-white/5/60 rounded-full"></div>
            </div>
            {/* Strings */}
            <svg className="absolute top-0 z-10 w-[120px] h-[45px]" viewBox="0 0 100 50">
              <path d="M50 0 L15 45" stroke="#737373" strokeWidth="2" fill="none" />
              <path d="M50 0 L85 45" stroke="#737373" strokeWidth="2" fill="none" />
            </svg>
            {/* Board */}
            <div className="mt-[36px] bg-gradient-to-br from-[#2E4A22] to-[#1E3016] border-[8px] border-[#a3a3a3] rounded-lg p-5 shadow-2xl relative z-10 min-w-[160px] shadow-black/30">
              <h3 className="text-[#f1f5f9] font-serif font-bold text-center leading-snug drop-shadow-md text-[18px] tracking-wide">
                NEWS<br />&amp; EVENTS
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* PAGE                                                                         */
/* --------------------------------------------------------------------------- */
export function Home() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <NewsAndEventsBanner />
      <AboutSnapshot />
      <WhyDistance />
      <VisionMissionValues />
      <Stats />
      <UniversityStrip />
      <UniversityCourses />
      <FacilitiesSpotlight />
      <AdmissionSteps />
      <GalleryStrip />
      <CtaBand />
    </>
  );
}
