"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { PortfolioData, defaultPortfolioData } from "@/lib/types";
import { fetchPortfolioDataClient } from "@/lib/fetcher";

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

interface PortfolioProviderProps {
  children: ReactNode;
  initialData?: PortfolioData;
}

export function PortfolioProvider({
  children,
  initialData,
}: PortfolioProviderProps) {
  const [data, setData] = useState<PortfolioData>(
    initialData || defaultPortfolioData,
  );
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const portfolioData = await fetchPortfolioDataClient();
      setData(portfolioData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching portfolio data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }
  }, [initialData]);

  const refetch = async () => {
    await fetchData();
  };

  return (
    <PortfolioContext.Provider value={{ data, isLoading, error, refetch }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }

  return context;
}

// Hooks for accessing specific parts of the portfolio data
export function usePersonalInfo() {
  const { data } = usePortfolio();
  return data.personalInfo;
}

export function useAboutContent() {
  const { data } = usePortfolio();
  return data.aboutContent;
}

export function useContactContent() {
  const { data } = usePortfolio();
  return data.contactContent;
}

export function useSkillsContent() {
  const { data } = usePortfolio();
  return data.skillsContent;
}

export function useFooterContent() {
  const { data } = usePortfolio();
  return data.footerContent;
}

export function useExperiences() {
  const { data } = usePortfolio();
  return data.experiences;
}

export function useEducation() {
  const { data } = usePortfolio();
  return data.education;
}

export function useProjects() {
  const { data } = usePortfolio();
  return data.projects;
}

export function useSkillCategories() {
  const { data } = usePortfolio();
  return data.skillCategories;
}

export function useNavItems() {
  const { data } = usePortfolio();
  return data.navItems;
}

export function useSEO() {
  const { data } = usePortfolio();
  return data.seo;
}
