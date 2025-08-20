// app/components/skills/SkillSection.tsx
import { skills } from "@/data/skills";
import SkillGroup from "./SkillGroup";
import "./skillsection.css";

export default function SkillSection() {
    return (
        <section id="skills" className="c-skill">
            <h2 className="c-skill-title">Skills</h2>
            <div className="c-skill-grid">
                {skills.map(group => (
                    <SkillGroup
                        key={group.category}
                        category={group.category}
                        skills={group.skills}
                    />
                ))}
            </div>
        </section>
    );
}
