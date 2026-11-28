// The renderer on the small test asset (tests/Demo-Product-help.zip, see
// tests/README.md) and on broken copies of it.
//
//   cd .help && npm test

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const zlib = require("zlib");
const MarkdownIt = require("markdown-it");
const { buildHelp, sha256 } = require("../render.js");
const { readZip } = require("../zip.js");
const { inlineText, slugger } = require("../slug.js");

const ASSET = path.join(__dirname, "Demo-Product-help.zip");

// A stored (uncompressed) zip of { name → Buffer }, for the broken copies.
function writeZip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const [name, data] of entries) {
    const n = Buffer.from(name, "utf8");
    const crc = zlib.crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(n.length, 26);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6);
    central.writeUInt32LE(crc, 16); central.writeUInt32LE(data.length, 20); central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(n.length, 28); central.writeUInt32LE(offset, 42);
    locals.push(local, n, data);
    centrals.push(central, n);
    offset += 30 + n.length + data.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.size, 8); end.writeUInt16LE(entries.size, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, end]);
}

function render(zipBuf, extra = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "help-test-"));
  const asset = path.join(dir, "Demo-Product-help.zip");
  fs.writeFileSync(asset, zipBuf);
  const version = JSON.parse(readZip(zipBuf).get("toc.json")).version;
  const warnings = [];
  const result = buildHelp({
    folder: "demo",
    siteDir: path.join(dir, "site"),
    asset,
    pin: { sha256: sha256(zipBuf), version },
    codeClass: "code", tableClass: "tbl", boxClass: "tbl-box",
    diagrams: { primaryColor: "#123456" },
    page: (c) => `<title>${c.page.title}</title>\n<main>${c.page.html}</main>\n` +
      `<p class="prev">${c.prev ? c.prev.url : ""}</p><p class="next">${c.next ? c.next.url : ""}</p>`,
    index: (c) => c.pages.map((p) => p.url).join("\n"),
    log: (m) => warnings.push(m),
    ...extra,
  });
  const read = (url) => fs.readFileSync(path.join(dir, "site", url.replace(/^\/demo\//, ""), url.endsWith("/") ? "index.html" : ""), "utf8");
  return { dir, result, warnings, read };
}

function modified(change) {
  const entries = readZip(fs.readFileSync(ASSET));
  change(entries);
  return writeZip(entries);
}

test("anchors follow anchor_cases.txt", () => {
  const md = new MarkdownIt({ html: true });
  const groups = fs.readFileSync(path.join(__dirname, "anchor_cases.txt"), "utf8").split(/\n\s*\n/);
  let n = 0;
  for (const group of groups) {
    const slug = slugger();
    for (const line of group.split("\n")) {
      if (!line.trim() || line.startsWith("#")) continue;
      const [heading, anchor] = line.split("\t");
      const tokens = md.parse("# " + heading, {});
      assert.equal(slug(inlineText(tokens[1].children)), anchor, `heading "${heading}"`);
      n++;
    }
  }
  assert.ok(n >= 20, `only ${n} cases read`);
});

test("the test asset renders: addresses, links, anchors, pictures, downloads", () => {
  const { result, read, warnings } = render(fs.readFileSync(ASSET));
  const urls = result.pages.map((p) => p.url);
  assert.deepEqual(urls.slice(0, 3), ["/demo/help/01-introduction/", "/demo/help/02-getting-started/", "/demo/help/02-getting-started/getting-started/"]);
  assert.ok(urls.includes("/demo/help/09-product-topics/models/"));
  assert.deepEqual(warnings, []);

  const intro = read("/demo/help/01-introduction/");
  assert.match(intro, /<title>Introduction<\/title>/);
  assert.match(intro, /href="\/demo\/help\/02-getting-started\/#the-control-bar"/);
  assert.match(intro, /href="\/demo\/help\/downloads\/tutorial.preset"/);
  assert.match(intro, /<img src="\/demo\/help\/images\/window.png" alt="The window" width="\d+" height="\d+" loading="lazy"/);
  assert.match(intro, /<p class="prev"><\/p><p class="next">\/demo\/help\/02-getting-started\/<\/p>/);

  const start = read("/demo/help/02-getting-started/");
  assert.match(start, /<h2 id="the-control-bar">/);
  assert.match(start, /href="#the-control-bar"/);
  assert.match(start, /href="\/demo\/help\/04-media\/#name--save"/);
  assert.match(start, /href="https:\/\/example.org\/x"/);

  const media = read("/demo/help/04-media/");
  assert.match(media, /<pre class="mermaid">graph LR; A--&gt;B\n<\/pre>/);
  assert.equal(result.pages.find((p) => p.url === "/demo/help/04-media/").hasDiagrams, true);

  // `[preset] <model>` is code, not a tag.
  assert.match(read("/demo/help/08-settings/"), /<code>\[preset\] &lt;model&gt;<\/code>/);
});

test("the same asset gives the same bytes", () => {
  const a = render(fs.readFileSync(ASSET));
  const b = render(fs.readFileSync(ASSET));
  for (const p of a.result.pages) assert.equal(a.read(p.url), b.read(p.url));
  assert.equal(a.read("/demo/help/help.js"), b.read("/demo/help/help.js"));
});

test("an asset that differs from its pin is refused", () => {
  assert.throws(
    () => render(fs.readFileSync(ASSET), { pin: { sha256: "0".repeat(64), version: "1.2.3" } }),
    /sha256 .* the pin says 0000/);
});

test("a file named in toc.json but missing fails, naming it", () => {
  const zip = modified((e) => e.delete("product/09-models.md"));
  assert.throws(() => render(zip), /toc\.json names product\/09-models\.md, which is not in the asset/);
});

test("a link that leads nowhere fails", () => {
  const zip = modified((e) => e.set("product/10-reference.md",
    Buffer.from("# Reference\n\nSee [nothing](09-nothing.md) and [no heading](09-models.md#nope).\n")));
  assert.throws(() => render(zip), (err) =>
    /09-nothing\.md, which is not in the asset/.test(err.message) && /has no heading #nope/.test(err.message));
});

test("unrewritten links are resolved with a warning", () => {
  const zip = modified((e) => e.set("product/10-reference.md",
    Buffer.from("# Reference\n\nSee [chapter 9](chapter:9) and [media](../../../library/help/04-media.md#name--save).\n")));
  const { read, warnings } = render(zip);
  const page = read("/demo/help/10-reference/reference/");
  assert.match(page, /href="\/demo\/help\/09-product-topics\/"/);
  assert.match(page, /href="\/demo\/help\/04-media\/#name--save"/);
  assert.equal(warnings.length, 2);
});

test("raw HTML other than <br> is shown as text; links to calc-u.org become site links", () => {
  const zip = modified((e) => e.set("product/10-reference.md",
    Buffer.from("# Reference\n\nUnmount \"<folder>\" | a<br>b\n\n| A |\n|---|\n| x<br>y |\n\n[play](https://calc-u.org/demo/play/)\n")));
  const page = render(zip).read("/demo/help/10-reference/reference/");
  assert.match(page, /Unmount &quot;&lt;folder&gt;&quot;/);
  assert.match(page, /a<br>b/);
  assert.match(page, /<div class="tbl-box"><table class="tbl">/);
  assert.match(page, /<td>x<br>y<\/td>/);
  assert.match(page, /href="\/demo\/play\/"/);
});
