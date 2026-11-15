# Project screenshot assets

**Current release authorization — PF-P1:** The author has now approved pushing the Portfolio update. Earlier local-only notes describe the capture/integration phase. Original image bytes and source-repository visibility remain unchanged. [Hosting and release record](./GITHUB_PAGES_DEMOS.md).

Captured 15 November 2026. **24 real screenshots and generated-artifact views across ten source projects** are embedded in their READMEs and copied unchanged into `public/images/extra-projects/` by parsing the Markdown image references. At the author's subsequent request, these source READMEs and linked media/artifacts were pushed to the six existing private repositories. The portfolio website update remains local and unpushed; repository visibility was preserved.

The ten captured implementations now appear across **eight portfolio cards**. The two Flask applications share **Flask Web Security Projects**, with separate implementation/source links and all six screenshots. Text File Analyser is related work under **Typing Trainer**, with its own source, captioned screenshot and executable. These are presentation groupings; the source applications remain separate. The local catalogue contains **15 cards** and **34 gallery images**.

Gallery captions explain the screen being shown and identify disposable demo data where relevant. [The asset manifest](../public/images/extra-projects/manifest.json) retains source README paths and image hashes; `portfolioProjectId` maps both Flask sources to their combined card and the analyser source to Typing Trainer. The source `projectId` and original README/image paths stay unchanged. Existing media is preserved.

| Capture source ID | Images | Suggested cover |
| --- | --- | --- |
| `eshop` | 3 | `/images/extra-projects/eshop/capture-2026-11-15-product-catalogue.png` |
| `fat-file-system` | 2 | `/images/extra-projects/fat-file-system/capture-2026-11-15-file-operations.png` |
| `flask-security-app` | 3 | `/images/extra-projects/flask-security-app/capture-2026-11-15-registration.png` |
| `marvin-shadow` | 2 | `/images/extra-projects/marvin-shadow/capture-2026-11-15-menu.png` |
| `terminal-text-analyser` | 1 | `/images/extra-projects/terminal-text-analyser/capture-2026-11-15-word-frequencies.png` |
| `totp-authentication` | 3 | `/images/extra-projects/totp-authentication/capture-2026-11-15-login.png` |
| `typing-trainer` | 2 | `/images/extra-projects/typing-trainer/capture-2026-11-15-results.png` |
| `x86-64-io-library` | 1 | `/images/extra-projects/x86-64-io-library/capture-2026-11-15-numeric-io.png` |
| `armv7-display-controller` | 3 | `/images/extra-projects/armv7-display-controller/capture-2026-11-15-controller-controls.png` |
| `compiler-from-scratch` | 4 | `/images/extra-projects/compiler-from-scratch/capture-2026-11-15-control-flow.png` |

Terminal images show real processes connected to a local PTY and displayed in xterm.js. Web images show the original applications, using disposable demo data. Typing results came from an automated demonstration transcription and are not a typing-speed claim. The QR enrollment image belongs to a discarded demo account; its secret is no longer live.

The ARM source was assembled locally and its executable loaded into [CPUlator ARMv7 DE1-SoC](https://cpulator.01xz.net/?sys=arm-de1soc) following the author's explicit request to run the code on the website. Ten UART increment commands produced hexadecimal A; a complete KEY1 press/release advanced it to B. Three screenshots show the actual device panels and simulator state. Physical-board execution was not checked.

The newly cloned Compiler source was built in a disposable local copy. Its scanner/parser use **Flex/Bison**, so the portfolio and inventory descriptions now reflect those tools. The four compiler images show fresh syntax-tree and CFG outputs rendered with Graphviz, generated IR/bytecode, and a real terminal run calculating 10! = 3,628,800. The artifact-view layout is a local inspection tool around real outputs. Source READMEs include raw DOT/SVG/IR/bytecode links and reproduction notes. A filename-case alias was needed only in the temporary Linux build; the original application code was preserved. The four demonstrated examples passed; this capture pass does not certify the full supplied test suite.

Extraction checks verified every source image reference, PNG dimensions, SHA-256 and byte-for-byte identity of copied images. The captured projects’ application source and original databases, plus existing portfolio media, were preserved.

Portfolio integration checks passed: production export, lint/types, and browser checks at 1440 px and 390 px. The initial media pass checked all 17 captured images. After grouping the Flask projects, a new build/browser pass verified 16 catalogue entries, one combined Flask card, two implementation sections, both source links and all six Flask screenshots with their captions. Each section opens its own part of the gallery; arrow keys, Escape and focus restoration work. No browser JavaScript errors or gallery horizontal overflow were observed. Production builds ran in isolated temporary copies to preserve the active development preview. No portfolio commit, push or deployment was performed.

The ARM/compiler addition passed a fresh production export with lint/type checks and browser checks at both widths. All seven new images, both covers, captions/alt text, native project details, keyboard/touch navigation, Escape and focus restoration worked. At that stage the catalogue retained 16 entries and the combined Flask presentation; no JavaScript errors, failed local asset responses or horizontal overflow were observed. Source README image references, raw-artifact links and image hashes were checked during installation/extraction.

Source documentation publication completed on 15 November: **40 READMEs, 24 images and 11 compiler artifacts** across Assembly, Compiler, OperatingSystem, database, python-course and securityPrograming. Remote commit heads were verified and all six source working trees were clean at completion. Exact commit references and per-project README links are retained in the inventory's **EP-P1** register. The directory-level `extraPorjects/README.md` remains local because that folder has no Git repository. See the [current portfolio comparison](./PORTFOLIO_COMPARISON_2026-11-15.md) for presentation ratings and priorities.

## Current grouping audit — PF-A1

All 24 capture hashes/PNG dimensions and gallery destinations were rechecked. The analyser had retained its removed standalone card as a default destination in the manifest; `portfolioProjectId` now correctly points to `typing-trainer`. All ten captured implementations map to eight current cards, and all 34 gallery images are retained. This changes only presentation metadata; image bytes, source identity and original README links are unchanged. The ten original TeamTemp screenshots still use generic fallback labels; more specific captions remain optional evidence polish. [Current audit](./PORTFOLIO_STATUS_AUDIT_2026-11-15.md).
