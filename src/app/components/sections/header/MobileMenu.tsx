"use client";
import { X, Sun, Moon } from "lucide-react";
import "./mobilemenu.css";
import { navItems } from "./navItems";

interface MobileMenuProps {
  onClose: () => void;
  theme: string;
  onThemeToggle: () => void;
  scrollToSection: (href: string) => void;
  activeSection: string;
}

export default function MobileMenu({ 
  onClose, 
  theme, 
  onThemeToggle, 
  scrollToSection, 
  activeSection 
}: MobileMenuProps) {
  const handleNavClick = (href: string) => {
    scrollToSection(href);
    onClose();
  };

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <aside
        className="mobile-menu-content"
        onClick={(event): void => event.stopPropagation()}
      >
        <div className="mobile-menu-header">
          <button
            onClick={onClose}
            className="mobile-menu-close"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`mobile-menu-link ${
                  isActive ? "mobile-menu-link--active" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}
              </button>
            );
          })}
        </nav>
        
        <div className="mobile-menu-footer">
          <button
            onClick={onThemeToggle}
            className="mobile-menu-theme-toggle"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span className="mobile-menu-theme-icon">
              {theme === "light" ? (
                <Sun size={20} aria-hidden="true" />
              ) : (
                <Moon size={20} aria-hidden="true" />
              )}
            </span>
            <span className="mobile-menu-theme-label">
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
