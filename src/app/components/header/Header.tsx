"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Navigation from ".//Navigation";
import dynamic from "next/dynamic";
import ".//header.css";
import Image from "next/image";

const MobileMenu = dynamic(() => import("./MobileMenu"));

export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);
	const activeTheme = theme === "system" ? systemTheme : theme;
	return (
		<header className="c-header">
			<div className="c-header-inner">
				<Link href="#home" className="c-header-brand">
					<Image src="/icons/SBMLogo.png" alt="Logo" width={38} height={38} />
				</Link>

				<nav className="c-header-nav md:flex hidden">
					<Navigation />
				</nav>
				<button
					aria-label="Toggle theme"
					onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
					className="c-header-toggle"
				>
					{mounted && activeTheme === "dark" ? "🌞" : "🌙"}
				</button>
				<button
					className="c-header-hamburger md:hidden"
					onClick={() => setMobileOpen(true)}
					aria-label="Open Menu"
				>
					<span />
					<span />
					<span />
				</button>
			</div>

			{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
		</header>
	);
}
