#!/usr/bin/env node
//
// Calc-U 59 — install the web client into calc/.
//
//   node .seo/fetch-web-client.js               the build web-client.json pins
//   node .seo/fetch-web-client.js --pin <url>   pin another release asset, install it
//   node .seo/fetch-web-client.js --local <dir> a local Web/dist/, for testing only
//
// The client is built in the Calc-U-59 repository (Web/build.sh, CI attaches
// it to each release as Calc-U-59-web.zip) and unpacked here unchanged.
// Every install checks the zip against the pinned sha256 and the tree
// against its MANIFEST.json, then replaces calc/ as a whole.
//
// --local leaves web-client.json alone, so check.js fails until a pinned
// build is installed again: a local build cannot be published by accident.
//
// Needs node 18+ (fetch) and unzip.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { CLIENT_DIR, LOCK, sha256, verifyTree, readLock } = require("./webclient.js");

function fail(msg) {
  console.error(`fetch-web-client: ${msg}`);
  process.exit(1);
}

async function download(url, file) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) fail(`${url}: HTTP ${res.status}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

function install(dir) {
  const { manifest, problems } = verifyTree(dir);
  if (problems.length) fail(`build does not match its MANIFEST.json:\n  ${problems.join("\n  ")}`);
  fs.rmSync(CLIENT_DIR, { recursive: true, force: true });
  fs.cpSync(dir, CLIENT_DIR, { recursive: true });
  console.log(`installed ${manifest.name} ${manifest.version} (${manifest.commit}) into calc/`);
  return manifest;
}

async function main() {
  const args = process.argv.slice(2);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "calcu59-web-"));
  try {
    if (args[0] === "--local") {
      if (!args[1]) fail("--local needs the path of a Web/dist/ folder");
      install(path.resolve(args[1]));
      console.log("not pinned: check.js fails until a pinned build is installed again");
      return;
    }

    let lock;
    if (args[0] === "--pin") {
      if (!args[1]) fail("--pin needs the URL of a Calc-U-59-web.zip release asset");
      lock = { url: args[1] };
    } else if (args.length === 0) {
      lock = readLock();
    } else {
      fail(`unknown arguments: ${args.join(" ")}`);
    }

    const zip = path.join(tmp, "web.zip");
    await download(lock.url, zip);
    const hash = sha256(zip);
    if (lock.sha256 && hash !== lock.sha256) {
      fail(`${lock.url} has changed (sha256 ${hash}, pinned ${lock.sha256}).\n` +
           `If the new build is intended, pin it again with --pin.`);
    }
    const unpacked = path.join(tmp, "dist");
    execFileSync("unzip", ["-q", zip, "-d", unpacked]);
    const manifest = install(unpacked);

    if (args[0] === "--pin") {
      const pinned = { url: lock.url, sha256: hash, version: manifest.version, commit: manifest.commit };
      fs.writeFileSync(LOCK, JSON.stringify(pinned, null, 2) + "\n");
      console.log(`pinned in ${path.basename(LOCK)}`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((e) => fail(e.message));
