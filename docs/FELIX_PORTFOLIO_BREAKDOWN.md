# How Felix's portfolio works and how he describes his projects

Snapshot: 14–15 November 2026. Sources are the published site and its publicly served HTML, CSS and JavaScript. This document describes observable presentation and implementation. Project claims are attributed to the site; their correctness, original source implementations and complete development histories were not independently audited.

Related document: [Comparison findings and improvement plan for Karam's portfolio](./FELIX_PORTFOLIO_PLAN.md).

Current execution scope: [Implementation plan](./PORTFOLIO_IMPLEMENTATION_PLAN.md). Karam will supply the three shared-coursework projects later; their discussion here is reference material. His 15 November clarification establishes joint end-to-end work on ACID Bot and Compiler. On TeamTemp, he worked full stack throughout with a fixed communication responsibility. Testing, security fixes, reviews, merge assistance and CI/CD support were his personal contributions; Scrum Master and Team Lead were separate rotating project roles.

## 1. The central idea

Felix organises his portfolio around moving from browser applications down toward hardware. The headline, five-layer index, graphics, navigation and demonstrations all reinforce that idea. It gives a broad collection of student, personal and client work a common structure. See the [home page](https://portfolio.felix.best/).

| Layer | Category | Projects | What the category communicates |
| --- | --- | --- | --- |
| L4 | Web | June, TimeToMove, Eshop | Interfaces, web applications and their data. |
| L3 | Apps | Fake-GPT, Press-Ice, School Management System | Programs people interact with through a terminal. |
| L2 | Algorithms | Aristotle's Puzzle Solver, Advent of Code 2024 | Search, problem solving and algorithmic behaviour. |
| L1 | Systems | Custom File System with FAT | Files, blocks and storage allocation. |
| L0 | Metal | 8-Segment Display Controller, TIS-100 | Input handling, registers and assembly-style execution. |

These are categories for telling the portfolio's story. The browser demonstrations illustrate the concepts associated with the original work.

## 2. The visitor's journey

### Introduction

The opening establishes location and role, then presents technical breadth as one coherent theme. Actions let visitors explore the layers, jump to a demonstration, open the CV PDF or visit GitHub. A layered graphic makes the organising idea visible before the projects begin.

### Layer index and project tour

An index lists each layer with its projects and languages. Each following section introduces its subject in ordinary language before presenting the work. Project content normally pairs descriptive text with a screenshot or demonstration. A side rail tracks the layer currently being viewed on larger screens.

### Compact project table

The separate [Projects page](https://portfolio.felix.best/projects/) provides a shorter route through the same eleven items. Rows contain the layer, project summary, stack and available links. Language buttons filter rows and update the visible count in the browser. This complements the long visual tour.

### Background, contact and CV

The bottom of the home page provides a portrait, a brief personal background and direct contact/profile links. The [HTML CV page](https://portfolio.felix.best/cv/) clearly labels its narrative as originating in June 2024 and directs readers to a PDF labelled current. The PDF's contents were outside this review.

## 3. How the published website is built

The inspected pages deliver HTML containing the main descriptions, navigation, links and screenshots. CSS supplies layout and the visual system. JavaScript modules add interaction. The inspected pages do not require a React application to render their main content. The hosting provider and build/deployment process were not established by this review.

```text
HTML pages
  Home                  Introduction, layers, projects, background, contact
  /projects/            Filterable catalogue
  /cv/                  Dated CV narrative and PDF link

CSS
  site.css              Shared typography, colours, layout and components
  hero/instrument CSS   Layered display and instrument styling
  demo CSS              Individual interactive project layouts

Browser JavaScript
  main.js               Navigation, palette, lightbox, filters and lazy loading
  shell.js              Known commands, matching, completion and command planning
  instrument.js         Shared Run/Stop and visibility state
  hero/                 Layered WebGL graphic and trigger/capture behaviour
  demos/                Individual program demonstrations
  readouts.js           Browser and demo measurements
  trace.js              Visit trace and downloadable captures
  captures.js           Project-history graphics
```

This is a map of inspected files, not a complete repository tree. The main entry points are [main.js](https://portfolio.felix.best/assets/js/main.js) and [site.css](https://portfolio.felix.best/assets/css/site.css).

### Visual system

The design takes its cues from an oscilloscope or logic analyser: grid lines, signal traces, channel colours, readouts and small instrument controls. The backgrounds grow darker toward the lower layers. The five colours consistently identify Web, Apps, Algorithms, Systems and Metal.

Mona Sans supplies the main text and condensed display headings. Mona Sans Mono is used for code, values and instrument data. The logo is a stepped trace through the same five colours. This consistency explains why the design feels specific to the subject. These choices are visible in [site.css](https://portfolio.felix.best/assets/css/site.css).

### Layered hero graphic

The HTML includes an SVG representation of the stack. On suitable devices, the site lazily imports a Three.js implementation that draws the layers and traces in WebGL. Capability checks consider reduced motion, pointer type, memory/CPU hints and data-saving preferences. If the enhanced version cannot load, the SVG remains available.

Hovering and selecting layers connect the graphic to navigation. A shared trigger state begins the signal sweep after user activity or an automatic delay. Single and Auto controls change capture behaviour. This is implemented by [hero/stack.js](https://portfolio.felix.best/assets/js/hero/stack.js) and [hero/poweron.js](https://portfolio.felix.best/assets/js/hero/poweron.js).

### Scrolling, commands and direct navigation

Lenis supplies smooth scrolling when motion is enabled; GSAP and ScrollTrigger coordinate introductions and scroll effects. Native anchors remain the foundation of section navigation.

The Ctrl/Cmd+K command interface supports matching project names and known commands such as `ls`, `cd`, `open`, `run`, `cv` and `mail`. It parses those commands in browser JavaScript and maps them to navigation, output, clipboard or demo actions. Completion and history make it feel like a small shell. Other modules register extra commands, including measurement and project-history queries. See [shell.js](https://portfolio.felix.best/assets/js/shell.js).

The Run a demo action selects a demonstration, mounts it if needed, scrolls it into position and transfers focus when appropriate. The navigation code accounts for page-height changes as demonstrations load.

### Lazy demonstration loading

Each demo starts as a labelled HTML placeholder. `main.js` watches `.demo[data-demo]` elements with an IntersectionObserver and imports the corresponding module as it approaches the viewport. A command or direct demo action can also request mounting immediately. Each module exposes a `mount()` function that constructs its interactive view.

The portfolio contains five program demonstrations and an additional Advent of Code video calendar:

| Demonstration | What executes in the browser | Relationship to the original work |
| --- | --- | --- |
| Press-Ice | A JavaScript typing exercise with input handling and feedback. | A web recreation of the Python terminal game. |
| Aristotle's puzzle | A JavaScript backtracking solver with an interactive board. | Makes the algorithmic idea inspectable; the linked original project is C++. |
| FAT file system | An in-memory JavaScript allocator, commands and block visualisation. | A recreation of file-allocation behaviour associated with the C++ coursework. |
| Display controller | A JavaScript state simulation with display digits, input modes and traces. | Illustrates the ARM program's behaviour; visual timings are deliberately stretched. |
| TIS-style node | A JavaScript parser/interpreter for a bounded assembly-style node. | An interactive companion to the TIS-100 completion entry. |
| Advent calendar | Interactive doors that expose daily puzzle explanations and videos. | Organises the Python solutions and walkthroughs; the calendar is a media navigator. |

Sources: [typing.js](https://portfolio.felix.best/assets/js/demos/typing.js), [aristotle.js](https://portfolio.felix.best/assets/js/demos/aristotle.js), [fat.js](https://portfolio.felix.best/assets/js/demos/fat.js), [segment.js](https://portfolio.felix.best/assets/js/demos/segment.js), [tis.js](https://portfolio.felix.best/assets/js/demos/tis.js), [aoc.js](https://portfolio.felix.best/assets/js/demos/aoc.js).

The distinction between an original application and a browser recreation is useful. It lets a visitor understand non-web work without installing its original toolchain. It also keeps the evidence claim precise: a browser simulation demonstrates the concept, while original source or recordings establish what the original implementation does.

### Run/Stop and reduced motion

`instrument.js` maintains a shared state for modules that animate. Registered components receive start/stop callbacks. The preference is stored locally, and hidden tabs suspend registered activity. Reduced motion starts stopped unless a saved preference overrides that default. The visit trace keeps acquiring events while ambient motion is stopped. These are implementation provisions, not a complete accessibility certification. See [instrument.js](https://portfolio.felix.best/assets/js/instrument.js).

### Measurements, project history and visit trace

Three details extend the instrument theme into working features:

- **Readouts:** Code obtains page-load information, samples frame timing, runs the JavaScript solver/interpreter for local measurements and follows the FAT demo's state. These figures describe this browser session and demo code. They are not independent benchmarks of the original C++ or ARM projects.
- **Project captures:** A static JSON file supplies dates and commit counts used to draw weekly history traces. Hover/focus readouts expose their time spans. A project without public history gets an explicit empty state. The history data is a snapshot, while the footer separately requests the latest public portfolio commit from GitHub.
- **Visit trace:** The footer records the visible layer as five digital channels. Browser code can export a VCD file or image. The trace mechanism inspected here keeps its event list in the page and creates downloads locally; this is not a full privacy audit of every site resource.

Sources: [readouts.js](https://portfolio.felix.best/assets/js/readouts.js), [captures.js](https://portfolio.felix.best/assets/js/captures.js), [trace.js](https://portfolio.felix.best/assets/js/trace.js).

### Screenshots, video and fallbacks

Screenshot controls open a lightbox with a caption and restore focus when closed. Video frames are created after the visitor requests playback. Images specify dimensions and mostly use lazy loading. Static text and links remain in the HTML when a demo cannot run; the interactive functionality still requires JavaScript. Social metadata includes a preview image.

## 4. How he writes project descriptions

Most entries follow this sequence, with some variation:

1. Name the project and its technologies.
2. Explain what a person can do with it in plain language.
3. Select a few features or behaviours.
4. Offer evidence: screenshot, program demo, live site, repository or video.
5. Explain how to run it or why source is unavailable where relevant.

The introduction usually establishes the purpose before requiring the visitor to interpret the stack. Technical labels remain nearby for readers who want them. A screenshot caption then identifies the concrete screen or behaviour being shown.

The prose is relatively personal and direct. Small projects receive short descriptions; more visually distinctive work receives additional detail. Each project has an anchor on the home page, so a link can land on the relevant entry.

## 5. Project-by-project description analysis

The summaries below paraphrase what Felix's site presents. They do not establish the same implementation details for Karam's versions.

| Project | How the site explains it | Evidence and presentation | What is effective or missing |
| --- | --- | --- | --- |
| [June](https://portfolio.felix.best/#june) | Identifies the client and design discipline, then explains the portfolio's shader, colour library and implementation choices. | Screenshot and external live site; concrete visual behaviours and fallback provisions are listed. | The clearest connection between a real user's needs and a distinctive delivered interface. Outcomes beyond the visible site are not quantified. |
| [TimeToMove](https://portfolio.felix.best/#timetomove) | Introduces a self-hosted label-management application and highlights account, administration and upload/download features. | Dashboard screenshot and repository/write-up. | The purpose is clear. Security language would be stronger with named controls and their rationale. |
| [Eshop](https://portfolio.felix.best/#eshop) | Presents a shop application with browser and terminal entry points. | Product-table screenshot, startup filenames and an explicit private-source note. | Concrete and easy to understand. The text gives little database-design or decision-making detail. |
| [Fake-GPT](https://portfolio.felix.best/#fake-gpt) | Frames it as a Python conversational program and clarifies the name's relationship to GPT; identifies Marvin4 as the final version. | Terminal screenshot, source link and startup instruction. | Honest scope and a clear way to inspect it. Response-generation logic and technical challenges receive little explanation. |
| [Press-Ice](https://portfolio.felix.best/#press-ice) | Explains the typing exercise through speed, errors and difficulty. | Original terminal capture, source, walkthrough video and a playable browser recreation. | Strong combination of a concise description and immediate participation. |
| [School Management System](https://portfolio.felix.best/#school-management) | Explains a school-record application through its menu and file persistence. | Terminal screenshot and a private-repository note. | Straightforward purpose and visible evidence. Its data model and implementation decisions remain mostly unexplained. |
| [Aristotle's Puzzle Solver](https://portfolio.felix.best/#aristotle) | Explains the puzzle's goal, then presents the solver and its algorithmic emphasis. | Puzzle photograph, source/write-up and a board with animated search. | Visitors understand the problem and watch the search. Broad optimisation claims would benefit from a stated comparison or measurement. |
| [Advent of Code 2024](https://portfolio.felix.best/#advent-of-code) | Presents a complete collection of daily solutions accompanied by explanations. | Repository, video collection and an interactive calendar. | Makes sustained work and explanation easy to browse. The calendar organises evidence rather than executing each solution. |
| [Custom File System with FAT](https://portfolio.felix.best/#fat-file-system) | Describes allocation, block sizing and file operations as behaviour the visitor can inspect. | Browser block map/commands and an explicit coursework source-access note. | Makes a difficult-to-photograph systems project understandable through a labelled recreation. |
| [8-Segment Display Controller](https://portfolio.felix.best/#segment-display) | Describes a counter, user input and the difference between polling and interrupts. | Interactive display and logic traces; original coursework is marked unavailable publicly. | Turns a control-flow concept into something observable. Simulated timings must be understood in that context. |
| [TIS-100](https://portfolio.felix.best/#tis-100) | States completion of the programming puzzle game and offers a related execution model. | An editable, step-capable browser node. | Gives the completion entry technical substance. The companion node and completion claim are different kinds of evidence. |

## 6. The three projects Karam also completed

### Eshop

Felix keeps the explanation short and relies on a real product-table screenshot. Naming two launch paths makes the browser/terminal distinction concrete. Marking source access explicitly avoids presenting unavailable code as an ordinary public source action.

For Karam's write-up, collect his screenshot, language/database choice, personal scope and one interesting schema/query decision. Include web and terminal modes only if both belong to his implementation.

### Fake GPT

Felix uses a memorable name while clarifying scope and pointing visitors to the final version. The terminal screenshot shows that the program exists and can be used, but the description gives limited insight into its internals.

Karam has since supplied his code and confirmed the intended scope: Marvin is a fake AI interface using a character, scripted/menu-driven Python utilities, inventory commands and data queries. Describe that design positively and explain its implementation. Real AI integration was never a project goal and is not an improvement requirement. Its source-reviewed READMEs live in `extraPorjects/python-course`.

### 8-Segment Display Controller

Felix makes a hardware-oriented assignment accessible through input buttons, a mode switch and visible traces. The explanatory benefit is the connection between an action and the resulting execution behaviour. The simulation labels its relationship to the original ARM program.

Karam's version could use original board/emulator footage, code excerpts where shareable, or an independently built explanatory simulation. Document his actual language, environment and input modes. Polling/interrupt comparison belongs in his description only if it matches his work.

## 7. What Karam can use from this approach

- Organise work around a clear idea that matches his own experience: backend/full-stack delivery supported by systems knowledge.
- Pair each important claim with nearby evidence, including diagrams and traces for work without a public interface.
- Offer a quick catalogue alongside richer project explanations.
- Show one technical concept through a focused interaction.
- Explain source availability and distinguish simulations from original execution.
- Retain Karam's stronger descriptions of personal responsibilities, team attribution, testing and professional outcomes.

A suitable writing template for Karam is:

```markdown
## Project name

One or two sentences explaining the problem, users and what the software does.

### Contribution and collaboration
Explain how the work was shared. Describe joint work as joint work throughout;
where tasks were divided, identify my confirmed responsibilities and distinguish
them from the team's overall delivery and existing-system contributions.

### Technical decision
One meaningful constraint, the approach chosen and why.

### Result and evidence
Supported outcome, followed by a relevant screenshot, diagram, trace or link.

### Access and context
Coursework/client/personal context, collaborators, source availability and demo type.
```

Felix is particularly effective at making projects tangible. Karam can adopt that principle while making technical decisions and professional contributions easier to assess.

## 8. Inspection limits

Both home pages were inspected at desktop and phone sizes during the comparison. The display simulation was additionally checked with reduced motion: ArrowUp changed 00 to 01, and selecting Interrupt updated the mode. Other mechanisms in this document were inspected in source; their complete interaction paths were not exhaustively tested. No full accessibility, performance, security or hosting audit was performed.
