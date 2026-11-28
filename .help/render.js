// Calc-U help asset → static help pages, shared by /59/ and /1600/.
//
// Input: a pinned <Product>-help.zip (format: docs/formats/help.md of
// tinue/Calc-U) and a site folder's configuration (its base path, its page
// template, its code block style, its diagram colours). Output: one page
// per help file under <folder>/help/, the pictures, the downloads, and the
// script that draws the Mermaid diagrams. README.md explains the rules.
//
//   const { buildHelp } = require("../.help/render.js");
//   buildHelp(config)   // throws, naming every problem, when the asset is wrong
//
// The output depends only on the asset and the configuration: no dates, no
// machine paths. CI rebuilds it and fails when it differs from what was
// committed.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const MarkdownIt = require("markdown-it");
const { readZip } = require("./zip.js");
const { inlineText, slugger, baseSlug } = require("./slug.js");

const posix = path.posix;
const ORIGIN = "https://calc-u.org";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

// Raw HTML the help may use. Everything else is shown as text: the help
// writes things like `File ▸ Unmount "<folder>"` in prose.
const ALLOWED_HTML = /^<br\s*\/?>$/i;

function markdown() {
  const md = new MarkdownIt({ html: true, linkify: false, typographer: false });
  const escapeHtml = (tokens, i) => {
    const c = tokens[i].content;
    return ALLOWED_HTML.test(c.trim()) ? c : md.utils.escapeHtml(c);
  };
  md.renderer.rules.html_inline = escapeHtml;
  md.renderer.rules.html_block = (tokens, i) => {
    const c = tokens[i].content;
    return ALLOWED_HTML.test(c.trim()) ? c : `<p>${md.utils.escapeHtml(c.trim())}</p>\n`;
  };
  return md;
}

// The width and height of a PNG, read from its header.
function imageSize(buf, name) {
  if (/\.png$/i.test(name) && buf.length > 24 && buf.readUInt32BE(12) === 0x49484452) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return null;
}

function plainText(tokens) {
  return tokens.map((t) => (t.type === "inline" ? inlineText(t.children) : "")).join(" ").replace(/\s+/g, " ").trim();
}

// The meta description: the first paragraphs after the title, cut at a word
// to at most 160 characters.
function describe(tokens) {
  let text = "";
  for (let i = 0; i < tokens.length && text.length < 110; i++) {
    if (tokens[i].type !== "paragraph_open" || tokens[i].level !== 0) continue;
    // A paragraph that only holds a picture says nothing.
    const words = inlineText(tokens[i + 1].children.filter((c) => c.type !== "image")).replace(/\s+/g, " ").trim();
    if (words) text += (text ? " " : "") + words;
  }
  if (text.length <= 160) return text;
  const cut = text.slice(0, 159);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
}

/**
 * config:
 *   folder      "59"                       the site folder; pages live at /<folder>/help/
 *   siteDir     absolute path of the folder
 *   asset       absolute path of the pinned help zip
 *   pin         { url, sha256, version }   the folder's help pin
 *   codeClass   class of a fenced code block's <pre>
 *   tableClass  class of a <table>; boxClass the scrolling box around it
 *   diagrams    mermaid themeVariables (object)
 *   page(ctx)   → the whole HTML of one help page
 *   index(ctx)  → the whole HTML of the help's contents page
 *   log         function, for warnings
 */
