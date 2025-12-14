"use client";
import Hero from "./components/sections/hero/Hero";
import AboutSection from "./components/sections/about/AboutSection";
import SkillSection from "./components/sections/skills/SkillSection";
import ProjectsSection from "./components/sections/projects/ProjectsSection";
import ContactSection from "./components/sections/contact/ContactSection";
import Navigation from "./components/sections/header/Navigation";
import Footer from "./components/sections/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="scroll-smooth">
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <SkillSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
