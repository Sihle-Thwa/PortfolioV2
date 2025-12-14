"use client";

import "./hero.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import Typewriter from "@/app/styles/Typewriter";
import HeadlineBanner from "./HeadlineBanner";

type Slide = { src: string; alt: string; effect?: "fade" | "slide" | "zoom" };

export default function Hero() {
	const { theme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const [active, setActive] = useState(0);
	const [exiting, setExiting] = useState<number | null>(null);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => setMounted(true), []);

	const lightSlides: Slide[] = useMemo(
		() => [
			{ src: "/sand-bg-1.png", alt: "Background 1", effect: "fade" },
			{ src: "/sand-bg-2.png", alt: "Background 2", effect: "slide" },
			{ src: "/sand-bg-3.png", alt: "Background 3", effect: "zoom" },
		],
		[],
	);

	const darkSlides: Slide[] = useMemo(
		() => [
			{ src: "/charcoal-bg-1.png", alt: "Background 1", effect: "fade" },
			{ src: "/charcoal-bg-2.png", alt: "Background 2", effect: "zoom" },
			{ src: "/offwhite-bg-1.jpg", alt: "Background 3", effect: "slide" },
		],
		[],
	);

	function getActiveTheme(
		theme: string | undefined,
		systemTheme: string | undefined,
	) {
		return theme === "system" ? systemTheme : theme;
	}
	const activeTheme = getActiveTheme(theme, systemTheme);
	const slides = (activeTheme === "dark" ? darkSlides : lightSlides) as Slide[];

	useEffect(() => {
		setActive(0);
		setExiting(null);
	}, [activeTheme]);

	// autoplay
	useEffect(() => {
		const DURATION = 8000;
		if (timerRef.current) clearInterval(timerRef.current);
		timerRef.current = setInterval(() => {
			setExiting((prev) => (prev === null ? active : active));
			setActive((prev) => (prev + 1) % slides.length);
			setTimeout(() => setExiting(null), 1000);
		}, DURATION);
		return () => {
			if (timerRef.current) window.clearInterval(timerRef.current);
		};
	}, [slides.length, activeTheme, active]);

	if (!mounted) return <section id="home" className="hero-bg--slider" />;

	return (
		<section id="home" className="hero-bg--slider" aria-label="Hero slider">
			<div className="hero-slider--wrap" aria-hidden>
				{slides.map((s, i) => {
					const isActive = i === active;
					const isExiting = exiting === i;
					const effect = s.effect ?? "fade";
					return (
						<div
							key={`${s.src}-${i}`}
							className={[
								"hero-slide",
								isActive ? "is-active" : "",
								isExiting ? "is-exiting" : "",
								`effect-${effect}`,
							].join(" ")}
							style={{ backgroundImage: `url(${s.src})` }}
							role="img"
							aria-label={s.alt}
						/>
					);
				})}
			</div>

			<div className="slider-content">
				<div className="content-row">
					<div className="content-column">
						<h1 className="slide-heading">
							<Typewriter>Siphesihle B. Mthethwa</Typewriter>
						</h1>
						<p className="slide-subheading">
							<span className="slide-subheading-token">Building</span> better
							web experiences.
							<br />
							<span className="slide-subheading-token">Turning</span> client
							ideas into reality.
							<br />
							<span className="slide-subheading-token">Teaching</span> IT and
							Comp Sci.
						</p>
						<div className="hero-buttons--wrap">
							<a href="#projects" className="hero-button">
								<span className="button-animate-y">
									<span className="button-animate-y-1">View Work</span>
									<span className="button-animate-y-2" aria-hidden="true">
										View Work
									</span>
								</span>
							</a>
							<a href="#contact" className="hero-button button-fill">
								<span className="button-animate-y">
									<span className="button-animate-y-1">Get in Touch</span>
									<span className="button-animate-y-2" aria-hidden="true">
										Get in Touch
									</span>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="hero-bottom-wrap">
				<div className="hero-status">
					📍 Based in South Africa, Johannesburg
				</div>
				<div className="hero-banner">
					<HeadlineBanner />
				</div>
			</div>
		</section>
	);
}
