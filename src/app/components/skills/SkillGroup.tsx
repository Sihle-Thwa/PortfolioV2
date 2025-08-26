import SkillItem from "./SkillItem";
import "./skillgroup.css";
import Image from "next/image";
import { useMemo } from "react";
import { skillsData } from "@/data/skillsdata";
interface SkillGroupProps {
    category: string;
    skills: string[];
}

type SkillMeta = { icon: string };

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

function useSkillIconIndex() {
    return useMemo(() => {
        const map = new Map<string, SkillMeta>();
        for (const { skill, icon } of skillsData) {
            if (!skill) continue;
            const key = norm(skill);
            if (!map.has(key) || (map.get(key)?.icon === "" && icon)) {
                map.set(key, { icon: icon || "" });
            }
        }
        return map;
    }, []);
}

export default function SkillGroup({ category, skills }: SkillGroupProps) {
    const index = useSkillIconIndex();

    return (
        <article className="c-skill-group" aria-label={`${category} skills`}>
            <h3 className="c-skill-group--title">{category}</h3>

            <ul className="c-skill-group--list" role="list">
                {skills.map((skill) => {
                    const meta = index.get(norm(skill));
                    const iconSrc = meta?.icon || "";
                    return (
                        <SkillItem key={skill} skill={skill}>
                            {iconSrc ? (
                                <Image
                                    src={iconSrc}
                                    alt={skill}
                                    width={18}
                                    height={18}
                                    loading="lazy"
                                    className="c-skill-item-icon"
                                    unoptimized
                                />
                            ) : (
                                    <span aria-hidden className="c-skill-item" />
                            )}
                        </SkillItem>
                    );
                })}
            </ul>
        </article>
    );
}