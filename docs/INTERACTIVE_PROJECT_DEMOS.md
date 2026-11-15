# Interactive project demos

**Historical initial implementation:** The adapted Showcase preview and ARM simulation described below are retired. Showcase now uses its original UI/data; ARM runs the original binary in native CPUlator. Python/FAT original-code demos and local Eshop are also implemented. See [current implementation](./ORIGINAL_PROJECT_DEMO_ROADMAP.md) and [Showcase repair](./AUTHENTIC_PROJECT_DEMOS.md). Compiler remains a genuine recorded-output walkthrough.

Local implementation, 15 November 2026. Scope: a compiler walkthrough, ARM controller simulation and a working ShowcaseSERL browsing/kiosk preview. Existing project descriptions, galleries, CV and professional attribution are retained. No publishing or source-visibility change is part of this pass.

## Design before implementation

- **Colour:** retain porcelain `#f5f6f2`, white `#ffffff`, ink `#182f35`, teal `#155e63`, slate `#53686d` and orange `#a44723`, with the existing dark theme variables.
- **Type:** retain Manrope. Use monospace only for source, generated code and register values.
- **Layout:** project launchers open a wide dialog; each also has a static, shareable demo page. Content is left aligned. The compiler pairs source with its selected generated stage; ARM pairs one display with its two input paths; Showcase pairs catalogue controls with details or a kiosk view.

```text
Projects → Compiler walkthrough / ARM controller / ShowcaseSERL

Compiler:  choose example → six pipeline stages → source | real artifact
ARM:       display + counter | UART + push buttons → recent event path
Showcase:  search + filters → catalogue → details / kiosk → pause and advance
```

Review against the brief: retain the site's typography and palette rather than add a separate decorative instrument theme. Stage numbers represent the actual compiler walkthrough sequence. ARM has no invented CPU-load/timing figures or polling/interrupt mode switch. Showcase uses clearly labelled fictional catalogue records to demonstrate the real browsing/kiosk workflow; the original JSON includes incomplete and mismatched test records and is not suitable as recruiter-facing content.

## Evidence and boundaries

- Compiler recordings come from the fresh local source build already documented in the source README. Inputs, generated SVG/DOT/IR/bytecode and interpreter output are preserved. This walkthrough explores recorded outputs; it does not compile arbitrary visitor input.
- ARM is a browser simulation derived from `ARMv7/assignment/currentCode.s`, including its actual segment masks, modulo-16 counter, UART `u`/`d` dispatch and KEY0/KEY1 handling. Original execution evidence remains in the CPUlator gallery.
- ShowcaseSERL's old public URL served a Jekyll rendering of its README, not its Next.js application. The new portfolio-hosted demo implements search, type/tag filtering, sorting, detail views and a pausable kiosk around sample records. It is an adapted interactive preview, not a claim that the original standalone deployment has been repaired.
- Reviewed ShowcaseSERL source at `596e7430782f0cacd6b2043dcd2fdcd032a565c1`, especially `Container.tsx`, `KioskPage.tsx`, the detail route, `research.json` and `next.config.mjs`. [Original repository](https://github.com/KarmaSora/showcaseSERL).

## Implemented behaviour

- Launchers below Projects and a link from the introduction make the demos easy to find. Project cards have their own demo actions. Existing screenshot galleries remain available.
- Static pages at `/demos/compiler/`, `/demos/arm/` and `/demos/showcase/` also work directly, including the production `/Portfolio` prefix.
- Compiler offers three verified programs, six selectable stages, diagram zoom/downloads, exact IR/bytecode listings and interpreter traces. Eighteen original generated files have a SHA-256 provenance manifest under `public/demos/compiler/`.
- ARM uses the original 16 display masks, both counter directions and wraparound. Unknown UART characters are ignored. Event records show which source-code path each input follows. A compact phone display and an outcome beside the inputs keep feedback visible.
- Showcase combines search with research-type/topic filters and date/title sorting. Detail views preserve the catalogue state and restore focus. Kiosk mode starts paused, supports manual navigation and explicit play/pause with a selectable interval, and avoids advancing while the document is hidden. Its sample records are clearly fictional.
- Demo modules load on demand. The existing static-export hosting configuration and dependencies are unchanged.

## Validation

Production export, lint and TypeScript checks passed. Browser checks at 1440 px and 390 px covered all three compiler recordings and all six stages, six diagram loads/zoom controls, matching IR/bytecode, all 16 ARM masks, both wraps, UART/KEY0/KEY1 and ignored characters, combined Showcase filters, sorting, empty states, details/focus restoration, and kiosk navigation plus actual play/pause timing. All 18 served compiler artifacts matched their recorded hashes. Existing compiler screenshot-gallery navigation still passed. All three static routes loaded directly; 320 px and reduced-motion checks confirmed no horizontal overflow and paused-by-default kiosk controls. No browser JavaScript errors or failed local asset responses were observed.

The mobile ARM layout received a subsequent targeted visual/interaction check after the first functional pass. Builds and browser previews use an isolated temporary copy so they do not disturb another development preview. Source application code in the sibling project repositories is unchanged. Nothing in this portfolio pass is committed, pushed or deployed.
