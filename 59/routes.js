// Calc-U 59 — single source of truth for the site's URL map.
//
// Loaded twice, deliberately:
//   • in the browser, by site.jsx, to turn a pathname into a page id
//   • in Node, by .seo/build.js, to prerender one static HTML file per
//     route and to emit sitemap.xml
//
// Every indexable page needs a real path here. Hash URLs (#faq) are the
// old scheme and survive only as redirects — see LEGACY_HASHES.
//
// Paths below are relative to the site, which lives under BASE on
// calc-u.org: route "/faq/" is the address "/59/faq/". url() makes the
// address, matchRoute() takes one. Links written directly in the page
// text carry the "/59" prefix themselves; .seo/check.js fails the build
// on any root-relative URL without it.
(function (factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (typeof window !== "undefined") Object.assign(window, api);
})(function () {
  // canonical: omit for self-canonical (indexable). Set it when the route
  // is a real URL a visitor can reach but a near-duplicate of another page,
  // so search engines consolidate onto the primary.
  var ROUTES = [
    { path: "/",          page: "home" },
    { path: "/play/",     page: "play" },
    { path: "/software/", page: "software" }
  ];

  // The help is not a route: it is built from the pinned help asset into
  // /59/help/ (.help/render.js), as static pages without React, and a link
  // to it is an ordinary page load. The addresses of the old hand-written
  // help pages are redirects (REDIRECTS in redirects.js).

  // Old #hash URLs → where their content is now. site.jsx rewrites them
  // with location.replace on first paint of the home page.
  var LEGACY_HASHES = {
    "":                       "/",
    "home":                   "/",
    "play":                   "/play/",
    "start":                  "/help/02-getting-started/getting-started/",
    "start/install-mobile":   "/help/02-getting-started/installing/#iphone-and-ipad",
    "start/install-mac":      "/help/02-getting-started/installing/#mac-windows-and-linux",
    "start/state-files":      "/help/06-presets/presets/",
    "start/debugger":         "/help/07-debugger/",
    "start/printer":          "/help/05-peripherals-and-paper/printer/",
    "start/faq":              "/help/09-product-topics/faq/",
    "start/readme":           "/help/",
    "install-mobile":         "/help/02-getting-started/installing/#iphone-and-ipad",
    "install-mac":            "/help/02-getting-started/installing/#mac-windows-and-linux",
    "state-files":            "/help/06-presets/presets/",
    "debugger":               "/help/07-debugger/",
    "ref":                    "/help/02-getting-started/getting-started/",
    "modules":                "/help/09-product-topics/modules/",
    "faq":                    "/help/09-product-topics/faq/"
  };

  var BASE = "/59";

  // Site path → address on calc-u.org.
  function url(p) {
    return BASE + p;
  }

  // Trailing slash is canonical; "/faq" and "/faq/" resolve identically.
  function normalizePath(pathname) {
    var p = (pathname || "/").split("?")[0].split("#")[0];
    if (p.charAt(0) !== "/") p = "/" + p;
    if (p.slice(-1) !== "/") p += "/";
    return p;
  }

  // Takes an address ("/59/faq/"); anything outside BASE matches nothing.
  function matchRoute(pathname) {
    var p = normalizePath(pathname);
    if (p.indexOf(BASE + "/") !== 0) return null;
    p = p.slice(BASE.length);
    for (var i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].path === p) return ROUTES[i];
    }
    return null;
  }

  return {
    ROUTES: ROUTES,
    LEGACY_HASHES: LEGACY_HASHES,
    BASE: BASE,
    url: url,
    normalizePath: normalizePath,
    matchRoute: matchRoute,
    ORIGIN: "https://calc-u.org"
  };
});
