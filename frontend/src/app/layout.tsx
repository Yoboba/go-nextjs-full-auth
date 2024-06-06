import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { poppins } from "../lib/fonts";
import { ThemeProvider } from "../lib/theme_provider";
import { Toaster } from "@/components/ui/toaster";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "BLOCK",
  description: "Simple Blog Web Application inspired from https://medium.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-poppins antialiased",
          poppins.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
