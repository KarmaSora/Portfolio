# Portfolio comparison after project evidence updates

**Current release authorization — PF-P1:** The author subsequently requested publication of the implemented work. This comparison remains a historical assessment; [GitHub Pages hosting/release status](./GITHUB_PAGES_DEMOS.md) records the later release.

Reviewed 15 November 2026. **Karam's updated local portfolio: approximately 8/10. Felix's published portfolio: approximately 8.5/10.** These are editorial assessments of how each portfolio presents its owner to a backend/full-stack recruiter. They are not scores of the developers' ability or probabilities of getting hired.

Karam now has much stronger project evidence than in the initial review. His professional experience, contribution boundaries and working screenshots support a credible engineering story. Felix still offers a more memorable visual identity and a more guided way to explore technical work.

**Subsequent local implementation — PF-A1:** This assessment predates the completed demos. ShowcaseSERL now runs its original UI/data; ARM runs the original program in native CPUlator; MARVIN, Typing Trainer, the related analyser and FAT execute original code. Compiler has a genuine recorded-output walkthrough, and Eshop has a working original local backend/database runner. The current catalogue has 15 cards and the introduction links directly to the demos. [Current status and remaining priorities](./PORTFOLIO_STATUS_AUDIT_2026-11-15.md). The ratings below have not been recalculated, and this audit does not newly assess Felix's site. The remaining recommendation about selected-project hierarchy/case studies still applies; the Compiler walkthrough recommendation is fulfilled.

## Rating criteria

Scores use a ten-point scale. The overall assessment is weighted by the priorities below and rounded to the nearest half point.

| Criterion | Weight | Karam | Felix | Reason |
| --- | --- | --- | --- | --- |
| Visual identity and cohesion | 20% | 7.5 | 9 | Karam's restrained typography and palette are readable and professional. Felix connects the opening graphic, navigation, project categories and demonstrations through a consistent computing-layer theme. |
| Project explanation | 20% | 8 | 8.5 | Karam now explains purpose, implementation and collaboration concretely. Felix more often combines a short explanation with visible evidence directly beside it. Some of his descriptions still use broad security/performance language. |
| Visible evidence and engagement | 25% | 8 | 9 | Karam has actual application/simulator runs, compiler artifacts, public project source, gameplay media and a thesis. Felix also provides several browser demonstrations that visitors can manipulate immediately. The old ShowcaseSERL URL was subsequently found to serve documentation. |
| Professional relevance and contribution clarity | 25% | 9 | 7.5 | Karam prominently connects three internships and teaching work to concrete responsibilities, technologies and collaboration. Felix's home page gives more space to projects and less to individually attributed professional delivery. This compares the evidence presented on the pages, not either person's complete employment history. |
| Finding and selecting work | 10% | 7 | 8.5 | Karam provides category filters, but all 16 projects share the same grid and follow all four experience entries. Felix offers a themed index, project anchors and a separate compact catalogue. |

## What has improved in Karam's current version

- **Project-specific media:** 24 captured screenshots/artifact views across ten source implementations, shown in nine portfolio entries. Together with TeamTemp's existing ten images, the catalogue has 34 gallery images.
- **Compiler:** Actual syntax tree, CFG, IR/bytecode and terminal execution. The description correctly names Flex/Bison and preserves joint work throughout the project. The recursive factorial example produces 3,628,800.
- **ARM:** Actual assembly execution in CPUlator, showing UART input reaching hexadecimal A and a complete KEY1 press/release advancing the display to B.
- **Flask:** One portfolio entry with two separately explained implementations and six labelled images. Application-security features belong to `COMPUTER_PROGRAM`; TOTP enrollment/authentication belongs to `Task2`.
- **Distinct Python work:** The typing trainer assesses a transcription; the independently runnable file analyser reports counts/frequencies. Marvin is presented as its intended scripted fake AI interface.
- **Source documentation:** 40 READMEs, 24 screenshots and 11 compiler artifacts were pushed to the six existing source repositories. Private access labels remain accurate; pushing documentation did not make those repositories public.
- **Existing interaction checks:** Native project details and galleries have passed desktop/mobile checks, including captions, keyboard navigation and focus restoration.

