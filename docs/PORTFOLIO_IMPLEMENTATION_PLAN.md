# Portfolio implementation plan

**Current release authorization — PF-P1:** The completed catalogue/media/demo work is now authorized for publication. The proposed larger presentation pass remains future work. Earlier local-only statements describe preparation history. See [GitHub Pages hosting and release status](./GITHUB_PAGES_DEMOS.md).

Prepared: 15 November 2026. **Reconciled current status — PF-A1:** The local catalogue has **15 cards**, including grouped Flask implementations and the analyser as related work under Typing Trainer. All **20 inventory records** and **34 gallery images** are retained. Seven original-code/recorded-output demo routes are implemented, and Eshop has its original backend/database available through a local runner. Public Eshop hosting and the wider presentation pass below remain open. Nothing in this portfolio update is committed, pushed or deployed. See the [current audit](./PORTFOLIO_STATUS_AUDIT_2026-11-15.md) and [local handoff](./LOCAL_PORTFOLIO_HANDOFF.md).

Background: [Comparison findings](./FELIX_PORTFOLIO_PLAN.md) and [Felix's site breakdown](./FELIX_PORTFOLIO_BREAKDOWN.md).

## 1. Scope and decisions

The first release will improve the presentation of existing work, add Kravi Data Sorter from the established experience record, and make project explanations directly linkable. It will preserve the existing Next.js static export, typography, palette, CV and original media.

Feature four projects: **Kravi Data Sorter, TeamTemp, Compiler and ACID Bot**, in that order. Keep ShowcaseSERL, VulnerabilityChecker, Death Marching Souls, Space Invaders, GyaGame and the nine newly added coursework projects in a compact catalogue. ShowcaseSERL retains a prominent live-demo action. The current local catalogue contains 15 cards; it would contain 16 once a standalone Kravi card is added. The featured-project selection/layout remains a proposal.

**Extra-project entries added locally:** The five repositories in `/home/karam/personal/extraPorjects` have been reviewed and documented. The [master inventory](../JobSearchData/Karam_Matar_Career_Experience_and_Project_Inventory.md) includes nine new records (P12–P20) and grouped supporting coursework. All nine added inventory records are represented in the portfolio JSON/grid with native expandable details. The two Flask implementations now share one card, and the analyser sits under Typing Trainer with independent source, screenshot and demo links. Their repository links are labelled private. These additions supersede the earlier deferral of the three projects first discussed during the Felix comparison.

**Screenshots:** 24 genuine source-application captures/generated-artifact views have been added, giving 34 gallery images including the existing TeamTemp screenshots. All capture bytes/hashes are retained. Ten implementations appear across eight current cards after grouping; no new screenshot is required for the completed demos. Further images supplied by Karam are optional. The ten existing TeamTemp screenshots still use generic fallback labels; specific, supportable captions remain optional presentation work.

**Recruiter-facing copy:** Karam wants the public project descriptions to be attractive and focused on strengths. The nine added entries now lead with purpose and functionality, followed by concrete engineering details and correct attribution. Keep bugs, review limitations and verification notes in the master inventory/READMEs; routine lab lifecycle details do not belong in the public project pitch. Do not invent performance results, deployment or feature claims. The grid with native expandable project details is in place; the richer visual work below remains planned.

**Details control and Python project distinction:** Project details now use native HTML disclosure controls so they remain accessible without JavaScript/modal handling. Keep this fallback for catalogue entries. Text File Analyser is a standalone text-statistics program; Typing Trainer uses its own comparison/timing modules. Retain the clear distinction when selecting or grouping coursework.

**Extra-project scope clarified by Karam:** Prioritise the OperatingSystem repository's Lab2 FAT project over the supporting Lab1 exercises. Overwriting storage when the filesystem exits was intended behaviour; do not frame cross-session preservation as an unmet requirement. Marvin is intentionally a fake AI interface implemented with scripted/menu-driven Python functionality, with no intended real-AI integration. The separate Cryptography exercise is excluded from current portfolio selection and repair work.

The recorded Compiler walkthrough is already complete: three genuine recordings, six views and 18 hash-verified artifacts. ShowcaseSERL, ARM, MARVIN, Typing Trainer, the related analyser and FAT also have working original-project demos. FAT already uses original C++ WebAssembly. Arbitrary visitor-input compilation is an optional additional Compiler task, not a requirement for the current walkthrough. [Runtime details](./ORIGINAL_PROJECT_DEMO_ROADMAP.md).

## 2. Attribution that all content must follow

These clarifications were supplied directly by Karam on 15 November and supersede earlier ambiguous wording.

| Project | Confirmed working arrangement | How to present it |
| --- | --- | --- |
| ACID Bot | Karam and his colleague performed the research, implementation and thesis writing together. | Use joint authorship throughout. Explain their shared work and shared decisions. Do not assign one phase, agent or subsystem exclusively to Karam. |
| Compiler | The project was also carried out together with a colleague across the work. | Credit joint investigation, design, implementation and documentation. Describe the pipeline as their shared implementation. The collaborator's name is optional until established. |
| TeamTemp | An 11-person team divided tasks/features. Karam was a full-stack developer throughout and the fixed communication contact between the Head of Department, development team and customer. He personally worked on testing, security fixes, some code reviews, merge-conflict assistance and CI/CD support. He separately rotated into Scrum Master and Team Lead roles once each. | Present the engineering work as his personal contributions. Keep the permanent communication responsibility and rotating project roles in separate sections. |
| Kravi | Karam built the initial application independently and later maintained/extended it with others contributing to the platform. | Preserve the existing distinction between the initial build, later personal work and existing/team systems. |

**TeamTemp personal engineering contributions:** Testing, security fixes, some code reviews, merge-conflict assistance and CI/CD support are work Karam personally performed. They are not rotating roles and must not be grouped under role rotation. Describe the specific assistance accurately without implying sole pipeline ownership or that every troubleshooting attempt succeeded.

Existing evidence supports personal Cypress tests and team unit/integration/E2E testing. The latest clarification confirms personal testing work but does not specify additional personally authored test suites. Use that distinction in detailed copy.

For ACID Bot, preserve Iquest AB's source ownership and mandatory human review before merge/deployment. The thesis is documentation. For Compiler, preserve the author-accepted private source URL with an accurate access label. Do not change repository visibility.

## 3. Prepared content

The confirmed joint-work and TeamTemp role wording has been applied to the existing project cards/details in the local JSON. The following drafts still guide the larger presentation pass. The supplied CV is unchanged.

### TeamTemp card

> Employee survey platform delivered by an 11-person team. I worked across frontend, backend and testing throughout, fixed reported security issues, and served as the permanent communication contact between the Head of Department, development team and customer.

### TeamTemp case study

**Context and collaboration**

> TeamTemp is an employee survey and engagement platform developed for Softhouse by an 11-person team. Features and tasks were divided among team members. I remained a full-stack developer throughout the project.

**My engineering contributions**

> I worked on frontend and backend features, including configurable scale questions and branch/user role handling. I wrote Cypress end-to-end tests, fixed security issues reported during testing through server-side validation, contributed to some code reviews, assisted with merge-conflict fixes and helped investigate CI/CD issues. The team also used unit and integration tests.

**Permanent communication responsibility**

> I was the permanent communication contact between the Head of Department, the development team and the customer, coordinating requirements, feedback, updates and demonstrations.

**Rotating project roles**

> I also served as Scrum Master and Team Lead once each during the role rotations. During my Scrum Master sprint, I broke features and requirements into smaller, categorised tasks for the team.

**Team result**

> The team's final delivery was formally accepted as exceeding customer expectations.

Use the existing acceptance document as evidence for the final sentence. A TeamTemp screenshot represents the team's product; caption the particular personal feature only when the image and contribution record support that connection.

### Softhouse experience entry

Proposed replacement bullets for the later JSON pass:

- Worked full stack throughout TeamTemp's development in an 11-person team, implementing frontend and backend features including configurable scale questions and role handling.
- Wrote Cypress end-to-end tests and fixed tester-reported security issues through server-side validation; the team also used unit and integration tests.
- Served as the permanent communication contact between the Head of Department, development team and customer, coordinating feedback, progress updates and demonstrations.
- Rotated into Scrum Master and Team Lead roles once each; during the Scrum Master sprint, broke features and requirements into smaller, categorised tasks.
- Contributed to some code reviews, assisted with merge-conflict fixes and CI/CD troubleshooting; the team's delivery was formally accepted as exceeding customer expectations.

Keep the existing internship title, dates and technology tags. The project role rotations do not change the employment title.

### ACID Bot card and collaboration text

Card:

> B.Sc. thesis completed jointly with a colleague in collaboration with Iquest AB. Together, we researched and implemented an autonomous bug-fix workflow that creates pull requests for mandatory human review.

Case-study collaboration:

> My colleague and I worked together across the research, implementation and thesis writing. The system and decisions described here are our joint work.

Organise the case study around the research problem, shared workflow design, implementation and testing, then the resulting thesis and human-review boundary. Link the existing thesis. Keep evaluation/performance figures out of the public copy, following the existing author instruction. The inventory already names Abduvohid Ilhomov as the thesis co-author; use that established credit without assuming the Compiler collaborator is the same person.

### Compiler card and collaboration text

Card:

> C++ compiler developed jointly with a colleague, from lexical analysis and parsing through semantic checks, intermediate code and execution on a custom virtual machine.

Case-study collaboration:

> My colleague and I worked together across the project, including investigating approaches, implementing the compiler and preparing its documentation. The compiler stages shown here describe our shared work.

Explain lexer, parser, semantic analysis, CFG-based IR, TAC and VM execution as stages of the system. These are technical stages, not a division of labour. Keep the existing title unless a later editorial choice improves it; make collaboration visible in the card and case study.

### Kravi card

> Internal satellite-imagery review platform used across Kravi Analytics. I independently built the initial Python/FastAPI application, then maintained and extended it with data ingestion, PostgreSQL/PostGIS workflows, tests and deployment work as requirements evolved.

The case study should explain the initial build, later collaboration, TIFF/S3 integration and the connection-pool reliability fix. Use established outcomes without inventing user counts or performance improvements. Do not describe direct satellite operation.

### Introduction

Keep Karam Matar as the main heading and place the role close to it. Suggested supporting copy:

> I build backend and full-stack applications with Python, TypeScript and SQL. My work includes a satellite-imagery review platform used across Kravi Analytics, TeamTemp at Softhouse, and collaborative systems and automation projects.

Retain contact, CV and professional-profile actions. Add a clear View selected work link to `#projects`. Keep the established geographic availability wording.

## 4. Content model

Extend the existing `Project` interface with an optional `caseStudy` object. Keep `id`, images, screenshot arrays, `featured`, category and current external links compatible with existing content.

Suggested shape:

```ts
caseStudy?: {
  context: string;
  collaboration: {
    kind: "individual" | "joint" | "team";
    summary: string;
    collaborators?: string[];
  };
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
  }[];
  evidence: {
    id: string;
    kind: "screenshot" | "diagram" | "recorded-trace"
      | "video" | "document" | "external";
    title: string;
    description: string;
    src?: string;
    href?: string;
    alt?: string;
  }[];
};
```

The `sections` array supports project-specific headings. Joint projects can use Shared approach and implementation. TeamTemp uses My engineering contributions, Permanent communication responsibility, Rotating project roles and Team result as distinct sections. Testing, security fixes, reviews, merge assistance and CI/CD support belong to My engineering contributions. Do not force every project into a My individual contribution template. Kravi's summary must explain its initial independent phase and later collaboration even though its overall kind is `team`.

Keep evidence references tied to existing asset paths wherever possible. A diagram is explicitly labelled as an explanation. A recorded trace is labelled as recorded output. Preserve `longDescription` as the fallback for projects without case studies and existing remote data without the new optional fields.

## 5. Implementation sequence

### Pass A — content and attribution

**Files:** `public/data/portfolio.json`, `src/lib/types.ts`, the career inventory, and affected About/Education copy stored in JSON.

1. Apply the prepared TeamTemp, Compiler and ACID Bot wording consistently to cards, case studies and any overlapping About/Education text.
2. Add Data Sorter with the established Kravi contributions and context; do not duplicate every experience bullet.
3. Mark the four selected projects as featured and the five remaining projects as non-featured. Store them in the planned selected order while retaining the relative order of the other existing entries.
4. Add structured content for the four featured case studies. Keep existing media, public links, source access choices and CV intact.

**Complete when:** All affected surfaces have consistent attribution, all 18 projects including Kravi are represented, and exactly four are selected for the featured layout. The nine extra-project entries already exist locally and must remain reachable.

### Pass B — case-study pages and reusable evidence

**Files:** new `src/app/projects/[id]/page.tsx`, a reusable `ProjectCaseStudy.tsx`, a small case-study header, and an extracted client gallery where needed.

1. Generate static routes from build-time JSON entries that contain `caseStudy`, using existing project IDs as stable route segments.
2. Render the overview, collaboration summary, project-specific sections, evidence and existing links. Generate project-specific metadata and a useful unavailable-ID result.
3. Extract the working screenshot gallery from `Projects.tsx` for reuse on TeamTemp's case-study page. Keep its native dialog, thumbnails, Escape/arrows, focus handling and full-image access.
4. Use a compact detail-page header with Back to projects, contact, CV and theme controls. Its home links must resolve to the home page with the correct hash; homepage-only `#experience` links would otherwise target the detail page.
5. Use Next's route links consistently with the configured base path; use the existing asset helper for public images/documents. Avoid prefixing route links twice.
6. Keep native expandable details for catalogue entries without full case studies. Featured actions become Read case study.

**Complete when:** Each featured page opens directly from the exported site, reloads correctly under `/Portfolio/`, returns to the home page and retains usable evidence controls.

Static routes are generated from content available at build time. Adding a future remote case study also requires generating/publishing its route. Preserve existing remote-data fallbacks without implying that a JSON refresh alone creates a new static page.

### Pass C — homepage hierarchy and navigation

**Files:** `Hero.tsx`, `Projects.tsx`, new `SelectedProjects.tsx`/shared project presentation, `page.tsx`, `Navigation.tsx`, content navigation order, and limited `globals.css` changes.

Use this page sequence:

```text
Introduction
Selected work: Kravi, TeamTemp, Compiler, ACID Bot
Experience
Complete project catalogue
Recommendations
Education and documents
About and skills
Contact
```

1. Keep `#projects` as the selected-work target so existing incoming links remain useful. Give the complete catalogue its own `#all-projects` target.
2. Use concise selected-project summaries and meaningful evidence actions. Start with a restrained two-column desktop layout and a single column on phones.
3. Make the complete catalogue compact and filterable. Include all nine projects with their direct evidence actions, while giving featured entries a case-study link instead of repeating their long descriptions.
4. Refine the introduction around the prepared copy and one small work-specific visual. On desktop, replace the large recent-experience panel with the visual and retain employer links in a compact form. On phones, use a small static treatment or omit the redundant graphic to protect the route into selected work.
5. Fix active navigation as part of the reordering: the current code reverses `navItems` to infer the active section, which assumes their order matches the document. Detect actual visible section positions. Mark both selected work and catalogue with a shared project navigation identity so Projects can be active in either region.
6. Preserve existing section IDs and menu keyboard behaviour. Align displayed navigation order with the new journey.

**Complete when:** A phone visitor can reach a meaningful selected project quickly; Projects highlights correctly in both project regions; navigation remains correct after scrolling, filtering and opening/closing evidence.

### Pass D — evidence, skills, recommendations and sharing

**Files:** project media under `public/images/`, case-study data/components, `Skills.tsx`, `References.tsx`, `Documents.tsx`, `layout.tsx` and project metadata.

| Work item | Concrete implementation |
| --- | --- |
| Kravi visual | Labelled high-level flow using already permitted concepts: external detections, S3 TIFF imagery, FastAPI, PostgreSQL/PostGIS and review. No invented interface. |
| Compiler visual | Real tree/CFG/IR/bytecode output and a six-stage recorded walkthrough are already present. A compact summary diagram is optional polish. |
| ACID Bot visual | Shared workflow from ClickUp task through implementation/tests to a pull request requiring human review. Credit the joint thesis work beside it. |
| TeamTemp visual | Retain original screenshots and add captions that distinguish the team's interface from Karam's confirmed features. |
| VulnerabilityChecker | Use a small explanatory workflow or text-led catalogue entry instead of a large repeated decorative image. |
| Skills | Link selected tools to actual evidence: FastAPI/PostgreSQL to Kravi; TypeScript/Cypress to TeamTemp; C++ to Compiler. Keep other skills readable as text. |
| Recommendations | Keep the recommendation cards in References. Documents retains degree/certificates and a clear link to the recommendation section instead of repeating identical cards. Preserve all PDF URLs. |
| Sharing | Produce a 1200 × 630 preview from the chosen name/role/visual system, using code/vector composition and a raster export. Set absolute Open Graph/Twitter image URLs for the homepage and appropriate case-study metadata. |

**Complete when:** Selected projects have distinct explanatory evidence, image alternatives/captions are useful, linked skills have accurate destinations and document access remains clear.

### Pass E — recorded Compiler walkthrough (completed)

Completed under PF-I1 and retained through the original-code demo integration:

1. Three actual programs and their original generated outputs are recorded, with 18 artifact hashes.
2. Six selectable stages expose source, syntax tree, control flow, IR, bytecode and VM execution.
3. The UI is labelled as recorded output and offers no arbitrary-input compile claim.
4. Joint Compiler authorship is preserved; the portfolio host is separate implementation work.
5. Desktop/mobile keyboard/touch, graph loading, downloads and direct static routes passed focused checks.

Keep these behaviours when making later presentation changes. Live arbitrary-input compilation remains optional.

### Pass F — production preview and checks

After app changes, run the existing lint and production-export build with `NEXT_PUBLIC_BASE_PATH=/Portfolio`. Use the production preview for browser checks. Avoid adding a test framework merely to verify text edits.

- Validate project IDs, selected count, case-study/evidence references and attribution against this plan.
- Open and reload every featured detail URL and an unavailable ID; verify correct base-path handling and page metadata.
- Inspect 320px, 390px, tablet and desktop layouts in both themes. Check long collaborator labels and image captions.
- Exercise the reordered active navigation, the complete catalogue filters and homepage/detail-page links.
- Check keyboard focus, Escape, gallery arrows/thumbnails, focus return, mobile menus and reduced motion.
- Check CV, recommendation, degree, thesis, video and demo destinations. Preserve the accepted Compiler source limitation without changing access.
- Preserve all 15 current cards and both presentation groupings; a new Kravi card would make 16. Ensure implemented case studies are present in exported HTML.
- Refresh Lighthouse after visual/loading changes; investigate material regressions rather than promising a fixed score.

Use a small content/route check and focused browser checks for meaningful regressions. Repeat broader checks only after relevant changes or failures.

**Complete when:** Production export and lint pass, the targeted browser checks pass and the implementation has a concrete desktop/phone preview for review. Publication is a subsequent action, not part of this planning task.

## 6. Preparation status and remaining inputs

| Item | Status | Effect on implementation |
| --- | --- | --- |
| Collaboration and TeamTemp role corrections | Supplied by Karam; recorded in this plan and the source inventory. | Ready for the content pass. |
| Four selected projects and scope | Proposed in this plan using existing evidence; not implemented by the current audit. | Available for a later layout/case-study pass. |
| TeamTemp media and recommendation/thesis files | Existing portfolio assets/links. | Reuse without requiring new uploads. |
| Kravi and ACID Bot diagrams | Can be prepared from the established public-safe workflow descriptions. | No dependency on employer source or private datasets. |
| Original Compiler sample output | Three recordings and 18 generated artifacts are already available in the completed walkthrough. | Reuse existing evidence; no input/output collection blocker remains. |
| Compiler collaborator's display name | Not established here. | Use colleague until the name is supplied; do not assume the thesis co-author is the same person. |
| Extra-project sources, inventory and local catalogue | P12–P20 and supporting coursework inventoried; all additions represented in the 15-card catalogue with confirmed grouping. | Done for the current grid/details; retain the source-to-card mapping in any new layout. |
| New project screenshots | 24 captures/artifact views added; 34 gallery images retained. All capture hashes/dimensions and current card mappings verified. | No screenshot blocker; additional media/captions are optional. |
| Original-code runtime demos | Seven explicit routes implemented; sources/binaries pinned and checked. | Reuse the working demos rather than scheduling them again. |
| Public Eshop demo | Original backend/database runner works locally; public hosting and URL are unset. | Choose a separate backend/database host if publishing a live Eshop demo. |

Suggested reviewable change groups: content/attribution → case-study routes/gallery → homepage/navigation → evidence/sharing. The recorded Compiler walkthrough and original-code demos are already complete. Each group should have a concrete preview or focused validation appropriate to what changed.
