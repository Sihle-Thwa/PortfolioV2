// app/components/header/MobileMenu.tsx
"use client";
import Link from "next/link";

interface MobileMenuProps {
    onClose: () => void;
}
export default function MobileMenu({ onClose }: MobileMenuProps) {
    return (
        // Semi-transparent backdrop covering entire viewport
        <div className="fixed inset-0 bg-black/40 z-50 flex">
            {/* Slide-out menu panel on right side */}
            <div className="ml-auto h-full w-4/5 max-w-xs card p-6 flex flex-col">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="self-end mb-4 text-2xl button "
                    aria-label="Close Menu"
                >
                    &times;
                </button>
                {/* Vertical nav links */}
                <nav className="flex flex-col gap-4 ">
                    <Link href="#services" onClick={onClose} className="button button-accent">Services</Link>
                    <Link href="#projects" onClick={onClose} className="button button-accent">Works</Link>
                    <Link href="#about" onClick={onClose} className="button button-accent">About</Link>
                    <Link href="#contact" onClick={onClose} className="button button-accent">Contact</Link>
                </nav>
            </div>
        </div>
    );
}
