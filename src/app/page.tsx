"use client";
import Hero from "./components/hero/Hero";
import AboutSection from "./components/about/AboutSection";
import SkillSection from "./components/skills/SkillSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <section className="container"><Hero /></section>
      <section className="container"><ProjectsSection /></section>
      <section className="container"><AboutSection /></section>
      <section className="container"><SkillSection /></section>
      <section className="container"><ContactSection /></section>
    </>
  );
}
