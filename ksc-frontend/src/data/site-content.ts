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
  name: "KARUR STUDY CENTRE",
  shortName: "KSC",
  tagline: "Distance Education Admissions & Study Centre",
  description:
    "Karur Study Centre (KSC) is a distance-education study and admission centre with branches in Karur, Dindigul, and Kangeyam, helping students enrol in UG, PG, Diploma, Certificate and Vocational programmes offered by state open universities.",

  /* === LOGO ===
   * The final circular emblem (quarter torch / book-on-lotus / grad-cap /
   * oil-lamp with "K S C" cross, Tamil motto arc and "KARUR STUDY CENTRE"
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
    address: "M.R.S. Plaza, 3rd Floor, Near Mini Bus Stand, Karur - 639001",
    mapEmbedUrl: "https://maps.google.com/maps?q=Karur+Study+Centre,+M.R.S.+Plaza,+Covai+Road,+Ramakrishna+Puram,+Karur,+Tamil+Nadu+639001&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },

  /* === SOCIAL LINKS === */
  socials: {
    facebook: "https://www.facebook.com/Karurstudycentre",
    instagram: "https://www.instagram.com/karur_study_centre",
    youtube: "https://www.youtube.com/@karurstudycentrecentre1507",
    twitterX: "X_URL", // TODO
    maps: "https://maps.app.goo.gl/MJFWjrveBV3DQhi4A",
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
  headline: "Karur Study Centre",
  subHeadline: "Your trusted study centre for distance education",
  description:
    "Get expert admission guidance for UG, PG, Diploma, Certificate and Vocational programmes from Alagappa University, Bharathidasan University, Manonmaniam Sundaranar University, and Tamilnadu Open University — available across our branches in Karur, Dindigul, and Kangeyam, with continuous support through exams and results.",
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
    "Karur Study Centre (KSC) is a dedicated distance-education study and admission centre with branches in Karur, Dindigul, and Kangeyam. We bridge the gap between open universities and students — helping you pick the right programme, submit a correct application, and stay supported through exams and results.",
    "Our services are designed for working professionals, homemakers and students from remote areas who want recognised degrees without relocating or abandoning their commitments.",
  ],
  readMoreLink: "/about",
  body: [
    "Karur Study Centre (KSC) is a dedicated distance-education study and admission centre with branches in Karur, Dindigul, and Kangeyam. Since our inception we have been bridging the gap between open universities and students — helping you pick the right programme, submit a correct application, and stay supported through exams and results.",
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
  establishedYear: "2001",
};

/* =========================================================================== */
/* VISION / MISSION / VALUES                                                   */
/* =========================================================================== */

export const VISION_MISSION_VALUES = {
  vision:
    "To become the most trusted study centre in Tamil Nadu for distance education — making recognised, affordable, and quality higher education accessible to every learner across Karur, Dindigul, and Kangeyam.",
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
  badge?: string;
  tag?: string;
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
    text: "TNOU exam time-table released — collect from Karur Study Centre.",
    type: "exam",
    date: "Exam Update",
    href: "/exam-update",
  },
  {
    text: "BDU semester examinations — hall tickets available at Karur Study Centre.",
    type: "exam",
    date: "Exam Update",
    href: "/exam-update",
  },
  {
    text: "Alagappa University (CDOE) — July session admissions open for UG, PG, Diploma & Certificate programmes.",
    type: "admission",
    date: "ALU Admissions Open",
    href: "/academic#alagappa",
  },
  {
    text: "Alagappa University — exam hall tickets & time-tables available at Karur Study Centre.",
    type: "exam",
    date: "Exam Update",
    href: "/exam-update",
  },
];

/* =========================================================================== */
/* MILESTONES (Home — "Empowering Excellence")                                 */
/* =========================================================================== */

export const MILESTONES = [
  { value: "26+", label: "Years of Experience" },
  { value: "50,000+", label: "Graduates" },
  { value: "4", label: "Affiliated Universities" },
  { value: "3", label: "Branches (Karur, Dindigul, Kangeyam)" },
];

/* =========================================================================== */
/* ADMISSION PROCESS STEPS                                                     */
/* =========================================================================== */

