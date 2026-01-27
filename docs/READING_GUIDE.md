# Portfolio One - Code Understanding Guide

## 📚 Recommended Reading Order

Read files in this order to build understanding progressively:

### Phase 1: Foundation (15 minutes)

**Understanding the data and types**

1. **[public/data/portfolio.json](../public/data/portfolio.json)** ⭐ START HERE
   - **Purpose**: Single source of truth for all portfolio content
   - **What it contains**: All your data - experiences, projects, skills, contact info
   - **Modify this when**: You want to update experiences, projects, skills, or personal info
   - **Languages**: JSON
   - **Key sections**:
     - `personalInfo` - Your name, bio, links
     - `experiences` - Work history
     - `projects` - Portfolio projects
     - `skillCategories` - Technical skills grouped
     - `navItems` - Navigation links
     - `seo` - SEO metadata

2. **[src/lib/types.ts](../src/lib/types.ts)**
   - **Purpose**: TypeScript interfaces that define the shape of your data
   - **What it does**: Creates type contracts so data is validated
   - **Modify this when**: You add new fields to portfolio.json
   - **Languages**: TypeScript
   - **Key types**:
     - `PersonalInfo` - Profile structure
     - `Experience` - Work experience structure
     - `Project` - Project structure
     - `SkillCategory` - Skills structure
   - **How it connects**: Directly matches the JSON structure
   - **Example**: If you add a `certifications` field to JSON, you'd define it here first

---

### Phase 2: Data Management (20 minutes)

**How data flows into the application**

3. **[src/lib/fetcher.ts](../src/lib/fetcher.ts)**
   - **Purpose**: Loads portfolio data from different sources
   - **What it does**:
     - Reads JSON file
     - Supports multiple data sources (local, GitHub, custom API)
   - **Modify this when**: You want to change how data is loaded (e.g., from API)
   - **Languages**: TypeScript
   - **Key functions**:
     - `fetchPortfolioData()` - Main function to get data
     - `getStaticPortfolioData()` - For static generation (build time)
     - `readLocalPortfolioData()` - Reads from file system
   - **Packages used**:
     - `fs` - Node.js file system
     - `path` - Path utilities
   - **How it connects**: Takes JSON → converts to TypeScript types → returns to layout

4. **[src/lib/PortfolioProvider.tsx](../src/lib/PortfolioProvider.tsx)**
   - **Purpose**: Makes data available to all components
   - **What it does**:
     - Creates React Context
     - Distributes data through specialized hooks
     - Handles loading/error states
   - **Modify this when**: You add new data sections (add new hooks here)
   - **Languages**: TypeScript, React
   - **Key functions**:
     - `PortfolioProvider` - Context provider component
     - `usePersonalInfo()` - Get personal info anywhere
     - `useExperiences()` - Get experiences anywhere
     - `useProjects()` - Get projects anywhere
     - And 3 more specialized hooks...
   - **Packages used**:
     - React Context API
   - **How it connects**: Consumes data from fetcher → wraps app → provides to components
   - **Pattern**: If you add `certifications` to JSON, add `useCertifications()` hook here

---

### Phase 3: Application Shell (15 minutes)

**How the app is structured**

5. **[src/app/layout.tsx](../src/app/layout.tsx)**
   - **Purpose**: Root layout that wraps entire app
   - **What it does**:
     - Loads data at build time
     - Sets up providers (Theme, Portfolio)
     - Configures fonts and metadata
   - **Modify this when**: You change SEO metadata or add new global providers
   - **Languages**: TypeScript, TSX
   - **Key elements**:
     - `getStaticPortfolioData()` - Fetch data at build
     - `ThemeProvider` - Enable dark/light mode
     - `PortfolioProvider` - Enable data access
     - Metadata setup
   - **Packages used**:
     - Next.js Font (Google Fonts)
     - next/image
   - **How it connects**: Gets data → wraps Page component → provides to all sections
   - **Flow**: Build time → Read JSON → layout.tsx → Page.tsx → Components

6. **[src/app/globals.css](../src/app/globals.css)**
   - **Purpose**: Global styles, colors, animations, theme variables
   - **What it does**:
     - Defines CSS variables for light/dark themes
     - Custom animations (fade, glow, etc.)
     - Tailwind configuration
   - **Modify this when**: You want to change colors, add animations, or adjust theme
   - **Languages**: CSS
   - **Key sections**:
     - `:root` - Light theme colors
     - `.dark` - Dark theme colors
     - `@keyframes` - Animation definitions
   - **Color Variables**:
     - `--background`, `--foreground` - Main colors
     - `--primary`, `--secondary` - Accent colors
     - Custom properties for every component state
   - **How it connects**: Provides colors used in all components via Tailwind

