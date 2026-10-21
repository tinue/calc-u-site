# calc-u-site

The website for the Calc-U emulators, served by GitHub Pages from `main`
(repository root) at https://calc-u.org. One folder per site:

| Path | Site | Skill |
|---|---|---|
| `/` (root files) | Landing page, `404.html`, `robots.txt`, `CNAME`, `style.css` | — |
| `59/` | Calc-U-59 (TI-59 emulator) — has a build step | `site-59`, `site-59-design` |
| `1600/` | Calc-U-1600 (Sharp PC-1500 / PC-1600) — placeholder | — |

Invoke the site's skill before working in its folder.

## Rules

- **Pushing to `main` publishes the site.** Commit freely; push only when the
  user asks, and only after the site's build, checks and tests pass.
  `.github/workflows/site.yml` re-checks every push but fixes nothing.
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
