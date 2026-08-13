/**
 * =============================================================================
 * KARUR STUDY CENTER — AFFILIATED UNIVERSITIES & PROGRAMMES
 * =============================================================================
 * TNOU, BDU & ALU programme data below is confirmed real data for AY 2026 admission.
 * More universities (if any) should be appended as new University objects here.
 * "TODO" marks the fields still awaiting real values.
 * =============================================================================
 */

export interface Programme {
  name: string;
  medium: string;
  /** Semester / Non-Semester / etc. (TNOU supplies this; BDU is Semester) */
  pattern?: string;
  /** Duration where known, e.g. "Min 3 Yrs to Max 6 Yrs" */
  duration?: string;
  /** Eligibility line (BDU supplies per-course eligibility) */
  eligibility?: string;
}

export interface ProgrammeCategory {
  id: string; // used as tab id, e.g. "ug", "pg"
  label: string; // e.g. "UG Programmes"
  count?: number; // optional program count badge
  note?: string; // e.g. "Duration: Min 3 Yrs to Max 6 Yrs"
  programmes: Programme[];
}

export interface University {
  id: string; // slug used for /academic#<id>
  name: string;
  shortName: string;
  academicYear: string;
  pattern?: string; // e.g. "Semester Pattern"
  recognition?: string; // UGC-DEB / NAAC accreditation notes
  address?: string;
  website?: string;
  logo: string;
  categories: ProgrammeCategory[];
  exam: {
    /** Short intro shown on the Exam Update page */
    note: string;
    /** Placeholder href → swap in the real hall-ticket portal URL */
    hallTicketUrl: string;
    /** Placeholder href → swap in the real time-table PDF URL */
    timetableUrl: string;
    /** Placeholder href → swap in the real syllabus PDF list later */
    syllabusUrl: string;
  };
}

/* =========================================================================== */
/* TAMIL NADU OPEN UNIVERSITY (TNOU)                                           */
/* =========================================================================== */

const TNOU_UG: Programme[] = [
  { name: "B.A. Tamil", medium: "Tamil", pattern: "Non-Semester" },
  { name: "B.A. English", medium: "English", pattern: "Semester" },
  { name: "B.A. Economics", medium: "Tamil / English", pattern: "Semester" },
  { name: "B.A. History", medium: "Tamil / English", pattern: "Semester" },
  { name: "B.A. Political Science", medium: "Tamil / English", pattern: "Semester" },
  { name: "B.A. Sociology", medium: "Tamil / English", pattern: "Semester" },
  { name: "B.B.A.", medium: "Tamil / English", pattern: "Semester" },
  { name: "B.C.A. & LE", medium: "English", pattern: "Semester" },
  { name: "B.Com", medium: "Tamil / English", pattern: "Semester" },
  { name: "B.Sc. Chemistry", medium: "English", pattern: "Semester" },
  { name: "B.Sc. Botany", medium: "English", pattern: "Semester" },
  { name: "B.Sc. Physics", medium: "English", pattern: "Semester" },
  { name: "B.Sc. Zoology", medium: "English", pattern: "Semester" },
  { name: "B.Sc. Mathematics", medium: "English", pattern: "Semester" },
];

const TNOU_PG: Programme[] = [
  { name: "M.A. Tamil", medium: "Tamil", pattern: "Non-Semester" },
  { name: "M.A. English", medium: "English", pattern: "Non-Semester" },
  { name: "M.A. History", medium: "Tamil / English", pattern: "Semester" },
  { name: "M.A. Political Science", medium: "Tamil / English", pattern: "Semester" },
  { name: "M.A. Sociology", medium: "Tamil / English", pattern: "Semester" },
  { name: "M.Com", medium: "English", pattern: "Semester" },
  { name: "M.Sc. Mathematics", medium: "English", pattern: "Semester" },
  { name: "Master of Social Work (MSW)", medium: "Tamil / English", pattern: "Semester" },
  { name: "M.B.A", medium: "English", pattern: "Semester" },
  { name: "M.Sc. Zoology", medium: "English", pattern: "Non-Semester" },
  { name: "M.Sc. Physics", medium: "English", pattern: "Semester" },
  { name: "M.Sc. Botany", medium: "English", pattern: "Non-Semester" },
  { name: "M.Sc. Geography", medium: "English", pattern: "Semester" },
  { name: "M.A. Criminology and Criminal Justice Admin", medium: "English", pattern: "Non-Semester" },
];

