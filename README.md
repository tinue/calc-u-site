# calc-u-site

Source of [calc-u.org](https://calc-u.org), the website for the Calc-U
emulators. Served by GitHub Pages straight from `main` (root).

- `/` — landing page
- `/59/` — Calc-U-59 (has a build step: see `59/.seo/README.md`)
- `/1600/` — Calc-U-1600 (Sharp PC-1500 / PC-1500A / PC-1600)

`robots.txt` and `404.html` live here at the root for all sites: search
engines and GitHub Pages only look for them here.

While the site is under construction, `robots.txt` blocks everything and
the root pages carry a `noindex` meta tag. At launch, switch `robots.txt` to
the content in its comment and remove the `noindex` tags (not from
`404.html`).

The Calc-U-59 site is a copy of the `gh-pages` branch of the Calc-U-59
repository while the move is in progress; until that repository's `docs/`
is retired, a change made in one place has to be made in the other.
