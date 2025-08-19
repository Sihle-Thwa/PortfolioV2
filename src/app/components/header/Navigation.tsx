// app/components/header/Nav.tsx
import Link from "next/link";

const NAV_LINKS = [
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Works" },    // "Works" section (projects)
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

export default function Navigation() {
    return (
        <>
            {NAV_LINKS.map(({ href, label }) => (
                <Link
                    key={label}
                    href={href}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    {label}
                </Link>
            ))}
        </>
    );
}
