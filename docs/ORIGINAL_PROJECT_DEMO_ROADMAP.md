# Original-code project demos — 15 November 2026

**Current release authorization — PF-P1:** The author has now authorized publishing this portfolio update. Earlier local-only statements describe the original implementation passes. Current hosting support, Eshop backend requirements and deployment verification are in [GitHub Pages demos](./GITHUB_PAGES_DEMOS.md).

The author requested original product interfaces/code, approved automatic compiled ARM preloading in CPUlator, chose analyser grouping under Typing Trainer, then instructed the remaining demos to proceed. These demos are implemented locally. **PF-I4 update:** fresh FAT disks now format automatically using the original C++ shell, and MARVIN has two documented country-input corrections. See [the runtime repair](./TERMINAL_DEMO_FIXES_2026-11-15.md). Nothing is committed, pushed, deployed or made public in this pass.

## Implemented demos

| Project | Entry | What executes |
| --- | --- | --- |
| ARMv7 Display Controller | `/demos/arm/` | Original compiled controller in CPUlator's official DE1-SoC interface, with native UART, buttons and display. |
| MARVIN / Shadow | `/demos/marvin/` | Original Python application with two documented country-input fixes; ASCII/menu interface, utilities, backpack and bundled emissions data. A scripted fake AI character. |
| Terminal Typing Trainer | `/demos/typing/` | Original tests, timing, precision, WPM helpers, practice and session score code. |
| Text File Analyser | `/demos/analyser/` | Its separate original Python entry point, analyser and bundled texts. Related work under Typing Trainer. |
| FAT Lab2 | `/demos/fat/` | Original C++ main/Shell/FS/Disk compiled to WebAssembly, with an 8 MiB session-local disk. |
| Eshop | `http://localhost:1337/eShop/product` after starting its runner | Original Express/EJS app and real MariaDB with original schema, routines, triggers and fixtures. Public backend hosting remains pending. |

Compiler remains a labelled walkthrough of three genuine recordings, six stages and 18 hash-verified artifacts. ShowcaseSERL retains its original React components, stylesheet and nine-record dataset. See [the original application repair](./AUTHENTIC_PROJECT_DEMOS.md).

## ARM provenance and controls

The former React display/buttons are removed. The page embeds the official native interface; CPUlator supports ELF execution and supplies the real peripheral/debugger controls. [CPUlator documentation](https://cpulator.01xz.net/doc/).

The original executable comes from the genuine capture run. Its associated assembly matches the current original source byte-for-byte, SHA-256 `1c00348529bdef5ba3c545c26b66f324ec31f8fa3834215416f599a68eb6fa28`. Repacking removes only ELF padding and verifies every loadable byte, address and entry point. Compact executable SHA-256: `259843779036e3d1c8301221144c99d999b88fd52148156fd4d007658d380dd5`. Original ELF and provenance are retained under `vendor/arm-controller/`.

Automatic approval review initially rejected transferring the private binary in an external URL. The author then explicitly approved automatic preloading. The compiled program is included in CPUlator's URL; no assembly-source sharing upload/share link is created. Repository visibility remains unchanged.

Continue/F3 starts execution. JTAG UART `u`/`d` increments/decrements. KEY1 increments and KEY0 decrements through the real interrupt path. In toggle mode, click again to release a key. The page provides an own-tab option and matching ELF download. CPUlator's desktop-oriented controls remain its own UI on phones.

## Python and FAT runtime

The terminal retains 32 pinned original source/data files with build-time hashes. Two hash-recorded MARVIN country-input fixes are overlaid in the delivered payload; original snapshots and source repositories remain unchanged. Pyodide 0.27.7 runs Python; Emscripten 4.0.21 compiled the original C++ into pinned WASM. Original applications own their output/behaviour. No replacement JavaScript menus, calculations or filesystem algorithms are used.

A dedicated worker handles synchronous stdin/stdout through a service worker scoped only to `project-apps/terminal/`. Nested prompts keep the page responsive. HTTPS/localhost and service-worker support are required; SharedArrayBuffer/cross-origin isolation and external code runners are unnecessary. Runtime assets are served locally from pinned packages. Python loads only when a terminal opens. [Pyodide stream hooks](https://pyodide.org/en/0.27.7/usage/streams.html).

The platform shim translates terminal clear. Mutable typing files start empty per session; original metric calculations are unchanged. FAT automatically formats each fresh disk by executing the original shell command before user input; three-character permissions and intended exit/storage behaviour are retained. `cd` is silent; `pwd` shows location. Its disk is a session-local MEMFS file. Restart discards only that session. Normal builds verify/copy compiled outputs and need no SDK. [Runtime and optional rebuild instructions](../vendor/terminal-projects/README.md).

Public delivery would make bundled Python source inspectable. Current work is local and unpushed, and source repositories remain private. Documented source preparation boundaries are retained; adding a runtime does not imply algorithm fixes.

## Eshop local runtime and hosting

```bash
npm ci --prefix vendor/eshop --ignore-scripts
npm run demo:eshop
# Or with a portable MariaDB installation:
MARIADB_BASE=/path/to/mariadb/usr npm run demo:eshop
```

The runner verifies 37 original files, starts fresh socket-only MariaDB, loads original SQL/fixtures, generates constrained credentials and runs the original UI on loopback. A wrapper adds health discovery and controls binding; product code stays unchanged. Ctrl+C stops both services and discards the database. The portfolio exposes Open Eshop after discovering a healthy local service. [Runner details](../vendor/eshop/README.md).

GitHub Pages cannot run this Express/MySQL backend. A separate Node/MariaDB host is required for a public live demo. Once deployed/reviewed, set `NEXT_PUBLIC_ESHOP_DEMO_URL`; public builds emit no local test URL by default. [GitHub Pages hosting model](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## Focused verification

- CPUlator: original preload, UART increment/decrement, both 0/F wraps, KEY0/KEY1 press/release, A/B display, ignored input and matching ELF download. Embedded native UI works; phone host fits.
- MARVIN: original menu, conversion, backpack, nested/blank prompts and quit. PF-I4 additionally verifies option 15 with lower/upper/whitespace country names, recoverable unknown/empty names and option 14 calculations.
- Analyser: counts, file switch and word-frequency output.
- Typing: full sample transcription, original precision/time/WPM output and session score persistence. Automated input is not a typing benchmark.
- FAT: original format, create/cat, cp, mkdir/cd/pwd, chmod, quit and fresh-disk restart. PF-I4 verifies automatic initialization and the reported ls → mkdir test → cd test sequence without manual format, including distinct parent/child contents. No source edits or filesystem substitution.
- Eshop: catalogue, category, customer, order and create-product pages; product create/read/update/delete through original forms and SQL routines.
- Desktop and 390 px terminal UI inspected. Existing project screenshots/galleries are retained.

Temporary evidence: `/tmp/portfolio-terminal-review/` and `/tmp/portfolio-arm-emulator-review/`. Final static-build and portfolio-route checks are recorded in the local handoff.

## Related-work grouping

Typing Trainer compares typed text with a reference and saves feedback/scores. Text File Analyser reports statistics for a selected file. They overlap in Python/file/string concepts but remain separate executables; the trainer does not import the analyser. The catalogue now uses 15 cards, with the analyser's own source, screenshot and demo under Typing Trainer. All 20 numbered inventory records are retained.
