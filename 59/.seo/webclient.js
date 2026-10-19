// Calc-U 59 — the imported web client in calc/.
//
// calc/ is the web client's built dist/ from the Calc-U-59 repository
// (Web/, contract in its reference/WebClient.md), unpacked unchanged. It is
// never edited here. web-client.json pins which build it is:
//
//   { "url": "<release asset>", "sha256": "<of the zip>",
//     "version": "<MANIFEST.json version>", "commit": "<MANIFEST.json commit>" }
//
// Used by fetch-web-client.js (installs a build) and check.js (proves calc/
// is still exactly the pinned build).

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DOCS = path.join(__dirname, "..");
const CLIENT_DIR = path.join(DOCS, "calc");
const LOCK = path.join(DOCS, "web-client.json");

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

function listFiles(dir, prefix = "") {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix + e.name;
    if (e.isDirectory()) out.push(...listFiles(path.join(dir, e.name), rel + "/"));
    else out.push(rel);
  }
  return out;
}

// Problems with a dist/ tree against its own MANIFEST.json: missing,
// changed or extra files. An empty list means the tree is intact.
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

const readLock = () => JSON.parse(fs.readFileSync(LOCK, "utf8"));

module.exports = { CLIENT_DIR, LOCK, sha256, listFiles, verifyTree, readLock };