const TNOU_DIPLOMA: Programme[] = [
  { name: "Nutrition and Health Education", medium: "English" },
  { name: "Wild Life Tourism", medium: "English" },
  { name: "Archaeology and Epigraphy", medium: "English" },
  { name: "Tourism and Tour Operations Management", medium: "English" },
  { name: "Journalism", medium: "English" },
  { name: "Media Arts", medium: "Tamil" },
  { name: "Silambam", medium: "Tamil" },
  { name: "Tamil Research Methodology", medium: "Tamil" },
  { name: "Human Rights", medium: "Tamil / English" },
  { name: "International Relations", medium: "English" },
  { name: "Fashion Designing and Boutique Management", medium: "Tamil / English" },
];

const TNOU_CERTIFICATE: Programme[] = [
  { name: "Course in Conservation Techniques", medium: "English" },
  { name: "Modern Techniques and Technology in Teaching Mathematics", medium: "English" },
  { name: "ICT in Functional Tamil", medium: "Tamil" },
  { name: "Brain Based Learning Techniques", medium: "English" },
  { name: "Advanced Technological Applications in Teaching Mathematics", medium: "English" },
  { name: "Adolescence Education", medium: "English" },
  { name: "BS-VI: Emission Standards", medium: "English" },
  { name: "Environmental Conservation", medium: "English" },
  { name: "Aquaculture", medium: "English" },
  { name: "Thirukural", medium: "Tamil" },
  { name: "Enterpreneurship Development", medium: "English" },
  { name: "Silambam", medium: "Tamil" },
];

const TNOU_VOCATIONAL: Programme[] = [
  { name: "Office-Automation", medium: "Tamil / English" },
  { name: "In-Design", medium: "Tamil / English" },
  { name: "Vehicle Mechanic", medium: "Tamil / English" },
  { name: "Refrigeration & AC Technician", medium: "Tamil / English" },
  { name: "Fashion Design & Garment Making", medium: "Tamil / English" },
  { name: "Beauty Therapist", medium: "Tamil / English" },
  { name: "Acupressure Therapist", medium: "Tamil / English" },
  { name: "General Duty Assistant", medium: "Tamil / English" },
  { name: "Industrial Fitter", medium: "English" },
  { name: "Welding Technology", medium: "English" },
  { name: "Early Childhood Care & Education", medium: "Tamil / English" },
];

const TNOU_ADV_VOCATIONAL: Programme[] = [
  { name: "General Duty Assistant", medium: "Tamil / English" },
  { name: "General Duty Assistant (Lateral Entry)", medium: "Tamil / English" },
];

const TNOU_SHORT_TERM: Programme[] = [
  { name: "Logistics and Supply Chain Management", medium: "English" },
  { name: "Life Skills and Personality Development", medium: "English" },
  { name: "Thirukural", medium: "Tamil" },
  { name: "Road Safety & First Aid", medium: "Tamil" },
  { name: "Office Automation", medium: "Tamil / English" },
  { name: "Basic Computer Operations", medium: "Tamil / English" },
  { name: "Industrial Safety & Security", medium: "English" },
  { name: "Cold Storage Management", medium: "English" },
  { name: "Beautician", medium: "English" },
  { name: "Social Justice", medium: "Tamil / English" },
  { name: "Dr. B. R. Ambedkar Thoughts", medium: "Tamil / English" },
  { name: "Theatre Arts", medium: "Tamil" },
];

