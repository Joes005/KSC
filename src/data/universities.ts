/**
 * =============================================================================
 * KARUR STUDY CENTER — AFFILIATED UNIVERSITIES & PROGRAMMES
 * =============================================================================
 * TNOU & BDU programme data below is confirmed real data for AY 2026 admission.
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
    recognition: "UGC-DEB approved distance education · Accredited by NAAC", // TODO: verify
    address: "", // TODO: BDU address (college/university centre in Tiruchirappalli)
    website: "", // TODO: BDU website
    categories: [
      {
        id: "ug",
        label: "UG Courses",
        count: 18,
        note: "Semester Pattern · General eligibility: Pass in 10+2 (subject-specific core requirements noted per course)",
        programmes: [
          { name: "B.A. Tamil", medium: "Tamil", pattern: "Semester", eligibility: "Pass in 10+2" },
          { name: "B.A. Economics", medium: "Tamil", pattern: "Semester", eligibility: "Pass in 10+2" },
          { name: "B.A. English", medium: "English", pattern: "Semester", eligibility: "Pass in 10+2" },
          { name: "B.A. History", medium: "Tamil", pattern: "Semester", eligibility: "Pass in 10+2" },
          { name: "B.A. Public Administration", medium: "English", pattern: "Semester", eligibility: "Pass in 10+2" },
          { name: "B.A. Political Science", medium: "English", pattern: "Semester", eligibility: "Pass in 10+2" },
          {
            name: "B.B.A.",
            medium: "Tamil / English",
            pattern: "Semester",
            eligibility:
              "Pass in 10+2 · 20% of seats reserved for vocational-stream candidates · Lateral entry to Year 2 for holders of 3-yr Diploma in Commerce / Modern Office Practice",
          },
          {
            name: "B.Com",
            medium: "Tamil / English",
            pattern: "Semester",
            eligibility: "Pass in 10+2 (Commerce or related stream preferred)",
          },
          {
            name: "B.Com Bank Management",
            medium: "English",
            pattern: "Semester",
            eligibility: "Pass in 10+2 (Commerce or related stream preferred)",
          },
          { name: "B.Sc. Mathematics", medium: "Tamil / English", pattern: "Semester", eligibility: "10+2 with Mathematics as a core subject" },
          { name: "B.Sc. Chemistry", medium: "English", pattern: "Semester", eligibility: "10+2 with Chemistry as a core subject" },
          { name: "B.Sc. Physics", medium: "English", pattern: "Semester", eligibility: "10+2 with Physics as a core subject" },
          { name: "B.Sc. Botany", medium: "English", pattern: "Semester", eligibility: "10+2 with Biology / Botany as a core subject" },
          { name: "B.Sc. Zoology", medium: "English", pattern: "Semester", eligibility: "10+2 with Biology / Zoology as a core subject" },
          { name: "B.Sc. Geography", medium: "English", pattern: "Semester", eligibility: "Pass in 10+2" },
          { name: "B.Sc. Computer Science", medium: "English", pattern: "Semester", eligibility: "10+2 with Mathematics as a core subject" },
          { name: "B.Sc. Information Technology", medium: "English", pattern: "Semester", eligibility: "10+2 with Mathematics as a core subject" },
          { name: "B.C.A.", medium: "English", pattern: "Semester", eligibility: "10+2 with Mathematics as a core subject" },
        ],
      },
      {
        id: "pg",
        label: "PG Courses",
        count: 16,
        note: "Semester Pattern · Eligibility in line with the university's prescribed UG-degree prerequisite",
        programmes: [
          { name: "M.A. Economics", medium: "English", pattern: "Semester", eligibility: "Bachelor's degree" },
          { name: "M.A. English", medium: "English", pattern: "Semester", eligibility: "Bachelor's degree" },
          { name: "M.A. Tamil", medium: "Tamil", pattern: "Semester", eligibility: "Bachelor's degree" },
          { name: "M.A. History", medium: "English", pattern: "Semester", eligibility: "Bachelor's degree" },
          { name: "M.Sc. Mathematics", medium: "English", pattern: "Semester", eligibility: "B.Sc. in Mathematics" },
          { name: "M.Sc. Chemistry", medium: "English", pattern: "Semester", eligibility: "B.Sc. in Chemistry" },
          { name: "M.Sc. Physics", medium: "English", pattern: "Semester", eligibility: "B.Sc. in Physics" },
          { name: "M.Sc. Botany", medium: "English", pattern: "Semester", eligibility: "B.Sc. in Botany" },
          { name: "M.Sc. Zoology", medium: "English", pattern: "Semester", eligibility: "B.Sc. in Zoology" },
          { name: "M.Sc. Computer Science", medium: "English", pattern: "Semester", eligibility: "B.Sc. / any science degree" },
          { name: "M.Sc. Geography", medium: "English", pattern: "Semester", eligibility: "B.Sc. in Geography" },
          { name: "M.Com", medium: "English", pattern: "Semester", eligibility: "B.Com or related commerce degree" },
          { name: "M.A. Human Resource Management", medium: "English", pattern: "Semester", eligibility: "Bachelor's degree" },
          { name: "M.Lib.I.Sc.", medium: "English", pattern: "Semester", eligibility: "Bachelor's degree" },
          { name: "M.B.A.", medium: "English", pattern: "Semester", eligibility: "Bachelor's degree" },
          { name: "M.C.A.", medium: "English", pattern: "Semester", eligibility: "BCA / B.Sc. with Mathematics background" },
        ],
      },
    ],
    exam: {
      note: "Bharathidasan University publishes hall tickets and semester time-tables on its official university portal for distance-education learners.",
      // TODO: swap in real BDU portals/PDFs
      hallTicketUrl: "https://www.bdu.ac.in/hall-ticket-portal",
      timetableUrl: "https://www.bdu.ac.in/exam-time-table",
      syllabusUrl: "https://www.bdu.ac.in/syllabus",
    },
  },

  /* =======================================================================
   * FUTURE UNIVERSITIES — append to this array as & when KSC adds partners.
   * e.g. copy the block below, fill id/name/exam links and programme tables.
   * =======================================================================
   * {
   *   id: "alagappa",
   *   name: "Alagappa University",
   *   shortName: "Alagappa",
   *   ... // TODO: add when affiliation is confirmed
   * }
   * ======================================================================= */
];

export const getUniversityBySlug = (slug: string) =>
  UNIVERSITIES.find((u) => u.id === slug);