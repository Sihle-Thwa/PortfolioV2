"use client";
import { useCallback, useEffect, useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useActiveSection } from "../../../lib/hooks/use-active-section";
import Image from "next/image";
import brandLogo from "../../../../../public/icons/SBMLogo.png";
import { navItems } from "./navItems";
import MobileMenu from "./MobileMenu";
import "./navigation.css";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const activeSection = useActiveSection();

  useEffect(() => setMounted(true), []);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const cycleTheme = useCallback((): void => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Theme initialization and persistence
  useEffect(() => {
    const storedTheme = typeof window !== "undefined" 
      ? window.localStorage.getItem("theme") 
      : null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }

    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Theme application
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Keyboard handler for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  return (
    <>
      <header className="navigation-container" role="banner">
        <div className="navigation-content">
          <div className="navigation-inner">
            <div className="navigation-flex-container">
              {/* Logo */}
              <button
                onClick={() => scrollToSection("#hero")}
                className="navigation-logo"
                aria-label="Navigate to home section"
              >
                <Image 
                  src={brandLogo} 
                  alt="" 
                  width={48} 
                  height={48} 
                  priority
                  className="navigation-logo-image"
                />
              </button>

              {/* Desktop Navigation */}
              <nav 
                className="navigation-desktop" 
                aria-label="Main navigation"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`navigation-link ${
                        isActive ? "navigation-link--active" : "navigation-link--inactive"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                      <span
                        className={`navigation-indicator ${
                          isActive ? "navigation-indicator--active" : "navigation-indicator--inactive"
                        }`}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </nav>

              {/* Theme Toggle */}
              <button
                onClick={cycleTheme}
                className="navigation-theme-toggle"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                aria-pressed={theme === "dark"}
              >
                {theme === "light" ? (
                  <Sun size={20} aria-hidden="true" />
                ) : (
                  <Moon size={20} aria-hidden="true" />
                )}
                <span className="sr-only">
                  Current theme: {theme}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="navigation-mobile-toggle"
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <MobileMenu 
          onClose={closeMobileMenu} 
          theme={theme}
          onThemeToggle={cycleTheme}
          scrollToSection={scrollToSection}
          activeSection={activeSection}
        />
      )}
    </>
  );
}
