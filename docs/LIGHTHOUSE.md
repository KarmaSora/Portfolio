# Lighthouse inspection

Google Lighthouse is included as a development dependency. Use Node **22.19 or later** and an installed Chrome/Chromium browser. The runner also detects Chromium in the local Playwright browser cache. Set `CHROME_PATH` if the browser is installed elsewhere.

## Audit the production export

Build with the same base path used by GitHub Pages:

```bash
NEXT_PUBLIC_BASE_PATH=/Portfolio npm run build
npm run lighthouse
```

The runner starts a temporary local server with the `/Portfolio/` path, audits **mobile and desktop** sequentially and closes the server/browser afterward. As with any Next.js production build, stop the development server before rebuilding in the same working directory.

Reports are written to `reports/lighthouse/`:

- `mobile.html` and `desktop.html`: interactive reports.
- `mobile.json` and `desktop.json`: full machine-readable results.
- `summary.json`: scores, Lighthouse version and run warnings.

Generated reports are excluded from Git. Lighthouse is an inspection tool; it is not loaded into the portfolio or its visitors' browsers.

## Other targets

```bash
# Audit an export built in another directory
npm run lighthouse -- --dir /path/to/export --output /tmp/portfolio-audit

# Inspect a running site
npm run lighthouse -- --url https://karmasora.github.io/Portfolio/

# Run only one mode
npm run lighthouse -- --mode mobile

# Open a production preview without running audits
npm run preview
```

The preview URL is `http://127.0.0.1:8001/Portfolio/`. Change its port with `npm run preview -- --port 8002`.

Lighthouse scores are lab measurements and vary with the machine, network, throttling and remote image hosts. Automated accessibility checks cover part of accessibility; also check keyboard navigation, focus, dialogs, contrast in both themes and layouts at narrow widths.
