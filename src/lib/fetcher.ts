import { PortfolioData, defaultPortfolioData } from "./types";

type DataSource = "local" | "github" | "custom";

/**
 * Get the data source from environment variables
 */
function getDataSource(): DataSource {
  const source = process.env.NEXT_PUBLIC_DATA_SOURCE || "local";
  return source as DataSource;
}

/**
 * Get the URL for fetching portfolio data based on the data source
 */
function getDataUrl(): string {
  const source = getDataSource();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  switch (source) {
    case "github":
      return process.env.NEXT_PUBLIC_GITHUB_DATA_URL || "";
    case "custom":
      return process.env.NEXT_PUBLIC_CUSTOM_API_URL || "";
    case "local":
    default:
      // For client-side fetching, use relative URL
      if (typeof window !== "undefined") {
        return `${basePath}/data/portfolio.json`;
      }
      // For server-side, use the full URL
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      return `${siteUrl}${basePath}/data/portfolio.json`;
  }
}

/**
 * Fetch portfolio data from the configured source
 * Works both on client and server side
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const url = getDataUrl();

    if (!url) {
      console.warn("No data URL configured, using default data");
      return defaultPortfolioData;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour for ISR
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
    }

    const data: PortfolioData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return defaultPortfolioData;
  }
}

/**
 * Fetch portfolio data on the client side
 * Uses a simpler fetch without Next.js specific options
 */
export async function fetchPortfolioDataClient(): Promise<PortfolioData> {
  try {
    const url = getDataUrl();

    if (!url) {
      console.warn("No data URL configured, using default data");
      return defaultPortfolioData;
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always get fresh data on client
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
    }

    const data: PortfolioData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return defaultPortfolioData;
  }
}

/**
 * Check if a feature is enabled via environment variables
 */
export function isFeatureEnabled(feature: string): boolean {
  const envVar = `NEXT_PUBLIC_ENABLE_${feature.toUpperCase().replace(/-/g, "_")}`;
  return process.env[envVar] !== "false";
}

/**
 * Get the base path for assets
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}