The remaining fallback covers are VulnerabilityChecker and ACID Bot. These are valid documented projects. Their shared placeholder makes their cards harder to distinguish visually.

## Highest-value improvements from here

1. **Make the selection visible.** Present three or four primary examples before the complete catalogue. TeamTemp, Compiler and ShowcaseSERL already have usable evidence; choose ACID Bot when automation is relevant to the role. Kravi's company-wide review platform deserves a concise project treatment using the already approved high-level description. Keep the remaining coursework in a compact catalogue. The current renderer does not use the existing `featured` flags to create this distinction.
2. **Offer a direct route from the introduction to selected projects.** Retain the clear role, CV and contact controls. The current introductory action sends visitors through Experience first; the Projects navigation link remains available.
3. **Give selected projects a compact explanation with evidence.** Use a brief purpose, accurately attributed contribution and one supported result beside a meaningful image. Provide an anchor or project URL recruiters can share. Keep deeper implementation material in the READMEs for readers who want it.
4. **Use the compiler as a distinctive technical walkthrough.** Its verified input, tree, CFG, IR, bytecode and VM output can form a small sequence. An initial implementation can use the recorded outputs with clear labels; actual browser compilation would be a separate engineering task.
5. **Refine media for scanning.** Keep full-size evidence accessible, choose readable cover crops and shorten gallery captions around the behaviour shown. For ACID Bot or VulnerabilityChecker, an accurately labelled workflow diagram could explain the project when a product screenshot is unavailable.

These are recommendations. This comparison does not implement a redesign, change source visibility or publish the portfolio.

## Shared-coursework comparison

| Project area | Karam's current evidence | Felix's presentation advantage | Useful next step for Karam |
| --- | --- | --- | --- |
| Eshop | Real database-backed catalogue/category/form captures and a description of shared web/CLI data access, stored procedures and order/stock modelling. | A short description and screenshot placed together in the project tour. | Highlight one clear browser workflow and one database decision. The entire order/fulfilment flow has not been runtime-certified by the screenshot pass. |
| Marvin / Fake-GPT | Real Shadow menu/backpack captures and a concrete explanation of modular scripted utilities and bundled country data. | A concise, memorable premise and a visible terminal capture. | Keep the intended fake AI identity and lead with one useful interaction. |
| ARM controller | Actual CPUlator execution of Karam's assembly, with UART polling and button interrupts operating together. | An interactive browser recreation makes input handling easier to explore. | Add an annotated sequence explaining the two input paths from the verified run. Preserve the actual design; the source does not establish a whole-program polling/interrupt mode switch. |
| FAT simulator | Actual C++ shell captures showing files and directories; intended exit overwriting is recorded correctly. | A browser block map makes allocation chains visible. | Explain one file operation using the real block/directory model. |
| Typing application | Original terminal menu/results and separate transcription-comparison modules. | A playable browser recreation and walkthrough video. | A short recording or annotated input/results sequence would make the original application easier to follow. |

## Review basis and limits

The assessment uses Karam's current JSON/components, captured project outputs and the production snapshot already checked on 15 November. All 24 application source/data files compared against that snapshot still matched when this review began. It also uses desktop/mobile screenshots from the 14 November comparison and the later 15 November gallery checks. Older screenshots with the compiler placeholder were used only to understand the layout; the current compiler has its own media.

Felix's current home page, projects page, stylesheet and main JavaScript were retrieved on 15 November. Their text and implementation still support the layered structure, private-source notices, filtered catalogue and demonstration loading described here. Visual references come from the 14 November browser captures. A new unrestricted browser session could not run in this side chat, so this is not a fresh end-to-end interaction, performance or accessibility audit of Felix's site. No new Lighthouse score or hiring outcome is claimed.

Sources: [Felix's home page](https://portfolio.felix.best/), [project catalogue](https://portfolio.felix.best/projects/), [stylesheet](https://portfolio.felix.best/assets/css/site.css), [main browser module](https://portfolio.felix.best/assets/js/main.js), [Karam's project data](../public/data/portfolio.json), [media provenance](./PROJECT_SCREENSHOT_ASSETS.md), and the project README/commit register in the [career inventory](../JobSearchData/Karam_Matar_Career_Experience_and_Project_Inventory.md).
