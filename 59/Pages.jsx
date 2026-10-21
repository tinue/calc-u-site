// Calc-U 59 — Help site pages
// User scope: this guide explains the EMULATOR APP, not the underlying
// TI-59 calculator hardware.

// The sidebar of /getting-started/. Overview and Printer are topics of that
// page; every other item is a page of its own.
const STARTED_SECTIONS = [
  { title: "Start here", items: [
    { id: "overview", label: "Overview", href: "/59/getting-started/" },
  ]},
  { title: "Setup", items: [
    { id: "install-mobile", label: "Installing on iPhone and iPad", href: "/59/install/iphone-ipad/" },
    { id: "install-mac", label: "Installing on Mac", href: "/59/install/mac/" },
    { id: "install-pc", label: "Installing on Windows and Linux", href: "/59/install/windows-linux/" },
  ]},
  { title: "Using the emulator", items: [
    { id: "presets", label: "Loading a preset", href: "/59/presets/" },
    { id: "debugger", label: "Using the debugger", href: "/59/debugger/" },
    { id: "printer", label: "Printer and card reader", href: "/59/getting-started/printer/" },
  ]},
  { title: "Help", items: [
    { id: "faq", label: "FAQ", href: "/59/faq/" },
    // The README lives on GitHub: an ordinary outbound link.
    { id: "readme", label: "Main README", href: "https://github.com/tinue/Calc-U-59/blob/main/README.md", external: true },
  ]},
];

// The topic cards of the home page and of /getting-started/.
const START_CARDS = [
  { eyebrow: "Setup", title: "Installing on iPhone and iPad", href: "/59/install/iphone-ipad/",
    text: "Install from the App Store, pick the calculator model, and open .ti59 files from the file picker." },
  { eyebrow: "Setup", title: "Installing on Mac", href: "/59/install/mac/",
    text: "Download the release from GitHub and drag it to Applications." },
  { eyebrow: "Setup", title: "Installing on Windows and Linux", href: "/59/install/windows-linux/",
    text: "Run the Windows installer or the Linux AppImage from GitHub Releases." },
  { eyebrow: "Files", title: "Loading a preset", href: "/59/presets/",
    text: "What .ti59, .ti58 and .ti58c files contain, and how each section — partition, program, registers, keystrokes — is applied." },
  { eyebrow: "Debug", title: "Using the debugger", href: "/59/debugger/",
    text: "The CALCULATOR, CPU and LOG tabs, freeze and step, FREEZE ON START, and binary trace files for offline analysis." },
  { eyebrow: "Hardware", title: "Printer and card reader", href: "/59/getting-started/printer/",
    text: "The PC-100C panel in dot and text view, printing and advancing paper, copying the strip, and where card files are kept." },
];

function StartCards() {
  return START_CARDS.map((c, i) => (
    <TopicCard key={c.href} num={String(i + 1).padStart(2, "0")} eyebrow={c.eyebrow} title={c.title} href={c.href}>
      {c.text}
    </TopicCard>
  ));
}

// Back where the visitor came from, or (opened directly) to the start page —
// a plain link then, which site.jsx's listener turns into an in-app navigation.
function BackButton() {
  function handleBack(e) {
    if (history.length > 1) { e.preventDefault(); history.back(); }
  }
  return <a className="btn secondary" href="/59/" onClick={handleBack}>← Return to start</a>;
}

/* =============================================================
   HOME — overview page.
   ============================================================= */
function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--stroke)" }}>
        <div className="wrap hero">
          <div className="hero-copy">
            <p className="eyebrow">TI-59 emulator for Mac, Windows, Linux, iPhone and iPad</p>
            <h1 className="page-title">Calc-U <em>59</em></h1>
            <p className="lede">Calc-U 59 is a <strong style={{ color: "var(--fg)" }}>TI-59, TI-58 and TI-58C emulator</strong> for macOS, Windows, Linux, iPhone and iPad. It runs the original Texas Instruments ROM, reads and writes virtual magnetic cards, emulates the PC-100C printer and all fourteen Solid State Software modules, and includes a CPU-level debugger. You can <a href="/59/play/">try it in your browser</a> before you install anything.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn primary" href="/59/getting-started/">Getting started <span style={{opacity:.5}}>→</span></a>
              <a className="btn secondary" href="/59/reference/">App reference</a>
            </div>
          </div>
          {/* Placed by .hero into the right-hand column on a wide screen and
              directly under the pitch once the hero stacks. */}
          <div className="hero-shot">
            <img
              src="/59/assets/app-screenshot.png"
              alt="The Calc-U 59 TI-59 emulator running on an iPhone, showing the red LED display, the cue card and the full key matrix"
            />
          </div>
          <div className="hero-cards grid-2">
            <div className="panel" style={{ padding: 16 }}>
              <h3 className="sub" style={{ margin: "0 0 6px" }}>iPhone and iPad</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                Install from the App Store, then open the app and pick a model. Presets load from the file picker inside the app.
              </p>
            </div>
            <div className="panel" style={{ padding: 16 }}>
              <h3 className="sub" style={{ margin: "0 0 6px" }}>Mac, Windows and Linux</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                Download the free release from GitHub: a disk image for the Mac, an installer for Windows, an AppImage for Linux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topic cards */}
      <div className="wrap">
        <h2 className="section">Where to start</h2>
        <div className="grid-3">
          <StartCards />
        </div>

        {/* What the emulator actually reproduces. Written for someone who
            arrived from a search engine and has not yet decided whether
            this is the TI-59 emulator they were looking for. */}
        <h2 className="section">What Calc-U 59 emulates</h2>
        <div className="prose panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            Calc-U 59 emulates the <strong>TI Programmable 59</strong> that Texas Instruments
            introduced in 1977, along with its two smaller siblings, the <strong>TI-58</strong> and
            the constant-memory <strong>TI-58C</strong>. It does not reimplement the maths: the app runs
            the calculators' original ROM through an emulated processor, at the original speed, so
            every result, the flashing overflow display and the documented quirks behave the way the
            hardware did. The LED display even looks the way the eye saw the real one, dimming while
            the calculator works.
          </p>
          <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
            <li>Switchable <strong>TI-59 / TI-58 / TI-58C</strong> models, with the correct memory partition and startup state for each.</li>
            <li>All fourteen <strong>Solid State Software</strong> library modules, from the Master Library to the RPN Simulator — <a href="/59/modules/">see the full list</a>.</li>
            <li><strong>Magnetic cards</strong> read and written as files, synced between your Apple devices over iCloud.</li>
            <li>The <strong>PC-100C thermal printer</strong>, in both a dot-matrix view and a copyable text view.</li>
            <li>A <a href="/59/debugger/">CPU-level debugger</a> with a live program listing, a ROM instruction trace, and binary trace capture for offline analysis.</li>
            <li>Plain-text <a href="/59/presets/">.ti59 preset files</a> that carry a program, the registers, a cue card and a module selection in one readable file.</li>
          </ul>
          <p style={{ marginBottom: 0 }}>
            New to these machines, or trying to work out which model you owned?{" "}
            <a href="/59/what-is-a-ti-59/">Start with the background on the TI-59 and TI-58 →</a>
          </p>
        </div>

        {/* App-icon strip */}
        <div className="panel" style={{
          marginTop: 48, display: "flex", alignItems: "center", gap: 24,
        }}>
          <img src="/59/assets/app-icon.png" alt=""
               style={{ width: 80, height: 80, borderRadius: 18, flex: "0 0 auto" }}/>
          <div>
            <h3 className="sub" style={{ margin: "0 0 4px" }}>Available now</h3>
            <p style={{ margin: 0, fontSize: 14 }}>
              The Mac, Windows and Linux builds ship free from <a href="https://github.com/tinue/Calc-U-59/releases/latest">GitHub Releases</a>.
              The iPhone and iPad build is on the <a href="https://apps.apple.com/us/app/calc-u-59/id6761413142">App Store</a>.
              Calc-U 59 is free software under the GNU GPL version 3; the source code is on <a href="https://github.com/tinue/Calc-U-59">GitHub</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   WHAT IS A TI-59 — background page.

   Scope exception, and a deliberate one. The rest of this site documents
   the app and stays away from the 1977 hardware. This page exists because
   the people looking for the app search for the machine — "TI-59
   emulator", "TI-58C simulator", "TI-59 magnetic card" — and had nothing
   here to land on. It orients a newcomer and hands them to the app; it is
   not a substitute for the TI Personal Programming manual.
   ============================================================= */
