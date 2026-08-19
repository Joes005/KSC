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
      <section className="relative w-full bg-ksc-navy-dark overflow-hidden">
        {/* Dynamic Animated Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary/10 blur-[100px] animate-pulse delay-300"></div>
        </div>

        <div className="container-site relative z-10 grid min-h-[500px] grid-cols-1 items-center gap-8 lg:gap-12 py-10 lg:py-16 sm:min-h-[600px] lg:grid-cols-2 lg:py-12 lg:py-24">

          {/* Left Column: Details */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-secondary border border-secondary/30 shadow-sm backdrop-blur-md">
              <CalendarDays className="h-4 w-4 animate-bounce" />
              {SITE_CONFIG.admissionOpen}
            </span>

            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
              {HERO.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg font-medium drop-shadow-sm">
              {HERO.description.split(/(Alagappa University|Bharathiar University|Manonmaniam Sundaranar University|Tamilnadu Open University)/g).map((part, i) =>
                part.includes("University") ? (
                  <strong key={i} className="font-extrabold text-white drop-shadow-md">
                    {part}
                  </strong>
                ) : (
                  part
                )
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up delay-100">
              {HERO.ctas.map((cta) =>
                cta.primary ? (
                  <Button key={cta.to} size="lg" variant="gold" asChild className="rounded-full px-8 shadow-xl shadow-secondary/20 font-bold transition-all duration-300 hover:shadow-secondary/40 hover:-translate-y-1">
                    <Link to={cta.to}>
                      {cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button key={cta.to} size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/5 hover:text-secondary px-8 shadow-xl backdrop-blur-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:border-white" asChild>
                    <Link to={cta.to}>{cta.label}</Link>
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Right Column: Image/Carousel */}
          <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px] order-1 lg:order-2 animate-fade-in-up delay-200">
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-primary/50 border border-white/10 group">
              {HERO_IMAGES.map((img, idx) => (
                <div
                  key={img}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000",
                    idx === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  )}
                >
                  <img src={img} alt="Karur Study Center" className="h-full w-full object-cover transition-transform duration-[10000ms] group-hover:scale-110" />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ksc-navy-dark/80 via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Admissions Sticker */}
            <div className="absolute -bottom-6 -left-6 z-20 md:-bottom-8 md:-left-8">
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-ksc-gold border-[4px] border-white shadow-2xl rotate-12 transition-transform hover:scale-110 md:h-36 md:w-36 md:border-[5px]">
                <span className="text-[9px] font-bold uppercase text-ksc-navy tracking-widest drop-shadow-md md:text-[11px]">Admissions</span>
                <span className="text-2xl font-black text-ksc-navy drop-shadow-md md:text-4xl leading-none">OPEN</span>
                <span className="text-[8px] font-bold text-ksc-navy/90 drop-shadow-md md:text-[10px] px-2 text-center leading-tight mt-0.5">{SITE_CONFIG.admissionYear}</span>
              </div>
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
    <section className="bg-ksc-navy py-8 border-b border-white/10 animate-fade-in-up delay-100">
      <div className="container-site flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-20">
        <div className="flex items-center gap-3 sm:gap-4 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100 hover:scale-105 duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] border-[#166534] flex items-center justify-center font-bold text-[#166534] text-sm sm:text-base shadow-sm bg-white/5">UGC</div>
          <span className="font-bold text-xs sm:text-sm text-white leading-tight">Approved<br />Institute</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100 hover:scale-105 duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] border-secondary flex items-center justify-center font-bold text-secondary text-[10px] sm:text-[11px] text-center shadow-sm bg-white/5 leading-tight">ISO<br />9001</div>
          <span className="font-bold text-xs sm:text-sm text-white leading-tight">Certified<br />Center</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100 hover:scale-105 duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] border-[#1e40af] flex items-center justify-center font-bold text-[#1e40af] text-sm sm:text-base shadow-sm bg-white/5">NCTE</div>
          <span className="font-bold text-xs sm:text-sm text-white leading-tight">Recognized<br />Courses</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* ABOUT SNAPSHOT                                                               */
/* --------------------------------------------------------------------------- */
function AboutSnapshot() {
  const { data: { about_snapshot: ABOUT_SNAPSHOT } } = useSiteData();
  return (
    <section className="bg-ksc-navy-dark py-12 sm:py-16 lg:py-12 lg:py-24 overflow-hidden">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20 animate-fade-in-up delay-200">
        {/* Image Column */}
        <div className="relative order-2 lg:order-1 px-4 lg:px-0 mx-auto w-full max-w-lg lg:max-w-none group">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img src="/assets/gallery/ksc-01.jpg" alt="Study materials and support at Karur Study Center" className="w-full h-auto object-cover aspect-[4/3] transform group-hover:scale-110 transition-transform duration-[10000ms]" />
          </div>
          <div className="absolute -bottom-6 -right-2 md:-right-8 flex h-32 w-32 md:h-40 md:w-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-ksc-navy-dark to-secondary border-8 border-white shadow-xl rotate-[-10deg] transition-transform hover:rotate-0 hover:scale-110 duration-300">
            <span className="text-3xl md:text-5xl font-black text-white">26+</span>
            <span className="text-[10px] md:text-xs font-bold uppercase text-white text-center leading-tight mt-1">Years of<br />Experience</span>
          </div>
        </div>

        {/* Content Column */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            kicker="About KSC"
            title="A trusted study centre in the heart of Karur"
            subtitle="We make distance education simple, supported and stress-free."
          />
          <div className="space-y-4">
            {ABOUT_SNAPSHOT.text.map((para) => (
              <p key={para.slice(0, 24)} className="leading-relaxed text-white/80 text-sm sm:text-base">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 transition-colors hover:border-secondary/30">
              <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
              <span className="text-sm font-bold text-white">UG / PG / Diploma</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 transition-colors hover:border-secondary/30">
              <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
              <span className="text-sm font-bold text-white">5000+ Students</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 transition-colors hover:border-secondary/30">
              <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
              <span className="text-sm font-bold text-white">Full Exam Support</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 transition-colors hover:border-secondary/30">
              <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
              <span className="text-sm font-bold text-white">Affordable Fees</span>
            </div>
          </div>
          <Link to={ABOUT_SNAPSHOT.readMoreLink} className="btn-outline mt-10">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
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
    <section className="bg-ksc-navy py-12 sm:py-16 lg:py-12 lg:py-24 border-t border-white/5">
      <div className="container-site">
        <SectionHeading
          kicker="Why Distance Education"
          title="Road to a degree, without leaving home"
          subtitle="Affordable, flexible and recognised — distance education fits around your life, not the other way around."
        />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start mt-12">
          {/* Left: Sticky Image */}
          <div className="lg:col-span-5 hidden lg:block sticky top-28">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-ksc-navy-dark/80 to-transparent mix-blend-multiply rounded-3xl z-10" />
              <img src="/assets/user-photos/distance-student.png" alt="Student studying distance education" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col border-t border-white/60 bg-white/5/40 rounded-3xl p-2 lg:p-6 lg:col-span-7 shadow-sm">
            {WHY_DISTANCE.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={item.title} className="border-b border-white/60 last:border-b-0">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="group flex w-full items-center justify-between py-6 px-4 text-left transition-all hover:bg-white/5/50 focus:outline-none rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm transition-colors duration-300 ${isActive ? 'bg-secondary text-ksc-navy-dark' : 'bg-white/5 text-secondary'}`}>
                        <span className="font-black text-lg">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <span className={`text-lg font-bold sm:text-xl transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-white group-hover:text-secondary'}`}>
                        {item.title}
                      </span>
                    </div>
                    <span className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isActive ? 'bg-ksc-navy-dark text-white' : 'bg-ksc-navy-dark/10 text-secondary'}`}>
                      <span className="text-2xl font-light leading-none">{isActive ? '−' : '+'}</span>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out px-4 ${isActive ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="text-sm leading-relaxed text-white/70 sm:text-base pl-16 pr-8">
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
    <section className="bg-white/5 py-12 sm:py-16 lg:py-12 lg:py-24">
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
                className={`rounded-full px-6 py-2.5 text-sm sm:text-base font-bold border-2 transition-all duration-300 ${tab === t.id
                  ? "bg-ksc-navy-dark border-primary text-white shadow-md transform scale-105"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/5 hover:border-white/20"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="card-hover mt-8 p-6 sm:p-10 border border-white/10 min-h-[250px] flex flex-col justify-center">
            {tab === "vision" && (
              <div className="animate-fade-in text-center">
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-white max-w-2xl mx-auto">
                  "{vision}"
                </p>
              </div>
            )}
            {tab === "mission" && (
              <ul className="animate-fade-in grid sm:grid-cols-2 gap-6">
                {mission.map((m) => (
                  <li key={m.slice(0, 24)} className="flex items-start gap-4 text-white/80 bg-white/10/30 p-4 rounded-xl">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-secondary" />
                    <span className="text-sm sm:text-base leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "values" && (
              <div className="animate-fade-in grid gap-4 sm:gap-6 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="rounded-xl bg-white/5 p-5 sm:p-6 border border-white/10 transition-colors hover:border-secondary/20 hover:bg-white/10">
                    <p className="font-bold text-secondary text-base sm:text-lg">{v.title}</p>
                    <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed">{v.description}</p>
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
    <section className="bg-ksc-navy py-12 sm:py-16 lg:py-12 lg:py-24 border-t border-white/5">
      <div className="container-site">
        <SectionHeading
          align="center"
          kicker="Authorised Centre"
          title="Top universities in Tamil Nadu"
          subtitle="We are the official admissions, study and exam centre for highly ranked state universities."
        />
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {UNIVERSITIES.map((uni) => (
            <Link
              key={uni.id}
              to={`/university/${uni.id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white bg-white/5/80 p-8 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ksc-navy-dark to-ksc-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/10 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:border-primary/10"
                style={{ backgroundColor: '#ffffff' }}
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  loading="lazy"
                  className="h-full w-full object-contain p-2 sm:p-3"
                />
              </div>
              <h3 className="mt-6 text-lg sm:text-xl font-bold leading-tight text-white transition-colors group-hover:text-secondary">
                {uni.name}
              </h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-ksc-gold">
                {uni.academicYear} admissions
              </p>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                {uni.categories.length} programmes across UG, PG, Diploma and Certificate courses.
              </p>
              <span className="mt-6 flex items-center text-xs font-bold text-secondary group-hover:underline">
                View Programmes <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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
    <section className="bg-ksc-navy-dark py-14">
      <div className="container-site">
        {/* TODO: numbers in SITE_CONFIG.stats are placeholders */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {SITE_CONFIG.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
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
    <section className="bg-ksc-navy py-10 lg:py-20" id="programmes">
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
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-bold text-secondary">{uni.name}</h3>
                  <p className="mt-1 text-sm text-white/70">
                    {uni.academicYear} · {uni.pattern}
                  </p>
                  {uni.recognition && (
                    <p className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-secondary">
                      {uni.recognition}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {uni.categories.map((cat) => (
                    <div key={cat.id} className="card-hover flex flex-col p-5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">{cat.label}</h4>
                        {cat.count !== undefined && (
                          <span className="rounded bg-ksc-gold/15 px-2.5 py-0.5 text-xs font-bold text-ksc-gold">
                            {cat.count}
                          </span>
                        )}
                      </div>
                      {cat.note && <p className="mt-1 text-xs text-white/60">{cat.note}</p>}
                      <Link
                        to={`/academic#${uni.id}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-secondary transition-colors"
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
    <section className="bg-ksc-navy py-10 lg:py-20 border-t border-white/5">
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
              <div key={title} className="card-hover p-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-ksc-navy-dark/10 text-secondary shadow-sm border border-white/10 transition-transform duration-300 hover:scale-110">
                  {image ? (
                    <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-8 w-8" />
                  )}
                </div>
                <h4 className="mt-4 font-bold text-white">{title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">{description}</p>
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
  const stepIcons = [FileDown, ClipboardList, Wallet, Package];
  return (
    <section className="bg-ksc-navy py-10 lg:py-20">
      <div className="container-site">
        <SectionHeading
          kicker="How It Works"
          title="Four simple steps to begin"
          subtitle="Download the form, submit documents, pay the fee, and start learning."
        />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line for desktop */}
          <div className="absolute left-0 top-14 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:block"></div>

          {ADMISSION_STEPS.map((step, i) => {
            const Icon = stepIcons[i] ?? FileDown;
            return (
              <div key={step.step} className="group relative flex flex-col items-center text-center">
                {/* Icon Badge */}
                <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 shadow-xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:ring-secondary/30">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-b from-ksc-navy-dark/10 to-transparent"></div>
                  <Icon className="relative z-20 h-8 w-8 text-white transition-colors duration-300 group-hover:text-secondary stroke-[1.5]" />
                  {/* Step Number Bubble */}
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ksc-navy bg-ksc-gold text-xs font-black text-ksc-navy shadow-md">
                    {parseInt(step.step)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-secondary/20">
                  <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-ksc-gold">Step {step.step}</div>
                  <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white font-bold hover:bg-secondary hover:text-ksc-navy-dark hover:border-secondary transition-colors"
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
    <section className="bg-white/5 py-10 lg:py-20">
      <div className="container-site">
        <SectionHeading
          kicker="Visit Us"
          title="Our Branchs"
          subtitle="Visit our centres — our counsellors will help you at every step."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((branch) => (
            <div key={branch.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-secondary/20">
              <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-ksc-navy-dark/5 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary shadow-inner">
                    {branch.isHead ? "Head Office" : "Branch"}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">{branch.name}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ksc-navy-dark/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary/70" />
                  <p className="text-sm leading-relaxed">{branch.address}</p>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="h-4 w-4 shrink-0 text-secondary/70" />
                  <p className="text-sm">{branch.phone}</p>
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
    <section className="bg-white/5 py-10 lg:py-20">
      <div className="container-site">
        <SectionHeading
          kicker="Life at KSC"
          title="Take a look inside"
          subtitle="Real photos from our centre — front office, study materials, counselling and more."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {previews.map((item) => (
            <Link key={item.id} to="/gallery" className="group relative block overflow-hidden rounded-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-bold text-white">{item.caption}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
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
    <section className="gradient-head relative overflow-hidden py-10 lg:py-10 lg:py-16 text-white">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ksc-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-ksc-saffron/20 blur-3xl" />
      <div className="container-site relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ksc-gold">Ready to begin?</p>
          <h2 className="mt-2 text-3xl font-extrabold">{SITE_CONFIG.admissionOpen}</h2>
          <p className="mt-2 text-white/80">{SITE_CONFIG.lastDate}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" variant="gold" asChild>
            <Link to="/admissions">Apply Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/60 bg-transparent text-white hover:bg-white/5/15 hover:text-white"
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
