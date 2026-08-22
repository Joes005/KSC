/**
 * =============================================================================
 * KARUR STUDY CENTER — SITE CONTENT (single source of truth)
 * =============================================================================
 * Edit this one file to change site-wide copy. "TODO" markers show the fields
 * that are still placeholders — swap in real values as you receive them.
 *
 * Palette proposal (approve or adjust):
 *   green   #0E6B4E  primary  (derived from logo emblem green)
 *   dark    #063731  headings, footer surfaces
 *   gold    #C99A2E  secondary accent
 *   saffron #E08E23  warm highlight (Tamil Nadu open-university flavour)
 *   navy    #1E2A44  deep neutral for alternate surfaces
 * =============================================================================
 */

export const SITE_CONFIG = {
  name: "KARUR STUDY CENTER",
  shortName: "KSC",
  tagline: "Distance Education Admissions & Study Centre",
  description:
    "Karur Study Center (KSC) is a study centre in Karur, Tamil Nadu that helps students enrol in UG, PG, Diploma, Certificate and Vocational distance-education programmes offered by state open universities.",

  /* === LOGO ===
   * The final circular emblem (quarter torch / book-on-lotus / grad-cap /
   * oil-lamp with "K S C" cross, Tamil motto arc and "KARUR STUDY CENTER"
   * ribbon) will be uploaded. Until then Logo.tsx renders an inline SVG
   * placeholder emblem. To switch to the real asset:
   *   1. drop your file at <logoSource> and
   *   2. set branding.logo.useImage = true                            */
  branding: {
    // TODO: replace with real logo image path
    logoSource: "/logo.jpg",
    useImage: true,
    // TODO: Tamil motto text for the emblem's upper arc (rendered on the
    // SVG when supplied), e.g. "வாழ்க வளமுடன்" — empty until provided
    motto: "",
  },

  /* === CONTACT / LOCATION (from KSC admission posters) === */
  contact: {
    phone: "98652 23107", // primary cell number
    landline: "04324 236107", // landline (from poster footer)
    whatsapp: "919965107404", // KSC WhatsApp number (digits only, incl. country code)
    email: "Karurstudycentre1@gmail.com",
    address: "M.R.S. Plaza, 3rd Floor, 57-59, J-S-PS Complex, Near Mini Bus Stand, Karur - 1", // from poster footer
    // TODO: replace with real Google Maps embed src (https://maps.google.com/maps?q=...&output=embed)
    mapEmbedUrl: "https://maps.google.com/maps?q=Karur%2CTamil%20Nadu&t=&z=12&ie=UTF8&iwloc=&output=embed",
  },

  /* === SOCIAL LINKS (all TODO) === */
  socials: {
    facebook: "https://www.facebook.com/Karurstudycentre",
    instagram: "https://www.instagram.com/karur_study_centre",
    youtube: "https://www.youtube.com/@karurstudycentrecentre1507",
    twitterX: "X_URL", // TODO
    maps: "https://www.google.com/maps/search/?api=1&query=Karur%2CTamil%20Nadu", // TODO: point to exact KSC location
    website: "https://distanceeducationstudycentre.com/edu",
  },

  /* === STATS COUNTERS === */
  stats: [
    { value: 50000, suffix: "+", label: "Graduates" },
    { value: 26, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "%", label: "Result Rate" },
    { value: 80, suffix: "+", label: "Lecturers" },
    { value: 20, suffix: "+", label: "Office Staff" },
  ],

  /* === ADMISSION WINDOW === */
  admissionYear: "Academic Year 2026",
  admissionOpen: "Admissions Open — Academic Year 2026",
  lastDate: "Last date for admission: 31 July 2026", // TODO: confirm with KSC
};

/* =========================================================================== */
/* HOME — HERO + WHY DISTANCE EDUCATION + ABOUT SNAPSHOT                       */
/* =========================================================================== */

export const HERO = {
  headline: "Karur Study Center",
  subHeadline: "Your trusted study centre for distance education",
  description:
    "Get expert admission guidance for UG, PG, Diploma, Certificate and Vocational programmes from Alagappa University, Bharathidasan University, Manonmaniam Sundaranar University, and Tamilnadu Open University — all from right here in Karur, with continuous support through exams and results.",
  ctas: [
    { label: "Explore Programmes", to: "/academic", primary: true },
    { label: "Apply Now", to: "/admissions", primary: false },
  ],
};

