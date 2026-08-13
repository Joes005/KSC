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
    <section className="relative w-full bg-[#063731] overflow-hidden">
      <div className="container-site relative z-10 grid min-h-[500px] grid-cols-1 items-center gap-8 lg:gap-12 py-16 sm:min-h-[600px] lg:grid-cols-2 lg:py-24">

        {/* Left Column: Details */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded bg-ksc-green px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow">
            <CalendarDays className="h-4 w-4" />
            {SITE_CONFIG.admissionOpen}
          </span>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {HERO.headline}
            <span className="mt-2 block text-2xl font-bold text-ksc-gold sm:text-4xl">
              {HERO.subHeadline}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg font-medium drop-shadow-sm">
            {HERO.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {HERO.ctas.map((cta) =>
              cta.primary ? (
                <Button key={cta.to} size="lg" variant="gold" asChild className="rounded-full px-8 shadow-xl shadow-ksc-gold/20 font-bold">
                  <Link to={cta.to}>
                    {cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button key={cta.to} size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white hover:text-ksc-dark px-8 shadow-xl backdrop-blur-sm font-bold" asChild>
                  <Link to={cta.to}>{cta.label}</Link>
                </Button>
              )
            )}
          </div>
        </div>

        {/* Right Column: Image/Carousel */}
        <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px] order-1 lg:order-2">
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
            {HERO_IMAGES.map((img, idx) => (
              <div
                key={img}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  idx === currentImage ? "opacity-100" : "opacity-0"
                )}
              >
                <img src={img} alt="Karur Study Center" className="h-full w-full object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Floating Admissions Sticker */}
          <div className="absolute -bottom-6 -left-6 z-20 md:-bottom-8 md:-left-8">
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-ksc-gold border-[4px] border-white shadow-2xl rotate-12 transition-transform hover:scale-110 md:h-32 md:w-32 md:border-[5px]">
              <span className="text-[9px] font-bold uppercase text-ksc-navy tracking-widest drop-shadow-md md:text-[11px]">Admissions</span>
              <span className="text-xl font-black text-ksc-navy drop-shadow-md md:text-3xl">OPEN</span>
              <span className="text-[9px] font-bold text-ksc-navy/80 drop-shadow-md md:text-[11px]">{SITE_CONFIG.admissionYear}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* AFFILIATIONS STRIP                                                           */
/* --------------------------------------------------------------------------- */
function AffiliationsStrip() {
  return (
    <section className="bg-white py-8 border-b border-gray-100">
      <div className="container-site flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-20">
        <div className="flex items-center gap-3 sm:gap-4 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] border-[#166534] flex items-center justify-center font-bold text-[#166534] text-sm sm:text-base shadow-sm bg-white">UGC</div>
          <span className="font-bold text-xs sm:text-sm text-ksc-dark leading-tight">Approved<br />Institute</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] border-ksc-gold flex items-center justify-center font-bold text-ksc-gold text-[10px] sm:text-[11px] text-center shadow-sm bg-white leading-tight">ISO<br />9001</div>
          <span className="font-bold text-xs sm:text-sm text-ksc-dark leading-tight">Certified<br />Center</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] border-[#1e40af] flex items-center justify-center font-bold text-[#1e40af] text-sm sm:text-base shadow-sm bg-white">NCTE</div>
          <span className="font-bold text-xs sm:text-sm text-ksc-dark leading-tight">Recognized<br />Courses</span>
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
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image Column */}
        <div className="relative order-2 lg:order-1 px-4 lg:px-0 mx-auto w-full max-w-lg lg:max-w-none">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <img src="/assets/gallery/ksc-01.jpg" alt="Study materials and support at Karur Study Center" className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute -bottom-6 -right-2 md:-right-8 flex h-32 w-32 md:h-40 md:w-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-ksc-saffron to-ksc-gold border-8 border-white shadow-xl rotate-[-10deg] transition-transform hover:rotate-0 duration-300">
            <span className="text-3xl md:text-5xl font-black text-ksc-dark">26+</span>
            <span className="text-[10px] md:text-xs font-bold uppercase text-ksc-dark text-center leading-tight mt-1">Years of<br />Experience</span>
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
              <p key={para.slice(0, 24)} className="leading-relaxed text-ksc-ink/90 text-sm sm:text-base">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-ksc-mist/50 p-3 rounded-lg border border-gray-100 transition-colors hover:border-primary/30">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-bold text-ksc-dark">UG / PG / Diploma</span>
            </div>
            <div className="flex items-center gap-3 bg-ksc-mist/50 p-3 rounded-lg border border-gray-100 transition-colors hover:border-primary/30">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-bold text-ksc-dark">5000+ Students</span>
            </div>
            <div className="flex items-center gap-3 bg-ksc-mist/50 p-3 rounded-lg border border-gray-100 transition-colors hover:border-primary/30">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-bold text-ksc-dark">Full Exam Support</span>
            </div>
            <div className="flex items-center gap-3 bg-ksc-mist/50 p-3 rounded-lg border border-gray-100 transition-colors hover:border-primary/30">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-bold text-ksc-dark">Affordable Fees</span>
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
    <section className="bg-ksc-mist/60 py-12 sm:py-16 lg:py-24">
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
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent mix-blend-multiply rounded-3xl z-10" />
              <img src="/assets/user-photos/distance-student.png" alt="Student studying distance education" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          
          {/* Right: Accordion */}
          <div className="flex flex-col border-t border-white/60 bg-white/40 rounded-3xl p-2 lg:p-6 lg:col-span-7 shadow-sm">
            {WHY_DISTANCE.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={item.title} className="border-b border-white/60 last:border-b-0">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="group flex w-full items-center justify-between py-6 px-4 text-left transition-all hover:bg-white/50 focus:outline-none rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm transition-colors duration-300 ${isActive ? 'bg-gradient-to-br from-primary to-ksc-dark text-white ring-4 ring-primary/10' : 'bg-white text-primary'}`}>
                        <span className="font-black text-lg">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <span className={`text-lg font-bold sm:text-xl transition-colors duration-300 ${isActive ? 'text-primary' : 'text-ksc-dark group-hover:text-primary'}`}>
                        {item.title}
                      </span>
                    </div>
                    <span className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      <span className="text-2xl font-light leading-none">{isActive ? '−' : '+'}</span>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out px-4 ${
                      isActive ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-ksc-ink/80 sm:text-base pl-16 pr-8">
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
    <section className="bg-white py-12 sm:py-16 lg:py-24">
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
                  ? "bg-primary border-primary text-white shadow-md transform scale-105"
                  : "bg-white border-gray-200 text-ksc-dark hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="card-hover mt-8 p-6 sm:p-10 border border-gray-100 min-h-[250px] flex flex-col justify-center">
            {tab === "vision" && (
              <div className="animate-fade-in text-center">
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-ksc-dark max-w-2xl mx-auto">
                  "{vision}"
                </p>
              </div>
            )}
            {tab === "mission" && (
              <ul className="animate-fade-in grid sm:grid-cols-2 gap-6">
                {mission.map((m) => (
                  <li key={m.slice(0, 24)} className="flex items-start gap-4 text-ksc-ink bg-ksc-mist/30 p-4 rounded-xl">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                    <span className="text-sm sm:text-base leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "values" && (
              <div className="animate-fade-in grid gap-4 sm:gap-6 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="rounded-xl bg-ksc-mist/50 p-5 sm:p-6 border border-gray-100 transition-colors hover:border-primary/20 hover:bg-ksc-mist">
                    <p className="font-bold text-primary text-base sm:text-lg">{v.title}</p>
                    <p className="mt-2 text-sm sm:text-base text-ksc-ink/80 leading-relaxed">{v.description}</p>
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
    <section className="bg-ksc-mist/60 py-12 sm:py-16 lg:py-24 border-t border-ksc-green/10">
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
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white bg-white/80 p-8 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-ksc-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-4 border-ksc-mist/80 bg-white p-2 sm:p-3 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:border-primary/10">
                <img
                  src={uni.logo}
                  alt={uni.name}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-6 text-lg sm:text-xl font-bold leading-tight text-ksc-dark transition-colors group-hover:text-primary">
                {uni.name}
              </h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-ksc-gold">
                {uni.academicYear} admissions
              </p>
              <p className="mt-4 text-sm text-ksc-ink/80 leading-relaxed">
                {uni.categories.length} programmes across UG, PG, Diploma and Certificate courses.
              </p>
              <span className="mt-6 flex items-center text-xs font-bold text-primary group-hover:underline">
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
    <section className="bg-ksc-deep py-14">
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
    <section className="bg-ksc-mist/60 py-20" id="programmes">
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
                <div className="mb-6 rounded-xl border border-ksc-green/15 bg-white p-5">
                  <h3 className="text-xl font-bold text-primary">{uni.name}</h3>
                  <p className="mt-1 text-sm text-ksc-ink/80">
                    {uni.academicYear} · {uni.pattern}
                  </p>
                  {uni.recognition && (
                    <p className="mt-2 inline-block rounded-full bg-ksc-mist px-3 py-1 text-xs font-semibold text-primary">
                      {uni.recognition}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {uni.categories.map((cat) => (
                    <div key={cat.id} className="card-hover flex flex-col p-5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-ksc-dark">{cat.label}</h4>
                        {cat.count !== undefined && (
                          <span className="rounded bg-ksc-gold/15 px-2.5 py-0.5 text-xs font-bold text-ksc-gold">
                            {cat.count}
                          </span>
                        )}
                      </div>
                      {cat.note && <p className="mt-1 text-xs text-ksc-ink/70">{cat.note}</p>}
                      <Link
                        to={`/academic#${uni.id}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-ksc-green-mid"
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
    <section className="bg-white py-20">
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
              <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-primary shadow-sm border border-gray-100 transition-transform duration-300 hover:scale-110">
                {image ? (
                  <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <Icon className="h-8 w-8" />
                )}
              </div>
              <h4 className="mt-4 font-bold text-ksc-dark">{title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-ksc-ink/75">{description}</p>
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
    <section className="bg-ksc-mist/60 py-20">
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
                <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-gray-100 transition-transform duration-500 group-hover:scale-110 group-hover:ring-primary/30">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-b from-primary/10 to-transparent"></div>
                  <Icon className="relative z-20 h-8 w-8 text-primary transition-colors duration-300 group-hover:text-ksc-dark stroke-[1.5]" />
                  {/* Step Number Bubble */}
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-ksc-gold text-xs font-black text-white shadow-md">
                    {parseInt(step.step)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-primary/20">
                  <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-ksc-gold">Step {step.step}</div>
                  <h3 className="mb-3 text-lg font-bold text-ksc-dark">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ksc-ink/70">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" asChild>
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
    <section className="bg-white py-20">
      <div className="container-site">
        <SectionHeading
          kicker="Visit Us"
          title="Our Centres"
          subtitle="Visit our centres — our counsellors will help you at every step."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {BRANCHES.map((branch) => (
            <div key={branch.name} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
              <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-inner">
                    {branch.isHead ? "Head Office" : "Branch"}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-ksc-dark">{branch.name}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-ksc-ink/80">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                  <p className="text-sm leading-relaxed">{branch.address}</p>
                </div>
                <div className="flex items-center gap-3 text-ksc-ink/80">
                  <Phone className="h-4 w-4 shrink-0 text-primary/70" />
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
    <section className="bg-white py-20">
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
    <section className="gradient-head relative overflow-hidden py-10 lg:py-16 text-white">
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
            className="border-white/60 bg-transparent text-white hover:bg-white/15 hover:text-white"
            asChild
          >
            <Link to="/contact">Talk to a Counsellor</Link>
          </Button>
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
      <AffiliationsStrip />
      <NewsTicker items={NEWS_EVENTS} />
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
