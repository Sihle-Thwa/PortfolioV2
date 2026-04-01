"use client";
import { useState } from "react";
import "./navigation.css";
import { MenuSquare, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  const scrollTo = (href: string): void => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
        >
          SBM
        </a>

        <ul className="navbar__desktop-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__desktop-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <MenuSquare />}
        </button>
      </div>

      {open && (
        <div className="navbar__mobile-menu">
          <ul className="navbar__mobile-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}