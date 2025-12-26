"use client";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../../../lib/hooks/use-active-section";
import Image from "next/image";
import brandLogo from "../../../../../public/icons/SBMLogo.png";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
] as const;

export default function Navigation() {
  const [, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  /* ---------------- Scroll helper ---------------- */
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="navigation-container">
      <div className="navigation-content">
        <div className="navigation-inner">
          <div className="navigation-flex-container">
            {/* Brand/Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="navigation-logo"
              aria-label="Go to homepage"
            >
              <Image src={brandLogo}
              alt="Logo"
              width={42}
              height={42}
              className="navigation-logo-image"
              />
            </button>

            <div className="desktopNavigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`${"navButton"} ${
                      isActive ? "navButtonActive" : "navButtonInactive"
                    }`}
                  >
                    {item.name}
                    {/* Active indicator */}
                    <span
                      className={`${"navIndicator"} ${
                        isActive ? "navIndicatorActive" : "navIndicatorInactive"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="navigation-mobile-menu-button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`navigation-mobile-menu ${isMobileMenuOpen ? "" : "hidden"}`}
          >
            <div className="navigation-mobile-menu-items">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
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