export const WHY_DISTANCE = [
  {
    title: "Flexibility",
    description:
      "Study at your own pace while you work, raise a family, or live in a remote area. No need to travel to a campus every day.",
  },
  {
    title: "Accessibility",
    description:
      "Open to learners of varied backgrounds and prior qualifications. Remove the barriers of location and rigid class timings.",
  },
  {
    title: "Career Advancement",
    description:
      "Upgrade your skill set and qualifications without giving up your current job or income stream.",
  },
  {
    title: "Affordability",
    description:
      "Distance programmes are significantly cheaper than regular degrees while holding the same UGC-DEB-recognised value.",
  },
  {
    title: "Diverse Offerings",
    description:
      "Choose from UG, PG, Diploma, Certificate, Vocational and Short-Term programmes across multiple universities.",
  },
];

export const ABOUT_SNAPSHOT = {
  text: [
    "Karur Study Center (KSC) is a dedicated distance-education study and admission centre based in Karur, Tamil Nadu. We bridge the gap between open universities and students — helping you pick the right programme, submit a correct application, and stay supported through exams and results.",
    "Our services are designed for working professionals, homemakers and students from remote areas who want recognised degrees without relocating or abandoning their commitments.",
  ],
  readMoreLink: "/about",
  body: [
    "Karur Study Center (KSC) is a dedicated distance-education study and admission centre based in Karur, Tamil Nadu. Since our inception we have been bridging the gap between open universities and students — helping you pick the right programme, submit a correct application, and stay supported through exams and results.",
    "Our services are designed for working professionals, homemakers and students from remote areas who want recognised degrees without relocating or abandoning their commitments. We are affiliated with Alagappa University, Bharathidasan University, Manonmaniam Sundaranar University, and Tamilnadu Open University, and guide learners through every stage of their academic journey.",
    "From programme counselling and document verification to study-material support, exam updates and result guidance, our team walks with you until you earn your degree. With more than 50,000 learners served, KSC has grown into a trusted name for open and distance education in the region.",
  ],
  membership: [
    "Partner study centre of Alagappa University",
    "Recognised centre of Bharathidasan University",
    "Authorised study centre of Manonmaniam Sundaranar University",
    "Authorised study centre of Tamilnadu Open University",
    "Affiliated with UGC-DEB recognised distance education",
  ],
  establishedYear: "2006",
};

/* =========================================================================== */
/* VISION / MISSION / VALUES                                                   */
/* =========================================================================== */

export const VISION_MISSION_VALUES = {
  vision:
    "To become the most trusted study centre in Tamil Nadu for distance education — making recognised, affordable, good-quality higher education accessible to every learner.",
  mission: [
    "Provide clear, unbiased information about programmes offered by our affiliated open universities.",
    "Guide every applicant through a smooth, transparent admission process.",
    "Support students with study materials, exam updates and ongoing mentorship.",
    "Keep education affordable and convenient for working professionals and remote learners.",
  ],
  values: [
    {
      title: "Accessibility",
      description: "Education within reach of every learner, irrespective of location or schedule.",
    },
    {
      title: "Integrity",
      description: "Honest, transparent information and ethical admission guidance.",
    },
    {
      title: "Student-First Support",
      description: "Personalised assistance tailored to each student's needs.",
    },
    {
      title: "Academic Excellence",
      description: "High standards in the guidance we offer and the outcomes we aim for.",
    },
    {
      title: "Flexibility",
      description: "Services that adapt to varied learner circumstances.",
    },
    {
      title: "Lifelong Learning",
      description: "Encouraging skill development and continuing education at every age.",
    },
  ],
};

/* =========================================================================== */
/* NEWS & EVENTS STRIP (Home ticker + News & Events panel)                    */
/* =========================================================================== */

export interface NewsEvent {
  text: string;
  type: "admission" | "deadline" | "exam" | "event";
  href?: string;
  date?: string;
}

export const NEWS_EVENTS: NewsEvent[] = [
  {
    text: "Admissions are open for the Academic Year 2026 — Alagappa University, Bharathidasan University, Manonmaniam Sundaranar University, and Tamilnadu Open University.",
    type: "admission",
    date: "Admissions Open",
    href: "/admissions",
  },
  {
    text: "Last date for admission: 31 July 2026",
    type: "deadline",
    date: "31 July 2026",
    href: "/admissions",
  },
  {
    text: "TNOU exam time-table released — check the Exam Update page.",
    type: "exam",
    date: "Exam Update",
    href: "/exam-update",
  },
  {
    text: "BDU semester examinations — hall tickets available on the university portal.",
    type: "exam",
    date: "Exam Update",
    href: "/exam-update#bdu",
  },
  {
    text: "Alagappa University (CDOE) — July session admissions open for UG, PG, Diploma & Certificate programmes.",
    type: "admission",
    date: "ALU Admissions Open",
    href: "/academic#alagappa",
  },
  {
    text: "Alagappa University — exam hall tickets & time-tables on the official distance MIS portal.",
    type: "exam",
    date: "Exam Update",
    href: "/exam-update#alagappa",
  },
];