export const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Obtain Form",
    description: "Collect the application form directly from our study centre.",
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
  establishedYear: "2001",
  intro:
    "Established in 2001 in Karur, Tamil Nadu, Karur Study Centre (KSC) is a premier distance education learning centre operating through our branches: Karur Coaching Centre in Karur, Pace Computers in Kangeyam, and S.S. Institute in Dindigul.",
  body: [
    "Established in 2001 in Karur, Tamil Nadu, Karur Study Centre (KSC) is a dedicated distance education learning centre. We operate through our network of branches: Karur Coaching Centre in Karur, Pace Computers in Kangeyam, and S.S. Institute in Dindigul. Since our inception, we have served as a vital bridge for students pursuing distance education programmes—including UG, PG, MBA, MCA, MSW, and Diploma courses offered by Alagappa University, Bharathidasan University, Tamil Nadu Open University, and Manonmaniam Sundaranar University. Our comprehensive services include guiding students to choose the right course, ensuring accurate application submissions, and providing continuous support from examinations through to final results.",
    "Our services are thoughtfully designed for working professionals, homemakers, and rural students seeking to pursue their desired degrees through accredited universities without disrupting their daily responsibilities. We facilitate admissions across premier UGC-recognized universities in Tamil Nadu via online and distance education modes, making quality higher education accessible and achievable.",
    "Our dedicated team accompanies you throughout your academic journey until graduation, offering personalised guidance, study material support, admission notifications, and timely examination result updates. Having guided over 50,000 students, Karur Study Centre (KSC) has grown into the region's most trusted name in distance education. All programmes are structured with flexible schedules to accommodate working professionals, homemakers, and anyone unable to attend regular college classes.",
  ],
  image: "/assets/images/ksc-founder-poster.jpg",
  membership: [
    "Admission-support relationship with Alagappa University (NAAC A++)",
    "Admission-support relationship with Bharathidasan University (NAAC A)",
    "Admission-support relationship with Manonmaniam Sundaranar University",
    "Recognised study-centre partnership with Tamilnadu Open University",
    "UGC-DEB recognised distance-education programmes (as applicable per university)",
  ],
};

/* =========================================================================== */
/* FOUNDER / CHAIRMAN MESSAGES                                                 */
/* =========================================================================== */

export const FOUNDER_MESSAGE = {
  name: "Founder",
  role: "Founder & Director",
  title: "Founder Message",
  subtitle: "Our Organization’s Strengths & Services",
  message:
    "For over 25 years, our organization has earned an outstanding reputation and deep trust among students through our centres: Karur Training Centre in Karur, Pace Computers in Kangeyam, and S.S. Institute in Dindigul. We offer expert guidance for distance education degree programmes in Science, Arts, Commerce, Management, and Information Technology through premier UGC-recognized universities. Placing your educational aspirations at the heart of our mission, we wholeheartedly wish you enduring success in your academic pursuits and future career.",
  image: "/assets/messages/founder.jpg",
};

export const CHAIRMAN_MESSAGE = {
  name: "Chairman",
  role: "Chairman & Managing Director",
  title: "Chairman Message",
  subtitle: "Education Illuminates Every Life",
  message:
    "Education is not merely theoretical knowledge; it is a beacon of light that illuminates an individual's life. Karur Study Centre operates with the steadfast commitment to deliver high-quality, career-oriented education to both rural and urban students. True to the timeless proverb, 'Those who persevere will never face defeat,' we stand ready to support your every effort. Our paramount duty is to pave the path for your progress, empowering underprivileged learners, working professionals, and ambitious students to acquire the wealth of education and achieve meaningful success.",
  image: "/assets/messages/chairman.jpg",
};

/* =========================================================================== */
/* BRANCHES (TODO placeholders)                                                */
/* =========================================================================== */

export const BRANCHES = [
  {
    name: "Karur Study Centre",
    location: "Karur",
    address: "M.R.S. Plaza, 3rd Floor, Near Mini Bus Stand, Karur - 639001",
    phone: "98652 23107, 93444 23107, 93622 23107",
    isHead: true,
    mapUrl: "https://maps.app.goo.gl/MJFWjrveBV3DQhi4A",
    mapEmbedUrl: "https://maps.google.com/maps?q=Karur+Study+Centre,+M.R.S.+Plaza,+Covai+Road,+Ramakrishna+Puram,+Karur,+Tamil+Nadu+639001&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    name: "S.S. Institute",
    location: "Dindigul",
    address: "75/38, Scheme Road, 2nd Floor, Raja Complex, Opposite Bus Stand, Dindigul - 3",
    phone: "90872 22107, 90472 22107",
    isHead: false,
    mapUrl: "https://maps.app.goo.gl/5MT1b3oKCiyhkxos6",
    mapEmbedUrl: "https://maps.google.com/maps?q=S.S.+Institute,+75/38,+Scheme+Road,+2nd+Floor,+Raja+Complex,+Dindigul&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    name: "Pace Computer",
    location: "Kangeyam",
    address: "57-59, LS-PS Complex, Main Road, Near Bus Stand, Kangeyam - 638701",
    phone: "98652 22107, 93622 24107",
    isHead: false,
    mapUrl: "https://maps.google.com/maps?q=Pace+Computer,+57-59,+LS-PS+Complex,+Main+Road,+Near+Bus+Stand,+Kangeyam+-+638701",
    mapEmbedUrl: "https://maps.google.com/maps?q=Pace+Computer,+57-59,+LS-PS+Complex,+Main+Road,+Near+Bus+Stand,+Kangeyam+-+638701&t=&z=16&ie=UTF8&iwloc=&output=embed",
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
/* FORMS                                                                        */
/* =========================================================================== */

export const FORM_ENDPOINT = "/api/contact"; // submissions land in the admin panel's "Enquiries" section

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