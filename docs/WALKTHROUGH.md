# Portfolio Codebase Walkthrough

This document explains the technologies, libraries, architecture, and how to customize this portfolio for different CV data.

---

## 📚 Technology Stack Overview

### Core Framework: **Next.js 14** (React)

**What it is:** Next.js is a React framework that adds server-side rendering (SSR), static site generation (SSG), file-based routing, and optimizations out of the box.

**Where it's used:**
- `src/app/` - The App Router (Next.js 13+ routing system)
- `src/app/layout.tsx` - Root layout that wraps all pages
- `src/app/page.tsx` - The main homepage component
- `next.config.js` - Next.js configuration

**Key Features Used:**
```tsx
// Server-side rendering with Metadata API (layout.tsx)
export const metadata: Metadata = {
  title: "Karam Matar | Software Engineer",
  description: "...",
  // SEO metadata is automatically injected
};

// next/font for optimized font loading
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

---

### Language: **TypeScript**

**What it is:** TypeScript adds static type checking to JavaScript, catching errors at compile time.

**Where it's used:**
- `src/lib/types.ts` - Type definitions for all data structures
- All `.tsx` and `.ts` files use strict typing

**Example:**
```typescript
// types.ts - Defines the shape of your data
export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  // ...
}
```

---

### Styling: **Tailwind CSS**

**What it is:** A utility-first CSS framework that lets you style elements using predefined classes directly in your HTML/JSX.

**Where it's used:**
- `tailwind.config.ts` - Configuration and theme customization
- `src/app/globals.css` - Global styles and CSS variables
- Every component uses Tailwind classes

**Example:**
```tsx
// Tailwind classes applied directly
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
  
// breakpoints: md: = 768px+, lg: = 1024px+
// gap-6 = 1.5rem gap between grid items
// max-w-7xl = maximum width of 80rem
// mx-auto = center horizontally
```

**CSS Variables for theming (globals.css):**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 262.1 83.3% 57.8%;
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
}
```

---

### Animation: **Framer Motion**

**What it is:** A production-ready animation library for React with a declarative API.

**Where it's used:**
- `Skills.tsx`, `Hero.tsx`, `Projects.tsx`, etc.
- Scroll-triggered animations via `useInView`
- Hover effects and staggered child animations

**Example from Skills.tsx:**
```tsx
import { motion, useInView } from "framer-motion";

// Animation variants define animation states
const cardVariants = {
  hidden: { opacity: 0, y: 30 },        // Starting state
  visible: { opacity: 1, y: 0,          // End state
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  },
};

// useInView triggers animation when element enters viewport
const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

// Apply animation to elements
<motion.div
  variants={cardVariants}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  whileHover={{ y: -5 }}  // Interactive hover effect
>
```

---

### Icons: **Lucide React**

**What it is:** A beautiful, consistent icon library (fork of Feather Icons) with React components.

**Where it's used:**
- `Skills.tsx` - Category icons (Code2, Layout, Server, etc.)
- `Navigation.tsx` - Menu icons
- `Contact.tsx` - Social media icons

**Example:**
```tsx
import { Code2, Layout, Server, Wrench, Languages, Gamepad2 } from "lucide-react";

// Icons are React components
<Code2 className="w-6 h-6 text-white" />
```

---

### Utility Libraries

| Library | Purpose | Where Used |
|---------|---------|------------|
| `clsx` | Conditionally join classNames | Throughout components |
| `tailwind-merge` | Merge Tailwind classes without conflicts | `lib/utils.ts` |
| `class-variance-authority` | Create component variants | Buttons, cards |