/* =========================================================================== */
/* MILESTONES (Home — "Empowering Excellence")                                 */
/* =========================================================================== */

export const MILESTONES = [
  { value: "26+", label: "Years of Experience" },
  { value: "50,000+", label: "Graduates" },
  { value: "4", label: "Affiliated Universities" },
  { value: "4", label: "Branches" },
];

/* =========================================================================== */
/* ADMISSION PROCESS STEPS                                                     */
/* =========================================================================== */

export const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Download Form",
    description: "Collect the application form from our centre or download it from the university portal.",
  },
  {
    step: "02",
    title: "Submit Documents",
    description: "Submit the filled form along with copies of mark sheets, photo and ID proof.",
  },
  {
    step: "03",
    title: "Pay Fees",
    description: "Pay the prescribed course fee through the university/nominated bank channels.",
  },
  {
    step: "04",
    title: "Receive Study Material",
    description: "Receive your enrolment confirmation and study material to begin learning.",
  },
];

/* =========================================================================== */
/* CURRICULUM PAGE (how the syllabus works)                                    */
/* =========================================================================== */

export const CURRICULUM = {
  intro:
    "Every affiliated university follows its own curriculum structure, examination pattern and syllabus. As a study centre we help you understand what to study, how it is assessed and where to find the official syllabus.",
  points: [
    {
      title: "Self-Learning Material (SLM)",
      description:
        "Each course is built around printed or digital Self-Learning Material written by the university's academic wing. You prepare from these units at your own pace.",
    },
    {
      title: "Semester vs Non-Semester",
      description:
        "Semester-pattern courses are assessed at the end of each semester; non-semester (yearly) courses are assessed once a year. Your programme table on the Academic page shows the pattern for each course.",
    },
    {
      title: "Assignments & Internal Components",
      description:
        "Courses may include assignments or internal components that contribute to the final grade, apart from the written university examination.",
    },
    {
      title: "Practical / Passed-Out Subjects",
      description:
        "Science and vocational courses include practical-oriented components. Practical records are evaluated by the university during examinations.",
    },
    {
      title: "Official Syllabus Downloads",
      description:
        "The full syllabus for every programme is published by the respective university. Use the syllabus links below to download the PDFs for the programme you are interested in.",
    },
  ],
  note:
    "This page links out to the official university syllabus PDFs for reference. If a link is missing or out of date, contact our centre for the latest copy.",
};

/* =========================================================================== */
/* FACILITIES — copy kept generic; refine when real copy is ready (TODO)       */
/* =========================================================================== */

export const FACILITIES_INTRO =
  "Everything you need to complete a distance-education degree conveniently — from admission guidance to exam-day readiness.";

/* =========================================================================== */
/* ABOUT PAGE                                                                  */
/* =========================================================================== */

export const ABOUT_PAGE = {
  // TODO: refine long-form copy when KSC provides it
  establishedYear: "2001",
  intro:
    "Karur Study Center (KSC) is a distance-education study and admission centre located in Karur, Tamil Nadu. We help learners enrol in recognised open-university and distance-education programmes — guiding them from choosing the right course to receiving their study material and clearing their examinations.",
  body: [
    "Distance education has changed the way people in small towns and rural Tamil Nadu access higher education. Working professionals, homemakers, and students who cannot relocate now have access to the same recognised degrees, taught by government universities, without leaving home. KSC exists to make that pathway simple and reliable.",
    "We act as the local bridge between open universities and students. We keep up-to-date information on programmes, eligibility, fees and deadlines; we help you complete and verify your application; and we stay with you through the entire study period with exam updates, hall-ticket guidance and result alerts.",
    "Our team is committed to honest, transparent guidance. We never push a course you don't need — we help you find the one that fits your background, budget and career goal.",
  ],
  membership: [
    "Admission-support relationship with Alagappa University",
    "Admission-support relationship with Bharathidasan University",
    "Admission-support relationship with Manonmaniam Sundaranar University",
    "Recognised study-centre partnership with Tamilnadu Open University",
    "UGC-DEB recognised distance-education programmes (as applicable per university)",
  ],
};

