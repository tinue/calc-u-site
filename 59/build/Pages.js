// Calc-U 59 — the site's own pages: home, play, software.
//
// The help is not written here. It is built from the pinned help asset of
// the release (pins.json, .help/render.js) into /59/help/; these pages link
// to its chapters through HELP, and check.js fails on a link that leads
// nowhere.

const RELEASE = "https://github.com/tinue/Calc-U/releases/tag/calc-u-59-v3.0.0";
const APP_STORE = "https://apps.apple.com/us/app/calc-u-59/id6761413142";

// Help pages the site pages link to (addresses made by .help/render.js).
const HELP = {
  contents: "/59/help/",
  introduction: "/59/help/01-introduction/",
  started: "/59/help/02-getting-started/getting-started/",
  installing: "/59/help/02-getting-started/installing/",
  installMobile: "/59/help/02-getting-started/installing/#iphone-and-ipad",
  installDesk: "/59/help/02-getting-started/installing/#mac-windows-and-linux",
  installAndroid: "/59/help/02-getting-started/installing/#android",
  cards: "/59/help/04-media/magnetic-cards/",
  printer: "/59/help/05-peripherals-and-paper/printer/",
  presets: "/59/help/06-presets/presets/",
  tutorial: "/59/help/06-presets/preset-tutorial/",
  debugger: "/59/help/07-debugger/",
  modules: "/59/help/09-product-topics/modules/",
  faq: "/59/help/09-product-topics/faq/",
  asmOverlay: "/59/help/10-reference/asm-overlay/"
};

// The topic cards of the home page: where a newcomer goes first.
const START_CARDS = [{
  eyebrow: "Chapter 2",
  title: "Installing",
  href: HELP.installing,
  text: "The App Store on iPhone and iPad, the free downloads for Mac, Windows and Linux, and the web app on Android."
}, {
  eyebrow: "Chapter 2",
  title: "Getting started",
  href: HELP.started,
  text: "The window on each system, the control bar, the model picker and the keyboard."
}, {
  eyebrow: "Chapter 4",
  title: "Magnetic cards",
  href: HELP.cards,
  text: "Fitting and feeding a card, saving a program and loading it back, and where the cards live."
}, {
  eyebrow: "Chapter 5",
  title: "The PC-100C printer",
  href: HELP.printer,
  text: "Attaching the printer, its controls, the paper strip and the print speed."
}, {
  eyebrow: "Chapter 6",
  title: "Presets",
  href: HELP.presets,
  text: "Plain-text .ti59, .ti58 and .ti58c files that carry a program, registers, a cue card and a module, with a tutorial."
}, {
  eyebrow: "Chapter 7",
  title: "The debugger",
  href: HELP.debugger,
  text: "Freeze and step, the CPU view, the ROM trace and trace files for offline analysis."
}];
function StartCards() {
  return START_CARDS.map((c, i) => /*#__PURE__*/React.createElement(TopicCard, {
    key: c.href,
    num: String(i + 1).padStart(2, "0"),
    eyebrow: c.eyebrow,
    title: c.title,
    href: c.href
  }, c.text));
}

// Back where the visitor came from, or (opened directly) to the start page —
// a plain link then, which site.jsx's listener turns into an in-app navigation.
function BackButton() {
  function handleBack(e) {
    if (history.length > 1) {
      e.preventDefault();
      history.back();
    }
  }
  return /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: "/59/",
    onClick: handleBack
  }, "\u2190 Return to start");
}

/* =============================================================
   HOME — a short page into the help, the play page and the downloads.
   ============================================================= */
