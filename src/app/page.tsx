"use client";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about/AboutSection";
import SkillSection from "./components/skills/SkillSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";
import Navbar from "./components/header/Navigation";
import Footer from "./components/footer/Footer";

export default function HomePage() {
  return (
    <div className="PageWrapper">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SkillSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
