# ShowcaseSERL original-source demo

The source is the `projects/showcase-serl` Git submodule, pinned to [KarmaSora/showcaseSERL](https://github.com/KarmaSora/showcaseSERL) commit `596e7430782f0cacd6b2043dcd2fdcd032a565c1`. There is no copied `original/` source tree here. `provenance.json` identifies the submodule and the 18 selected files' Git blob IDs/SHA-256 hashes. The build retains the original MIT licence from the submodule.

`runtime/` contains the hosting adapters, not a replacement product UI:

- `main.tsx` hosts the original home/detail/kiosk components and mirrors the original server routes' data defaults.
- `navigation.tsx` maps the original Next links/router to refresh-safe hash routes.
- `image.tsx` provides the browser image element used by the original image props.
- `crypto.ts` provides the SHA-256 ID operation used by the original code.
- `responsive.css` adjusts only narrow-screen widths/wrapping and declares the app's light colour scheme.

Run `npm run build:project-demos` at the portfolio root. The build checks every original file hash, bundles the original components with these adapters, compiles their own Tailwind styles and copies the original dataset/licence into `public/project-apps/showcase/`. Normal development and production builds run this automatically.

Open `/project-apps/showcase/index.html`, or use `/demos/showcase/` for a return link to the portfolio. The iframe keeps the application's own styling isolated from the portfolio. No standalone project repository or deployment is changed.

Initialize the source with `git submodule update --init projects/showcase-serl`. See [source/token setup and updates](../../docs/PROJECT_SUBMODULES.md) and [the earlier repair record](../../docs/AUTHENTIC_PROJECT_DEMOS.md). Keep host-specific changes in `runtime/`; update the submodule reference and refresh provenance to select a newer original revision.
