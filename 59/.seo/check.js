#!/usr/bin/env node
//
// Calc-U 59 — post-build check.
//
//   node .seo/check.js
//
// Verifies the things that silently rot: that the folder holds exactly the
// pinned release (help asset, Web frontend), that every route produced a
// file, that each file carries the head tags search engines need, that
// the prerendered markup is real text rather than an empty root, that
// internal links all resolve to a built page, and that the compiled
// bundle actually boots and renders the same page in a DOM.
//
// The last check needs jsdom, which is not vendored. Without it the
// static checks still run and the boot check reports as skipped:
//
//   npm install --no-save jsdom && node .seo/check.js

const fs = require("fs");
const path = require("path");

const SEO = __dirname;
const DOCS = path.join(SEO, "..");
const { ROUTES, ORIGIN, BASE, url, normalizePath, LEGACY_HASHES } = require(path.join(DOCS, "routes.js"));
const { REDIRECTS } = require(path.join(DOCS, "redirects.js"));
const PINS = require(path.join(DOCS, "..", ".help", "pins.js"));
const CLIENT_DIR = path.join(DOCS, "calc");

// The site lives under BASE ("/59"), so every root-relative URL it names
// must start with BASE + "/". Addresses → site paths and files on disk:
const underBase = (u) => u.startsWith(BASE + "/");
const sitePath = (u) => u.slice(BASE.length);
const diskPath = (u) => path.join(DOCS, u.slice(BASE.length + 1));

let failures = 0;
let checks = 0;
function ok(cond, msg) {
  checks++;
  if (!cond) { failures++; console.log("  FAIL  " + msg); }
}
function section(name) { console.log("\n" + name); }

const fileFor = (p) =>
  p === "/" ? path.join(DOCS, "index.html") : path.join(DOCS, p.replace(/^\/|\/$/g, ""), "index.html");

/* ---- per-page head + body ---------------------------------------- */
section("pages");
const built = new Map();
for (const route of ROUTES) {
  const file = fileFor(route.path);
  if (!fs.existsSync(file)) { ok(false, `${route.path}: not built`); continue; }
  const html = fs.readFileSync(file, "utf8");
  built.set(normalizePath(route.path), html);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const root = html.slice(html.indexOf('<div id="root">'));
  const text = root.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  ok(title.length > 15 && title.length <= 75, `${route.path}: title length ${title.length} — "${title}"`);
  ok(desc.length >= 110 && desc.length <= 175, `${route.path}: description length ${desc.length}`);
  ok(canon === ORIGIN + url(route.canonical || route.path), `${route.path}: canonical is "${canon}"`);
  ok(/<h1[^>]*>/.test(root), `${route.path}: no <h1> in prerendered markup`);
  ok(text.length > 700, `${route.path}: only ${text.length} chars of prerendered text`);
  ok(/og:title/.test(html) && /og:description/.test(html), `${route.path}: missing Open Graph tags`);
  ok(html.includes(url("/build/site.js")), `${route.path}: does not load the app bundle`);

  // Every script the page names must exist, and React has to be among them:
  // without it site.js throws on ReactDOM.createRoot and the page is frozen
  // at its prerendered markup. That is invisible on a prose page and only
  // shows up on /play/, where the calculator stays dead.
  const srcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    ok(underBase(src), `${route.path}: script ${src} is not under ${BASE}/`);
    ok(underBase(src) && fs.existsSync(diskPath(src)), `${route.path}: script ${src} missing`);
  }
  ok(srcs.some((s) => /react\./.test(s)), `${route.path}: does not load React`);
  ok(srcs.some((s) => /react-dom\./.test(s)), `${route.path}: does not load ReactDOM`);
  ok(srcs.findIndex((s) => /react-dom\./.test(s)) < srcs.indexOf(url("/build/site.js")),
     `${route.path}: ReactDOM is not loaded before site.js`);
}

