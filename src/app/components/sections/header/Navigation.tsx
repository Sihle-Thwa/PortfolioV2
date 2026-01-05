"use client";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../../../lib/hooks/use-active-section";
import Image from "next/image";
import brandLogo from "../../../../../public/icons/SBMLogo.png";
import { navItems } from "./navItems";
import "./navigation.css";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  // Scroll detection effect removed because associated state (isScrolled) was unused.

  /* ---------------- Scroll helper ---------------- */
  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const [theme, setTheme] = useState<"light" | "dark">("light");

  function cycleTheme(): void {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    // Determine initial theme on mount
    const storedTheme =
      typeof window !== "undefined"
        ? window.localStorage.getItem("theme")
        : null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }

    if (typeof window !== "undefined") {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Persist theme choice
    window.localStorage.setItem("theme", theme);

    // Apply theme to document root (commonly used by global styles)
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="navigation-container">
      <div className="navigation-content">
        <div className="navigation-inner">
          <div className="navigation-flex-container">
            {/* Brand/Logo */}
            <button
              onClick={() => scrollToSection("#home")}
              className="navigation-logo"
            >
              <Image src={brandLogo} alt="Logo" width={48} height={48} />
            </button>

            <div className="navigation-nav-items">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`navButton ${
                      isActive ? "navButtonActive" : "navButtonInactive"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`navIndicator ${
                        isActive ? "navIndicatorActive" : "navIndicatorInactive"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Theme toggle moved from Header */}
            <button
              onClick={cycleTheme}
              aria-label={`${
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              } (current: ${theme})`}
            >
              {theme === "light" ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={function () {
                return setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="navigation-mobile-menu-button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`navigation-mobile-menu ${
              isMobileMenuOpen ? "" : "hidden"
            }`}
          >
            <div className="navigation-mobile-menu-items">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <button
                    key={item.name}
                    onClick={function () {
                      return scrollToSection(item.href);
                    }}
                    className={`navigation-mobile-toggle ${
                      isActive
                        ? "navigation-mobile-active"
                        : "navigation-mobile-inactive"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
