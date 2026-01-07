"use client";

import "./hero.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import Typewriter from "@/app/styles/Typewriter";
import HeadlineBanner from "./HeadlineBanner";

type Slide = { src: string; alt: string; effect?: "fade" | "slide" | "zoom" };

export default function Hero() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => setMounted(true), []);

  const lightSlides: Slide[] = useMemo(
    () => [
      { src: "/sand-bg-1.png", alt: "Background 1", effect: "fade" },
      { src: "/sand-bg-2.png", alt: "Background 2", effect: "slide" },
      { src: "/sand-bg-3.png", alt: "Background 3", effect: "zoom" },
    ],
    []
  );

  const darkSlides: Slide[] = useMemo(
    () => [
      { src: "/charcoal-bg-1.png", alt: "Background 1", effect: "fade" },
      { src: "/charcoal-bg-2.png", alt: "Background 2", effect: "zoom" },
      { src: "/offwhite-bg-1.jpg", alt: "Background 3", effect: "slide" },
    ],
    []
  );

  const activeTheme = useMemo(() => {
    return theme === "system" ? systemTheme : theme;
  }, [theme, systemTheme]);

  const slides = useMemo<Slide[]>(() => {
    return activeTheme === "dark" ? darkSlides : lightSlides;
  }, [activeTheme, darkSlides, lightSlides]);

  // autoplay
  useEffect(() => {
    const DURATION = 8000;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setExiting((prev) => (prev === null ? active : active));
      setActive((prev) => (prev + 1) % slides.length);
      setTimeout(() => setExiting(null), 1000);
    }, DURATION);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length, activeTheme, active]);

  // reset slider when theme changes
  useEffect(() => {
    setActive(0);
    setExiting(null);
  }, [activeTheme]);

  if (!mounted) return <section id="home" className="hero-bg--slider" />;

  return (
    <section id="home" className="hero-bg--slider" aria-label="Hero slider">
      <div className="hero-slider--wrap" aria-hidden>
        {slides.map((slide, index) => {
          const isActive = index === active;
          const isExiting = exiting === index;
          const effect = slide.effect ?? "fade";
          return (
            <div
              key={`${slide.src}-${index}`}
              className={[
                "hero-slide",
                isActive ? "is-active" : "",
                isExiting ? "is-exiting" : "",
                `effect-${effect}`,
              ].join(" ")}
              style={{ backgroundImage: `url(${slide.src})` }}
              role="img"
              aria-label={slide.alt}
            />
          );
        })}
      </div>

      <div className="slider-content">
        <div className="content-row">
          <div className="content-column">
            <h1 className="slide-heading">
              <Typewriter>Siphesihle B. Mthethwa</Typewriter>
            </h1>
            <div className="slide-subheading">
              <span className="slide-subheading-token">Building</span> better
              web experiences.
              <br />
              <span className="slide-subheading-token">Turning</span> client
              ideas into reality.
              <br />
              <span className="slide-subheading-token">Teaching</span> IT and
              Comp Sci.
            </div>
            <div className="hero-buttons--wrap">
            <button>
              <a
                href="#projects"
                aria-label="View my projects"
                className="hero-button"
              >
                <div className="button-animate-y">
                  <div className="button-animate-y-1">View Work</div>
                  <div className="button-animate-y-2" aria-hidden="true">
                    View Work
                  </div>
                </div>
              </a>
              </button>

              <a
                href="#contact"
                aria-label="Get in touch with me"
                className="hero-button button-fill"
              >
                <div className="button-animate-y">
                  <div className="button-animate-y-1">Get in Touch</div>
                  <div className="button-animate-y-2" aria-hidden="true">
                    Get in Touch
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-banner-container">
        <div className="hero-location">📍 Based in Durban, South Africa</div>
        <div className="hero-banner">
          <HeadlineBanner />
        </div>
      </div>
    </section>
  );
}