function buildHelp(config) {
  const errors = [];
  const warnings = [];
  const warn = (m) => { warnings.push(m); (config.log || console.warn)("warning: " + m); };
  const base = `/${config.folder}`;
  const helpBase = `${base}/help/`;

  /* ---- the asset and its pin ------------------------------------- */
  const zipBuf = fs.readFileSync(config.asset);
  const hash = sha256(zipBuf);
  if (hash !== config.pin.sha256) {
    throw new Error(`${path.basename(config.asset)}: sha256 ${hash}, the pin says ${config.pin.sha256}`);
  }
  const zip = readZip(zipBuf);
  if (!zip.has("toc.json")) throw new Error("the asset has no toc.json");
  const toc = JSON.parse(zip.get("toc.json").toString("utf8"));
  if (toc["format-version"] !== 1) throw new Error(`toc.json: format-version ${toc["format-version"]}, this renderer reads 1`);
  if (toc.version !== config.pin.version) {
    throw new Error(`toc.json says version ${toc.version}, the pin says ${config.pin.version}`);
  }

  /* ---- addresses -------------------------------------------------- */
  const pages = [];            // in reading order
  const byPath = new Map();    // zip path → page
  const chapters = [];
  for (const ch of toc.chapters) {
    const files = ch.files || [];
    const missing = files.filter((f) => !zip.has(f.path));
    for (const f of missing) errors.push(`toc.json names ${f.path}, which is not in the asset`);
    if (!files.length) continue;
    const num = String(ch.number).padStart(2, "0");
    const chapterUrl = `${helpBase}${num}-${baseSlug(ch.title)}/`;
    const chapter = { number: ch.number, title: ch.title, url: chapterUrl, parts: [] };
    files.forEach((f, i) => {
      const stem = posix.basename(f.path, ".md").replace(/^\d+-/, "");
      const url = i === 0 ? chapterUrl : `${chapterUrl}${stem}/`;
      if (pages.some((p) => p.url === url)) errors.push(`${f.path}: its address ${url} is already taken`);
      const page = { path: f.path, shared: !!f.shared, url, chapter, index: pages.length };
      pages.push(page);
      byPath.set(f.path, page);
      chapter.parts.push(page);
    });
    chapters.push(chapter);
  }
  if (errors.length) throw new Error(errors.join("\n"));

  // chapter:<n> → the chapter's first product file (§1.4); a chapter with
  // none falls back to its first file.
  const chapterTarget = (n) => {
    const ch = chapters.find((c) => c.number === n);
    return ch && (ch.parts.find((p) => !p.shared) || ch.parts[0]);
  };

  /* ---- pass 1: parse, title, anchors ----------------------------- */
  const md = markdown();
  for (const page of pages) {
    const src = zip.get(page.path).toString("utf8");
    const env = {};
    const tokens = md.parse(src, env);
    const slug = slugger();
    page.anchors = new Set();
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== "heading_open") continue;
      const text = inlineText(tokens[i + 1].children);
      const id = slug(text);
      tokens[i].attrSet("id", id);
      page.anchors.add(id);
      if (tokens[i].tag === "h1" && !page.title) page.title = text.trim();
    }
    if (!page.title) errors.push(`${page.path}: no # title`);
    page.tokens = tokens;
    page.env = env;
    page.description = describe(tokens);
  }

  /* ---- pass 2: links, pictures, code ----------------------------- */
  const images = new Map();     // zip path → published name
  const downloads = new Map();
  const publish = (zipPath) => {
    if (zipPath.startsWith("product/images/")) {
      images.set(zipPath, zipPath.slice("product/images/".length));
      return `${helpBase}images/${images.get(zipPath)}`;
    }
    if (zipPath.startsWith("product/downloads/")) {
      downloads.set(zipPath, zipPath.slice("product/downloads/".length));
      return `${helpBase}downloads/${downloads.get(zipPath)}`;
    }
    return null;
  };

  function resolveLink(page, href) {
    if (href.startsWith("chapter:")) {
      const target = chapterTarget(Number(href.slice(8)));
      warn(`${page.path}: link ${href} was not rewritten by the help tool; resolved here`);
      if (!target) { errors.push(`${page.path}: ${href} names no chapter`); return href; }
      return target.url;
    }
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
      // Links to this site become root-relative, so they are checked and
      // followed inside it.
      if (href.startsWith(ORIGIN + "/")) return href.slice(ORIGIN.length);
      return href;
    }
    if (href.startsWith("//")) return href;
    let [file, anchor] = href.split("#");
    if (/^(\.\.\/)+library\/help\//.test(file)) {
      const fixed = file.replace(/^(\.\.\/)+library\/help\//, "../shared/");
      warn(`${page.path}: link ${href} is a source path; read as ${fixed}`);
      file = fixed;
    }
    let target = page;
    if (file) {
      const zipPath = posix.normalize(posix.join(posix.dirname(page.path), decodeURI(file)));
      if (byPath.has(zipPath)) target = byPath.get(zipPath);
      else if (zip.has(zipPath)) {
        const url = publish(zipPath);
        if (url) return url + (anchor ? "#" + anchor : "");
        errors.push(`${page.path}: link ${href} goes to ${zipPath}, which is no page, picture or download`);
        return href;
      } else {
        errors.push(`${page.path}: link ${href} goes to ${zipPath}, which is not in the asset`);
        return href;
      }
    }
    if (anchor !== undefined && anchor !== "") {
      if (!target.anchors.has(anchor)) errors.push(`${page.path}: link ${href}: ${target.path} has no heading #${anchor}`);
      return (target === page && !file ? "" : target.url) + "#" + anchor;
    }
    return target.url;
  }

  function rewrite(page, tokens) {
    for (const t of tokens) {
      if (t.children) rewrite(page, t.children);
      if (t.type === "link_open") t.attrSet("href", resolveLink(page, t.attrGet("href")));
      if (t.type === "image") {
        const src = t.attrGet("src");
        const zipPath = posix.normalize(posix.join(posix.dirname(page.path), src));
        if (!zip.has(zipPath)) { errors.push(`${page.path}: picture ${src} is not in the asset`); continue; }
        t.attrSet("src", publish(zipPath) || src);
        const size = imageSize(zip.get(zipPath), zipPath);
        if (size) { t.attrSet("width", String(size.width)); t.attrSet("height", String(size.height)); }
        t.attrSet("loading", "lazy");
        t.attrSet("decoding", "async");
      }
    }
  }

  const rules = md.renderer.rules;
  rules.fence = (tokens, i) => {
    const t = tokens[i];
    const lang = (t.info || "").trim().split(/\s+/)[0];
    if (lang === "mermaid") return `<pre class="mermaid">${esc(t.content)}</pre>\n`;
    const cls = lang ? ` class="language-${esc(lang)}"` : "";
    return `<pre class="${config.codeClass}"><code${cls}>${esc(t.content)}</code></pre>\n`;
  };
  rules.code_block = (tokens, i) => `<pre class="${config.codeClass}"><code>${esc(tokens[i].content)}</code></pre>\n`;
  rules.table_open = () => `<div class="${config.boxClass}"><table class="${config.tableClass}">\n`;
  rules.table_close = () => "</table></div>\n";

  for (const page of pages) {
    rewrite(page, page.tokens);
    page.hasDiagrams = page.tokens.some((t) => t.type === "fence" && /^mermaid\b/.test(t.info.trim()));
    page.html = md.renderer.render(page.tokens, md.options, page.env);
  }
  if (errors.length) throw new Error(errors.join("\n"));

  /* ---- write ------------------------------------------------------ */
  const outDir = path.join(config.siteDir, "help");
  fs.rmSync(outDir, { recursive: true, force: true });
  const write = (url, body) => {
    const file = path.join(config.siteDir, url.slice(base.length + 1));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, body);
  };

  const info = {
    product: toc.product,
    version: toc.version,
    asset: path.basename(config.asset),
    base,
    helpBase,
    origin: ORIGIN,
    chapters,
    script: `${helpBase}help.js`,
  };
  for (const page of pages) {
    const ctx = { ...info, page, prev: pages[page.index - 1] || null, next: pages[page.index + 1] || null };
    write(page.url + "index.html", config.page(ctx));
  }
  write(helpBase + "index.html", config.index({ ...info, pages }));
  for (const [zipPath, name] of images) write(`${helpBase}images/${name}`, zip.get(zipPath));
  for (const [zipPath, name] of downloads) write(`${helpBase}downloads/${name}`, zip.get(zipPath));

  // The diagrams: Mermaid, served from this site, loaded only on a page that
  // has one. Its licence goes with it.
  const mermaidDir = path.dirname(require.resolve("mermaid/package.json"));
  const mermaidVersion = require("mermaid/package.json").version;
  write(`${helpBase}vendor/mermaid.min.js`, fs.readFileSync(path.join(mermaidDir, "dist", "mermaid.min.js")));
  write(`${helpBase}vendor/MERMAID-LICENSE.txt`, fs.readFileSync(path.join(mermaidDir, "LICENSE")));
  write(`${helpBase}help.js`, helpScript(helpBase, config.diagrams, mermaidVersion));

  return { pages, chapters, warnings, toc, images: [...images.values()], downloads: [...downloads.values()] };
}

// The one script of a help page: the menu button, and the diagrams.
function helpScript(helpBase, themeVariables, mermaidVersion) {
  return `// Generated by .help/render.js. The help pages' only script.
(function () {
  // The menu button of a narrow header (59/), if the page has one.
  document.querySelectorAll("button[aria-controls]").forEach(function (b) {
    var panel = document.getElementById(b.getAttribute("aria-controls"));
    if (!panel) return;
    b.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // Mermaid ${mermaidVersion}, served from this site, only where a diagram is.
  var blocks = document.querySelectorAll("pre.mermaid");
  if (!blocks.length) return;
  var s = document.createElement("script");
  s.src = ${JSON.stringify(helpBase + "vendor/mermaid.min.js")};
  s.onload = function () {
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: ${JSON.stringify(themeVariables || {})}
    });
    window.mermaid.run({ nodes: blocks });
  };
  document.head.appendChild(s);
})();
`;
}

module.exports = { buildHelp, esc, sha256, ORIGIN };
