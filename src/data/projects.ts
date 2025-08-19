// data/projects.ts
export type Project = {
    title: string;
    subtitle?: string;    // e.g., project category or role like "Full-Stack Development"
    year?: number;
    href: string;         // external link to project demo or repo
    tags?: string[];      // tech stack tags, e.g. ["Next.js", "Tailwind"]
    image?: string;       // path to project image in /public/images
};

// Sample project entries (placeholder content)
export const projects: Project[] = [
    {
        title: "Project Alpha",
        subtitle: "Full-Stack Development",
        year: 2024,
        href: "https://example.com/project-alpha",
        tags: ["Next.js", "Tailwind", "Node.js"],
        image: "/images/project-alpha.png",
    },
    {
        title: "UI Portfolio",
        subtitle: "Frontend/UI",
        year: 2023,
        href: "https://example.com/ui-portfolio",
        tags: ["React", "Tailwind"],
        image: "/images/project-ui.png",
    },
    // ...additional projects
];
