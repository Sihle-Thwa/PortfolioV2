export type Project = {
    title: string;
    subtitle?: string;
    year?: number;
    href: string;
    tags?: string[];
    image?: string;
};

export const projects: Project[] = [
    {
        title: "U-Organise",
        subtitle: "CRM Product Marketing Website",
        year: 2024,
        href: "https://uorganise-product-site.vercel.app/",
        tags: ["Next.js", "Vite", "TailwindCSS", "TypeScript", "Lucide Icons"],
        image: "/UOrganiseMarketSite.png",
    },
    {
        title: "Siphesihle B. Mthethwa Portfolio",
        subtitle: "Personal Portfolio Website",
        year: 2025,
        href: "https://portfolio-sbm-portfolio.vercel.app/",
        tags: ["Next.js", "TailwindCSS", "TypeScript"],
        image: "/SBMPortfolio.png",
    },
    // ...additional projects
];
