import Link from "next/link";
import "./navigation.css";
import { useActiveSection } from "@/app/lib/hooks/use-active-section";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const activeHref = activeSection ? (activeSection.startsWith("#") ? activeSection : `#${activeSection}`) : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className="c-nav"
      data-scrolled={isScrolled}
      data-mobile-menu-open={isMobileMenuOpen}
    >
      <div className="container">
        <div className="brand">
      <button onClick={() => scrollToSection("#hero")} className="c-nav-link brand-link">

      </button>
    </div>
    <div className="c-nav-links">
      {navItems.map(({ href, name }) => {
        const isActive = activeHref === href;
        return (
          <Link key={name} href={href} className={`c-nav-link${isActive ? " active" : ""}`}>
            {name}
          </Link>
        );
      })}
    </div>
      </div>
    </div>
  );
}