7. **[src/app/page.tsx](../src/app/page.tsx)**
   - **Purpose**: Main page composition
   - **What it does**:
     - Imports all section components
     - Tracks active scroll section
     - Renders layout structure
   - **Modify this when**: You rearrange sections or add new sections
   - **Languages**: TypeScript, TSX
   - **Key features**:
     - Scroll tracking for navbar highlighting
     - Section ordering
   - **How it connects**: Uses components from src/components/ → creates page layout

---

### Phase 4: UI Components (30 minutes)

**The visible parts users interact with**

8. **[src/components/Navigation.tsx](../src/components/Navigation.tsx)**
   - **Purpose**: Top navigation bar
   - **What it does**: Renders navbar with links and theme toggle
   - **Modify this when**: You want to change nav links or styling
   - **Languages**: TypeScript, TSX, CSS (Tailwind)
   - **Data dependencies**: `useNavItems()`, `usePersonalInfo()`
   - **Packages used**: `lucide-react` (icons), `clsx` (conditional classes)
   - **How it connects**: Gets nav links from Context → displays in header

9. **[src/components/Hero.tsx](../src/components/Hero.tsx)**
   - **Purpose**: Landing section with title
   - **What it does**: Displays hero content and CTA button
   - **Modify this when**: You want different hero styling
   - **Languages**: TypeScript, TSX
   - **Data dependencies**: `usePersonalInfo()` (for name/title)
   - **How it connects**: Gets your name/title from context

10. **[src/components/About.tsx](../src/components/About.tsx)**
    - **Purpose**: About section with bio and skills
    - **What it does**: Displays profile image, bio, and skills grid
    - **Modify this when**: You update skills or bio styling
    - **Languages**: TypeScript, TSX
    - **Data dependencies**: `usePersonalInfo()`, `useSkillCategories()`
    - **How it connects**: Gets personal info and skills from context

11. **[src/components/Experience.tsx](../src/components/Experience.tsx)**
    - **Purpose**: Work experience timeline
    - **What it does**: Shows work history in timeline format
    - **Modify this when**: You add/remove jobs or change timeline styling
    - **Languages**: TypeScript, TSX
    - **Data dependencies**: `useExperiences()`
    - **How it connects**: Gets work history from context

12. **[src/components/Projects.tsx](../src/components/Projects.tsx)**
    - **Purpose**: Project portfolio showcase
    - **What it does**: Displays projects in grid with filtering
    - **Modify this when**: You add projects or change project layout
    - **Languages**: TypeScript, TSX
    - **Data dependencies**: `useProjects()`
    - **How it connects**: Gets projects from context
    - **To add a project**:
      1. Add to `portfolio.json` projects array
      2. Component automatically displays it

13. **[src/components/Skills.tsx](../src/components/Skills.tsx)**
    - **Purpose**: Skills display
    - **What it does**: Shows skills grouped by category
    - **Modify this when**: You update skills
    - **Languages**: TypeScript, TSX
    - **Data dependencies**: `useSkillCategories()`
    - **How it connects**: Gets skills from context

14. **[src/components/Contact.tsx](../src/components/Contact.tsx)**
    - **Purpose**: Contact section
    - **What it does**: Shows contact info and links
    - **Modify this when**: You update contact methods
    - **Languages**: TypeScript, TSX
    - **Data dependencies**: `usePersonalInfo()`
    - **How it connects**: Gets contact info from context

15. **[src/components/Footer.tsx](../src/components/Footer.tsx)**
    - **Purpose**: Footer section
    - **What it does**: Displays footer content
    - **Languages**: TypeScript, TSX

---

### Phase 5: Theme & Utilities (10 minutes)

**Supporting infrastructure**

16. **[src/components/ThemeProvider.tsx](../src/components/ThemeProvider.tsx)**
    - **Purpose**: Dark/light theme management
    - **What it does**: Enables theme switching
    - **Languages**: TypeScript, TSX
    - **Packages used**: `next-theme`
    - **How it connects**: Wraps app → allows components to toggle theme

17. **[src/components/ThemeToggle.tsx](../src/components/ThemeToggle.tsx)**
    - **Purpose**: Theme toggle button
    - **What it does**: Button to switch dark/light mode
    - **Languages**: TypeScript, TSX
    - **Packages used**: `next-theme`, `lucide-react`

