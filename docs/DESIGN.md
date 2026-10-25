# Portfolio design direction

Audience: recruiters and engineers considering Karam for backend and full-stack roles. The interface should make real contributions easy to find, read and discuss.

## Identity and visual system

- Use **Karam Matar** as the wordmark, matching the actual name in the portfolio data.
- Use **Manrope** for headings and body text. A single family, clear weight changes and comfortable line lengths establish hierarchy.
- Light palette: porcelain `#f5f6f2`, white `#ffffff`, ink `#182f35`, teal `#155e63`, slate `#53686d`, pale green `#e6eeea`.
- Dark palette: deep ink `#101e24`, surface `#182b32`, off-white `#e5eeea`, mint `#a4d8bc`.
- Warm accent approved for the existing palette: burnt orange `#a44723` in light mode and peach `#efa979` in dark mode. Use it for the primary email/contact actions, selected navigation and the small recent-experience rule. Teal/mint remains the ordinary link and focus colour; keep backgrounds, body text, typography and dimensions unchanged. Avoid recolouring whole sections or parts of the name.
- Use an asymmetric introduction with a recent-experience index on larger screens. The index links to the actual experience entries and is omitted on small screens to avoid repetition.
- Experience and skills use open rows. Rounded surfaces group project imagery, documents and recommendations, where they communicate a distinct item.
- Keep primary navigation focused. On desktop, a **More** disclosure exposes Education, Documents and Skills at the top of the page; the compact menu and footer also retain those links. The disclosure supports keyboard focus, Escape, outside-click dismissal and closing at the desktop/mobile breakpoint.
- On phones, tighten the introduction's vertical spacing and the transition into Experience. Retain the complete introduction, readable body type and 44px minimum interaction targets. Preserve the desktop introduction's dimensions.
- Render content immediately. Reserve motion for interaction feedback and respect reduced-motion preferences.

## Content and media constraints

The verified text in `public/data/portfolio.json` remains authoritative. Preserve career dates, team/individual attribution, original project images, intentional placeholders, document files and the downloadable CV. Never manufacture project screenshots or testimonials. Reference contacts remain private; the public section shows existing recommendation letters and the request link.

This pass applies [Anthropic's Frontend Design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design) to the existing portfolio. It does not request new career copy, additional case studies or a framework migration.

## Inspection

Use a production export for performance measurements. The development server includes tooling overhead and is not a representative Lighthouse target. See [LIGHTHOUSE.md](./LIGHTHOUSE.md) for commands and reports.

The [portfolio UI/UX comparison](./PORTFOLIO_UI_REVIEW.md) records the external references reviewed for the warm-accent pass and the differences in their audiences and navigation.