function AboutTi59Page() {
  const models = [
    {
      code: "TI-59",
      name: "TI Programmable 59",
      year: "May 1977",
      body: "The top of the range. Up to 960 program steps or 100 data registers, traded against each other in steps of 80 and 10, plus a magnetic card reader in the side for saving programs. Memory was volatile: switch it off and the program was gone unless it was on a card.",
    },
    {
      code: "TI-58",
      name: "TI Programmable 58",
      year: "May 1977",
      body: "The same calculator with half the memory — up to 480 steps or 60 registers — and no card reader. Library modules still worked, so it lost storage rather than capability.",
    },
    {
      code: "TI-58C",
      name: "TI Programmable 58C",
      year: "1979",
      body: "A TI-58 with constant memory. The C is the whole point: programs and registers survived being switched off, which removed most of the reason to want a card reader in the first place.",
    },
  ];

  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Background</p>
      <h1 className="page-title">What is a TI-59?</h1>
      <p className="lede">
        A short orientation to the Texas Instruments TI-59, TI-58 and TI-58C — the machines
        Calc-U 59 emulates — for anyone who arrived here looking for one and wants to know
        what they are dealing with.
      </p>

      <div className="prose" style={{ marginTop: 24 }}>
        <p>
          The <strong>TI Programmable 59</strong> was Texas Instruments' flagship programmable
          calculator, introduced on 24 May 1977 at a list price of around $300. It succeeded
          the SR-52, and for the rest of the decade it was the machine engineers, surveyors,
          navigators and financial analysts actually carried. Its rival was the Hewlett-Packard
          HP-67; the TI had roughly twice the memory, the HP had RPN and better build quality,
          and people argued about it for years.
        </p>
        <p>
          You programmed it by recording keystrokes. In learn mode every key you pressed became
          a program step, and the ten user-defined keys — <K tone="dark">A</K> through{" "}
          <K tone="dark">E</K> and their primed second functions — were the entry points. That
          sounds primitive, and it is, but the instruction set includes conditionals, loops,
          subroutines and indirect register addressing, which makes the TI-59 Turing-complete.
          People wrote games for it.
        </p>
      </div>

      <h2 className="section">The three models</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {models.map(m => (
          <div key={m.code} className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
              <h3 className="sub" style={{ margin: 0 }}>{m.code}</h3>
              <span style={{ color: "var(--fg-3)", fontSize: 13 }}>{m.name} · {m.year}</span>
            </div>
            <p style={{ margin: 0, color: "var(--fg-2)" }}>{m.body}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, color: "var(--fg-2)", lineHeight: 1.7 }}>
        Calc-U 59 emulates all three. The app's model picker switches between
        them, and each starts with the memory partition and power-on state that model really had.
      </p>

      <h2 className="section">Algebraic Operating System</h2>
      <div className="prose panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          These calculators use <strong>AOS</strong> — Algebraic Operating System — rather than the
          RPN found on contemporary Hewlett-Packard machines. You enter an expression roughly as it
          is written on paper, with up to nine levels of parentheses, and the calculator applies
          operator precedence when you press <K tone="yellow">=</K>. Emulating AOS convincingly is
          the part that catches out reimplementations: the pending-operation stack has observable
          edge cases that only fall out correctly if you run the original ROM, which is what
          Calc-U 59 does.
        </p>
        <p style={{ marginBottom: 0 }}>
          One of the library modules, <strong>RP</strong>, is an RPN Simulator — Texas Instruments
          shipped a way to make its algebraic calculator behave like an HP.
        </p>
      </div>

      <h2 className="section">Magnetic cards</h2>
      <div className="prose panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          The TI-59's card reader took small magnetic strips, one quarter of the machine's memory
          per side. The card did double duty: once read, it slid into a slot above the keyboard so
          the labels written along its top edge sat directly beneath the{" "}
          <K tone="dark">A</K>–<K tone="dark">E</K> keys and told you what each one did in the
          program you had just loaded. That is what the cue card on screen in Calc-U 59 is
          reproducing.
        </p>
        <p style={{ marginBottom: 0 }}>
          In the emulator, cards are files. They live in iCloud storage, so a program written on a
          Mac is on the iPhone by the time you pick it up. The card reader mechanism was also the
          most failure-prone part of the original hardware, which is a reasonable argument for
          emulating one instead of restoring one.
        </p>
      </div>

      <h2 className="section">Solid State Software modules</h2>
      <div className="prose panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          The TI-58 and TI-59 were the first handheld calculators with removable ROM program
          modules. A module held up to 5,000 program steps and ran straight from ROM, leaving user
          memory free. The Master Library came in the box; Applied Statistics, Surveying, Aviation,
          Marine Navigation, Securities Analysis and the rest were sold separately, and the
          complete set is now hard to find and expensive.
        </p>
        <p style={{ marginBottom: 0 }}>
          Calc-U 59 includes all fourteen. <a href="/59/modules/">See the module list →</a>
        </p>
      </div>

      <h2 className="section">The PC-100C printer</h2>
      <div className="prose panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ margin: 0 }}>
          The calculator docked into a thermal printer — the PC-100A, B or C — and locked in place
          with a key. Beyond printing results, it was how you got a readable listing of a program
          with mnemonics instead of raw numeric key codes, dumped the data registers, or traced
          execution. It is emulated in Calc-U 59, including the paper strip, which you can copy as
          plain text rather than squinting at dot-matrix output.{" "}
          <a href="/59/getting-started/printer/">Printer and card reader →</a>
        </p>
      </div>

      <h2 className="section">Try one</h2>
      <div className="prose panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          The quickest way to see whether this is the machine you remember is to use one. The{" "}
          <a href="/59/play/">browser emulator</a> runs the app's own emulator compiled to
          WebAssembly — a TI-59 with all fourteen library modules and a magnetic card — and needs
          no installation. The full app, with the TI-58 and TI-58C, the printer and the debugger,
          is free on the <a href="/59/install/mac/">Mac</a>,{" "}
          <a href="/59/install/windows-linux/">Windows and Linux</a>, and{" "}
          <a href="/59/install/iphone-ipad/">on the App Store</a> for iPhone and iPad.
        </p>
        <p style={{ marginBottom: 0, color: "var(--fg-3)", fontSize: 13 }}>
          For the original operating manuals, program libraries and the wider TI-59 community,
          start at <a href="https://www.ti59.com/">ti59.com</a> and{" "}
          {/*
            http:// is deliberate and must stay: datamath.org serves no TLS at
            all — https:// fails the handshake outright ("tlsv1 alert internal
            error"), it does not merely warn. Promoting this to https breaks
            the link. Re-test before changing it; if they ever add a
            certificate, this is safe to flip.
          */}
          <a href="http://www.datamath.org/SCI/WEDGE/TI-59.htm">datamath.org</a>. This site only
          documents the emulator.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

/* =============================================================
   GETTING STARTED — practical install, file, and debug guidance.
   ============================================================= */
// "overview" is the default because /getting-started/ is a hub: it is the
// most-linked page on the site and sits in the header nav. Defaulting to a
// topic would make it a byte-identical twin of that topic's own URL.
const TOPICS = {
  overview: {
    title: "Getting started with Calc-U 59",
    note: "Install the app, load a preset, drive the printer and card reader, and find your way around the debugger.",
    body: (
      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            Calc-U 59 runs the original Texas Instruments ROM, so the calculator in front of you behaves the way a real TI-59, TI-58 or TI-58C does, down to its speed and its Solid State Software modules.
          </p>
          <p style={{ marginBottom: 0 }}>
            Most people need three things: get the app installed, load a preset, and know where the printer and the debugger live. Each is a short page.
          </p>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <StartCards />
        </div>
      </div>
    ),
  },
  printer: {
    title: "Printer and card reader",
    note: "The PC-100C panel, paper strip, copy/cut, and card file behaviour.",
    body: (
      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            The printer view mimics the PC-100C. The <strong>PC-100C</strong> button at the top of the printer view, with its red or grey dot, connects or disconnects the printer; switching it resets the calculator, as plugging in the real printer does. Switch between dot view and text view depending on whether you want realism or easy copying.
          </p>
          <p>
            <strong>PRINT</strong> and <strong>ADV</strong> are the printer's own keys: PRINT prints the display, ADV advances the paper while held. <strong>T</strong> is the printer's TRACE switch, which makes the calculator print every step it executes. Copy puts the strip on the clipboard as an image and as text; cut copies it and then clears the paper.
          </p>
          <p style={{ marginBottom: 0 }}>
            Holding the display runs the calculator at full speed, and that now includes printing — a long 2nd List or a calendar printout finishes in moments.
          </p>
        </div>
        <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0, marginBottom: 0 }}>
            The TI-59 has a card reader; the TI-58 and TI-58C don't. Its <strong>Crd</strong> buttons load a card or insert a blank one to write, and <strong>Eject Card</strong> takes it out. Card files (.U59) live in the app's card storage — iCloud on Mac, iPhone and iPad (or the app's local folder when iCloud is off), <code>~/Calc-U-59</code> on Windows and Linux. The picker lists only card files.
          </p>
        </div>
      </div>
    ),
  },
};

function GettingStartedPage({ topic = "overview" }) {
  const t = TOPICS[topic];
  return (
    <main className="wrap docs-layout">
      <DocsSidebar current={topic} sections={STARTED_SECTIONS} />
      <article className="prose docs-article">
        <p className="eyebrow">Getting started</p>
        <h1 className="page-title compact">{t.title}</h1>
        <p className="lede">{t.note}</p>
        {t.body}
      </article>
    </main>
  );
}

/* =============================================================
   DETAIL PAGES — dedicated targets for home topic cards.
   ============================================================= */
function InstallMobilePage() {
  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Setup</p>
      <h1 className="page-title">Installing on iPhone and iPad</h1>
      <p className="lede">Use the App Store build, then configure the model and load presets from inside the app.</p>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 24 }}>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>Open the <a href="https://apps.apple.com/us/app/calc-u-59/id6761413142" className="link-accent">App Store</a> and install Calc-U 59.</li>
          <li>Launch the app and pick the calculator model in the bottom bar. Settings › Startup Calculator chooses the model the app starts with.</li>
          <li>Use the preset file picker for .ti59, .ti58, or .ti58c files.</li>
        </ol>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <p style={{ marginTop: 0 }}>
          The app needs iOS or iPadOS 18 or later. There is no extra setup after install.
        </p>
        <p style={{ marginBottom: 0 }}>
          On iPhone in portrait, the calculator fills the screen and the printer and the debugger are pages you swipe to (the debugger only with Settings › Debug Page in Portrait). In landscape, the iPhone shows the calculator next to the printer. On iPad in landscape, the layout mirrors the Mac view.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

function InstallMacPage() {
  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Setup</p>
      <h1 className="page-title">Installing on Mac</h1>
      <p className="lede">Download the release from GitHub, then drag the app to Applications.</p>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 24 }}>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>Download the latest release DMG from <a href="https://github.com/tinue/Calc-U-59/releases/latest" className="link-accent">GitHub</a>.</li>
          <li>Double-click the DMG file to open it and show the installer window.</li>
          <li>Drag Calc-U-59.app to the Applications folder.</li>
          <li>Eject the disk image and launch the app from Applications.</li>
        </ol>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <p style={{ margin: 0 }}>
          The app is signed and notarized by Apple, so macOS opens it like any other application. It needs macOS 15.6 or later. Cards and the TI-58C's memory sync through iCloud with the iPhone and iPad app.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

function InstallPcPage() {
  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Setup</p>
      <h1 className="page-title">Installing on Windows and Linux</h1>
      <p className="lede">Download the Windows installer or the Linux AppImage from GitHub. The app has the same calculators, printer, cards, presets and debugger as the Mac app.</p>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 24 }}>
        <h3 className="sub" style={{ marginTop: 0 }}>Windows</h3>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>From the latest <a href="https://github.com/tinue/Calc-U-59/releases/latest" className="link-accent">GitHub release</a>, download <code>Calc-U-59-Setup.exe</code> (most PCs) or <code>Calc-U-59-Setup-arm64.exe</code> (Windows on ARM).</li>
          <li>Run it. The installer isn't signed, so Windows SmartScreen may warn about an unrecognised app: choose <strong>More info</strong>, then <strong>Run anyway</strong>.</li>
          <li>Start Calc-U-59 from the Start menu.</li>
        </ol>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0 }}>Linux</h3>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>From the same release, download the AppImage for your machine: <code>x86_64</code> for most PCs, <code>aarch64</code> for ARM.</li>
          <li>Make it executable (<code>chmod +x Calc-U-59-*.AppImage</code>, or the file's Properties dialog) and run it. Nothing else needs installing.</li>
        </ol>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0 }}>Where your files go</h3>
        <p style={{ marginTop: 0 }}>
          Cards and the TI-58C's constant memory (<code>ti58c.mem</code>) are kept in <code>Calc-U-59</code> in your home folder; debugger traces go there too. Settings › Files changes the card folder, the trace folder and the folder <strong>Open Preset</strong> starts in.
        </p>
        <p style={{ marginBottom: 0 }}>
          There is no iCloud on these platforms, so cards don't sync with the Apple apps — copy the .U59 files across if you want them there.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