export const UNIVERSITIES: University[] = [
  {
    id: "tnou",
    name: "Tamil Nadu Open University",
    shortName: "TNOU",
    academicYear: "2026",
    pattern: "Semester & Non-Semester depending on programme",
    recognition:
      "State Open University, Govt. of Tamil Nadu · Approved by UGC-DEB · Accredited NAAC A+",
    address: "No. 577, Anna Salai, Saidapet, Chennai – 600015, Tamil Nadu",
    website: "www.tnou.ac.in",
    logo: "/assets/logo/Tamil_Nadu_Open_University_Logo_HD (2).png",
    categories: [
      {
        id: "ug",
        label: "UG Programmes",
        count: 14,
        note: "Duration: Min 3 Yrs to Max 6 Yrs",
        programmes: TNOU_UG,
      },
      {
        id: "pg",
        label: "PG Programmes",
        count: 14,
        note: "Duration: Min 2 Yrs to Max 4 Yrs",
        programmes: TNOU_PG,
      },
      {
        id: "diploma",
        label: "Diploma Programmes",
        count: 11,
        note: "Duration: 1 Year",
        programmes: TNOU_DIPLOMA,
      },
      {
        id: "certificate",
        label: "Certificate Programmes",
        count: 12,
        note: "Duration: 6 Months",
        programmes: TNOU_CERTIFICATE,
      },
      {
        id: "vocational",
        label: "Vocational Diploma Programmes",
        count: 11,
        note: "Duration: 1 Year",
        programmes: TNOU_VOCATIONAL,
      },
      {
        id: "adv-vocational",
        label: "Adv. Vocational Diploma Programmes",
        count: 2,
        note: "Duration: 2 Years",
        programmes: TNOU_ADV_VOCATIONAL,
      },
      {
        id: "short-term",
        label: "Short Term Programmes",
        count: 12,
        note: "Duration: 3 Months",
        programmes: TNOU_SHORT_TERM,
      },
    ],
    exam: {
      note: "TNOU publishes time-tables and hall tickets on its official student portal several weeks before each examination cycle.",
      // TODO: swap in real TNOU portals/PDFs
      hallTicketUrl: "https://tnou.ac.in/hall-ticket-portal",
      timetableUrl: "https://tnou.ac.in/exam-time-table",
      syllabusUrl: "https://tnou.ac.in/syllabus",
    },
  },

  /* =========================================================================== */
  /* BHARATHIDASAN UNIVERSITY (BDU)                                              */
  /* =========================================================================== */

  {
    id: "bdu",
    name: "Bharathidasan University",
    shortName: "BDU",
    academicYear: "2026-27",
    pattern: "Semester Pattern",
    // TODO: confirm the exact recognition line for BDU CDOE
    recognition: "UGC-DEB approved distance education · Accredited by NAAC",
    address: "Palkalaiperur, Tiruchirappalli – 620024, Tamil Nadu",
    website: "www.bdu.ac.in",
    logo: "/assets/logo/Bharathidasan_University_Logo_HD (5).png",
    categories: [
      {
        id: "ug",
        label: "UG Courses",
        count: 18,
        note: "Semester Pattern (AY 2026-27) · General eligibility: Pass in 10+2 with subject-specific core requirements as noted",
        programmes: [
          { name: "B.A. Tamil", medium: "Tamil", pattern: "Semester", eligibility: "A pass in 10+2 with Tamil as a Language Paper" },
          { name: "B.A. Economics", medium: "Tamil", pattern: "Semester", eligibility: "A pass in Higher Secondary Examination (10+2)" },
          { name: "B.A. English", medium: "English", pattern: "Semester", eligibility: "A pass in Higher Secondary Examination (10+2)" },
          { name: "B.A. History", medium: "Tamil", pattern: "Semester", eligibility: "A pass in Higher Secondary Examination (10+2)" },
          { name: "B.A. Public Administration", medium: "English", pattern: "Semester", eligibility: "A pass in Higher Secondary Examination (10+2)" },
          { name: "B.A. Political Science", medium: "English", pattern: "Semester", eligibility: "A pass in Higher Secondary Examination (10+2)" },
          {
            name: "B.B.A.",
            medium: "Tamil / English",
            pattern: "Semester",
            eligibility:
              "A pass in 10+2 with Commerce & Accountancy. 20% of seats reserved for Vocational Stream candidates. Lateral entry (Year 2) for holders of a 3-year Diploma in Commerce / Modern Office Practice.",
          },
          {
            name: "B.Com",
            medium: "Tamil / English",
            pattern: "Semester",
            eligibility:
              "A pass in 10+2 with Commerce & Accountancy. 20% of seats reserved for Vocational Stream candidates. Lateral entry (Year 2) for holders of a 3-year Diploma in Commerce / Modern Office Practice.",
          },
          {
            name: "B.Com Bank Management",
            medium: "English",
            pattern: "Semester",
            eligibility: "A pass in Higher Secondary Examination (10+2)",
          },
          { name: "B.Sc. Mathematics", medium: "Tamil / English", pattern: "Semester", eligibility: "10+2 with Mathematics as one of the core subjects" },
          { name: "B.Sc. Chemistry", medium: "English", pattern: "Semester", eligibility: "10+2 with Chemistry as one of the core subjects" },
          { name: "B.Sc. Physics", medium: "English", pattern: "Semester", eligibility: "10+2 with Physics as one of the core subjects" },
          { name: "B.Sc. Botany", medium: "English", pattern: "Semester", eligibility: "10+2 with Botany or Biology along with Chemistry" },
          {
            name: "B.Sc. Zoology",
            medium: "English",
            pattern: "Semester",
            eligibility: "10+2 with Maths, Physics, Chemistry, Biology (OR) Physics, Chemistry, Botany, Zoology (OR) Biology as one of the core subjects",
          },
          { name: "B.Sc. Geography", medium: "English", pattern: "Semester", eligibility: "A pass in Higher Secondary Examination (10+2)" },
          { name: "B.Sc. Computer Science", medium: "English", pattern: "Semester", eligibility: "10+2 with Computer Science or Mathematics as one of the core subjects" },
          { name: "B.Sc. Information Technology", medium: "English", pattern: "Semester", eligibility: "A pass in Higher Secondary Examination (10+2)" },
          { name: "B.C.A.", medium: "English", pattern: "Semester", eligibility: "10+2 with Mathematics as one of the core subjects" },
        ],
      },
      {
        id: "pg",
        label: "PG Courses",
        count: 16,
        note: "Semester Pattern (AY 2026-27) · Eligibility in line with the university's prescribed UG-degree prerequisite",
        programmes: [
          { name: "M.A. Economics", medium: "English", pattern: "Semester", eligibility: "B.A. Economics / Econometrics" },
          { name: "M.A. English", medium: "English", pattern: "Semester", eligibility: "B.A. English Literature (OR) any UG degree with English as Part-II Language" },
          { name: "M.A. Tamil", medium: "Tamil", pattern: "Semester", eligibility: "B.A. Tamil / B.Lit / B.A. Applied Tamil / Pulavar Degree (OR) any UG degree with Tamil as Part-I Language" },
          { name: "M.A. History", medium: "Tamil / English", pattern: "Semester", eligibility: "Any Undergraduate (UG) Degree" },
          { name: "M.Sc. Mathematics", medium: "English", pattern: "Semester", eligibility: "B.Sc. Mathematics" },
          { name: "M.Sc. Chemistry", medium: "English", pattern: "Semester", eligibility: "B.Sc. Chemistry" },
          { name: "M.Sc. Physics", medium: "English", pattern: "Semester", eligibility: "B.Sc. Physics" },
          { name: "M.Sc. Botany", medium: "English", pattern: "Semester", eligibility: "B.Sc. Botany" },
          { name: "M.Sc. Zoology", medium: "English", pattern: "Semester", eligibility: "B.Sc. Zoology" },
          { name: "M.Sc. Computer Science", medium: "English", pattern: "Semester", eligibility: "B.Sc. Computer Science / B.Sc. IT / BCA / Software Development (OR) equivalent degree accepted by the syndicate" },
          { name: "M.Sc. Geography", medium: "English", pattern: "Semester", eligibility: "B.Sc. Geography" },
          {
            name: "M.Com",
            medium: "English",
            pattern: "Semester",
            eligibility: "B.Com / Bank Management / Computer Applications / Financial Management / B.Com (Applied) / Co-operation / BBA",
          },
          { name: "M.A. Human Resource Management", medium: "English", pattern: "Semester", eligibility: "Any UG Degree in Arts or Science" },
          { name: "M.Lib.I.Sc.", medium: "English", pattern: "Semester", eligibility: "B.Lib.I.Sc." },
          { name: "M.B.A.", medium: "English", pattern: "Semester", eligibility: "A pass in a recognised Bachelor's Degree" },
          {
            name: "M.C.A.",
            medium: "English",
            pattern: "Semester",
            eligibility:
              "BCA / B.Sc. Computer Science / B.Sc. IT / B.E.(CSE) / B.Tech IT (or) any graduation with Mathematics at 10+2 or graduation level (or) B.Com (CA) with Business Mathematics / Statistics as a core subject",
          },
        ],
      },
    ],
    exam: {
      note: "Bharathidasan University publishes hall tickets and semester time-tables on its official university portal for distance-education learners.",
      hallTicketUrl: "https://bdu.ac.in/cde/ht24w/",
      timetableUrl: "/pdf/BDU-New-Sem-Pattern-Courses.pdf",
      syllabusUrl: "https://www.bdu.ac.in",
    },
  },

  /* =========================================================================== */
  /* ALAGAPPA UNIVERSITY (ALU) — CDOE                                            */
  /* =========================================================================== */

  {
    id: "alagappa",
    name: "Alagappa University",
    shortName: "ALU",
    academicYear: "2026",
    pattern: "Semester Pattern",
    recognition: "State University, Karaikudi · Centre for Distance and Online Education (CDOE) · UGC-DEB approved",
    address: "Alagappa Nagar, Karaikudi – 630003, Tamil Nadu",
    website: "www.alagappauniversity.ac.in",
    logo: "/assets/logo/Alagappa_University_Logo_HD.png",
    categories: [
      {
        id: "ug",
        label: "UG Programmes",
        count: 7,
        note: "Duration: 3 Years · A pass in HSC (10+2), or 3-year Diploma, or ITI (2-year programme)",
        programmes: [
          { name: "B.A. Tamil", medium: "Tamil", pattern: "Semester", eligibility: "A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)" },
          { name: "B.A. English", medium: "English", pattern: "Semester", eligibility: "A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)" },
          { name: "B.B.A.", medium: "English & Tamil", pattern: "Semester", eligibility: "A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)" },
          { name: "B.Com", medium: "English & Tamil", pattern: "Semester", eligibility: "A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)" },
          { name: "B.Com (Computer Application)", medium: "English", pattern: "Semester", eligibility: "A pass in HSC (10+2) / 3-year Diploma / ITI (2-year programme)" },
          { name: "B.Sc. Mathematics", medium: "English", pattern: "Semester", eligibility: "A pass in HSC (10+2) / 3-year Diploma with Mathematics" },
          { name: "B.Sc. Computer Science", medium: "English", pattern: "Semester", eligibility: "A pass in HSC (10+2) / 3-year Diploma with Mathematics" },
        ],
      },
      {
        id: "pg",
        label: "PG Programmes",
        count: 16,
        note: "Duration: 2 Years · Bachelor Degree from a recognized university (specific prerequisites noted per course)",
        programmes: [
          { name: "M.A. Tamil", medium: "Tamil", pattern: "Semester", eligibility: "Bachelor Degree with Tamil as a course" },
          { name: "M.A. English", medium: "English", pattern: "Semester", eligibility: "Bachelor Degree with English as a course" },
          { name: "M.A. History", medium: "English & Tamil", pattern: "Semester", eligibility: "Bachelor Degree from a recognized university" },
          { name: "M.A. Economics", medium: "English & Tamil", pattern: "Semester", eligibility: "Bachelor Degree from a recognized university" },
          { name: "Master of Social Work (MSW)", medium: "English", pattern: "Semester", eligibility: "Bachelor Degree from a recognized university" },
          { name: "M.Sc. Mathematics", medium: "English", pattern: "Semester", eligibility: "B.Sc. Mathematics / Applied Mathematics" },
          { name: "M.Sc. Computer Science", medium: "English", pattern: "Semester", eligibility: "Bachelor Degree with Mathematics at +2 Level" },
          { name: "M.Sc. Information Technology", medium: "English", pattern: "Semester", eligibility: "Bachelor Degree from a recognized university" },
          {
            name: "Master of Computer Applications (MCA)",
            medium: "English",
            pattern: "Semester",
            eligibility:
              "B.Sc. Mathematics / Statistics / Applied Sciences / Computer Science / IT (OR) B.Sc. Physics / Chemistry / Electronics with Mathematics as ancillary (OR) BCA / B.Com / BBA. Should have studied 10+2+3 pattern with Mathematics / Statistics / Business Mathematics at +2 level.",
          },
          { name: "M.Sc. Chemistry", medium: "English", pattern: "Semester", eligibility: "B.Sc. Chemistry" },
          { name: "M.Sc. Physics", medium: "English", pattern: "Semester", eligibility: "B.Sc. Physics" },
          { name: "M.Sc. Botany", medium: "English", pattern: "Semester", eligibility: "Bachelor Degree in Botany / Plant Science / Plant Biology / Plant Biotechnology" },
          {
            name: "M.Sc. Zoology",
            medium: "English",
            pattern: "Semester",
            eligibility: "Bachelor Degree in Zoology / Animal Science / Life Science with Chemistry / Biochemistry / Microbiology / Botany as an ancillary subject",
          },
          {
            name: "M.Com",
            medium: "English",
            pattern: "Semester",
            eligibility: "Bachelor Degree in Commerce / B.Com(CA) / B.Com(CS) / B.Com(CS & CA) / BCS / BBM / BBA",
          },
          { name: "M.B.A.", medium: "English", pattern: "Semester", eligibility: "Bachelor Degree from a recognized university" },
          { name: "M.Lib.I.Sc.", medium: "English", pattern: "Semester", eligibility: "B.Lib.I.Sc. Degree from a recognized university" },
        ],
      },
      {
        id: "diploma",
        label: "Diploma Programmes",
        count: 4,
        note: "Duration: 1 Year · Eligibility: 10+2 / 10+3",
        programmes: [
          { name: "Montessori Education", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "Computer Applications", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "Artificial Intelligence and Machine Learning", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3 with Mathematics / Statistics / Business Mathematics" },
          { name: "Cyber Security", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3 with Mathematics / Statistics / Business Mathematics" },
        ],
      },
      {
        id: "certificate",
        label: "Certificate Programmes",
        count: 8,
        note: "Duration: 6 Months · Eligibility: 10+2 / 10+3",
        programmes: [
          { name: "Library & Information Science", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "Office Automation", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "Gender Studies", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "C Programming", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "Computer Fundamentals", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "Web Designing", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "GST", medium: "English", pattern: "Non-Semester", eligibility: "10+2 / 10+3" },
          { name: "Astrology", medium: "Tamil", pattern: "Non-Semester", eligibility: "10+2 / 10+3 · Tamil medium only" },
        ],
      },
    ],
    exam: {
      note: "Alagappa University publishes hall tickets and exam time-tables on its official MIS/distance student portal for CDOE learners.",
      hallTicketUrl: "https://mis.alagappauniversity.ac.in/distance/student_main.php",
      timetableUrl: "/pdf/ALU-CDOE-Prospectus-AY-2026.pdf",
      syllabusUrl: "https://www.alagappauniversity.ac.in",
    },
  },

  /* =========================================================================== */
  /* MANONMANIAM SUNDARANAR UNIVERSITY (MSU)                                     */
  /* =========================================================================== */

  {
    id: "msu",
    name: "Manonmaniam Sundaranar University",
    shortName: "MSU",
    academicYear: "2026",
    pattern: "Semester / Non-Semester",
    recognition: "State University · UGC-DEB Approved",
    address: "Tirunelveli, Tamil Nadu",
    website: "www.msuniv.ac.in",
    logo: "/assets/logo/Periyar_University_Logo_HD.png",
    categories: [], // Empty for now until courses are provided
    exam: {
      note: "Manonmaniam Sundaranar University publishes exam details on its official distance education portal.",
      hallTicketUrl: "https://www.msuniv.ac.in/Distance-Education",
      timetableUrl: "https://www.msuniv.ac.in/Distance-Education",
      syllabusUrl: "https://www.msuniv.ac.in/Distance-Education",
    },
  },

  /* =========================================================================== */
  /* FUTURE UNIVERSITIES — append to this array as & when KSC adds partners.     */
  /* =========================================================================== */
];

export const getUniversityBySlug = (slug: string) =>
  UNIVERSITIES.find((u) => u.id === slug);