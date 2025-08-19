// app/components/skills/SkillSection.tsx
import { skills } from "@/data/skills";
import SkillGroup from "./SkillGroup";

export default function SkillSection() {
    return (
        <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-3xl font-semibold text-center mb-8">Skills</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
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
