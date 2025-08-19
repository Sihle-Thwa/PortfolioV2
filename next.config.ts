import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--colour-bg)",
        surface: "var(--colour-surface)",
        muted: "var(--colour-muted)",
        fg: "var(--colour-fg)",
        "fg-muted": "var(--colour-fg-muted)",
        primary: "var(--colour-primary)",
        accent: "var(--colour-accent)",
        aux: "var(--colour-secondary)",
        border: "var(--colour-border)",
        ring: "var(--colour-ring)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};

export default nextConfig;
