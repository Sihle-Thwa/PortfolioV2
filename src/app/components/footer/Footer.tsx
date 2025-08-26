import "./footer.css";


const footNavLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
]
export default function Footer() {
    return (
        <footer className="c-footer">
            <div className="container c-footer-inner">
                <div className="c-footer-copy">
                    &copy; {new Date().getFullYear()}

                    {" "}Siphesihle B. Mthethwa. All rights
                    reserved.
                </div>
                <nav className="c-footer-nav">
                    {footNavLinks.map((link) => (
                        <a key={link.label} href={link.href} className="c-footer-link">
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}               