# Project demos on GitHub Pages

**Current source integration:** Original project source is now read from four
pinned submodules; copied source trees have been removed. GitHub builds require
the `PORTFOLIO_FINE_GRAINED_PERSONAL_ACCESS_TOKEN` repository secret. See [the setup guide](./PROJECT_SUBMODULES.md).
The [submodule deployment](https://github.com/KarmaSora/Portfolio/actions/runs/43767842134) passed source checkout,
build, country-input regressions and deployment. Live routes/assets and focused
Showcase/FAT/MARVIN interactions passed. The older release evidence below
describes the earlier snapshot build; application bytes remain unchanged.

Release authorized by Karam on 15 November 2026. This supersedes the earlier
instruction to leave the portfolio changes unpushed. The release contains 15
project cards, 34 gallery images and seven explicit demo pages. Original source
repositories keep their existing visibility and are not modified by this release.

## Hosting support and boundaries

GitHub Pages serves static HTML, CSS, JavaScript and downloadable assets. The
GitHub Actions build prepares the Next.js export and browser runtimes; it does
not leave a Node, Python or database server running for visitors.
[GitHub Pages hosting documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

| Project | Published demo behaviour | Hosting requirement |
| --- | --- | --- |
| ShowcaseSERL | Original React UI, styles and bundled catalogue, including its kiosk mode. | Static files; included in the Pages build. |
| MARVIN / Shadow | Original Python app with separately documented country-input fixes. | Bundled Pyodide and browser terminal; no Python server. |
| Typing Trainer and related Analyser | Their separate original Python programs, texts and session files. | Bundled Pyodide and browser terminal; no Python server. |
| FAT filesystem | Original C++ WebAssembly and an automatically initialized 8 MiB disk image. | Browser memory/filesystem; no hosted disk service. |
| ARM controller | Original compiled program in CPUlator's native interface. | CPUlator remains an external HTTPS service; an own-tab link and ELF download are provided. |
| Compiler | Three genuine recorded runs, six stages and original downloadable artifacts. | Static files. Arbitrary-input compilation is outside the current walkthrough, rather than a general Pages restriction. |
| Eshop | Original screenshots, description and source link. A live action appears only with a configured backend URL. | Express/EJS plus MySQL/MariaDB must run on a separate host. Pages cannot run that backend. |

The terminal uses a service worker scoped to its own folder for interactive input.
It needs HTTPS or localhost and a supporting browser. GitHub Pages provides HTTPS;
this runtime does not need custom cross-origin-isolation headers or a separate
input API server. [Pages HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https),
[service-worker registration requirements](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register).

FAT disk contents, MARVIN state and typing results belong to the current browser
session and are discarded on restart/reload. That is the current demo lifecycle,
not a storage-capacity failure on Pages. The original FAT exit behaviour is
preserved. Initial Python runtime downloads happen only when a terminal opens.

No live demo is claimed for the remaining catalogue projects merely because
their cards are present. Their existing screenshots, documents, videos or source
links remain the available evidence. Browser delivery also makes the bundled
Python code inspectable; private source-repository access is a separate setting.

## Eshop configuration

Run locally with the original backend/database using
[the Eshop runner instructions](../vendor/eshop/README.md). Local discovery is
restricted to localhost/127.0.0.1 and only exposes a healthy running service.

For a public live Eshop, first deploy its Node application and MariaDB/MySQL on a
separate host. Then set the repository Actions variable **`ESHOP_DEMO_URL`** to
the application's absolute HTTPS URL. The Pages workflow passes it to
`NEXT_PUBLIC_ESHOP_DEMO_URL` during the build. It is an application URL, not a
place for database credentials. Rebuild the site after configuring it.

Until that URL is configured, the public card retains its genuine screenshots
and source link and does not advertise a broken localhost demo. No public Eshop
backend or database is provisioned by this release.

## Build and deployment

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/Portfolio npm run build
python3 -B scripts/check-marvin-input.py
npm run preview
```

The prebuild hook verifies pinned sources and prepares ShowcaseSERL, the original
ARM executable and the Python/FAT runtime assets. Normal builds do not need the
Emscripten toolchain. Source submodules must be initialized; private source
checkout uses local Git authentication or the Actions secret described above. Content
revisions keep the terminal iframe, bundle, worker and program payloads together.

The existing Pages workflow builds `out/`, adds `.nojekyll`, and deploys on pushes
to `main`. The `/Portfolio/` prefix and explicit static demo routes are retained.
Focused production/browser checks cover original interfaces, FAT directory/file
operations, MARVIN country input and the shared terminal programs. Live checks
after deployment are recorded below; source-project regression suites and all
browser combinations are not implied by those checks.

## Release status

Published on 15 November 2026:

- Implementation commit: [`fa9a5f3`](https://github.com/KarmaSora/Portfolio/commit/fa9a5f38663868abb4aa2e6c7edc94cbe45471ad).
- [Pages workflow](https://github.com/KarmaSora/Portfolio/actions/runs/43757298104): build, country-input regressions and deploy all succeeded. Deployment completed at 20:19:19 UTC.
- [Live portfolio](https://karmasora.github.io/Portfolio/): homepage and all seven demo routes return 200 over HTTPS.
- Live catalogue/data, source-image manifest, original Showcase dataset, MARVIN payload, FAT WASM, terminal provenance and ARM ELF match the verified release files.
- Live FAT tests pass the reported fresh-session directory sequence, separate parent/child contents, file operations, nested/absolute navigation and restart.
- Live MARVIN tests pass country casing/whitespace variants, recoverable invalid input and existing utility behaviour.
- Live CPUlator tests pass original program preloading, UART directions/wraparound, native KEY0/KEY1 press-release, hexadecimal A/B output and the matching ELF download.
- Live ShowcaseSERL checks pass original nine-record UI/styling, search/filter/sort, card/QR/repository navigation, timed kiosk advance/stop, deep-link reload and phone layout.
- Live Compiler checks load all three recordings through all six stages, including generated graphs and matching interpreter results.
- The public Eshop card has screenshots/source and no default live-backend action or localhost request.
- The checked browser sessions reported no JavaScript errors or failed local asset responses. Desktop and 390 px checks retained usable layouts.

Terminal runtime revision: `8dc899fd4db20436`. Focused tests are not a claim of complete original-project test-suite or all-browser certification. Eshop remains the separately hosted backend item described above; no public database/server was provisioned by this Pages deployment.

A follow-up documentation commit records these observed results; it does not change executable demo code. Temporary release logs and check outputs are retained in `/tmp/portfolio-pages-release/`.