function HomePage() {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: "1px solid var(--stroke)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "TI-59 emulator for Mac, Windows, Linux, iPhone, iPad and the browser"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Calc-U ", /*#__PURE__*/React.createElement("em", null, "59")), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Calc-U 59 is a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--fg)"
    }
  }, "TI-59, TI-58 and TI-58C emulator"), ". It runs the original Texas Instruments ROM, reads and writes magnetic cards, emulates the PC-100C printer and all fourteen Solid State Software modules, and has a CPU-level debugger. It runs on macOS, Windows, Linux, the iPhone and the iPad, and in your browser."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn primary",
    href: "/59/play/"
  }, "Play in browser ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: HELP.contents
  }, "Read the help"), /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: HELP.installing
  }, "Download"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-shot"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/app-screenshot.png",
    alt: "The Calc-U 59 TI-59 emulator running on an iPhone, showing the red LED display, the cue card and the full key matrix"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-cards grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: "0 0 6px"
    }
  }, "iPhone and iPad"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6
    }
  }, "Free on the ", /*#__PURE__*/React.createElement("a", {
    href: APP_STORE
  }, "App Store"), ". Cards and the TI-58C's memory are kept in iCloud, so the iPhone and the iPad share them.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: "0 0 6px"
    }
  }, "Mac, Windows and Linux"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6
    }
  }, "Free on ", /*#__PURE__*/React.createElement("a", {
    href: RELEASE
  }, "GitHub"), ": a disk image for the Mac, an installer for Windows, an AppImage for Linux."))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Where to start"), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, /*#__PURE__*/React.createElement(StartCards, null)), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "What Calc-U 59 emulates"), /*#__PURE__*/React.createElement("div", {
    className: "prose panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "Calc-U 59 emulates the ", /*#__PURE__*/React.createElement("strong", null, "TI Programmable 59"), " that Texas Instruments introduced in 1977, along with its two smaller siblings, the ", /*#__PURE__*/React.createElement("strong", null, "TI-58"), " and the constant-memory ", /*#__PURE__*/React.createElement("strong", null, "TI-58C"), ". It does not reimplement the maths: it runs the calculators' original ROM through an emulated processor, at the original speed, so every result, the flashing overflow display and the documented quirks behave the way the hardware did."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "0 0 12px",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "Switchable ", /*#__PURE__*/React.createElement("strong", null, "TI-59 / TI-58 / TI-58C"), " models, each with its memory partition and startup state."), /*#__PURE__*/React.createElement("li", null, "All fourteen ", /*#__PURE__*/React.createElement("strong", null, "Solid State Software"), " library modules, from the Master Library to the RPN Simulator (", /*#__PURE__*/React.createElement("a", {
    href: HELP.modules
  }, "the list"), ")."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Magnetic cards"), " read and written as files (", /*#__PURE__*/React.createElement("a", {
    href: HELP.cards
  }, "cards"), ")."), /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement("strong", null, "PC-100C thermal printer"), ", as dots or as copyable text (", /*#__PURE__*/React.createElement("a", {
    href: HELP.printer
  }, "the printer"), ")."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("a", {
    href: HELP.debugger
  }, "CPU-level debugger"), " with a live program listing, a ROM instruction trace and trace files."), /*#__PURE__*/React.createElement("li", null, "Plain-text ", /*#__PURE__*/React.createElement("a", {
    href: HELP.presets
  }, "preset files"), " that carry a program, the registers, a cue card and a module in one readable file.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "New to these machines? ", /*#__PURE__*/React.createElement("a", {
    href: HELP.introduction
  }, "The introduction"), " describes the three models and what the emulator reproduces.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      marginTop: 48,
      display: "flex",
      alignItems: "center",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/app-icon.png",
    alt: "",
    style: {
      width: 80,
      height: 80,
      borderRadius: 18,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 420px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: "0 0 4px"
    }
  }, "Version 3.0.0"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14
    }
  }, "The Mac, Windows and Linux builds are free downloads of the ", /*#__PURE__*/React.createElement("a", {
    href: RELEASE
  }, "3.0.0 release on GitHub"), ". The iPhone and iPad build is on the ", /*#__PURE__*/React.createElement("a", {
    href: APP_STORE
  }, "App Store"), ". On Android, the web app ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installAndroid
  }, "installs from the browser"), ". Calc-U 59 is free software under the GNU GPL version 3; the source code is on ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U"
  }, "GitHub"), ".")))));
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
  const articles = [{
    file: "fast-mode",
    title: "TI-59 Fast Mode: Running Programs at ROM Speed",
    description: "What Fast Mode skips between steps, which instructions a fast-mode program may use, the safe ways to end one, four ways in — and how a firmware bug makes it possible."
  }, {
    file: "printer-interrupt",
    title: "TI-59 Printer Interrupt: Stopping a Printed Line Halfway",
    description: "The manufactured keycode 1F that stops the PC-100 mid-line, the rules for using it, two ways to make it, and why it works."
  }, {
    file: "ti-58c-changes",
    title: "TI-58C: Changes and Improvements compared to TI-58/59",
    description: "The TI-58C's revised ROM: constant memory, the rebuilt idle loop and its timing, the TI-59 bugs it fixes, Op 40, the TRACE branch marker and the factory self-test."
  }];
  const categories = [{
    heading: "The calendar printer competition, 1978–1981",
    intro: "“52-Notes,” the TI programmable-calculator newsletter, ran a competition from 1978 to write the fastest TI-59 program that prints a full year calendar on the PC-100 printer, using the Master Library module's date routines. Each entry improved on the last; the 1981 winner is here too, with a new entry from 2026. PC-100/PC-100C printer required.",
    items: [{
      file: "calendar/CALENDAR_PROGRAMS.md",
      title: "The calendar programs — guide",
      description: "What each entry of the competition does differently, how to run them and how long each takes. A Markdown text file."
    }, {
      file: "calendar/calendar-01-Weinberger.ti59",
      title: "Calendar Printer — Jared Weinberger",
      description: "The opening entry in the competition (52-Notes V3N5).",
      printer: true
    }, {
      file: "calendar/calendar-02-cargile.ti59",
      title: "Calendar Printer — Lou Cargile",
      description: "A second V3N5 entry, Lou Cargile's first attempt at the calendar problem.",
      printer: true
    }, {
      file: "calendar/calendar-03-vanderburgh.ti59",
      title: "Calendar Printer — Richard Vanderburgh",
      description: "A third V3N5 entry, checking for the ML module and warning the user if it's missing.",
      printer: true
    }, {
      file: "calendar/calendar-04-skillman.ti59",
      title: "Calendar Printer — Bill Skillman",
      description: "V3N6: a faster print-buffer packing approach, down to about 7½ minutes per year.",
      printer: true
    }, {
      file: "calendar/calendar-05-vanderburgh.ti59",
      title: "Calendar Printer — Richard Vanderburgh (revised)",
      description: "V3N6: Vanderburgh folds in Panos Galidas' doubled print-code method and further tightens it, to just under 5 minutes per year (4 min 53 s for 1978).",
      printer: true
    }, {
      file: "calendar/calendar-06-cargile.ti59",
      title: "Calendar Printer — Lou Cargile (bugfix)",
      description: "V3N7: a correction to an earlier entry — a missing CLR' meant the 1st of a month could fail to print if it fell on a Thursday.",
      printer: true
    }, {
      file: "calendar/calendar-07-calidas.ti59",
      title: "Calendar Printer — Panos Galidas",
      description: "V3N9: the fastest of the 1978 entries, averaging 2 minutes 38.6 seconds per year over a five-year test span.",
      printer: true
    }, {
      file: "calendar/calendar-08-acosta.ti59",
      title: "Calendar Printer — Patrick Acosta",
      description: "TI PPC Notes V9N2: the 1981 program that ended the race, using Fast Mode to print the worst-case year 2000 in 1 minute 23 seconds.",
      printer: true
    }, {
      file: "calendar/calendar-09-dispatch.ti59",
      title: "Calendar Printer — fast mode with dispatched fix-ups (2026)",
      description: "A new entry, written with the Calc-U 59 tools: Acosta's output format, about 7% faster.",
      printer: true
    }]
  }, {
    heading: "PC-100 printer graphics and tricks",
    intro: "The PC-100/PC-100C thermal printer had an undocumented quirk: stopping it partway through a line leaves only the first dot rows of the characters on paper, which the TI PPC user community turned into a small genre of printer-graphics demos through the early 1980s.",
    article: "printer-interrupt",
    items: [{
      file: "characters.ti59",
      title: "Print character table",
      description: "Prints the full TI-59 print-code table with row and column headers."
    }, {
      file: "historic/characters-fastmode.ti59",
      title: "Print characters in Fast Mode",
      description: "K-J Meusch's version of the character table, using Fast Mode to print far faster than normal execution (TI PPC Notes V5N9-10, 1980). This program's way into Fast Mode (Pgm 02 SBR 239) clears the calculator's memory, as on a real TI-59, so loading the file plays his recipe: card, RST R/S, card.",
      printer: true
    }, {
      file: "historic/fast-grafik-3d-plot.ti59",
      title: "Fast-Grafik 3-D Plot",
      description: "Peter Poloczek's 3-D surface plotter for the PC-100, built on the printer-interrupt trick (TI PPC Notes V8N2, 1983). Part 1 asks for the plot's limits; part 2 then loads by itself and plots.",
      printer: true
    }, {
      file: "historic/printer-quirks.ti59",
      title: "Printer interrupt character table",
      description: "Dave Leising's print-code table showing each character both normally and interrupted mid-print (PPX Exchange, March/April 1982).",
      printer: true
    }, {
      file: "printer-interrupt.ti59",
      title: "The printer interrupt, smallest form",
      description: "Prints “A0” twice, once normally and once cut off after two of its seven dot rows — the trick the printer-graphics programs here are built on, in a few steps.",
      printer: true
    }, {
      file: "picard.ti59",
      title: "Picard — printer-interrupt picture",
      description: "A picture printed two dot rows per line with the printer interrupt. Its file header explains how to run it on a real TI-59.",
      printer: true
    }, {
      file: "globe-print.ti59",
      title: "Globe — printer-interrupt picture",
      description: "A larger picture in three parts: the preset feeds the second and third from magnetic cards by itself. Its file header explains how to do it by hand on a real TI-59.",
      printer: true
    }, {
      file: "historic/stars-and-stripes.ti59",
      title: "Stars & Stripes",
      description: "Richard Snow's demonstration of PC-100 graphics capability, drawing a flag using the printer-interrupt technique (TI PPC Notes V6N4-5, 1981).",
      printer: true
    }, {
      file: "switzerland.ti59",
      title: "Switzerland — printer-interrupt outline map",
      description: "The outline of Switzerland drawn from 41 lines, each cut off after its first two dot rows by the printer interrupt so they stack without a gap (2026). Loading the file makes the interrupt code and prints the picture automatically, at full speed.",
      printer: true
    }, {
      file: "historic/texas-print.ti59",
      title: "“TI” logo — high-resolution printer graphics",
      description: "Frank Dever's high-resolution “TI” logo (PPX Exchange, March/April 1982). The program corrupts a program-step keycode on purpose to redirect the ROM's dispatcher mid-instruction — the file's header traces exactly which ROM address that lands on.",
      printer: true
    }, {
      file: "historic/trace-quirk.ti59",
      title: "Printer trace-mode quirk",
      description: "A keystroke sequence, found by a TI PPC club member, that puts a TI-58 or TI-59 into an undocumented trace mode once a printer is attached (TI PPC Notes V6N4-5, 1981).",
      printer: true
    }]
  }, {
    heading: "From the German magazine CHIP, 1979–1980",
    intro: "CHIP printed TI-59 programs that readers keyed in by hand. These were transcribed from the magazine's listings; each file's header names the article.",
    items: [{
      file: "historic/pdcm-card-tricks.ti59",
      title: "PDCM — a card-swapping operating system",
      description: "Horst Umlauf's system (“Karten-Tricks”, CHIP 8/1979, with his corrections from 10/1979) that manages a program's magnetic cards: it asks for the card it needs, checks it and reads it, so memory is limited only by the stack of cards. Includes a demo program; the guide is below."
    }, {
      file: "historic/pdcm-make-cards.ti59",
      title: "PDCM — write its two cards",
      description: "Creates PDCM's two magnetic cards in your card folder, as if they had been keyed in and saved by hand. Run it once, then follow the emulator guide below."
    }, {
      file: "historic/PDCM-Emulator.md",
      title: "PDCM — guide for the emulator",
      description: "The short way into PDCM: start from the cards the preset above writes. A Markdown text file."
    }, {
      file: "historic/PDCM.md",
      title: "PDCM — step-by-step guide",
      description: "What PDCM is for and how to use it on a TI-59, from keying it in to a worked demo. Written by an AI from the two articles; the key sequences were run on the emulator, not on a real calculator. A Markdown text file."
    }, {
      file: "historic/erdkundetest.ti59",
      title: "Erdkundetest — geography quiz",
      description: "Michael Hartstang's printer quiz (CHIP 1/1980), which prints questions and answers and keeps the score. The texts are in German. This file holds the article's first set of questions.",
      printer: true
    }, {
      file: "historic/erdkundetest-2.ti59",
      title: "Erdkundetest — second set of questions",
      description: "The same quiz with the second set from the article.",
      printer: true
    }, {
      file: "historic/life.ti59",
      title: "LIFE — the Game of Life",
      description: "Joachim Dörges' Game of Life on a 10 × 10 field (“Life auf dem TI-59”, CHIP 9/1980). It prints every generation, with optional random mutations; a generation takes minutes, as on the real calculator. Loading the file starts it with a glider, which is not from the article.",
      printer: true
    }]
  }, {
    heading: "Diagnostics and self-tests",
    intro: "Factory-style diagnostics for checking whether a TI-59 or TI-58 is healthy — useful background if you're troubleshooting real hardware, and a good stress test for the emulation core.",
    items: [{
      file: "diag.ti59",
      title: "TI-59 calculator diagnostic",
      description: "The magnetic-card diagnostic Texas Instruments documented in the owner's manual, both card sides. Prints and displays “−.8888888888” when everything checks out.",
      printer: true
    }, {
      file: "diag.ti58",
      title: "TI-58 calculator diagnostic",
      description: "The same diagnostic, resized to fit the TI-58's smaller memory partition.",
      printer: true
    }, {
      file: "ram_test.ti59",
      title: "RAM test",
      description: "A roughly three-minute test of all data registers that prints “598-TEST-1” and reports the default memory partition; faulty registers are called out by address."
    }, {
      file: "historic/ram_test_full_fast.ti59",
      title: "Full RAM test (Fast Mode)",
      description: "George Thomson's test of all 100 data registers using indirect addressing and the STF fast-mode trick, printing any mismatch on the PC-100A/PC-100C (TI PPC Notes V9N5, 1985).",
      printer: true
    }, {
      file: "historic/repartition.ti58c",
      title: "TI-58C repartitioning reference",
      description: "Keystroke notes on how the TI-58C's constant-memory feature stores the partition setting, and how to reach the extra 32 steps (480–511) that are otherwise keyboard-only (TI PPC Notes V5N7, 1980)."
    }]
  }, {
    heading: "Fast Mode, keycodes and firmware curiosities",
    intro: "Fast Mode is an undocumented TI-58/TI-58C/TI-59 execution mode, discovered and written up by the TI PPC club over several years — these programs demonstrate it, along with a couple of other undocumented corners of the ROM.",
    article: "fast-mode",
    items: [{
      file: "historic/fastmode.ti59",
      title: "Fast Mode factorial demo (TI-59)",
      description: "Computes 69! in Fast Mode in about 24 seconds; the same program takes about 44 in normal mode, 85% longer (measured on the emulator)."
    }, {
      file: "historic/fastmode.ti58",
      title: "Fast Mode factorial demo (TI-58)",
      description: "The same Fast Mode factorial comparison, for the TI-58/TI-58C."
    }, {
      file: "fastmode-sst.ti59",
      title: "The shortest way into Fast Mode",
      description: "A new, shorter Fast Mode entry, found by tracing the ROM in 2026; computes 69! like the factorial demo. Loading the file runs the entry sequence automatically."
    }, {
      file: "historic/FastMode_Zero4.ti59",
      title: "Fast Mode zero-padding bug",
      description: "A mistyped Fast Mode program — one leading zero short of the documented five — that puts a real TI-59 into an unusual, reproducible misbehaving state."
    }, {
      file: "historic/firmware.ti59",
      title: "Firmware listing keystroke sequence",
      description: "An unusual keyboard sequence, originally described by TI PPC Notes editor Maurice Swinnen, that puts the TI-59 into a mode where the ROM firmware itself can be listed."
    }, {
      file: "historic/keycodes.ti59",
      title: "Print all keycodes",
      description: "Jared Weinberger's routine for generating and printing every TI-59 key code, using dynamic program-code modification (TI PPC Notes V5N4-5, 1980)."
    }]
  }, {
    heading: "Utilities",
    intro: "Small, self-contained programs that aren't tied to a particular magazine series.",
    items: [{
      file: "historic/Integer-Base-Conversion.ti59",
      title: "Integer base conversion",
      description: "Converts an integer between arbitrary number bases — hex to binary to decimal and back — originally published in Computer Design magazine, 1980."
    }, {
      file: "historic/Frequency-Transformation.ti59",
      title: "Frequency transformation",
      description: "A filter-design program that transforms a normalized low-pass filter's cutoff frequencies, from the Artech House discrete-time filter design tables."
    }, {
      file: "sum.ti59",
      title: "Sum of N numbers",
      description: "A deliberately simple program — sums N down to 1 — useful as a stopwatch for comparing execution speed across devices running the emulator."
    }]
  }, {
    heading: "CPU-level assembly examples",
    intro: "These target the TMC0501 CPU inside the calculator directly, as raw opcodes rather than a keystroke program, loaded through the ASM Overlay in the debugger — in the full app (Mac, Windows, Linux, iPhone, iPad), and in the web client wherever it shows the debugger: its wide layout, or the installed app in landscape on a tablet, an unfolded foldable or a large window.",
    items: [{
      file: "assembly/README.md",
      title: "The assembly examples — guide",
      description: "How an ASM overlay file is written and loaded, and what each example below shows. A Markdown text file."
    }, {
      file: "assembly/simple_count.asm",
      title: "Simple counter",
      description: "The smallest useful ASM overlay example: increments a counter on the display in a tight loop, about 1185 times a second."
    }, {
      file: "assembly/stopwatch.asm",
      title: "Stopwatch",
      description: "A precisely timed stopwatch built on the WAIT Dn instruction rather than counting cycles — 222 increments per second, 4.5011 ms each."
    }, {
      file: "assembly/DPT.asm",
      title: "Decimal-point test",
      description: "Cycles the decimal point across every digit position. The emulator shows the display as the eye sees it, so — as on the real calculator — all the points look lit at once."
    }, {
      file: "assembly/Decoder.asm",
      title: "7-segment decoder edge case (known non-working)",
      description: "A real-hardware timing edge case — a phase-shifted WAIT before SET IDLE exposes all 16 hex segment patterns on real silicon. Documented here for the CPU-emulation detail, but it does not reproduce on Calc-U 59."
    }]
  }];
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Software"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "TI-59 Software Collection"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Programs written for real TI-59, TI-58 and TI-58C hardware, from the 1978 ", /*#__PURE__*/React.createElement("em", null, "52-Notes"), " calendar competition to TI PPC club printer-graphics tricks and factory diagnostics \u2014 collected here as loadable preset files, whether or not you have Calc-U 59 installed yet."), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      marginTop: 24,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "Each entry below is a ", /*#__PURE__*/React.createElement("strong", null, ".ti59"), ", ", /*#__PURE__*/React.createElement("strong", null, ".ti58"), " or ", /*#__PURE__*/React.createElement("strong", null, ".ti58c"), " ", /*#__PURE__*/React.createElement("a", {
    href: HELP.presets
  }, "preset file"), " \u2014 the calculator's program, registers and (where the original used one) magnetic-card cue card, ready to load. Programs marked ", /*#__PURE__*/React.createElement("strong", null, "Requires printer"), " ", "need the emulated PC-100C printer \u2014 connected from the start in the full app and in the browser emulator."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Get Calc-U 59 for ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installDesk
  }, "Mac"), ",", " ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installDesk
  }, "Windows and Linux"), ",", " ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installMobile
  }, "iPhone and iPad"), " or", " ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installAndroid
  }, "Android"), ", then open a downloaded file, or try the", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/play/"
  }, "browser emulator"), " first: ", /*#__PURE__*/React.createElement("strong", null, "File \u25B8 Load Preset\u2026"), " opens a downloaded file there too, on the TI-59, TI-58 or TI-58C.")), /*#__PURE__*/React.createElement("h2", {
    className: "section",
    id: "articles"
  }, "Articles"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      lineHeight: 1.7,
      marginTop: -8
    }
  }, "How the undocumented tricks behind several of these programs work, and how the TI-58C's firmware differs from its predecessors \u2014 to read here or download as PDF."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, articles.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.file,
    id: a.file,
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      flexWrap: "wrap",
      gap: "4px 16px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: 0
    }
  }, a.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: `/59/articles/${a.file}.html`
  }, "Read"), /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: `/59/articles/${a.file}.pdf`,
    download: true
  }, "PDF"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "var(--fg-2)"
    }
  }, a.description)))), categories.map(cat => /*#__PURE__*/React.createElement(React.Fragment, {
    key: cat.heading
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, cat.heading), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      lineHeight: 1.7,
      marginTop: -8
    }
  }, cat.intro, cat.article ? /*#__PURE__*/React.createElement(React.Fragment, null, " How it works: ", /*#__PURE__*/React.createElement("a", {
    href: `/59/articles/${cat.article}.html`
  }, articles.find(a => a.file === cat.article).title), ".") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, cat.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.file,
    id: it.file.replace(/^.*\//, "").replace(/\./g, "-"),
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      flexWrap: "wrap",
      gap: "4px 16px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: 0
    }
  }, it.title), /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: `/59/software-files/${it.file}`,
    download: true
  }, "Download ", it.file.replace(/^.*\//, ""))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "var(--fg-2)"
    }
  }, it.description), it.printer ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 13,
      color: "var(--fg-3)"
    }
  }, "Requires the PC-100/PC-100C printer.") : null))))), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Source and format"), /*#__PURE__*/React.createElement("div", {
    className: "prose panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "These files are maintained in the ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U/tree/calc-u-59-v3.0.0/products/calc-u-59/examples"
  }, "examples/ directory"), " of Calc-U 59 in the Calc-U repository \u2014 its name predates this collection outgrowing \"examples\" \u2014 together with a few internal debugging and screenshot-test files not listed here. The", " ", /*#__PURE__*/React.createElement("a", {
    href: HELP.presets
  }, "preset file format"), " is documented if you want to write your own \u2014 the", " ", /*#__PURE__*/React.createElement("a", {
    href: HELP.tutorial
  }, "tutorial"), " walks through building one from scratch \u2014 and the debugger's ", /*#__PURE__*/React.createElement("a", {
    href: HELP.asmOverlay
  }, "ASM Overlay"), " is documented for the assembly examples above."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0,
      color: "var(--fg-3)",
      fontSize: 13
    }
  }, "Most of these programs were originally published in ", /*#__PURE__*/React.createElement("em", null, "52-Notes"), ", ", /*#__PURE__*/React.createElement("em", null, "TI PPC Notes"), " and", " ", /*#__PURE__*/React.createElement("em", null, "PPX Exchange"), " \u2014 the newsletters of the TI Programmable Calculator user community in the late 1970s and early 1980s \u2014 or on the", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.hpmuseum.org/forum/"
  }, "HP Museum forum"), ", where TI material is also archived and discussed.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
}

