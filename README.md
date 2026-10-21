# calc-u-site

Source of [calc-u.org](https://calc-u.org), the website for the Calc-U
emulators. Served by GitHub Pages straight from `main` (root).

- `/` — landing page
- `/59/` — Calc-U-59 (has a build step: see `59/.seo/README.md`)
- `/1600/` — Calc-U-1600 (Sharp PC-1500 / PC-1500A / PC-1600)

`robots.txt` and `404.html` live here at the root for all sites: search
engines and GitHub Pages only look for them here.

The Calc-U-59 site started as a copy of the `gh-pages` branch of the
Calc-U-59 repository, which still serves calcu59.ch until launch; until that
branch is retired, a page change made in one place has to be made in the
other. The playable calculator is not part of that: `59/calc/` is imported
from Calc-U-59's releases (`59/.seo/README.md`).

Working on it with Claude Code: `CLAUDE.md`, and the skills in
`.claude/skills/`.
