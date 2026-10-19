---
name: site-59-design
description: Use this skill to generate well-branded interfaces and assets for Calc-U 59, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the help website of a TI-59 calculator emulator (59/ in this repository).
user-invocable: true
---

Read `59/README.md` (the design system), and explore the other files in `59/`.

The system is built around the **Calc-U 59 emulator app** for Mac, iPhone, and iPad (a TI Programmable 59 emulator). The visual DNA — pure-black OLED background, dark brown function keys with cream silkscreen, golden-yellow accent keys, cream number keys, mahogany display strip with a red LED — should appear in every artifact you produce. The canonical visual reference is `59/assets/app-screenshot.png`; brand mark is `59/assets/app-icon.png`.

**Scope:** this design system is for the EMULATOR APP, not the underlying 1977 calculator. Help-site copy should explain installing, syncing, modules, settings, file formats, the bottom toolbar — not how AOS arithmetic or registers work on real hardware.

Key files:
- `59/colors_and_type.css` — all color and typography tokens. Load this first; wrap your content in `<div class="calcu">`.
- `59/assets/app-screenshot.png` — canonical app screenshot; `59/assets/app-icon.png` — brand mark.
- `59/Pages.jsx` / `59/components.jsx` — the help website's sources. Copy components from here rather than reinventing. The `index.html` files are generated from them; see `59/.seo/README.md`.
- The playable calculator (`59/calc/`) is imported from Calc-U-59's web client and never edited here; its components live in that repository's `Web/src/`.
- `59/CREDITS.md` — every asset + its license. `59/fonts/` — self-hosting setup.
- `59/preview/` — small specimen cards demonstrating colors, type, spacing, components, brand.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (target page? help topic? availability strip? release notes?), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need. For throwaway artifacts, default to a single plain HTML file with no build step. The help site itself is different — it is prerendered from the `.jsx` sources by `node .seo/build.js` (in `59/`), so a `.jsx` edit is not finished until that has run.

Hard rules, do not break:
- No emoji.
- No icon libraries. The `<K>` keycap pill IS the icon system; one hand-drawn share glyph (`SymbolShare`, in the web client) covers the standalone app's install hint.
- Headings are uppercase Barlow Condensed with 0.06em tracking.
- Page background is pure `#000` (OLED black). No warm paper, no gradients.
- Accent is golden yellow `#F0C040` — not orange.
- Soft radii (6 / 7 / 10 px). No pills, no harsh squares.
- No bluish-purple gradients, no glassmorphism, no playful copy.
- Static HTML output, no Jekyll. The help site is prerendered by `node .seo/build.js`; run it after any `.jsx` edit.
- Nothing is fetched from a third party — fonts, React and the calculator are all served from `calc-u.org`. No CDN, no Google Fonts, and no analytics or telemetry, ever. `59/fonts/README.md` has the reasoning; `59/.seo/check.js` fails the build if it is broken.
