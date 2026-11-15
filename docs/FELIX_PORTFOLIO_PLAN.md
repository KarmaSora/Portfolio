# Portfolio comparison findings and improvement plan

**Current release authorization — PF-P1:** The author has subsequently authorized pushing the completed portfolio changes. Earlier no-push/local-only notes are historical. [Hosting boundaries and release status](./GITHUB_PAGES_DEMOS.md).

Initial review: 14 November 2026. Findings consolidated: 15 November 2026. **Latest local status — PF-A1:** The catalogue now has 15 cards after Flask/analyser grouping, while retaining 20 inventory records and 34 gallery images. Original-code demos and the recorded Compiler walkthrough are implemented; Eshop is available through its original local backend/database runner. The wider presentation proposals and public Eshop hosting remain open. No portfolio commit/push/deployment is included. See the [current audit](./PORTFOLIO_STATUS_AUDIT_2026-11-15.md).

Companion document: [How Felix's portfolio works and how he describes his projects](./FELIX_PORTFOLIO_BREAKDOWN.md).

Execution document: [Implementation sequence, prepared copy and acceptance checks](./PORTFOLIO_IMPLEMENTATION_PLAN.md). Its latest local implementation status and 15 November attribution clarifications take precedence over earlier proposals in this review.

## Author clarifications and current scope — 15 November 2026

- **ACID Bot:** Karam and his colleague worked jointly across research, implementation and thesis writing. Present the entire workflow as shared work; do not invent separate personal ownership of individual phases.
- **Compiler:** Work was also carried out jointly with a colleague across the project. Present its design, implementation and documentation as shared contributions. A collaborator name for Compiler has not been established here.
- **TeamTemp:** Tasks/features were divided among an 11-person team. Karam remained a full-stack developer throughout. Testing, security fixes, some code reviews, merge-conflict assistance and CI/CD support were his personal engineering contributions, not rotating roles. His fixed communication responsibility connected the Head of Department, development team and customer. Separately, he rotated into Scrum Master and Team Lead roles once each. Keep assistance distinct from sole pipeline ownership or a guaranteed troubleshooting outcome.
- **Extra-project implementation:** Sources have been documented and incorporated into the master inventory as P12–P20 plus supporting coursework. All nine added project records are represented locally with the confirmed grouping. 24 actual captures/artifact views are available; ARM now runs original machine code in native CPUlator, and the Python/FAT original-code demos are implemented. Publication remains deferred.
- **Extra-project interpretation:** OperatingSystem Lab2 is the main operating-systems project; Lab1 is supporting material. Filesystem storage overwriting on exit is author-confirmed intended behaviour. Marvin is intentionally a fake AI interface; real AI integration is outside its goals. Leave the separate Cryptography exercise out of portfolio selection and repair priorities.
- **Current action completed:** Added the nine projects locally and applied the collaboration corrections. Karam explicitly requested no push to main; the changes remain uncommitted and unpushed for later continuation.

The detailed comparison below is a historical 14–15 November snapshot, superseded for implementation status by the audit linked above. Its statements about eight cards, placeholders, modal details and missing demos describe that earlier version. Felix was not re-audited for this status reconciliation.

## Assessment

Felix's portfolio currently makes the stronger visual impression and gives technical visitors more opportunities to explore. Karam's portfolio makes a clearer case for backend and full-stack recruitment through specific professional contributions, company adoption, testing/deployment work and recommendation letters. These are judgments about the presented evidence, not a ranking of either person's engineering ability.

The best improvement is to combine Karam's professional evidence with a more distinctive presentation and better demonstrations. Adding a larger project catalogue alone would leave the main gap unresolved.

Karam confirmed completing Eshop, Fake GPT and the 8-Segment Display Controller and has since supplied their sources in `extraPorjects`. Their details and the other reviewed projects are now recorded in the master inventory and local portfolio. Use his source-reviewed READMEs and latest scope clarifications; Felix's descriptions and screenshots are not evidence of Karam's implementation. Actual captures are now included; further screenshots from Karam remain optional.

## Sources and checks

- [Felix's live portfolio](https://portfolio.felix.best/), including its project descriptions, screenshots and browser demo code.
- [Karam's live portfolio](https://karmasora.github.io/Portfolio/), its published JSON and this repository. Published JSON matched the local JSON at the original review; the later local changes described above remain unpushed.
- [Career and project inventory](../JobSearchData/Karam_Matar_Career_Experience_and_Project_Inventory.md), with the latest author clarifications taking precedence over older review notes.
- [Existing design direction](./DESIGN.md) and [earlier peer comparison](./PEER_PORTFOLIO_REVIEW.md).

Both public home pages were inspected in Chromium at 1440 × 1000 and 390 × 844, with screenshots. Karam's TeamTemp details dialog was opened, the introduction was inspected in both themes, and the phone menu was opened. Neither page had horizontal document overflow at the tested sizes. In a separate reduced-motion check, Felix's display simulation responded to ArrowUp by changing 00 to 01, and its Interrupt control selected that mode. No comparative Lighthouse benchmark or complete accessibility audit was performed.

## Comparison

| Area | Felix | Karam | Implication |
| --- | --- | --- | --- |
| First impression | Strong condensed typography, an instrument-like visual system and a coherent journey through five computing layers. | Clear name, readable introduction, visible contact/CV actions and recent employers; quieter visual identity. | Give the introduction one recognisable visual tied to Karam's work. |
| Project evidence | Screenshots, inline explanations and several browser demonstrations make the work tangible. Some demonstrations explicitly recreate the original program. | TeamTemp has ten screenshots; ShowcaseSERL has a public demo; gameplay is linked. Three projects share a decorative fallback image. | Surface existing evidence and give important projects specific technical visuals. |
| Professional contributions | The home page emphasises projects and technical breadth. | Internships, individual responsibilities, adoption, security fixes, tests, deployment and recommendations are prominent. | Preserve this strong recruitment foundation and make it easier to inspect. |
| Project depth | Visitors can explore program behaviour within the page. | Details dialogs mainly expand summary paragraphs and repeat the technology list. | Add decisions, challenges, results and evidence to case studies. |
| Organisation | Five layers create a memorable organising idea; a separate project table offers a compact route. | Eight projects receive similar card treatment. Every item is marked `featured`, and the component does not use the flag to create a selected set. | Establish a clear selected-work tier and retain a compact complete catalogue. |
| Mobile journey | Strong visual identity, but the introductory visual and index delay the first project. | Readable introduction and conventional menu; four experience entries precede Projects. | Offer a direct selected-work route while retaining easy access to experience. |
| Sharing | Published HTML includes a social preview image. | Social metadata exists, but no Open Graph/Twitter image is configured or published. | Add a designed preview after the visual direction is settled. |

Neither page is especially short: both measured around 15,000 CSS pixels tall at the tested phone width. Karam's Projects heading appeared around 3,611px down the document; Felix's first project layer appeared around 2,194px down. These are navigation observations, not performance scores. The useful goal is quicker access to strong evidence, rather than an arbitrary page-height target.

## Detailed findings register

| Finding | Evidence from the current portfolio | Why it matters | Recommended response |
| --- | --- | --- | --- |
| Strong professional foundation | Four experience entries contain 13 contribution bullets. Kravi's initial application, company adoption, reliability fix, tests and deployment responsibilities are described explicitly. | There is already substantial material for backend/full-stack recruitment. | Preserve this evidence and connect it to richer project explanations. |
| Most important backend application lacks a project entry | Kravi appears in the introduction, Experience and About, but is absent from the eight-item project catalogue. | Someone browsing only Projects misses the clearest Python/backend example. | Add Data Sorter as a flagship case study. |
| Selection is not expressed | All eight projects have `featured: true`; `Projects.tsx` renders a category-filtered grid without using that field to select work. | Smaller and stronger projects receive similar visual weight. | Show three or four selected projects, keeping the complete catalogue accessible. |
| Repeated decorative imagery | Compiler, VulnerabilityChecker and ACID Bot resolve to the same fallback image. | The images occupy substantial space without explaining the projects. | Use actual output, explanatory diagrams or compact text-led treatments. Preserve original files. |
| Good existing evidence is underused | TeamTemp has ten screenshots, ShowcaseSERL has a live demo, and Death Marching Souls links gameplay. | More convincing presentation is possible with assets already available. | Add captions, relevant contribution notes and clear evidence actions. |
| Detail views add limited structure | The TeamTemp dialog expands the description and repeats technologies; the component renders one `longDescription` paragraph for each project. | Technical decisions and results are difficult to scan. | Introduce structured case studies with evidence beside the relevant explanation. |
| The introduction is clear but visually quiet | The opening combines the name, a role description and a recent-experience index. | It explains Karam's background but offers a less distinctive visual memory than Felix's opening. | Preview one project-specific visual while retaining readable positioning and CV/contact controls. |
| Projects take time to reach on phones | At 390px width, Projects starts around 3,611px down, following all four experience entries. | Visitors seeking examples must scroll or use the menu. | Add an immediate selected-work route and compare page-order options. |
| Skills are mostly detached from their evidence | The data lists 44 skills across nine categories; the current presentation does not connect selected skills directly to their strongest work. | Visitors must infer where technologies were used. | Link a few important skills to Kravi, TeamTemp or Compiler. |
| Repetition contributes to page length | Experience, Projects and About discuss overlapping work; recommendations also appear through References and Documents. | Repeated material can delay distinct evidence. | Give each section a clear purpose and consolidate duplicate presentation where useful. |
| Project details lack dedicated routes | Project details are held in component state and shown in dialogs. | Applications cannot directly link to a complete project explanation. | Add stable static case-study URLs, with optional dialog previews. |
| Social sharing lacks an image | The published page and `layout.tsx` define social titles/descriptions, but no Open Graph/Twitter image. | Shared links miss a useful visual introduction. | Add a readable preview after the visual direction is settled. |
| Coursework breadth is incomplete | Karam confirmed completing Eshop, Fake GPT and the 8-Segment Display Controller; these are absent from the catalogue. | Database, terminal and hardware work is less visible than it could be. | Defer additions until Karam supplies his implementations after preparation. |
| Compiler source access is a known, accepted limitation | The latest inventory clarification accepts the link to the private repository. | A public visitor may encounter unavailable source even though the project itself is valid. | Preserve the accepted URL and make its access limitation clear; do not change visibility. |

### Strengths to retain

- Clear personal/team attribution and specific professional responsibilities.
- Direct CV, email and professional-profile actions.
- Existing recommendation letters, degree documentation and original screenshots.
- Readable typography, both themes, conventional phone navigation and accessible native project dialogs.
- Existing Next.js static export and meaningful first-load content.

### Further observations about Felix

The follow-up source review confirmed a static-page presentation enhanced with browser modules, lazy demo mounting, a searchable command interface, a central animation pause state and a separate filtered project table. These mechanisms support the visual story; they are described in the [companion breakdown](./FELIX_PORTFOLIO_BREAKDOWN.md).

His presentation also has limits worth recognising. The long home page still requires navigation; some descriptions use broad security/performance claims without measurements on the page; individual contribution and project context are not consistently explained. The HTML CV page explicitly dates its narrative to June 2024 and points to a PDF labelled current. Those details support borrowing useful presentation techniques while keeping Karam's stronger attribution and professional narrative.

## Proposed direction

Audience: recruiters and engineers considering backend and full-stack roles, with systems programming as a differentiator. This follows the current portfolio positioning.

Use a professional introduction followed quickly by selected engineering work. Let the case studies provide technical depth. Give visitors a compact way to browse the complete catalogue.

Retain the existing visual foundation: Manrope for headings/body, porcelain `#f5f6f2`, white `#ffffff`, ink `#182f35`, teal `#155e63`, slate `#53686d` and burnt orange `#a44723`. Preserve the existing dark equivalents. Improve hierarchy, image treatment and content before changing the palette or font family.

For a personal signature, explore a compact visual of the actual Kravi review workflow or an actual compiler trace. Use approved media or a clearly labelled explanatory diagram. Keep the name, role, contact and CV easy to see. Spend motion on a visitor-controlled interaction, with a useful static state.

An early concept based entirely on circuit decoration would repeat the current placeholder problem. The recommended visual instead explains a real piece of Karam's work. There is no need to reproduce Felix's five-layer motif.

Proposed page order, subject to an implementation preview:

1. Introduction with role, brief evidence, CV/contact and a clear selected-work link.
2. Three or four selected projects, with direct evidence actions.
3. Professional experience, linked to the corresponding case studies.
4. Compact catalogue of the other projects, including the nine extra-project entries now present locally.
5. Recommendations, concise background/education and contact. Keep documents accessible without repeating the same recommendation cards in two places.

This changes the current experience-first order only as a proposal. An alternative preview can retain Experience first and add a compact selected-work strip beneath the introduction. Compare both before choosing.

## Prioritised work

### 1. Give the strongest work a case-study format

**Priority:** Highest. **Estimated effort:** 1–2 focused days for initial content and a reusable layout, assuming evidence is available.

Start with Kravi Data Sorter, TeamTemp and Compiler. ACID Bot can be the fourth selection, particularly for automation roles. Keep ShowcaseSERL's working public demo easy to reach.

Kravi is the largest missed opportunity: it is described in Experience and About but has no project entry. It demonstrates the Python/backend work that the introduction promises.

Each case study should answer:

- What problem did the project solve, and for whom?
- How was the work shared? For ACID Bot and Compiler, describe joint work throughout. For TeamTemp, distinguish personal engineering contributions, continuous full-stack work, fixed communication responsibility and the Scrum Master/Team Lead rotations. Testing, security fixes, reviews, merge assistance and CI/CD support belong with his personal contributions.
- What technical constraint or failure required a decision?
- What changed, and what evidence supports that result?
- What can the visitor inspect: screenshot, diagram, trace, thesis, demo or repository?

For Kravi, lead with the initial application and company-wide use. Explain the database connection-pool failure: remote image requests held connections during download/rendering; releasing connections earlier and adjusting preloading resolved the observed failures in deployment testing. Add an approved architecture diagram. Do not invent latency gains, user counts or a public product demo.

For TeamTemp, annotate existing screenshots with the relevant contributions without implying ownership of the whole screen. Show configurable scale questions, role handling or server-side validation only where the media supports them. Explain the divided feature work, continuous full-stack responsibilities, permanent communication role and occasional Scrum Master/Team Lead rotations. Distinguish personal Cypress work, limited code review and assistance with merges/CI troubleshooting from the team's broader test coverage and delivery outcome.

For Compiler, show a small real input, an intermediate representation and output from the actual implementation when available. Explain that the work was performed jointly with a colleague. For ACID Bot, show task intake, implementation/testing and a pull request with mandatory human review; explicitly credit joint research, implementation and writing, and retain the thesis link and source ownership boundaries.

**Done when:** A reader can identify the problem, accurately attributed contribution and supported result without reading a single dense paragraph. At least the first three case studies offer a meaningful evidence item; a verified explanatory diagram is acceptable where runtime output is pending.

### 2. Establish selection and improve the introduction

**Priority:** High. **Estimated effort:** 0.5–1 day after choosing the initial case studies.

Use the existing `featured` field meaningfully, selecting three or four projects. Retain every current project in the full catalogue. Use brief summaries on the home page; keep technical depth in the case studies.

Make backend/full-stack positioning explicit near the name. A possible opening, based on supported facts:

> I build backend and full-stack applications with Python, TypeScript and SQL. At Kravi Analytics, I built the initial satellite-imagery review platform now used across the company.

Keep the current CV and contact controls. Add a clear link to selected work. Explore a small real-project visual beside the introduction; compare it with the recent-experience index. On phones, ensure the first selected project is easy to reach without scrolling through every internship.

**Done when:** A short visit explains Karam's target role, a concrete reason to consider him, and where to inspect the work. Verify this with a fresh reader rather than claiming a guaranteed recruitment outcome.

### 3. Replace repeated decorative project imagery with specific evidence

**Priority:** High. **Estimated effort:** 0.5–1.5 days, depending on available assets.

Three cards currently use `default-project.png`: Compiler, VulnerabilityChecker and ACID Bot. Preserve the original asset and existing screenshots; change the display treatment where useful.

| Project | Recommended treatment |
| --- | --- |
| Compiler | Actual input → IR → VM output, or an explanatory pipeline diagram derived from the implementation. |
| VulnerabilityChecker | A labelled dependency-scan/SBOM workflow that separates team scope from Karam's contributions. |
| ACID Bot | A labelled task-to-PR workflow ending at required human review. |
| Kravi | Approved media or a diagram of detection data, S3 imagery, backend, database and review workflow. |
| TeamTemp | Existing screenshots with clear captions and useful crops; retain full-image access. |

A compact text-led card is also valid when there is no useful media. Generated product screenshots would misrepresent the work.

**Done when:** Selected projects are distinguishable visually, and each visual explains something about that project.

### 4. Deferred: add the three confirmed projects with accurate scope

**Status:** Source review, README preparation, inventory expansion and the nine local catalogue entries are complete. Screenshots are pending from Karam. The table below guides later media selection; interactive work remains separate. The earlier estimate for adding the three entries is superseded by the completed local additions.

| Project | Useful presentation | Placement |
| --- | --- | --- |
| Eshop | Own screenshot, data model and a short explanation of an implemented query, integrity constraint or transaction. Link a demo/source only where available. | Supporting backend/database work. |
| 8-Segment Display Controller | Own board/emulator capture and explanation of inputs and display behaviour. Compare polling/interrupts only if both exist in Karam's version. | Systems/hardware evidence; a possible later interactive showcase. |
| Marvin / Fake GPT | Own terminal session showing the intentionally fake AI character, menu-driven utilities, inventory and data queries. Explain its scripted implementation as the intended design. | Supporting Python application; do not treat absence of real AI as a missing feature. |

The fact these projects were completed is already confirmed. The remaining task is collecting their particular evidence and attribution. Do not borrow Felix's screenshots, source, timings or feature claims.

**Done when:** Each entry adds distinct evidence and accurately describes Karam's version. The catalogue remains easy to scan.

### 5. Build one technical interaction

**Priority:** Medium, after the content and evidence work. **Estimated effort:** 1–3 days for a bounded first version; running the original C++ in the browser could take longer.

Recommended first choice: a Compiler walkthrough. Show a small sample program, tokens or IR and VM output, with controls to step through the stages. First capture validated output from the actual compiler. If using recorded results, label it as a recorded trace and offer fixed examples. A later WebAssembly version can offer actual execution if practical.

The display controller's source has been supplied and inventoried as P14. It may become a future alternative after its public presentation is selected; it remains excluded from current showcase work. Any later browser recreation should be labelled as a simulation, with illustrative timing identified as such. Felix's display demo itself makes this distinction.

Keep the interaction inside the relevant project, load it when needed, support keyboard/touch, and provide a static explanation. Show meaningful behaviour within a few actions.

**Done when:** The interaction demonstrates an engineering concept accurately and adds information beyond an animation.

### 6. Finish navigation, evidence links and sharing

**Priority:** Medium to low. **Estimated effort:** 0.5–1 day alongside final review.

- Give case studies stable URLs suitable for a CV or application. Prefer static routes compatible with the existing GitHub Pages export. Dialogs may remain as previews.
- Link a few skills to evidence: Python/FastAPI/PostgreSQL to Kravi; TypeScript/Cypress to TeamTemp; C++ to Compiler. Avoid building an elaborate search system for this.
- Reduce repeated wording between Experience, About and Projects. Keep Experience about responsibilities and progression; use case studies for technical explanations.
- Keep a concise recommendation area and a clear document index. Avoid repeating the same recommendation links/cards without a distinct purpose.
- Preserve the current author-accepted Compiler URL. If improving its presentation, label its access limitation clearly; the 10 November clarification accepts the private link and supersedes the earlier review's removal recommendation. Do not change repository visibility.
- Add a social preview image after choosing the introduction design. Use actual name/role and a readable visual, and wire it into Open Graph/Twitter metadata.

**Done when:** Visitors can reach relevant evidence directly, understand private-source limitations and share a useful preview.

## Suggested delivery sequence

| Pass | Deliverable | Approximate effort |
| --- | --- | --- |
| Content and evidence | Kravi entry, three structured case studies, project-specific visuals. | 2–3 days |
| Presentation | Introduction preview, selected-work hierarchy and compact catalogue of existing projects. | 1–2 days |
| Technical showcase | One bounded, correctly credited Compiler walkthrough; original output can follow the first release. | 1–3 days |
| Finish | Stable links, sharing preview and responsive/accessibility checks. | 0.5–1 day |

Eshop, Marvin/Fake GPT and the ARMv7 display controller are recorded as P12/P15/P14 and now included in the local catalogue alongside the other six new entries. Preserve their confirmed grouping in later presentation work; original-source captures and working demos are now available. Further images from Karam remain optional.

These are planning estimates, not delivery commitments. Missing media, source access and browser-execution work can change them. A useful first release is the content/evidence and presentation passes; the interactive showcase can follow.

## Implementation map and verification

Likely files: `public/data/portfolio.json` for content and selection; `src/lib/types.ts` for structured case-study fields; `src/components/Projects.tsx` and static project routes for presentation; `src/components/Hero.tsx`, `src/app/page.tsx` and limited `globals.css` changes for hierarchy; `Skills.tsx`, `References.tsx` and `Documents.tsx` for evidence navigation; `src/app/layout.tsx` for sharing metadata.

Reuse the existing Next.js application and static export. A framework migration is unnecessary for this plan.

For implementation, run lint and the production build with the current GitHub Pages base path. Check direct case-study URLs and `/Portfolio/` assets; inspect 320px, 390px, tablet and desktop widths in both themes. Check keyboard/touch operation, menu/dialog dismissal and focus return, reduced motion, CV/contact and evidence destinations. Refresh Lighthouse if imagery or interactive loading changes materially. Check first-load content and provide a useful fallback for each demonstration.

Keep original screenshots and the author-supplied CV. Preserve factual dates, individual/team attribution, employer-owned code and unfinished-work status. No fabricated metrics, testimonials or private reference contacts are needed to make the portfolio stronger.