/* ---- the help pages (built from the pinned asset) ----------------- */
section("help pages");
function htmlFiles(dir, prefix) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...htmlFiles(path.join(dir, e.name), prefix + e.name + "/"));
    else if (e.name === "index.html") out.push(prefix);
  }
  return out;
}
const HELP_DIR = path.join(DOCS, "help");
const helpPages = fs.existsSync(HELP_DIR) ? htmlFiles(HELP_DIR, "/help/") : [];
ok(helpPages.length >= 20, `only ${helpPages.length} help pages — run node .seo/build.js`);
for (const p of helpPages) {
  const html = fs.readFileSync(fileFor(p), "utf8");
  built.set(p, html);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  ok(title.length > 3 && title.length <= 75, `${p}: title length ${title.length} — "${title}"`);
  ok(desc.length >= 40 && desc.length <= 175, `${p}: description length ${desc.length}`);
  ok(canon === ORIGIN + url(p), `${p}: canonical is "${canon}"`);
  ok((html.match(/<h1[\s>]/g) || []).length === 1, `${p}: needs exactly one <h1>`);
  ok(/class="site-header"/.test(html) && /class="site-footer"/.test(html), `${p}: header or footer missing`);
  ok(/Help built from Calc-U-59-help\.zip /.test(html), `${p}: does not name the asset it is built from`);
  const srcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  ok(srcs.length === 1 && srcs[0] === url("/help/help.js"), `${p}: help pages load only help.js, not ${srcs.join(", ")}`);
}
ok(fs.existsSync(path.join(HELP_DIR, "vendor", "mermaid.min.js")) && fs.existsSync(path.join(HELP_DIR, "vendor", "MERMAID-LICENSE.txt")),
   "help/vendor/: Mermaid or its licence missing");

/* ---- the redirects of the old help addresses ----------------------- */
section("redirects");
const redirectPages = new Set();
for (const [from, to] of Object.entries(REDIRECTS)) {
  const file = fileFor(from);
  redirectPages.add(normalizePath(from));
  if (!fs.existsSync(file)) { ok(false, `${from}: no redirect page`); continue; }
  const html = fs.readFileSync(file, "utf8");
  ok(html.includes(`<meta http-equiv="refresh" content="0; url=${url(to)}">`), `${from}: does not refresh to ${url(to)}`);
  ok(html.includes(`<link rel="canonical" href="${ORIGIN}${url(to)}">`), `${from}: canonical is not ${url(to)}`);
  ok(html.includes('<meta name="robots" content="noindex">'), `${from}: not noindex`);
  const [target, anchor] = to.split("#");
  ok(built.has(normalizePath(target)), `${from}: goes to ${to}, which is no built page`);
  if (anchor && built.has(normalizePath(target))) ok(built.get(normalizePath(target)).includes(` id="${anchor}"`), `${from}: ${target} has no #${anchor}`);
}
for (const [hash, to] of Object.entries(LEGACY_HASHES)) {
  const [target, anchor] = to.split("#");
  ok(built.has(normalizePath(target)), `#${hash}: goes to ${to}, which is no built page`);
  if (anchor && built.has(normalizePath(target))) ok(built.get(normalizePath(target)).includes(` id="${anchor}"`), `#${hash}: ${target} has no #${anchor}`);
}

/* ---- the pins: help asset, Web frontend, examples of one release ---- */
section("pins");
for (const problem of PINS.verify("59")) ok(false, problem);
checks++;

// Exactly one title per indexable page, or they compete with each other.
section("uniqueness");
const titles = new Map();
for (const route of ROUTES.filter((r) => !r.canonical)) {
  const html = built.get(normalizePath(route.path));
  if (!html) continue;
  const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  ok(!titles.has(t), `duplicate <title> on ${route.path} and ${titles.get(t)}: "${t}"`);
  titles.set(t, route.path);
}

