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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ksc-navy/90 p-4 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="update-title">
      <div className="animate-fade-in flex w-full max-w-4xl justify-center">
        {displayImageUrl ? (
          <div className="relative inline-block">
            {/* Close Button on Top Right of Image */}
            <button onClick={() => setIsOpen(false)} aria-label="Close update" autoFocus className="absolute -right-3 -top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-ksc-navy text-white shadow-xl transition-colors hover:bg-ksc-red sm:-right-4 sm:-top-4">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <img src={displayImageUrl} alt="Update" className="w-auto h-auto object-contain max-h-[85vh] max-w-full rounded-xl shadow-2xl" key={displayImageUrl} />
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
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#f5f8fc] via-white to-[#eaf4ff] lg:w-[58%]" />
        <div className="absolute left-0 top-0 h-1.5 w-40 bg-ksc-red" />
        <div className="container-site relative grid items-center gap-12 py-14 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-3 border-l-4 border-ksc-red pl-3">
              <span className="text-xs font-extrabold uppercase tracking-[.2em] text-ksc-navy">Admissions open · {SITE_CONFIG.admissionYear}</span>
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.14em] text-ksc-royal">Your next chapter starts here</p>
            <h1 className="max-w-2xl text-4xl leading-[1.08] text-ksc-navy sm:text-5xl lg:text-6xl">
              Karur Study <span className="text-ksc-royal">Center</span>
            </h1>
            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-slate-600 sm:text-lg">Recognised UG, PG and diploma programmes with personal guidance, flexible learning and complete student support—right here in Karur.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link to="/admissions" className="btn-gold gap-2">Explore admissions <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/academic" className="btn-outline bg-white/70">View programmes</Link>
            </div>
            <div className="mt-10 grid gap-3 border-t border-slate-200 pt-6 text-sm font-semibold text-ksc-navy sm:grid-cols-3">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Recognised degrees</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Flexible schedules</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-ksc-red" /> Local support</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-3xl bg-ksc-red" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-ksc-navy shadow-[var(--shadow-lg)]">
              <img key={currentImage} src={HERO_IMAGES[currentImage]} alt="Students supported by Karur Study Centre" className="hero-media h-80 w-full object-cover object-top animate-fade-in sm:h-[480px]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ksc-navy via-ksc-navy/75 to-transparent px-7 pb-7 pt-24 text-white">
                <p className="text-2xl font-bold text-white">Education that fits your life</p>
                <p className="mt-1 text-sm text-white/75">Study. Grow. Move forward.</p>
              </div>
            </div>
            <div className="absolute -left-2 top-8 rounded-lg bg-ksc-red px-5 py-3 text-white shadow-xl sm:-left-8">
              <span className="block text-[10px] font-bold uppercase tracking-[.2em]">Now open</span>
              <span className="font-heading text-3xl font-black uppercase">2026–27</span>
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

          <div className="relative mx-auto w-full max-w-lg">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_25px_70px_rgba(7,27,74,.16)]">
              <img src="/assets/gallery/ksc-01.jpg" alt="Study materials at Karur Study Centre" className="aspect-[4/3] w-full rounded-[1.4rem] object-cover" />
            </div>
            <div className="relative -mt-14 ml-5 max-w-sm rounded-2xl bg-ksc-navy p-6 text-white shadow-xl sm:ml-12">
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
              <img src="/assets/user-photos/distance-student.png" alt="Student studying distance education" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ksc-navy to-transparent p-7 pt-24 text-white"><p className="font-heading text-3xl font-black uppercase">Learn on your terms</p></div>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl bg-[#f8fbff] p-3 lg:col-span-7">
            {WHY_DISTANCE.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={item.title} className="border-b border-slate-200 last:border-b-0">
                  <button onClick={() => setActiveIndex(index)} className="group flex w-full items-center justify-between rounded-2xl px-4 py-6 text-left transition-all hover:bg-white">
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
  const { data: { vision_mission: VISION_MISSION_VALUES } } = useSiteData();
  const { vision, mission, values } = VISION_MISSION_VALUES;
  const [tab, setTab] = useState<"vision" | "mission" | "values">("vision");

  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-12 lg:py-24 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading kicker="Our Foundation" title="Vision · Mission · Values" align="center" />
        <div className="mx-auto max-w-6xl">
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

          <div className="relative mt-6 flex min-h-[210px] flex-col justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-soft sm:p-6">
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
              <div className="animate-fade-in grid gap-3 md:grid-cols-3">
                {values.map((v) => (
                  <div key={v.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-ksc-sky hover:bg-white">
                    <p className="text-sm font-bold uppercase tracking-wide text-ksc-navy">{v.title}</p>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{v.description}</p>
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
    <section className="facilities-showcase bg-white py-10 lg:py-20 border-t-4 border-ksc-red">
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
              <div key={title} className="facility-card card-hover group bg-white p-5 text-center sm:p-6">
                <div className="facility-icon mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-ksc-navy transition duration-300">
                  {image ? (
                    <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <Icon className="h-8 w-8 stroke-[1.5]" />
                  )}
                </div>
                <h4 className="mt-4 font-bold text-ksc-navy">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
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
  const previews = GALLERY.slice(0, 6);
  return (
    <section className="gallery-showcase bg-slate-50 py-10 lg:py-20 border-t border-slate-100">
      <div className="container-site">
        <SectionHeading
          kicker="Life at KSC"
          title="Take a look inside"
          subtitle="Real photos from our centre — front office, study materials, counselling and more."
        />
        <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4">
          {previews.map((item, index) => (
            <Link key={index} to="/gallery" className={cn("gallery-tile group relative block overflow-hidden rounded-2xl border border-white/70 bg-slate-200 shadow-sm", index === 0 && "col-span-2 row-span-2")}>
              <div className="absolute inset-0 bg-slate-200">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ksc-navy/90 via-ksc-navy/10 to-transparent p-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
                <span className="translate-y-1 text-sm font-bold text-white transition-transform duration-300 group-hover:translate-y-0">{item.caption}</span>
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
          <Button size="default" className="btn-gold" asChild>
            <Link to="/admissions">Apply Now</Link>
          </Button>
          <Button
            size="default"
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
      <CtaBand />
    </>
  );
}
