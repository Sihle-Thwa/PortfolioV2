// app/components/skills/SkillGroup.tsx
import SkillItem from "./SkillItem";

interface SkillGroupProps {
    category: string;
    skills: string[];
}
export default function SkillGroup({ category, skills }: SkillGroupProps) {
    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <ul>
                {skills.map(skill => (
                    <SkillItem key={skill} skill={skill} />
                ))}
            </ul>
        </div>
    );
}
