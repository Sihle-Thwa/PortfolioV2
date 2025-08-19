// app/components/header/MobileMenu.tsx
"use client";
import Link from "next/link";

interface MobileMenuProps {
    onClose: () => void;
}
export default function MobileMenu({ onClose }: MobileMenuProps) {
    return (
        // Semi-transparent backdrop covering entire viewport
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            {/* Slide-out menu panel on right side */}
            <div className="ml-auto w-2/3 max-w-xs bg-white dark:bg-gray-800 p-6 flex flex-col">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="self-end mb-4 text-2xl"
                    aria-label="Close Menu"
                >
                    &times;
                </button>
                {/* Vertical nav links */}
                <nav className="flex flex-col space-y-4">
                    <Link href="#services" onClick={onClose}>Services</Link>
                    <Link href="#projects" onClick={onClose}>Works</Link>
                    <Link href="#about" onClick={onClose}>About</Link>
                    <Link href="#contact" onClick={onClose} className="bg-blue-600 text-white px-3 py-2 rounded">
                        Contact
                    </Link>
                </nav>
            </div>
        </div>
    );
}
