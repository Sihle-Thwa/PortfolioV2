import type { Metadata } from "next";
import "./styles/tokens.css";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";

import ClientProviders from "./ClientProviders";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const josefin = Josefin_Sans({
	subsets: ["latin"],
});
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
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className={josefin.className}>
			<head />
			<body>
				<ClientProviders>
					<Header />
					<main>{children}</main>
					<Footer />
				</ClientProviders>
			</body>
		</html>
	);
}
