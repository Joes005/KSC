import { SITE_CONFIG, HERO, WHY_DISTANCE, ABOUT_SNAPSHOT, VISION_MISSION_VALUES, NEWS_EVENTS, ADMISSION_STEPS, BRANCHES, FOUNDER_MESSAGE, CHAIRMAN_MESSAGE, CURRICULUM } from "../data/site-content";
import { UNIVERSITIES } from "../data/universities";
import { GALLERY } from "../data/gallery";
import { FACILITIES } from "../data/facilities";
import type { NewsEvent as NewsEventType } from "../data/site-content";
import type { University } from "../data/universities";
import type { GalleryItem } from "../data/gallery";
import type { Facility } from "../data/facilities";

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "";

type FlatSettings = Record<string, any>;
type PageMap = Record<string, Record<string, any>>;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Convert "site.admissionYear" -> "site.admission_year" (+ nested levels). */
function toSnakeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase();
}

/** Walk a static default object and override leaf values from the flat
 *  key=>value settings table (keys like "contact.phone"). */
function applySettings<T>(defaults: T, flat: FlatSettings, prefix = "site"): T {
  if (defaults === null || typeof defaults !== "object" || Array.isArray(defaults)) {
    return defaults;
  }
  const out: Record<string, any> = {};
  for (const k of Object.keys(defaults)) {
    const camel = prefix ? `${prefix}.${k}` : k;
    const snake = toSnakeKey(camel);
    const value = (defaults as any)[k];
    if (camel in flat) {
      out[k] = flat[camel] ?? value;
    } else if (snake in flat) {
      out[k] = flat[snake] ?? value;
    } else {
      out[k] = applySettings(value, flat, camel);
    }
  }
  return out as T;
}

/** Convert a stored asset path to a browser-usable URL. */
function toAsset(path?: string | null): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/storage/")) return `${API_URL}${path}`;
  if (path.startsWith("storage/")) return `${API_URL}/storage/${path.slice("storage/".length)}`;
  return path;
}

/** Load a JSON section stored under pages[pageKey][sectionKey]. */
function pageSection<T>(pages: PageMap, pageKey: string, sectionKey: string, fallback: T): T {
  const value = pages?.[pageKey]?.[sectionKey];
  return (value === undefined || value === null) ? fallback : (value as T);
}

/* ------------------------------------------------------------------ */
/* Mappers                                                             */
/* ------------------------------------------------------------------ */

function mapNews(list: any[]): NewsEventType[] {
  return (list ?? []).map((n) => {
    const badge = String(n.badge ?? "").toLowerCase();
    const allowed: NewsEventType["type"][] = ["admission", "deadline", "exam", "event"];
    const type = allowed.includes(badge as NewsEventType["type"]) ? (badge as NewsEventType["type"]) : "event";
    return {
      text: n.title ?? "",
      type,
      href: n.link || undefined,
      date: n.badge || undefined,
    };
  });
}

function mapFacilities(list: any[]): Facility[] {
  return (list ?? []).map((f) => ({
    icon: String(f.icon ?? ""),
    image: toAsset(f.image_path) || undefined,
    title: f.title ?? "",
    description: f.description ?? "",
  }) as unknown as Facility);
}

function mapGallery(list: any[]): GalleryItem[] {
  return (list ?? []).map((g) => ({
    id: String(g.id ?? Math.random().toString(36).slice(2)),
    src: toAsset(g.image_path),
    alt: g.alt || g.caption || "Gallery image",
    caption: g.caption || g.alt || "Gallery image",
  }));
}

function mapBranches(list: any[]): typeof BRANCHES {
  return (list ?? []).map((b) => ({
    name: b.name ?? "",
    address: b.address ?? "",
    phone: b.phone ?? "",
    isHead: Boolean(b.is_head_office),
  }));
}

function mapUniversities(list: any[]): University[] {
  return (list ?? []).map((u) => ({
    id: u.slug ?? "",
    name: u.name ?? "",
    shortName: u.short_name ?? "",
    academicYear: u.academic_year ?? "",
    pattern: u.pattern || undefined,
    recognition: u.recognition || undefined,
    address: u.address || undefined,
    website: u.website || undefined,
    logo: String(u.logo ?? ""),
    categories: (u.categories ?? []).map((c: any) => ({
      id: c.slug ?? "",
      label: c.label ?? "",
      count: c.count ?? (c.programmes ?? []).length,
      note: c.note || undefined,
      programmes: (c.programmes ?? []).map((p: any) => ({
        name: p.name ?? "",
        medium: p.medium ?? "",
        pattern: p.pattern,
        duration: p.duration,
        eligibility: p.eligibility,
      })),
    })),
    exam: {
      note: u.exam_note || "",
      hallTicketUrl: u.exam_hall_ticket_url || "",
      timetableUrl: u.exam_timetable_url || "",
      syllabusUrl: u.exam_syllabus_url || "",
    },
  }));
}

/* ------------------------------------------------------------------ */
/* Main fetch                                                          */
/* ------------------------------------------------------------------ */

export async function fetchSiteData() {
  let api: { settings?: FlatSettings; pages?: PageMap; [k: string]: any } = {};

  try {
    const response = await fetch(`${API_URL}/api/site-data`);
    if (response.ok) {
      const json = await response.json();
      api = json && typeof json === "object" ? json : {};
    }
  } catch (error) {
    console.warn("KSC: API unavailable — using static fallback content.", error);
  }

  const flat = api.settings ?? {};
  const pages = api.pages ?? {};

  const universitiesApi = Array.isArray(api.universities) && api.universities.length
    ? mapUniversities(api.universities)
    : UNIVERSITIES;

  const afterAbout = pageSection(pages, "about", "about_page", ABOUT_SNAPSHOT);

  return {
    settings: applySettings(SITE_CONFIG, flat),
    news_events: Array.isArray(api.news_events) && api.news_events.length
      ? mapNews(api.news_events)
      : NEWS_EVENTS,
    facilities: Array.isArray(api.facilities) && api.facilities.length
      ? mapFacilities(api.facilities)
      : FACILITIES,
    gallery_images: Array.isArray(api.gallery_images) && api.gallery_images.length
      ? mapGallery(api.gallery_images)
      : GALLERY,
    branches: Array.isArray(api.branches) && api.branches.length
      ? mapBranches(api.branches)
      : BRANCHES,
    universities: universitiesApi,
    hero: pageSection(pages, "home", "hero", HERO),
    why_distance: pageSection(pages, "home", "why_distance", WHY_DISTANCE),
    about_snapshot: {
      ...ABOUT_SNAPSHOT,
      ...afterAbout,
    },
    vision_mission: pageSection(pages, "home", "vision_mission", VISION_MISSION_VALUES),
    admission_steps: pageSection(pages, "home", "admission_steps", ADMISSION_STEPS),
    founder_message: pageSection(pages, "founder", "message", FOUNDER_MESSAGE),
    chairman_message: pageSection(pages, "chairman", "message", CHAIRMAN_MESSAGE),
    curriculum: pageSection(pages, "curriculum", "content", CURRICULUM),
    pages,
  };
}