"use client";
import Link from "next/link";
import { X } from "lucide-react";
import "./mobilemenu.css";
import { navItems } from "./navItems";

interface MobileMenuProps {
  onClose: () => void;
  theme: string;
}

export default function MobileMenu({ onClose, theme }: MobileMenuProps) {
  const themeIcon = theme === "dark" ? "🌙" : "🌞";
  const themeLabel = theme === "dark" ? "Dark" : "Light";

  return (
    <div className="mobile-menu-container" onClick={onClose}>
      <aside
        className="mobile-menu-content"
        onClick={(event): void => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="mobile-menu-menu-close"
          aria-label="Close Menu"
        >
          <X size={20} />
        </button>
        <nav className="mobile-menu-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="mobile-menu-link"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Theme info footer */}
        <div className="mobile-menu-footer">
          <div className="mobile-menu-theme-display">
            <span className="mobile-menu-theme-icon">{themeIcon}</span>
            <span className="mobile-menu-theme-label">Theme: {themeLabel}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
