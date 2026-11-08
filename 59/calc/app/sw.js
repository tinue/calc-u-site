// Service worker for the standalone Calc-U 59 app (scope: this directory).
// Precaches the app shell plus everything the calculator needs to run all
// three models offline — the WASM engine, every model's ROM and constants,
// the artwork, every Solid State module, the presets, the fonts and scripts —
// so the installed app opens and runs fully offline after the first launch.
//
// Every path is relative to this script, so the app works wherever the
// client is hosted. Web/build.js checks that each one exists in dist/ and
// stamps CACHE_NAME with a hash of their contents; the activate handler
// drops this app's older caches. The scope is part of the name: the origin
// may be shared with the host site, or with another copy of the client.
const CACHE_PREFIX = `calcu59-app ${self.registration.scope} `;
const CACHE_NAME = CACHE_PREFIX + "c85c3add71f4d18d";

const CORE_ASSETS = [
  "./",
  "index.html",
  "app.css",
  "app.js",
  "engine-worker.js",
  "manifest.json",
  "icon.png",

  "../vendor/react.production.min.js",
  "../vendor/react-dom.production.min.js",

  "../calc.js",
  "../calc.css",
  "../calc-engine-worker.js",

  "../fonts/archivo-400.woff2",
  "../fonts/archivo-700.woff2",

  "../img/ti59_base.png",
  "../img/ti58_base.png",
  "../img/CueCard.png",
  "../img/MagnetCard.png",
  "../img/SolidStateCard.png",

  "../presets/manifest.json",

  "../wasm/ti59-core.js",
  "../wasm/ti59-core.wasm",
  // Every file in wasm/roms/ and every preset; Web/build.js fills them in.
  "../wasm/roms/CD2400-CONST-K.txt",
  "../wasm/roms/CD2400.txt",
  "../wasm/roms/CD2401-CONST-K.txt",
  "../wasm/roms/CD2401.txt",
  "../wasm/roms/TMC0541.txt",
  "../wasm/roms/TMC0542.txt",
  "../wasm/roms/TMC0543.txt",
  "../wasm/roms/TMC0544.txt",
  "../wasm/roms/TMC0545.txt",
  "../wasm/roms/TMC0546.txt",
  "../wasm/roms/TMC0547.txt",
  "../wasm/roms/TMC0548.txt",
  "../wasm/roms/TMC0549.txt",
  "../wasm/roms/TMC0550.txt",
  "../wasm/roms/TMC0551.txt",
  "../wasm/roms/TMC0553.txt",
  "../wasm/roms/TMC0554.txt",
  "../wasm/roms/TMC0555.txt",
  "../wasm/roms/TMC0571B.txt",
  "../wasm/roms/TMC0573.txt",
  "../wasm/roms/TMC0582-CONST-K.txt",
  "../wasm/roms/TMC0582.txt",
  "../wasm/roms/TMC0583-CONST-K.txt",
  "../wasm/roms/TMC0583.txt",
  "../wasm/roms/cuecards.txt",
  "../presets/diag.ti59",
  "../presets/diag.ti58",
  "../presets/ram_test.ti59",
  "../presets/sum.ti59",
  "../presets/characters.ti59",
  "../presets/printer-interrupt.ti59",
  "../presets/picard.ti59",
  "../presets/globe-print.ti59",
  "../presets/switzerland.ti59",
  "../presets/fastmode-sst.ti59"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Cache-first: the calculator's own files are versioned by CACHE_NAME
// above, not by URL, so serving stale-then-network-updating isn't worth the
// complexity here. Falls back to network for anything not precached.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
