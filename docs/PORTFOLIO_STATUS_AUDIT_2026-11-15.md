# Portfolio and inventory status — 15 November 2026

**Current release authorization — PF-P1:** Karam subsequently authorized pushing the portfolio and documenting GitHub Pages boundaries. This supersedes the historical publication deferral below. The inventory is now version 13; [hosting and release verification](./GITHUB_PAGES_DEMOS.md) is the current release record.

**Subsequent runtime repair — PF-I4:** The later user-reported FAT/MARVIN failures were reproduced and corrected. FAT automatically formats a fresh disk before input; MARVIN uses two explicit country-input corrections. The master inventory is now version 12. [Repair, repository-version check and regression scope](./TERMINAL_DEMO_FIXES_2026-11-15.md). The PF-A1 reconciliation below describes the earlier metadata-only audit.

The catalogue, demos and inventory have been reconciled under **PF-A1**. The master inventory is **version 11**. The current portfolio changes remain local, uncommitted and unpushed; the earlier published site is a separate release.

## Current position

| Item | Verified state |
| --- | --- |
| Inventory | 20 distinct numbered project records, with original attribution and scope retained. |
| Portfolio | 15 catalogue cards. P17/P18 share one Flask card; P20 is related work under P16 Typing Trainer. |
| Galleries | 34 images: ten existing TeamTemp screenshots and 24 genuine captures/artifact views from ten source implementations across eight cards. |
| Demo pages | Seven explicit static routes: Compiler, ShowcaseSERL, ARM, MARVIN, Typing Trainer, Analyser and FAT. |
| Eshop | Original Express/EJS and MariaDB work through the local runner. The service responded to its health check during this audit. Public backend hosting remains pending. |
| Source provenance | 87 original vendored source/data files match their hashes; original ARM ELF and both FAT build artifacts also match. |
| Original capture provenance | All 24 PNG hashes, dimensions and current gallery destinations match. |
| Dependencies | Both root and Eshop manifests match their lockfiles. |
| Publication | No portfolio commit, push, deployment or repository-visibility change in this update. |

The inventory records are not a count of standalone portfolio cards. Kravi Data Sorter is currently professional experience plus P01, the portfolio itself is P10, and the separate AIS assignment is P11; these three are not catalogue cards. The two presentation groupings account for the remaining difference between 20 records and 15 cards.

## Corrections made

- Fixed the analyser image manifest: its original source ID/README/image paths are preserved, while `portfolioProjectId` now points to `typing-trainer`. The prior value implicitly targeted a removed standalone card.
- Updated P10 to describe the portfolio's current local demo integration, separate from its earlier deployed release and earlier Lighthouse results.
- Updated the primary status paragraphs for P12–P16/P20, the results ledger, the presentation map and section 10's completed/remaining checklist.
- Reconciled the implementation plan, comparison-plan status, media register and handoff. They no longer schedule the completed Compiler walkthrough or original-code demos as future work, or describe the available captures as pending.
- Kept historical assessments and source publication records labelled as snapshots. Felix was not re-audited and the earlier editorial ratings were not recalculated.
- Preserved all private reference records, supplied CV, actual image bytes, collaboration wording, intended FAT lifecycle and MARVIN's fake AI scope.

## Runtime evidence

| Entry | Evidence type and current behaviour |
| --- | --- |
| Compiler | Three genuine recorded runs, six selectable stages and 18 original artifacts. Arbitrary visitor-input compilation is outside the current walkthrough. |
| ShowcaseSERL | Original React components, stylesheet and nine-record dataset, including original search/detail/kiosk behaviour. |
| ARM | Original compiled controller in CPUlator's native DE1-SoC interface. The author approved automatic compiled-program preloading. |
| MARVIN | Original Python modules/data, ASCII/menu interface, utilities, backpack and scripted Shadow character. |
| Typing Trainer | Original Python tests, calculations and per-session score files. Automated verification is not a typing benchmark. |
| Text File Analyser | Separate original Python program and bundled texts, independently runnable as related work under Typing Trainer. |
| FAT | Original Lab2 C++ compiled to WebAssembly, using its actual shell/filesystem and a session-local disk. |
| Eshop | Original server/templates/SQL routines and fixtures with disposable local MariaDB; separate hosting is required for a public live app. |

The prior clean production export, lint/type checks and focused Chromium runtime checks are retained with their actual scope in [the runtime record](./ORIGINAL_PROJECT_DEMO_ROADMAP.md) and [handoff](./LOCAL_PORTFOLIO_HANDOFF.md). The source-project regression suites and other browsers have not been comprehensively certified.

This audit additionally checked the inventory/card/media mappings, every local project-image reference, capture/source/build hashes, gallery indexes, lockfile agreement and exported demo pages. Fresh HTTP requests returned 200 for the homepage and all seven localhost demo pages; the served original dataset, terminal bundle/input bridge, FAT WASM, ARM ELF and corrected manifest match local assets. No executable UI code changed during this reconciliation, so the earlier build results are not presented as a new build or performance audit.

A fresh focused Chromium pass against the production export also verified the 15-card catalogue, analyser source/demo/screenshot/caption links, 390 px layout, corrected served metadata, top-level return to the parent project and switching between shareable terminal routes. No browser JavaScript errors were observed.

The corrected manifest is also copied into the existing verified local export. Temporary audit output is in `/tmp/portfolio-inventory-audit/`; this document and the master inventory retain the substantive findings after temporary files are cleaned up.

## Remaining work

1. **Public Eshop hosting:** choose a Node/MariaDB backend host and configure `NEXT_PUBLIC_ESHOP_DEMO_URL` if a public live Eshop demo is wanted. The static portfolio currently exposes the local action only when it discovers a healthy local service.
2. **Proposed recruiter presentation:** add a standalone Kravi Data Sorter card, distinguish selected work from the complete catalogue, and create dedicated case studies. Adding Kravi would bring the current catalogue to 16 cards. These proposals were not implemented by this audit.
3. **Optional evidence polish:** replace the two remaining fallback covers for ACID Bot/VulnerabilityChecker with accurate explanatory visuals, caption the ten existing TeamTemp images more specifically, and add Open Graph/Twitter preview artwork. Extra screenshots are optional; existing demos do not depend on another upload.
4. **Optional broader verification:** extend browser coverage beyond the Chromium checks and add further original-project live ports only where useful. The current program demos are implemented, not incomplete projects because these follow-ups exist.
5. **Publication:** the author has now requested the release under PF-P1, superseding the earlier no-push instruction. Publishing these static Python demos will deliver inspectable source snapshots; source-repository visibility is still unchanged.

The Compiler collaborator's display name remains optional until established; existing joint credit is accurate without it. Existing AIS merge/scheduling/disclosure gaps and other professional evidence boundaries remain unchanged. No new metrics or accomplishments were inferred from the portfolio work.
