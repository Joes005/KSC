import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  BookOpen,
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

/* --------------------------------------------------------------------------- */
/* HERO                                                                            */
/* --------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-ksc-green-mid to-ksc-dark text-white">
      {/* decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-white/10" />

      <div className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ksc-gold/60 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ksc-gold">
            <CalendarDays className="h-4 w-4" />
            {SITE_CONFIG.admissionOpen}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {HERO.headline}
            <span className="mt-2 block text-2xl font-semibold text-ksc-gold sm:text-3xl">
              {HERO.subHeadline}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {HERO.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {HERO.ctas.map((cta) =>
              cta.primary ? (
                <Button key={cta.to} size="lg" variant="gold" asChild>
                  <Link to={cta.to}>
                    {cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button key={cta.to} size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/15 hover:text-white" asChild>
                  <Link to={cta.to}>{cta.label}</Link>
                </Button>
              )
            )}
          </div>
        </div>

        {/* Admission card mock */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="card-hover border-white/20 bg-white p-6 text-ksc-dark shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold leading-tight">Admission Guide — 2026</p>
                <p className="text-xs text-ksc-ink/70">TNOU · Bharathidasan University</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "UG · PG · Diploma · Certificate",
                "Vocational & Short-Term Programmes",
                "Semester & Non-Semester patterns",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2 text-ksc-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {line}
                </li>
              ))}
            </ul>
            <Link to="/academic" className="btn-primary mt-6 w-full">
              View all programmes
            </Link>
          </div>
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
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <div>
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
          <Link to={ABOUT_SNAPSHOT.readMoreLink} className="btn-outline mt-7">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: BookOpen, title: "UG / PG / Diploma", desc: "Programmes across TNOU & BDU" },
            { icon: GraduationCap, title: "5000+ Students", desc: "Guided through admissions (TODO)" },
            { icon: CheckCircle2, title: "Exam Support", desc: "Hall tickets, timetables & results" },
            { icon: Wallet, title: "Affordable Path", desc: "Transparent, low-fee guidance" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover p-5 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ksc-mist text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-3 font-bold text-ksc-dark">{title}</p>
              <p className="mt-1 text-xs text-ksc-ink/70">{desc}</p>
            </div>
          ))}
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
              <span className="absolute right-5 top-4 text-5xl font-extrabold text-primary/10">
                {String(i + 1).padStart(2, "0")}
              </span>
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
                className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  tab === t.id
                    ? "bg-primary text-white"
                    : "bg-ksc-mist text-ksc-dark hover:bg-primary/10"
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
                          <span className="rounded-full bg-ksc-gold/15 px-2.5 py-0.5 text-xs font-bold text-ksc-gold">
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
              <div key={step.step} className="card-hover relative p-6 text-center">
                <span className="absolute left-4 top-4 text-4xl font-extrabold text-primary/10">{step.step}</span>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-bold text-ksc-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ksc-ink/80">{step.description}</p>
                {i < ADMISSION_STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ksc-gold lg:block" />
                )}
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
    <section className="bg-gradient-to-r from-primary to-ksc-dark py-16 text-white">
      <div className="container-site flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
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