import type { Metadata } from "next";
import { createElement, type ReactNode } from "react";
import "./styles/tokens.css";
import "./globals.css";


import { ClientProviders } from "./ClientProviders";

export const metadata: Metadata = {
	title: "Siphesihle B. Mthethwa | Portfolio",
	description: "Minimal modern full-stack portfolio by Siphesihle B. Mthethwa",
	icons: {
		icon: "/icons/SBMLogo.png",
		shortcut: "/icons/SBMLogo.png",
		apple: "/icons/SBMLogo.png",
	},
	openGraph: {
		title: "Siphesihle B. Mthethwa | Portfolio",
		description:
			"Minimal modern full-stack portfolio by Siphesihle B. Mthethwa",
		url: "https://siphesihle-b-mthethwa.vercel.app",
		siteName: "SBM Portfolio",
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return createElement(
		"html",
		{ lang: "en" },
		createElement("head", null),
		createElement(
			"body",
			null,
			createElement(
				ClientProviders,
				null,
				createElement("main", null, children),
			),
		),
	);
}
