#!/usr/bin/env node
//
// Calc-U-1600 — post-build check of /1600/.
//
//   node .site/check.js        (in 1600/, after node .site/build.js)
//
// Fails when the folder is not the pinned release (help asset, Web
// frontend), when a page lacks what search engines need, when a link or an
// anchor leads nowhere, when a page fetches anything from another site, or
// when the sitemap or robots.txt miss a page.

const fs = require("fs");
const path = require("path");
const PINS = require("../../.help/pins.js");
const { ORIGIN } = require("../../.help/render.js");
const { HELP } = require("./pages.js");

const DIR = path.join(__dirname, "..");
const ROOT = path.join(DIR, "..");
const BASE = "/1600";

let checks = 0, failures = 0;
function ok(cond, msg) { checks++; if (!cond) { failures++; console.log("  FAIL  " + msg); } }
function section(name) { console.log("\n" + name); }

const fileOf = (address) => path.join(ROOT, address.split("#")[0], address.split("#")[0].endsWith("/") ? "index.html" : "");

function pagesUnder(dir, prefix) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...pagesUnder(path.join(dir, e.name), prefix + e.name + "/"));
    else if (e.name === "index.html") out.push(prefix);
  }
  return out;
}

/* ---- pages -------------------------------------------------------- */
section("pages");
const SITE_PAGES = [`${BASE}/`, `${BASE}/play/`];
const helpPages = fs.existsSync(path.join(DIR, "help")) ? pagesUnder(path.join(DIR, "help"), `${BASE}/help/`) : [];
ok(helpPages.length >= 20, `only ${helpPages.length} help pages — run node .site/build.js`);
const built = new Map();
for (const p of SITE_PAGES.concat(helpPages)) {
  const file = fileOf(p);
  if (!fs.existsSync(file)) { ok(false, `${p}: not built`); continue; }
  const html = fs.readFileSync(file, "utf8");
  built.set(p, html);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  ok(title.length > 3 && title.length <= 75, `${p}: title length ${title.length} — "${title}"`);
  ok(desc.length >= 40 && desc.length <= 175, `${p}: description length ${desc.length}`);
  ok(canon === ORIGIN + p, `${p}: canonical is "${canon}"`);
  ok((html.match(/<h1[\s>]/g) || []).length === 1, `${p}: needs exactly one <h1>`);
  ok(html.includes('<header class="hdr">') && html.includes('<footer class="ftr">'), `${p}: header or footer missing`);
  if (p.startsWith(`${BASE}/help/`)) ok(html.includes("Help built from Calc-U-1600-help.zip "), `${p}: does not name the asset it is built from`);
}
ok(fs.existsSync(path.join(DIR, "help", "vendor", "mermaid.min.js")) && fs.existsSync(path.join(DIR, "help", "vendor", "MERMAID-LICENSE.txt")),
   "help/vendor/: Mermaid or its licence missing");
const titles = new Map();
for (const [p, html] of built) {
  const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  ok(!titles.has(t), `duplicate <title> on ${p} and ${titles.get(t)}: "${t}"`);
  titles.set(t, p);
}

/* ---- the pins ----------------------------------------------------- */
section("pins");
for (const problem of PINS.verify("1600")) ok(false, problem);
checks++;

