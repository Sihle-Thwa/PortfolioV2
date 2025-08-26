import "./skillitem.css";

interface SkillItemProps {
    skill: string;
    children?: React.ReactNode;
}

export default function SkillItem({ skill, children }: SkillItemProps) {
    return (
        <li className="c-skill-item" role="listitem">
            {children && <span className="c-skill-item-iconwrap">{children}</span>}
            <span className="c-skill-item-label">{skill}</span>
        </li>
    );
}
