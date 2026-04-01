"use client";
import "./footer.css";

const footNavLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills", },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <p>&copy; {new Date().getFullYear()} Siphesihle B. Mthethwa. All rights reserved.</p>
        <nav className="footer__nav">
          {footNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer__nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}