import { Hero } from "../components/home/Hero";
import { NewsAndEventsBanner } from "../components/home/LegacyNewsAndEventsBanner";
import { AboutSnapshot } from "../components/home/AboutSnapshot";
import { WhyDistance } from "../components/home/WhyDistance";
import { VisionMissionValues } from "../components/home/VisionMissionValues";
import { Stats } from "../components/home/Stats";
import { UniversityStrip } from "../components/home/UniversityStrip";
import { UniversityCourses } from "../components/home/UniversityCourses";
import { FacilitiesSpotlight } from "../components/home/FacilitiesSpotlight";
import { AdmissionSteps } from "../components/home/AdmissionSteps";
import { GalleryStrip } from "../components/home/GalleryStrip";
import { CtaBand } from "../components/home/LegacyNewsAndEventsBanner";
import { useScrollReveal } from "../components/home/SharedHooks";

export function Home() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <NewsAndEventsBanner />
      <AboutSnapshot />
      <WhyDistance />
      <VisionMissionValues />
      <Stats />
      <UniversityStrip />
      <UniversityCourses />
      <FacilitiesSpotlight />
      <AdmissionSteps />
      <GalleryStrip />
      <CtaBand />
    </>
  );
}
