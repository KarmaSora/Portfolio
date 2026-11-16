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

- Node.js 22.19+
- Git with access to the private project submodules
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone --recurse-submodules https://github.com/KarmaSora/Portfolio.git
cd Portfolio
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
| `NEXT_PUBLIC_SITE_URL`            | Absolute site URL for exported SEO metadata | `seo.url` in portfolio.json |
| `NEXT_PUBLIC_BASE_PATH`           | Hosting prefix; empty for a dedicated domain | `/Portfolio` in production, empty in dev |
| `NEXT_PUBLIC_ESHOP_DEMO_URL`      | Healthy external Eshop application's HTTPS URL | Disabled publicly |
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

Project demos now read their original repositories through pinned submodules.
For local setup, initialize them with `git submodule update --init`. GitHub
Actions needs the `PORTFOLIO_FINE_GRAINED_PERSONAL_ACCESS_TOKEN` repository secret with read access to the
four source repositories. See [token setup and project updates](docs/PROJECT_SUBMODULES.md).

### GitHub Pages (Automated with GitHub Actions)

This project includes a GitHub Actions workflow for automatic deployment:

1. Push to the `main` branch triggers automatic deployment
2. Go to **Settings → Pages** and set **Source** to "GitHub Actions"
3. Your site will be live at `https://username.github.io/repo-name/`

The workflow file is located at `.github/workflows/deploy.yml`.

Production builds default to `/Portfolio`. Set `NEXT_PUBLIC_BASE_PATH` to change
the prefix; Next routing and asset URLs use the same value.

### Separate portfolio subdomain on Cloudflare

The separate **Deploy portfolio to Cloudflare** workflow builds for `/` and
deploys static assets to `portfolio.karammatar.com` using `wrangler.jsonc`.
It reuses the private-source GitHub token and needs a `CLOUDFLARE_API_TOKEN`
repository secret plus a `CLOUDFLARE_ACCOUNT_ID` repository variable. The job
stays skipped until that variable is set. GitHub Pages keeps its existing URL.

Follow [the Cloudflare dashboard setup guide](docs/CUSTOM_DOMAIN_HOSTING.md).
`npm run build:cloudflare` also builds locally; preview it with
`npm run preview -- --base-path ''`. The custom domain needs its first deployment
after the Cloudflare settings are saved. No Pi or Eshop backend is provisioned.

### Project demos and hosting boundaries

The Pages build includes the original ShowcaseSERL interface, Python browser
terminals, the C++ FAT WebAssembly demo, the CPUlator integration and the recorded
Compiler walkthrough. Eshop's Express/MySQL backend requires separate hosting;
its screenshots and source link remain available without a live backend.

See [GitHub Pages demo support and configuration](docs/GITHUB_PAGES_DEMOS.md) for
the per-project behaviour, browser session storage, Eshop URL setting and release
verification. Existing source repositories retain their visibility.

### Manual Build

To build locally:

```bash
npm run build
```

The `out/` directory contains your static site.

### Vercel (Recommended for Custom Domains)

Simply connect your GitHub repository to Vercel for automatic deployments with zero configuration.

### Other Platforms

The static site in the `out/` folder can be deployed to any static hosting service (Netlify, Cloudflare Pages, etc.).

## 🛠️ Tech Stack

### Dependencies

| Package                    | Purpose                      |
| -------------------------- | ---------------------------- |
| `next`                     | React framework with SSR/SSG |
| `react` / `react-dom`      | UI library                   |
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
| `lighthouse` / `chrome-launcher` | Production UI inspection |

## 📝 Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm run preview` | Preview the static production export |
| `npm run lighthouse` | Inspect mobile and desktop with Lighthouse |
| `npm run build:project-demos` | Verify pinned sources and prepare browser demo assets |
| `npm run build:fat-demo` | Recompile FAT deliberately with an installed Emscripten SDK |
| `npm run demo:eshop` | Run the original Eshop with a disposable local MariaDB database |

`python3 -B scripts/check-marvin-input.py` checks the documented country-input
fixes after the demo payload has been built; the Pages workflow runs it too.

See [Lighthouse inspection](docs/LIGHTHOUSE.md) for browser requirements, report locations and audit commands. The [design direction](docs/DESIGN.md) records the portfolio's visual system and content constraints.

See [Peer portfolio review and next steps](docs/PEER_PORTFOLIO_REVIEW.md) for the UI/content comparison, supporting observations and prioritised improvements to revisit later.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Karam Matar**

- GitHub: [@KarmaSora](https://github.com/KarmaSora)
- LinkedIn: [Karam Matar](https://www.linkedin.com/in/karam-matar-b92639293)

---

⭐ If you found this helpful, please star the repository!
