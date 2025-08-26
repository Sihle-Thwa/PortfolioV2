import Link from "next/link";
import ".//navigation.css";

const NAV_LINKS = [
	{ href: "#about", label: "About" },
	{ href: "#skills", label: "Skills" },
	{ href: "#projects", label: "Projects" },
	{ href: "#contact", label: "Contact" },
];

export default function Navigation() {
	return (
		<div className="c-nav">
			{NAV_LINKS.map(({ href, label }) => (
				<Link key={label} href={href} className="c-nav-link">
					{label}
				</Link>
			))}
		</div>
	);
}