function PresetsPage() {
  const stateFileExample = `# 800 steps, 20 data registers (R00–R19) — "2 OP 17"
PARTITION: 799.19
# Magnetic card with one Label
CUECARD:
Template: MagnetCard
Title: Example
Banks: 1,2
A: Start
# Load the Master Library
SOLID-STATE-MODULE: ML
# Force Printer On
PRINTER: on
# Program Listing
PROGRAM:
000  76  LBL
001  11  A
002  89  π
003  95  =
004  91  R/S
# Data Registers
REGISTERS:
00 = 3.141592653589793   # π  (verify RCL 00 → 3.141592654)
# Type some keys after load / reset
KEYSTROKES:
84   3
11   A
Wait: 2s
43   RCL
92   0
92   0`;

  const cueCardLabelExample = `CUECARD:
Template: MagnetCard
Title: Roots & Powers
Banks: 1, 2
A: \\sqrt x
B: x^{2}
C: 1/x
D: x \\to y
E: \\blank
A': \\sum x_{i}
B': \\xbar
C': n
D': \\blank
E': \\blank`;

  const cueCardRowExample = `CUECARD:
Template: CueCard
Title: Compound Interest
Row1: Enter n, i, PV — press B for FV
Row1Align: center
Row2: RPN 5.1
Row2R: p. 3
Row2Align: left
Row2RAlign: right
Style: button`;

  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Files</p>
      <h1 className="page-title">Loading a preset</h1>
      <p className="lede">Presets are plain UTF-8 text files with named sections. You can include only the sections you need.</p>

      <div className="panel" style={{ padding: 16, marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ margin: 0, lineHeight: 1.6 }}>New to writing a preset from scratch? The tutorial builds one up section by section, with a downloadable file at every step.</p>
        <a className="btn secondary" href="/59/presets/tutorial/">Preset tutorial <span style={{opacity:.5}}>→</span></a>
      </div>

      <div className="panel" style={{ padding: 20, marginTop: 12 }}>
        <pre style={{
          margin: 0,
          padding: 16,
          borderRadius: 8,
          background: "var(--bg-inset)",
          color: "var(--fg)",
          overflowX: "auto",
          lineHeight: 1.5,
          fontSize: 13,
        }}>{stateFileExample}</pre>
      </div>

      <div className="panel" style={{ padding: 16, marginTop: 12 }}>
        <img
          src="/59/assets/cuecard-single-label.png"
          alt="MagnetCard cue card titled Example, with the Start label in the A key position and blank A′–E′ and B–E cells"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
        />
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <p style={{ marginTop: 0 }}><strong>PARTITION:</strong> sets the step split between program memory and data registers.</p>
        <p><strong>PROGRAM:</strong> accepts sparse step listings, numeric keycodes, and the <strong>...</strong> gap marker.</p>
        <p><strong>REGISTERS:</strong> stores calculator variables as decimal numbers.</p>
        <p><strong>KEYSTROKES:</strong> injects matrix codes after the file loads. Between keys, lines such as <strong>Wait:</strong>, <strong>WaitFullSpeed:</strong>, <strong>FullSpeed:</strong> and <strong>RegularSpeed:</strong> control timing, and a few more (<strong>Trace:</strong>, <strong>ZeroElapseTime:</strong>, <strong>ReportElapseTime:</strong>) help with timing and debugging programs.</p>
        <p><strong>CUECARD:</strong> defines the on-screen cue card that appears with the loaded file or module.</p>
        <p><strong>SOLID-STATE-MODULE:</strong> and <strong>PRINTER:</strong> let a file select the matching module and printer state automatically, and <strong>MODEL:</strong> switches to the calculator the file is for.</p>
        <p><strong>SKIP-RESET: on</strong> loads into the running calculator without resetting it first — only the sections the file contains are applied.</p>
        <p style={{ marginBottom: 0 }}>
          This page covers enough to load and tweak existing files. The complete
          grammar — matrix code table, 2nd-function presses, the CUECARD field
          list, and the math-notation shorthand used in cue cards — is developer
          documentation kept in the GitHub repository:{" "}
          <a href="https://github.com/tinue/Calc-U-59/blob/main/reference/StateFileFormat.md" className="link-accent">
            reference/StateFileFormat.md →
          </a>
        </p>
      </div>

      <h2 id="labeling-keys" className="section" style={{ marginTop: 24 }}>Labeling the A–E and A′–E′ keys</h2>
      <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          The five plain keys (<strong>A–E</strong>) and their 2nd-function row
          (<strong>A′–E′</strong>) are exactly what real TI-59/58/58C cards
          label. A <strong>CUECARD:</strong> section can do the same thing
          on-screen — either as its own row of short per-key labels, or as one
          line of running text across the whole row.
        </p>
        <p>
          <strong>Template</strong> picks the card artwork and layout, and
          matches the real card it stands in for — <strong>MagnetCard</strong>{" "}
          and <strong>CueCard</strong> look almost identical on screen, since
          both were the same front-side label design. The difference is on
          the back: a real magnetic card has a magnetic coating that stores
          the program; a cue card doesn't. Use <strong>MagnetCard</strong> if
          the preset is meant to end up written onto a magnetic card (it also
          shows the <strong>Banks</strong> page badges). Cue cards shipped
          for TI-58, TI-58C <em>and</em> TI-59 owners, but TI-59 owners
          tended to skip them and just label whichever magnetic card already
          held the program instead; TI-58 and TI-58C, having no card reader
          at all, relied on cue cards since there was no magnetic card to
          label in the first place — use{" "}
          <strong>CueCard</strong> for that case, or for any file that just
          wants an on-screen label without a magnetic-card connotation. Which
          of the two you pick for a given preset is mostly personal
          preference, except when the file is a step toward an actual
          magnetic card — then use <strong>MagnetCard</strong> to match.{" "}
          <strong>SolidStateCard</strong>{" "}
          reproduces the pre-printed cards that shipped with a Solid State
          Software module; real ones can't be edited by the module's user, and
          in the emulator they're normally only touched by the project's
          developer to document a built-in module — reach for it yourself
          only if you're prototyping your own module (it shows an{" "}
          <strong>ID</strong> like <code>ML-01</code> instead of Banks).
        </p>
        <p>
          Set fields <strong>A</strong> through <strong>E</strong> for the
          plain-key row, and <strong>A′</strong> through <strong>E′</strong>{" "}
          (a straight apostrophe also works: <code>A'</code>) for the
          2nd-function row. Leaving <strong>Row1</strong> or <strong>Row2</strong>{" "}
          out entirely is what makes that row show the label grid instead of a
          line of text — if you fill in Row1/Row2, the individual A–E labels for
          that row are not shown.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Row1</strong> replaces the A′–E′ grid with one line of
          running text, and <strong>Row2</strong> does the same for the A–E
          grid. <strong>Row2R</strong> is a second piece of text placed on the
          same line as Row2, right-aligned against it — handy for something
          like a page number or units note that shouldn't compete with the
          main label for space. Each of the three has its own alignment
          field — <strong>Row1Align</strong>, <strong>Row2Align</strong>,{" "}
          <strong>Row2RAlign</strong> — set to <code>left</code>,{" "}
          <code>center</code>, or <code>right</code> (Row1 defaults to
          center, Row2 and Row2R to left).{" "}
          On a CueCard or MagnetCard, <strong>PencilColor</strong> picks the
          ink: <code>black</code> (the default), <code>pencil</code> or{" "}
          <code>sharpie</code>.{" "}
          <strong>Style</strong> is <code>none</code> by default, or{" "}
          <code>button</code> to draw a border around the Row1/Row2/Row2R
          text, mimicking the boxed instruction labels real cards use.
        </p>
      </div>

      <div className="panel" style={{ padding: 20, marginTop: 12 }}>
        <pre style={{
          margin: 0,
          padding: 16,
          borderRadius: 8,
          background: "var(--bg-inset)",
          color: "var(--fg)",
          overflowX: "auto",
          lineHeight: 1.5,
          fontSize: 13,
        }}>{cueCardLabelExample}</pre>
      </div>

      <div className="panel" style={{ padding: 16, marginTop: 12 }}>
        <img
          src="/59/assets/cuecard-key-grid.png"
          alt="MagnetCard cue card titled Roots and Powers, with per-key labels on both the A′–E′ and A–E rows, including a merged x → y span"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
        />
      </div>

      <div className="panel" style={{ padding: 20, marginTop: 12 }}>
        <pre style={{
          margin: 0,
          padding: 16,
          borderRadius: 8,
          background: "var(--bg-inset)",
          color: "var(--fg)",
          overflowX: "auto",
          lineHeight: 1.5,
          fontSize: 13,
        }}>{cueCardRowExample}</pre>
      </div>

      <div className="panel" style={{ padding: 16, marginTop: 12 }}>
        <img
          src="/59/assets/cuecard-row-text.png"
          alt="CueCard titled Compound Interest, with a centered, boxed Row1 instruction line and left-aligned Row2 / right-aligned Row2R text below it"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
        />
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <p style={{ marginTop: 0 }}>
          A short set of LaTeX-style shortcuts expand to the Unicode symbols
          real TI-59 cards use in labels, so you don't need a Unicode picker —
          for example <code>\to</code> becomes an arrow, <code>\sqrt</code>{" "}
          becomes a root sign, <code>\sum</code> becomes Σ, and{" "}
          <code>{"x^{2}"}</code> becomes <code>x²</code>. The full token table
          is in <strong>reference/StateFileFormat.md</strong>.
        </p>
        <p style={{ marginBottom: 0 }}>
          To make one label visually span more than one key position, set the
          following cell(s) to <code>\blank</code> — for example{" "}
          <code>{"D: \\blank"}</code> right after a filled-in <strong>C</strong>{" "}
          merges D into C's column so the C label reads across both keys.
        </p>
      </div>

      <h2 className="section" style={{ marginTop: 24 }}>Loading a labeled card</h2>
      <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}><strong>From a preset</strong> — tap <strong>Preset</strong> and pick a <code>.ti59</code>/<code>.ti58</code>/<code>.ti58c</code> file with a CUECARD section; it's applied immediately and stays until you load something else or reset.</p>
        <p><strong>Onto a virtual magnetic card</strong> — load a preset with the CUECARD you want active, then write a card on the TI-59 (press 2nd Write and insert a blank card with the <strong>Crd</strong> button): whatever cue card is on screen at that moment is saved into the card file along with the program or data. Loading that card back with the other <strong>Crd</strong> button restores the label along with the contents.</p>
        <p style={{ marginBottom: 0 }}><strong>By editing the card file directly</strong> — virtual card files are plain text too (see the FAQ entry on where they live), with the same <code>CUECARD:</code> syntax as a preset. Add or edit that section in a text editor and the label shows the next time the card is read.</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

/* =============================================================
   PRESET TUTORIAL — builds one .ti59 preset file up from nothing,
   one section at a time, with a real downloadable file at every step.
   The finished file is docs/tutorial-files/tutorial.ti59, also linked
   from /presets/ and the FAQ.
   ============================================================= */
function TutorialStep({ num, title, children, code, file, filename }) {
  return (
    <>
      <h2 className="section" style={{ marginTop: 32 }}>Step {num}: {title}</h2>
      <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
        {children}
      </div>
      <div className="panel" style={{ padding: 20, marginTop: 12 }}>
        <pre style={{
          margin: 0,
          padding: 16,
          borderRadius: 8,
          background: "var(--bg-inset)",
          color: "var(--fg)",
          overflowX: "auto",
          lineHeight: 1.5,
          fontSize: 13,
        }}>{code}</pre>
      </div>
      <div style={{ marginTop: 12, textAlign: "right" }}>
        <a className="btn secondary" href={`/59/tutorial-files/${file}`} download>
          Download {filename || file}
        </a>
      </div>
    </>
  );
}

