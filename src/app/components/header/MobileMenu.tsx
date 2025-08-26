"use client";
import Link from "next/link";
import "./mobilemenu.css";

interface MobileMenuProps {
	onClose: () => void;
}
/**
 * MobileMenu component displays a mobile navigation panel.
 * @param {Object} props - Component props.
 * @param {() => void} props.onClose - Callback to close the menu.
 */
export default function MobileMenu({ onClose }: MobileMenuProps) {
	return (
		<div className="c-mm-backdrop" onClick={onClose}>
			<aside className="c-mm-panel" onClick={(e) => e.stopPropagation()}>
				<button
					onClick={onClose}
					className="c-mm-close"
					aria-label="Close Menu"
				>
					&times;
				</button>
				<nav className="c-mm-nav">
					<Link href="#services" onClick={onClose} className="c-mm-link">
						Services
					</Link>
					<Link href="#projects" onClick={onClose} className="c-mm-link">
						Works
					</Link>
					<Link href="#about" onClick={onClose} className="c-mm-link">
						About
					</Link>
					<Link
						href="#contact"
						onClick={onClose}
						className="c-mm-link c-mm-link--cta"
					>
						Contact
					</Link>
				</nav>
			</aside>
		</div>
	);
}

