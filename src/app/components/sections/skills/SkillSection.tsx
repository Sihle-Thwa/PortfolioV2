"use client";
import { useState } from "react";
const skillList: { category: string; skills: string[] }[] = [ {
        category: "APIs and Data Integration",
        skills: ["Express", "GraphQL", "Postman", "REST API", "Swagger.io"],
    },
    {
        category: "Authentication",
        skills: ["AuthO", "Firebase Auth", "NextAuth", "Supabase Auth"],
    },
    {
        category: "Database Management",
        skills: ["Azure MySQL", "Firebase", "MongoDB", "MySQL", "Postgres"],
    },
    {
        category: "Framework and Libraries",
        skills: ["ASP.NET Core", "Blazor", "Next.js", "React Router", "React.js", "Vite.js", "Vue.js"],
    },
    {
        category: "Styling and Design",
        skills: ["Bootstrap", "MaterialUI", "Radix UI", "Styled Components", "TailwindCSS", "Vanilla CSS"],
    },
    {
        category: "Testing",
        skills: ["Cypress", "Jest", "Vitest"],
    },
    {
        category: "Tools and Workflow",
        skills: ["Azure DevOps", "Figma", "Git", "Github", "Github Actions", "Notion", "Trello"],
    },
];
import SkillGroup from "./SkillGroup";
import SkillsCarousel from "./SkillsCarousel";
import "./skillsection.css";
import { Skills } from "@/data/skills";

type ViewMode = "groups" | "carousel";

export default function SkillSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("groups");

  return (
    <section id="skills" className="c-skill">
      <h2 className="c-skill-title">Skills</h2>

      {/* View toggle */}
      <fieldset className="c-skill-toggle" aria-label="Skills view">
        <legend className="sr-only">Choose skills view</legend>

        <label className="c-skill-toggle-option">
          <input
            type="radio"
            name="skills-view"
            value="groups"
            checked={viewMode === "groups"}
            onChange={() => setViewMode("groups")}
          />
          <span>Standard</span>
        </label>

        <label className="c-skill-toggle-option">
          <input
            type="radio"
            name="skills-view"
            value="carousel"
            checked={viewMode === "carousel"}
            onChange={() => setViewMode("carousel")}
          />
          <span>Carousel</span>
        </label>
      </fieldset>

      {/* Content */}
      {viewMode === "groups" ? (
        <div className="c-skill-grid" role="list">
          {skillList.map((group: Skills, idx: number) => (
            <SkillGroup
              key={`${group.category}-${idx}`}
              category={group.category}
              skills={group.skills}
            />
          ))}
        </div>
      ) : (
        <div className="c-skill-carousel-wrap">
          <SkillsCarousel />
        </div>
      )}
    </section>
  );
}
