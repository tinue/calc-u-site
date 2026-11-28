// Generated from library/web/src/ by library/web/build/dist.js. Do not edit.
/* === appLog.js === */
// The page's app log: how the app ran (library/applog). A page cannot write a
// file, so each line goes to the browser's console at its level and the last
// CALCU_APP_LOG_KEEP lines are kept for Help ▸ Show App Log (a download).
// The worker's lines arrive filtered at the session's level (the setting
// `[app-log] level`, or `?app-log-level=` for this run); the page's own
// lines are warn and error, plus info and debug when the URL asks for them.
//
//   calcuAppLog(level, text)   level: "error" | "warn" | "info" | "debug"
//   calcuAppLogText()          the kept lines, one per line, for the download
//   calcuAppLogLevelOfPage()   the `?app-log-level=` of the page's URL, or ""
//   calcuErrorText(e)          "<name>: <message>" of a thrown value
//
// In the worker (library-worker.js) a line is filtered by the worker's URL,
// which carries the page's `?app-log-level=`, and posted to the page as
// {kind: "app-log", level, text}: it lands in the page's kept lines too.

const CALCU_APP_LOG_KEEP = 2000;
const CALCU_APP_LOG_LEVELS = ["error", "warn", "info", "debug"];
const calcuAppLogLines = [];

function calcuAppLogLevelOfPage() {
  if (typeof location === "undefined") return "";
  const m = /[?&]app-log-level=([a-z]+)/.exec(location.search);
  return m && CALCU_APP_LOG_LEVELS.includes(m[1]) ? m[1] : "";
}

