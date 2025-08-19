import Link from "next/link";
import "../../styles/navigation.css";

const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },    
    { href: "#contact", label: "Contact" },
];

export default function Navigation() {
    return (
        <>
            {NAV_LINKS.map(({ href, label }) => (
                <Link
                    key={label}
                    href={href}
                    className="link"
                > <div className="button">
                        {label}
                    </div>
                </Link>
            ))}
        </>
    );
}
