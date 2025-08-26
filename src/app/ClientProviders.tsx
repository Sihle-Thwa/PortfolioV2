import { ThemeProvider } from "next-themes";

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
