// app/components/header/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();  // useTheme hook from next-themes for dark mode

    const toggleTheme = () => {
        // Toggle between light and dark themes
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header className="sticky top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                {/* Logo / Brand Name */}
                <Link href="/" className="text-2xl font-bold">
                    SBM
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <Navigation />
                </nav>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="mr-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === "dark" ? "🌞" : "🌙"}
                </button>

                {/* Contact CTA (visible on desktop) */}
                <Link
                    href="#contact"
                    className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Contact
                </Link>

                {/* Mobile Menu Toggle (Hamburger icon) */}
                <button
                    className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                >
                    {/* Simple hamburger icon using bars (could use an SVG icon here) */}
                    <div className="w-6 h-0.5 bg-black dark:bg-white mb-1"></div>
                    <div className="w-6 h-0.5 bg-black dark:bg-white mb-1"></div>
                    <div className="w-6 h-0.5 bg-black dark:bg-white"></div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileOpen && (
                <MobileMenu onClose={() => setMobileOpen(false)} />
            )}
        </header>
    );
}
