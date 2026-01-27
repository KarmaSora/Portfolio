# Karam Matar Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, dynamic data loading, and a beautiful dark/light theme.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🎨 **Modern Design** - Clean, minimalist UI with glassmorphism effects
- 🌙 **Dark/Light Mode** - Theme toggle with system preference detection
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Performance Optimized** - Static export, optimized fonts, and lazy loading
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📺 **Kiosk Mode** - Auto-scroll feature for display screens (Ctrl+K)
- 🔄 **Dynamic Data** - Content loaded from JSON (local or remote)
- 🚀 **GitHub Pages Ready** - Configured for easy static deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/karam-matar/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolioOne/
├── public/
│   └── data/
│       └── portfolio.json     # Your portfolio data
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Main page component
│   │   └── globals.css        # Global styles & CSS variables
│   ├── components/
│   │   ├── Hero.tsx           # Landing section
│   │   ├── About.tsx          # About section
│   │   ├── Experience.tsx     # Work experience timeline
│   │   ├── Projects.tsx       # Project showcase
│   │   ├── Skills.tsx         # Skills grid
│   │   ├── Contact.tsx        # Contact section
│   │   ├── Footer.tsx         # Footer component
│   │   ├── Navigation.tsx     # Responsive navbar
│   │   ├── ThemeProvider.tsx  # Theme context provider
│   │   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   │   ├── PortfolioProvider.tsx # Data context provider
│   │   └── Skeleton.tsx       # Loading skeletons
│   └── lib/
│       ├── types.ts           # TypeScript interfaces
│       ├── fetcher.ts         # Data fetching utilities
│       └── utils.ts           # Utility functions
├── .env.example               # Environment variables template
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
└── package.json
```

## ⚙️ Configuration

### Environment Variables

| Variable                          | Description                                 | Default                 |
| --------------------------------- | ------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_DATA_SOURCE`         | Data source: `local`, `github`, or `custom` | `local`                 |
| `NEXT_PUBLIC_GITHUB_DATA_URL`     | URL to remote portfolio.json                | -                       |
| `NEXT_PUBLIC_SITE_URL`            | Your site URL for SEO                       | `http://localhost:3000` |
| `NEXT_PUBLIC_BASE_PATH`           | Base path for subdirectory hosting          | -                       |
| `NEXT_PUBLIC_ENABLE_KIOSK_MODE`   | Enable kiosk mode feature                   | `true`                  |
| `NEXT_PUBLIC_ENABLE_THEME_TOGGLE` | Enable theme toggle                         | `true`                  |

### Customizing Content

Edit `public/data/portfolio.json` to update your portfolio content:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "you@example.com",
    "bio": "Your bio...",
    ...
  },
  "experiences": [...],
  "projects": [...],
  "skillCategories": [...]
}
```

## 🎨 Theming

The portfolio uses CSS custom properties for theming. Customize colors in `globals.css`:

```css
:root {
  --background: 222 20% 7%;
  --foreground: 210 40% 98%;
  --primary: 263 70% 58%;
  /* ... more variables */
}

.light {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  /* ... light mode overrides */
}
```

## 🚀 Deployment

### GitHub Pages

1. Update `next.config.js` if deploying to a subdirectory:

```javascript
const nextConfig = {
  output: "export",
  basePath: "/your-repo-name",
  assetPrefix: "/your-repo-name/",
  // ...
};
```

2. Build the project:

```bash
npm run build
```

3. The `out/` directory contains your static site. Deploy it to GitHub Pages.

4. Alternatively, use GitHub Actions for automatic deployment.

### Vercel (Recommended)

Simply connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

The `npm run build` command generates a static site in the `out/` folder that can be deployed to any static hosting service (Netlify, Cloudflare Pages, etc.).

## 🛠️ Tech Stack

### Dependencies

| Package                    | Purpose                      |
| -------------------------- | ---------------------------- |
| `next`                     | React framework with SSR/SSG |
| `react` / `react-dom`      | UI library                   |
| `framer-motion`            | Animation library            |
| `lucide-react`             | Icon library                 |
| `class-variance-authority` | Component variant management |
| `clsx`                     | Conditional class names      |
| `tailwind-merge`           | Merge Tailwind classes       |

### Dev Dependencies

| Package        | Purpose           |
| -------------- | ----------------- |
| `typescript`   | Type safety       |
| `tailwindcss`  | Utility-first CSS |
| `postcss`      | CSS processing    |
| `autoprefixer` | Vendor prefixes   |
| `eslint`       | Code linting      |

## 📝 Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Karam Matar**

- GitHub: [@karam-matar](https://github.com/karam-matar)
- LinkedIn: [Karam Matar](https://linkedin.com/in/karam-matar)

---

⭐ If you found this helpful, please star the repository!
