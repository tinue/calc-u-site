// Calc-U 59 — the page around one help file (.help/render.js calls it).
//
// The header and footer are the site's own components (SiteHeader,
// SiteFooter in components.jsx), rendered by build.js and handed in as
// HTML, so the help pages and the React pages share them. The help pages
// themselves load no React: help.js is their only script (the menu button
// and the diagrams). Styles: colors_and_type.css, styles.css, help.css.

const { esc } = require("../../.help/render.js");

const pill = (n, on) => `<span class="k ${on ? "yellow" : "dark"}">${n}</span>`;

function head({ title, description, canonical, base, extra = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Calc-U 59">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="https://calc-u.org${base}/assets/app-icon.png">
<meta name="twitter:card" content="summary">
<link rel="icon" type="image/png" href="${base}/assets/app-icon.png">
<link rel="apple-touch-icon" href="${base}/assets/app-icon.png">
<meta name="theme-color" content="#000000">
<link rel="stylesheet" href="${base}/colors_and_type.css">
<link rel="stylesheet" href="${base}/styles.css">
<link rel="stylesheet" href="${base}/help.css">
${extra}</head>`;
}

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

function footerLine(ctx) {
  return `<p class="help-built">Help built from ${esc(ctx.asset)} ${esc(ctx.version)}, the help of the <a href="https://github.com/tinue/Calc-U/releases/tag/calc-u-59-v${esc(ctx.version)}">Calc-U-59 ${esc(ctx.version)} release</a>.</p>`;
}

// header, footer: HTML strings.
module.exports = function make59Help({ header, footer }) {
  function page(ctx) {
    const p = ctx.page;
    const ch = p.chapter;
    const title = `${p.title} — Calc-U 59 help`.length <= 75 ? `${p.title} — Calc-U 59 help` : p.title;
    const crumb = `<p class="help-crumb"><a href="${ctx.base}/">Calc-U 59</a> <span aria-hidden="true">›</span> <a href="${ctx.helpBase}">Help</a> <span aria-hidden="true">›</span> ${p === ch.parts[0] ? `${ch.number} ${esc(ch.title)}` : `<a href="${ch.url}">${ch.number} ${esc(ch.title)}</a> <span aria-hidden="true">›</span> ${esc(p.title)}`}</p>`;
    const step = (q, dir) => q
      ? `<a class="btn ${dir === "next" ? "primary" : "secondary"}" rel="${dir}" href="${q.url}">${dir === "prev" ? "← " : ""}${q.chapter.number} · ${esc(q.title)}${dir === "next" ? " →" : ""}</a>`
      : "<span></span>";
    return `${head({ title, description: p.description, canonical: ctx.origin + p.url, base: ctx.base })}
<body>
${header}
<main class="wrap help-layout">
${sidebar(ctx, p)}
<article class="help-article prose">
${crumb}
<p class="eyebrow">Chapter ${ch.number} · ${esc(ch.title)}</p>
${p.html}
<nav class="help-steps" aria-label="Previous and next">${step(ctx.prev, "prev")}${step(ctx.next, "next")}</nav>
${footerLine(ctx)}
</article>
</main>
${footer}
<script src="${ctx.script}" defer></script>
</body>
</html>
`;
  }

  function index(ctx) {
    const list = ctx.chapters.map((ch) => `<li><h2 class="sub"><a href="${ch.url}">${pill(ch.number, false)} ${esc(ch.title)}</a></h2>
<ul>${ch.parts.map((p) => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join("")}</ul></li>`).join("\n");
    const description = "The Calc-U-59 help: installing, the window and the menus, cards, the printer, presets, the debugger, the settings, the modules and the file formats.";
    return `${head({ title: "Calc-U 59 help — every chapter", description, canonical: ctx.origin + ctx.helpBase, base: ctx.base })}
<body>
${header}
<main class="wrap help-layout">
${sidebar(ctx, null)}
<article class="help-article prose">
<p class="eyebrow">Help · ${esc(ctx.version)}</p>
<h1>Calc-U 59 help</h1>
<p class="lede">How to install Calc-U-59 and use it on the Mac, Windows, Linux, the iPhone and the iPad, and in the browser. Ten chapters: most begin with what every Calc-U emulator does alike and go on with what belongs to the TI-59, TI-58 and TI-58C.</p>
<ol class="help-index">
${list}
</ol>
${footerLine(ctx)}
</article>
</main>
${footer}
<script src="${ctx.script}" defer></script>
</body>
</html>
`;
  }

  return { page, index };
};
