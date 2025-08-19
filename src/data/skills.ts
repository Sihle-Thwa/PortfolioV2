// data/skills.ts
export type SkillGroup = {
    category: string;
    skills: string[];    // List of skill names under this category
};

export const skills: SkillGroup[] = [
    {
        category: "Frontend",
        skills: ["React", "Next.js", "Tailwind CSS", "JavaScript/TypeScript"],
    },
    {
        category: "Backend",
        skills: ["Node.js", "Express.js", "SQL/NoSQL Databases", "REST and GraphQL"],
    },
    {
        category: "Tools & Platforms",
        skills: ["Git & GitHub", "Docker & CI/CD", "AWS & Cloud Services"],
    },
];
