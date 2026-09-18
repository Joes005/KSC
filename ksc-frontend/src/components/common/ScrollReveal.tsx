import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    const revealAll = () => sections.forEach((section) => section.classList.add("is-visible"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    sections.forEach((section, index) => {
      section.classList.add("reveal-section");
      section.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 45}ms`);
    });

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.08 }
      );
    } catch {
      revealAll();
      return;
    }

    sections.forEach((section) => observer.observe(section));

    // Safety net: on older/slower browsers the observer can fail to fire for
    // some sections, leaving them permanently at opacity:0 (blank).
    const fallback = window.setTimeout(revealAll, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
