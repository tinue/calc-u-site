# calc-u-site

Source of [calc-u.org](https://calc-u.org), the website for the Calc-U
emulators. Served by GitHub Pages straight from `main` (root).

- `/` — landing page
- `/59/` — Calc-U-59 (TI-59, TI-58, TI-58C): `59/.seo/README.md`
- `/1600/` — Calc-U-1600 (Sharp PC-1500, PC-1500A, PC-1600): `1600/.site/build.js`

Each folder publishes one release of its product from the source
repository [tinue/Calc-U](https://github.com/tinue/Calc-U), pinned in
`<folder>/pins.json`: the help asset (the help pages are built from it by
the shared renderer in `.help/`), the Web frontend (`/play/` and the
installable app in `<folder>/calc/app/`) and, for Calc-U-59, the example
files. Nothing on the site is fetched from another host.

`robots.txt` and `404.html` live here at the root for all sites: search
engines and GitHub Pages only look for them here.

Working on it with Claude Code: `CLAUDE.md`, and the skills in
`.claude/skills/`.
