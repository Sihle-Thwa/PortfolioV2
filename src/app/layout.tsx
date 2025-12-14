import type { Metadata } from "next";
import "./styles/tokens.css";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";

import ClientProviders from "./ClientProviders";

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
    locale: "en_UK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefin.className}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
