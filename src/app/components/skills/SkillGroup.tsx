// app/components/skills/SkillGroup.tsx
import SkillItem from "./SkillItem";
import "./skillgroup.css";
interface SkillGroupProps {
    category: string;
    skills: string[];
}
export default function SkillGroup({ category, skills }: SkillGroupProps) {
    return (
        <div className="c-skill-group">
            <h3 className="c-skill-group--title">{category}</h3>
            <ul className="c-skill-group--list">
                {skills.map(skill => (
                    <SkillItem key={skill} skill={skill} />
                ))}
            </ul>
        </div>
    );
}
