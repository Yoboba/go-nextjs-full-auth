import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { poppins, inter } from "../lib/fonts";
import { ThemeProvider } from "../lib/theme_provider";
import { Toaster } from "@/components/ui/toaster";
import "../styles/globals.css";
import NavbarSectionIndex from "@/containers/landing_page/navbar_section";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
