// app/components/skills/SkillItem.tsx
interface SkillItemProps {
    skill: string;
}
export default function SkillItem({ skill }: SkillItemProps) {
    return <li className="mb-2">• {skill}</li>;
}
