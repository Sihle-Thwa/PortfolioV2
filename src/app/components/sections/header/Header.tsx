"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Navigation from "./Navigation";
import dynamic from "next/dynamic";
import "./header.css";
import Image from "next/image";
const MobileMenu = dynamic(() => import("./MobileMenu"));

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const activeTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="header-container">
      <div className="header-content">
        <Link href="#home" className="header-logo">
          <Image src="/icons/SBMLogo.png" 
		  alt="Logo" 
		  width={38} height={38} 
		  className="header-logo-image"
		  />
        </Link>

        <nav className="header-navigation">
          <Navigation />
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
          className="header-theme-toggle"
        >
          {mounted && activeTheme === "dark" ? "🌞" : "🌙"}
        </button>
        <button
          className="header-mobile-menu-button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </div>
  );
}
