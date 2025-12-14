'use server';

export type SkillGroup = {
    category: string;
    skills: string[];
};

export const skills: SkillGroup[] = [
    {
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
