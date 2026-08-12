import { SITE_CONFIG, HERO, WHY_DISTANCE, ABOUT_SNAPSHOT, VISION_MISSION_VALUES, NEWS_EVENTS, ADMISSION_STEPS, BRANCHES } from "../data/site-content";
import { UNIVERSITIES } from "../data/universities";
import { GALLERY } from "../data/gallery";
import { FACILITIES } from "../data/facilities";

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function fetchSiteData() {
  try {
    const response = await fetch(`${API_URL}/api/site-data`);
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    
    return {
      settings: data.settings && Object.keys(data.settings).length > 0 ? data.settings : SITE_CONFIG,
      news_events: data.news_events && data.news_events.length > 0 ? data.news_events : NEWS_EVENTS,
      facilities: data.facilities && data.facilities.length > 0 ? data.facilities : FACILITIES,
      gallery_images: data.gallery_images && data.gallery_images.length > 0 ? data.gallery_images : GALLERY,
      branches: data.branches && data.branches.length > 0 ? data.branches : BRANCHES,
      universities: data.universities && data.universities.length > 0 ? data.universities : UNIVERSITIES,
      hero: HERO, // Keeping complex nested text static for now unless overridden in DB
      why_distance: WHY_DISTANCE,
      about_snapshot: ABOUT_SNAPSHOT,
      vision_mission: VISION_MISSION_VALUES,
      admission_steps: ADMISSION_STEPS,
    };
  } catch (error) {
    console.warn("Using static fallback data because API is unavailable or empty", error);
    return {
      settings: SITE_CONFIG,
      news_events: NEWS_EVENTS,
      facilities: FACILITIES,
      gallery_images: GALLERY,
      branches: BRANCHES,
      universities: UNIVERSITIES,
      hero: HERO,
      why_distance: WHY_DISTANCE,
      about_snapshot: ABOUT_SNAPSHOT,
      vision_mission: VISION_MISSION_VALUES,
      admission_steps: ADMISSION_STEPS,
    };
  }
}
