"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Navigation from "./Navigation";
import dynamic from "next/dynamic";
import "./header.css";

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
        <div className="header-navigation">
          <Navigation />
        </div>
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
