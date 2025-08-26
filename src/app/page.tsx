"use client";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about/AboutSection";
import SkillSection from "./components/skills/SkillSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";

export default function HomePage() {
  return (
		<>
			{[
				<Hero key="hero" />,
				<ProjectsSection key="projects" />,
				<AboutSection key="about" />,
				<SkillSection key="skills" />,
				<ContactSection key="contact" />,
			].map((Component, idx) => (
				<section className="container" key={idx}>
					{Component}
				</section>
			))}
		</>
	);
}
