#!/usr/bin/env node
//
// Calc-U-1600 — the static build of /1600/.
//
//   node .site/build.js        (in 1600/; once: cd ../.help && npm ci)
//
// Writes the home page (index.html), the play page (play/index.html), the
// help from the pinned help asset (help/, .help/render.js) and the
// sitemap. The output depends only on the sources and the pins: CI
// rebuilds and fails on any difference.

const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "..");
const { buildHelp } = require("../../.help/render.js");
const { readPins, helpAsset } = require("../../.help/pins.js");
const { BASE, helpPage, helpIndex } = require("./template.js");
const { home, play } = require("./pages.js");
const { ORIGIN } = require("../../.help/render.js");

const log = (...a) => console.log("  ", ...a);

fs.writeFileSync(path.join(DIR, "index.html"), home());
fs.mkdirSync(path.join(DIR, "play"), { recursive: true });
fs.writeFileSync(path.join(DIR, "play", "index.html"), play());
log("index.html, play/index.html");

const pins = readPins("1600");
const help = buildHelp({
  folder: "1600",
  siteDir: DIR,
  asset: helpAsset("1600", pins),
  pin: pins.help,
  codeClass: "lcd",
  tableClass: "tbl",
  boxClass: "tbl-box",
  // The tokens board: panel boxes, the band for decisions, accent lines.
  diagrams: {
    background: "#dcdfe2",
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif",
    primaryColor: "#dcdfe2",
    primaryTextColor: "#161616",
    primaryBorderColor: "#7f848a",
    secondaryColor: "#443a31",
    secondaryTextColor: "#ecebe7",
    tertiaryColor: "#bcc1c6",
    tertiaryTextColor: "#161616",
    lineColor: "#3a3e43",
    textColor: "#161616",
    clusterBkg: "#c9cdd1",
    clusterBorder: "#7f848a",
    edgeLabelBackground: "#dcdfe2",
  },
  page: helpPage,
  index: helpIndex,
  log: (m) => log(m),
});
log(`help: ${help.pages.length} pages from ${path.basename(pins.help.url)} ${pins.help.version}`);

const urls = [[`${BASE}/`, "1.0"], [`${BASE}/play/`, "0.8"], [`${BASE}/help/`, "0.8"]]
  .concat(help.pages.map((p) => [p.url, "0.6"]));
fs.writeFileSync(path.join(DIR, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(([loc, pr]) => `  <url>\n    <loc>${ORIGIN}${loc}</loc>\n    <priority>${pr}</priority>\n  </url>\n`).join("") +
  `</urlset>\n`);
log(`sitemap.xml → ${urls.length} URLs`);
console.log(`\nBuilt 2 site pages and ${help.pages.length + 1} help pages.\n`);
