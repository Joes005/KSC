import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { fetchSiteData } from './api';

// Static fallbacks for initial type inference
import { SITE_CONFIG, HERO, WHY_DISTANCE, ABOUT_SNAPSHOT, VISION_MISSION_VALUES, NEWS_EVENTS, ADMISSION_STEPS, BRANCHES, FOUNDER_MESSAGE, CHAIRMAN_MESSAGE, CURRICULUM } from "../data/site-content";
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
  vision_mission: VISION_MISSION_VALUES,
  admission_steps: ADMISSION_STEPS,
  founder_message: FOUNDER_MESSAGE,
  chairman_message: CHAIRMAN_MESSAGE,
  curriculum: CURRICULUM,
  pages: {} as Record<string, Record<string, unknown>>,
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
      setData(apiData);
      setLoading(false);
    });
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, loading }}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center bg-[#063731]">
          <div className="text-center text-white">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-ksc-gold border-t-transparent mx-auto"></div>
            <p className="font-bold tracking-widest text-ksc-gold uppercase">Loading KSC...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