function PresetTutorialPage() {
  const step1 = `# TI-59 Preset File Tutorial — Step 1: setup
#
# This is the smallest possible preset file: it only picks the calculator
# model and a couple of options. Load it in Calc-U 59 right now and you get
# a TI-59 with the Master Library module and the printer switched on —
# nothing else has been set up yet.

# Setup the system: Choose the model, solid state module and printer on/off
MODEL: TI-59
SOLID-STATE-MODULE: ML
PRINTER: on`;

  const step2 = `# TI-59 Preset File Tutorial — Step 2: partition
#
# Same as Step 1, with one addition: PARTITION changes the split between
# program memory and data registers.

# Setup the system: Choose the model, solid state module and printer on/off
MODEL: TI-59
SOLID-STATE-MODULE: ML
PRINTER: on

# Change the partition layout of the calculator
PARTITION: 719.29   # 720 steps, 30 data registers (3 2nd Op 17)`;

  const step3 = `# TI-59 Preset File Tutorial — Step 3: cue card
#
# Adds a CUECARD section: the on-screen card shown once the preset loads,
# labeling the A-E keys the way a real magnetic card would.

# Setup the system: Choose the model, solid state module and printer on/off
MODEL: TI-59
SOLID-STATE-MODULE: ML
PRINTER: on

# Change the partition layout of the calculator
PARTITION: 719.29   # 720 steps, 30 data registers (3 2nd Op 17)

# Setup the cue card that is shown after loading the preset.
# For the template, either use "MagnetCard" for the TI-59 cards, or "CueCard"
#  for the blank cards without a magnetic coating.
CUECARD:
Template: MagnetCard
Title: TI-59 Preset File Tutorial Magnetic Card
Banks: 1,2
Row1: Calculates the sum of 1..N the slow way
Row1Align: left
A: Sum 1..N
C: Enter number, then A
D: \\blank
E: \\blank`;

  const step4 = `# TI-59 Preset File Tutorial — Step 4: program
#
# Adds a PROGRAM section: the calculator's program memory, entered as key
# codes. This particular program sums the numbers from 1 down to whatever
# you enter — press a number, then A.

# Setup the system: Choose the model, solid state module and printer on/off
MODEL: TI-59
SOLID-STATE-MODULE: ML
PRINTER: on

# Change the partition layout of the calculator
PARTITION: 719.29   # 720 steps, 30 data registers (3 2nd Op 17)

# Setup the cue card that is shown after loading the preset.
# For the template, either use "MagnetCard" for the TI-59 cards, or "CueCard"
#  for the blank cards without a magnetic coating.
CUECARD:
Template: MagnetCard
Title: TI-59 Preset File Tutorial Magnetic Card
Banks: 1,2
Row1: Calculates the sum of 1..N the slow way
Row1Align: left
A: Sum 1..N
C: Enter number, then A
D: \\blank
E: \\blank

# Setup the program memory. The format is very flexible, here we use 10 steps per line
# and add a comment for the line numbers. The loader simply takes the key codes and ignores the rest.
PROGRAM:
43 00 44 01 97  00 00 00 43 01  # 000-009
91 76 11 42 00  25 42 01 61 00  # 010-019
00                              # 020`;

  const step5 = `# TI-59 Preset File Tutorial — Step 5: registers
#
# Adds a REGISTERS section: preloaded data register content, entered as
# plain decimal numbers, at the full TI-59 precision.

# Setup the system: Choose the model, solid state module and printer on/off
MODEL: TI-59
SOLID-STATE-MODULE: ML
PRINTER: on

# Change the partition layout of the calculator
PARTITION: 719.29   # 720 steps, 30 data registers (3 2nd Op 17)

# Setup the cue card that is shown after loading the preset.
# For the template, either use "MagnetCard" for the TI-59 cards, or "CueCard"
#  for the blank cards without a magnetic coating.
CUECARD:
Template: MagnetCard
Title: TI-59 Preset File Tutorial Magnetic Card
Banks: 1,2
Row1: Calculates the sum of 1..N the slow way
Row1Align: left
A: Sum 1..N
C: Enter number, then A
D: \\blank
E: \\blank

# Setup the program memory. The format is very flexible, here we use 10 steps per line
# and add a comment for the line numbers. The loader simply takes the key codes and ignores the rest.
PROGRAM:
43 00 44 01 97  00 00 00 43 01  # 000-009
91 76 11 42 00  25 42 01 61 00  # 010-019
00                              # 020

# Setup register content. The full TI-59 precision is supported. On the real hardware, the number below
# can't be entered directly, one would need SUM and division to set this up.
REGISTERS:
29 = 3.000000000004`;

  const step6 = `# TI-59 Preset File Tutorial — complete
#
# This file is used to explain how preset files are constructed. See
# https://calc-u.org/59/presets/tutorial/ for the step-by-step walkthrough.

# Setup the system: Choose the model, solid state module and printer on/off
MODEL: TI-59
SOLID-STATE-MODULE: ML
PRINTER: on

# Change the partition layout of the calculator
PARTITION: 719.29   # 720 steps, 30 data registers (3 2nd Op 17)

# Setup the cue card that is shown after loading the preset.
# For the template, either use "MagnetCard" for the TI-59 cards, or "CueCard"
#  for the blank cards without a magnetic coating.
CUECARD:
Template: MagnetCard
Title: TI-59 Preset File Tutorial Magnetic Card
Banks: 1,2
Row1: Calculates the sum of 1..N the slow way
Row1Align: left
A: Sum 1..N
C: Enter number, then A
D: \\blank
E: \\blank

# Setup the program memory. The format is very flexible, here we use 10 steps per line
# and add a comment for the line numbers. The loader simply takes the key codes and ignores the rest.
PROGRAM:
43 00 44 01 97  00 00 00 43 01  # 000-009
91 76 11 42 00  25 42 01 61 00  # 010-019
00                              # 020

# Setup register content. The full TI-59 precision is supported. On the real hardware, the number below
# can't be entered directly, one would need SUM and division to set this up.
REGISTERS:
29 = 3.000000000004

KEYSTROKES:
# Automate keystrokes, sent after everything above has been set up. As a sample here, we calculate
# the sum from 1..5 using the program above. Keystrokes use the matrix coordinates, not the program
# memory keycodes. Hence, the key "5" is 73, and not 05.
73              # 5
11              # A
Wait: 2s        # Wait for 2 Seconds in order to see the result
43              # RCL
83              # 2
64              # 9
Wait: 2s        # The display only shows "3.", because there are not enough digits for the fraction.
75              # -
84              # 3
95              # =
# After subtracting 3 we see the fraction.`;

  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Files</p>
      <h1 className="page-title">Writing a preset file, step by step</h1>
      <p className="lede">
        A preset file is nothing more than plain text. This tutorial builds
        one up from nothing, one section at a time, so you can see exactly
        what each line changes. Every step below is also a real,
        downloadable <code>.ti59</code> file you can load in Calc-U 59 as
        you go — try each one before moving to the next.
      </p>

      <div id="editing-workflow" className="panel" style={{
        padding: 20, marginTop: 24, lineHeight: 1.7,
        border: "1px solid var(--accent-deep)",
        background: "rgba(240,192,64,.04)",
      }}>
        <p style={{ marginTop: 0 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Before you start</span>
        </p>
        <p>
          A preset is just a text file, so it's usually easiest to write and
          edit it on a computer with a proper text editor, then get the
          finished file onto whichever device runs Calc-U 59. In the Apple
          ecosystem, the simplest way is to keep your presets in the{" "}
          <strong>Calc-U-59</strong> folder under iCloud Drive on your Mac —
          the same folder the app uses for virtual magnetic cards — and let
          iCloud sync it to your iPhone or iPad automatically; open it there
          from the Files app or the preset picker. On Windows and Linux,
          keep them in any folder and point Settings › Files › Preset Folder
          at it; to get them onto a phone, any folder that syncs to it works.
        </p>
        <p style={{ marginBottom: 0 }}>
          None of that is required, though: you can write and edit a preset
          directly on an iPhone or iPad in any text editor that saves plain
          text, with no computer involved at all. That also means you can
          read this tutorial on the device itself and download each step's
          file straight to it — the same goes for every other preset on the{" "}
          <a href="/59/software/">TI-59 Software Collection</a> page.
        </p>
      </div>

      <div id="txt-extension" className="panel" style={{
        padding: 20, marginTop: 12, lineHeight: 1.7,
        border: "1px solid var(--accent-deep)",
        background: "rgba(240,192,64,.04)",
      }}>
        <p style={{ marginTop: 0 }}>
          <span className="eyebrow" style={{ color: "var(--accent)" }}>Watch out for .txt</span>
        </p>
        <p style={{ marginBottom: 0 }}>
          When you save a preset with a plain text editor, it's easy to end
          up with <code>my-preset.ti59.txt</code> instead of{" "}
          <code>my-preset.ti59</code> — Windows and macOS both hide known
          file extensions by default, so the file still looks like{" "}
          <code>my-preset.ti59</code> in Finder, Explorer, or the iPhone
          file picker. Calc-U 59's preset picker only accepts{" "}
          <code>.ti59</code>, <code>.ti58</code> and <code>.ti58c</code>, so
          a file with a hidden <code>.txt</code> tail shows up{" "}
          <strong>grayed out and can't be selected</strong>. If that
          happens, turn on "Show file extensions" (Windows Explorer) or
          "Show all filename extensions" (macOS Finder — Finder ▸ Settings ▸
          Advanced) and rename the file, or rename it from a terminal with{" "}
          <code>mv my-preset.ti59.txt my-preset.ti59</code>.
        </p>
      </div>

      <TutorialStep num={1} title="Setup" code={step1} file="tutorial-1-setup.ti59">
        <p style={{ marginTop: 0 }}>
          Start with the three lines every preset can begin with:{" "}
          <strong>MODEL</strong> picks which calculator you get (TI-59,
          TI-58 or TI-58C), <strong>SOLID-STATE-MODULE</strong> loads one of
          the fourteen library modules by its two-letter code — here{" "}
          <strong>ML</strong> for the Master Library — and{" "}
          <strong>PRINTER</strong> switches the emulated PC-100C on or off.
        </p>
        <p style={{ marginBottom: 0 }}>
          Load this file and you already have a working calculator: nothing
          else in a preset is required. Everything from here on is
          optional, added only because this particular preset needs it.
        </p>
      </TutorialStep>

      <TutorialStep num={2} title="Partition" code={step2} file="tutorial-2-partition.ti59">
        <p style={{ marginTop: 0 }}>
          <strong>PARTITION</strong> sets the split between program memory
          and data registers — the same trade-off the real TI-59 keyboard
          sequence <strong>2nd Op 17</strong> controls. The value is written
          as <code>steps.registers</code>: <code>719.29</code> means step
          719 is the last program step, so 720 steps go to the program and
          the remaining 240 steps become 30 data registers (numbered 00–29)
          on a TI-59. Leave this line out and the emulator uses
          the model's default partition instead.
        </p>
        <p style={{ marginBottom: 0 }}>
          This step doesn't change what you see when you load the file —
          there's no program or cue card yet. The tutorial's program is
          short enough for the default partition too; the line is here to
          show the syntax.
        </p>
      </TutorialStep>

      <TutorialStep num={3} title="Cue card" code={step3} file="tutorial-3-cuecard.ti59">
        <p style={{ marginTop: 0 }}>
          <strong>CUECARD</strong> is what turns a blank calculator into a
          labeled one. <strong>Template: MagnetCard</strong> and{" "}
          <strong>CueCard</strong> draw almost identical card art — real
          magnetic cards and cue cards used the same front-side label design.
          The difference is the back: a magnetic card stores the program, a
          cue card doesn't, so <strong>MagnetCard</strong> is the right
          choice here since this file is building toward one.{" "}
          <strong>Title</strong> and <strong>Banks</strong> are the card's
          header text and bank badges.
        </p>
        <p>
          <strong>Row1</strong> replaces the entire A′–E′ label row with one
          line of running text instead of five separate key labels — handy
          for a one-line instruction like this tutorial's "Calculates the
          sum of 1..N the slow way". <strong>A</strong> through{" "}
          <strong>E</strong> label the plain key row individually;{" "}
          <code>\blank</code> on <strong>D</strong> and <strong>E</strong>{" "}
          merges those key positions into C's label so "Enter number, then
          A" reads across all three keys.
        </p>
        <p style={{ marginBottom: 0 }}>
          Load this file now and the card appears immediately — nothing on
          it does anything yet, because there's still no program behind the{" "}
          <strong>A</strong> key. The full{" "}
          <a href="/59/presets/#labeling-keys">CUECARD field reference</a>{" "}
          covers every field, the math-notation shortcuts, and both
          templates in more depth.
        </p>
      </TutorialStep>

      <TutorialStep num={4} title="Program" code={step4} file="tutorial-4-program.ti59">
        <p style={{ marginTop: 0 }}>
          <strong>PROGRAM</strong> loads program memory as key codes — the
          same codes the calculator itself displays while you record a
          program by hand, not the physical key positions. Whitespace and
          line breaks are cosmetic; the loader reads a flat stream of
          two-digit codes and ignores anything after <strong>#</strong>, so
          the step-number comments above are for the reader, not the
          parser. This particular listing sums a number down to 1: it
          stores the entered value, loops subtracting and adding into a
          running total, and stops with <strong>R/S</strong> when done.
        </p>
        <p style={{ marginBottom: 0 }}>
          Load this file and press a digit, then <strong>A</strong> — the
          cue card told you to — and the program actually runs now.
        </p>
      </TutorialStep>

      <TutorialStep num={5} title="Registers" code={step5} file="tutorial-5-registers.ti59">
        <p style={{ marginTop: 0 }}>
          <strong>REGISTERS</strong> preloads data register contents as
          plain decimal numbers, at the calculator's full internal
          precision — 13 significant digits. The value here,{" "}
          <code>3.000000000004</code> in register 29, is deliberately one
          that's awkward to key in by hand on real hardware (you'd need{" "}
          <strong>SUM</strong> and a division to land on it exactly); a
          preset just states the final value directly.
        </p>
        <p>
          This step doesn't change what the program does — register 29
          isn't part of the sum routine above — it's here so the next step
          has something worth recalling with <strong>RCL</strong>.
        </p>
        <p style={{ marginBottom: 0 }}>
          To check that a value actually loaded, open the <a href="/59/debugger/">debugger</a>{" "}
          and look at the register list — on Mac, Windows, Linux and on iPad
          in landscape it's visible right alongside the calculator; on iPhone (and iPad in
          portrait) swipe to it. The debugger has to be turned on first on
          iPhone/portrait iPad: enable <strong>Debug Page in Portrait</strong>{" "}
          under <strong>Settings</strong>, or it won't be there to swipe to.
        </p>
      </TutorialStep>

      <TutorialStep num={6} title="Keystrokes" code={step6} filename="tutorial.ti59" file="tutorial.ti59">
        <p style={{ marginTop: 0 }}>
          <strong>KEYSTROKES</strong> is the odd one out: everything above
          describes the calculator's state, but this section acts, sending
          real key presses after everything else has loaded —{" "}
          <strong>Wait: 2s</strong> pauses between groups so you can watch
          the display change. Keystrokes use <em>matrix coordinates</em>,
          not the program-memory key codes from Step 4 — the digit{" "}
          <strong>5</strong> is program key code <code>05</code> but matrix
          code <code>73</code>. The two tables are documented separately in
          the format reference precisely because mixing them up is the most
          common preset-writing mistake.
        </p>
        <p style={{ marginBottom: 0 }}>
          This is the finished tutorial file. Loading it types{" "}
          <strong>5</strong>, <strong>A</strong> to run the sum program from
          Step 4, waits, then recalls register 29 from Step 5 and subtracts
          3 from it — demonstrating, in order, every section this tutorial
          added.
        </p>
      </TutorialStep>

      <div className="panel" style={{ padding: 20, marginTop: 32, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          That covers enough to write your own preset from scratch. The{" "}
          <a href="/59/presets/">preset reference page</a> documents every
          section in one place, and the complete grammar — the full matrix
          code table, 2nd-function key codes, and the CUECARD field list —
          is developer documentation in the GitHub repository:{" "}
          <a href="https://github.com/tinue/Calc-U-59/blob/main/reference/StateFileFormat.md" className="link-accent">
            reference/StateFileFormat.md →
          </a>
        </p>
        <p style={{ marginBottom: 0 }}>
          For more preset files to read and load, including much longer
          real-world programs, see the{" "}
          <a href="/59/software/">TI-59 Software Collection</a>.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

function DebuggerPage() {
  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Debug</p>
      <h1 className="page-title">Using the debugger</h1>
      <p className="lede">The debug pane combines a program-level view, a CPU-level instruction trace, and a trace capture tool for analyzing the emulator's behavior in detail.</p>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 24 }}>
        <h3 className="sub" style={{ marginTop: 0, marginBottom: 12 }}>Overview</h3>
        <p style={{ margin: 0 }}>
          The debug pane has three tabs: <strong>CALCULATOR</strong>, <strong>CPU</strong>, and <strong>LOG</strong>.
        </p>
        <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
          <li><strong>CALCULATOR</strong> — Program listing (copied from RAM), the working value X, registers, flags and the status register at the current moment. Shows the step that will execute <em>next</em>. Useful for stepping through your own programs.</li>
          <li><strong>CPU</strong> — Execution trace: the actual sequence of ROM instructions that ran. Shows the instruction that just <em>finished</em> and the register state <em>after</em> it executed. You can scroll back through the history.</li>
          <li><strong>LOG</strong> — Dumps of the calculator's memory on request, the debug log, and the TRACE toggle. Most useful for capturing session files for deep analysis.</li>
        </ul>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0, marginBottom: 12 }}>CALCULATOR tab</h3>
        <p style={{ marginTop: 0 }}>
          The CALCULATOR tab shows a window into program memory (copied from RAM) centred on the current step. The highlighted instruction is the one that will execute <strong>next</strong>. After a jump (GTO, SBR, etc.) the listing jumps to the new location — it does not show where you came from, because it is not a trace.
        </p>
        <p>
          Registers and flags reflect the calculator state <strong>right now</strong>, before the highlighted step runs. When frozen, the cursor reads <strong>← next</strong>, as the calculator's own LRN display does after SST. While a program runs, the tab shows the state at the last program step, never the middle of an operation.
        </p>
        <ul style={{ margin: "0 0 12px", paddingLeft: 20 }}>
          <li><strong>X:</strong> — the calculator's working value with all 13 digits. When that register holds no number (for example while single-stepping a fast-mode program), the raw register is shown in amber.</li>
          <li><strong>DEBUG</strong> — the FA and FB flag registers and <strong>HIR0:</strong>, the whole status register.</li>
          <li>Fast mode is shown whenever the program runs in it.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          <strong>STEP in CALCULATOR mode</strong> — advances exactly as SST does: one program step per press, with a jump (GTO, SBR, RTN, a conditional) completed in the step that causes it. Hold STEP to repeat. This is the right tool for tracing through a keystroke-driven program one step at a time.
        </p>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0, marginBottom: 12 }}>CPU tab</h3>
        <p style={{ marginTop: 0 }}>
          The CPU tab shows the actual ROM instructions that executed, in order. Each entry represents an instruction that <strong>already ran</strong>; registers and flags are in the state <em>after</em> that instruction completed.
        </p>
        <p>
          Because it is a true execution trace, you can see jumps, subroutine calls, and PREG transitions — the address changes visibly in the listing. You can also scroll back through past entries to review earlier execution.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>STEP in CPU mode</strong> — pressing Step executes exactly one ROM instruction, then freezes. This is the right tool when you want to follow the ROM's internal logic one opcode at a time.
        </p>
        <p style={{ marginTop: 8 }}>
          <strong>ROM HEATMAP</strong> — shows how often each ROM address ran; <strong>CLR</strong> starts it over. It resets when you switch to the CPU tab, unless the CPU is frozen.
        </p>
        <p style={{ marginTop: 8 }}>
          <strong>ASM OVERLAY</strong> — below the CPU tab, <strong>Select File</strong> loads a small assembly program (see the <a href="/59/software/">assembly examples</a>), <strong>Run</strong> starts it and <strong>Clear</strong> removes it. While an overlay is active, the CALCULATOR tab is unavailable.
        </p>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <strong>Note on TEST/JUMP flags:</strong> because state is captured <em>after</em> each instruction, a TEST shows the flag it set, but the following JUMP shows the auto-restored condition (usually 1). This is expected behaviour — it is not a bug.
        </p>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0, marginBottom: 12 }}>Freeze controls</h3>
        <p style={{ marginTop: 0 }}>
          The CALCULATOR and CPU tabs each have their own row of buttons in the tab's header: <strong>RESUME</strong>, <strong>FREEZE</strong>, <strong>FREEZE ON START</strong> (<strong>F.START</strong> when the panel is narrow), <strong>ARMED</strong>, and <strong>STEP</strong>.
        </p>
        <ul style={{ margin: "8px 0", paddingLeft: 20 }}>
          <li><strong>FREEZE</strong> — stops the CPU (in the CALCULATOR tab, at the next step).</li>
          <li><strong>FREEZE ON START (CALCULATOR tab)</strong> — arms the debugger so it freezes right before the first program step runs, the same point STEP stops at. This is triggered by pressing R/S, launching a program via a label, or any similar action. Useful for catching the very start of a program run.</li>
          <li><strong>FREEZE ON START (CPU tab)</strong> — arms the debugger so it freezes the moment the calculator leaves the keyboard scan loop. This happens when you press any key (which causes the ROM to exit the idle loop and start processing the keystroke) or when the calculator is reset. Useful for catching the very first ROM instruction of a key-press handler.</li>
          <li><strong>ARMED</strong> — shown in yellow when FREEZE ON START is active; click it to cancel.</li>
          <li><strong>RESUME</strong> — resumes execution from the frozen state.</li>
          <li><strong>STEP</strong> — advances one step (semantics differ per tab, see above).</li>
        </ul>
        <p style={{ marginTop: 8, marginBottom: 0, color: "var(--fg-2)" }}>
          Only one FREEZE ON START can be armed at a time. Pressing it in one tab while the other is already ARMED silently transfers the arm. Once frozen, RESUME and STEP are only available in the tab that caused the freeze — the other tab's buttons are disabled to prevent accidental cross-tab interactions.
        </p>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0, marginBottom: 12 }}>iPhone behaviour</h3>
        <p style={{ marginTop: 0 }}>
          On iPhone, the debugger is a page of its own in portrait (turn on Settings › Debug Page in Portrait) and covers the calculator. This is different from iPad, the Mac, Windows and Linux, where both views are visible at the same time.
        </p>
        <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
          <li>Switching to the <strong>CPU</strong> tab resets the heat map, because the CPU trace was not running while CALCULATOR was visible. Exception: if the CPU is already frozen when you switch, the heat map is preserved.</li>
          <li>The selected tab (CALCULATOR, CPU, LOG) is remembered when you navigate away from the debugger and return.</li>
          <li><strong>FREEZE ON START in CALCULATOR</strong> works best in landscape or on iPad/Mac, where you can press a key on the calculator while the tab is watching. On iPhone you would need to go back to the calculator, press the key, then return to the debugger.</li>
          <li><strong>FREEZE ON START in CPU</strong> arms in the background and fires as soon as you press any key (or reset the calculator), regardless of which tab or screen is visible — the freeze is waiting for a ROM-level scan-loop exit, not a screen interaction.</li>
        </ul>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0, marginBottom: 12 }}>TRACE and LOG: for session capture and analysis</h3>
        <p style={{ marginTop: 0 }}>
          The <strong>LOG</strong> panel serves two main purposes:
        </p>
        <ul style={{ margin: "8px 0", paddingLeft: 20 }}>
          <li><strong>Dumps</strong> — the <strong>SCOM</strong>, <strong>Memory</strong>, <strong>Prog</strong> and <strong>Vars</strong> buttons write the scratch registers, the RAM, the program or the data registers to the log as raw values; the trash button clears it.</li>
          <li><strong>TRACE toggle</strong> — Records a binary session file while the calculator is running. This is the most thorough way to understand sequences like the reset routine or key-processing flow.</li>
        </ul>

        <p style={{ marginTop: 12, marginBottom: 12 }}>
          <strong>To capture and analyze a sequence:</strong>
        </p>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>Switch to the LOG tab and toggle TRACE on.</li>
          <li>Perform the action you want to analyze (e.g., press <strong>Reset</strong>, or execute a ROM subroutine).</li>
          <li>Toggle TRACE off to stop recording.</li>
          <li>Find the trace file: on the Mac in the Save Location from Settings (local by default), on iPhone and iPad in the app's iCloud folder (use the Files app), on Windows and Linux in the trace folder from Settings › Files. The app tells you if the file couldn't be created or reached its size limit.</li>
          <li>On a computer with Python, download the <code>read_trace.py</code> tool from the <a href="https://github.com/tinue/Calc-U-59/tree/main/tools" className="link-accent">Calc-U-59 tools folder</a>.</li>
          <li>Run: <code style={{ background: "var(--bg-inset)", padding: "2px 6px", borderRadius: 4 }}>python3 ./read_trace.py --clean --skip-repeating CALCU59_TRACE.bin &gt; CALCU59_TRACE.txt</code> (the TI-58 and TI-58C write CALCU58_TRACE.bin and CALCU58C_TRACE.bin).</li>
          <li>Open the resulting text file to see the full execution trace as human-readable disassembly.</li>
        </ol>

        <p style={{ marginTop: 12, marginBottom: 0 }}>
          The binary trace file can be large (190 MB for a long session), but the text output is much smaller (57 kB) because the tool deduplicates repetitive loops — especially the keyboard scan loop that runs continuously. This makes it practical to analyze even long traces.
        </p>
      </div>

      <div className="panel" style={{ padding: 20, lineHeight: 1.7, marginTop: 12 }}>
        <h3 className="sub" style={{ marginTop: 0, marginBottom: 12 }}>When to use each tool</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>CALCULATOR tab</strong> — Stepping through your own program one step at a time, checking registers and flags at each step.</li>
          <li><strong>CPU tab</strong> — Tracing the ROM's internal instruction flow, reviewing jumps and subroutine calls, scrolling back through execution history.</li>
          <li><strong>TRACE (in LOG)</strong> — Capturing a complete ROM sequence for offline analysis (reset routine, memory writes, keyboard processing, etc.).</li>
          <li><strong>Debug logging (in LOG)</strong> — the LOG button cycles the level between Off, Info and Debug (grey, orange and red dot). It is mainly used by the developer for debugging specific issues. When enabled, you will see all memory writes and other hardware events. This has limited utility for regular app users.</li>
        </ul>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <div className="panel" style={{ padding: 16 }}>
          <h3 className="sub" style={{ margin: "0 0 10px" }}>CALCULATOR tab — iPhone</h3>
          <img
            src="/59/assets/iphone-debug.png"
            alt="iPhone screenshot showing the CALCULATOR debug tab with program listing and registers"
            style={{ width: "auto", maxWidth: "60%", height: "auto", display: "block", borderRadius: 8, margin: "0 auto" }}
          />
        </div>
        <div className="panel" style={{ padding: 16 }}>
          <h3 className="sub" style={{ margin: "0 0 10px" }}>CALCULATOR tab — iPad</h3>
          <img
            src="/59/assets/ipad-13-2752x2064.png"
            alt="iPad screenshot showing the CALCULATOR debug tab"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
          />
        </div>
        <div className="panel" style={{ padding: 16 }}>
          <h3 className="sub" style={{ margin: "0 0 10px" }}>CPU tab — iPad</h3>
          <img
            src="/59/assets/ipad-2752x2064-asm.png"
            alt="iPad screenshot showing the CPU debug tab with execution trace"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

