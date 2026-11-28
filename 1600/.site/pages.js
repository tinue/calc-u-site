// Calc-U-1600 — the site's own pages: home and play. The help is built from
// the help asset (.help/render.js); these pages link into it through HELP,
// and check.js fails on a link or an anchor that leads nowhere.

const { BASE, RELEASE, RELEASE_TAG, SOURCE, head, header, footer } = require("./template.js");

const HELP = {
  contents: `${BASE}/help/`,
  introduction: `${BASE}/help/01-introduction/`,
  started: `${BASE}/help/02-getting-started/getting-started/`,
  browser: `${BASE}/help/02-getting-started/getting-started/#the-browser-version`,
  media: `${BASE}/help/04-media/media/`,
  peripherals: `${BASE}/help/05-peripherals-and-paper/peripherals/`,
  presets: `${BASE}/help/06-presets/presets/`,
  basic: `${BASE}/help/09-product-topics/basic-programs/`,
  comPorts: `${BASE}/help/09-product-topics/com-ports/`,
  hostDrive: `${BASE}/help/09-product-topics/host-drive/`,
  debugger: `${BASE}/help/07-debugger/debugger/`,
};

const ASSET = (name) => `https://github.com/tinue/Calc-U/releases/download/${RELEASE_TAG}/${name}`;
const DOWNLOADS = [
  ["macOS (Apple silicon), disk image", "Calc-U-1600-mac-aarch64.dmg"],
  ["Windows x86_64, installer", "Calc-U-1600-windows-x86_64.exe"],
  ["Windows arm64, installer", "Calc-U-1600-windows-arm64.exe"],
  ["Linux x86_64, AppImage", "Calc-U-1600-linux-x86_64.AppImage"],
  ["Linux aarch64, AppImage", "Calc-U-1600-linux-aarch64.AppImage"],
];

function card(chapter, title, text, href, more) {
  return `<div class="panel">
<p class="eyebrow" style="margin-bottom: 4px">Chapter ${chapter}</p>
<h3 class="h3">${title}</h3>
<p style="margin: 0 0 12px; font-size: 15px; color: var(--fg-2)">${text}</p>
<a class="card-link" href="${href}">${more} →</a>
</div>`;
}

function home() {
  return `${head({
    title: "Calc-U-1600 — Sharp PC-1500, PC-1500A and PC-1600 emulator",
    description: "Calc-U-1600 emulates the Sharp PC-1500, PC-1500A and PC-1600 pocket computers with their modules, plotters and floppy drive, on macOS, Linux, Windows and in the browser.",
    path: `${BASE}/`,
  })}
<body>
${header("home")}
<main>
<section class="wrap home-hero">
<p class="eyebrow">Sharp PC-1500, PC-1500A and PC-1600 emulator for Mac, Windows, Linux and the browser</p>
<h1 class="title">Calc-U <em>1600</em></h1>
<p class="lede">Calc-U-1600 emulates three Sharp pocket computers, the <strong>PC-1500, PC-1500A and PC-1600</strong>, together with their memory modules, the CE-150 and CE-1600P plotters with their cassette interfaces, the CE-1600F floppy drive and the CE-158 interface. It runs on macOS, Linux and Windows, and in your browser.</p>
<div class="home-actions">
<a class="btn primary" href="${BASE}/play/">Play in browser <span class="arrow">→</span></a>
<a class="btn dark" href="${HELP.contents}">Read the help</a>
<a class="btn grey" href="#download">Download</a>
</div>
</section>

<section class="home-shot">
<img class="shot" src="${BASE}/assets/pc1600.png" width="1200" height="533" alt="The PC-1600 faceplate of Calc-U-1600: the green LCD on its brown display band, the black QWERTY keys, the grey number block and the orange SHIFT keys">
</section>

<div class="wrap" style="padding-top: 8px">
<h2 class="h2">Where to start</h2>
<div class="grid-3">
${card(2, "Getting started", "The faceplate, the keyboard, Copy Screen and Paste Text, the control bar and the menus.", HELP.started, "First steps")}
${card(4, "Modules and disks", "The slot pickers, from the CE-151 to the superRAM r4, and the CE-1600F's floppy disks.", HELP.media, "Memory and media")}
${card(9, "BASIC programs", "Load a BASIC listing, a tokenized program or a cassette WAV into the computer, and the cassette's CLOAD and CSAVE.", HELP.basic, "Load a program")}
</div>

<h2 class="h2">What Calc-U-1600 plugs in</h2>
<div class="grid-2" style="align-items: start">
<div class="panel prose">
<ul style="margin: 0; padding-left: 20px">
<li>Three models, <strong>PC-1500, PC-1500A and PC-1600</strong>, switched from the control bar (<a href="${HELP.introduction}">introduction</a>).</li>
<li><strong>Memory modules</strong> in the PC-1500's slot or the PC-1600's two (<a href="${HELP.media}">modules and disks</a>).</li>
<li>The <strong>CE-150 and CE-1600P plotters</strong> with their cassette interfaces, and the <strong>CE-1600F floppy drive</strong> (<a href="${HELP.peripherals}">peripherals</a>).</li>
<li>The <strong>CE-158</strong> and the PC-1600's own RS-232C port, connected to your computer (<a href="${HELP.comPorts}">COM ports</a>).</li>
<li>On the PC-1600, a folder on your computer as the drive <code>S3:</code> (<a href="${HELP.hostDrive}">host drive</a>).</li>
<li>A debugger in VS Code for BASIC and machine code (<a href="${HELP.debugger}">debugger</a>).</li>
</ul>
</div>
<div class="lcd" role="img" aria-label="The PC-1600's display after a start: DEG and RUN, and the prompt" style="margin: 0; font-size: 15px"><span class="dim">DEG          RUN</span>
&gt;_</div>
</div>

<div class="panel release" id="download">
<img src="${BASE}/assets/icon.png" alt="" width="72" height="72">
<div>
<h3 class="h3" style="margin: 0 0 4px">Version 0.9.0</h3>
<p style="margin: 0; font-size: 14px; color: var(--fg-2)">Free downloads of the <a href="${RELEASE}">0.9.0 release on GitHub</a>. In the browser it runs <a href="${BASE}/play/">without installing</a>, and installs as an app from <a href="${BASE}/calc/app/">calc-u.org/1600/calc/app/</a> (<a href="${HELP.browser}">what the browser version has</a>). Calc-U-1600 is free software; the source code is on <a href="${SOURCE}">GitHub</a>.</p>
<ul class="downloads">
${DOWNLOADS.map(([label, file]) => `<li><a href="${ASSET(file)}">${label}</a></li>`).join("\n")}
</ul>
</div>
</div>
</div>
</main>
${footer("calc-u.org/1600")}
</body>
</html>
`;
}