**Example (lib/utils.ts):**
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage: Merge classes conditionally
<div className={cn(
  "base-class",
  isActive && "active-class",
  customClassName
)} />
```

---

## 🏗️ Architecture Overview

```
portfolioOne/
├── public/
│   └── data/
│       └── portfolio.json      ← YOUR CV DATA LIVES HERE
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout (fonts, providers, SEO)
│   │   ├── page.tsx            ← Main page (assembles all sections)
│   │   └── globals.css         ← Global styles & CSS variables
│   ├── components/
│   │   ├── PortfolioProvider.tsx ← Fetches & provides CV data
│   │   ├── Hero.tsx            ← Landing section
│   │   ├── About.tsx           ← About me section
│   │   ├── Experience.tsx      ← Work experience
│   │   ├── Projects.tsx        ← Project showcase
│   │   ├── Skills.tsx          ← Skills grid
│   │   ├── Contact.tsx         ← Contact form
│   │   └── ...
│   └── lib/
│       ├── types.ts            ← TypeScript interfaces
│       ├── fetcher.ts          ← Data fetching logic
│       └── utils.ts            ← Helper functions
└── package.json
```

---

## 🔄 Data Flow

```
portfolio.json → fetcher.ts → PortfolioProvider → React Context → Components
```

1. **Data Source:** `public/data/portfolio.json` contains all CV data
2. **Fetching:** `fetcher.ts` loads the JSON (supports local, GitHub, or custom API)
3. **Provider:** `PortfolioProvider.tsx` stores data in React Context
4. **Hooks:** Components use hooks like `useSkillCategories()`, `useProjects()`, etc.

---

## 🎨 How to Display Different CV Data

### Step 1: Edit `portfolio.json`

The **only file you need to edit** for basic customization is:
```
public/data/portfolio.json
```

Here's the complete structure:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Job Title",
    "email": "your@email.com",
    "location": "City, Country",
    "bio": "A brief description of yourself...",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "profileImage": "/images/profile.png",
    "available": true,
    "availableText": "Available for opportunities"
  },
  
  "experiences": [
    {
      "id": "unique-id-1",
      "role": "Job Title",
      "company": "Company Name",
      "location": "City, Country",
      "period": "Jan 2024 - Present",
      "description": [
        "Bullet point 1 about what you did",
        "Bullet point 2 about achievements"
      ],
      "technologies": ["React", "Node.js", "AWS"]
    }
  ],
  
  "projects": [
    {
      "id": "project-1",
      "title": "Project Name",
      "description": "Short description for cards",
      "longDescription": "Detailed description for modal",
      "technologies": ["React", "TypeScript"],
      "github": "https://github.com/...",
      "demo": "https://live-demo.com",
      "image": "/images/project.png",
      "featured": true,
      "category": "web"  // "web" | "game" | "tool"
    }
  ],
  
  "skillCategories": [
    {
      "id": "programming",  // Must match mapping in Skills.tsx
      "name": "Programming Languages",
      "skills": ["JavaScript", "Python", "C++"]
    },
    {
      "id": "frontend",
      "name": "Frontend",
      "skills": ["React", "Next.js", "Tailwind CSS"]
    }
  ],
  
  "navItems": [
    { "id": "home", "label": "Home", "href": "#home" },
    { "id": "about", "label": "About", "href": "#about" }
  ],
  
  "seo": {
    "title": "Your Name | Your Title",
    "description": "SEO description for search engines",
    "keywords": ["keyword1", "keyword2"],
    "url": "https://yoursite.com",
    "locale": "en_US"
  }
}
```

### Step 2: Update Skill Category Mappings (if needed)

If you add **new skill category IDs**, update `Skills.tsx`:

```tsx
// src/components/Skills.tsx

const categoryIcons: Record<string, typeof Code2> = {
  "spoken-languages": Languages,
  programming: Code2,
  frontend: Layout,
  backend: Server,
  "game-dev": Gamepad2,
  tools: Wrench,
  // ADD NEW CATEGORIES HERE:
  "mobile": Smartphone,
  "cloud": Cloud,
  "databases": Database,
};

const categoryColors: Record<string, string> = {
  "spoken-languages": "from-pink-500 to-rose-500",
  programming: "from-violet-500 to-purple-500",
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  "game-dev": "from-red-500 to-orange-500",
  tools: "from-orange-500 to-amber-500",
  // ADD MATCHING COLORS:
  "mobile": "from-teal-500 to-cyan-500",
  "cloud": "from-sky-500 to-blue-500",
  "databases": "from-amber-500 to-yellow-500",
};
```

### Step 3: Replace Images

Put your images in `public/images/`:
- `profile.png` - Your profile photo
- Project screenshots (referenced in portfolio.json)

### Step 4: Update Static Metadata (optional)

For SEO titles that appear in browser tabs, edit `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Name | Your Title",
  description: "Your portfolio description",
  // ...
};
```

---

## 🚀 Quick Start for a New Person's CV

1. **Clone/Copy** the project
2. **Replace** `public/data/portfolio.json` with new CV data
3. **Add** new profile/project images to `public/images/`
4. **(Optional)** Add new skill category icons/colors in `Skills.tsx`
5. **Run**: `npm run dev` → Visit `http://localhost:3000`

---

## 📁 File-by-File Summary

| File | Purpose |
|------|---------|
| `portfolio.json` | **YOUR DATA** - Edit this to change CV content |
| `types.ts` | TypeScript interfaces defining data structure |
| `fetcher.ts` | Loads data from JSON/API |
| `PortfolioProvider.tsx` | React Context for global data access |
| `Skills.tsx` | Renders skill categories with icons |
| `Projects.tsx` | Project cards with modal details |
| `Experience.tsx` | Work history timeline |
| `Hero.tsx` | Landing section with name/title |
| `About.tsx` | Bio and personal information |
| `Contact.tsx` | Contact form and links |
| `globals.css` | Colors, fonts, theme variables |
| `tailwind.config.ts` | Tailwind customization |

---

## 🔧 Common Customizations

### Change Colors
Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --primary: 262.1 83.3% 57.8%;  /* HSL format */
}
```

### Add New Section
1. Create `src/components/NewSection.tsx`
2. Export from `src/components/index.ts`
3. Add to `src/app/page.tsx`
4. Add to navItems in `portfolio.json`

### Change Fonts
Edit `src/app/layout.tsx`:
```tsx
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
```

---

## 🏃 Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check for code issues
```
