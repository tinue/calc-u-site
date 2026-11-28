// Calc-U-1600 — the frame of every page: head, header (the display band),
// footer, and the page around a help file. The design is the canvas
// "Calc-U-1600 Hilfeseite – Design-Vorschau" (site-1600-design skill);
// styles in site.css.

const { esc, ORIGIN } = require("../../.help/render.js");

const BASE = "/1600";
const RELEASE_TAG = "calc-u-1600-v0.9.0";
const RELEASE = `https://github.com/tinue/Calc-U/releases/tag/${RELEASE_TAG}`;
const SOURCE = "https://github.com/tinue/Calc-U/tree/main/products/calc-u-1600";

function head({ title, description, path, extra = "", noindex = false }) {
  const canonical = ORIGIN + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ""}<meta property="og:type" content="website">
<meta property="og:site_name" content="Calc-U-1600">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${ORIGIN}${BASE}/assets/icon.png">
<meta name="twitter:card" content="summary">
<link rel="icon" type="image/png" href="${BASE}/assets/icon.png">
<link rel="apple-touch-icon" href="${BASE}/assets/icon.png">
<meta name="theme-color" content="#443a31">
<link rel="stylesheet" href="${BASE}/site.css">
${extra}</head>`;
}

const NAV = [
  { id: "home", label: "Home", href: `${BASE}/` },
  { id: "help", label: "Help", href: `${BASE}/help/` },
  { id: "play", label: "Play", href: `${BASE}/play/` },
  { id: "github", label: "GitHub", href: SOURCE },
];

function header(active) {
  return `<header class="hdr">
<div class="hdr-in">
<a class="brand" href="${BASE}/"><img src="${BASE}/assets/icon.png" alt="" width="40" height="40"><span class="wm"><span class="wm-top">Calc-U <em>1600</em></span><span class="wm-sub">Pocket computer emulator</span></span></a>
<nav class="nav" aria-label="Main">
${NAV.map((n) => `<a href="${n.href}"${n.id === active ? ' class="on" aria-current="page"' : ""}>${n.label}</a>`).join("\n")}
</nav>
${active === "play" ? "" : `<a class="btn primary" href="${BASE}/play/">Play in browser</a>`}
</div>
</header>`;
}

function footer(where) {
  return `<footer class="ftr">
<div class="ftr-in">
<a href="/">Calc-U</a><a href="/59/">Calc-U-59</a><a href="${BASE}/help/">Help</a><a href="${BASE}/calc/app/">Install the web app</a><a href="${RELEASE}">Release notes</a><a href="${SOURCE}">GitHub</a>
<span class="where">${esc(where)}</span>
<p class="disc">Sharp, PC-1500, PC-1500A and PC-1600 are names of their owners. Calc-U-1600 is an independent emulator and not affiliated with Sharp. This site loads nothing from another site and sets no cookies.</p>
</div>
</footer>`;
}

/* ---- the help pages (.help/render.js calls these) --------------------- */

const pill = (n, on) => `<span class="k ${on ? "org" : "gry"}">${n}</span>`;

function sidebar(ctx, current) {
  const items = ctx.chapters.map((ch) => {
    const open = current && ch === current.chapter;
    const parts = open && ch.parts.length > 1
      ? `<ul class="help-parts">${ch.parts.map((p) =>
          `<li><a href="${p.url}"${p === current ? ' aria-current="page"' : ""}>${esc(p.title)}</a></li>`).join("")}</ul>`
      : "";
    const self = open && current === ch.parts[0] ? ' aria-current="page"' : "";
    return `<li class="${open ? "open" : ""}"><a class="help-chapter" href="${ch.url}"${self}>${pill(ch.number, open)}<span>${esc(ch.title)}</span></a>${parts}</li>`;
  }).join("\n");
  return `<nav class="help-nav" aria-label="Help chapters">
<p class="eyebrow"><a href="${ctx.helpBase}">Help</a> · ${esc(ctx.version)}</p>
<ol>
${items}
</ol>
</nav>`;
}

const built = (ctx) => `Help built from ${ctx.asset} ${ctx.version}`;

function helpPage(ctx) {
  const p = ctx.page;
  const ch = p.chapter;
  const long = `${p.title} — Calc-U-1600 help`;
  const crumb = `<p class="help-crumb"><a href="${BASE}/">Calc-U-1600</a> <span aria-hidden="true">›</span> <a href="${ctx.helpBase}">Help</a> <span aria-hidden="true">›</span> ${p === ch.parts[0] ? `${ch.number} ${esc(ch.title)}` : `<a href="${ch.url}">${ch.number} ${esc(ch.title)}</a> <span aria-hidden="true">›</span> ${esc(p.title)}`}</p>`;
  const step = (q, dir) => q
    ? `<a class="btn ${dir === "next" ? "dark" : "grey"}" rel="${dir}" href="${q.url}">${dir === "prev" ? "← " : ""}${q.chapter.number} · ${esc(q.title)}${dir === "next" ? " →" : ""}</a>`
    : "<span></span>";
  return `${head({ title: long.length <= 75 ? long : p.title, description: p.description, path: p.url })}
<body>
${header("help")}
<main class="wrap help-layout">
${sidebar(ctx, p)}
<article class="help-article">
${crumb}
<p class="eyebrow">Chapter ${ch.number} · ${esc(ch.title)}</p>
${p.html}
<nav class="help-steps" aria-label="Previous and next">${step(ctx.prev, "prev")}${step(ctx.next, "next")}</nav>
<p class="help-built">${built(ctx)}, the help of the <a href="${RELEASE}">Calc-U-1600 ${esc(ctx.version)} release</a>.</p>
</article>
</main>
${footer(built(ctx))}
<script src="${ctx.script}" defer></script>
</body>
</html>
`;
}

function helpIndex(ctx) {
  const list = ctx.chapters.map((ch) => `<li><h2><a href="${ch.url}">${pill(ch.number, false)} ${esc(ch.title)}</a></h2>
<ul>${ch.parts.map((p) => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join("")}</ul></li>`).join("\n");
  return `${head({
    title: "Calc-U-1600 help — every chapter",
    description: "The Calc-U-1600 help: the window and the menus, the models, memory modules and disks, plotters, presets, the debugger, the settings, BASIC and machine code.",
    path: ctx.helpBase,
  })}
<body>
${header("help")}
<main class="wrap help-layout">
${sidebar(ctx, null)}
<article class="help-article">
<p class="eyebrow">Help · ${esc(ctx.version)}</p>
<h1>Calc-U-1600 help</h1>
<p class="lede">How to use Calc-U-1600 on macOS, Linux and Windows, and in the browser. Ten chapters: most begin with what every Calc-U emulator does alike and go on with what belongs to the PC-1500, PC-1500A and PC-1600.</p>
<ol class="help-index">
${list}
</ol>
<p class="help-built">${built(ctx)}, the help of the <a href="${RELEASE}">Calc-U-1600 ${esc(ctx.version)} release</a>.</p>
</article>
</main>
${footer(built(ctx))}
<script src="${ctx.script}" defer></script>
</body>
</html>
`;
}

module.exports = { BASE, RELEASE, RELEASE_TAG, SOURCE, head, header, footer, helpPage, helpIndex, esc };
