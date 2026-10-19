// Calc-U 59 — client-side router.
//
// Lifted out of index.html so the same code can be precompiled once and
// shared by every prerendered page. Each route in routes.js is a real
// static HTML file on disk (built by .seo/build.js), so a crawler or a
// cold visitor gets complete markup with no JavaScript; this file takes
// over afterwards and makes subsequent navigation instant.

// Old #hash links (shared bookmarks, forum posts, the previous sitemap)
// land on the home page and are rewritten in place before React ever renders, so
// they never register as a separate URL.
function redirectLegacyHash() {
  var raw = (window.location.hash || "").replace(/^#/, "");
  if (!raw) return false;
  var target = LEGACY_HASHES[raw];
  if (!target) return false;
  window.location.replace(url(target));
  return true;
}
function useRouter() {
  var initial = matchRoute(window.location.pathname) || matchRoute(url("/"));
  var state = React.useState(initial);
  var route = state[0];
  var setRoute = state[1];
  React.useEffect(function () {
    function onPop() {
      var next = matchRoute(window.location.pathname) || matchRoute(url("/"));
      setRoute(next);
    }
    window.addEventListener("popstate", onPop);
    return function () {
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  // Stable identity: a fresh function each render would tear down and re-add
  // the delegated click listener below on every state change.
  var onNav = React.useCallback(function (href) {
    var path = normalizePath(href);
    if (normalizePath(window.location.pathname) === path) return;
    var next = matchRoute(path);
    if (!next) {
      window.location.href = path;
      return;
    }
    window.history.pushState({}, "", path);
    setRoute(next);
    window.scrollTo(0, 0);
  }, []);
  return {
    route: route,
    onNav: onNav
  };
}

// One delegated listener instead of an onClick on every link: the nav,
// the sidebar and the topic cards all emit ordinary <a href="/59/faq/">, so
// they stay real, crawlable, middle-clickable links and still navigate
// without a reload.
function useLinkInterception(onNav) {
  React.useEffect(function () {
    function onClick(e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) !== "/") return;
      if (!matchRoute(href)) return;
      e.preventDefault();
      onNav(href);
    }
    document.addEventListener("click", onClick);
    return function () {
      document.removeEventListener("click", onClick);
    };
  }, [onNav]);
}
function App() {
  var router = useRouter();
  useLinkInterception(router.onNav);
  return /*#__PURE__*/React.createElement(SitePage, {
    route: router.route
  });
}

// Page id (routes.js) → component.
var PAGE_COMPONENTS = {
  home: HomePage,
  about: AboutTi59Page,
  start: GettingStartedPage,
  play: PlayPage,
  "install-mobile": InstallMobilePage,
  "install-mac": InstallMacPage,
  "install-pc": InstallPcPage,
  presets: PresetsPage,
  "preset-tutorial": PresetTutorialPage,
  debugger: DebuggerPage,
  ref: ReferencePage,
  modules: ModulesPage,
  software: SoftwarePage,
  faq: FaqPage
};

// One route's page between the site header and footer — what the client
// shows and what .seo/build.js prerenders.
function SitePage({
  route
}) {
  var Page = PAGE_COMPONENTS[route.page];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SiteHeader, {
    page: route.page
  }), /*#__PURE__*/React.createElement(Page, {
    key: route.topic,
    topic: route.topic
  }), /*#__PURE__*/React.createElement(SiteFooter, null));
}
if (typeof window !== "undefined" && document.getElementById("root")) {
  if (!redirectLegacyHash()) {
    ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
  }
}
Object.assign(window, {
  App,
  SitePage
});