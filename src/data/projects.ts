export type Project = {
    title: string;
    subtitle?: string;
    year?: number;
    href: string;
    codebase: string;
    tags?: string[];
    image?: string;
};

export const projects: Project[] = [
    {
        title: "U-Organise",
        subtitle: "CRM Product Marketing Website",
        year: 2024,
        href: "https://uorganise-product-site.vercel.app/",
        codebase: "https://github.com/Sihle-Thwa/sm-product-site",
        tags: ["Next.js", "Vite", "TailwindCSS", "TypeScript", "Lucide Icons"],
        image: "/UOrganiseMarketSite.png",
    },
    {
        title: "Siphesihle B. Mthethwa Portfolio",
        subtitle: "Personal Portfolio Website",
        year: 2025,
        href: "https://portfolio-sbm-portfolio.vercel.app/",
        codebase: "https://github.com/Sihle-Thwa/PortfolioV2",
        tags: ["Next.js", "TailwindCSS", "TypeScript"],
        image: "/SBMPortfolio.png",
    },
    {
        title: "Open Shop",
        subtitle: "E-commerce Platform",
        year: 2025,
        href: "",
        codebase: "https://github.com/Sihle-Thwa/OpenShop",
        tags: ["React.js", "React Router DOM", "Vite.js", "Bootstrap", "Bootstrap", "Bootstrap Icons"],
        image: "/OpenshopMain.png",
    },
    // ...additional projects
];
