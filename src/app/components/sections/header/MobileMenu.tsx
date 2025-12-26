"use client";
import Link from "next/link";
import "./mobilemenu.css";
import { navItems } from "./navItems";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="mobile-menu-container" onClick={onClose}>
      <aside
        className="mobile-menu-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="mobile-menu-menu-close"
          aria-label="Close Menu"
        >
          &times;
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
      </aside>
    </div>
  );
}
