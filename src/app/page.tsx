"use client";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about/AboutSection";
import SkillSection from "./components/skills/SkillSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <div className="container" id="home">
        <Hero />
      </div>
      <div className="container" id="about">
        <AboutSection />
      </div>

      <div className="container" id="skills">
        <SkillSection />
      </div>
      <div className="container" id="projects">
        <ProjectsSection />
      </div>
      <div className="container" id="contact">
        <ContactSection />
      </div>
    </>
  );
}
