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
const CACHE_PREFIX = `calcu59-app ${self.registration.scope} `;
const CACHE_NAME = CACHE_PREFIX + "d230e1c2cbe4da40";

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
  "../wasm/calcu59-core.js",
  "../wasm/calcu59-core.wasm",
  "../img/CueCard.png",
  "../img/MagnetCard.png",
  "../img/SolidStateCard.png",
  "../img/ti58_base.png",
  "../img/ti59_base.png",
  "../fonts/Archivo-OFL.txt",
  "../fonts/archivo-400.woff2",
  "../fonts/archivo-700.woff2",
  "../calc.js",
  "../calc.css",
  "../calc-engine-worker.js",
  "../library-worker.js",
  "../audio-worklet.js",
  "../files.json",
  "../bundle/AG.rom.yaml",
  "../bundle/AV.rom.yaml",
  "../bundle/BD.rom.yaml",
  "../bundle/CD2400-CONST-K.txt",
  "../bundle/CD2400.txt",
  "../bundle/CD2401-CONST-K.txt",
  "../bundle/CD2401.txt",
  "../bundle/EE.rom.yaml",
  "../bundle/LE.rom.yaml",
  "../bundle/ML.rom.yaml",
  "../bundle/MU.rom.yaml",
  "../bundle/NG.rom.yaml",
  "../bundle/RE.rom.yaml",
  "../bundle/RP.rom.yaml",
  "../bundle/SA.rom.yaml",
  "../bundle/SE.rom.yaml",
  "../bundle/ST.rom.yaml",
  "../bundle/SY.rom.yaml",
  "../bundle/TMC0571B.txt",
  "../bundle/TMC0573.txt",
  "../bundle/TMC0582-CONST-K.txt",
  "../bundle/TMC0582.txt",
  "../bundle/TMC0583-CONST-K.txt",
  "../bundle/TMC0583.txt",
  "../presets/bundle.yaml",
  "../presets/characters.ti59",
  "../presets/diag.ti58",
  "../presets/diag.ti59",
  "../presets/fastmode-sst.ti59",
  "../presets/globe-print.ti59",
  "../presets/historic/life.ti59",
  "../presets/picard.ti59",
  "../presets/printer-interrupt.ti59",
  "../presets/ram_test.ti59",
  "../presets/startup/default-ti58.ti58",
  "../presets/startup/default-ti58c.ti58c",
  "../presets/startup/default-ti59.ti59",
  "../presets/sum.ti59",
  "../presets/switzerland.ti59"
];

let firstInstall = false;
let askedToTakeOver = false;

self.addEventListener("install", (event) => {
  firstInstall = !self.registration.active;
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch((e) => {
        console.warn(`[Calc-U] The app is not kept for offline use: its files could not be cached: ${e.name}: ${e.message}`);
        throw e;   // the install fails, the release before stays
      })
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
