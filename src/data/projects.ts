export type Project = {
	title: string
	subtitle?: string
	year?: number
	href: string
	tags?: string[]
	image?: string
	codebase?: string
}

export const projects: Project[] = [
	{
		title: "U-Organise",
		subtitle: "Enterprise Governance SaaS Marketing Website",
		year: 2024,
		href: "https://uorganise-product-site.vercel.app/",
		tags: [
			"Next.js 14",
			"Vite 8",
			"TailwindCSS 4",
			"TypeScript 6",
			"Lucide Icons",
		],
		image: "/UOrganiseMarketSite.png",
		codebase: "https://github.com/Sihle-Thwa/SportsManagment",
	},
	{
		title: "Personal Portfolio",
		subtitle: "Siphesihle B. Mthethwa Portfolio Website",
		year: 2025,
		href: "https://portfolio-sbm-portfolio.vercel.app/",
		tags: [
			"Next.js 13",
			"TailwindCSS 4.1",
			"TypeScript 5",
			"Vite 5",
			"Custom CSS",
		],
		image: "/SBMPortfolio.png",
		codebase: "https://github.com/Sihle-Thwa/PortfolioV2",
	},
	{
		title: "OpenShop",
		subtitle: "E-commerce Platform",
		year: 2026,
		href: "https://open-shopv2.vercel.app/",
		tags: [
			"React 19",
			"TypeScript 6",
			"Vite 8",
			"Tailwind CSS 4",
			"shadcn/ui + Radix UI",
			"TanStack Query 5",
		],
		image: "/OpenShop.png",
		codebase: "https://github.com/Sihle-Thwa/open-shopv2",
	},
	{
		title: "SBMConcepts",
		subtitle: "B2B (Business-to-Business) Technology Service Provider",
		year: 2026,
		href: "https://sbmconcept.vercel.app/",
		tags: [
			"React 19",
			"React Router 7",
			"TanStack Query 5",
			"Tailwind CSS 4",
			"shadcn/ui",
			"Framer Motion",
		],
		image: "/SBMConcepts.png",
		codebase: "",
	},
]
