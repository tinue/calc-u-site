---
name: site-59
description: Use for any work on the Calc-U-59 website in 59/ (calc-u.org/59/) — the site pages (home, play, software) in Pages.jsx/components.jsx, the help built from the pinned help asset, the redirects of old addresses, the embedded Web frontend (59/calc/), the hosted example files, the build, checks and tests. Also when a Calc-U-59 release is to be published on the site.
user-invocable: true
---

# Calc-U-59 website (`59/`)

The website of Calc-U-59, a TI-59/TI-58/TI-58C emulator. Its source,
developer documentation and **help** are written in the source repository
tinue/Calc-U (`../Calc-U`, `products/calc-u-59/`, the shared help parts in
`library/help/`); this folder publishes them.

**Read `59/.seo/README.md` before changing anything under `59/`**: the
build, the `/59` base path, the pins, the help pages, the redirects,
serving locally. Put new build facts there. Visual work: `site-59-design`.
The renderer shared with `/1600/`: `.help/README.md`.

## Workflow

```bash
(cd .help && npm ci)      # once: the renderer's dependencies
cd 59
node .seo/build.js        # after every .jsx, CSS-in-template or pin change
node .seo/check.js        # ~1900 assertions; npm i --no-save jsdom adds the boot check
tests/run-tests.sh        # Playwright: navigation, redirects, fonts, the calculator
```

A change is finished when it is rebuilt and the generated files are
committed with it. Push only when the user asks (pushing `main` publishes).

## What is whose

- **The help is the release's, never written here.** `/59/help/` is built
  from `help-asset/Calc-U-59-help.zip`, the asset `pins.json` pins. A wrong
  sentence in the help is fixed in the source repository and arrives with
  the next release; this site changes only how the help looks
  (`help.css`, `.seo/help-page.js`) and is reached.
- **The site pages are the site's:** home, `/play/`, `/software/` and the
  articles (`Pages.jsx`, `routes.js`, `.seo/pages.js`). They link into the
  help through `HELP` in `Pages.jsx`; `check.js` fails on a link or an
  anchor that leads nowhere, and on a link to an address that only
  redirects.
- **Imported, never edited:** `calc/` (the Web frontend), `help-asset/`,
  `software-files/` (the examples of the pinned tag). `pins.js` installs
  them; `check.js` and CI fail on any difference.
- **Old addresses** of the hand-written help (2.3.0 and before) are
  redirects: `redirects.js` (paths) and `LEGACY_HASHES` in `routes.js`
  (`#hash` links). When a release renames a help file, its address changes:
  update `HELP`, the two tables and `START_CARDS`, then build and check.

## Publishing a Calc-U-59 release

On the branch `59/<version>` (root `CLAUDE.md`, "Branches"):

1. `node ../.help/pins.js 59 --pin calc-u-59-v<version>` — pins and installs
   the help asset, the Web frontend and the examples of that release tag
   (never a `-pre`).
2. Build. A help file that moved breaks a `HELP` link or a redirect:
   `check.js` names it; fix the tables, not the help.
3. If an example was added or removed, update its entry in `SoftwarePage`
   (`Pages.jsx`); `check.js` fails on a download link without its file.
4. Update the version in the home page's release box and `RELEASE`.
5. Build, check, test, commit pins, assets and pages together.

To try an unreleased Web frontend: `node ../.help/pins.js 59 --local-web <dist>`;
`check.js` fails until `node ../.help/pins.js 59` reinstalls the pin.

## Rules

- **No third parties.** Everything a page fetches comes from calc-u.org
  (fonts, React, Mermaid, the calculator); no analytics. `check.js`
  enforces it (`59/.seo/README.md` § "Self-hosted").
- **Every internal URL starts with `/59/`**; routes in `routes.js` and
  `.seo/pages.js` are site paths without it.
- **Generated:** `build/`, `help/`, every `index.html`, `sitemap.xml`.
  Rebuild them; edit their sources.