// The wide layout (calculator, printer and debugger side by side) needs
// 862px (Calc-U-59 reference/WebClient.md, "Mounting it"); narrower, it would
// keep that size and the page would scroll sideways, so phones and narrow
// windows get the portrait layout instead. Measure the container, not the
// window: .wrap's gutters change at the 620px breakpoint. The prerender
// assumes .wrap's full 1072px. Portrait is capped so it stays a
// calculator-sized column on a tablet.
const WIDE_MIN_WIDTH = 862;
const PORTRAIT_MAX_WIDTH = 504;
function usePlayLayout() {
  const ref = React.useRef(null);
  const [layout, setLayout] = React.useState({
    wide: true,
    width: 1072
  });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function measure() {
      const width = el.clientWidth;
      setLayout({
        wide: width >= WIDE_MIN_WIDTH,
        width
      });
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, layout];
}
function PlayPage() {
  const [holderRef, {
    wide,
    width
  }] = usePlayLayout();
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    ref: holderRef,
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, wide ? /*#__PURE__*/React.createElement(CalcU59, {
    width: width,
    keyboard: true,
    layout: "wide"
  }) : /*#__PURE__*/React.createElement(CalcU59, {
    width: Math.min(width, PORTRAIT_MAX_WIDTH),
    keyboard: true,
    layout: "portrait"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: "/59/calc/app/"
  }, "Open as a standalone app ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 772,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title",
    style: {
      marginTop: 32
    }
  }, "TI-59 emulator, online"), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("p", null, "The calculator above is a working ", /*#__PURE__*/React.createElement("strong", null, "Texas Instruments TI-59 emulator running in your browser"), " \u2014 no install, no account, nothing to download. It is the Calc-U 59 app's own emulator \u2014 the same code the Mac, Windows and Linux apps run \u2014 compiled to WebAssembly, executing the original Texas Instruments ROMs. The model picker switches between the ", /*#__PURE__*/React.createElement("strong", null, "TI-59"), ", ", /*#__PURE__*/React.createElement("strong", null, "TI-58"), " and ", /*#__PURE__*/React.createElement("strong", null, "TI-58C"), ", and the ", /*#__PURE__*/React.createElement("strong", null, "PC-100C printer"), " is connected from the start. On a wide screen the printer and the full debugger sit beside the calculator, with the ASM overlay and trace downloads; on a phone the chevron in the corner turns to the printer's page and back."), /*#__PURE__*/React.createElement("p", null, "The menu bar above the calculator (on a phone: the ", /*#__PURE__*/React.createElement("strong", null, "More"), " button) holds everything else. ", /*#__PURE__*/React.createElement("strong", null, "File \u25B8 Examples"), " opens the bundled programs,", " ", /*#__PURE__*/React.createElement("strong", null, "File \u25B8 Load Preset\u2026"), " your own ", /*#__PURE__*/React.createElement("strong", null, ".ti59"), ", ", /*#__PURE__*/React.createElement("strong", null, ".ti58"), " or", " ", /*#__PURE__*/React.createElement("strong", null, ".ti58c"), " file, and you can also drop a file onto the calculator \u2014 files are read in your browser and never leave your machine. ", /*#__PURE__*/React.createElement("strong", null, "Machine"), " switches the model and the peripherals, ", /*#__PURE__*/React.createElement("strong", null, "File \u25B8 Settings\u2026"), " the module. For more programs, see the", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/software/"
  }, "TI-59 Software Collection"), "."), /*#__PURE__*/React.createElement("p", null, "Your magnetic cards and the TI-58C's constant memory stay in your browser from one visit to the next. ", /*#__PURE__*/React.createElement("strong", null, "File \u25B8 Import Media\u2026"), " brings a card file in, ", /*#__PURE__*/React.createElement("strong", null, "File \u25B8 Saved Media\u2026"), " lists, downloads and deletes your cards (", /*#__PURE__*/React.createElement("a", {
    href: HELP.cards
  }, "more on cards"), ")."), /*#__PURE__*/React.createElement("p", null, "Press ", /*#__PURE__*/React.createElement("strong", null, "2nd"), " then ", /*#__PURE__*/React.createElement("strong", null, "Pgm"), " then a two-digit program number to bring up that program's cue card, the same way it works on the module itself."), /*#__PURE__*/React.createElement("p", null, "The full app adds folders of your own for cards, presets and traces (synced through iCloud on the iPhone and the iPad); it is free for the ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installDesk
  }, "Mac, Windows and Linux"), " and ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installMobile
  }, "on the App Store"), " for iPhone and iPad. On Android, ", /*#__PURE__*/React.createElement("a", {
    href: HELP.installAndroid
  }, "install the web app"), " from your browser. The", " ", /*#__PURE__*/React.createElement("a", {
    href: HELP.contents
  }, "help"), " explains all of it, and ", /*#__PURE__*/React.createElement("a", {
    href: HELP.introduction
  }, "the introduction"), " the three calculators."), /*#__PURE__*/React.createElement("p", null, "Prefer this without the browser chrome? ", /*#__PURE__*/React.createElement("a", {
    href: "/59/calc/app/"
  }, "Open the standalone app"), " \u2014 the same calculator alone at its own address, installable to your phone's home screen for a one-tap, full-screen launch. Once installed it runs all three calculators offline, with every module and every preset in its list.")), /*#__PURE__*/React.createElement("h2", {
    className: "section",
    style: {
      marginTop: 32
    }
  }, "Use your keyboard"), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("p", null, "Click the calculator once and it takes your keystrokes \u2014 a golden outline shows when it has them. Click anywhere else, or press ", /*#__PURE__*/React.createElement(K, null, "Tab"), ", and the page gets the keyboard back."), /*#__PURE__*/React.createElement("p", null, "The number keys, the yellow operation keys, ", /*#__PURE__*/React.createElement("strong", null, "A"), "\u2013", /*#__PURE__*/React.createElement("strong", null, "E"), ", and", /*#__PURE__*/React.createElement("strong", null, " EE"), " ", /*#__PURE__*/React.createElement("strong", null, "("), " ", /*#__PURE__*/React.createElement("strong", null, ")"), " are typeable. Everything else \u2014 2nd, STO, RCL, LRN and the rest \u2014 is click-only, so the keyboard stays out of the way of the page. Holding ", /*#__PURE__*/React.createElement(K, null, "Shift"), " while you press a letter gives you that key's second function: ", /*#__PURE__*/React.createElement(K, null, "Shift"), " + ", /*#__PURE__*/React.createElement(K, null, "A"), " is ", /*#__PURE__*/React.createElement("strong", null, "A'"), ".")), /*#__PURE__*/React.createElement(KeyboardLegend, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null))));
}

