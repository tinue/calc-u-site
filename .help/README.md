# `.help/` — the help asset, rendered for calc-u.org

Shared by the site folders (`/59/`, `/1600/`). The help of each product is
written in the source repository tinue/Calc-U and released as
`<Product>-help.zip` (format: `docs/formats/help.md` there). This folder
turns a pinned asset into the folder's help pages; nothing here edits the
help. How the site takes a release: `docs/help-site.md` of the source
repository.

```bash
npm ci       # markdown-it and mermaid, pinned in package-lock.json
npm test     # the renderer on the test asset (tests/README.md)
```

## Files

| File | What it does |
|---|---|
| `pins.js` | A folder's three pins (`<folder>/pins.json`): install, `--pin <tag>`, `--local-web <dir>`, `--verify`. Run `node .help/pins.js` without arguments for the usage. |
| `render.js` | `buildHelp(config)`: the asset → `<folder>/help/`. |
| `redirects.js` | `writeRedirects()`: small pages for addresses a folder no longer has. |
| `zip.js`, `slug.js` | Reading the zip; heading anchors by GitHub's rule. |
| `tests/` | The test asset, the anchor cases, `render.test.js`. |

## `pins.json`

```json
{ "product":  "Calc-U-59",
  "release":  "calc-u-59-v3.0.0",
  "help":     { "url": "…/calc-u-59-v3.0.0/Calc-U-59-help.zip", "sha256": "…", "version": "3.0.0" },
  "web":      { "url": "…/calc-u-59-v3.0.0/Calc-U-59-web.zip",  "sha256": "…", "version": "3.0.0", "commit": "…" },
  "examples": { "tag": "calc-u-59-v3.0.0", "from": "products/calc-u-59/examples", "to": "software-files", "exclude": ["debug/"] } }
```

`--pin <tag>` writes it from a release tag (never a `-pre`). Installing puts
the help zip in `<folder>/help-asset/`, the Web frontend in
`<folder>/calc/` (as a whole; it must match its `MANIFEST.json`), and,
when `examples.from` is set, the tag's example files in
`<folder>/<examples.to>/`. `--verify` (run by each folder's check)
fails when what is in the folder is not what is pinned, or when the three
pins are not of one release.

## What `buildHelp` makes

- **One page per help file.** A chapter's first file is at
  `/<folder>/help/<NN>-<chapter title>/`, each further one at
  `…/<file name without NN->/`; `/<folder>/help/` is the contents. A chapter
  without files for the product gets no page. The page title is the file's
  `#` heading; the description its first paragraphs.
- **The Markdown** (CommonMark, GitHub tables): headings get GitHub's
  anchors; raw HTML other than `<br>` is shown as text; fenced code gets
  the folder's `codeClass`, tables its `tableClass` in a `boxClass`
  scroller; `mermaid` blocks are drawn in the browser by Mermaid, served
  from `/<folder>/help/vendor/`, coloured by the folder's `diagrams`
  (Mermaid `themeVariables`). Drawn in the browser because an SVG drawn at
  build time differs between machines by their fonts, and the build must
  give the same bytes everywhere.
- **Links:** a relative link to a help file becomes its page (and anchor),
  `chapter:<n>` the first product file of chapter n, a picture or download
  its copy under `/<folder>/help/images/` or `downloads/`,
  `https://calc-u.org/…` a link inside the site. A link or anchor that
  leads nowhere, or a `toc.json` entry not in the zip, fails the build and
  is named. `chapter:` links and source paths (`../../../library/help/…`)
  the help tool left unrewritten are resolved with a warning.
- **The page around it** is the folder's: `config.page(ctx)` and
  `config.index(ctx)` return the whole HTML (header, chapter rail,
  breadcrumb, previous/next). `ctx` holds the chapters, the page, its
  neighbours, the asset's name and version, and `script`, the page's one
  script (the menu button, the diagrams).

The output depends only on the asset, this folder's pinned packages and the
folder's configuration: CI rebuilds and fails on any difference.