/* =============================================================
   APP REFERENCE — emulator controls and screen regions.
   ============================================================= */
function ReferencePage() {
  return (
    <main className="wrap docs-split">
      <div>
        <p className="eyebrow">App Reference</p>
        <h1 className="page-title">Every control,<br/>annotated.</h1>
        <p className="lede">This page explains the emulator controls as they behave in the app: the calculator, the printer, the debug pane, and the settings that affect a session.</p>

        <h2 className="section">The calculator</h2>
        <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            The calculator view is the main working surface. On iPhone and on iPad in portrait, it uses the same key layout as the app screenshot; on iPad in landscape, the layout mirrors the Mac view.
          </p>
          <p>
            The top display area shows the current number and status indicators, the cue card area directly beneath it shows module/context notes, and the keyboard area contains the full key matrix for normal operation.
          </p>
          <p>
            Bottom bar on iPhone and iPad (left to right): <strong>Reset</strong> (long press: a clean reset that also wipes the memory), the <strong>model picker</strong> (TI-59/TI-58/TI-58C), the two <strong>Crd</strong> buttons (load a card; insert a blank card to write) and <strong>Eject Card</strong> — on the TI-59 only, the one with a card reader — then <strong>Preset</strong> and <strong>Settings</strong>.
          </p>
          <p style={{ marginBottom: 0 }}>
            On the Mac, Windows and Linux, the bar has the same buttons except Settings, which is in the app menu (Mac) or the File menu (Windows, Linux). Holding <strong>⌘</strong> (Mac) or <strong>Ctrl</strong> (Windows, Linux) turns Reset into <strong>Clean</strong>. On the Mac the model picker sits in the window's toolbar.
          </p>
        </div>

        <h2 className="section">The printer</h2>
        <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            The printer view has a <strong>PC-100C</strong> button at the top (connects or disconnects the printer, and resets the calculator), a dot/text toggle, the printer's <strong>PRINT</strong> and <strong>ADV</strong> keys, and <strong>T</strong>, its TRACE switch. Copy puts the paper strip on the clipboard as an image and as text; cut copies it and then clears the paper.
          </p>
          <p style={{ marginBottom: 0 }}>
            The text view is useful when you want to read or copy output quickly. The dot view is the closer match to the physical printer.
          </p>
        </div>

        <h2 className="section">The debug pane</h2>
        <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            The debug pane has three tabs: <strong>CALCULATOR</strong>, <strong>CPU</strong>, and <strong>LOG</strong>.
          </p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
            <li><strong>CALCULATOR</strong> — Program listing (from RAM) centred on the next instruction to execute, with live registers and flags.</li>
            <li><strong>CPU</strong> — Execution trace of ROM instructions that already ran. State shown is <em>after</em> each instruction. Scrollable history, one-opcode step.</li>
            <li><strong>LOG</strong> — Dumps of the SCOM registers, memory, program and variables, the debug log level, and the TRACE toggle. Use TRACE to capture a binary session file for detailed analysis with read_trace.py.</li>
          </ul>
          <p style={{ marginTop: 8, marginBottom: 0 }}>
            The CALCULATOR and CPU tabs have different step semantics: CALCULATOR advances one program step, as SST does; CPU advances exactly one ROM opcode. See <a href="/59/debugger/">Using the debugger</a>.
          </p>
        </div>

        <h2 className="section">Settings</h2>
        <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
          <p style={{ marginTop: 0 }}>
            Settings choose the <strong>Startup Calculator</strong> (a model, or Last Used), the <strong>Solid State Module</strong>, the LED <strong>Segment Style</strong> (Modernized or Classic), and the trace file's <strong>Maximum File Size</strong>, so long debug sessions don't grow without bound. iPhone and iPad add <strong>Keyboard Feedback</strong> and <strong>Debug Page in Portrait</strong>.
          </p>
          <p style={{ marginBottom: 0 }}>
            Where files go: on the Mac, the trace file's <strong>Save Location</strong> (local, iCloud or a folder you choose); on iPhone and iPad, traces go to the app's iCloud folder. On Windows and Linux, <strong>Files</strong> sets the preset, card and trace folders.
          </p>
        </div>

        <div style={{ marginTop: 24 }}>
          <BackButton />
        </div>
      </div>

      <div className="docs-aside">
        <div className="panel" style={{ padding: 14 }}>
          <div style={{ position: "relative" }}>
            <img
              src="/59/assets/app-screenshot.png"
              alt="Calc-U 59 main app screenshot with annotated interface regions and toolbar buttons"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }}
            />

            <div style={{ position: "absolute", top: "10%", left: "48%", transform: "translateX(-50%)", background: "rgba(0,0,0,.72)", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 999, padding: "4px 8px", fontFamily: "var(--font-key)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}>Display</div>
            <div style={{ position: "absolute", top: "21%", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.72)", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 999, padding: "4px 8px", fontFamily: "var(--font-key)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}>Cue card</div>
            <div style={{ position: "absolute", top: "36%", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.72)", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 999, padding: "4px 8px", fontFamily: "var(--font-key)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}>Keyboard</div>

              <div style={{ position: "absolute", bottom: "2.1%", left: "6%", width: 22, height: 22, borderRadius: 999, background: "var(--accent)", color: "#21170f", fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center" }}>1</div>
              <div style={{ position: "absolute", bottom: "2.1%", left: "17%", width: 22, height: 22, borderRadius: 999, background: "var(--accent)", color: "#21170f", fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center" }}>2</div>
              <div style={{ position: "absolute", bottom: "2.1%", left: "62%", width: 22, height: 22, borderRadius: 999, background: "var(--accent)", color: "#21170f", fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center" }}>3</div>
              <div style={{ position: "absolute", bottom: "2.1%", left: "70%", width: 22, height: 22, borderRadius: 999, background: "var(--accent)", color: "#21170f", fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center" }}>4</div>
              <div style={{ position: "absolute", bottom: "2.1%", left: "80%", width: 22, height: 22, borderRadius: 999, background: "var(--accent)", color: "#21170f", fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center" }}>5</div>
              <div style={{ position: "absolute", bottom: "2.1%", left: "89%", width: 22, height: 22, borderRadius: 999, background: "var(--accent)", color: "#21170f", fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center" }}>6</div>
              <div style={{ position: "absolute", top: "6%", right: "8%", width: 22, height: 22, borderRadius: 999, background: "var(--accent)", color: "#21170f", fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center" }}>7</div>
          </div>

          <ol style={{ margin: "12px 0 0", paddingLeft: 20, lineHeight: 1.65, color: "var(--fg-2)", fontSize: 14 }}>
            <li><strong>Reset</strong> (long press: clean reset, wipes the memory)</li>
            <li><strong>Model picker</strong> (TI-59 / TI-58 / TI-58C)</li>
            <li><strong>Crd</strong>: load a card (TI-59)</li>
            <li><strong>Crd</strong>: insert a blank card to write (TI-59)</li>
            <li><strong>Preset</strong></li>
            <li><strong>Settings</strong></li>
            <li><strong>Swipe to printer</strong></li>
          </ol>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   FAQ — direct answers.
   ============================================================= */
// Also the FAQ page's structured data (.seo/build.js).
const FAQS = [
  {
    question: "Where do preset files live?",
    answer: "They are regular .ti59, .ti58, or .ti58c text files that can be anywhere on the file system. On Mac, Windows and Linux, Preset opens them from disk (on Windows and Linux, Settings › Files sets the folder it starts in); on iPhone and iPad, use the built-in file picker.",
  },
  {
    question: "Are there examples of preset files?",
    answer: "Yes. The GitHub repository includes an 'examples' folder with a selection of .ti59, .ti58, and .ti58c files, and the 'TI-59 Software Collection' page has downloadable copies. There's also a step-by-step tutorial that builds one from scratch.",
  },
  {
    question: "What are the 'assembly' examples here for?",
    answer: "This feature is still a bit experimental. You can load these examples in the ASM OVERLAY box under the debugger's CPU tab: Select File, then Run. Clear removes the overlay again.",
  },
  {
    question: "Where do virtual magnetic cards live?",
    answer: "On Mac, iPhone and iPad they are stored in the app's iCloud storage (or the app's local folder when iCloud is off); use the Crd buttons to load or save them. On Mac, they are also in Finder under 'iCloud Drive/Calc-U-59'. On Windows and Linux they are in the Calc-U-59 folder in your home folder, unless Settings › Files names another.",
  },
  {
    question: "Where is the TI-58C state file?",
    answer: "The TI-58C state file (ti58c.mem) is stored next to the cards: in the app's iCloud storage on Mac, iPhone and iPad, in the card folder on Windows and Linux. Unlike a preset, which you load on demand, this file is the TI-58C's persistent state — it's written and loaded automatically whenever you switch to the TI-58C model, standing in for the battery-backed static RAM the real hardware used to keep memory alive between sessions.",
  },
  {
    question: "Can I see what the emulator is doing internally?",
    answer: "Yes. Use the debug pane: CALCULATOR for program state and registers, CPU for the ROM instruction trace, and LOG for text output plus trace controls.",
  },
  {
    question: "How do I get a trace file?",
    answer: "Open the debug pane, switch to LOG, and turn TRACE on. The app writes a binary session file (CALCU59_TRACE.bin; CALCU58_TRACE.bin or CALCU58C_TRACE.bin for the smaller models) to the trace location: on Mac the one set in Settings (local by default), on iPhone and iPad the app's iCloud folder, on Windows and Linux the trace folder from Settings › Files. If the file can't be created or reaches its size limit, the app tells you.",
  },
  {
    question: "What can I do with a trace file?",
    answer: "You first need the trace file on a computer. On Mac, Windows and Linux it already is. An iPad or iPhone writes it to the app's iCloud folder, so it syncs to iCloud Drive; retrieve it from there on your computer. Download the 'read_trace.py' script from GitHub to convert the binary file to a readable format. The script is available in the 'tools' directory of the GitHub repository.",
  },
  {
    question: "Why does switching to the CPU tab reset the heat map?",
    answer: "The CPU tab only traces while it is visible. When you switch to it, the heat map resets because any activity since you last left would be missing anyway. Exception: if the CPU is already frozen when you switch, the heat map is left intact — there is nothing new to miss.",
  },
  {
    question: "What does FREEZE ON START do in the CPU tab?",
    answer: "In the CPU tab, FREEZE ON START (F.START when the panel is narrow) arms a scan-loop exit trigger: it freezes the moment the calculator leaves the keyboard idle loop — either because you pressed a key (the ROM exits the loop to handle the keystroke) or because the calculator was reset. This lets you catch the very first ROM opcode of a key-press handler without having to time a manual FREEZE. Only one FREEZE ON START can be armed at a time; arming one tab silently disarms the other.",
  },
  {
    question: "How can I step through the reset routine?",
    answer: "Switch to the CPU tab and press FREEZE ON START. Then go to the calculator and press Reset — the CPU will freeze at the first ROM instruction of the reset routine. Use STEP to walk through it one opcode at a time.",
  },
  {
    question: "I used FREEZE ON START in the CPU tab, the freeze triggered on a keypress — but after RESUME the key seems lost. Why?",
    answer: "This is expected. The ROM's key-debouncing logic registers a keypress only for a very short window. When the freeze fires, the CPU freezes at the first instruction after the scan loop exits — but that window has already passed by the time you press RESUME or STEP. The key handler never sees the keypress and the calculator returns to idle. Use a TRACE capture instead: it records the full keystroke sequence without stopping the emulator, so the debounce window is never interrupted.",
  },
  {
    question: "Is there a faster way to read long printer output?",
    answer: "Yes. Copy or cut the output, and paste it into a text editor.",
  },
  {
    question: "How do I create the cards that label the A-E and A'-E' keys?",
    answer: (
      <>
        Add a <strong>CUECARD:</strong> section to a preset: set{" "}
        <strong>Template</strong> to <code>MagnetCard</code> or{" "}
        <code>CueCard</code>, then fill in fields <strong>A</strong>{" "}
        through <strong>E</strong> and <strong>A′</strong> through{" "}
        <strong>E′</strong> for the two key rows. Load that file (or write it
        onto a virtual magnetic card to keep the label with the card) and it
        appears on screen. See{" "}
        <a href="/59/presets/#labeling-keys" className="link-accent">
          Loading a preset → Labeling the A–E and A′–E′ keys
        </a>{" "}
        for the format, the math shortcuts, and the loading options.
      </>
    ),
  },
  {
    question: "I wrote a preset file myself, but the app shows it grayed out and won't load it. Why?",
    answer: (
      <>
        Almost always a hidden <strong>.txt</strong> extension. Some text
        editors, and Finder/Explorer with extensions hidden, save{" "}
        <code>my-preset.ti59</code> as <code>my-preset.ti59.txt</code>{" "}
        without showing it — the file looks right in the file browser, but
        the preset picker only accepts <code>.ti59</code>, <code>.ti58</code>{" "}
        and <code>.ti58c</code>, so it's shown grayed out and can't be
        selected. Turn on "Show file extensions" (Explorer) or "Show all
        filename extensions" (Finder), or rename the file from a terminal,
        and it should load normally. See{" "}
        <a href="/59/presets/tutorial/#txt-extension" className="link-accent">
          the preset tutorial
        </a>{" "}
        for more on avoiding this.
      </>
    ),
  },
];

function FaqPage() {
  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Help</p>
      <h1 className="page-title">FAQ</h1>
      <p className="lede">Concise answers to the questions that usually come up first.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24 }}>
        {FAQS.map((item, i) => (
          <div key={i} className="panel" style={{
            padding: "16px 20px",
            display: "grid", gap: 8,
          }}>
            <span style={{
              fontFamily: "var(--font-key)", fontWeight: 700, fontSize: 16,
              textTransform: "uppercase", letterSpacing: ".05em",
              color: "var(--fg)",
            }}>{item.question}</span>
            <p style={{ margin: 0, lineHeight: 1.7, color: "var(--fg-2)" }}>{item.answer}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

function ModulesPage() {
  const modules = [
    { code: "ML", name: "Master Library" },
    { code: "ST", name: "Applied Statistics" },
    { code: "RE", name: "Investment" },
    { code: "SY", name: "Surveying" },
    { code: "NG", name: "Marine Navigation" },
    { code: "AV", name: "Aviation" },
    { code: "LE", name: "Leisure Library" },
    { code: "SA", name: "Securities Analysis" },
    { code: "BD", name: "Business Decisions" },
    { code: "MU", name: "Math/Utilities" },
    { code: "EE", name: "EE Library" },
    { code: "SE", name: "Structural Engineering" },
    { code: "AG", name: "Agriculture" },
    { code: "RP", name: "RPN Simulator" },
  ];
  return (
    <main className="wrap">
      <p className="eyebrow">Modules</p>
      <h1 className="page-title">Library modules</h1>
      <p className="lede">The module picker changes the Solid State Software library loaded into the emulator. That affects the cue card, the available programs, and the labels shown on screen.</p>

      <div className="panel" style={{ padding: 20, marginTop: 24, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          Keep the selected module aligned with the file you are loading. If a preset includes a <strong>SOLID-STATE-MODULE:</strong> line, the emulator can switch to that module automatically.
        </p>
        <p style={{ marginBottom: 0 }}>
          If the cue card or program list looks unexpected, the module selection is the first thing to check.
        </p>
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        {modules.map(m => (
          <div key={m.code} className="panel"
               style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center" }}>
            <div style={{
              background: "linear-gradient(180deg,#1a0c08,#2c1812)",
              color: "var(--accent)",
              fontFamily: "var(--font-key)", fontWeight: 700,
              padding: "8px 12px", borderRadius: 4,
              letterSpacing: ".05em", fontSize: 13,
              minWidth: 70, textAlign: "center",
              border: "1px solid var(--stroke-warm)",
            }}>{m.code}</div>
            <div>
              <h3 className="sub" style={{ margin: 0 }}>{m.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section">Per-module details</h2>
      <div className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          Each module has its own cue card content and program selection. The app loads the matching ROM/library data together with the module metadata so the on-screen card stays in sync with the selected library.
        </p>
        <p style={{ marginBottom: 0 }}>
          This is an emulator feature, not a historical TI-59 walkthrough: the purpose is to make the active module understandable while you use the app.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

/* =============================================================
   SOFTWARE — downloadable .ti59/.ti58/.ti58c programs and raw CPU
   assembly, sourced from examples/ in the main repository (that
   directory's own name is unrelated — these outgrew "examples" into a
   real software collection, hence the different name here). This is one
   of the copy-scope exceptions (with AboutTi59Page): most of these
   programs predate Calc-U 59 by decades, so the copy leans on the
   original TI-59/TI-58/TI-58C hardware and the magazines that published
   them — that's what someone who owned one, or is restoring one,
   actually searches for.
   ============================================================= */
function SoftwarePage() {
  const articles = [
    { file: "fast-mode", title: "TI-59 Fast Mode: Running Programs at ROM Speed", description: "What Fast Mode skips between steps, which instructions a fast-mode program may use, the safe ways to end one, four ways in — and how a firmware bug makes it possible." },
    { file: "printer-interrupt", title: "TI-59 Printer Interrupt: Stopping a Printed Line Halfway", description: "The manufactured keycode 1F that stops the PC-100 mid-line, the rules for using it, two ways to make it, and why it works." },
    { file: "ti-58c-changes", title: "TI-58C: Changes and Improvements compared to TI-58/59", description: "The TI-58C's revised ROM: constant memory, the rebuilt idle loop and its timing, the TI-59 bugs it fixes, Op 40, the TRACE branch marker and the factory self-test." },
  ];
  const categories = [
    {
      heading: "The calendar printer competition, 1978–1981",
      intro: "“52-Notes,” the TI programmable-calculator newsletter, ran a competition from 1978 to write the fastest TI-59 program that prints a full year calendar on the PC-100 printer, using the Master Library module's date routines. Each entry improved on the last; the 1981 winner is here too, with a new entry from 2026. PC-100/PC-100C printer required.",
      items: [
        { file: "calendar-01-Weinberger.ti59", title: "Calendar Printer — Jared Weinberger", description: "The opening entry in the competition (52-Notes V3N5).", printer: true },
        { file: "calendar-02-cargile.ti59", title: "Calendar Printer — Lou Cargile", description: "A second V3N5 entry, Lou Cargile's first attempt at the calendar problem.", printer: true },
        { file: "calendar-03-vanderburgh.ti59", title: "Calendar Printer — Richard Vanderburgh", description: "A third V3N5 entry, checking for the ML module and warning the user if it's missing.", printer: true },
        { file: "calendar-04-skillman.ti59", title: "Calendar Printer — Bill Skillman", description: "V3N6: a faster print-buffer packing approach, down to about 7½ minutes per year.", printer: true },
        { file: "calendar-05-vanderburgh.ti59", title: "Calendar Printer — Richard Vanderburgh (revised)", description: "V3N6: Vanderburgh folds in Panos Galidas' doubled print-code method and further tightens it, to about 5½ minutes per year.", printer: true },
        { file: "calendar-06-cargile.ti59", title: "Calendar Printer — Lou Cargile (bugfix)", description: "V3N7: a correction to an earlier entry — a missing CLR' meant the 1st of a month could fail to print if it fell on a Thursday.", printer: true },
        { file: "calendar-07-calidas.ti59", title: "Calendar Printer — Panos Galidas", description: "V3N9: the fastest of the 1978 entries, averaging 2 minutes 38.6 seconds per year over a five-year test span.", printer: true },
        { file: "calendar-08-acosta.ti59", title: "Calendar Printer — Patrick Acosta", description: "TI PPC Notes V9N2: the 1981 program that ended the race, using Fast Mode to print the worst-case year 2000 in 1 minute 23 seconds.", printer: true },
        { file: "calendar-09-dispatch.ti59", title: "Calendar Printer — fast mode with dispatched fix-ups (2026)", description: "A new entry, written with the Calc-U 59 tools: Acosta's output format, about 4% faster.", printer: true },
      ],
    },
    {
      heading: "PC-100 printer graphics and tricks",
      intro: "The PC-100/PC-100C thermal printer had an undocumented quirk: interrupting it mid-character exposes partial print heads, which the TI PPC user community turned into a small genre of printer-graphics demos through the early 1980s.",
      article: "printer-interrupt",
      items: [
        { file: "characters.ti59", title: "Print character table", description: "Prints the full TI-59 print-code table with row and column headers." },
        { file: "characters-fastmode.ti59", title: "Print characters in Fast Mode", description: "K-J Meusch's version of the character table, using Fast Mode to print far faster than normal execution (TI PPC Notes V5N9-10, 1980).", printer: true },
        { file: "fast-grafik-3d-plot-part1.ti59", title: "Fast-Grafik 3-D Plot — Part 1", description: "Peter Poloczek's 3-D surface plotter for the PC-100, built on the printer-interrupt trick (TI PPC Notes V8N2, 1983). Load Part 2 after this one finishes, without resetting.", printer: true },
        { file: "fast-grafik-3d-plot-part2.ti59", title: "Fast-Grafik 3-D Plot — Part 2", description: "The second half of Poloczek's 3-D plotter. Requires Part 1 to have already run in the same session.", printer: true },
        { file: "printer-quirks.ti59", title: "Printer interrupt character table", description: "Dave Leising's print-code table showing each character both normally and interrupted mid-print (PPX Exchange, March/April 1982).", printer: true },
        { file: "printer-interrupt.ti59", title: "The printer interrupt, smallest form", description: "Prints “A0” twice, once normally and once cut off after two of its seven dot rows — the trick the printer-graphics programs here are built on, in a few steps.", printer: true },
        { file: "stars-and-stripes.ti59", title: "Stars & Stripes", description: "Richard Snow's demonstration of PC-100 graphics capability, drawing a flag using the printer-interrupt technique (TI PPC Notes V6N4-5, 1981).", printer: true },
        { file: "texas-print.ti59", title: "“TI” logo — high-resolution printer graphics", description: "Frank Dever's high-resolution “TI” logo (PPX Exchange, March/April 1982). The program corrupts a program-step keycode on purpose to redirect the ROM's dispatcher mid-instruction — the file's header traces exactly which ROM address that lands on.", printer: true },
        { file: "trace-quirk.ti59", title: "Printer trace-mode quirk", description: "A keystroke sequence, found by a TI PPC club member, that puts a TI-58 or TI-59 into an undocumented trace mode once a printer is attached (TI PPC Notes V6N4-5, 1981).", printer: true },
      ],
    },
    {
      heading: "Diagnostics and self-tests",
      intro: "Factory-style diagnostics for checking whether a TI-59 or TI-58 is healthy — useful background if you're troubleshooting real hardware, and a good stress test for the emulation core.",
      items: [
        { file: "diag.ti59", title: "TI-59 calculator diagnostic", description: "The magnetic-card diagnostic Texas Instruments documented in the owner's manual, both card sides. Prints and displays “−.8888888888” when everything checks out.", printer: true },
        { file: "diag.ti58", title: "TI-58 calculator diagnostic", description: "The same diagnostic, resized to fit the TI-58's smaller memory partition.", printer: true },
        { file: "ram_test.ti59", title: "RAM test", description: "A roughly three-minute test of all data registers that prints “598-TEST-1” and reports the default memory partition; faulty registers are called out by address." },
        { file: "ram_test_full_fast.ti59", title: "Full RAM test (Fast Mode)", description: "George Thomson's test of all 100 data registers using indirect addressing and the STF fast-mode trick, printing any mismatch on the PC-100A/PC-100C (TI PPC Notes V9N5, 1985).", printer: true },
        { file: "repartition.ti58c", title: "TI-58C repartitioning reference", description: "Keystroke notes on how the TI-58C's constant-memory feature stores the partition setting, and how to reach the extra 32 steps (480–511) that are otherwise keyboard-only (TI PPC Notes V5N7, 1980)." },
      ],
    },
    {
      heading: "Fast Mode, keycodes and firmware curiosities",
      intro: "Fast Mode is an undocumented TI-58/TI-58C/TI-59 execution mode, discovered and written up by the TI PPC club over several years — these programs demonstrate it, along with a couple of other undocumented corners of the ROM.",
      article: "fast-mode",
      items: [
        { file: "fastmode.ti59", title: "Fast Mode factorial demo (TI-59)", description: "Computes factorials in both normal and Fast Mode so the roughly 70% speed difference is directly comparable — 10! in about 4.6 seconds, 69! in about 31." },
        { file: "fastmode.ti58", title: "Fast Mode factorial demo (TI-58)", description: "The same Fast Mode factorial comparison, for the TI-58/TI-58C." },
        { file: "fastmode-sst.ti59", title: "The shortest way into Fast Mode", description: "A new, shorter Fast Mode entry, found by tracing the ROM in 2026; computes 69! like the factorial demo. Loading the file runs the entry sequence automatically." },
        { file: "FastMode_Zero4.ti59", title: "Fast Mode zero-padding bug", description: "A mistyped Fast Mode program — one leading zero short of the documented five — that puts a real TI-59 into an unusual, reproducible misbehaving state. Kept as a regression case; it also uncovered a display-refresh bug in the emulator, fixed before v1.0.0." },
        { file: "firmware.ti59", title: "Firmware listing keystroke sequence", description: "An unusual keyboard sequence, originally described by TI PPC Notes editor Maurice Swinnen, that puts the TI-59 into a mode where the ROM firmware itself can be listed." },
        { file: "keycodes.ti59", title: "Print all keycodes", description: "Jared Weinberger's routine for generating and printing every TI-59 key code, using dynamic program-code modification (TI PPC Notes V5N4-5, 1980)." },
      ],
    },
    {
      heading: "Utilities",
      intro: "Small, self-contained programs that aren't tied to a particular magazine series.",
      items: [
        { file: "Integer-Base-Conversion.ti59", title: "Integer base conversion", description: "Converts an integer between arbitrary number bases — hex to binary to decimal and back — originally published in Computer Design magazine, 1980." },
        { file: "Frequency-Transformation.ti59", title: "Frequency transformation", description: "A filter-design program that transforms a normalized low-pass filter's cutoff frequencies, from the Artech House discrete-time filter design tables." },
        { file: "sum.ti59", title: "Sum of N numbers", description: "A deliberately simple program — sums N down to 1 — useful as a stopwatch for comparing execution speed across devices running the emulator." },
      ],
    },
    {
      heading: "CPU-level assembly examples",
      intro: "These target the TMC0501 CPU inside the calculator directly, as raw opcodes rather than a keystroke program, loaded through the ASM Overlay in the app's debug panel. They only run in the full app (Mac, Windows, Linux, iPhone, iPad), not the browser emulator below.",
      items: [
        { file: "assembly/simple_count.asm", title: "Simple counter", description: "The smallest useful ASM overlay example: increments a counter on the display in a tight loop, about 1185 times a second." },
        { file: "assembly/stopwatch.asm", title: "Stopwatch", description: "A precisely timed stopwatch built on the WAIT Dn instruction rather than counting cycles — 222 increments per second, 4.5011 ms each." },
        { file: "assembly/DPT.asm", title: "Decimal-point test", description: "Cycles the decimal point across every digit position. The emulator shows the display as the eye sees it, so — as on the real calculator — all the points look lit at once." },
        { file: "assembly/Decoder.asm", title: "7-segment decoder edge case (known non-working)", description: "A real-hardware timing edge case — a phase-shifted WAIT before SET IDLE exposes all 16 hex segment patterns on real silicon. Documented here for the CPU-emulation detail, but it does not reproduce on Calc-U 59: the emulator latches each display position at its own digit strobe, so CPU and display are always in phase and the timing quirk this program depends on has nothing to act on." },
      ],
    },
  ];

  return (
    <main className="wrap-narrow">
      <p className="eyebrow">Software</p>
      <h1 className="page-title">TI-59 Software Collection</h1>
      <p className="lede">
        Programs written for real TI-59, TI-58 and TI-58C hardware, from the 1978 <em>52-Notes</em> calendar
        competition to TI PPC club printer-graphics tricks and factory diagnostics — collected here as
        loadable preset files, whether or not you have Calc-U 59 installed yet.
      </p>

      <div className="panel" style={{ padding: 20, marginTop: 24, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          Each entry below is a <strong>.ti59</strong>, <strong>.ti58</strong> or <strong>.ti58c</strong>{" "}
          <a href="/59/presets/">preset file</a> — the calculator's program, registers and (where the
          original used one) magnetic-card cue card, ready to load. Programs marked <strong>Requires printer</strong>{" "}
          need the emulated PC-100/PC-100C — available in the full app, not the browser emulator below.
        </p>
        <p style={{ marginBottom: 0 }}>
          Get Calc-U 59 for <a href="/59/install/mac/">Mac</a>,{" "}
          <a href="/59/install/windows-linux/">Windows and Linux</a> or{" "}
          <a href="/59/install/iphone-ipad/">iPhone and iPad</a>, then open a downloaded file, or try the{" "}
          <a href="/59/play/">browser emulator</a> first — it has no printer, but the utilities below that don't
          need one will run.
        </p>
      </div>

      <h2 className="section" id="articles">Articles</h2>
      <p style={{ color: "var(--fg-2)", lineHeight: 1.7, marginTop: -8 }}>
        How the undocumented tricks behind several of these programs work, and how the TI-58C's firmware differs
        from its predecessors — to read here or download as PDF.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        {articles.map((a) => (
          <div key={a.file} id={a.file} className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "4px 16px" }}>
              <h3 className="sub" style={{ margin: 0 }}>{a.title}</h3>
              <span style={{ display: "flex", gap: 8 }}>
                <a className="btn secondary" href={`/59/articles/${a.file}.html`}>Read</a>
                <a className="btn secondary" href={`/59/articles/${a.file}.pdf`} download>PDF</a>
              </span>
            </div>
            <p style={{ margin: "8px 0 0", color: "var(--fg-2)" }}>{a.description}</p>
          </div>
        ))}
      </div>

      {categories.map((cat) => (
        <React.Fragment key={cat.heading}>
          <h2 className="section">{cat.heading}</h2>
          <p style={{ color: "var(--fg-2)", lineHeight: 1.7, marginTop: -8 }}>
            {cat.intro}
            {cat.article ? (
              <> How it works: <a href={`/59/articles/${cat.article}.html`}>{articles.find((a) => a.file === cat.article).title}</a>.</>
            ) : null}
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {cat.items.map((it) => (
              <div key={it.file} id={it.file.replace(/^assembly\//, "").replace(/\./g, "-")} className="panel" style={{ padding: 20, lineHeight: 1.7 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "4px 16px" }}>
                  <h3 className="sub" style={{ margin: 0 }}>{it.title}</h3>
                  <a className="btn secondary" href={`/59/software-files/${it.file}`} download>
                    Download {it.file.replace(/^assembly\//, "")}
                  </a>
                </div>
                <p style={{ margin: "8px 0 0", color: "var(--fg-2)" }}>{it.description}</p>
                {it.printer ? (
                  <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--fg-3)" }}>Requires the PC-100/PC-100C printer.</p>
                ) : null}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}

      <h2 className="section">Source and format</h2>
      <div className="prose panel" style={{ padding: 20, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>
          These files are maintained in the <a href="https://github.com/tinue/Calc-U-59/tree/main/examples">
          examples/ directory</a> of the Calc-U 59 repository — its name predates this collection outgrowing
          "examples" — together with a few internal debugging and screenshot-test files not listed here. The{" "}
          <a href="/59/presets/">preset file format</a> is documented if you want to write your own — the{" "}
          <a href="/59/presets/tutorial/">tutorial</a> walks through building one from scratch — and the
          debugger's ASM Overlay is documented for the assembly examples above.
        </p>
        <p style={{ marginBottom: 0, color: "var(--fg-3)", fontSize: 13 }}>
          Most of these programs were originally published in <em>52-Notes</em>, <em>TI PPC Notes</em> and{" "}
          <em>PPX Exchange</em> — the newsletters of the TI Programmable Calculator user community in the
          late 1970s and early 1980s — or on the{" "}
          <a href="https://www.hpmuseum.org/forum/">HP Museum forum</a>, where TI material is also archived and
          discussed.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

// PlayCalculator lays itself out from a fixed 360px grid multiplied by
// `scale`, so a constant 1.4 is a hard 504px — wider than any iPhone in
// portrait, which is why the fifth key column used to run off the page.
// Measure the container instead of the window: .wrap-narrow's gutters change
// at the 620px breakpoint, and the element already knows what it was given.
function useFittedScale(max, min) {
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(max);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function measure() {
      // 8px: the focus ring PlayCalculator permanently reserves around itself.
      setScale(Math.max(min, Math.min(max, (el.clientWidth - 8) / 360)));
    }
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [max, min]);
  return [ref, scale];
}

function PlayPage() {
  const [holderRef, scale] = useFittedScale(1.4, 0.7);
  return (
    <main className="wrap-narrow">
      <div ref={holderRef} style={{ display: "flex", justifyContent: "center" }}>
        <PlayCalculator scale={scale} keyboard />
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <a className="btn secondary" href="/59/calc/app/">Open as a standalone app <span style={{opacity:.5}}>→</span></a>
      </div>

      <h1 className="page-title" style={{ marginTop: 32 }}>TI-59 emulator, online</h1>
      <div className="prose">
        <p>
          The calculator above is a working <strong>Texas Instruments TI-59 emulator running in
          your browser</strong> — no install, no account, nothing to download. It is the Calc-U 59
          app's own emulator — the same code the Mac, Windows and Linux apps run — compiled to
          WebAssembly, executing the original TI-59 ROM. The debugger and the printer are not part
          of this build; everything else works.
        </p>
        <p>
          Module 01 (Master Library) is loaded by default. Switch modules (that resets the
          calculator, as swapping the real module did), load one of the curated presets, or upload your own <strong>.ti59</strong> file below the keyboard — uploads are
          read entirely in your browser and never leave your machine. For more programs to try,
          including several that need the full app's PC-100 printer, see the{" "}
          <a href="/59/software/">TI-59 Software Collection</a>.
        </p>
        <p>
          Press <strong>2nd</strong> then <strong>Pgm</strong> then a two-digit program number to
          bring up that program's cue card, the same way it works on the module itself.
        </p>
        <p>
          <strong>Queue Card</strong> passes a virtual magnetic card through the reader. To save a
          program, press <strong>2nd Write</strong> (bank 1: <strong>1 2nd Write</strong>), then
          Queue Card. To load it back, press Queue Card while the calculator is idle and it reads
          the card. The card starts blank and keeps whatever was last written until you leave the
          page.
        </p>
        <p>
          For the TI-58 and TI-58C models, the PC-100C printer, card files you keep and the CPU
          debugger, use the full app: free on the <a href="/59/install/mac/">Mac</a> and on{" "}
          <a href="/59/install/windows-linux/">Windows and Linux</a>, or{" "}
          <a href="/59/install/iphone-ipad/">on the App Store</a> for iPhone and iPad. If you are
          not sure what any of this is, <a href="/59/what-is-a-ti-59/">start here</a>.
        </p>
        <p>
          Prefer this without the browser chrome? <a href="/59/calc/app/">Open the standalone app</a> — the
          same calculator alone at its own address, installable to your phone's home screen for a
          one-tap, full-screen launch.
        </p>
      </div>

      <h2 className="section" style={{ marginTop: 32 }}>Use your keyboard</h2>
      <div className="prose">
        <p>
          Click the calculator once and it takes your keystrokes — a golden outline shows when it
          has them. Click anywhere else, or press <K>Tab</K>, and the page gets the keyboard back.
        </p>
        <p>
          The number keys, the yellow operation keys, <strong>A</strong>–<strong>E</strong>, and
          <strong> EE</strong> <strong>(</strong> <strong>)</strong> are typeable. Everything else —
          2nd, STO, RCL, LRN and the rest — is click-only, so the keyboard stays out of the way of
          the page. Holding <K>Shift</K> while you press a letter gives you that key's second
          function: <K>Shift</K> + <K>A</K> is <strong>A'</strong>.
        </p>
      </div>

      <KeyboardLegend />

      <div style={{ marginTop: 24 }}>
        <BackButton />
      </div>
    </main>
  );
}

// The physical-keyboard bindings in face order. The bindings themselves are
// Shared/KeyboardMap.cpp in the main repo (reference/SharedArchitecture.md §
// "Physical Keyboard Mapping"), which the calculator runs; this page is
// prerendered without it, so keep the two in step.
const TI59_KEYBOARD_LEGEND = [
  { keys: ["0", "…", "9"], label: "0 – 9", note: "or numeric keypad" },
  { keys: [".", ","], label: "." },
  { keys: ["<"], label: "+/−" },
  { keys: ["+"], label: "+" },
  { keys: ["-"], label: "−" },
  { keys: ["*", "x"], label: "×" },
  { keys: ["/"], label: "÷" },
  { keys: ["=", "Enter"], label: "=" },
  { keys: ["Esc"], label: "CLR" },
  { keys: [">"], label: "EE" },
  { keys: ["("], label: "(" },
  { keys: [")"], label: ")" },
  { keys: ["a", "…", "e"], label: "A – E" },
  { keys: ["Shift", "A", "…", "E"], label: "A' – E'" },
];

function KeyboardLegend() {
  return (
    <div style={{
      marginTop: 16,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
      gap: "10px 20px",
    }}>
      {TI59_KEYBOARD_LEGEND.map((entry, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ flex: "0 0 auto" }}>
            <KSeq steps={entry.keys.map((k) => (k === "…" ? "…" : { label: k }))} />
          </span>
          <span style={{
            fontFamily: "var(--font-keycap)",
            color: "var(--accent)",
            fontSize: 14,
          }}>{entry.label}</span>
          {entry.note ? (
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-3)" }}>
              {entry.note}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  HomePage,
  AboutTi59Page,
  GettingStartedPage,
  InstallMobilePage,
  InstallMacPage,
  PresetsPage,
  PresetTutorialPage,
  DebuggerPage,
  ReferencePage,
  ModulesPage,
  FaqPage,
  PlayPage,
  SoftwarePage,
  InstallPcPage,
  FAQS,
});
