// app/components/skills/SkillItem.tsx
import "./skillitem.css";
interface SkillItemProps {
    skill: string;
}
export default function SkillItem({ skill }: SkillItemProps) {
    return <li className="c-skill-item">• {skill}</li>;
}