18. **[src/components/Skeleton.tsx](../src/components/Skeleton.tsx)**
    - **Purpose**: Loading placeholder UI
    - **What it does**: Shows skeleton screens while data loads
    - **Languages**: TypeScript, TSX

19. **[src/lib/utils.ts](../src/lib/utils.ts)**
    - **Purpose**: Utility functions
    - **What it does**: Helper functions used throughout
    - **Languages**: TypeScript
    - **Common utilities**: `cn()` for merging CSS classes

---

## 🔄 How Data Flows Through the App

```
portfolio.json (Data)
    ↓
fetcher.ts (Loads & parses)
    ↓
layout.tsx (Async - runs at build time)
    ↓
PortfolioProvider (Creates context)
    ↓
page.tsx + Components (Consume via hooks)
    ↓
User Browser (Static HTML rendered)
```

---

## 📝 Common Modification Scenarios

### Scenario 1: Add a New Project

```
1. Edit portfolio.json → Add to "projects" array
2. Optionally modify components/Projects.tsx if you want different styling
3. Rebuild → New project appears automatically
```

### Scenario 2: Update Skills

```
1. Edit portfolio.json → Modify "skillCategories"
2. No component changes needed
3. Rebuild → Skills update automatically
```

### Scenario 3: Change Your Bio

```
1. Edit portfolio.json → Update "personalInfo.bio"
2. No component changes needed
3. Rebuild → Bio displays everywhere it's used
```

### Scenario 4: Add a New Data Type (e.g., Certifications)

```
1. Add to portfolio.json structure
2. Add interface to src/lib/types.ts
3. Add hook to src/lib/PortfolioProvider.tsx
4. Use new hook in relevant component
5. Rebuild
```

### Scenario 5: Change Colors/Theme

```
1. Edit src/app/globals.css
2. Modify CSS custom properties in :root or .dark
3. Rebuild or hot reload
```

---

## 🗂️ File Dependency Map

```
portfolio.json
    ↓
types.ts (validates structure)
    ↓
fetcher.ts (loads & parses)
    ↓
layout.tsx (gets data)
    ↓
PortfolioProvider.tsx (distributes data)
    ↓
Individual Components:
  ├─ Hero.tsx
  ├─ About.tsx
  ├─ Experience.tsx
  ├─ Projects.tsx
  ├─ Skills.tsx
  ├─ Contact.tsx
  └─ Navigation.tsx

Supporting Files:
├─ globals.css (styling)
├─ ThemeProvider.tsx (theme logic)
├─ ThemeToggle.tsx (theme button)
├─ Skeleton.tsx (loading states)
└─ utils.ts (helpers)
```

---

## 📦 Key Packages Used

| Package                    | Purpose            | Used In                     |
| -------------------------- | ------------------ | --------------------------- |
| `next`                     | React framework    | layout.tsx, page.tsx        |
| `react`                    | UI library         | All .tsx files              |
| `typescript`               | Type safety        | All .ts/.tsx files          |
| `tailwindcss`              | Styling            | globals.css, all components |
| `framer-motion`            | Animations         | Components with animations  |
| `lucide-react`             | Icons              | Navigation, components      |
| `next-theme`               | Theme management   | ThemeProvider.tsx           |
| `class-variance-authority` | Component variants | UI components               |
| `clsx`                     | CSS class merging  | Components                  |

---

## 🎯 Understanding Path

1. **Day 1**: Read portfolio.json + types.ts (5 min) - Understand data structure
2. **Day 1**: Read fetcher.ts + PortfolioProvider.tsx (10 min) - Understand data flow
3. **Day 1**: Read layout.tsx + page.tsx (10 min) - Understand app structure
4. **Day 2**: Read components (30 min) - Understand UI
5. **Day 2**: Read globals.css (10 min) - Understand styling
6. **Day 3**: Read supporting files (10 min) - Fill gaps

**Total time to understand**: ~1.5 hours

---

## ✅ Verification Checklist

After reading all files, you should be able to answer:

- [ ] Where is all my portfolio content stored?
- [ ] How does data get from JSON to the components?
- [ ] What hook do I use to get experiences in a component?
- [ ] How would I add a new section to the portfolio?
- [ ] Where do I change colors?
- [ ] What happens during the build process?
- [ ] How do I add a new data field (like certifications)?
- [ ] Which file is responsible for loading the JSON?
- [ ] How does the theme system work?
- [ ] What components are responsible for displaying projects?
