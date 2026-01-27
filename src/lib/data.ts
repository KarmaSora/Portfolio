export const personalInfo = {
  name: "Karam Matar",
  title: "Software Engineer & Game Developer",
  email: "karam@example.com",
  location: "Sweden",
  bio: "I'm a passionate software engineer and game developer with expertise in building scalable applications and immersive gaming experiences. Currently exploring the intersection of technology and creativity.",
  linkedin: "https://linkedin.com/in/karam-matar",
  github: "https://github.com/karam-matar",
  profileImage: "/images/profile.png",
};

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "trafikverket",
    role: "Software Developer Intern",
    company: "Trafikverket",
    location: "Sweden",
    period: "2024 - Present",
    description: [
      "Developed and maintained internal tools for infrastructure monitoring and management",
      "Collaborated with cross-functional teams to implement new features and optimize existing systems",
      "Utilized Azure DevOps for CI/CD pipelines and version control",
      "Contributed to documentation and knowledge sharing within the development team",
    ],
    technologies: ["C#", ".NET", "Azure DevOps", "SQL Server", "Git"],
  },
  {
    id: "bth",
    role: "Teaching Assistant",
    company: "Blekinge Institute of Technology",
    location: "Karlskrona, Sweden",
    period: "2023 - 2024",
    description: [
      "Assisted professors in delivering coursework for software engineering and game development courses",
      "Provided one-on-one tutoring and guidance to students on programming assignments",
      "Graded assignments and provided constructive feedback to improve student learning outcomes",
      "Helped organize and facilitate lab sessions for practical programming exercises",
    ],
    technologies: ["C++", "Java", "Python", "Teaching", "Mentoring"],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured: boolean;
  category: "web" | "game" | "tool";
}

export const projects: Project[] = [
  {
    id: "vulnerability-checker",
    title: "Vulnerability Checker 2.0",
    description:
      "An advanced security tool for detecting vulnerabilities in codebases and dependencies",
    longDescription:
      "A comprehensive security analysis tool that scans codebases for known vulnerabilities, outdated dependencies, and potential security risks. Features real-time monitoring, detailed reporting, and integration with popular CI/CD pipelines. Built with performance and scalability in mind to handle large enterprise codebases.",
    technologies: ["TypeScript", "Node.js", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/karam-matar/vulnerability-checker",
    image: "/images/vulnerability-checker.png",
    featured: true,
    category: "tool",
  },
  {
    id: "showcase-serl",
    title: "ShowcaseSERL",
    description:
      "A dynamic showcase platform for the Software Engineering Research Lab",
    longDescription:
      "An interactive web platform designed to showcase research projects, publications, and achievements from the Software Engineering Research Lab. Features a modern UI with kiosk mode support for public displays, dynamic content management, and responsive design. Implemented with accessibility and user experience as core priorities.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/karam-matar/showcase-serl",
    demo: "https://showcase-serl.vercel.app",
    image: "/images/showcase-serl.png",
    featured: true,
    category: "web",
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    description:
      "A modern remake of the classic arcade game with enhanced graphics and gameplay",
    longDescription:
      "A faithful yet enhanced recreation of the iconic Space Invaders arcade game. Features include modernized pixel art graphics, progressive difficulty scaling, power-ups, boss battles, and a global leaderboard system. Built using C++ with a custom game engine for optimal performance and smooth animations.",
    technologies: ["C++", "SDL2", "OpenGL", "Custom Engine"],
    github: "https://github.com/karam-matar/space-invaders",
    image: "/images/space-invaders.png",
    featured: true,
    category: "game",
  },
  {
    id: "death-marching-souls",
    title: "Death Marching Souls",
    description:
      "A challenging action RPG inspired by the souls-like genre",
    longDescription:
      "An intense action RPG featuring punishing combat, intricate level design, and deep character customization. Players explore a dark fantasy world filled with formidable enemies and hidden secrets. Implements complex AI behavior, stamina-based combat mechanics, and a narrative delivered through environmental storytelling.",
    technologies: ["C#", "Unity", "Blender", "FMOD"],
    github: "https://github.com/karam-matar/death-marching-souls",
    image: "/images/death-marching-souls.png",
    featured: true,
    category: "game",
  },
];

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: ["C++", "Java", "C#", "TypeScript", "Python", "JavaScript"],
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Framer Motion"],
  },
  {
    id: "backend",
    name: "Backend",
    skills: ["Node.js", "Flask", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    id: "tools",
    name: "Tools & Platforms",
    skills: ["Azure DevOps", "Git", "Docker", "Unity", "Unreal Engine", "VS Code"],
  },
];

export const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];