// The play page: CalcU1600 from calc/ (the pinned Web frontend), sized to
// its box by play.js. ?model= and ?preset= are handed on, as on the demo page.
function play() {
  return `${head({
    title: "Calc-U-1600 online — a Sharp PC-1500 and PC-1600 in your browser",
    description: "Run a Sharp PC-1500, PC-1500A or PC-1600 in your browser: the Calc-U-1600 emulator in WebAssembly, with its modules, plotters and floppy drive. Nothing to install.",
    path: `${BASE}/play/`,
    extra: `<link rel="stylesheet" href="${BASE}/calc/calc.css">\n`,
  })}
<body>
${header("play")}
<main class="wrap" style="padding-top: 24px">
<div id="calc" class="play-holder" style="height: min(calc(100vh - 140px), 980px); min-height: 520px"></div>
<div class="play-below prose">
<h1 class="title" style="font-size: clamp(28px, 6vw, 38px)">Calc-U-1600 online</h1>
<p>Above is the Calc-U-1600 emulator, compiled to WebAssembly and running in your browser. <strong>Machine ▸ Model</strong> switches between the <strong>PC-1500</strong>, the <strong>PC-1500A</strong> and the <strong>PC-1600</strong>; the control bar below the faceplate plugs in the modules, the plotters and the floppy drive. <strong>File ▸ Examples</strong> opens the bundled programs, <strong>File ▸ Load Preset…</strong> your own. Files are read in your browser and never leave your machine.</p>
<p>Your saved modules, disks and cassettes stay in your browser from one visit to the next (<strong>File ▸ Saved Media…</strong>). What the browser version has and has not, compared with the desktop program, is in <a href="${HELP.browser}">The browser version</a>.</p>
<p>Prefer it without the page around it? <a href="${BASE}/calc/app/">Open the standalone app</a>: the same emulator alone, installable as an app that runs offline. For the desktop program, see <a href="${BASE}/#download">the downloads</a>.</p>
</div>
</main>
${footer("calc-u.org/1600/play")}
<script src="${BASE}/calc/vendor/react.production.min.js"></script>
<script src="${BASE}/calc/vendor/react-dom.production.min.js"></script>
<script src="${BASE}/calc/calc.js"></script>
<script src="${BASE}/play/play.js"></script>
</body>
</html>
`;
}

module.exports = { HELP, home, play };
