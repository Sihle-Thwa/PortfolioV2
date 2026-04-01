"use client";
import Navigation from "./Navigation";
import "./header.css";

export default function Header() {
  return (
    <header className="c-header">
      <div className="c-header-inner">
        <nav className="c-header-nav md:flex hidden">
          <Navigation />
        </nav>
      </div>
    </header>
  );
}
