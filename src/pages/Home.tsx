import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  ClipboardList,
  Wallet,
  Package,
  CalendarDays,
} from "lucide-react";
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
const HERO_IMAGES = [
  "/assets/user-photos/students.png",
  "/assets/user-photos/branch-exterior.jpg",
  "/assets/user-photos/distance-student.png",
];

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] w-full overflow-hidden sm:h-[600px]">
      {/* Full-width Carousel Background */}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50" />

      {/* Floating Admissions Sticker */}
      <div className="absolute right-4 top-24 z-20 md:right-16 md:top-32">
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-ksc-gold border-[5px] border-white shadow-2xl rotate-12 transition-transform hover:scale-110">
          <span className="text-[10px] font-bold uppercase text-ksc-navy tracking-widest drop-shadow-md">Admissions</span>
          <span className="text-2xl font-black text-ksc-navy drop-shadow-md">OPEN</span>
          <span className="text-[10px] font-bold text-ksc-navy/80 drop-shadow-md">{SITE_CONFIG.admissionYear}</span>
        </div>
      </div>

      {/* Centered Content */}
      <div className="container-site relative z-10 flex h-full flex-col items-center justify-center text-center py-16 md:py-24">
        <span className="inline-flex items-center gap-2 rounded bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow">
          <CalendarDays className="h-4 w-4" />
          {SITE_CONFIG.admissionOpen}
        </span>
        <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          {HERO.headline}
          <span className="mt-2 block text-2xl font-bold text-ksc-gold sm:text-4xl">
            {HERO.subHeadline}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white sm:text-lg font-medium drop-shadow-sm">
          {HERO.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {HERO.ctas.map((cta) =>
            cta.primary ? (
              <Button key={cta.to} size="lg" variant="gold" asChild className="rounded px-8 shadow-xl">
                <Link to={cta.to}>
                  {cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button key={cta.to} size="lg" variant="outline" className="rounded border-white text-white hover:bg-white hover:text-ksc-dark px-8 shadow-xl" asChild>
                <Link to={cta.to}>{cta.label}</Link>
              </Button>
            )
          )}
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
    <section className="bg-white py-6 border-b border-gray-200">
      <div className="container-site flex flex-wrap justify-center items-center gap-8 md:gap-20">
        <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
          <div className="w-12 h-12 rounded-full border-2 border-[#166534] flex items-center justify-center font-bold text-[#166534] text-sm shadow-sm bg-white">UGC</div>
          <span className="font-bold text-sm text-ksc-dark leading-tight">Approved<br/>Institute</span>
        </div>
        <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
          <div className="w-12 h-12 rounded-full border-2 border-ksc-gold flex items-center justify-center font-bold text-ksc-gold text-[10px] text-center shadow-sm bg-white leading-tight">ISO<br/>9001</div>
          <span className="font-bold text-sm text-ksc-dark leading-tight">Certified<br/>Center</span>
        </div>
        <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
           <div className="w-12 h-12 rounded-full border-2 border-[#1e40af] flex items-center justify-center font-bold text-[#1e40af] text-sm shadow-sm bg-white">NCTE</div>
           <span className="font-bold text-sm text-ksc-dark leading-tight">Recognized<br/>Courses</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* ABOUT SNAPSHOT                                                               */
/* --------------------------------------------------------------------------- */
function AboutSnapshot() {
  return (
    <section className="bg-white py-20">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        {/* Image Column */}
        <div className="relative order-2 lg:order-1 px-4 lg:px-0">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100">
            <img src="/assets/images/about-students.png" alt="Students at Karur Study Center" className="w-full h-auto object-cover aspect-[4/3]" />
          </div>
          <div className="absolute -bottom-6 -right-2 md:-right-6 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-ksc-saffron to-ksc-gold border-8 border-white shadow-xl rotate-[-10deg]">
            <span className="text-3xl font-black text-ksc-dark">15+</span>
            <span className="text-[10px] font-bold uppercase text-ksc-dark text-center leading-tight mt-1">Years of<br/>Excellence</span>
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
          {ABOUT_SNAPSHOT.text.map((para) => (
            <p key={para.slice(0, 24)} className="mt-4 leading-relaxed text-ksc-ink/90">
              {para}
            </p>
          ))}
          <div className="mt-8 grid grid-cols-2 gap-y-4 gap-x-2">
             <div className="flex items-center gap-3">
               <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
               <span className="text-sm font-bold text-ksc-dark">UG / PG / Diploma</span>
             </div>
             <div className="flex items-center gap-3">
               <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
               <span className="text-sm font-bold text-ksc-dark">5000+ Students</span>
             </div>
             <div className="flex items-center gap-3">
               <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
               <span className="text-sm font-bold text-ksc-dark">Full Exam Support</span>
             </div>
             <div className="flex items-center gap-3">
               <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
               <span className="text-sm font-bold text-ksc-dark">Affordable Fees</span>
             </div>
          </div>
          <Link to={ABOUT_SNAPSHOT.readMoreLink} className="btn-outline mt-8">
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
  return (
    <section className="bg-ksc-mist/60 py-20">
      <div className="container-site">
        <SectionHeading
          kicker="Why Distance Education"
          title="Road to a degree, without leaving home"
          subtitle="Affordable, flexible and recognised — distance education fits around your life, not the other way around."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_DISTANCE.map((item, i) => (
            <div key={item.title} className="card-hover relative p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-bold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ksc-ink/85">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* VISION / MISSION / VALUES                                                    */
/* --------------------------------------------------------------------------- */
function VisionMissionValues() {
  const { vision, mission, values } = VISION_MISSION_VALUES;
  const [tab, setTab] = useState<"vision" | "mission" | "values">("vision");

  return (
    <section className="bg-white py-20">
      <div className="container-site">
        <SectionHeading kicker="Our Foundation" title="Vision · Mission · Values" />
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center gap-2">
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
                className={`rounded px-5 py-2 text-sm font-bold border transition-colors ${tab === t.id
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-200 text-ksc-dark hover:bg-gray-50"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="card-hover mt-6 p-8">
            {tab === "vision" && <p className="text-center text-lg font-medium leading-relaxed text-ksc-dark">{vision}</p>}
            {tab === "mission" && (
              <ul className="space-y-3">
                {mission.map((m) => (
                  <li key={m.slice(0, 24)} className="flex items-start gap-3 text-ksc-ink">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {m}
                  </li>
                ))}
              </ul>
            )}
            {tab === "values" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="rounded-lg bg-ksc-mist/70 p-4">
                    <p className="font-bold text-primary">{v.title}</p>
                    <p className="mt-1 text-sm text-ksc-ink/80">{v.description}</p>
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
/* STATS COUNTERS                                                               */
/* --------------------------------------------------------------------------- */
function Stats() {
  return (
    <section className="bg-ksc-deep py-14">
      <div className="container-site">
        {/* TODO: numbers in SITE_CONFIG.stats are placeholders */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
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
  return (
    <section className="bg-white py-20">
      <div className="container-site">
        <SectionHeading
          kicker="Facilities & Services"
          title="Everything you need under one roof"
          subtitle="Admission guidance, study material, exam support — all from your local study centre."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {FACILITIES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card-hover p-5 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-7 w-7" />
              </span>
              <h4 className="mt-4 font-bold text-ksc-dark">{title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-ksc-ink/75">{description}</p>
            </div>
          ))}
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
  const stepIcons = [FileDown, ClipboardList, Wallet, Package];
  return (
    <section className="bg-ksc-mist/60 py-20">
      <div className="container-site">
        <SectionHeading
          kicker="How It Works"
          title="Four simple steps to begin"
          subtitle="Download the form, submit documents, pay the fee, and start learning."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADMISSION_STEPS.map((step, i) => {
            const Icon = stepIcons[i] ?? FileDown;
            return (
              <div key={step.step} className="card-hover relative p-6 text-center border-t-4 border-t-primary">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-ksc-gold mb-1">Step {step.step}</div>
                <h3 className="font-bold text-ksc-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ksc-ink/80">{step.description}</p>
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
  return (
    <section className="bg-white py-20">
      <div className="container-site">
        <SectionHeading
          kicker="Visit Us"
          title="Our Centres"
          subtitle="Walk in during working hours — our counsellors will help you at every step."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {BRANCHES.map((branch) => (
            <div key={branch.name} className="card-hover p-6">
              <span className="inline-block rounded-full bg-ksc-mist px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                {branch.isHead ? "Head Office" : "Branch"}
              </span>
              <h3 className="mt-3 text-lg font-bold text-ksc-dark">{branch.name}</h3>
              <p className="mt-2 text-sm text-ksc-ink/85">{branch.address}</p>
              <p className="mt-1 text-sm text-ksc-ink/85">Phone: {branch.phone}</p>
              <p className="mt-1 text-sm text-ksc-ink/85">Hours: {branch.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------- */
/* CTA BAND                                                                     */
/* --------------------------------------------------------------------------- */
function CtaBand() {
  return (
    <section className="gradient-head relative overflow-hidden py-16 text-white">
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
  return (
    <>
      <Hero />
      <AffiliationsStrip />
      <NewsTicker items={NEWS_EVENTS} />
      <AboutSnapshot />
      <WhyDistance />
      <VisionMissionValues />
      <Stats />
      <UniversityCourses />
      <FacilitiesGrid />
      <AdmissionSteps />
      <Branches />
      <CtaBand />
    </>
  );
}