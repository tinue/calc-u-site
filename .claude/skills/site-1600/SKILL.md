---
name: site-1600
description: Use for any work on the Calc-U-1600 website in 1600/ (calc-u.org/1600/) — the home and play pages, the help built from the pinned help asset, the embedded Web frontend (1600/calc/), the build, checks and tests. Also when a Calc-U-1600 release is to be published on the site.
user-invocable: true
---

# Calc-U-1600 website (`1600/`)

The website of Calc-U-1600, the Sharp PC-1500 / PC-1500A / PC-1600
emulator. Its source, developer documentation and **help** are written in
the source repository tinue/Calc-U (`../Calc-U`, `products/calc-u-1600/`,
the shared help parts in `library/help/`); this folder publishes them.
Visual work: `site-1600-design`. The renderer shared with `/59/`:
`.help/README.md`.

## Workflow

```bash
(cd .help && npm ci)      # once: the renderer's dependencies
cd 1600
node .site/build.js       # after every change to .site/, site.css or the pins
node .site/check.js       # pins, pages, links and anchors, no third parties
tests/run-tests.sh        # Playwright: navigation, fonts, play, start, storage
```

A change is finished when it is rebuilt and the generated files are
committed with it. Push only when the user asks (pushing `main` publishes).

## The files

| Path | What it is |
|---|---|
| `pins.json` | The release this folder publishes: help asset and Web frontend of one tag. |
| `calc/`, `help-asset/` | Imported by `node ../.help/pins.js 1600`; never edited. |
| `.site/template.js` | Head, header, footer and the page around a help file. |
| `.site/pages.js` | The home and play pages, `HELP` (the help pages they link to), the download list. |
| `.site/build.js`, `.site/check.js` | The build and its check. |
| `site.css`, `fonts/`, `assets/` | The design (site-1600-design). |
| `play/play.js` | Mounts `CalcU1600` on `/play/`, sized to its box; `?model=` and `?preset=` are handed on. |
| `tests/` | Playwright. `__screenshots__/` holds the start screen of each model. |
| Generated | `index.html`, `play/index.html`, `help/`, `sitemap.xml`. |

## What is whose

- **The help is the release's, never written here.** A wrong sentence is
  fixed in the source repository and arrives with the next release; this
  site changes only how the help looks and is reached.
- **The home and play pages are the site's.** They link into the help
  through `HELP` in `.site/pages.js`; `check.js` fails on a link or anchor
  that leads nowhere. The help has no install chapter, so the downloads
  (exact asset links of the release) are on the home page, `#download`.

## Publishing a Calc-U-1600 release

On the branch `1600/<version>` (root `CLAUDE.md`, "Branches"):

1. `node ../.help/pins.js 1600 --pin calc-u-1600-v<version>` (never a `-pre`).
2. In `.site/template.js` and `.site/pages.js`: the release tag, the
   version in the release box, the download file names (the release's
   assets, `gh release view <tag> -R tinue/Calc-U`).
3. Build. A help file that moved breaks a `HELP` link: `check.js` names it.
4. Run the tests. When a release changes what a model shows after a
   start, the start test fails: look at the new picture in
   `tests/test-results/`, then `npx playwright test --update-snapshots`
   (in `tests/`) and commit the new reference.
5. Build, check, test, commit pins, assets and pages together.

## Rules

- **No third parties.** Fonts, React, Mermaid and the emulator come from
  calc-u.org; no analytics, no cookies. `check.js` enforces it.
- **Every internal URL starts with `/1600/`** (or `/`, `/59/` for the
  other sites).
- **The two Web frontends share an origin with `/59/`.** Their stores stay
  apart by name (IndexedDB `/persist` and `/persist-calc-u-59`, locks
  `calcu1600-storage` and `calcu59-storage`); `tests/tests/storage.spec.js`
  proves it with both open.
