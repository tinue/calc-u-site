// Generated from library/web/src/ by library/web/build/dist.js. Do not edit.
/* === sentences.js === */
// The sentences a Web frontend shows about its start and its storage: the same for every
// product, with the product's name. Concatenated into a product's calc.js
// (the page) and into dist/library-worker.js (the worker).

const CALCU_SENTENCES = {
  // The page shows it instead of going on with "starting".
  startFailed: (product, why) => `${product} could not start${why ? `: ${why}` : "."}`,
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
      request.onerror = () => resolve(false);
      request.onblocked = () => resolve(true);
    } catch (_) {
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
    }).catch(() => resolve(true));
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
  if (err) return memory("unreadable", CALCU_SENTENCES.unreadable);
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
// <mount> (the persistent file system: settings/<Product>/<Product>.ini and
// the save folder <Product>/).

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

  const postStart = (state, failure) =>
    postMessage({ kind: "state", topic: "web.start", value: { state, failure: failure || "" } });

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

  function stopLoop() {
    if (loop === null) return;
    clearInterval(loop);
    loop = null;
  }

  function fail(why) {
    if (failed) return;
    failed = true;
    stopLoop();
    host = null;
    postStart("failed", why);
  }

  function tick() {
    try {
      host.call();
    } catch (e) {
      fail(errorText(e));
    }
  }

  function startLoop() {
    if (loop === null && host && !failed && !suspended) loop = setInterval(tick, FRAME_MS);
  }

  // A message from the page: to the host; suspend and continue also stop and
  // start the calls, the command first.
  function handle(m) {
    if (!host) return;
    try {
      host.receive(m);
    } catch (e) {
      fail(errorText(e));
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
    host = new Module[CONFIG.host]({
      product: CONFIG.name,
      dirs: { settingsBase: `${CONFIG.mount}/settings`, saveFolder: `${CONFIG.mount}/${CONFIG.name}`, home: "" },
      storage,
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
  else init().catch((e) => fail(errorText(e)));
})();
