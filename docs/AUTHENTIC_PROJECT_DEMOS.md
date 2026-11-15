# Original-project demo repair — 15 November 2026

**Current release authorization — PF-P1:** The author subsequently requested publishing the portfolio update and documenting GitHub Pages boundaries. Local/unpushed statements in this repair history describe the earlier phase. See [current hosting and release status](./GITHUB_PAGES_DEMOS.md).

**Current demo implementation:** ARM now runs the original controller in CPUlator’s native interface. MARVIN, Typing Trainer and the related analyser execute original Python; FAT executes original C++ WebAssembly. Eshop runs locally with original Express/EJS and MariaDB. The author approved automatic ARM binary preloading and instructed this work to proceed. See [runtime status and instructions](./ORIGINAL_PROJECT_DEMO_ROADMAP.md).

This is the current ShowcaseSERL implementation and supersedes the adapted preview described in [the initial demo pass](./INTERACTIVE_PROJECT_DEMOS.md). All changes remain local, uncommitted and unpushed.

## What was left unfinished

The initial `ShowcaseDemo.tsx` was a newly written interface using the portfolio's design and six fictional catalogue records. Original ShowcaseSERL source had subsequently been copied to `vendor/showcase-serl/original/`, with a commit/blob/hash manifest, but the running demo still imported the adapted interface. Build dependencies had been added; the original application had not yet been connected.

The reported 500 response is preserved in `/tmp/portfolio-project-captures/reported-showcase-dev-error.html`. It came from `/demos/[demo]/page` under static-export configuration. The checked-in working copy already contained `generateStaticParams`, so this repair does not claim that the function was simply absent from the current source. Three fixed demo URLs now use explicit static pages instead of that dynamic route.

## Current ShowcaseSERL application

- Runs the original React home, catalogue, card, header/navigation, footer, project detail, QR, fullscreen and kiosk components from commit `596e7430782f0cacd6b2043dcd2fdcd032a565c1` of [KarmaSora/showcaseSERL](https://github.com/KarmaSora/showcaseSERL/tree/596e7430782f0cacd6b2043dcd2fdcd032a565c1).
- Uses the original stylesheet, Tailwind theme and all nine original bundled records. The former six-record fictional dataset is removed.
- Preserves the application's cream/brown colours, Arial font, original controls, card layout, QR behaviour and six-second kiosk iteration. Portfolio theme changes cannot restyle the app because it runs in its own iframe document.
- Keeps the 18 original source files byte-for-byte unchanged. Every build verifies their SHA-256 hashes against `vendor/showcase-serl/provenance.json`; the original MIT licence is included with the generated app.
- Uses separate browser adapters for Next links/images/navigation and SHA-256 IDs, plus a small host for the original server routes' data/defaults. The server filesystem routes become browser hash routes. External repository links open in a separate tab rather than trying to load GitHub inside an iframe.
- Adds sizing-only CSS for narrow phones. This changes wrapping/width constraints rather than the original colours, content, typography or interactions. The adapters and sizing changes are separate from the original source snapshot.

The dataset is the original application's fixture data, including its template/test entries and references to other projects. Those catalogue items are application data, not claims that Karam authored every project they reference.

## Routes and use

- `/demos/showcase/` opens the original app with a small return-to-portfolio bar. Its standalone-app action removes even that host framing.
- `/project-apps/showcase/index.html` opens the original application directly. Hash routes such as `#/card/3` and `#/kiosk/3` survive refresh on static hosting.
- The explicit `index.html` is intentional: static web servers can resolve a directory index, but Next's development public-file server does not automatically serve that same folder URL.
- ShowcaseSERL's project-card action and the top demo launcher open its full page directly in one click.
- `/demos/compiler/` and `/demos/arm/` are also explicit static pages. Unknown demo URLs return a normal 404; no dynamic demo parameters are needed.
- Production links retain the `/Portfolio` prefix; the generated app derives its own data/asset base from its document URL and works under either prefix.

## Reproducible build

`npm run build:project-demos` builds the original app into the ignored `public/project-apps/showcase/` directory. `predev` and `prebuild` invoke it automatically. Source, adapters, build script, dependency lockfile, licence and provenance manifest are the maintained inputs; generated assets do not need to be committed.

A pinned vendored snapshot is sufficient here; a Git submodule is not required. This avoids relying on a separate deployment or on another repository's visibility. No repository visibility was changed.

## Other interactive entries

- **Compiler:** a walkthrough of real recorded outputs from the original C++ compiler, including source, graphs, IR, bytecode and execution traces. It is labelled as recorded output and does not claim to compile arbitrary visitor input in the browser.
- **ARM:** now runs the original compiled program inside CPUlator's native interface. The earlier hand-built simulation is removed; native-device tests and provenance are recorded in the [newer integration record](./ORIGINAL_PROJECT_DEMO_ROADMAP.md).

Future app demos should run original project code or show original recordings/captures. Any explanatory simulation must be identified as such; an interface rewritten to match the portfolio is not evidence of the original product's UI.

## Validation

The production static export, lint and TypeScript checks pass. The same browser checks passed against both the exported `/Portfolio/` site and the running `http://127.0.0.1:3000/` preview: original nine-record dataset/stylesheet, theme isolation, search/empty state, research-type filtering, date sorting, project details, QR rendering, repository links opening in a new tab, single-project kiosk navigation, actual timed kiosk advancement and stop, standalone/deep-link refresh, 390px phone layout, direct demo pages and the one-click launcher. No browser JavaScript errors or failed local asset responses were observed. Final results are saved in `/tmp/portfolio-authentic-demo-review/production-checks.json` and `development-checks.json`, alongside desktop/phone captures. The verified production export is refreshed locally without overwriting the running development server's cache.
