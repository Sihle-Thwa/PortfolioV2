"use client";

import { useEffect, useState } from "react";
import { throttle } from "../utils";

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Get initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

export function useScrollPast(threshold: number = 100) {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setHasScrolledPast(window.scrollY > threshold);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return hasScrolledPast;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalHeight = documentHeight - windowHeight;
      const progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;

      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Get initial progress
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollProgress;
}