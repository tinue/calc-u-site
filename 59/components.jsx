// Calc-U 59 — Reusable components for the help site (React 18 + Babel)

const { useState, useEffect, useRef, useMemo } = React;

/* =============================================================
   Header / nav
   ============================================================= */
function SiteHeader({ page }) {
  // Real paths, not #hashes: every one of these is a static HTML file on
  // disk, so they are crawlable links first and SPA transitions second
  // (site.jsx intercepts the click).
  const items = [
    { id: "home",     label: "Overview",        href: "/59/" },
    { id: "start",    label: "Getting Started", href: "/59/getting-started/" },
    { id: "play",     label: "Play",            href: "/59/play/" },
    { id: "ref",      label: "App Reference",   href: "/59/reference/" },
    { id: "modules",  label: "Modules",         href: "/59/modules/" },
    { id: "software", label: "Software",        href: "/59/software/" },
    { id: "faq",      label: "FAQ",             href: "/59/faq/" },
  ];
  // Under 1060px the links collapse behind a disclosure button (styles.css).
  // They are hidden with CSS rather than unmounted, so the markup a crawler
  // gets from .seo/build.js is identical on both layouts.
  const [menuOpen, setMenuOpen] = useState(false);

  // site.jsx navigates without a reload, so nothing else would ever close
  // the panel — it would sit open on top of the page it just opened.
  useEffect(() => { setMenuOpen(false); }, [page]);

  return (
    <header className="site-header">
      <div className="inner">
        <a className="brand" href="/59/">
          <img className="app-icon" src="/59/assets/app-icon.png" alt="Calc-U 59 — TI-59 emulator app icon" />
          <div className="wm">
            <span className="top">Calc-U <em>59</em></span>
            <span className="sub">User Guide</span>
          </div>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(open => !open)}>
          {/* Three bars drawn in CSS. No icon library, per the design rules. */}
          <span className="nav-toggle-bars" aria-hidden="true"><i /><i /><i /></span>
        </button>
        {/* Closes on any click inside: an in-site link is intercepted into an
            SPA transition, and an external one leaves anyway. */}
        <div id="site-nav"
             className={menuOpen ? "nav-panel open" : "nav-panel"}
             onClick={() => setMenuOpen(false)}>
          <nav className="nav">
            {items.map(i => (
              <a key={i.id}
                 href={i.href}
                 className={page === i.id ? "active" : ""}>
                {i.label}
              </a>
            ))}
            <a href="https://github.com/tinue/Calc-U-59">GitHub</a>
          </nav>
          <a className="nav-cta" href="https://apps.apple.com/us/app/calc-u-59/id6761413142" title="Calc-U 59 TI-59 emulator on the App Store">App Store</a>
        </div>
      </div>
    </header>
  );
}

/* =============================================================
   Footer
   ============================================================= */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <strong style={{
          fontFamily: "var(--font-key)",
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "var(--fg-2)",
        }}>Calc-U 59</strong>
        <a href="/59/what-is-a-ti-59/">What is a TI-59?</a>
        <a href="/59/play/">Online emulator</a>
        <a href="/59/software/">TI-59 Software Collection</a>
        {/* /app/ is the calculator alone, installable to a phone's home
            screen — deliberately not a route (see routes.js) or a nav item,
            so this is its only link from inside the site. Kept out of
            robots.txt's crawl on purpose (see the Disallow comment there):
            it would otherwise compete with /play/ for the same searches. */}
        <a href="/59/calc/app/">Install the web app</a>
        <a href="https://github.com/tinue/Calc-U-59">GitHub</a>
        <a href="https://github.com/tinue/Calc-U-59/blob/main/CHANGELOG.md">Release notes</a>
        <a href="https://github.com/tinue/Calc-U-59/blob/main/PRIVACY.md">Privacy</a>
        <span className="credits">© 2026 · TI-59, TI-58 and TI-58C emulator for Mac, Windows, Linux, iPhone and iPad</span>
        <p className="disclaimer">
          Calc-U 59 is an independent project and is not affiliated with, authorized,
          or endorsed by Texas Instruments. “TI-59”, “TI-58”, “TI-58C”, “Texas
          Instruments”, “Solid State Software”, and “Master Library” are trademarks of
          their respective owners, used here for descriptive purposes only.
        </p>
      </div>
    </footer>
  );
}

/* =============================================================
   Keystroke pills
   ============================================================= */
function K({ tone = "dark", children }) {
  return <span className={`k ${tone}`}>{children}</span>;
}
function KSeq({ steps }) {
  return (
    <span className="kseq">
      {steps.map((s, i) =>
        typeof s === "string"
          ? <span key={i} className="sep">{s}</span>
          : <K key={i} tone={s.tone}>{s.label}</K>
      )}
    </span>
  );
}

/* =============================================================
   Topic card
   ============================================================= */
// A real <a href>: a crawlable internal link, which site.jsx's listener turns
// into an in-app navigation.
function TopicCard({ num, eyebrow, title, children, href }) {
  return (
    <a className="panel" href={href}
         style={{
           cursor: "pointer",
           display: "flex", flexDirection: "column", gap: 10,
           transition: "border-color .15s, transform .15s",
           textDecoration: "none", color: "inherit",
         }}
         onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent-deep)"}
         onMouseLeave={e => e.currentTarget.style.borderColor = "var(--stroke)"}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{
          fontFamily: "var(--font-display)",
          color: "var(--led-red)",
          fontSize: 26,
          letterSpacing: ".04em",
          textShadow: "0 0 8px rgba(255,38,20,.4)",
        }}>{num}</span>
        <span className="eyebrow" style={{ margin: 0, color: "var(--accent)" }}>{eyebrow}</span>
      </div>
      <h3 style={{
        fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 22,
        textTransform: "uppercase", letterSpacing: ".05em",
        margin: 0, color: "var(--fg)",
      }}>{title}</h3>
      <div style={{ color: "var(--fg-2)", fontSize: 14, lineHeight: 1.55 }}>{children}</div>
    </a>
  );
}

/* =============================================================
   Docs sidebar
   ============================================================= */
// Plain links: same-site ones navigate through site.jsx's listener.
function DocsSidebar({ current, sections }) {
  return (
    // Sizing lives in styles.css (.docs-sidebar) so the 900px breakpoint can
    // turn the rail into a full-width block above the article.
    <aside className="docs-sidebar">
      {sections.map(sec => (
        <div key={sec.title} style={{ marginBottom: 24 }}>
          <div className="eyebrow" style={{ marginBottom: 6, color: "var(--fg-3)" }}>{sec.title}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sec.items.map(it => (
              <li key={it.id}>
                <a
                  href={it.href}
                  {...(it.external ? { target: "_blank", rel: "noopener" } : {})}
                  style={{
                    display: "block",
                    padding: "5px 10px", marginLeft: -12, paddingLeft: 12,
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: current === it.id ? "var(--fg)" : "var(--fg-2)",
                    background: current === it.id ? "rgba(240,192,64,.06)" : "transparent",
                    borderLeft: current === it.id ? "2px solid var(--accent)" : "2px solid transparent",
                    cursor: "pointer", textDecoration: "none",
                  }}>
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

Object.assign(window, {
  SiteHeader, SiteFooter, K, KSeq, TopicCard, DocsSidebar
});


