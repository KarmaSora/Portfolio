// Type definitions for portfolio data

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  linkedin: string;
  github: string;
  profileImage: string;
  available: boolean;
  availableText: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github?: string | null;
  demo?: string | null;
  image?: string | null;
  featured: boolean;
  category: "web" | "game" | "tool";
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  locale: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  navItems: NavItem[];
  seo: SEOData;
}

// Default/fallback data in case fetch fails
export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Your Name",
    title: "Your Title",
    email: "email@example.com",
    location: "Location",
    bio: "Your bio goes here.",
    linkedin: "#",
    github: "#",
    profileImage: "/images/profile.png",
    available: true,
    availableText: "Available for opportunities",
  },
  experiences: [],
  projects: [],
  skillCategories: [],
  navItems: [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  seo: {
    title: "Portfolio",
    description: "My personal portfolio",
    keywords: [],
    url: "",
    locale: "en_US",
  },
};
