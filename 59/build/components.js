function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Calc-U 59 — Reusable components for the help site (React 18 + Babel)

const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

/* =============================================================
   Header / nav
   ============================================================= */
function SiteHeader({
  page
}) {
  // Real paths, not #hashes: every one of these is a static HTML file on
  // disk, so they are crawlable links first and SPA transitions second
  // (site.jsx intercepts the click).
  const items = [{
    id: "home",
    label: "Overview",
    href: "/59/"
  }, {
    id: "start",
    label: "Getting Started",
    href: "/59/getting-started/"
  }, {
    id: "play",
    label: "Play",
    href: "/59/play/"
  }, {
    id: "ref",
    label: "App Reference",
    href: "/59/reference/"
  }, {
    id: "modules",
    label: "Modules",
    href: "/59/modules/"
  }, {
    id: "software",
    label: "Software",
    href: "/59/software/"
  }, {
    id: "faq",
    label: "FAQ",
    href: "/59/faq/"
  }];
  // Under 1060px the links collapse behind a disclosure button (styles.css).
  // They are hidden with CSS rather than unmounted, so the markup a crawler
  // gets from .seo/build.js is identical on both layouts.
  const [menuOpen, setMenuOpen] = useState(false);

  // site.jsx navigates without a reload, so nothing else would ever close
  // the panel — it would sit open on top of the page it just opened.
  useEffect(() => {
    setMenuOpen(false);
  }, [page]);
  return /*#__PURE__*/React.createElement("header", {
    className: "site-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "brand",
    href: "/59/"
  }, /*#__PURE__*/React.createElement("img", {
    className: "app-icon",
    src: "/59/assets/app-icon.png",
    alt: "Calc-U 59 \u2014 TI-59 emulator app icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "top"
  }, "Calc-U ", /*#__PURE__*/React.createElement("em", null, "59")), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "User Guide"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nav-toggle",
    "aria-expanded": menuOpen,
    "aria-controls": "site-nav",
    "aria-label": menuOpen ? "Close menu" : "Open menu",
    onClick: () => setMenuOpen(open => !open)
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-toggle-bars",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))), /*#__PURE__*/React.createElement("div", {
    id: "site-nav",
    className: menuOpen ? "nav-panel open" : "nav-panel",
    onClick: () => setMenuOpen(false)
  }, /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i.id,
    href: i.href,
    className: page === i.id ? "active" : ""
  }, i.label)), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59"
  }, "GitHub")), /*#__PURE__*/React.createElement("a", {
    className: "nav-cta",
    href: "https://apps.apple.com/us/app/calc-u-59/id6761413142",
    title: "Calc-U 59 TI-59 emulator on the App Store"
  }, "App Store"))));
}

/* =============================================================
   Footer
   ============================================================= */
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: "var(--font-key)",
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--fg-2)"
    }
  }, "Calc-U 59"), /*#__PURE__*/React.createElement("a", {
    href: "/59/what-is-a-ti-59/"
  }, "What is a TI-59?"), /*#__PURE__*/React.createElement("a", {
    href: "/59/play/"
  }, "Online emulator"), /*#__PURE__*/React.createElement("a", {
    href: "/59/software/"
  }, "TI-59 Software Collection"), /*#__PURE__*/React.createElement("a", {
    href: "/59/app/"
  }, "Install the web app"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59"
  }, "GitHub"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/blob/main/CHANGELOG.md"
  }, "Release notes"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/blob/main/PRIVACY.md"
  }, "Privacy"), /*#__PURE__*/React.createElement("span", {
    className: "credits"
  }, "\xA9 2026 \xB7 TI-59, TI-58 and TI-58C emulator for Mac, Windows, Linux, iPhone and iPad"), /*#__PURE__*/React.createElement("p", {
    className: "disclaimer"
  }, "Calc-U 59 is an independent project and is not affiliated with, authorized, or endorsed by Texas Instruments. \u201CTI-59\u201D, \u201CTI-58\u201D, \u201CTI-58C\u201D, \u201CTexas Instruments\u201D, \u201CSolid State Software\u201D, and \u201CMaster Library\u201D are trademarks of their respective owners, used here for descriptive purposes only.")));
}

/* =============================================================
   Keystroke pills
   ============================================================= */
function K({
  tone = "dark",
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `k ${tone}`
  }, children);
}
function KSeq({
  steps
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "kseq"
  }, steps.map((s, i) => typeof s === "string" ? /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "sep"
  }, s) : /*#__PURE__*/React.createElement(K, {
    key: i,
    tone: s.tone
  }, s.label)));
}

/* =============================================================
   Topic card
   ============================================================= */
// A real <a href>: a crawlable internal link, which site.jsx's listener turns
// into an in-app navigation.
function TopicCard({
  num,
  eyebrow,
  title,
  children,
  href
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "panel",
    href: href,
    style: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      transition: "border-color .15s, transform .15s",
      textDecoration: "none",
      color: "inherit"
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = "var(--accent-deep)",
    onMouseLeave: e => e.currentTarget.style.borderColor = "var(--stroke)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--led-red)",
      fontSize: 26,
      letterSpacing: ".04em",
      textShadow: "0 0 8px rgba(255,38,20,.4)"
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      margin: 0,
      color: "var(--accent)"
    }
  }, eyebrow)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 22,
      textTransform: "uppercase",
      letterSpacing: ".05em",
      margin: 0,
      color: "var(--fg)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--fg-2)",
      fontSize: 14,
      lineHeight: 1.55
    }
  }, children));
}

/* =============================================================
   Docs sidebar
   ============================================================= */
// Plain links: same-site ones navigate through site.jsx's listener.
function DocsSidebar({
  current,
  sections
}) {
  return (
    /*#__PURE__*/
    // Sizing lives in styles.css (.docs-sidebar) so the 900px breakpoint can
    // turn the rail into a full-width block above the article.
    React.createElement("aside", {
      className: "docs-sidebar"
    }, sections.map(sec => /*#__PURE__*/React.createElement("div", {
      key: sec.title,
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow",
      style: {
        marginBottom: 6,
        color: "var(--fg-3)"
      }
    }, sec.title), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        padding: 0,
        margin: 0
      }
    }, sec.items.map(it => /*#__PURE__*/React.createElement("li", {
      key: it.id
    }, /*#__PURE__*/React.createElement("a", _extends({
      href: it.href
    }, it.external ? {
      target: "_blank",
      rel: "noopener"
    } : {}, {
      style: {
        display: "block",
        padding: "5px 10px",
        marginLeft: -12,
        paddingLeft: 12,
        fontFamily: "var(--font-body)",
        fontSize: 14,
        color: current === it.id ? "var(--fg)" : "var(--fg-2)",
        background: current === it.id ? "rgba(240,192,64,.06)" : "transparent",
        borderLeft: current === it.id ? "2px solid var(--accent)" : "2px solid transparent",
        cursor: "pointer",
        textDecoration: "none"
      }
    }), it.label)))))))
  );
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  K,
  KSeq,
  TopicCard,
  DocsSidebar
});