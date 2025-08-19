// app/components/header/MobileMenu.tsx
"use client";
import Link from "next/link";
import "./mobilemenu.css";

interface MobileMenuProps {
    onClose: () => void;
}
export default function MobileMenu({ onClose }: MobileMenuProps) {
    return (
        // Semi-transparent backdrop covering entire viewport
        <div className="c-mm-backdrop">
            {/* Slide-out menu panel on right side */}
            <div className="c-mm-panel">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="button button-primary"
                    aria-label="Close Menu"
                >
                    &times;
                </button>
                {/* Vertical nav links */}
                <nav className="c-mm-link">
                    <Link href="#services" onClick={onClose} className="c-mm-link c-mm-link--cta">
                        Services
                    </Link>
                    <Link href="#projects" onClick={onClose} className="c-mm-link c-mm-link--cta">
                        Works
                    </Link>
                    <Link href="#about" onClick={onClose} className="c-mm-link c-mm-link--cta">
                        About
                    </Link>
                    <Link href="#contact" onClick={onClose} className="c-mm-link c-mm-link--cta">
                        Contact
                    </Link>
                </nav>
            </div>
        </div>
    );
}
