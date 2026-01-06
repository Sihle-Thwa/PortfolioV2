import Hero from "./components/sections/hero/Hero";
import AboutSection from "./components/sections/about/AboutSection";
import SkillSection from "./components/sections/skills/SkillSection";
import ProjectsSection from "./components/sections/projects/ProjectsSection";
import ContactSection from "./components/sections/contact/ContactSection";
import Footer from "./components/sections/footer/Footer";
import Header from "./components/sections/header/Header";

export default function HomePage() {
  return (
       <>
      <Header />
      <main>
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