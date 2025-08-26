
import { ThemeProvider } from "next-themes";

// ThemeProvider uses "class" to apply theme classes to <body>, "system" to default to user's OS preference,
// and enableSystem to allow automatic switching based on system theme.

type ClientProvidersProps = {
    children: React.ReactNode;
};

export default function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}

          