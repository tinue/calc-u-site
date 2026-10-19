---
name: site-59
description: Use this skill for any work on the Calc-U-59 website in 59/ (served at calc-u.org/59/) — page content in Pages.jsx/components.jsx, routes, the static build and checks, the embedded web calculator (59/calc/, /play/), the downloadable software files, and the site tests. Also use it when a Calc-U-59 release needs the website updated (new web client, changed features, new examples).
user-invocable: true
---

# Calc-U-59 website (`59/`)

The user documentation for Calc-U-59, a TI-59/TI-58/TI-58C emulator for
macOS, iOS, iPadOS, Windows and Linux. The emulator's code and developer
documentation live in the Calc-U-59 repository (`../Calc-U-59`).

**Read `59/.seo/README.md` before changing anything under `59/`.** It is the
reference for the build, the `/59` base path, the web client import, the
URL map, how to add a page, serving locally, and the deliberate oddities.
Put new build facts there, not here. Visual and brand work: the
`site-59-design` skill.

## Workflow

```bash
cd 59
node .seo/build.js       # after every .jsx edit — otherwise the pages show the old text
node .seo/check.js       # 1100+ assertions; npm i --no-save jsdom adds the boot check
tests/run-tests.sh       # Playwright: navigation, fonts, the embedded calculator
```

A `.jsx` change is finished when it is rebuilt and the generated files are
committed with it. Push only when the user asks (pushing publishes).

## Documentation policy

- **This site is the only place for end-user documentation** — installing,
  operating, syncing, modules, settings, presets, the debugger from a user's
  point of view.
- **Developer documentation stays in Calc-U-59** (`reference/`, `README.md`,
  `CHANGELOG.md`). Technical facts a user doesn't need — the `.ti59` grammar,
  the CUECARD grammar, the debug API — live there; the site mentions that
  they exist and links to GitHub.
- **Copy scope:** the app (installing, syncing, modules, settings, file
  formats, the toolbar), not TI-59 hardware or AOS arithmetic. **One
  exception: `/what-is-a-ti-59/`** (`AboutTi59Page`) is deliberately about
  the hardware — people search for the machine, not the app, so it and
  `/play/` are the cold-search entry points. Don't delete it as scope creep,
  and don't treat it as licence for hardware writing elsewhere.

## The calculator is imported (`59/calc/`)

`/play/` and the installable app `/59/calc/app/` are Calc-U-59's web client
(`Web/` there; its contract is `reference/WebClient.md`), built by its CI and
attached to each release as `Calc-U-59-web.zip`.

- **Never edit `59/calc/`.** A calculator change is made in Calc-U-59
  (`calc-u-59-web` skill there) and arrives with its next build.
- **Updating it:** `node .seo/fetch-web-client.js --pin <url of Calc-U-59-web.zip>`,
  then build, check, test, and commit `calc/`, `web-client.json` and the
  rebuilt pages in one commit. Until the first real release the asset is
  the pre-release `v2.0.0-pre`; a re-uploaded pre-release asset fails the
  sha256 check — re-pin it if the new build is intended.
- **Testing an unreleased client:**
  `node .seo/fetch-web-client.js --local ../../Calc-U-59/Web/dist` (build it
  there first). `check.js` then fails on purpose until the pinned build is
  reinstalled with `node .seo/fetch-web-client.js` — never commit a local
  build.
- The site only sizes it: `PlayPage` in `Pages.jsx` passes `scale` and
  `keyboard`. Its styles come with it (`calc/calc.css`, tokens scoped to
  `.calcu-client`); don't restyle it from the site's CSS.

## `/software/` needs a sync check

`59/software-files/` holds hand-copied `.ti59`/`.ti58`/`.ti58c`/`.asm` files
from Calc-U-59's `examples/`, self-hosted so the `download` links work.
Nothing syncs them. When a Calc-U-59 session added examples, or whenever
you're here anyway, diff the two:

```bash
comm -23 <(cd ../Calc-U-59/examples && find . -maxdepth 2 \( -name '*.ti59' -o -name '*.ti58' -o -name '*.ti58c' -o -name '*.asm' \) ! -path './debug/*' ! -path './screentest/*' | sed 's|^\./||' | sort) \
         <(cd 59/software-files && find . -type f | sed 's|^\./||' | sort)
```

Anything listed is missing here: copy it, add it to the matching category in
`SoftwarePage` (`Pages.jsx`), rebuild. `examples/debug/` and
`examples/screentest/` are test fixtures and stay off the site. The
`tutorial-files/` are the preset tutorial's own steps, not examples.

## After a Calc-U-59 release

1. Pin the release's `Calc-U-59-web.zip` (above).
2. Read the release's `CHANGELOG.md` entry in Calc-U-59 and update the pages
   for anything user-facing: settings, modules, install steps (Mac, iOS,
   Windows, Linux), preset directives (mention them, link to
   `reference/StateFileFormat.md` for the grammar).
3. Run the software sync check.
4. Build, check, test, commit.

## Rules

- **No third parties.** Everything a page fetches comes from calc-u.org: no
  CDN, no Google Fonts, no embeds, no analytics or telemetry. `check.js`
  enforces it structurally (`59/.seo/README.md` § "Self-hosted"); the
  reasoning is `59/fonts/README.md`. The privacy policy (Calc-U-59
  `PRIVACY.md`, linked from the footer) promises exactly this.
- **Every internal URL starts with `/59/`** in the page text; routes in
  `routes.js` and `.seo/pages.js` are site paths without it. `check.js`
  fails on a missing prefix.
- **Generated, never edit by hand:** `build/`, every `index.html`,
  `sitemap.xml`.
- **Cite sources** for hardware facts with an https link (on
  `/what-is-a-ti-59/` especially).
