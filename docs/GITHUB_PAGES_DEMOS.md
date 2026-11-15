# Project demos on GitHub Pages

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
Emscripten toolchain or credentials for the private source repositories. Content
revisions keep the terminal iframe, bundle, worker and program payloads together.

The existing Pages workflow builds `out/`, adds `.nojekyll`, and deploys on pushes
to `main`. The `/Portfolio/` prefix and explicit static demo routes are retained.
Focused production/browser checks cover original interfaces, FAT directory/file
operations, MARVIN country input and the shared terminal programs. Live checks
after deployment are recorded below; source-project regression suites and all
browser combinations are not implied by those checks.

## Release status

Implementation and documentation are prepared for the authorized push. The local
production export and focused terminal/browser regressions passed. The public
deployment result will be recorded after the Pages workflow finishes.
