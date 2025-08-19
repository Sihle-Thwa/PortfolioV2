import Link from "next/link";

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
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    {label}
                </Link>
            ))}
        </>
    );
}
