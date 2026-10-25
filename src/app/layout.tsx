import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PortfolioProvider } from "@/components/PortfolioProvider";
import type { PortfolioData } from "@/lib/types";
import portfolioData from "../../public/data/portfolio.json";
import "./globals.css";

// Load fonts using next/font for better performance
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});



// Include local content in the exported HTML while retaining remote data sources.
const useLocalData =
  !process.env.NEXT_PUBLIC_DATA_SOURCE ||
  process.env.NEXT_PUBLIC_DATA_SOURCE === "local";

export const metadata: Metadata = {
  metadataBase: new URL(portfolioData.seo.url),
  title: portfolioData.seo.title,
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  authors: [{ name: "Karam Matar" }],
  creator: "Karam Matar",
  icons: {
    icon: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg`, type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: portfolioData.seo.locale,
    url: portfolioData.seo.url,
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    siteName: "Karam Matar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
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
      className={`dark ${manrope.variable}`}
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
                  var dark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', dark);
                  document.documentElement.classList.toggle('light', !dark);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${manrope.className} min-h-screen bg-background antialiased`}>
        {/* Skip to content link for accessibility - keyboard users */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider defaultTheme="dark">
          <PortfolioProvider
            initialData={useLocalData ? (portfolioData as PortfolioData) : undefined}
          >
            {children}
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
