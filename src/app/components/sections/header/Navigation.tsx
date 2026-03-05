"use client";
import { useCallback, useEffect, useState } from "react";
import { Menu} from "lucide-react";
import { useActiveSection } from "../../../lib/hooks/use-active-section";
import Image from "next/image";
import brandLogo from "../../../assets/brand-logo.png";
import { navItems } from "./navItems";
import MobileMenu from "./MobileMenu";
import "./navigation.css";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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



  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);




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
      
          scrollToSection={scrollToSection}
          activeSection={activeSection}
        />
      )}
    </>
  );
}
