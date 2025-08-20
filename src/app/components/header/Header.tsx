"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import "./header.css";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    const activeTheme = theme === "system" ? systemTheme : theme;
    return (
        <header className="c-header">
            <div className="container c-header-inner">
                <Link href="/" className="c-header-brand">
                    SBM
                </Link>

                <nav className="c-header-nav md:flex hidden">
                    <Navigation />

                    <Link href="#contact" className="c-header-cta">
                        Contact
                    </Link>


                </nav>
                <button
                    aria-label="Toggle theme"
                    onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
                    className="c-header-toggle"
                >
                    {mounted && activeTheme === "dark" ? "🌞" : "🌙"}
                </button>
                <button
                    className="c-header-hamburger md:hidden"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open Menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
        </header>
    );
}