/* =========================================================================== */
/* FOUNDER / CHAIRMAN MESSAGES (TODO text + headshots)                         */
/* =========================================================================== */

export const FOUNDER_MESSAGE = {
  name: "FOUNDER_NAME", // TODO: founder name
  role: "Founder", // TODO: adjust designation
  // TODO: write the actual message
  message:
    "[Founder's message placeholder — to be replaced. Introduce yourself, the reason KSC was founded in Karur, and your commitment to helping every aspirant access a recognised degree through distance education.]",
  image: "/assets/messages/founder.svg", // TODO: replace with real headshot (or drop founder.png here)
};

export const CHAIRMAN_MESSAGE = {
  name: "CHAIRMAN_NAME", // TODO: chairman name
  role: "Chairman", // TODO: adjust designation
  // TODO: write the actual message
  message:
    "[Chairman's message placeholder — to be replaced. Describe KSC's role in the community, the standard of support students can expect, and your vision for the centre.]",
  image: "/assets/messages/chairman.svg", // TODO: replace with real headshot (or drop chairman.png here)
};

/* =========================================================================== */
/* BRANCHES (TODO placeholders)                                                */
/* =========================================================================== */

export const BRANCHES = [
  {
    name: "Karur Study Centre",
    // from KSC admission posters
    address: "M.R.S. Plaza, 3rd Floor, 57-59, J-S-PS Complex, Near Mini Bus Stand, Karur - 1",
    phone: "98652 23107, 93444 23107, 93622 23107",
    isHead: true,
  },
  {
    name: "Pace Computer College",
    // from KSC admission posters (footer)
    address: "Near Bus Stand, Kangayam - 638 701",
    phone: "98652 22107, 93622 24107",
    isHead: false,
  },
  {
    name: "S.S. Institute",
    address: "75/38, M.G.M Road, Raja Complex, 2nd Floor, Opposite Bus Stand, Dindigul - 3.",
    phone: "90872 22107, 90472 22107",
    isHead: false,
  },
];

/* =========================================================================== */
/* UNIVERSITY LOGO STRIP (footer) — TODO until logos are provided              */
/* =========================================================================== */

export const UNIVERSITY_LOGOS = [
  { name: "Alagappa University", url: "#", image: "" }, // TODO: logo
  { name: "Bharathidasan University", url: "#", image: "" }, // TODO: logo
  { name: "Manonmaniam Sundaranar University", url: "#", image: "" }, // TODO: logo
  { name: "Tamilnadu Open University", url: "#", image: "" }, // TODO: logo
];

/* =========================================================================== */
/* FORMS — placeholder submission endpoint (wire real endpoint later)          */
/* =========================================================================== */

export const FORM_ENDPOINT = "/api/contact"; // TODO: wire real backend endpoint

export interface FormField {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export const CONTACT_FORM_FIELDS: FormField[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit mobile number", required: true },
  { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com", required: false },
  {
    name: "programme",
    label: "Programme Interested In",
    type: "select",
    placeholder: "Select a programme category…",
    required: true,
    options: [
      "UG (Undergraduate)",
      "PG (Postgraduate)",
      "Diploma",
      "Certificate",
      "Vocational / Skill Development",
      "Short Term Course",
      "Not sure yet — need guidance",
    ],
  },
  { name: "message", label: "Message", type: "textarea", placeholder: "How can we help you?", required: false },
];

export const ADMISSIONS_FORM_FIELDS: FormField[] = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit mobile number", required: true },
  { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com", required: false },
  {
    name: "university",
    label: "University",
    type: "select",
    placeholder: "Select your university…",
    required: true,
    options: [
      "Alagappa University",
      "Bharathidasan University",
      "Manonmaniam Sundaranar University",
      "Tamilnadu Open University",
    ],
  },
  { name: "course", label: "Course / Programme", type: "text", placeholder: "e.g. B.A. Tamil, M.B.A., B.Com…", required: true },
];

export const USER_UPDATE_MODAL = {
  enabled: true,
  title: "USER UPDATE",
  message: "Important updates or notifications will be displayed here.",
  imageUrl: "", // Set an image URL like "/assets/gallery/ksc-01.jpg" to display an image in the modal
};