/* ---- internal links resolve -------------------------------------- */
section("internal links");
// Static pages that live outside routes.js entirely — not React pages, so
// never prerendered into `built` — but that are real, deliberately-linked
// targets on disk. /calc/app/ is the web client's installable standalone
// calculator; it is left out of routes.js (and out of robots.txt's crawl)
// on purpose so it never competes with /play/, but SiteFooter and PlayPage
// both link to it.
// articles/*.html are rendered from Markdown by .seo/articles.js, outside
// this build; the software page links to them.
const ARTICLES = fs.readdirSync(path.join(DOCS, "articles")).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
const STATIC_TARGETS = {
  "/calc/app/": path.join(DOCS, "calc", "app", "index.html"),
  ...Object.fromEntries(ARTICLES.map((a) => [`/articles/${a}.html`, path.join(DOCS, "articles", `${a}.html`)])),
};
const REPO_ROOT = path.join(DOCS, "..");
for (const [p, html] of built) {
  const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  for (const address of new Set(hrefs)) {
    const [where, anchor] = address.split("#");
    if (!underBase(where)) {
      // A link to the other site folder (the help links /1600/ and back) is
      // followed on disk.
      const file = path.join(REPO_ROOT, where, where.endsWith("/") ? "index.html" : "");
      ok(/^\/(1600)\//.test(where) && fs.existsSync(file), `${p}: link ${address} leads nowhere`);
      continue;
    }
    const href = sitePath(where);
    if (/\.(css|png|js|xml|txt|json|woff2?|ti59|ti58|ti58c|asm|pdf|md)$/.test(href)) {
      ok(fs.existsSync(diskPath(where)), `${p}: asset ${address} missing`);
    } else if (STATIC_TARGETS[href]) {
      ok(fs.existsSync(STATIC_TARGETS[href]), `${p}: static page ${href} missing`);
    } else if (redirectPages.has(normalizePath(href))) {
      ok(false, `${p}: links to ${address}, which only redirects — link to where it goes`);
    } else {
      ok(built.has(normalizePath(href)), `${p}: link ${href} has no built page`);
      if (anchor && built.has(normalizePath(href))) {
        ok(built.get(normalizePath(href)).includes(` id="${anchor}"`), `${p}: link ${address}: no #${anchor} there`);
      }
    }
  }
  const body = html.includes('<div id="root">') ? html.slice(html.indexOf('<div id="root">')) : html;
  for (const m of body.matchAll(/href="#([^"]+)"/g)) {
    ok(html.includes(` id="${m[1]}"`), `${p}: link #${m[1]} has no heading on the page`);
  }
}

/* ---- image sources resolve ----------------------------------------- *
 *
 * The check above only ever looked at href="...", which <img> doesn't set,
 * so a broken <img src> was invisible to it — that's exactly how three
 * screenshots on /debugger/ shipped as src="assets/....png" instead of
 * "/assets/....png". Relative to a directory route that resolves in a
 * browser as /debugger/assets/....png, not the real file at
 * /assets/....png — but a naive existsSync(path.join(DOCS, src)) check
 * would still find the file (path.join doesn't know a browser resolves
 * relative URLs against the page's own address) and miss the bug entirely.
 * Every <img> on this site is meant to be root-relative, so require the
 * leading BASE + "/" rather than just checking the file exists on disk.
 */
