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
    { path: "/",                                     page: "home" },
    { path: "/what-is-a-ti-59/",                     page: "about" },
    { path: "/play/",                                page: "play" },
    { path: "/getting-started/",                     page: "start", topic: "overview" },
    { path: "/install/iphone-ipad/",                 page: "install-mobile" },
    { path: "/install/mac/",                         page: "install-mac" },
    { path: "/install/windows-linux/",               page: "install-pc" },
    { path: "/presets/",                             page: "presets" },
    { path: "/presets/tutorial/",                    page: "preset-tutorial" },
    { path: "/debugger/",                            page: "debugger" },
    { path: "/reference/",                           page: "ref" },
    { path: "/modules/",                             page: "modules" },
    { path: "/software/",                            page: "software" },
    { path: "/faq/",                                 page: "faq" },

    // "State files" was the old name for what the app UI (and now the
    // site) calls a "preset". Both real URLs below still resolve — old
    // links and bookmarks keep working — but their canonical points at
    // the current name so search engines consolidate onto it.
    { path: "/state-files/",                         page: "presets", canonical: "/presets/" },

    // Old Getting Started deep links. Those topics became the standalone
    // pages, so each URL now shows that page and points its canonical at
    // it; "printer" is still a topic of /getting-started/ itself.
    { path: "/getting-started/install-iphone-ipad/", page: "install-mobile", canonical: "/install/iphone-ipad/" },
    { path: "/getting-started/install-mac/",         page: "install-mac",    canonical: "/install/mac/" },
    { path: "/getting-started/presets/",             page: "presets",        canonical: "/presets/" },
    { path: "/getting-started/debugger/",            page: "debugger",       canonical: "/debugger/" },
    { path: "/getting-started/state-files/",         page: "presets",        canonical: "/presets/" },
    { path: "/getting-started/printer/",             page: "start", topic: "printer" }
  ];

  // Old #hash URLs → new paths. Anything already shared or linked keeps
  // working; site.jsx rewrites them with location.replace on first paint.
  var LEGACY_HASHES = {
    "":                       "/",
    "home":                   "/",
    "play":                   "/play/",
    "start":                  "/getting-started/",
    "start/install-mobile":   "/getting-started/install-iphone-ipad/",
    "start/install-mac":      "/getting-started/install-mac/",
    "start/state-files":      "/getting-started/state-files/",
    "start/debugger":         "/getting-started/debugger/",
    "start/printer":          "/getting-started/printer/",
    "start/faq":              "/faq/",
    // The README is no longer a page here, only a link out to GitHub.
    "start/readme":           "/getting-started/",
    "install-mobile":         "/install/iphone-ipad/",
    "install-mac":            "/install/mac/",
    "state-files":            "/state-files/",
    "debugger":               "/debugger/",
    "ref":                    "/reference/",
    "modules":                "/modules/",
    "faq":                    "/faq/"
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
