import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { fetchSiteData } from './api';

// Static fallbacks for initial type inference
import { SITE_CONFIG, HERO, WHY_DISTANCE, ABOUT_SNAPSHOT, ABOUT_PAGE, VISION_MISSION_VALUES, NEWS_EVENTS, ADMISSION_STEPS, BRANCHES, FOUNDER_MESSAGE, CHAIRMAN_MESSAGE, CURRICULUM, USER_UPDATE_MODAL } from "../data/site-content";
import { UNIVERSITIES } from "../data/universities";
import { GALLERY } from "../data/gallery";
import { FACILITIES } from "../data/facilities";

const fallbackData = {
  settings: SITE_CONFIG,
  news_events: NEWS_EVENTS,
  facilities: FACILITIES,
  gallery_images: GALLERY,
  branches: BRANCHES,
  universities: UNIVERSITIES,
  hero: HERO,
  why_distance: WHY_DISTANCE,
  about_snapshot: ABOUT_SNAPSHOT,
  about_page: ABOUT_PAGE,
  vision_mission: VISION_MISSION_VALUES,
  admission_steps: ADMISSION_STEPS,
  founder_message: FOUNDER_MESSAGE,
  chairman_message: CHAIRMAN_MESSAGE,
  curriculum: CURRICULUM,
  user_update_modal: USER_UPDATE_MODAL,
  user_update_posters: [] as Array<{ id: number; image_path: string; is_active: boolean; sort_order: number }>,
  pages: {
    about: { about_page: ABOUT_PAGE },
    founder: { message: FOUNDER_MESSAGE },
    chairman: { message: CHAIRMAN_MESSAGE },
  } as Record<string, Record<string, unknown>>,
};

type SiteDataType = typeof fallbackData;

interface SiteContextType {
  data: SiteDataType;
  loading: boolean;
}

const SiteDataContext = createContext<SiteContextType>({
  data: fallbackData,
  loading: true,
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteDataType>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteData().then((apiData) => {
      setData({ ...fallbackData, ...apiData });
      setLoading(false);
    });
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, loading }}>
      {/* Remove blocking loading screen so the app loads instantly with fallback data */}
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
