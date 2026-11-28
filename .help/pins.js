#!/usr/bin/env node
//
// A site folder's three pins (docs/help-site.md of tinue/Calc-U): the help
// asset, the Web frontend and the examples, all of one release. They are
// kept in <folder>/pins.json:
//
//   { "product":  "Calc-U-59",
//     "release":  "calc-u-59-v3.0.0",
//     "help":     { "url", "sha256", "version" },
//     "web":      { "url", "sha256", "version", "commit" },
//     "examples": { "tag", "from"?, "to"?, "exclude"? } }
//
// "examples.from"/"to" are set only for a folder that hosts example files
// (59/: products/calc-u-59/examples → software-files/).
//
//   node .help/pins.js <folder>               install what pins.json pins
//   node .help/pins.js <folder> --pin <tag>   pin the release <tag> of tinue/Calc-U, then install
//   node .help/pins.js <folder> --local-web <dist dir>
//                                             a local Web frontend, for testing only:
//                                             the folder's check fails until the pin is reinstalled
//   node .help/pins.js <folder> --verify      check without downloading (what check.js runs)
//
// Installing puts the help zip in <folder>/help-asset/, unpacks the Web
// frontend into <folder>/calc/ (replacing it as a whole) and copies the
// examples. CI installs again and fails when git sees a difference, so what
// is committed is always exactly the pinned release. Needs node 20+, unzip
// and tar.

const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const REPO = "tinue/Calc-U";

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

function listFiles(dir, prefix = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const rel = prefix + e.name;
    if (e.isDirectory()) out.push(...listFiles(path.join(dir, e.name), rel + "/"));
    else out.push(rel);
  }
  return out;
}

// Problems with a Web frontend tree against its own MANIFEST.json.
function verifyTree(dir) {
  const manifestFile = path.join(dir, "MANIFEST.json");
  if (!fs.existsSync(manifestFile)) return { manifest: null, problems: ["MANIFEST.json missing"] };
  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  const problems = [];
  const expected = manifest.files || {};
  for (const [rel, hash] of Object.entries(expected)) {
    const file = path.join(dir, rel);
    if (!fs.existsSync(file)) problems.push(`${rel} missing`);
    else if (sha256(file) !== hash) problems.push(`${rel} changed`);
  }
  for (const rel of listFiles(dir)) {
    if (rel !== "MANIFEST.json" && !(rel in expected)) problems.push(`${rel} not in MANIFEST.json`);
  }
  return { manifest, problems };
}

const folderDir = (folder) => path.join(ROOT, folder);
const pinsFile = (folder) => path.join(folderDir(folder), "pins.json");
const readPins = (folder) => JSON.parse(fs.readFileSync(pinsFile(folder), "utf8"));
const helpAsset = (folder, pins) => path.join(folderDir(folder), "help-asset", path.basename(pins.help.url));
const tagVersion = (tag) => (tag.match(/-v(\d+\.\d+\.\d+)$/) || [])[1];

// Everything that can be checked without the network. An empty list: the
// folder holds exactly what pins.json pins, and the pins are of one release.
function verify(folder) {
  const pins = readPins(folder);
  const problems = [];
  const v = tagVersion(pins.release);
  if (!v) problems.push(`release ${pins.release} is not a release tag (…-v<x.y.z>; never a -pre)`);
  for (const [name, version] of [["help", pins.help.version], ["web", pins.web.version], ["examples", tagVersion(pins.examples.tag)]]) {
    if (version !== v) problems.push(`the ${name} pin is ${version}, the release ${pins.release} is ${v}`);
  }
  if (pins.examples.tag !== pins.release) problems.push(`the examples pin ${pins.examples.tag} is not ${pins.release}`);
  for (const [name, pin] of [["help", pins.help], ["web", pins.web]]) {
    if (!pin.url.startsWith(`https://github.com/${REPO}/releases/download/${pins.release}/`)) {
      problems.push(`the ${name} pin ${pin.url} is not an asset of ${REPO} ${pins.release}`);
    }
  }
  const asset = helpAsset(folder, pins);
  if (!fs.existsSync(asset)) problems.push(`${path.relative(ROOT, asset)} missing`);
  else if (sha256(asset) !== pins.help.sha256) problems.push(`${path.relative(ROOT, asset)} differs from its pin`);
  const extra = listFiles(path.dirname(asset)).filter((f) => f !== path.basename(asset));
  for (const f of extra) problems.push(`help-asset/${f} is not the pinned asset`);

  const calc = path.join(folderDir(folder), "calc");
  const { manifest, problems: tree } = verifyTree(calc);
  for (const p of tree) problems.push(`calc/: ${p} — calc/ is imported; reinstall with node .help/pins.js ${folder}`);
  if (manifest && (manifest.version !== pins.web.version || manifest.commit !== pins.web.commit)) {
    problems.push(`calc/ is ${manifest.version} (${manifest.commit}), the pin is ${pins.web.version} (${pins.web.commit})`);
  }
  return problems;
}

function fail(msg) {
  console.error(`pins: ${msg}`);
  process.exit(1);
}

async function download(url, file) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