section("image sources");
for (const [p, html] of built) {
  const root = html.includes('<div id="root">') ? html.slice(html.indexOf('<div id="root">')) : html;
  const srcs = [...root.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
  for (const src of new Set(srcs)) {
    ok(underBase(src), `${p}: <img src="${src}"> is not root-relative under ${BASE}/`);
    if (underBase(src)) {
      ok(fs.existsSync(diskPath(src)), `${p}: <img> asset ${src} missing`);
    }
  }
}

/* ---- crawl files -------------------------------------------------- */
section("crawl files");
const sitemap = fs.readFileSync(path.join(DOCS, "sitemap.xml"), "utf8");
for (const route of ROUTES) {
  const listed = sitemap.includes(`<loc>${ORIGIN}${url(route.path)}</loc>`);
  ok(listed === !route.canonical, `sitemap: ${route.path} should ${route.canonical ? "not " : ""}be listed`);
}
for (const p of helpPages) ok(sitemap.includes(`<loc>${ORIGIN}${url(p)}</loc>`), `sitemap: help page ${p} missing`);
for (const p of redirectPages) ok(!sitemap.includes(`<loc>${ORIGIN}${url(p)}</loc>`), `sitemap: ${p} only redirects`);
ok(!/<lastmod>/.test(sitemap), "sitemap: no dates (the build must give the same bytes)");
const robots = fs.readFileSync(path.join(DOCS, "..", "robots.txt"), "utf8");
ok(robots.includes(`Sitemap: ${ORIGIN}${url("/sitemap.xml")}`), "robots.txt does not name the sitemap");
for (const blocked of ["/59/calc/app/", "/59/calc/index.html", "/59/help-asset/"]) {
  ok(robots.includes(`Disallow: ${blocked}`), `robots.txt does not block ${blocked}`);
}
// robots.txt and 404.html live at the domain root, outside this site.
ok(fs.existsSync(path.join(DOCS, ".nojekyll")), ".nojekyll missing");

/* ---- scripts name only paths under BASE --------------------------- *
 *
 * Paths a script builds at run time are not in the prerendered HTML, so
 * the link checks above never see them. Any root-relative string literal
 * in a script must carry the BASE prefix. routes.js is exempt: its paths
 * are site paths by design. calc/ is exempt too: the web client uses no
 * root-relative URLs at all (its own tests prove that).
 */
section("script paths");
const SCRIPTS = fs.readdirSync(path.join(DOCS, "build"))
  .filter((f) => f.endsWith(".js") && f !== "routes.js").map((f) => "build/" + f);
for (const name of SCRIPTS) {
  const body = fs.readFileSync(path.join(DOCS, name), "utf8");
  for (const m of body.matchAll(/["'`](\/[A-Za-z_][^"'`]*)/g)) {
    ok(underBase(m[1]), `${name}: path ${m[1]} is not under ${BASE}/`);
  }
}

/* ---- nothing is fetched from a third party ------------------------ *
 *
 * The site must serve every byte a browser fetches from its own origin,
 * and must never carry analytics. See docs/fonts/README.md for the
 * reasoning behind the fonts, which generalises to everything else: a
 * request to another host hands that host the visitor's IP address.
 *
 * The structural rule is the strong one. An *off-origin* URL is allowed
 * only as an <a href> — somewhere the visitor chooses to go. Anywhere a
 * URL is fetched without the visitor deciding to (script, link, img,
 * iframe), it must point at this site. A tracker needs a host, so it
 * cannot pass this without also breaking it.
 *
 * Same-origin absolute URLs are fine and in places required: rel=canonical
 * and og:url have to be absolute.
 */
section("self-hosted");
const offOrigin = (url) => /^(https?:)?\/\//.test(url) && !url.startsWith(ORIGIN + "/") && url !== ORIGIN;
for (const [p, html] of built) {
  for (const m of html.matchAll(/<(\w+)\b[^>]*?\b(?:src|href)="([^"]+)"/g)) {
    const [, tag, url] = m;
    if (!offOrigin(url)) continue;
    ok(tag.toLowerCase() === "a", `${p}: <${tag}> fetches ${url} from another origin`);
  }
}

const AUTHORED_CSS = ["styles.css", "help.css", "colors_and_type.css", "fonts/self-hosted.css", "articles/article.css"];
for (const name of AUTHORED_CSS) {
  const file = path.join(DOCS, name);
  if (!fs.existsSync(file)) { ok(false, `${name}: missing`); continue; }
  const css = fs.readFileSync(file, "utf8");
  for (const m of css.matchAll(/url\(\s*["']?([^"')]+)/g)) {
    ok(!/^(https?:)?\/\//.test(m[1]), `${name}: url(${m[1]}) is off-origin`);
  }
  for (const m of css.matchAll(/@import\s+["']([^"']+)/g)) {
    ok(!/^(https?:)?\/\//.test(m[1]), `${name}: @import ${m[1]} is off-origin`);
  }
}

for (const a of ARTICLES) {
  const md = fs.readFileSync(path.join(DOCS, "articles", `${a}.md`), "utf8");
  const file = path.join(DOCS, "articles", `${a}.html`);
  ok(fs.existsSync(path.join(DOCS, "articles", `${a}.pdf`)), `articles/${a}.pdf: missing — run node .seo/articles.js`);
  if (!fs.existsSync(file)) { ok(false, `articles/${a}.html: missing — run node .seo/articles.js`); continue; }
  const html = fs.readFileSync(file, "utf8");
  ok(html.includes(`<title>${md.match(/^# (.+)$/m)[1]} — Calc-U 59</title>`), `articles/${a}.html: title differs from ${a}.md — run node .seo/articles.js`);
  for (const [, tag, url] of html.matchAll(/<(\w+)\b[^>]*?\b(?:src|href)="([^"]+)"/g)) {
    if (offOrigin(url)) ok(tag.toLowerCase() === "a", `articles/${a}.html: <${tag}> fetches ${url} from another origin`);
    else if (url.startsWith("/")) ok(fs.existsSync(diskPath(url.split("#")[0])) || built.has(normalizePath(sitePath(url.split("#")[0]))), `articles/${a}.html: link ${url} missing`);
  }
}

// Belt and braces: a named tracker, even self-hosted, is still a tracker.
// Patterns are anchored to a host or a call so React's onDoubleClick and
// friends do not trip them.
const TRACKERS = /google-analytics\.com|googletagmanager|gtag\s*\(|doubleclick\.net|plausible\.io|matomo|piwik|fathom\.|hotjar|mixpanel|segment\.(io|com)|clarity\.ms|sentry\.io|facebook\.net/i;
const scanned = [
  ...[...built.keys()].map((p) => [p, built.get(p)]),
  ...fs.readdirSync(path.join(DOCS, "build"))
    .filter((f) => f.endsWith(".js"))
    .map((f) => ["build/" + f, fs.readFileSync(path.join(DOCS, "build", f), "utf8")]),
  ...ARTICLES.map((a) => [`articles/${a}.html`, fs.readFileSync(path.join(DOCS, "articles", `${a}.html`), "utf8")]),
  ...AUTHORED_CSS.map((f) => [f, fs.readFileSync(path.join(DOCS, f), "utf8")]),
  ["calc/calc.js", fs.readFileSync(path.join(CLIENT_DIR, "calc.js"), "utf8")],
  ["help/help.js", fs.readFileSync(path.join(HELP_DIR, "help.js"), "utf8")],
];
for (const [name, body] of scanned) {
  const hit = body.match(TRACKERS);
  ok(!hit, `${name}: analytics/tracker signature "${hit && hit[0]}"`);
}

/* ---- the bundle actually boots ------------------------------------ */
async function bootChecks() {
section("client boot");
let JSDOM;
try { ({ JSDOM } = require("jsdom")); } catch (_) {}
if (!JSDOM) {
  console.log("  SKIP  jsdom not installed — run: npm install --no-save jsdom");
} else {
  // The scripts are read out of each page's own <script src> tags rather
  // than from a list here. A hardcoded list proves the bundle works; it
  // cannot prove the page actually loads it, and a page that omitted React
  // would still pass while rendering nothing in a real browser.

  // jsdom returns null from getContext("2d") unless the optional native
  // `canvas` package is installed. led-display.jsx draws the LED digits
  // there, so /play/ gets a no-op 2D context: enough to prove the page
  // mounts and the component tree renders, not enough to check pixels.
  const stub2d = () => {
    const noop = () => {};
    return {
      save: noop, restore: noop, beginPath: noop, arc: noop, fill: noop,
      clearRect: noop, setTransform: noop, transform: noop, translate: noop,
      fillStyle: "", filter: "",
    };
  };

  // Each page loads the same scripts; read each once.
  const scriptCache = new Map();
  const readScript = (src) => {
    if (!scriptCache.has(src)) scriptCache.set(src, fs.readFileSync(diskPath(src), "utf8"));
    return scriptCache.get(src);
  };
  const pages = ROUTES.map((r) => r.path);
  for (const p of pages) {
    const html = built.get(normalizePath(p));
    const errors = [];
    const dom = new JSDOM(html, {
      url: ORIGIN + url(p),
      runScripts: "outside-only",
      pretendToBeVisual: true,
    });
    const w = dom.window;
    w.addEventListener("error", (e) => errors.push(String(e.error || e.message)));
    // The prerendered markup is what a crawler sees; wipe it first so the
    // check proves the client rendered it, not that it was already there.
    w.document.getElementById("root").innerHTML = "";
    w.Worker = function () { this.postMessage = () => {}; this.terminate = () => {}; };
    w.HTMLCanvasElement.prototype.getContext = stub2d;
    // jsdom has no ResizeObserver; the client's wide layout (and PlayPage)
    // observe their panels with it, as every supported browser can.
    w.ResizeObserver = function () { this.observe = this.unobserve = this.disconnect = () => {}; };
    w.fetch = () => Promise.resolve({ json: () => Promise.resolve([]), text: () => Promise.resolve("") });
    const srcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    try {
      for (const src of srcs) {
        w.eval(readScript(src));
      }
    } catch (e) {
      ok(false, `${p}: bundle threw — ${e.message}`);
      continue;
    }
    // createRoot renders concurrently; let its scheduler drain.
    for (let i = 0; i < 20; i++) await new Promise((r) => setTimeout(r, 5));

    const rendered = w.document.getElementById("root").textContent.replace(/\s+/g, " ").trim();
    ok(rendered.length > 400, `${p}: client render produced ${rendered.length} chars`);
    ok(/Calc-U/.test(rendered), `${p}: client render is missing the header`);
    ok(errors.length === 0, `${p}: runtime errors — ${errors.join("; ")}`);
    dom.window.close();
  }
}
}

bootChecks().then(() => {
  console.log(`\n${checks - failures}/${checks} checks passed.\n`);
  process.exit(failures ? 1 : 0);
});
