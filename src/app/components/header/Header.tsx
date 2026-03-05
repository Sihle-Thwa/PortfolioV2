"use client";
import {  useState } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import "./header.css";
import Image from "next/dist/shared/lib/image-external";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="c-header">
            <div className="c-header-inner">
                <Link href="#Home" className="c-header-brand">
                    <Image
                        src="/icons/SBMLogo.png"
                        alt="Logo"
                        width={34}
                        height={34}
                    />
                </Link>

                <nav className="c-header-nav md:flex hidden">
                    <Navigation />
                </nav>
                
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