function installWeb(folder, dir) {
  const { manifest, problems } = verifyTree(dir);
  if (problems.length) throw new Error(`the Web frontend does not match its MANIFEST.json:\n  ${problems.join("\n  ")}`);
  const target = path.join(folderDir(folder), "calc");
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(dir, target, { recursive: true });
  console.log(`installed ${manifest.name} ${manifest.version} (${manifest.commit}) into ${folder}/calc/`);
  return manifest;
}

async function install(folder, pins, tmp, { record } = {}) {
  // The help asset.
  const helpZip = path.join(tmp, "help.zip");
  await download(pins.help.url, helpZip);
  const helpHash = sha256(helpZip);
  if (pins.help.sha256 && helpHash !== pins.help.sha256) {
    throw new Error(`${pins.help.url} has changed (sha256 ${helpHash}, pinned ${pins.help.sha256})`);
  }
  const assetDir = path.join(folderDir(folder), "help-asset");
  fs.rmSync(assetDir, { recursive: true, force: true });
  fs.mkdirSync(assetDir, { recursive: true });
  fs.copyFileSync(helpZip, path.join(assetDir, path.basename(pins.help.url)));
  console.log(`installed ${path.basename(pins.help.url)} into ${folder}/help-asset/`);

  // The Web frontend.
  const webZip = path.join(tmp, "web.zip");
  await download(pins.web.url, webZip);
  const webHash = sha256(webZip);
  if (pins.web.sha256 && webHash !== pins.web.sha256) {
    throw new Error(`${pins.web.url} has changed (sha256 ${webHash}, pinned ${pins.web.sha256})`);
  }
  const unpacked = path.join(tmp, "web");
  execFileSync("unzip", ["-q", webZip, "-d", unpacked]);
  const manifest = installWeb(folder, unpacked);

  // The examples, from the source tree at the tag.
  const ex = pins.examples;
  if (ex.from && ex.to) {
    const tarball = path.join(tmp, "src.tar.gz");
    await download(`https://codeload.github.com/${REPO}/tar.gz/refs/tags/${ex.tag}`, tarball);
    const src = path.join(tmp, "src");
    fs.mkdirSync(src);
    execFileSync("tar", ["-xzf", tarball, "-C", src, "--strip-components=1", `*/${ex.from}`]);
    const from = path.join(src, ex.from);
    const to = path.join(folderDir(folder), ex.to);
    fs.rmSync(to, { recursive: true, force: true });
    const exclude = new Set(ex.exclude || []);
    let n = 0;
    for (const rel of listFiles(from)) {
      if (exclude.has(rel) || exclude.has(rel.split("/")[0] + "/")) continue;
      fs.mkdirSync(path.dirname(path.join(to, rel)), { recursive: true });
      fs.copyFileSync(path.join(from, rel), path.join(to, rel));
      n++;
    }
    console.log(`copied ${n} example files of ${ex.tag} into ${folder}/${ex.to}/`);
  }

  if (record) {
    pins.help.sha256 = helpHash;
    pins.web.sha256 = webHash;
    pins.web.version = manifest.version;
    pins.web.commit = manifest.commit;
    fs.writeFileSync(pinsFile(folder), JSON.stringify(pins, null, 2) + "\n");
    console.log(`pinned ${pins.release} in ${folder}/pins.json`);
  }
}

async function main() {
  const [folder, opt, arg] = process.argv.slice(2);
  if (!folder || !fs.existsSync(pinsFile(folder))) fail(`usage: node .help/pins.js <folder with pins.json> [--pin <tag> | --local-web <dir> | --verify]`);

  if (opt === "--verify") {
    const problems = verify(folder);
    for (const p of problems) console.log(`  FAIL  ${p}`);
    console.log(problems.length ? `${problems.length} problems` : `${folder}: the pins hold`);
    process.exit(problems.length ? 1 : 0);
  }
  if (opt === "--local-web") {
    if (!arg) fail("--local-web needs a Web frontend's dist/ folder");
    installWeb(folder, path.resolve(arg));
    console.log("not pinned: the check fails until node .help/pins.js " + folder + " runs again");
    return;
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "calcu-pins-"));
  try {
    let pins = readPins(folder);
    if (opt === "--pin") {
      const v = tagVersion(arg || "");
      if (!v || /-pre/.test(arg)) fail(`--pin needs a release tag such as calc-u-59-v3.0.0, not ${arg}`);
      const at = `https://github.com/${REPO}/releases/download/${arg}/`;
      pins = {
        product: pins.product,
        release: arg,
        help: { url: `${at}${pins.product}-help.zip`, sha256: "", version: v },
        web: { url: `${at}${pins.product}-web.zip`, sha256: "", version: v, commit: "" },
        examples: { ...pins.examples, tag: arg },
      };
      await install(folder, pins, tmp, { record: true });
    } else if (!opt) {
      await install(folder, pins, tmp);
    } else {
      fail(`unknown option ${opt}`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

module.exports = { readPins, verify, verifyTree, listFiles, sha256, helpAsset, tagVersion };

if (require.main === module) main().catch((e) => fail(e.message));
