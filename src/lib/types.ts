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
  initials: string;
  githubUsername: string;
  linkedinName: string;
  resumeUrl: string;
}

export interface AboutContent {
  sectionTitle: string;
  sectionSubtitle: string;
  paragraphs: string[];
  stats: Stat[];
}

export interface Stat {
  label: string;
  value: string;
  icon: "briefcase" | "code" | "graduation";
}

export interface ContactContent {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export interface SkillsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  learningTitle: string;
  currentlyLearning: string[];
}

export interface FooterContent {
  tagline: string;
  builtWith: string;
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

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  details: string[];
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
  category: "web" | "game" | "tool" | "systems";
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
  aboutContent: AboutContent;
  contactContent: ContactContent;
  skillsContent: SkillsContent;
  footerContent: FooterContent;
  experiences: Experience[];
  education: Education[];
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
    initials: "YN",
    githubUsername: "@username",
    linkedinName: "Your Name",
    resumeUrl: "/resume.pdf",
  },
  aboutContent: {
    sectionTitle: "About Me",
    sectionSubtitle: "Who Am I?",
    paragraphs: ["Tell your story here."],
    stats: [
      { label: "Years Experience", value: "0+", icon: "briefcase" },
      { label: "Projects", value: "0+", icon: "code" },
      { label: "Technologies", value: "0+", icon: "graduation" },
    ],
  },
  contactContent: {
    sectionTitle: "Get In Touch",
    sectionSubtitle: "Let's Work Together",
    sectionDescription: "I'm always open to new opportunities.",
    ctaTitle: "Ready to Start a Project?",
    ctaDescription: "Feel free to reach out!",
    ctaButtonText: "Send Me an Email",
  },
  skillsContent: {
    sectionTitle: "Expertise",
    sectionSubtitle: "Skills & Technologies",
    learningTitle: "Always learning and exploring new technologies. Currently interested in:",
    currentlyLearning: [],
  },
  footerContent: {
    tagline: "Developer passionate about creating digital experiences.",
    builtWith: "Built with Next.js & Tailwind",
  },
  experiences: [],
  education: [],
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
