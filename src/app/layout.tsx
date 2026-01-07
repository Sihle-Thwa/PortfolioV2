"use client";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";

import ClientProviders from "./ClientProviders";

const josefin = Josefin_Sans({
  subsets: ["latin"], variable: "--font-josefin", weight: ["300", "400", "500", "600", "700"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    renderLayout()
  );

  function renderLayout() {
    return <html lang="en" className={josefin.className}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>;
  }
}
