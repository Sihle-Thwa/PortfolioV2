import React from "react";
import "./footer.css";
export default function Footer() {
    return (
        <footer className="c-footer">
            <div className="container c-footer-inner">
                <p className="c-footer-copy">
                    &copy; {new Date().getFullYear()} Siphesihle B. Mthethwa. All rights
                    reserved.
                </p>
                <nav className="c-footer-nav">
                    <a href="#services" className="c-footer-link">
                        Services
                    </a>
                    <a href="#projects" className="c-footer-link">
                        Works
                    </a>
                    <a href="#about" className="c-footer-link">
                        About
                    </a>
                    <a href="#contact" className="c-footer-link">
                        Contact
                    </a>
                </nav>
            </div>
        </footer>
    );
}
