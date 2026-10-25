# Peer portfolio review and next steps

**Review date:** 26 October 2026. Browsing began late on 25 October and continued after midnight in Europe/Stockholm.

**Portfolio baseline:** [`dc7c490`](https://github.com/KarmaSora/Portfolio/commit/dc7c490de2993b27b24422ba1f9bde79400e5260), the published layout with restrained warm accents.

**Status:** Findings and recommendations documented for later work. The recommendations below are a backlog; this documentation update does not implement UI or content changes.

## Purpose and scope

Compare the public presentation of four portfolios for backend and full-stack recruitment. The review considers visual identity, readability, navigation, contribution clarity and accessible evidence of completed work.

| Portfolio | Reviewed source |
| --- | --- |
| Karam Matar | [Live portfolio](https://karmasora.github.io/Portfolio/) |
| Abduvohid Ilhomov | [Live portfolio](https://ailhomov.github.io/portfolio/) |
| Abdallah Alhamad | [Live portfolio](https://abdallah-alhamad.vercel.app/) |
| Mouaz Naji | [Home](https://mouazdev.vercel.app/), [Journey](https://mouazdev.vercel.app/journey), [Projects](https://mouazdev.vercel.app/projects), [Skills](https://mouazdev.vercel.app/skills) and [Contact](https://mouazdev.vercel.app/contact) |

The sites were inspected in Chromium at 1440px desktop and 390px phone widths. Mouaz's additional project categories were opened rather than judging only the default category. Checks included visible content, mobile navigation, selected interactive controls and CV access. No horizontal overflow was observed at the tested phone width. Three direct CV URLs served PDF responses; Mouaz's browser download also completed.

These are observations and editorial judgments about the sites, not independent verification of every career claim or a ranking of the developers' abilities. The downloaded CV contents were outside this comparison. No comparative Lighthouse benchmark, complete accessibility audit or user study was performed. Links and site content may change after this snapshot.

## Main assessment

Karam's and Abduvohid's sites make the clearest immediate recruitment case for the target roles, with different strengths. Karam explains individual engineering contributions and provides supporting recommendations. Abduvohid foregrounds product delivery. Mouaz has the most distinctive personal branding and a substantial technical catalogue. Abdallah's presentation needs the most editorial refinement.

There is no single winner across all dimensions. A systems-focused vacancy may give more weight to technical project breadth; another role may prioritise deployed application ownership, clear responsibilities or public product evidence.

## UI and navigation

| Portfolio | Strengths | Trade-offs |
| --- | --- | --- |
| Karam | Readable typography, clear hierarchy, visible CV/contact actions, responsive navigation and a useful recent-experience index. | Restrained visual identity; substantial desktop introduction spacing; a long overall page. |
| Abduvohid | Compact experience-first opening and terminal interaction alongside desktop navigation. | Repeated outlined cards; ordinary section links disappear on mobile, leaving scrolling or terminal commands. |
| Abdallah | Simple navigation and consistent purple accents. | Large unused desktop hero space; technology badges delay work evidence on mobile. |
| Mouaz | Strong portrait/logo identity and a consistent visual theme. Skills link to relevant project filters. | Dense metadata, small text and Git terminology add interpretation for nontechnical visitors. |

## Content and supporting evidence

| Portfolio | Strengths | Opportunities |
| --- | --- | --- |
| Karam | Specific personal responsibilities across backend development, reliability fixes, testing, deployment, security and communication. Written recommendations provide supporting evidence. | Some experience/project overlap; the Compiler source URL is unavailable to public visitors. |
| Abduvohid | Public app and business links make product delivery prominent; ownership is clearly described. | Some descriptions repeat their following bullets. |
| Abdallah | Education/internship journey and accessible code links. | Personal responsibilities and outcomes need detail; a profile-configuration repository weakens project curation; student/graduate wording conflicts. |
| Mouaz | Broad systems, mobile and full-stack catalogue, including database and low-level projects. | Professional-role descriptions are brief; individual responsibilities and observed outcomes need more explanation. |

### Concrete checks behind the comparison

- **Karam:** The public [Compiler repository URL](https://github.com/KarmaSora/Compiler) returned HTTP 404. A visible Source action therefore leads to an unavailable destination. This does not invalidate the project; the problem is the promised public access.
- **Abduvohid:** The [Android app listing](https://play.google.com/store/apps/details?id=com.lucidflow.lucid_app) and [business website](https://auroradreams.se/) responded successfully. The desktop search control exposed a command input. A conventional mobile section menu was absent.
- **Abdallah:** The roadmap lists graduation, while introductory/contact copy still describes ongoing studies and Summer 2026 availability. These conflicting states weaken confidence in freshness.
- **Mouaz:** A Python skill link opened a filtered project view. Other categories exposed an early-alpha distributed database and Android work. Mobile-menu Escape and CV download worked. The Journey header's future-dated update label could confuse readers about freshness.

## What to retain in Karam's portfolio

- Keep the current layout and restrained warm-accent palette as the working baseline. The comparison does not justify a wholesale redesign.
- Keep experience prominent, especially the Kravi application's initial independent build, company-wide adoption, maintenance and concrete reliability work.
- Retain visible CV/contact actions, keyboard-operable navigation and straightforward labels.
- Preserve the distinction between personal implementation, assistance and team outcomes. Written recommendations complement this clarity.
- Keep original screenshots and intentional placeholders. Projects without a visual interface or publishable media do not need fabricated screenshots.
- Keep the established project order and concise public experience wording unless a later instruction changes them. Detailed career evidence remains in the private inventory.

## Prioritised backlog for Karam

### 1. Correct the unavailable Compiler source action

**Finding:** A public Source link leads to a repository that visitors cannot access.

**Why it matters:** A recruiter or engineer following evidence reaches a dead end. This is a small, concrete usability problem rather than a reason to remove the project.

**Recommended next change:** Remove the public Source action while keeping the Compiler card, description and technologies. The existing renderer already omits Source when the project's `github` field is null. An alternative working public reference can be supplied later if available.

**Likely file:** `public/data/portfolio.json`, project `compiler-from-scratch`.

**Done when:** The project remains visible, its detail view works and no unavailable source link is offered. Do not change repository visibility as part of this fix.

### 2. Explore a stronger personal visual signature

**Finding:** The current site is professional and readable, but its first impression is more conventional than the portrait-led reference.

**Why it matters:** A recognisable identity can help visitors remember the person behind the work. More colours or more animation alone would not establish that identity.

**Direction to explore:** Preview a restrained use of the existing portrait near the introduction, or another small identity treatment grounded in Karam's actual work. Compare it with the current version before choosing. A full-screen portrait treatment is not required.

**Likely files:** `src/components/Hero.tsx`, `src/components/About.tsx` and limited styles in `src/app/globals.css`.

**Done when:** The preferred treatment feels personal while keeping the role, contact/CV actions and recent experience easy to find. Check desktop and phone layouts in both themes. Preserve the name as one coherent heading and retain original media.

### 3. Connect selected skills to evidence

**Finding:** Linking a skill to relevant work can make a technology list more useful than a list of labels alone.

**Why it matters:** Recruiters can see where a tool was used, and technical readers can investigate supporting work with fewer navigation steps.

**Direction to explore:** Link selected skills to existing experience entries or relevant projects. For example, FastAPI/PostgreSQL evidence primarily belongs to the Kravi role. A project-only filter must not imply that a skill has no evidence when its strongest use is in professional experience.

**Likely files:** `src/components/Skills.tsx` and, if needed, explicit mapping in the content data. Project anchors or filtering would depend on the chosen interaction.

**Done when:** Each linked skill has a useful, accurate destination that works with keyboard and touch. Keep plain text for skills without a suitable destination. Avoid adding an extra catalogue or complex search interface just to support a few links.

### 4. Make existing delivery evidence easy to recognise

**Finding:** Public product links make delivery tangible; internal professional work needs a different evidence path.

**Why it matters:** Karam's strongest application is internal. The site should clearly convey its users, contribution scope and demonstrated outcomes without requiring public code or an invented demo.

**Direction to explore:** Check whether already-supported outcomes remain easy to scan: company-wide use, the deployed connection-pool fix, independent CI/deployment setup and the team's accepted delivery. Keep the existing recommendation links accessible. Add evidence only when it exists and is appropriate to disclose.

**Done when:** A reader can explain what was delivered, what Karam personally did and what supporting evidence is available. No invented metrics, private code, confidential screenshots or changes to unfinished-work status.

### 5. Review repetition and page length only where it helps

**Finding:** Experience and Projects sometimes cover the same work, and the overall page is long.

**Why it matters:** Repetition can delay discovery of distinct evidence. Some overlap is useful: Experience explains responsibilities, while Projects can show the product, imagery and technical context.

**Direction to explore:** Review specific repeated passages and the purpose of each section before proposing edits. Preserve information that serves a different purpose. This is an optional editorial pass, not an instruction to shorten everything or remove smaller projects.

**Done when:** Any chosen edit improves scanning without losing verified contributions, changing attribution or silently reordering the catalogue.

## Decisions to make when resuming

1. Start with the unavailable Compiler source action; it has the clearest benefit and smallest scope.
2. Choose whether a more prominent existing portrait or another restrained identity treatment deserves a preview.
3. Decide which skills would benefit from links, then choose experience anchors or project destinations that actually demonstrate them.
4. Identify any specific repeated content worth revising before changing its length.

Borrow useful interaction patterns, not another person's credentials, technology claims, metrics or project contributions. The private career inventory and the author's clarifications remain authoritative for Karam's content. Do not add referee contact details to public data or documentation.

## Validation for later implementation

Use checks appropriate to the change. For UI work, inspect keyboard focus, menu dismissal, project filters/dialogs, CV/contact controls and layouts from 320px through desktop widths in both themes. Run the production build and lint checks. Refresh Lighthouse when visual or loading changes justify it; the baseline's local scores of 100 in all four categories are not comparative measurements of the other sites.

For a documentation-only change, verify the text, links and staged file scope. There is no need to rebuild the application merely to document this review.
