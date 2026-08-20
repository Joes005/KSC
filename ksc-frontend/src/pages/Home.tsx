import { useState, useEffect } from "react";
import { useSiteData } from "../services/SiteDataContext";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  ClipboardList,
  Wallet,
  Package,
  CalendarDays,
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
  Star,
  Award,
  Globe
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SITE_CONFIG,
  HERO,
  WHY_DISTANCE,
  ABOUT_SNAPSHOT,
  VISION_MISSION_VALUES,
  NEWS_EVENTS,
  ADMISSION_STEPS,
  BRANCHES,
} from "../data/site-content";
import { UNIVERSITIES } from "../data/universities";
import { GALLERY } from "../data/gallery";
import { FACILITIES } from "../data/facilities";
import { SectionHeading } from "../components/common/SectionHeading";
import { Tabs } from "../components/common/Tabs";
import { StatCounter } from "../components/common/StatCounter";
import { NewsTicker } from "../components/common/NewsTicker";
import { Button } from "../components/ui/Button";
import { cn } from "../utils/cn";

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
  
  if (!isOpen || !modalData?.enabled) return null;

  // Fallback to static modal image if no API posters are present
  const displayImageUrl = posters.length > 0 
    ? (posters[currentPosterIndex].image_path.startsWith('http') ? posters[currentPosterIndex].image_path : `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/storage/${posters[currentPosterIndex].image_path}`)
    : modalData.imageUrl;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      <div className="animate-fade-in flex justify-center w-full max-w-4xl">
        {displayImageUrl ? (
          <div className="relative inline-block">
            {/* Close Button on Top Right of Image */}
            <button onClick={() => setIsOpen(false)} className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 z-10 text-white hover:text-ksc-gold bg-black rounded-full p-1.5 sm:p-2 border-2 border-white/20 shadow-xl transition-all hover:scale-110">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <img src={displayImageUrl} alt="Update" className="w-auto h-auto object-contain max-h-[85vh] max-w-full rounded-xl shadow-2xl" key={displayImageUrl} />
          </div>
        ) : (
          <div className="relative w-full max-w-2xl rounded-2xl bg-white/5 p-8 text-center border border-white/10">
            <button onClick={() => setIsOpen(false)} className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white/60 bg-black/50 rounded-full p-1 transition-all hover:scale-110">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-black text-white mb-2 uppercase drop-shadow-md">{modalData.title}</h3>
            <p className="text-white/80 font-medium">{modalData.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  const { data: { hero: HERO, settings: SITE_CONFIG } } = useSiteData();
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
      {/* Hero Section (Poster Style) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ksc-navy via-[#0d276b] to-[#87bdf5] min-h-[600px] flex items-center pt-8 pb-16 border-b-8 border-ksc-red">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat opacity-10 mix-blend-overlay" />
        
        {/* Animated Background Image Fade */}
        <div className="absolute inset-0 z-0 opacity-20">
            <img
              key={currentImage}
              src={HERO_IMAGES[currentImage]}
              alt="Campus Background"
              className="h-full w-full object-cover object-top animate-fade-in mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-ksc-navy/40" />
        </div>

        <div className="container-site relative z-10 flex flex-col items-center text-center w-full">
          
          <h2 className="text-sm sm:text-xl md:text-2xl font-black text-white tracking-widest drop-shadow-md mb-2 uppercase bg-ksc-navy px-6 py-1.5 rounded-full border border-white/20">
            Distance Education Learning Centre
          </h2>
          
          <h1 className="text-6xl sm:text-8xl lg:text-[100px] font-black text-white text-shadow-heavy uppercase tracking-tighter leading-none mb-8 mt-4">
            <span className="text-white drop-shadow-xl">Karur</span><br />
            <span className="text-ksc-red text-glow">Study Centre</span>
          </h1>

          <div className="poster-ribbon mb-4">
            <span className="poster-ribbon-text text-4xl sm:text-6xl">
              Admission Open
            </span>
          </div>
          
          <div className="bg-ksc-yellow px-10 py-2 shadow-xl mb-12 border-b-4 border-yellow-600 rounded-sm transform rotate-1">
            <span className="text-2xl sm:text-4xl font-black text-ksc-navy uppercase tracking-widest">
              FOR {SITE_CONFIG.admissionYear}
            </span>
          </div>

          {/* Icon Features Bar */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 w-full max-w-5xl bg-ksc-navy/90 backdrop-blur-md border-y-4 border-ksc-yellow py-6 px-4 shadow-2xl">
             <div className="flex items-center gap-3 text-white">
                <BookOpen className="w-8 h-8 text-white opacity-80" />
                <span className="font-bold text-sm sm:text-base leading-tight text-left uppercase">UG & PG<br/>Programs</span>
             </div>
             <div className="flex items-center gap-3 text-white">
                <MonitorPlay className="w-8 h-8 text-white opacity-80" />
                <span className="font-bold text-sm sm:text-base leading-tight text-left uppercase">Flexible<br/>Learning</span>
             </div>
             <div className="flex items-center gap-3 text-white">
                <Globe className="w-8 h-8 text-white opacity-80" />
                <span className="font-bold text-sm sm:text-base leading-tight text-left uppercase">Study from<br/>Anywhere</span>
             </div>
             <div className="flex items-center gap-3 text-white">
                <Award className="w-8 h-8 text-ksc-yellow" />
                <span className="font-bold text-sm sm:text-base leading-tight text-left uppercase text-ksc-yellow">Recognized<br/>Degrees</span>
             </div>
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
  const { data: { about_snapshot: ABOUT_SNAPSHOT } } = useSiteData();
  return (
    <section className="bg-ksc-cream py-16 sm:py-24 overflow-hidden relative border-b-8 border-ksc-navy">
      <div className="container-site">
        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-4xl font-black text-ksc-navy uppercase tracking-widest mb-2 drop-shadow-md">Want to continue</h3>
          <h2 className="text-5xl sm:text-7xl font-black text-ksc-red text-shadow-heavy uppercase tracking-tighter">Your Education?</h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 animate-fade-in-up delay-200">
          
          {/* Text/Content Column */}
          <div className="order-2 lg:order-1 flex flex-col items-start text-left">
            <div className="bg-ksc-chalk border-[12px] border-[#8b5a2b] p-6 sm:p-10 rounded-sm shadow-2xl relative w-full">
               <h4 className="text-ksc-yellow text-2xl font-black uppercase tracking-wider mb-6 pb-4 border-b border-white/20">Why Choose Us?</h4>
               <ul className="space-y-4 text-white text-lg sm:text-xl font-medium tracking-wide">
                 {ABOUT_SNAPSHOT.text.slice(0, 3).map((para, i) => (
                   <li key={i} className="flex gap-4 items-start">
                     <span className="text-ksc-yellow text-2xl leading-none mt-1">✿</span> 
                     <span className="leading-snug">{para.length > 80 ? para.substring(0, 80) + '...' : para}</span>
                   </li>
                 ))}
                 <li className="flex gap-4 items-start">
                    <span className="text-ksc-yellow text-2xl leading-none mt-1">✿</span> 
                    <span className="leading-snug text-ksc-yellow font-bold">Trusted by 50,000+ Students</span>
                 </li>
               </ul>
            </div>
            <Link to={ABOUT_SNAPSHOT.readMoreLink} className="btn-gold mt-10">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Image Column */}
          <div className="relative order-1 lg:order-2 px-4 lg:px-0 mx-auto w-full max-w-lg lg:max-w-none group">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white p-3 border-4 border-slate-100 transform rotate-2">
              <img src="/assets/gallery/ksc-01.jpg" alt="Study materials" className="w-full h-auto rounded-2xl object-cover aspect-[4/3] transition-transform duration-[10000ms] group-hover:scale-105" />
            </div>
            
            <div className="absolute -bottom-10 -left-6 z-10 hidden sm:block">
               <div className="bg-white p-6 rounded-xl shadow-2xl border-4 border-ksc-yellow max-w-[280px] transform -rotate-3">
                  <p className="text-lg font-bold text-ksc-navy italic leading-snug">"Education is the most powerful weapon which you can use to change the world."</p>
                  <p className="text-base font-black text-ksc-red mt-3 text-right">— KAMARAJAR</p>
               </div>
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
    <section className="bg-white py-12 sm:py-16 lg:py-12 lg:py-24 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading
          kicker="Why Distance Education"
          title="Road to a degree, without leaving home"
          subtitle="Affordable, flexible and recognised — distance education fits around your life, not the other way around."
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start mt-12">
          {/* Left: Sticky Image */}
          <div className="lg:col-span-5 hidden lg:block sticky top-28">
            <div className="relative overflow-hidden rounded-3xl shadow-xl border-[6px] border-white h-full min-h-[500px]">
              <div className="absolute inset-0 bg-ksc-sky/20 mix-blend-multiply rounded-3xl z-10" />
              <img src="/assets/user-photos/distance-student.png" alt="Student studying distance education" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col bg-white rounded-3xl lg:col-span-7">
            {WHY_DISTANCE.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={item.title} className="border-b border-slate-100 last:border-b-0">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="group flex w-full items-center justify-between py-6 px-4 text-left transition-all hover:bg-slate-100 focus:outline-none rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm transition-colors duration-300 ${isActive ? 'bg-ksc-red text-white' : 'bg-white border-2 border-slate-200 text-ksc-navy'}`}>
                        <span className="font-black text-lg">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <span className={`text-lg font-bold sm:text-xl transition-colors duration-300 uppercase ${isActive ? 'text-ksc-red' : 'text-ksc-navy group-hover:text-ksc-red'}`}>
                        {item.title}
                      </span>
                    </div>
                    <span className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isActive ? 'bg-ksc-red text-white' : 'bg-slate-200 text-slate-500'}`}>
                      <span className="text-2xl font-light leading-none">{isActive ? '−' : '+'}</span>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out px-4 ${isActive ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base pl-16 pr-8 font-medium">
                      {item.description}
                    </p>
                  </div>
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
  const { data: { vision_mission: VISION_MISSION_VALUES } } = useSiteData();
  const { vision, mission, values } = VISION_MISSION_VALUES;
  const [tab, setTab] = useState<"vision" | "mission" | "values">("vision");

  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-12 lg:py-24 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading kicker="Our Foundation" title="Vision · Mission · Values" align="center" />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {(
              [
                { id: "vision", label: "Vision" },
                { id: "mission", label: "Mission" },
                { id: "values", label: "Values" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-md px-8 py-3 text-sm sm:text-base font-bold transition-all duration-300 uppercase tracking-widest ${tab === t.id
                  ? "bg-white text-ksc-navy shadow-soft border border-slate-200"
                  : "bg-transparent text-slate-500 hover:text-ksc-navy"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-soft mt-8 p-6 sm:p-10 border border-slate-100 min-h-[250px] flex flex-col justify-center relative">
            {tab === "vision" && (
              <div className="animate-fade-in text-center">
                <p className="text-xl sm:text-2xl font-bold leading-relaxed text-ksc-navy max-w-2xl mx-auto">
                  "{vision}"
                </p>
              </div>
            )}
            {tab === "mission" && (
              <ul className="animate-fade-in grid sm:grid-cols-2 gap-6">
                {mission.map((m) => (
                  <li key={m.slice(0, 24)} className="flex items-start gap-4 text-slate-700 bg-slate-50 p-4 rounded-xl border-2 border-slate-100">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-ksc-red" />
                    <span className="text-sm sm:text-base leading-relaxed font-bold">{m}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "values" && (
              <div className="animate-fade-in grid gap-4 sm:gap-6 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="rounded-xl bg-slate-50 p-5 sm:p-6 border-2 border-slate-100 transition-colors hover:border-ksc-yellow hover:bg-white">
                    <p className="font-bold text-ksc-navy text-base sm:text-lg uppercase tracking-wide">{v.title}</p>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">{v.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
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
          {SITE_CONFIG.stats.map((s) => (
            <div key={s.label} className="text-center px-4 animate-fade-in-up">
              <div className="flex items-center justify-center mb-2">
                <span className="text-5xl font-black text-white drop-shadow-sm">{s.value}</span>
                <span className="text-3xl font-black text-ksc-yellow ml-1">{s.suffix}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">{s.label}</p>
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
                    <div key={cat.id} className="card-hover flex flex-col p-6 sm:p-8 bg-white">
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
function FacilitiesGrid() {
  const { data: { facilities: FACILITIES } } = useSiteData();
  return (
    <section className="bg-white py-10 lg:py-20 border-t-4 border-ksc-red">
      <div className="container-site">
        <SectionHeading
          kicker="Facilities & Services"
          title="Everything you need under one roof"
          subtitle="Admission guidance, study material, exam support — all from your local study centre."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {FACILITIES.map(({ icon, image, title, description }) => {
            const Icon = typeof icon === "string" ? ICON_MAP[icon] ?? Building2 : icon;
            return (
              <div key={title} className="card-hover p-6 sm:p-8 bg-white text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-white text-slate-900 border-2 border-slate-900 transition-transform duration-300 hover:scale-110">
                  {image ? (
                    <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover grayscale" />
                  ) : (
                    <Icon className="h-8 w-8 stroke-[1.5]" />
                  )}
                </div>
                <h4 className="mt-6 font-black uppercase text-slate-900">{title}</h4>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">{description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link to="/facilities" className="btn-outline">
            Explore our Facilities <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
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
          
          {STEPS.map((step, index) => {
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
  const previews = GALLERY.slice(0, 6);
  return (
    <section className="bg-slate-50 py-10 lg:py-20 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading
          kicker="Life at KSC"
          title="Take a look inside"
          subtitle="Real photos from our centre — front office, study materials, counselling and more."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-10">
          {previews.map((item, index) => (
            <Link key={index} to="/gallery" className="group relative overflow-hidden rounded-xl shadow-sm block aspect-[4/3]">
              <div className="absolute inset-0 bg-slate-200">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ksc-navy/80 via-ksc-navy/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-bold text-white tracking-wider">{item.caption}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/gallery" className="btn-outline">
            View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
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
    <section className="bg-ksc-sky/10 relative overflow-hidden py-10 lg:py-16 text-ksc-navy border-t border-slate-200">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
      <div className="container-site relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white bg-slate-900 inline-block px-4 py-1.5 mb-3">Ready to begin?</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">{SITE_CONFIG.admissionOpen}</h2>
          <p className="mt-2 text-slate-700 font-bold tracking-wide">{SITE_CONFIG.lastDate}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" className="btn-gold" asChild>
            <Link to="/admissions">Apply Now</Link>
          </Button>
          <Button
            size="lg"
            className="btn-outline"
            asChild
          >
            <Link to="/contact">Talk to a Counsellor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function NewsAndEventsBanner() {
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
  const { data: { news_events: NEWS_EVENTS } } = useSiteData();
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
      <FacilitiesGrid />
      <AdmissionSteps />
      <GalleryStrip />
      <Branches />
      <CtaBand />
    </>
  );
}
