import type { Metadata } from "next";
import {  type ReactNode } from "react";
import { Space_Grotesk as Grotesk } from "next/font/google";
import "./globals.css";

import { ClientProviders } from "./ClientProviders";

export const metadata: Metadata = {
	title: "Siphesihle B. Mthethwa | Portfolio",
	description: "Minimal Modern portfolio by Siphesihle B. Mthethwa",
	icons: {
		icon: "/icons/SBMLogo.png",
		shortcut: "/icons/SBMLogo.png",
		apple: "/icons/SBMLogo.png",
	},
	openGraph: {
		title: "Siphesihle B. Mthethwa | Portfolio",
		description:
			"Minimal Modern portfolio by Siphesihle B. Mthethwa",
		url: "https://siphesihle-b-mthethwa.vercel.app",
		siteName: "SBM Portfolio",
		type: "website",
	},
};

const grotesk = Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html className={grotesk.className} lang="en">
			<head />
			<body>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	);
}
