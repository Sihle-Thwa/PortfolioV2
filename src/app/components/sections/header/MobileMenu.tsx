"use client";
import Link from "next/link";
import "./mobilemenu.css";

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
        <nav className=" mobile-menu-nav">
          <Link
            href="#services"
            onClick={onClose}
            className=" mobile-menu-link"
          >
            Services
          </Link>
          <Link href="#projects" onClick={onClose} className="mobile-menu-link">
            Projects
          </Link>
          <Link href="#about" onClick={onClose} className="mobile-menu-link">
            About
          </Link>
          <Link href="#contact" onClick={onClose} className="mobile-menu-link">
            Contact
          </Link>
        </nav>
      </aside>
    </div>
  );
}
