// Generated from library/web/app/app.jsx by library/web/build/dist.js. Do not edit.
// The installed app page: the product's component (../calc.js) filling the
// viewport less the safe-area padding, with an install button where the
// browser allows it and a hint on iOS. library/web/build/dist.js compileApp()
// puts in the product's component, its own props and its install sentence.

const {
  useState: useAppState,
  useEffect: useAppEffect,
  useRef: useAppRef
} = React;

// In the service worker's scope, so the engine starts offline (engine-worker.js).
const ENGINE_WORKER_URL = new URL("engine-worker.js", document.currentScript.src).href;
function rootSize(root) {
  const cs = getComputedStyle(root);
  const w = root.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const h = root.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  return {
    width: Math.floor(w),
    height: Math.floor(h)
  };
}

// Install affordance: Chrome/Edge's `beforeinstallprompt` gets a real
// button; iOS/iPadOS has no programmatic install, so it gets a hint. iPadOS
// reports a Mac user agent; touch points tell it apart from a real Mac.
function useInstallPrompt() {
  const [mode, setMode] = useAppState("none");
  const deferredRef = useAppRef(null);
  useAppEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    if (standalone) return undefined;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    if (isIOS) {
      setMode("ios");
      return undefined;
    }
    function onPrompt(e) {
      e.preventDefault();
      deferredRef.current = e;
      setMode("installable");
    }
    function onInstalled() {
      setMode("none");
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  async function install() {
    const evt = deferredRef.current;
    if (!evt) return;
    evt.prompt();
    await evt.userChoice;
    deferredRef.current = null;
    setMode("none");
  }
  return [mode, install];
}
function SymbolShare({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.5",
    y: "4",
    width: "17",
    height: "16",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 14 V 7 M9 10 L 12 7 L 15 10"
  }));
}
function InstallBanner({
  mode,
  onInstall,
  onDismiss
}) {
  if (mode === "none") return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "install-banner"
  }, mode === "ios" && /*#__PURE__*/React.createElement(SymbolShare, {
    size: 16,
    color: "#0a84ff"
  }), /*#__PURE__*/React.createElement("span", {
    className: "install-banner-text"
  }, mode === "installable" ? "Install Calc-U 59 for one-tap, full-screen launches." : "Add to Home Screen: tap Share, then “Add to Home Screen”."), mode === "installable" && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "install-banner-cta",
    onClick: onInstall
  }, "Install"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "install-banner-close",
    "aria-label": "Dismiss",
    onClick: onDismiss
  }, "\xD7"));
}
function StandaloneApp() {
  const [size, setSize] = useAppState(() => rootSize(document.getElementById("root")));
  const [installMode, install] = useInstallPrompt();
  const [dismissed, setDismissed] = useAppState(false);

  // A ResizeObserver also sees the safe-area insets arrive after launch.
  useAppEffect(() => {
    const root = document.getElementById("root");
    const update = () => setSize(old => {
      const s = rootSize(root);
      return s.width === old.width && s.height === old.height ? old : s;
    });
    const observer = new ResizeObserver(update);
    observer.observe(root);
    window.addEventListener("pageshow", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", update);
    };
  }, []);

  // WebKit in a Home Screen app can come back from a rotation scrolled by
  // the status bar's height while drawing as if it weren't: undo it.
  useAppEffect(() => {
    const unscroll = () => {
      if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
    };
    const viewport = window.visualViewport;
    window.addEventListener("scroll", unscroll);
    window.addEventListener("resize", unscroll);
    if (viewport) viewport.addEventListener("scroll", unscroll);
    return () => {
      window.removeEventListener("scroll", unscroll);
      window.removeEventListener("resize", unscroll);
      if (viewport) viewport.removeEventListener("scroll", unscroll);
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CalcU59, {
    "layout": "auto",
    width: size.width,
    height: size.height,
    keyboard: true,
    workerUrl: ENGINE_WORKER_URL
  }), !dismissed && /*#__PURE__*/React.createElement(InstallBanner, {
    mode: installMode,
    onInstall: install,
    onDismiss: () => setDismissed(true)
  }));
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(new URL("sw.js", document.currentScript.src));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(StandaloneApp, null));