/* ---- links, anchors, pictures, scripts ---------------------------- */
section("links");
const ids = (html) => new Set([...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
const offOrigin = (u) => /^(https?:)?\/\//.test(u) && !u.startsWith(ORIGIN + "/");
for (const [p, html] of built) {
  for (const m of html.matchAll(/<(\w+)\b[^>]*?\b(?:src|href)="([^"]+)"/g)) {
    const [, tag, raw] = m;
    const u = raw.replace(/&amp;/g, "&");
    if (offOrigin(u)) { ok(tag.toLowerCase() === "a", `${p}: <${tag}> fetches ${u} from another site`); continue; }
    if (/^(https?:|mailto:)/.test(u)) continue;
    if (u.startsWith("#")) { ok(ids(html).has(u.slice(1)), `${p}: link ${u} has no heading on the page`); continue; }
    ok(u.startsWith("/"), `${p}: ${u} is not root-relative`);
    if (!u.startsWith("/")) continue;
    ok(u.startsWith(`${BASE}/`) || u === "/" || u.startsWith("/59/"), `${p}: ${u} is outside /1600/ (and not the root or /59/)`);
    const [where, anchor] = u.split("#");
    const file = fileOf(where);
    ok(fs.existsSync(file), `${p}: ${u} leads nowhere`);
    if (anchor && fs.existsSync(file) && file.endsWith(".html")) {
      const target = built.get(where) || fs.readFileSync(file, "utf8");
      ok(ids(target).has(anchor), `${p}: ${u}: no #${anchor} there`);
    }
  }
}
for (const [name, address] of Object.entries(HELP)) {
  const [where, anchor] = address.split("#");
  ok(built.has(where), `HELP.${name}: ${where} is no help page`);
  if (anchor && built.has(where)) ok(ids(built.get(where)).has(anchor), `HELP.${name}: no #${anchor} on ${where}`);
}

/* ---- the play page mounts the pinned frontend --------------------- */
section("play");
{
  const html = built.get(`${BASE}/play/`) || "";
  const srcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  ok(srcs.join(" ") === `${BASE}/calc/vendor/react.production.min.js ${BASE}/calc/vendor/react-dom.production.min.js ${BASE}/calc/calc.js ${BASE}/play/play.js`,
     `/play/: scripts in the wrong order: ${srcs.join(", ")}`);
  ok(/CalcU1600/.test(fs.readFileSync(path.join(DIR, "play", "play.js"), "utf8")), "play.js does not mount CalcU1600");
  ok(fs.existsSync(path.join(DIR, "calc", "app", "index.html")), "calc/app/ missing");
}

/* ---- crawl files -------------------------------------------------- */
section("crawl files");
const sitemap = fs.readFileSync(path.join(DIR, "sitemap.xml"), "utf8");
for (const p of built.keys()) ok(sitemap.includes(`<loc>${ORIGIN}${p}</loc>`), `sitemap: ${p} missing`);
ok(!/<lastmod>/.test(sitemap), "sitemap: no dates (the build must give the same bytes)");
const robots = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
ok(robots.includes(`Sitemap: ${ORIGIN}${BASE}/sitemap.xml`), "robots.txt does not name /1600/sitemap.xml");
for (const blocked of ["/1600/calc/app/", "/1600/calc/index.html", "/1600/help-asset/"]) {
  ok(robots.includes(`Disallow: ${blocked}`), `robots.txt does not block ${blocked}`);
}

/* ---- no third parties, no trackers -------------------------------- */
section("self-hosted");
for (const name of ["site.css", "fonts/fonts.css"]) {
  const css = fs.readFileSync(path.join(DIR, name), "utf8");
  for (const m of css.matchAll(/(?:url\(\s*["']?|@import\s+(?:url\()?["'])([^"')]+)/g)) {
    ok(!/^(https?:)?\/\//.test(m[1]), `${name}: ${m[1]} is off-site`);
  }
}
const TRACKERS = /google-analytics\.com|googletagmanager|gtag\s*\(|doubleclick\.net|plausible\.io|matomo|piwik|fathom\.|hotjar|mixpanel|segment\.(io|com)|clarity\.ms|sentry\.io|facebook\.net|fonts\.googleapis/i;
for (const [name, body] of [...built].concat([
  ["play/play.js", fs.readFileSync(path.join(DIR, "play", "play.js"), "utf8")],
  ["help/help.js", fs.readFileSync(path.join(DIR, "help", "help.js"), "utf8")],
  ["site.css", fs.readFileSync(path.join(DIR, "site.css"), "utf8")],
  ["calc/calc.js", fs.readFileSync(path.join(DIR, "calc", "calc.js"), "utf8")],
])) {
  const hit = body.match(TRACKERS);
  ok(!hit, `${name}: tracker or third-party signature "${hit && hit[0]}"`);
}

console.log(`\n${checks - failures}/${checks} checks passed.\n`);
process.exit(failures ? 1 : 0);
