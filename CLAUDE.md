# calc-u-site

The website for the Calc-U emulators, served by GitHub Pages from `main`
(repository root) at https://calc-u.org. One folder per site:

| Path | Site | Skill |
|---|---|---|
| `/` (root files) | Landing page, `404.html`, `robots.txt`, `CNAME`, `style.css` | — |
| `59/` | Calc-U-59 (TI-59 emulator) | `site-59`, `site-59-design` |
| `1600/` | Calc-U-1600 (Sharp PC-1500 / PC-1500A / PC-1600) | `site-1600`, `site-1600-design` |
| `.help/` | The renderer of the help asset, shared by the site folders | `.help/README.md` |

Invoke the site's skill before working in its folder.

Each site folder publishes one release of its product, named by the three
pins in `<folder>/pins.json`: the help asset, the Web frontend and the
examples, all of one release tag of tinue/Calc-U
(`node .help/pins.js <folder> --pin <tag>`). Its help pages are built from
that help asset; the site writes only its own pages (home, play, software)
and how the help looks.

## Branches

`main` is the published site: nothing is committed to it directly, it only
receives merges. All documentation work happens in one branch per site and
emulator release, named `<site folder>/<emulator version>`:

| Branch | Holds | Merged into `main` |
|---|---|---|
| `59/<current>`, e.g. `59/3.0.0` | Fixes and additions for the released Calc-U-59 version | Any time |
| `59/<next>`, e.g. `59/3.1.0` | Documentation of features not yet released | When Calc-U-59 tags `calc-u-59-v<next>` |
| `1600/<current>`, `1600/<next>` | The same for Calc-U-1600 | The same |

- The version is the emulator's own: the source repository tinue/calc-u
  tags each product's releases with its prefix (`calc-u-59-v3.0.0`,
  `calc-u-1600-v0.9.0`; `-pre` for a pre-release). Check its releases for
  which version is released.
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
- **The help is written in the source repository, never here.** The
  emulators, their help and their developer documentation are in
  tinue/Calc-U (`../Calc-U`): `products/calc-u-59/`,
  `products/calc-u-1600/`, the shared help in `library/help/`, the formats
  in `docs/formats/`, how the site takes a release in `docs/help-site.md`.
  A wrong sentence in a help page is fixed there and arrives with the next
  release.
- **What ships with a release is imported, never edited here:**
  `<folder>/calc/` (the Web frontend), `<folder>/help-asset/`, and
  `59/software-files/` (the examples). `node .help/pins.js <folder>`
  installs them; each folder's check and CI fail on any change.
- **`robots.txt` and `404.html` live at the root**, for all sites: search
  engines and GitHub Pages only look for them here.
- **Nothing is fetched from a third party** on any page — fonts, scripts,
  images and the calculator are all served from calc-u.org, and there are no
  analytics, cookies or embeds. Outbound `<a href>` links are fine.
- **Paths:** a site's pages use root-relative URLs that start with its
  folder (`/59/…`, `/1600/…`); the root pages link to `/59/` and `/1600/`.
- **Each folder's build gives the same bytes for the same sources and pins.**
  Commit what it makes; CI rebuilds and fails on a difference.
