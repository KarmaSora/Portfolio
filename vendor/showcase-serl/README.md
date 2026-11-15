# ShowcaseSERL original-source demo

`original/` contains a pinned, unmodified selection of the original project's React components, stylesheet, configuration and dataset. Repository: [KarmaSora/showcaseSERL](https://github.com/KarmaSora/showcaseSERL), commit `596e7430782f0cacd6b2043dcd2fdcd032a565c1`. `provenance.json` records the Git blob IDs and SHA-256 hashes. The original MIT licence is retained in `original/LICENSE`.

`runtime/` contains the hosting adapters, not a replacement product UI:

- `main.tsx` hosts the original home/detail/kiosk components and mirrors the original server routes' data defaults.
- `navigation.tsx` maps the original Next links/router to refresh-safe hash routes.
- `image.tsx` provides the browser image element used by the original image props.
- `crypto.ts` provides the SHA-256 ID operation used by the original code.
- `responsive.css` adjusts only narrow-screen widths/wrapping and declares the app's light colour scheme.

Run `npm run build:project-demos` at the portfolio root. The build checks every original file hash, bundles the original components with these adapters, compiles their own Tailwind styles and copies the original dataset/licence into `public/project-apps/showcase/`. Normal development and production builds run this automatically.

Open `/project-apps/showcase/index.html`, or use `/demos/showcase/` for a return link to the portfolio. The iframe keeps the application's own styling isolated from the portfolio. No standalone project repository or deployment is changed.

See [the repair and validation record](../../docs/AUTHENTIC_PROJECT_DEMOS.md). To update the snapshot later, replace the original files and provenance together from a deliberate source revision; keep any host-specific changes in `runtime/`.
