// Service worker for the standalone Calc-U 59 app (scope: /app/).
// Precaches the app shell plus the calculator's fixed dependencies — the
// WASM engine, the TI-59 ROM files and module 01 (Master Library, the only
// module the app uses — there's no module switcher), and the fonts/scripts
// the calculator face actually renders with — so the installed app opens
// and runs fully offline after the first launch.
//
// CACHE_NAME is the only thing to bump when any precached file's content
// changes; the activate handler drops every cache that doesn't match it.
const CACHE_NAME = "calcu59-app-v4";

const CORE_ASSETS = [
  "/app/",
  "/app/index.html",
  "/app/app.css",
  "/app/app.jsx",
  "/app/manifest.json",

  "/styles.css",

  "/vendor/react.production.min.js",
  "/vendor/react-dom.production.min.js",
  "/vendor/babel.min.js",

  "/Calculator.jsx",
  "/cuecard.jsx",
  "/led-display.jsx",
  "/PlayCalculator.jsx",
  "/calc-engine-worker.js",

  "/colors_and_type.css",
  "/fonts/self-hosted.css",
  "/fonts/archivo-400.woff2",
  "/fonts/archivo-400italic.woff2",
  "/fonts/archivo-500.woff2",
  "/fonts/archivo-600.woff2",
  "/fonts/archivo-600italic.woff2",
  "/fonts/archivo-700.woff2",
  "/fonts/archivo-800.woff2",
  "/fonts/barlow-condensed-600.woff2",
  "/fonts/barlow-condensed-700.woff2",

  "/wasm/ti59-core.js",
  "/wasm/ti59-core.wasm",
  // Module.requiredRomFiles() in docs/wasm/bindings.cpp
  "/wasm/roms/TMC0582.txt",
  "/wasm/roms/TMC0583.txt",
  "/wasm/roms/TMC0571B.txt",
  "/wasm/roms/TMC0582-CONST-K.txt",
  "/wasm/roms/TMC0583-CONST-K.txt",
  "/wasm/roms/cuecards.txt",
  "/wasm/roms/TMC0541.txt",

  "/assets/app-icon.png",
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
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Cache-first: the calculator's own files rarely change and are versioned
// by CACHE_NAME above, not by URL, so serving stale-then-network-updating
// isn't worth the complexity here. Falls back to network for anything not
// precached, and quietly caches same-origin GETs it fetches along the way.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
