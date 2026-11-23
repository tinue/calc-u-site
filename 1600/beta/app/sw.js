// The service worker of a product's installed app, scope: dist/app/. Precaches the app page and everything the
// product needs offline -- its code and WASM, the files of files.json (the
// ROMs, the bundled presets and media) and its images -- so the installed
// app starts and runs every model without a network.
//
// library/web/build/dist.js stampServiceWorker() fills in the product's id,
// the list (every path relative to this script, each checked to exist) and
// a hash of the files. The scope is part of the cache's name: the origin
// may be shared with the host site or another product.
//
// A new release: the first install takes over at once;
// a later one waits until no window of the app is open, so a running app
// never mixes the files of two releases, or until a page asks it to take
// over (`skip-waiting`, the page's Reload), and then every page reloads. Its activate removes the older
// caches of this app; the fetch handler answers from this release's cache
// only. The persistent file system is IndexedDB and is never touched here.
const CACHE_PREFIX = `calc-u-1600-app ${self.registration.scope} `;
const CACHE_NAME = CACHE_PREFIX + "eb042d1e2a68d3c8";

const ASSETS = [
  "./",
  "index.html",
  "app.js",
  "app.css",
  "engine-worker.js",
  "manifest.json",
  "icon.png",
  "../vendor/react-dom.production.min.js",
  "../vendor/react.production.min.js",
  "../wasm/calcu1600-core.js",
  "../wasm/calcu1600-core.wasm",
  "../img/icon.png",
  "../img/pc1500.png",
  "../img/pc1500A.png",
  "../img/pc1600.png",
  "../calc.js",
  "../calc.css",
  "../calc-engine-worker.js",
  "../library-worker.js",
  "../audio-worklet.js",
  "../files.json",
  "../bundle/CE-150.ROM",
  "../bundle/CE-158.ROM",
  "../bundle/CE-502B.module.yaml",
  "../bundle/PC-1500_A01.ROM",
  "../bundle/PC-1500_A03.ROM",
  "../bundle/PC-1500_A04.ROM",
  "../bundle/PC1600-LH5803-C000-FFFF-new.bin",
  "../bundle/PC1600-LH5803-C000-FFFF-old.bin",
  "../bundle/PC1600-P0-B0-new.bin",
  "../bundle/PC1600-P0-B0-old.bin",
  "../bundle/PC1600-P1-B0-new.bin",
  "../bundle/PC1600-P1-B0-old.bin",
  "../bundle/PC1600-P1-B3-new.bin",
  "../bundle/PC1600-P1-B3-old.bin",
  "../bundle/PC1600-P1-B3B-new.bin",
  "../bundle/PC1600-P1-B3B-old.bin",
  "../bundle/PC1600-P1-B4-CE1600P-new.bin",
  "../bundle/PC1600-P1-B4-CE1600P-old.bin",
  "../bundle/PC1600-P1-B5-CE1600P-OR-F-new.bin",
  "../bundle/PC1600-P1-B5-CE1600P-OR-F-old.bin",
  "../bundle/PC1600-P2-B6-new.bin",
  "../bundle/PC1600-P2-B6-old.bin",
  "../bundle/blank.cassette.yaml",
  "../bundle/blank.floppy.yaml",
  "../bundle/blank.wav",
  "../bundle/ce151.module.yaml",
  "../bundle/ce155.module.yaml",
  "../bundle/ce1600m.module.yaml",
  "../bundle/ce1601m.module.yaml",
  "../bundle/ce161.module.yaml",
  "../bundle/ce1638.module.yaml",
  "../bundle/ce163f.module.yaml",
  "../bundle/formatted.floppy.yaml",
  "../bundle/superram.module.yaml",
  "../presets/basic/hanoi.bas",
  "../presets/basic/hanoi.pc1600",
  "../presets/bundle.yaml",
  "../presets/machine-code/memtest_1500a.bin",
  "../presets/machine-code/memtest_1500a.pc1500a",
  "../presets/plotter/ascii.bas",
  "../presets/plotter/ascii.pc1600",
  "../presets/plotter/biorhythmus_1600.bas",
  "../presets/plotter/biorhythmus_1600.pc1600",
  "../presets/plotter/globus.bas",
  "../presets/plotter/globus.pc1600",
  "../presets/plotter/lissajou-1500.bas",
  "../presets/plotter/lissajou-1500.pc1500a",
  "../presets/plotter/lissajou-1600.bas",
  "../presets/plotter/lissajou-1600.pc1600",
  "../presets/plotter/rectangles-1600.bas",
  "../presets/plotter/rectangles-1600.pc1600",
  "../presets/startup/default-pc1500.pc1500",
  "../presets/startup/default-pc1500a.pc1500a",
  "../presets/startup/default-pc1600.pc1600"
];

let firstInstall = false;
let askedToTakeOver = false;

self.addEventListener("install", (event) => {
  firstInstall = !self.registration.active;
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => (firstInstall ? self.skipWaiting() : undefined))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => (firstInstall || askedToTakeOver ? self.clients.claim() : undefined))
  );
});

self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "skip-waiting") return;
  askedToTakeOver = true;
  self.skipWaiting();
});

// Cache-first from this release's cache: the files are versioned by
// CACHE_NAME, not by URL.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => cache.match(event.request, { ignoreSearch: true }))
      .then((cached) => cached || fetch(event.request))
  );
});