function calcuAppLogStamp(d) {
  const p = (n, w) => String(n).padStart(w || 2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:` +
    `${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
}

// A line's text as applog::formatLine writes it, since the page logs before
// the worker exists: no carriage returns, the lines after the first indented
// by two spaces, no trailing spaces or line breaks.
function calcuAppLogBody(text) {
  return String(text).replace(/\r/g, "").replace(/\n/g, "\n  ").replace(/[ \n]+$/, "");
}

function calcuErrorText(e) {
  if (e && typeof e === "object" && (e.name || e.message)) {
    const errno = typeof e.errno === "number" ? ` (errno ${e.errno})` : "";   // Emscripten's FS errors
    return `${e.name || "Error"}: ${e.message || ""}${errno}`;
  }
  return String(e);
}

const CALCU_APP_LOG_IN_WORKER = typeof WorkerGlobalScope !== "undefined" && typeof self !== "undefined" &&
  self instanceof WorkerGlobalScope;

// `fromWorker`: the line was filtered in the worker already.
function calcuAppLog(level, text, fromWorker) {
  const at = CALCU_APP_LOG_LEVELS.indexOf(level);
  const lvl = at < 0 ? "warn" : level;
  if (!fromWorker) {
    const page = CALCU_APP_LOG_LEVELS.indexOf(calcuAppLogLevelOfPage() || "warn");
    if (CALCU_APP_LOG_LEVELS.indexOf(lvl) > page) return;
  }
  if (CALCU_APP_LOG_IN_WORKER) {
    postMessage({ kind: "app-log", level: lvl, text: String(text) });
    return;
  }
  const body = calcuAppLogBody(text);
  calcuAppLogLines.push(`${calcuAppLogStamp(new Date())} ${lvl.toUpperCase().padEnd(5)} ${body}`.replace(/ +$/, ""));
  if (calcuAppLogLines.length > CALCU_APP_LOG_KEEP) calcuAppLogLines.splice(0, calcuAppLogLines.length - CALCU_APP_LOG_KEEP);
  if (typeof console !== "undefined") {
    const out = console[lvl] || console.log;
    out.call(console, `[Calc-U] ${body}`);
  }
}

function calcuAppLogText() {
  return calcuAppLogLines.length ? `${calcuAppLogLines.join("\n")}\n` : "";
}

/* === sentences.js === */
// The sentences a Web frontend shows about its start and its storage: the same for every
// product, with the product's name. Concatenated into a product's calc.js
// (the page) and into dist/library-worker.js (the worker).

const CALCU_SENTENCES = {
  // The page shows it instead of going on with "starting".
  startFailed: (product, why) => `${product} could not start${why ? `: ${why}` : "."}`,
  // The same, for a failure once it ran.
  stopped: (product, why) => `${product} stopped${why ? `: ${why}` : "."}`,
  starting: (product) => `Starting ${product}…`,
  // Another copy of the product holds the store.
  secondCopy: (product) => `${product} is open in another tab or window: what you save here is not kept.`,
  // What could not be read is left as it is.
  unreadable: (product) =>
    `${product} could not read its saved files: they are left as they are, and what you save here is not kept.`,
  // Private mode or a full store.
  unavailable: (product) => `This browser keeps no files for ${product} here: what you save is not kept.`,
};

/* === storage.js === */
// The persistent file system, worker side. One IDBFS mount per product (its
// database is named after the mount point, so two products on one origin
// never share one), written by one copy only (Web Locks), never written over
// when it could not be read.
//
//   kept         the lock is held, or there is no lock API, and the
//                read succeeded: every write, rename and delete is kept
//   second-copy  another copy holds the lock: read once, kept in memory
//   unreadable   the read failed: in memory, nothing goes to the store
//   unavailable  IndexedDB cannot be opened, or a write was refused (a
//                full store): in memory
//
// The automatic persistence is IDBFS's autoPersist, with the library's own
// queue in place of IDBFS.queuePersist: it is shut until the read succeeded
// in mode `kept`, and it reports a refused write.

// Whether IndexedDB opens at all (private mode as such cannot be told).
function calcuCanOpenIndexedDb(name) {
  return new Promise((resolve) => {
    try {
      if (typeof indexedDB === "undefined" || !indexedDB) { resolve(false); return; }
      const request = indexedDB.open(name);
      request.onsuccess = () => { request.result.close(); resolve(true); };
      request.onerror = () => {
        calcuAppLog("warn", `storage: IndexedDB ${name} cannot be opened: ${calcuErrorText(request.error)}`);
        resolve(false);
      };
      request.onblocked = () => resolve(true);
    } catch (e) {
      calcuAppLog("warn", `storage: IndexedDB ${name} cannot be opened: ${calcuErrorText(e)}`);
      resolve(false);
    }
  });
}

// Whether this copy may write: it holds the lock for the rest of its life,
// or there is no lock API (plain HTTP).
function calcuAcquireStorageLock(name) {
  if (!(self.navigator && navigator.locks && navigator.locks.request)) return Promise.resolve(true);
  return new Promise((resolve) => {
    navigator.locks.request(name, { ifAvailable: true }, (lock) => {
      resolve(!!lock);
      return lock ? new Promise(() => {}) : undefined;  // held while the worker lives
    }).catch((e) => {
      calcuAppLog("warn", `storage: the lock ${name} could not be asked for: ${calcuErrorText(e)}; this copy writes.`);
      resolve(true);
    });
  });
}

// Mounts the product's store at `config.mount`; resolves with
// {mode, sentence}. `onRefused(state)` is told when a write is refused later.
async function calcuOpenStorage(Module, config, onRefused) {
  const FS = Module.FS;
  const IDBFS = Module.IDBFS;
  const product = config.name;
  const memory = (mode, sentence) => ({ mode, sentence: sentence(product) });
  FS.mkdir(config.mount);

  if (!(await calcuCanOpenIndexedDb(config.mount))) return memory("unavailable", CALCU_SENTENCES.unavailable);
  const writer = await calcuAcquireStorageLock(config.lock);

  let open = false;
  const persist = (mount) => {
    const done = (err) => {
      if (err && open) {
        open = false;
        calcuAppLog("warn", `storage: writing ${config.mount} failed: ${calcuErrorText(err)}; nothing more is kept.`);
        if (onRefused) onRefused(memory("unavailable", CALCU_SENTENCES.unavailable));
      }
      if (mount.calcuPersist === "again") start();
      else mount.calcuPersist = 0;
    };
    const start = () => {
      mount.calcuPersist = "running";
      try {
        IDBFS.syncfs(mount, false, done);
      } catch (e) {
        done(e);
      }
    };
    if (!mount.calcuPersist) mount.calcuPersist = setTimeout(start, 0);
    else if (mount.calcuPersist === "running") mount.calcuPersist = "again";
  };
  IDBFS.queuePersist = (mount) => { if (open) persist(mount); };

  FS.mount(IDBFS, { autoPersist: true }, config.mount);
  const err = await new Promise((resolve) => {
    try {
      FS.syncfs(true, (e) => resolve(e || null));
    } catch (e) {
      resolve(e);
    }
  });
  if (err) {
    calcuAppLog("warn", `storage: ${config.mount} could not be read: ${calcuErrorText(err)}; nothing is kept.`);
    return memory("unreadable", CALCU_SENTENCES.unreadable);
  }
  if (!writer) return memory("second-copy", CALCU_SENTENCES.secondCopy);
  open = true;
  return { mode: "kept", sentence: "" };
}

/* === worker.js === */
// The library's Web Worker: loads
// the product's WASM, writes every file of files.json into the file system,
// opens the persistent file system (storage.js), builds the product's
// WorkerHost and calls it about 60 times a second. Everything it passes is a
// session message in its JS form (glue/MessageCodec.hpp); the start failure
// is the state topic `web.start` in the same shape.
//
// A product's calc-engine-worker.js names the product, then loads this file:
//
//   self.CALCU_PRODUCT = { name, wasm, factory, host, mount, lock };
//   importScripts(`${self.CALC_ROOT || ""}library-worker.js`);
//
// File system: /bundle and /presets (files.json), /uploads (picked files),
// <mount> (the persistent file system: settings/<Product>/<Product>.ini,
// the save folder <Product>/ and the file cache cache/).

(function () {
  const CONFIG = self.CALCU_PRODUCT;
  const ROOT = self.CALC_ROOT || "";
  const WASM_DIR = `${ROOT}wasm/`;
  const FRAME_MS = 1000 / 60;

  let Module = null;
  let host = null;
  let loop = null;
  let failed = false;
  let suspended = false;
  const pending = [];

  // `detail`: what only the app log gets (the stack, what was handled).
  const postStart = (state, failure, detail) =>
    postMessage({ kind: "state", topic: "web.start", value: { state, failure: failure || "", detail: detail || "" } });

  function errorText(e) {
    if (Module && typeof WebAssembly !== "undefined" && WebAssembly.Exception && e instanceof WebAssembly.Exception &&
        Module.getExceptionMessage) {
      try {
        const [type, message] = Module.getExceptionMessage(e);
        return message || type;
      } catch (_) { /* fall through */ }
    }
    return String((e && e.message) || e);
  }

  // The app log's part of a failure: where it happened and the stack.
  function errorDetail(where, e) {
    const stack = e && typeof e.stack === "string" ? e.stack : "";
    return stack ? `${where}\n${stack}` : where;
  }

  function stopLoop() {
    if (loop === null) return;
    clearInterval(loop);
    loop = null;
  }

  function fail(why, detail) {
    if (failed) return;
    failed = true;
    stopLoop();
    host = null;
    postStart("failed", why, detail);
  }

  let lastTick = null;
  // The pace of the calls, once a second, once the page asks for it (its
  // `?pace=1` line, shell.js): ticks, the time spent in them, the longest gap.
  let measurePace = false;
  const pace = { since: null, ticks: 0, busy: 0, longest: 0 };
  function tick() {
    if (!measurePace) {
      try {
        host.call();
      } catch (e) {
        fail(errorText(e), errorDetail("in the host's call", e));
      }
      return;
    }
    const start = performance.now();
    if (lastTick !== null) pace.longest = Math.max(pace.longest, start - lastTick);
    lastTick = start;
    try {
      host.call();
    } catch (e) {
      fail(errorText(e), errorDetail("in the host's call", e));
    }
    const end = performance.now();
    pace.ticks += 1;
    pace.busy += end - start;
    if (pace.since === null) pace.since = start;
    if (end - pace.since >= 1000) {
      const secs = (end - pace.since) / 1000;
      postMessage({ kind: "state", topic: "web.pace", value: {
        ticksPerSecond: Math.round(pace.ticks / secs),
        busyPercent: Math.round(pace.busy / (end - pace.since) * 100), longestGapMs: Math.round(pace.longest) } });
      Object.assign(pace, { since: end, ticks: 0, busy: 0, longest: 0 });
    }
  }

  function startLoop() {
    if (loop === null && host && !failed && !suspended) loop = setInterval(tick, FRAME_MS);
  }

  // A message from the page: to the host; suspend and continue also stop and
  // start the calls, the command first.
  function handle(m) {
    if (m.kind === "pace") { measurePace = true; return; }
    if (!host) return;
    try {
      host.receive(m);
    } catch (e) {
      const what = [m.kind, m.name || m.topic, m.call ? `call ${m.call}` : ""].filter(Boolean).join(" ");
      fail(errorText(e), errorDetail(`handling the message ${what}`, e));
      return;
    }
    if (m.kind === "command" && m.name === "suspend") {
      suspended = true;
      stopLoop();
    } else if (m.kind === "command" && m.name === "continue") {
      suspended = false;
      startLoop();
    }
  }

  async function fetchBytes(path) {
    let r;
    try {
      r = await fetch(`${ROOT}${path}`);
    } catch (e) {
      throw new Error(`${path} could not be fetched (${errorText(e)})`);
    }
    if (!r.ok) throw new Error(`${path} could not be fetched (${r.status})`);
    return new Uint8Array(await r.arrayBuffer());
  }

  function writeTree(FS, root, files) {
    for (const [rel, bytes] of files) {
      const parts = `${root}/${rel}`.split("/").filter(Boolean);
      let dir = "";
      for (const part of parts.slice(0, -1)) {
        dir += `/${part}`;
        try { FS.mkdir(dir); } catch (_) { /* exists */ }
      }
      FS.writeFile(`/${parts.join("/")}`, bytes);
    }
  }

  async function init() {
    try {
      importScripts(`${WASM_DIR}${CONFIG.wasm}.js`);
    } catch (e) {
      throw new Error(`wasm/${CONFIG.wasm}.js could not be loaded (${errorText(e)})`);
    }
    const list = JSON.parse(new TextDecoder().decode(await fetchBytes("files.json")));
    const fetchAll = (dir, names) => Promise.all((names || []).map(async (n) => [n, await fetchBytes(`${dir}/${n}`)]));
    let aborted = null;
    const modulePromise = self[CONFIG.factory]({
      locateFile: (path) => `${WASM_DIR}${path}`,
      onAbort: (what) => {
        aborted = Module ? `the program stopped (${what})` : `wasm/${CONFIG.wasm}.wasm did not start (${what})`;
        fail(aborted);
      },
    }).catch((e) => { throw new Error(`wasm/${CONFIG.wasm}.wasm did not start (${errorText(e)})`); });
    const [mod, bundle, presets] = await Promise.all([
      modulePromise, fetchAll("bundle", list.bundle), fetchAll("presets", list.presets),
    ]);
    if (aborted) return;
    Module = mod;
    const FS = Module.FS;
    writeTree(FS, "/bundle", bundle);
    writeTree(FS, "/presets", presets);
    FS.mkdir("/uploads");

    const storage = await calcuOpenStorage(Module, CONFIG, (state) => {
      postMessage({ kind: "state", topic: "web.storage", value: state });
      postMessage({ kind: "stream", topic: "notices", reset: false, value: [{ sentence: state.sentence }] });
    });
    calcuAppLog("debug", `storage: ${CONFIG.mount} opened as ${storage.mode}`);
    host = new Module[CONFIG.host]({
      product: CONFIG.name,
      // cache: the file cache, every uploaded or picked file but a preset loaded once.
      dirs: { settingsBase: `${CONFIG.mount}/settings`, saveFolder: `${CONFIG.mount}/${CONFIG.name}`,
              cache: `${CONFIG.mount}/cache`, home: "" },
      storage,
      // `?bare=1` on the worker's URL: a fresh install starts bare (the demo and test pages).
      bare: /[?&]bare=1\b/.test(self.location.search),
      // `?app-log-level=` (the page's, shell.js): the app log's level for this run.
      appLogLevel: calcuAppLogLevelOfPage(),
      post: (message, transfer) => postMessage(message, transfer),
    });
    const why = host.failure();
    if (why) {
      fail(why);
      return;
    }
    while (pending.length && host) handle(pending.shift());
    startLoop();
  }

  onmessage = (e) => {
    if (failed) return;
    if (!host) pending.push(e.data);
    else handle(e.data);
  };

  if (!CONFIG) fail("The worker was started without a product.");
  else init().catch((e) => fail(errorText(e), errorDetail("while starting", e)));
})();
