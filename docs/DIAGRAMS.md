# Portfolio One - Visual Documentation

## Work Breakdown Structure (WBS)

```mermaid
mindmap
  root((Portfolio One))
    Core Application
      Next.js 14 App Router
      TypeScript Configuration
      Static Export Setup
    Data Layer
      portfolio.json
      TypeScript Types
      Data Fetcher
      Portfolio Context
    UI Components
      Navigation
      Hero Section
      About Section
      Experience Timeline
      Projects Grid
      Skills Display
      Contact Form
      Footer
    Styling
      Tailwind CSS
      CSS Variables
      Dark/Light Theme
      Framer Motion
    Features
      Theme Toggle
      Kiosk Mode
      Responsive Design
      SEO Optimization
```

## System Architecture

```mermaid
flowchart TB
    subgraph "Data Source"
        JSON[("portfolio.json")]
        ENV[".env.local"]
    end

    subgraph "Data Layer"
        FETCHER["fetcher.ts"]
        TYPES["types.ts"]
        PROVIDER["PortfolioProvider.tsx"]
    end

    subgraph "Application Shell"
        LAYOUT["layout.tsx"]
        PAGE["page.tsx"]
        THEME["ThemeProvider.tsx"]
    end

    subgraph "UI Components"
        NAV["Navigation.tsx"]
        HERO["Hero.tsx"]
        ABOUT["About.tsx"]
        EXP["Experience.tsx"]
        PROJ["Projects.tsx"]
        SKILLS["Skills.tsx"]
        CONTACT["Contact.tsx"]
        FOOTER["Footer.tsx"]
    end

    subgraph "Hooks"
        H1["usePersonalInfo()"]
        H2["useExperiences()"]
        H3["useProjects()"]
        H4["useSkillCategories()"]
        H5["useNavItems()"]
    end

    JSON --> FETCHER
    ENV --> FETCHER
    FETCHER --> PROVIDER
    TYPES --> PROVIDER

    LAYOUT --> THEME
    THEME --> PROVIDER
    PROVIDER --> PAGE

    PAGE --> NAV
    PAGE --> HERO
    PAGE --> ABOUT
    PAGE --> EXP
    PAGE --> PROJ
    PAGE --> SKILLS
    PAGE --> CONTACT
    PAGE --> FOOTER

    PROVIDER --> H1 & H2 & H3 & H4 & H5
    H1 --> HERO & ABOUT & CONTACT
    H2 --> EXP
    H3 --> PROJ
    H4 --> SKILLS
    H5 --> NAV
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant B as Build Time
    participant L as layout.tsx
    participant F as fetcher.ts
    participant J as portfolio.json
    participant P as PortfolioProvider
    participant C as Components
    participant U as User

    B->>L: Start Build
    L->>F: getStaticPortfolioData()
    F->>J: Read JSON file
    J-->>F: Raw Data
    F-->>L: PortfolioData
    L->>P: Pass initialData
    P->>C: Provide via Context
    B->>B: Generate Static HTML

    U->>C: View Page
    C->>P: usePersonalInfo()
    P-->>C: Return cached data
    C-->>U: Render UI
```

## Component Hierarchy

```mermaid
graph TD
    A[RootLayout] --> B[ThemeProvider]
    B --> C[PortfolioProvider]
    C --> D[Page]

    D --> E[Navigation]
    D --> F[Hero]
    D --> G[About]
    D --> H[Experience]
    D --> I[Projects]
    D --> J[Skills]
    D --> K[Contact]
    D --> L[Footer]

    E --> E1[NavLinks]
    E --> E2[ThemeToggle]
    E --> E3[MobileMenu]

    F --> F1[Title]
    F --> F2[Subtitle]
    F --> F3[CTAButton]

    G --> G1[ProfileImage]
    G --> G2[Bio]
    G --> G3[InfoGrid]

    H --> H1[Timeline]
    H1 --> H2[ExperienceCard]

    I --> I1[ProjectCard]
    I1 --> I2[TechBadges]
    I1 --> I3[Links]

    J --> J1[SkillCategory]
    J1 --> J2[SkillBadge]

    K --> K1[ContactInfo]
    K --> K2[SocialLinks]
```

## File Structure Tree

```mermaid
graph LR
    subgraph "portfolioOne/"
        A[src/] --> B[app/]
        A --> C[components/]
        A --> D[lib/]

        B --> B1[layout.tsx]
        B --> B2[page.tsx]
        B --> B3[globals.css]

        C --> C1[Hero.tsx]
        C --> C2[About.tsx]
        C --> C3[Experience.tsx]
        C --> C4[Projects.tsx]
        C --> C5[Skills.tsx]
        C --> C6[Contact.tsx]
        C --> C7[Navigation.tsx]
        C --> C8[ThemeProvider.tsx]
        C --> C9[PortfolioProvider.tsx]

        D --> D1[types.ts]
        D --> D2[fetcher.ts]
        D --> D3[utils.ts]

        E[public/] --> E1[data/]
        E1 --> E2[portfolio.json]
        E --> E3[images/]
    end
```

## Build & Deploy Process

```mermaid
flowchart LR
    subgraph "Development"
        A[Edit Code] --> B[npm run dev]
        B --> C[Hot Reload]
        C --> A
    end

    subgraph "Build"
        D[npm run build] --> E[Read portfolio.json]
        E --> F[Generate Static HTML]
        F --> G[Output to /out]
    end

    subgraph "Deploy"
        G --> H{Platform?}
        H -->|GitHub Pages| I[gh-pages -d out]
        H -->|Vercel| J[Auto Deploy]
        H -->|Netlify| K[Drag & Drop]
    end

    subgraph "Production"
        I & J & K --> L[Static Site Live]
        L --> M[User Visits]
    end
```

## Theme System

```mermaid
stateDiagram-v2
    [*] --> CheckSystem: Page Load

    CheckSystem --> Dark: System Prefers Dark
    CheckSystem --> Light: System Prefers Light
    CheckSystem --> Stored: Has localStorage

    Stored --> Dark: stored = dark
    Stored --> Light: stored = light

    Dark --> Light: Toggle Click
    Light --> Dark: Toggle Click

    Dark --> SaveDark: Update localStorage
    Light --> SaveLight: Update localStorage

    state Dark {
        [*] --> ApplyDarkCSS
        ApplyDarkCSS --> DarkUI
    }

    state Light {
        [*] --> ApplyLightCSS
        ApplyLightCSS --> LightUI
    }
```
