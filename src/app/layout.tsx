// app/layout.tsx
"use client";  // mark as client to use ThemeProvider (which relies on client-side context)
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "./styles/tokens.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
