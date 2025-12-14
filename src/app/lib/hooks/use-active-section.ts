import { useEffect, useState } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update if the section is intersecting and has an id
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Trigger when section is 50% visible
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    // Observe all sections with an id attribute
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Cleanup
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return activeSection;
}

interface UseActiveSectionOptions {
  rootMargin?: string;
  threshold?: number | number[];
  defaultSection?: string;
}

export function useActiveSectionWithOptions(
  options: UseActiveSectionOptions = {}
) {
  const {
    rootMargin = '-50% 0px -50% 0px',
    threshold = 0,
    defaultSection = 'hero',
  } = options;

  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let mostVisibleEntry = entries[0];
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleEntry = entry;
          }
        });

        if (mostVisibleEntry?.isIntersecting && mostVisibleEntry.target.id) {
          setActiveSection(mostVisibleEntry.target.id);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [rootMargin, threshold]);

  return activeSection;
}