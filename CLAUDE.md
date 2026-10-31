# calc-u-site

The website for the Calc-U emulators, served by GitHub Pages from `main`
(repository root) at https://calc-u.org. One folder per site:

| Path | Site | Skill |
|---|---|---|
| `/` (root files) | Landing page, `404.html`, `robots.txt`, `CNAME`, `style.css` | — |
| `59/` | Calc-U-59 (TI-59 emulator) — has a build step | `site-59`, `site-59-design` |
| `1600/` | Calc-U-1600 (Sharp PC-1500 / PC-1600) — placeholder | — |

Invoke the site's skill before working in its folder.

## Branches

`main` is the published site: nothing is committed to it directly, it only
receives merges. All documentation work happens in one branch per site and
emulator release, named `<site folder>/<emulator version>`:

| Branch | Holds | Merged into `main` |
|---|---|---|
| `59/<current>`, e.g. `59/2.1.0` | Fixes and additions for the released Calc-U-59 version | Any time |
| `59/<next>`, e.g. `59/2.2.0` | Documentation of features not yet released | When Calc-U-59 tags `v<next>` |
| `1600/<current>`, `1600/<next>` | The same for Calc-U-1600 | The same |

- The version is the emulator's own (Calc-U-59 tag `v2.2.0`, branch
  `dev-2.2.0`). Check the emulator repository for which version is released.
- A `59/…` branch changes only `59/` (and root files when needed); a `1600/…`
  branch only `1600/`.
- Create a branch only when there is work for it; at most four exist.
- On release day: merge the current-release branch, then the next-release
  branch into `main`, push, and delete the old current-release branch. The
  next-release branch becomes the current one, keeping its name; `59/<next+1>`
  starts when work on it begins.
- Keep the next-release branch up to date by merging the current-release
  branch into it.

## Rules

- **Pushing to `main` publishes the site.** Push only when the user asks, and
  only after the site's build, checks and tests pass.
  `.github/workflows/site.yml` re-checks every push to `main` but fixes
  nothing. Release branches may be pushed to `origin` at any time.
- **This repository holds the end-user documentation only.** The emulators'
  code and developer documentation stay in their own repositories
  (`../Calc-U-59`, `../../sharp/Calc-U-1600`).
- **Code that ships with an emulator is imported, never edited here.**
  `59/calc/` is Calc-U-59's web client, installed by
  `59/.seo/fetch-web-client.js` from a release asset; `check.js` fails on any
  change to it.
- **`robots.txt` and `404.html` live at the root**, for all sites: search
  engines and GitHub Pages only look for them here.
- **Nothing is fetched from a third party** on any page — fonts, scripts,
  images and the calculator are all served from calc-u.org, and there are no
  analytics, cookies or embeds. Outbound `<a href>` links are fine.
- **Paths:** a site's pages use root-relative URLs that start with its
  folder (`/59/…`); the root pages link to `/59/` and `/1600/`.
