// data/services.ts
export type Service = {
    title: string;
    bullets: string[];   // Bullet-point list of tools/skills for this service
};

export const services: Service[] = [
    {
        title: "Full-Stack Development",
        bullets: ["Next.js & Node.js", "RESTful APIs & Databases", "Authentication & Security"],
    },
    {
        title: "UI/UX & Frontend",
        bullets: ["Responsive Web Design", "Tailwind CSS & Chakra UI", "React & TypeScript Best Practices"],
    },
    {
        title: "Performance Optimization",
        bullets: ["Web Vitals & SEO", "Profiling & Debugging", "Caching & CDN Integration"],
    },
];
