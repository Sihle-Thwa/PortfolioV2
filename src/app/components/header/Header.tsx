// app/components/header/Header.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import "../../styles/header.css";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    const activeTheme = theme === "system" ? systemTheme : theme;
    return (
        <header className="c_header-container">
            <div className="c_header-content">
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
                    aria-label="Toggle theme"
                    onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-md button button-ghost"
                >
                    {mounted && activeTheme === "dark" ? "🌞" : "🌙"}
                </button>

                {/* Contact CTA (visible on desktop) */}
                <Link
                    href="#contact"
                    className="hidden md:inline-block button button-accent"
                >
                    Contact
                </Link>

                {/* Mobile Menu Toggle (Hamburger icon) */}
                <button
                    className="md:hidden p-2 rounded button "
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