// The physical-keyboard bindings in face order. The bindings themselves are
// Shared/KeyboardMap.cpp in the main repo (reference/SharedArchitecture.md §
// "Physical Keyboard Mapping"), which the calculator runs; this page is
// prerendered without it, so keep the two in step.
const TI59_KEYBOARD_LEGEND = [{
  keys: ["0", "…", "9"],
  label: "0 – 9",
  note: "or numeric keypad"
}, {
  keys: [".", ","],
  label: "."
}, {
  keys: ["<"],
  label: "+/−"
}, {
  keys: ["+"],
  label: "+"
}, {
  keys: ["-"],
  label: "−"
}, {
  keys: ["*", "x"],
  label: "×"
}, {
  keys: ["/"],
  label: "÷"
}, {
  keys: ["=", "Enter"],
  label: "="
}, {
  keys: ["Esc"],
  label: "CLR"
}, {
  keys: [">"],
  label: "EE"
}, {
  keys: ["("],
  label: "("
}, {
  keys: [")"],
  label: ")"
}, {
  keys: ["a", "…", "e"],
  label: "A – E"
}, {
  keys: ["Shift", "A", "…", "E"],
  label: "A' – E'"
}];
function KeyboardLegend() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
      gap: "10px 20px"
    }
  }, TI59_KEYBOARD_LEGEND.map((entry, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement(KSeq, {
    steps: entry.keys.map(k => k === "…" ? "…" : {
      label: k
    })
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-keycap)",
      color: "var(--accent)",
      fontSize: 14
    }
  }, entry.label), entry.note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--fg-3)"
    }
  }, entry.note) : null)));
}
Object.assign(window, {
  HomePage,
  PlayPage,
  SoftwarePage,
  HELP
});