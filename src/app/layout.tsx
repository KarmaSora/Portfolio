import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PortfolioProvider } from "@/components/PortfolioProvider";
import "./globals.css";

// Load fonts using next/font for better performance
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karam Matar | Software Engineer & Game Developer",
  description:
    "Karam Matar is a Software Engineer and Game Developer specializing in C++, TypeScript, React, and Next.js. Explore my portfolio featuring projects like Vulnerability Checker 2.0, ShowcaseSERL, and more.",
  keywords: [
    "Karam Matar",
    "Software Engineer",
    "Game Developer",
    "C++",
    "TypeScript",
    "React",
    "Next.js",
    "Portfolio",
    "Full Stack Developer",
    "Sweden",
  ],
  authors: [{ name: "Karam Matar" }],
  creator: "Karam Matar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://karammatar.com",
    title: "Karam Matar | Software Engineer & Game Developer",
    description:
      "Explore my portfolio featuring innovative software projects, game development, and full-stack applications.",
    siteName: "Karam Matar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karam Matar | Software Engineer & Game Developer",
    description:
      "Explore my portfolio featuring innovative software projects, game development, and full-stack applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased font-sans">
        <ThemeProvider defaultTheme="dark">
          <PortfolioProvider>{children}</PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
