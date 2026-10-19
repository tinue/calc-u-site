// Calc-U 59 — Help site pages
// User scope: this guide explains the EMULATOR APP, not the underlying
// TI-59 calculator hardware.

// The sidebar of /getting-started/. Overview and Printer are topics of that
// page; every other item is a page of its own.
const STARTED_SECTIONS = [{
  title: "Start here",
  items: [{
    id: "overview",
    label: "Overview",
    href: "/59/getting-started/"
  }]
}, {
  title: "Setup",
  items: [{
    id: "install-mobile",
    label: "Installing on iPhone and iPad",
    href: "/59/install/iphone-ipad/"
  }, {
    id: "install-mac",
    label: "Installing on Mac",
    href: "/59/install/mac/"
  }, {
    id: "install-pc",
    label: "Installing on Windows and Linux",
    href: "/59/install/windows-linux/"
  }]
}, {
  title: "Using the emulator",
  items: [{
    id: "presets",
    label: "Loading a preset",
    href: "/59/presets/"
  }, {
    id: "debugger",
    label: "Using the debugger",
    href: "/59/debugger/"
  }, {
    id: "printer",
    label: "Printer and card reader",
    href: "/59/getting-started/printer/"
  }]
}, {
  title: "Help",
  items: [{
    id: "faq",
    label: "FAQ",
    href: "/59/faq/"
  },
  // The README lives on GitHub: an ordinary outbound link.
  {
    id: "readme",
    label: "Main README",
    href: "https://github.com/tinue/Calc-U-59/blob/main/README.md",
    external: true
  }]
}];

// The topic cards of the home page and of /getting-started/.
const START_CARDS = [{
  eyebrow: "Setup",
  title: "Installing on iPhone and iPad",
  href: "/59/install/iphone-ipad/",
  text: "Install from the App Store, pick the calculator model, and open .ti59 files from the file picker."
}, {
  eyebrow: "Setup",
  title: "Installing on Mac",
  href: "/59/install/mac/",
  text: "Download the release from GitHub and drag it to Applications."
}, {
  eyebrow: "Setup",
  title: "Installing on Windows and Linux",
  href: "/59/install/windows-linux/",
  text: "Run the Windows installer or the Linux AppImage from GitHub Releases."
}, {
  eyebrow: "Files",
  title: "Loading a preset",
  href: "/59/presets/",
  text: "What .ti59, .ti58 and .ti58c files contain, and how each section — partition, program, registers, keystrokes — is applied."
}, {
  eyebrow: "Debug",
  title: "Using the debugger",
  href: "/59/debugger/",
  text: "The CALCULATOR, CPU and LOG tabs, freeze and step, FREEZE ON START, and binary trace files for offline analysis."
}, {
  eyebrow: "Hardware",
  title: "Printer and card reader",
  href: "/59/getting-started/printer/",
  text: "The PC-100C panel in dot and text view, printing and advancing paper, copying the strip, and where card files are kept."
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
   HOME — overview page.
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
  }, "TI-59 emulator for Mac, Windows, Linux, iPhone and iPad"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Calc-U ", /*#__PURE__*/React.createElement("em", null, "59")), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Calc-U 59 is a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--fg)"
    }
  }, "TI-59, TI-58 and TI-58C emulator"), " for macOS, Windows, Linux, iPhone and iPad. It runs the original Texas Instruments ROM, reads and writes virtual magnetic cards, emulates the PC-100C printer and all fourteen Solid State Software modules, and includes a CPU-level debugger. You can ", /*#__PURE__*/React.createElement("a", {
    href: "/59/play/"
  }, "try it in your browser"), " before you install anything."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn primary",
    href: "/59/getting-started/"
  }, "Getting started ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: "/59/reference/"
  }, "App reference"))), /*#__PURE__*/React.createElement("div", {
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
  }, "Install from the App Store, then open the app and pick a model. Presets load from the file picker inside the app.")), /*#__PURE__*/React.createElement("div", {
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
  }, "Download the free release from GitHub: a disk image for the Mac, an installer for Windows, an AppImage for Linux."))))), /*#__PURE__*/React.createElement("div", {
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
  }, "Calc-U 59 emulates the ", /*#__PURE__*/React.createElement("strong", null, "TI Programmable 59"), " that Texas Instruments introduced in 1977, along with its two smaller siblings, the ", /*#__PURE__*/React.createElement("strong", null, "TI-58"), " and the constant-memory ", /*#__PURE__*/React.createElement("strong", null, "TI-58C"), ". It does not reimplement the maths: the app runs the calculators' original ROM through an emulated processor, at the original speed, so every result, the flashing overflow display and the documented quirks behave the way the hardware did. The LED display even looks the way the eye saw the real one, dimming while the calculator works."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "0 0 12px",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "Switchable ", /*#__PURE__*/React.createElement("strong", null, "TI-59 / TI-58 / TI-58C"), " models, with the correct memory partition and startup state for each."), /*#__PURE__*/React.createElement("li", null, "All fourteen ", /*#__PURE__*/React.createElement("strong", null, "Solid State Software"), " library modules, from the Master Library to the RPN Simulator \u2014 ", /*#__PURE__*/React.createElement("a", {
    href: "/59/modules/"
  }, "see the full list"), "."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Magnetic cards"), " read and written as files, synced between your Apple devices over iCloud."), /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement("strong", null, "PC-100C thermal printer"), ", in both a dot-matrix view and a copyable text view."), /*#__PURE__*/React.createElement("li", null, "A ", /*#__PURE__*/React.createElement("a", {
    href: "/59/debugger/"
  }, "CPU-level debugger"), " with a live program listing, a ROM instruction trace, and binary trace capture for offline analysis."), /*#__PURE__*/React.createElement("li", null, "Plain-text ", /*#__PURE__*/React.createElement("a", {
    href: "/59/presets/"
  }, ".ti59 preset files"), " that carry a program, the registers, a cue card and a module selection in one readable file.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "New to these machines, or trying to work out which model you owned?", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/what-is-a-ti-59/"
  }, "Start with the background on the TI-59 and TI-58 \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      marginTop: 48,
      display: "flex",
      alignItems: "center",
      gap: 24
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
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: "0 0 4px"
    }
  }, "Available now"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14
    }
  }, "The Mac, Windows and Linux builds ship free from ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/releases/latest"
  }, "GitHub Releases"), ". The iPhone and iPad build is on the ", /*#__PURE__*/React.createElement("a", {
    href: "https://apps.apple.com/us/app/calc-u-59/id6761413142"
  }, "App Store"), ". Calc-U 59 is free software under the GNU GPL version 3; the source code is on ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59"
  }, "GitHub"), ".")))));
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
  const models = [{
    code: "TI-59",
    name: "TI Programmable 59",
    year: "May 1977",
    body: "The top of the range. Up to 960 program steps or 100 data registers, traded against each other in steps of 80 and 10, plus a magnetic card reader in the side for saving programs. Memory was volatile: switch it off and the program was gone unless it was on a card."
  }, {
    code: "TI-58",
    name: "TI Programmable 58",
    year: "May 1977",
    body: "The same calculator with half the memory — up to 480 steps or 60 registers — and no card reader. Library modules still worked, so it lost storage rather than capability."
  }, {
    code: "TI-58C",
    name: "TI Programmable 58C",
    year: "1979",
    body: "A TI-58 with constant memory. The C is the whole point: programs and registers survived being switched off, which removed most of the reason to want a card reader in the first place."
  }];
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Background"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "What is a TI-59?"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "A short orientation to the Texas Instruments TI-59, TI-58 and TI-58C \u2014 the machines Calc-U 59 emulates \u2014 for anyone who arrived here looking for one and wants to know what they are dealing with."), /*#__PURE__*/React.createElement("div", {
    className: "prose",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("p", null, "The ", /*#__PURE__*/React.createElement("strong", null, "TI Programmable 59"), " was Texas Instruments' flagship programmable calculator, introduced on 24 May 1977 at a list price of around $300. It succeeded the SR-52, and for the rest of the decade it was the machine engineers, surveyors, navigators and financial analysts actually carried. Its rival was the Hewlett-Packard HP-67; the TI had roughly twice the memory, the HP had RPN and better build quality, and people argued about it for years."), /*#__PURE__*/React.createElement("p", null, "You programmed it by recording keystrokes. In learn mode every key you pressed became a program step, and the ten user-defined keys \u2014 ", /*#__PURE__*/React.createElement(K, {
    tone: "dark"
  }, "A"), " through", " ", /*#__PURE__*/React.createElement(K, {
    tone: "dark"
  }, "E"), " and their primed second functions \u2014 were the entry points. That sounds primitive, and it is, but the instruction set includes conditionals, loops, subroutines and indirect register addressing, which makes the TI-59 Turing-complete. People wrote games for it.")), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "The three models"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, models.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.code,
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: 0
    }
  }, m.code), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg-3)",
      fontSize: 13
    }
  }, m.name, " \xB7 ", m.year)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--fg-2)"
    }
  }, m.body)))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      color: "var(--fg-2)",
      lineHeight: 1.7
    }
  }, "Calc-U 59 emulates all three. The app's model picker switches between them, and each starts with the memory partition and power-on state that model really had."), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Algebraic Operating System"), /*#__PURE__*/React.createElement("div", {
    className: "prose panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "These calculators use ", /*#__PURE__*/React.createElement("strong", null, "AOS"), " \u2014 Algebraic Operating System \u2014 rather than the RPN found on contemporary Hewlett-Packard machines. You enter an expression roughly as it is written on paper, with up to nine levels of parentheses, and the calculator applies operator precedence when you press ", /*#__PURE__*/React.createElement(K, {
    tone: "yellow"
  }, "="), ". Emulating AOS convincingly is the part that catches out reimplementations: the pending-operation stack has observable edge cases that only fall out correctly if you run the original ROM, which is what Calc-U 59 does."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "One of the library modules, ", /*#__PURE__*/React.createElement("strong", null, "RP"), ", is an RPN Simulator \u2014 Texas Instruments shipped a way to make its algebraic calculator behave like an HP.")), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Magnetic cards"), /*#__PURE__*/React.createElement("div", {
    className: "prose panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The TI-59's card reader took small magnetic strips, one quarter of the machine's memory per side. The card did double duty: once read, it slid into a slot above the keyboard so the labels written along its top edge sat directly beneath the", " ", /*#__PURE__*/React.createElement(K, {
    tone: "dark"
  }, "A"), "\u2013", /*#__PURE__*/React.createElement(K, {
    tone: "dark"
  }, "E"), " keys and told you what each one did in the program you had just loaded. That is what the cue card on screen in Calc-U 59 is reproducing."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "In the emulator, cards are files. They live in iCloud storage, so a program written on a Mac is on the iPhone by the time you pick it up. The card reader mechanism was also the most failure-prone part of the original hardware, which is a reasonable argument for emulating one instead of restoring one.")), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Solid State Software modules"), /*#__PURE__*/React.createElement("div", {
    className: "prose panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The TI-58 and TI-59 were the first handheld calculators with removable ROM program modules. A module held up to 5,000 program steps and ran straight from ROM, leaving user memory free. The Master Library came in the box; Applied Statistics, Surveying, Aviation, Marine Navigation, Securities Analysis and the rest were sold separately, and the complete set is now hard to find and expensive."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Calc-U 59 includes all fourteen. ", /*#__PURE__*/React.createElement("a", {
    href: "/59/modules/"
  }, "See the module list \u2192"))), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "The PC-100C printer"), /*#__PURE__*/React.createElement("div", {
    className: "prose panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "The calculator docked into a thermal printer \u2014 the PC-100A, B or C \u2014 and locked in place with a key. Beyond printing results, it was how you got a readable listing of a program with mnemonics instead of raw numeric key codes, dumped the data registers, or traced execution. It is emulated in Calc-U 59, including the paper strip, which you can copy as plain text rather than squinting at dot-matrix output.", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/getting-started/printer/"
  }, "Printer and card reader \u2192"))), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Try one"), /*#__PURE__*/React.createElement("div", {
    className: "prose panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The quickest way to see whether this is the machine you remember is to use one. The", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/play/"
  }, "browser emulator"), " runs the app's own emulator compiled to WebAssembly \u2014 a TI-59 with all fourteen library modules and a magnetic card \u2014 and needs no installation. The full app, with the TI-58 and TI-58C, the printer and the debugger, is free on the ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/mac/"
  }, "Mac"), ",", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/windows-linux/"
  }, "Windows and Linux"), ", and", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/iphone-ipad/"
  }, "on the App Store"), " for iPhone and iPad."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0,
      color: "var(--fg-3)",
      fontSize: 13
    }
  }, "For the original operating manuals, program libraries and the wider TI-59 community, start at ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.ti59.com/"
  }, "ti59.com"), " and", " ", /*#__PURE__*/React.createElement("a", {
    href: "http://www.datamath.org/SCI/WEDGE/TI-59.htm"
  }, "datamath.org"), ". This site only documents the emulator.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
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
    body: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 16,
        marginTop: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel",
      style: {
        padding: 20,
        lineHeight: 1.7
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 0
      }
    }, "Calc-U 59 runs the original Texas Instruments ROM, so the calculator in front of you behaves the way a real TI-59, TI-58 or TI-58C does, down to its speed and its Solid State Software modules."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginBottom: 0
      }
    }, "Most people need three things: get the app installed, load a preset, and know where the printer and the debugger live. Each is a short page.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(StartCards, null)))
  },
  printer: {
    title: "Printer and card reader",
    note: "The PC-100C panel, paper strip, copy/cut, and card file behaviour.",
    body: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 16,
        marginTop: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel",
      style: {
        padding: 20,
        lineHeight: 1.7
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 0
      }
    }, "The printer view mimics the PC-100C. The ", /*#__PURE__*/React.createElement("strong", null, "PC-100C"), " button at the top of the printer view, with its red or grey dot, connects or disconnects the printer; switching it resets the calculator, as plugging in the real printer does. Switch between dot view and text view depending on whether you want realism or easy copying."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "PRINT"), " and ", /*#__PURE__*/React.createElement("strong", null, "ADV"), " are the printer's own keys: PRINT prints the display, ADV advances the paper while held. ", /*#__PURE__*/React.createElement("strong", null, "T"), " is the printer's TRACE switch, which makes the calculator print every step it executes. Copy puts the strip on the clipboard as an image and as text; cut copies it and then clears the paper."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginBottom: 0
      }
    }, "Holding the display runs the calculator at full speed, and that now includes printing \u2014 a long 2nd List or a calendar printout finishes in moments.")), /*#__PURE__*/React.createElement("div", {
      className: "panel",
      style: {
        padding: 20,
        lineHeight: 1.7
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 0,
        marginBottom: 0
      }
    }, "The TI-59 has a card reader; the TI-58 and TI-58C don't. Its ", /*#__PURE__*/React.createElement("strong", null, "Crd"), " buttons load a card or insert a blank one to write, and ", /*#__PURE__*/React.createElement("strong", null, "Eject Card"), " takes it out. Card files (.U59) live in the app's card storage \u2014 iCloud on Mac, iPhone and iPad (or the app's local folder when iCloud is off), ", /*#__PURE__*/React.createElement("code", null, "~/Calc-U-59"), " on Windows and Linux. The picker lists only card files.")))
  }
};
function GettingStartedPage({
  topic = "overview"
}) {
  const t = TOPICS[topic];
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap docs-layout"
  }, /*#__PURE__*/React.createElement(DocsSidebar, {
    current: topic,
    sections: STARTED_SECTIONS
  }), /*#__PURE__*/React.createElement("article", {
    className: "prose docs-article"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Getting started"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title compact"
  }, t.title), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, t.note), t.body));
}

/* =============================================================
   DETAIL PAGES — dedicated targets for home topic cards.
   ============================================================= */
function InstallMobilePage() {
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Setup"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Installing on iPhone and iPad"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Use the App Store build, then configure the model and load presets from inside the app."), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "Open the ", /*#__PURE__*/React.createElement("a", {
    href: "https://apps.apple.com/us/app/calc-u-59/id6761413142",
    className: "link-accent"
  }, "App Store"), " and install Calc-U 59."), /*#__PURE__*/React.createElement("li", null, "Launch the app and pick the calculator model in the bottom bar. Settings \u203A Startup Calculator chooses the model the app starts with."), /*#__PURE__*/React.createElement("li", null, "Use the preset file picker for .ti59, .ti58, or .ti58c files."))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The app needs iOS or iPadOS 18 or later. There is no extra setup after install."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "On iPhone in portrait, the calculator fills the screen and the printer and the debugger are pages you swipe to (the debugger only with Settings \u203A Debug Page in Portrait). In landscape, the iPhone shows the calculator next to the printer. On iPad in landscape, the layout mirrors the Mac view.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
}
function InstallMacPage() {
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Setup"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Installing on Mac"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Download the release from GitHub, then drag the app to Applications."), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "Download the latest release DMG from ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/releases/latest",
    className: "link-accent"
  }, "GitHub"), "."), /*#__PURE__*/React.createElement("li", null, "Double-click the DMG file to open it and show the installer window."), /*#__PURE__*/React.createElement("li", null, "Drag Calc-U-59.app to the Applications folder."), /*#__PURE__*/React.createElement("li", null, "Eject the disk image and launch the app from Applications."))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "The app is signed and notarized by Apple, so macOS opens it like any other application. It needs macOS 15.6 or later. Cards and the TI-58C's memory sync through iCloud with the iPhone and iPad app.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
}
function InstallPcPage() {
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Setup"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Installing on Windows and Linux"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Download the Windows installer or the Linux AppImage from GitHub. The app has the same calculators, printer, cards, presets and debugger as the Mac app."), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0
    }
  }, "Windows"), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "From the latest ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/releases/latest",
    className: "link-accent"
  }, "GitHub release"), ", download ", /*#__PURE__*/React.createElement("code", null, "Calc-U-59-Setup.exe"), " (most PCs) or ", /*#__PURE__*/React.createElement("code", null, "Calc-U-59-Setup-arm64.exe"), " (Windows on ARM)."), /*#__PURE__*/React.createElement("li", null, "Run it. The installer isn't signed, so Windows SmartScreen may warn about an unrecognised app: choose ", /*#__PURE__*/React.createElement("strong", null, "More info"), ", then ", /*#__PURE__*/React.createElement("strong", null, "Run anyway"), "."), /*#__PURE__*/React.createElement("li", null, "Start Calc-U-59 from the Start menu."))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0
    }
  }, "Linux"), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "From the same release, download the AppImage for your machine: ", /*#__PURE__*/React.createElement("code", null, "x86_64"), " for most PCs, ", /*#__PURE__*/React.createElement("code", null, "aarch64"), " for ARM."), /*#__PURE__*/React.createElement("li", null, "Make it executable (", /*#__PURE__*/React.createElement("code", null, "chmod +x Calc-U-59-*.AppImage"), ", or the file's Properties dialog) and run it. Nothing else needs installing."))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0
    }
  }, "Where your files go"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "Cards and the TI-58C's constant memory (", /*#__PURE__*/React.createElement("code", null, "ti58c.mem"), ") are kept in ", /*#__PURE__*/React.createElement("code", null, "Calc-U-59"), " in your home folder; debugger traces go there too. Settings \u203A Files changes the card folder, the trace folder and the folder ", /*#__PURE__*/React.createElement("strong", null, "Open Preset"), " starts in."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "There is no iCloud on these platforms, so cards don't sync with the Apple apps \u2014 copy the .U59 files across if you want them there.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
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
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Files"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Loading a preset"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Presets are plain UTF-8 text files with named sections. You can include only the sections you need."), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16,
      marginTop: 24,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      lineHeight: 1.6
    }
  }, "New to writing a preset from scratch? The tutorial builds one up section by section, with a downloadable file at every step."), /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: "/59/presets/tutorial/"
  }, "Preset tutorial ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: 16,
      borderRadius: 8,
      background: "var(--bg-inset)",
      color: "var(--fg)",
      overflowX: "auto",
      lineHeight: 1.5,
      fontSize: 13
    }
  }, stateFileExample)), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/cuecard-single-label.png",
    alt: "MagnetCard cue card titled Example, with the Start label in the A key position and blank A\u2032\u2013E\u2032 and B\u2013E cells",
    style: {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "PARTITION:"), " sets the step split between program memory and data registers."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "PROGRAM:"), " accepts sparse step listings, numeric keycodes, and the ", /*#__PURE__*/React.createElement("strong", null, "..."), " gap marker."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "REGISTERS:"), " stores calculator variables as decimal numbers."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "KEYSTROKES:"), " injects matrix codes after the file loads. Between keys, lines such as ", /*#__PURE__*/React.createElement("strong", null, "Wait:"), ", ", /*#__PURE__*/React.createElement("strong", null, "WaitFullSpeed:"), ", ", /*#__PURE__*/React.createElement("strong", null, "FullSpeed:"), " and ", /*#__PURE__*/React.createElement("strong", null, "RegularSpeed:"), " control timing, and a few more (", /*#__PURE__*/React.createElement("strong", null, "Trace:"), ", ", /*#__PURE__*/React.createElement("strong", null, "ZeroElapseTime:"), ", ", /*#__PURE__*/React.createElement("strong", null, "ReportElapseTime:"), ") help with timing and debugging programs."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "CUECARD:"), " defines the on-screen cue card that appears with the loaded file or module."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "SOLID-STATE-MODULE:"), " and ", /*#__PURE__*/React.createElement("strong", null, "PRINTER:"), " let a file select the matching module and printer state automatically, and ", /*#__PURE__*/React.createElement("strong", null, "MODEL:"), " switches to the calculator the file is for."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "SKIP-RESET: on"), " loads into the running calculator without resetting it first \u2014 only the sections the file contains are applied."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "This page covers enough to load and tweak existing files. The complete grammar \u2014 matrix code table, 2nd-function presses, the CUECARD field list, and the math-notation shorthand used in cue cards \u2014 is developer documentation kept in the GitHub repository:", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/blob/main/reference/StateFileFormat.md",
    className: "link-accent"
  }, "reference/StateFileFormat.md \u2192"))), /*#__PURE__*/React.createElement("h2", {
    id: "labeling-keys",
    className: "section",
    style: {
      marginTop: 24
    }
  }, "Labeling the A\u2013E and A\u2032\u2013E\u2032 keys"), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The five plain keys (", /*#__PURE__*/React.createElement("strong", null, "A\u2013E"), ") and their 2nd-function row (", /*#__PURE__*/React.createElement("strong", null, "A\u2032\u2013E\u2032"), ") are exactly what real TI-59/58/58C cards label. A ", /*#__PURE__*/React.createElement("strong", null, "CUECARD:"), " section can do the same thing on-screen \u2014 either as its own row of short per-key labels, or as one line of running text across the whole row."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Template"), " picks the card artwork and layout, and matches the real card it stands in for \u2014 ", /*#__PURE__*/React.createElement("strong", null, "MagnetCard"), " ", "and ", /*#__PURE__*/React.createElement("strong", null, "CueCard"), " look almost identical on screen, since both were the same front-side label design. The difference is on the back: a real magnetic card has a magnetic coating that stores the program; a cue card doesn't. Use ", /*#__PURE__*/React.createElement("strong", null, "MagnetCard"), " if the preset is meant to end up written onto a magnetic card (it also shows the ", /*#__PURE__*/React.createElement("strong", null, "Banks"), " page badges). Cue cards shipped for TI-58, TI-58C ", /*#__PURE__*/React.createElement("em", null, "and"), " TI-59 owners, but TI-59 owners tended to skip them and just label whichever magnetic card already held the program instead; TI-58 and TI-58C, having no card reader at all, relied on cue cards since there was no magnetic card to label in the first place \u2014 use", " ", /*#__PURE__*/React.createElement("strong", null, "CueCard"), " for that case, or for any file that just wants an on-screen label without a magnetic-card connotation. Which of the two you pick for a given preset is mostly personal preference, except when the file is a step toward an actual magnetic card \u2014 then use ", /*#__PURE__*/React.createElement("strong", null, "MagnetCard"), " to match.", " ", /*#__PURE__*/React.createElement("strong", null, "SolidStateCard"), " ", "reproduces the pre-printed cards that shipped with a Solid State Software module; real ones can't be edited by the module's user, and in the emulator they're normally only touched by the project's developer to document a built-in module \u2014 reach for it yourself only if you're prototyping your own module (it shows an", " ", /*#__PURE__*/React.createElement("strong", null, "ID"), " like ", /*#__PURE__*/React.createElement("code", null, "ML-01"), " instead of Banks)."), /*#__PURE__*/React.createElement("p", null, "Set fields ", /*#__PURE__*/React.createElement("strong", null, "A"), " through ", /*#__PURE__*/React.createElement("strong", null, "E"), " for the plain-key row, and ", /*#__PURE__*/React.createElement("strong", null, "A\u2032"), " through ", /*#__PURE__*/React.createElement("strong", null, "E\u2032"), " ", "(a straight apostrophe also works: ", /*#__PURE__*/React.createElement("code", null, "A'"), ") for the 2nd-function row. Leaving ", /*#__PURE__*/React.createElement("strong", null, "Row1"), " or ", /*#__PURE__*/React.createElement("strong", null, "Row2"), " ", "out entirely is what makes that row show the label grid instead of a line of text \u2014 if you fill in Row1/Row2, the individual A\u2013E labels for that row are not shown."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Row1"), " replaces the A\u2032\u2013E\u2032 grid with one line of running text, and ", /*#__PURE__*/React.createElement("strong", null, "Row2"), " does the same for the A\u2013E grid. ", /*#__PURE__*/React.createElement("strong", null, "Row2R"), " is a second piece of text placed on the same line as Row2, right-aligned against it \u2014 handy for something like a page number or units note that shouldn't compete with the main label for space. Each of the three has its own alignment field \u2014 ", /*#__PURE__*/React.createElement("strong", null, "Row1Align"), ", ", /*#__PURE__*/React.createElement("strong", null, "Row2Align"), ",", " ", /*#__PURE__*/React.createElement("strong", null, "Row2RAlign"), " \u2014 set to ", /*#__PURE__*/React.createElement("code", null, "left"), ",", " ", /*#__PURE__*/React.createElement("code", null, "center"), ", or ", /*#__PURE__*/React.createElement("code", null, "right"), " (Row1 defaults to center, Row2 and Row2R to left).", " ", "On a CueCard or MagnetCard, ", /*#__PURE__*/React.createElement("strong", null, "PencilColor"), " picks the ink: ", /*#__PURE__*/React.createElement("code", null, "black"), " (the default), ", /*#__PURE__*/React.createElement("code", null, "pencil"), " or", " ", /*#__PURE__*/React.createElement("code", null, "sharpie"), ".", " ", /*#__PURE__*/React.createElement("strong", null, "Style"), " is ", /*#__PURE__*/React.createElement("code", null, "none"), " by default, or", " ", /*#__PURE__*/React.createElement("code", null, "button"), " to draw a border around the Row1/Row2/Row2R text, mimicking the boxed instruction labels real cards use.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: 16,
      borderRadius: 8,
      background: "var(--bg-inset)",
      color: "var(--fg)",
      overflowX: "auto",
      lineHeight: 1.5,
      fontSize: 13
    }
  }, cueCardLabelExample)), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/cuecard-key-grid.png",
    alt: "MagnetCard cue card titled Roots and Powers, with per-key labels on both the A\u2032\u2013E\u2032 and A\u2013E rows, including a merged x \u2192 y span",
    style: {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: 16,
      borderRadius: 8,
      background: "var(--bg-inset)",
      color: "var(--fg)",
      overflowX: "auto",
      lineHeight: 1.5,
      fontSize: 13
    }
  }, cueCardRowExample)), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/cuecard-row-text.png",
    alt: "CueCard titled Compound Interest, with a centered, boxed Row1 instruction line and left-aligned Row2 / right-aligned Row2R text below it",
    style: {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "A short set of LaTeX-style shortcuts expand to the Unicode symbols real TI-59 cards use in labels, so you don't need a Unicode picker \u2014 for example ", /*#__PURE__*/React.createElement("code", null, "\\to"), " becomes an arrow, ", /*#__PURE__*/React.createElement("code", null, "\\sqrt"), " ", "becomes a root sign, ", /*#__PURE__*/React.createElement("code", null, "\\sum"), " becomes \u03A3, and", " ", /*#__PURE__*/React.createElement("code", null, "x^{2}"), " becomes ", /*#__PURE__*/React.createElement("code", null, "x\xB2"), ". The full token table is in ", /*#__PURE__*/React.createElement("strong", null, "reference/StateFileFormat.md"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "To make one label visually span more than one key position, set the following cell(s) to ", /*#__PURE__*/React.createElement("code", null, "\\blank"), " \u2014 for example", " ", /*#__PURE__*/React.createElement("code", null, "D: \\blank"), " right after a filled-in ", /*#__PURE__*/React.createElement("strong", null, "C"), " ", "merges D into C's column so the C label reads across both keys.")), /*#__PURE__*/React.createElement("h2", {
    className: "section",
    style: {
      marginTop: 24
    }
  }, "Loading a labeled card"), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "From a preset"), " \u2014 tap ", /*#__PURE__*/React.createElement("strong", null, "Preset"), " and pick a ", /*#__PURE__*/React.createElement("code", null, ".ti59"), "/", /*#__PURE__*/React.createElement("code", null, ".ti58"), "/", /*#__PURE__*/React.createElement("code", null, ".ti58c"), " file with a CUECARD section; it's applied immediately and stays until you load something else or reset."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Onto a virtual magnetic card"), " \u2014 load a preset with the CUECARD you want active, then write a card on the TI-59 (press 2nd Write and insert a blank card with the ", /*#__PURE__*/React.createElement("strong", null, "Crd"), " button): whatever cue card is on screen at that moment is saved into the card file along with the program or data. Loading that card back with the other ", /*#__PURE__*/React.createElement("strong", null, "Crd"), " button restores the label along with the contents."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "By editing the card file directly"), " \u2014 virtual card files are plain text too (see the FAQ entry on where they live), with the same ", /*#__PURE__*/React.createElement("code", null, "CUECARD:"), " syntax as a preset. Add or edit that section in a text editor and the label shows the next time the card is read.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
}

/* =============================================================
   PRESET TUTORIAL — builds one .ti59 preset file up from nothing,
   one section at a time, with a real downloadable file at every step.
   The finished file is docs/tutorial-files/tutorial.ti59, also linked
   from /presets/ and the FAQ.
   ============================================================= */
function TutorialStep({
  num,
  title,
  children,
  code,
  file,
  filename
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    className: "section",
    style: {
      marginTop: 32
    }
  }, "Step ", num, ": ", title), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: 16,
      borderRadius: 8,
      background: "var(--bg-inset)",
      color: "var(--fg)",
      overflowX: "auto",
      lineHeight: 1.5,
      fontSize: 13
    }
  }, code)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: `/59/tutorial-files/${file}`,
    download: true
  }, "Download ", filename || file)));
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
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Files"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Writing a preset file, step by step"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "A preset file is nothing more than plain text. This tutorial builds one up from nothing, one section at a time, so you can see exactly what each line changes. Every step below is also a real, downloadable ", /*#__PURE__*/React.createElement("code", null, ".ti59"), " file you can load in Calc-U 59 as you go \u2014 try each one before moving to the next."), /*#__PURE__*/React.createElement("div", {
    id: "editing-workflow",
    className: "panel",
    style: {
      padding: 20,
      marginTop: 24,
      lineHeight: 1.7,
      border: "1px solid var(--accent-deep)",
      background: "rgba(240,192,64,.04)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: "var(--accent)"
    }
  }, "Before you start")), /*#__PURE__*/React.createElement("p", null, "A preset is just a text file, so it's usually easiest to write and edit it on a computer with a proper text editor, then get the finished file onto whichever device runs Calc-U 59. In the Apple ecosystem, the simplest way is to keep your presets in the", " ", /*#__PURE__*/React.createElement("strong", null, "Calc-U-59"), " folder under iCloud Drive on your Mac \u2014 the same folder the app uses for virtual magnetic cards \u2014 and let iCloud sync it to your iPhone or iPad automatically; open it there from the Files app or the preset picker. On Windows and Linux, keep them in any folder and point Settings \u203A Files \u203A Preset Folder at it; to get them onto a phone, any folder that syncs to it works."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "None of that is required, though: you can write and edit a preset directly on an iPhone or iPad in any text editor that saves plain text, with no computer involved at all. That also means you can read this tutorial on the device itself and download each step's file straight to it \u2014 the same goes for every other preset on the", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/software/"
  }, "TI-59 Software Collection"), " page.")), /*#__PURE__*/React.createElement("div", {
    id: "txt-extension",
    className: "panel",
    style: {
      padding: 20,
      marginTop: 12,
      lineHeight: 1.7,
      border: "1px solid var(--accent-deep)",
      background: "rgba(240,192,64,.04)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: "var(--accent)"
    }
  }, "Watch out for .txt")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "When you save a preset with a plain text editor, it's easy to end up with ", /*#__PURE__*/React.createElement("code", null, "my-preset.ti59.txt"), " instead of", " ", /*#__PURE__*/React.createElement("code", null, "my-preset.ti59"), " \u2014 Windows and macOS both hide known file extensions by default, so the file still looks like", " ", /*#__PURE__*/React.createElement("code", null, "my-preset.ti59"), " in Finder, Explorer, or the iPhone file picker. Calc-U 59's preset picker only accepts", " ", /*#__PURE__*/React.createElement("code", null, ".ti59"), ", ", /*#__PURE__*/React.createElement("code", null, ".ti58"), " and ", /*#__PURE__*/React.createElement("code", null, ".ti58c"), ", so a file with a hidden ", /*#__PURE__*/React.createElement("code", null, ".txt"), " tail shows up", " ", /*#__PURE__*/React.createElement("strong", null, "grayed out and can't be selected"), ". If that happens, turn on \"Show file extensions\" (Windows Explorer) or \"Show all filename extensions\" (macOS Finder \u2014 Finder \u25B8 Settings \u25B8 Advanced) and rename the file, or rename it from a terminal with", " ", /*#__PURE__*/React.createElement("code", null, "mv my-preset.ti59.txt my-preset.ti59"), ".")), /*#__PURE__*/React.createElement(TutorialStep, {
    num: 1,
    title: "Setup",
    code: step1,
    file: "tutorial-1-setup.ti59"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "Start with the three lines every preset can begin with:", " ", /*#__PURE__*/React.createElement("strong", null, "MODEL"), " picks which calculator you get (TI-59, TI-58 or TI-58C), ", /*#__PURE__*/React.createElement("strong", null, "SOLID-STATE-MODULE"), " loads one of the fourteen library modules by its two-letter code \u2014 here", " ", /*#__PURE__*/React.createElement("strong", null, "ML"), " for the Master Library \u2014 and", " ", /*#__PURE__*/React.createElement("strong", null, "PRINTER"), " switches the emulated PC-100C on or off."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Load this file and you already have a working calculator: nothing else in a preset is required. Everything from here on is optional, added only because this particular preset needs it.")), /*#__PURE__*/React.createElement(TutorialStep, {
    num: 2,
    title: "Partition",
    code: step2,
    file: "tutorial-2-partition.ti59"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "PARTITION"), " sets the split between program memory and data registers \u2014 the same trade-off the real TI-59 keyboard sequence ", /*#__PURE__*/React.createElement("strong", null, "2nd Op 17"), " controls. The value is written as ", /*#__PURE__*/React.createElement("code", null, "steps.registers"), ": ", /*#__PURE__*/React.createElement("code", null, "719.29"), " means step 719 is the last program step, so 720 steps go to the program and the remaining 240 steps become 30 data registers (numbered 00\u201329) on a TI-59. Leave this line out and the emulator uses the model's default partition instead."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "This step doesn't change what you see when you load the file \u2014 there's no program or cue card yet. The tutorial's program is short enough for the default partition too; the line is here to show the syntax.")), /*#__PURE__*/React.createElement(TutorialStep, {
    num: 3,
    title: "Cue card",
    code: step3,
    file: "tutorial-3-cuecard.ti59"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "CUECARD"), " is what turns a blank calculator into a labeled one. ", /*#__PURE__*/React.createElement("strong", null, "Template: MagnetCard"), " and", " ", /*#__PURE__*/React.createElement("strong", null, "CueCard"), " draw almost identical card art \u2014 real magnetic cards and cue cards used the same front-side label design. The difference is the back: a magnetic card stores the program, a cue card doesn't, so ", /*#__PURE__*/React.createElement("strong", null, "MagnetCard"), " is the right choice here since this file is building toward one.", " ", /*#__PURE__*/React.createElement("strong", null, "Title"), " and ", /*#__PURE__*/React.createElement("strong", null, "Banks"), " are the card's header text and bank badges."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Row1"), " replaces the entire A\u2032\u2013E\u2032 label row with one line of running text instead of five separate key labels \u2014 handy for a one-line instruction like this tutorial's \"Calculates the sum of 1..N the slow way\". ", /*#__PURE__*/React.createElement("strong", null, "A"), " through", " ", /*#__PURE__*/React.createElement("strong", null, "E"), " label the plain key row individually;", " ", /*#__PURE__*/React.createElement("code", null, "\\blank"), " on ", /*#__PURE__*/React.createElement("strong", null, "D"), " and ", /*#__PURE__*/React.createElement("strong", null, "E"), " ", "merges those key positions into C's label so \"Enter number, then A\" reads across all three keys."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Load this file now and the card appears immediately \u2014 nothing on it does anything yet, because there's still no program behind the", " ", /*#__PURE__*/React.createElement("strong", null, "A"), " key. The full", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/presets/#labeling-keys"
  }, "CUECARD field reference"), " ", "covers every field, the math-notation shortcuts, and both templates in more depth.")), /*#__PURE__*/React.createElement(TutorialStep, {
    num: 4,
    title: "Program",
    code: step4,
    file: "tutorial-4-program.ti59"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "PROGRAM"), " loads program memory as key codes \u2014 the same codes the calculator itself displays while you record a program by hand, not the physical key positions. Whitespace and line breaks are cosmetic; the loader reads a flat stream of two-digit codes and ignores anything after ", /*#__PURE__*/React.createElement("strong", null, "#"), ", so the step-number comments above are for the reader, not the parser. This particular listing sums a number down to 1: it stores the entered value, loops subtracting and adding into a running total, and stops with ", /*#__PURE__*/React.createElement("strong", null, "R/S"), " when done."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Load this file and press a digit, then ", /*#__PURE__*/React.createElement("strong", null, "A"), " \u2014 the cue card told you to \u2014 and the program actually runs now.")), /*#__PURE__*/React.createElement(TutorialStep, {
    num: 5,
    title: "Registers",
    code: step5,
    file: "tutorial-5-registers.ti59"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "REGISTERS"), " preloads data register contents as plain decimal numbers, at the calculator's full internal precision \u2014 13 significant digits. The value here,", " ", /*#__PURE__*/React.createElement("code", null, "3.000000000004"), " in register 29, is deliberately one that's awkward to key in by hand on real hardware (you'd need", " ", /*#__PURE__*/React.createElement("strong", null, "SUM"), " and a division to land on it exactly); a preset just states the final value directly."), /*#__PURE__*/React.createElement("p", null, "This step doesn't change what the program does \u2014 register 29 isn't part of the sum routine above \u2014 it's here so the next step has something worth recalling with ", /*#__PURE__*/React.createElement("strong", null, "RCL"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "To check that a value actually loaded, open the ", /*#__PURE__*/React.createElement("a", {
    href: "/59/debugger/"
  }, "debugger"), " ", "and look at the register list \u2014 on Mac, Windows, Linux and on iPad in landscape it's visible right alongside the calculator; on iPhone (and iPad in portrait) swipe to it. The debugger has to be turned on first on iPhone/portrait iPad: enable ", /*#__PURE__*/React.createElement("strong", null, "Debug Page in Portrait"), " ", "under ", /*#__PURE__*/React.createElement("strong", null, "Settings"), ", or it won't be there to swipe to.")), /*#__PURE__*/React.createElement(TutorialStep, {
    num: 6,
    title: "Keystrokes",
    code: step6,
    filename: "tutorial.ti59",
    file: "tutorial.ti59"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "KEYSTROKES"), " is the odd one out: everything above describes the calculator's state, but this section acts, sending real key presses after everything else has loaded \u2014", " ", /*#__PURE__*/React.createElement("strong", null, "Wait: 2s"), " pauses between groups so you can watch the display change. Keystrokes use ", /*#__PURE__*/React.createElement("em", null, "matrix coordinates"), ", not the program-memory key codes from Step 4 \u2014 the digit", " ", /*#__PURE__*/React.createElement("strong", null, "5"), " is program key code ", /*#__PURE__*/React.createElement("code", null, "05"), " but matrix code ", /*#__PURE__*/React.createElement("code", null, "73"), ". The two tables are documented separately in the format reference precisely because mixing them up is the most common preset-writing mistake."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "This is the finished tutorial file. Loading it types", " ", /*#__PURE__*/React.createElement("strong", null, "5"), ", ", /*#__PURE__*/React.createElement("strong", null, "A"), " to run the sum program from Step 4, waits, then recalls register 29 from Step 5 and subtracts 3 from it \u2014 demonstrating, in order, every section this tutorial added.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      marginTop: 32,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "That covers enough to write your own preset from scratch. The", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/presets/"
  }, "preset reference page"), " documents every section in one place, and the complete grammar \u2014 the full matrix code table, 2nd-function key codes, and the CUECARD field list \u2014 is developer documentation in the GitHub repository:", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/blob/main/reference/StateFileFormat.md",
    className: "link-accent"
  }, "reference/StateFileFormat.md \u2192")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "For more preset files to read and load, including much longer real-world programs, see the", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/software/"
  }, "TI-59 Software Collection"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
}
function DebuggerPage() {
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Debug"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Using the debugger"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "The debug pane combines a program-level view, a CPU-level instruction trace, and a trace capture tool for analyzing the emulator's behavior in detail."), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0,
      marginBottom: 12
    }
  }, "Overview"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "The debug pane has three tabs: ", /*#__PURE__*/React.createElement("strong", null, "CALCULATOR"), ", ", /*#__PURE__*/React.createElement("strong", null, "CPU"), ", and ", /*#__PURE__*/React.createElement("strong", null, "LOG"), "."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0 0",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "CALCULATOR"), " \u2014 Program listing (copied from RAM), the working value X, registers, flags and the status register at the current moment. Shows the step that will execute ", /*#__PURE__*/React.createElement("em", null, "next"), ". Useful for stepping through your own programs."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "CPU"), " \u2014 Execution trace: the actual sequence of ROM instructions that ran. Shows the instruction that just ", /*#__PURE__*/React.createElement("em", null, "finished"), " and the register state ", /*#__PURE__*/React.createElement("em", null, "after"), " it executed. You can scroll back through the history."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "LOG"), " \u2014 Dumps of the calculator's memory on request, the debug log, and the TRACE toggle. Most useful for capturing session files for deep analysis."))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0,
      marginBottom: 12
    }
  }, "CALCULATOR tab"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The CALCULATOR tab shows a window into program memory (copied from RAM) centred on the current step. The highlighted instruction is the one that will execute ", /*#__PURE__*/React.createElement("strong", null, "next"), ". After a jump (GTO, SBR, etc.) the listing jumps to the new location \u2014 it does not show where you came from, because it is not a trace."), /*#__PURE__*/React.createElement("p", null, "Registers and flags reflect the calculator state ", /*#__PURE__*/React.createElement("strong", null, "right now"), ", before the highlighted step runs. When frozen, the cursor reads ", /*#__PURE__*/React.createElement("strong", null, "\u2190 next"), ", as the calculator's own LRN display does after SST. While a program runs, the tab shows the state at the last program step, never the middle of an operation."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "0 0 12px",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "X:"), " \u2014 the calculator's working value with all 13 digits. When that register holds no number (for example while single-stepping a fast-mode program), the raw register is shown in amber."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "DEBUG"), " \u2014 the FA and FB flag registers and ", /*#__PURE__*/React.createElement("strong", null, "HIR0:"), ", the whole status register."), /*#__PURE__*/React.createElement("li", null, "Fast mode is shown whenever the program runs in it.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "STEP in CALCULATOR mode"), " \u2014 advances exactly as SST does: one program step per press, with a jump (GTO, SBR, RTN, a conditional) completed in the step that causes it. Hold STEP to repeat. This is the right tool for tracing through a keystroke-driven program one step at a time.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0,
      marginBottom: 12
    }
  }, "CPU tab"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The CPU tab shows the actual ROM instructions that executed, in order. Each entry represents an instruction that ", /*#__PURE__*/React.createElement("strong", null, "already ran"), "; registers and flags are in the state ", /*#__PURE__*/React.createElement("em", null, "after"), " that instruction completed."), /*#__PURE__*/React.createElement("p", null, "Because it is a true execution trace, you can see jumps, subroutine calls, and PREG transitions \u2014 the address changes visibly in the listing. You can also scroll back through past entries to review earlier execution."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "STEP in CPU mode"), " \u2014 pressing Step executes exactly one ROM instruction, then freezes. This is the right tool when you want to follow the ROM's internal logic one opcode at a time."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("strong", null, "ROM HEATMAP"), " \u2014 shows how often each ROM address ran; ", /*#__PURE__*/React.createElement("strong", null, "CLR"), " starts it over. It resets when you switch to the CPU tab, unless the CPU is frozen."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("strong", null, "ASM OVERLAY"), " \u2014 below the CPU tab, ", /*#__PURE__*/React.createElement("strong", null, "Select File"), " loads a small assembly program (see the ", /*#__PURE__*/React.createElement("a", {
    href: "/59/software/"
  }, "assembly examples"), "), ", /*#__PURE__*/React.createElement("strong", null, "Run"), " starts it and ", /*#__PURE__*/React.createElement("strong", null, "Clear"), " removes it. While an overlay is active, the CALCULATOR tab is unavailable."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Note on TEST/JUMP flags:"), " because state is captured ", /*#__PURE__*/React.createElement("em", null, "after"), " each instruction, a TEST shows the flag it set, but the following JUMP shows the auto-restored condition (usually 1). This is expected behaviour \u2014 it is not a bug.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0,
      marginBottom: 12
    }
  }, "Freeze controls"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The CALCULATOR and CPU tabs each have their own row of buttons in the tab's header: ", /*#__PURE__*/React.createElement("strong", null, "RESUME"), ", ", /*#__PURE__*/React.createElement("strong", null, "FREEZE"), ", ", /*#__PURE__*/React.createElement("strong", null, "FREEZE ON START"), " (", /*#__PURE__*/React.createElement("strong", null, "F.START"), " when the panel is narrow), ", /*#__PURE__*/React.createElement("strong", null, "ARMED"), ", and ", /*#__PURE__*/React.createElement("strong", null, "STEP"), "."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "FREEZE"), " \u2014 stops the CPU (in the CALCULATOR tab, at the next step)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "FREEZE ON START (CALCULATOR tab)"), " \u2014 arms the debugger so it freezes right before the first program step runs, the same point STEP stops at. This is triggered by pressing R/S, launching a program via a label, or any similar action. Useful for catching the very start of a program run."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "FREEZE ON START (CPU tab)"), " \u2014 arms the debugger so it freezes the moment the calculator leaves the keyboard scan loop. This happens when you press any key (which causes the ROM to exit the idle loop and start processing the keystroke) or when the calculator is reset. Useful for catching the very first ROM instruction of a key-press handler."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "ARMED"), " \u2014 shown in yellow when FREEZE ON START is active; click it to cancel."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "RESUME"), " \u2014 resumes execution from the frozen state."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "STEP"), " \u2014 advances one step (semantics differ per tab, see above).")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      marginBottom: 0,
      color: "var(--fg-2)"
    }
  }, "Only one FREEZE ON START can be armed at a time. Pressing it in one tab while the other is already ARMED silently transfers the arm. Once frozen, RESUME and STEP are only available in the tab that caused the freeze \u2014 the other tab's buttons are disabled to prevent accidental cross-tab interactions.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0,
      marginBottom: 12
    }
  }, "iPhone behaviour"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "On iPhone, the debugger is a page of its own in portrait (turn on Settings \u203A Debug Page in Portrait) and covers the calculator. This is different from iPad, the Mac, Windows and Linux, where both views are visible at the same time."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0 0",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "Switching to the ", /*#__PURE__*/React.createElement("strong", null, "CPU"), " tab resets the heat map, because the CPU trace was not running while CALCULATOR was visible. Exception: if the CPU is already frozen when you switch, the heat map is preserved."), /*#__PURE__*/React.createElement("li", null, "The selected tab (CALCULATOR, CPU, LOG) is remembered when you navigate away from the debugger and return."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "FREEZE ON START in CALCULATOR"), " works best in landscape or on iPad/Mac, where you can press a key on the calculator while the tab is watching. On iPhone you would need to go back to the calculator, press the key, then return to the debugger."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "FREEZE ON START in CPU"), " arms in the background and fires as soon as you press any key (or reset the calculator), regardless of which tab or screen is visible \u2014 the freeze is waiting for a ROM-level scan-loop exit, not a screen interaction."))), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0,
      marginBottom: 12
    }
  }, "TRACE and LOG: for session capture and analysis"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The ", /*#__PURE__*/React.createElement("strong", null, "LOG"), " panel serves two main purposes:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Dumps"), " \u2014 the ", /*#__PURE__*/React.createElement("strong", null, "SCOM"), ", ", /*#__PURE__*/React.createElement("strong", null, "Memory"), ", ", /*#__PURE__*/React.createElement("strong", null, "Prog"), " and ", /*#__PURE__*/React.createElement("strong", null, "Vars"), " buttons write the scratch registers, the RAM, the program or the data registers to the log as raw values; the trash button clears it."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "TRACE toggle"), " \u2014 Records a binary session file while the calculator is running. This is the most thorough way to understand sequences like the reset routine or key-processing flow.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("strong", null, "To capture and analyze a sequence:")), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, "Switch to the LOG tab and toggle TRACE on."), /*#__PURE__*/React.createElement("li", null, "Perform the action you want to analyze (e.g., press ", /*#__PURE__*/React.createElement("strong", null, "Reset"), ", or execute a ROM subroutine)."), /*#__PURE__*/React.createElement("li", null, "Toggle TRACE off to stop recording."), /*#__PURE__*/React.createElement("li", null, "Find the trace file: on the Mac in the Save Location from Settings (local by default), on iPhone and iPad in the app's iCloud folder (use the Files app), on Windows and Linux in the trace folder from Settings \u203A Files. The app tells you if the file couldn't be created or reached its size limit."), /*#__PURE__*/React.createElement("li", null, "On a computer with Python, download the ", /*#__PURE__*/React.createElement("code", null, "read_trace.py"), " tool from the ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/tinue/Calc-U-59/tree/main/tools",
    className: "link-accent"
  }, "Calc-U-59 tools folder"), "."), /*#__PURE__*/React.createElement("li", null, "Run: ", /*#__PURE__*/React.createElement("code", {
    style: {
      background: "var(--bg-inset)",
      padding: "2px 6px",
      borderRadius: 4
    }
  }, "python3 ./read_trace.py --clean --skip-repeating CALCU59_TRACE.bin > CALCU59_TRACE.txt"), " (the TI-58 and TI-58C write CALCU58_TRACE.bin and CALCU58C_TRACE.bin)."), /*#__PURE__*/React.createElement("li", null, "Open the resulting text file to see the full execution trace as human-readable disassembly.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      marginBottom: 0
    }
  }, "The binary trace file can be large (190 MB for a long session), but the text output is much smaller (57 kB) because the tool deduplicates repetitive loops \u2014 especially the keyboard scan loop that runs continuously. This makes it practical to analyze even long traces.")), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      marginTop: 0,
      marginBottom: 12
    }
  }, "When to use each tool"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "CALCULATOR tab"), " \u2014 Stepping through your own program one step at a time, checking registers and flags at each step."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "CPU tab"), " \u2014 Tracing the ROM's internal instruction flow, reviewing jumps and subroutine calls, scrolling back through execution history."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "TRACE (in LOG)"), " \u2014 Capturing a complete ROM sequence for offline analysis (reset routine, memory writes, keyboard processing, etc.)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Debug logging (in LOG)"), " \u2014 the LOG button cycles the level between Off, Info and Debug (grey, orange and red dot). It is mainly used by the developer for debugging specific issues. When enabled, you will see all memory writes and other hardware events. This has limited utility for regular app users."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: "grid",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: "0 0 10px"
    }
  }, "CALCULATOR tab \u2014 iPhone"), /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/iphone-debug.png",
    alt: "iPhone screenshot showing the CALCULATOR debug tab with program listing and registers",
    style: {
      width: "auto",
      maxWidth: "60%",
      height: "auto",
      display: "block",
      borderRadius: 8,
      margin: "0 auto"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: "0 0 10px"
    }
  }, "CALCULATOR tab \u2014 iPad"), /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/ipad-13-2752x2064.png",
    alt: "iPad screenshot showing the CALCULATOR debug tab",
    style: {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: "0 0 10px"
    }
  }, "CPU tab \u2014 iPad"), /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/ipad-2752x2064-asm.png",
    alt: "iPad screenshot showing the CPU debug tab with execution trace",
    style: {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 8
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
}

/* =============================================================
   APP REFERENCE — emulator controls and screen regions.
   ============================================================= */
function ReferencePage() {
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap docs-split"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "App Reference"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Every control,", /*#__PURE__*/React.createElement("br", null), "annotated."), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "This page explains the emulator controls as they behave in the app: the calculator, the printer, the debug pane, and the settings that affect a session."), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "The calculator"), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The calculator view is the main working surface. On iPhone and on iPad in portrait, it uses the same key layout as the app screenshot; on iPad in landscape, the layout mirrors the Mac view."), /*#__PURE__*/React.createElement("p", null, "The top display area shows the current number and status indicators, the cue card area directly beneath it shows module/context notes, and the keyboard area contains the full key matrix for normal operation."), /*#__PURE__*/React.createElement("p", null, "Bottom bar on iPhone and iPad (left to right): ", /*#__PURE__*/React.createElement("strong", null, "Reset"), " (long press: a clean reset that also wipes the memory), the ", /*#__PURE__*/React.createElement("strong", null, "model picker"), " (TI-59/TI-58/TI-58C), the two ", /*#__PURE__*/React.createElement("strong", null, "Crd"), " buttons (load a card; insert a blank card to write) and ", /*#__PURE__*/React.createElement("strong", null, "Eject Card"), " \u2014 on the TI-59 only, the one with a card reader \u2014 then ", /*#__PURE__*/React.createElement("strong", null, "Preset"), " and ", /*#__PURE__*/React.createElement("strong", null, "Settings"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "On the Mac, Windows and Linux, the bar has the same buttons except Settings, which is in the app menu (Mac) or the File menu (Windows, Linux). Holding ", /*#__PURE__*/React.createElement("strong", null, "\u2318"), " (Mac) or ", /*#__PURE__*/React.createElement("strong", null, "Ctrl"), " (Windows, Linux) turns Reset into ", /*#__PURE__*/React.createElement("strong", null, "Clean"), ". On the Mac the model picker sits in the window's toolbar.")), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "The printer"), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The printer view has a ", /*#__PURE__*/React.createElement("strong", null, "PC-100C"), " button at the top (connects or disconnects the printer, and resets the calculator), a dot/text toggle, the printer's ", /*#__PURE__*/React.createElement("strong", null, "PRINT"), " and ", /*#__PURE__*/React.createElement("strong", null, "ADV"), " keys, and ", /*#__PURE__*/React.createElement("strong", null, "T"), ", its TRACE switch. Copy puts the paper strip on the clipboard as an image and as text; cut copies it and then clears the paper."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "The text view is useful when you want to read or copy output quickly. The dot view is the closer match to the physical printer.")), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "The debug pane"), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The debug pane has three tabs: ", /*#__PURE__*/React.createElement("strong", null, "CALCULATOR"), ", ", /*#__PURE__*/React.createElement("strong", null, "CPU"), ", and ", /*#__PURE__*/React.createElement("strong", null, "LOG"), "."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0 0",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "CALCULATOR"), " \u2014 Program listing (from RAM) centred on the next instruction to execute, with live registers and flags."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "CPU"), " \u2014 Execution trace of ROM instructions that already ran. State shown is ", /*#__PURE__*/React.createElement("em", null, "after"), " each instruction. Scrollable history, one-opcode step."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "LOG"), " \u2014 Dumps of the SCOM registers, memory, program and variables, the debug log level, and the TRACE toggle. Use TRACE to capture a binary session file for detailed analysis with read_trace.py.")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      marginBottom: 0
    }
  }, "The CALCULATOR and CPU tabs have different step semantics: CALCULATOR advances one program step, as SST does; CPU advances exactly one ROM opcode. See ", /*#__PURE__*/React.createElement("a", {
    href: "/59/debugger/"
  }, "Using the debugger"), ".")), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Settings"), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "Settings choose the ", /*#__PURE__*/React.createElement("strong", null, "Startup Calculator"), " (a model, or Last Used), the ", /*#__PURE__*/React.createElement("strong", null, "Solid State Module"), ", the LED ", /*#__PURE__*/React.createElement("strong", null, "Segment Style"), " (Modernized or Classic), and the trace file's ", /*#__PURE__*/React.createElement("strong", null, "Maximum File Size"), ", so long debug sessions don't grow without bound. iPhone and iPad add ", /*#__PURE__*/React.createElement("strong", null, "Keyboard Feedback"), " and ", /*#__PURE__*/React.createElement("strong", null, "Debug Page in Portrait"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Where files go: on the Mac, the trace file's ", /*#__PURE__*/React.createElement("strong", null, "Save Location"), " (local, iCloud or a folder you choose); on iPhone and iPad, traces go to the app's iCloud folder. On Windows and Linux, ", /*#__PURE__*/React.createElement("strong", null, "Files"), " sets the preset, card and trace folders.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null))), /*#__PURE__*/React.createElement("div", {
    className: "docs-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/59/assets/app-screenshot.png",
    alt: "Calc-U 59 main app screenshot with annotated interface regions and toolbar buttons",
    style: {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "10%",
      left: "48%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,.72)",
      color: "var(--accent)",
      border: "1px solid var(--accent)",
      borderRadius: 999,
      padding: "4px 8px",
      fontFamily: "var(--font-key)",
      fontSize: 11,
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Display"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "21%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,.72)",
      color: "var(--accent)",
      border: "1px solid var(--accent)",
      borderRadius: 999,
      padding: "4px 8px",
      fontFamily: "var(--font-key)",
      fontSize: 11,
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Cue card"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "36%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,.72)",
      color: "var(--accent)",
      border: "1px solid var(--accent)",
      borderRadius: 999,
      padding: "4px 8px",
      fontFamily: "var(--font-key)",
      fontSize: 11,
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Keyboard"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "2.1%",
      left: "6%",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "var(--accent)",
      color: "#21170f",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 12,
      display: "grid",
      placeItems: "center"
    }
  }, "1"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "2.1%",
      left: "17%",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "var(--accent)",
      color: "#21170f",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 12,
      display: "grid",
      placeItems: "center"
    }
  }, "2"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "2.1%",
      left: "62%",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "var(--accent)",
      color: "#21170f",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 12,
      display: "grid",
      placeItems: "center"
    }
  }, "3"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "2.1%",
      left: "70%",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "var(--accent)",
      color: "#21170f",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 12,
      display: "grid",
      placeItems: "center"
    }
  }, "4"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "2.1%",
      left: "80%",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "var(--accent)",
      color: "#21170f",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 12,
      display: "grid",
      placeItems: "center"
    }
  }, "5"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "2.1%",
      left: "89%",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "var(--accent)",
      color: "#21170f",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 12,
      display: "grid",
      placeItems: "center"
    }
  }, "6"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "6%",
      right: "8%",
      width: 22,
      height: 22,
      borderRadius: 999,
      background: "var(--accent)",
      color: "#21170f",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 12,
      display: "grid",
      placeItems: "center"
    }
  }, "7")), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: "12px 0 0",
      paddingLeft: 20,
      lineHeight: 1.65,
      color: "var(--fg-2)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Reset"), " (long press: clean reset, wipes the memory)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Model picker"), " (TI-59 / TI-58 / TI-58C)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Crd"), ": load a card (TI-59)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Crd"), ": insert a blank card to write (TI-59)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Preset")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Settings")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Swipe to printer"))))));
}

/* =============================================================
   FAQ — direct answers.
   ============================================================= */
// Also the FAQ page's structured data (.seo/build.js).
const FAQS = [{
  question: "Where do preset files live?",
  answer: "They are regular .ti59, .ti58, or .ti58c text files that can be anywhere on the file system. On Mac, Windows and Linux, Preset opens them from disk (on Windows and Linux, Settings › Files sets the folder it starts in); on iPhone and iPad, use the built-in file picker."
}, {
  question: "Are there examples of preset files?",
  answer: "Yes. The GitHub repository includes an 'examples' folder with a selection of .ti59, .ti58, and .ti58c files, and the 'TI-59 Software Collection' page has downloadable copies. There's also a step-by-step tutorial that builds one from scratch."
}, {
  question: "What are the 'assembly' examples here for?",
  answer: "This feature is still a bit experimental. You can load these examples in the ASM OVERLAY box under the debugger's CPU tab: Select File, then Run. Clear removes the overlay again."
}, {
  question: "Where do virtual magnetic cards live?",
  answer: "On Mac, iPhone and iPad they are stored in the app's iCloud storage (or the app's local folder when iCloud is off); use the Crd buttons to load or save them. On Mac, they are also in Finder under 'iCloud Drive/Calc-U-59'. On Windows and Linux they are in the Calc-U-59 folder in your home folder, unless Settings › Files names another."
}, {
  question: "Where is the TI-58C state file?",
  answer: "The TI-58C state file (ti58c.mem) is stored next to the cards: in the app's iCloud storage on Mac, iPhone and iPad, in the card folder on Windows and Linux. Unlike a preset, which you load on demand, this file is the TI-58C's persistent state — it's written and loaded automatically whenever you switch to the TI-58C model, standing in for the battery-backed static RAM the real hardware used to keep memory alive between sessions."
}, {
  question: "Can I see what the emulator is doing internally?",
  answer: "Yes. Use the debug pane: CALCULATOR for program state and registers, CPU for the ROM instruction trace, and LOG for text output plus trace controls."
}, {
  question: "How do I get a trace file?",
  answer: "Open the debug pane, switch to LOG, and turn TRACE on. The app writes a binary session file (CALCU59_TRACE.bin; CALCU58_TRACE.bin or CALCU58C_TRACE.bin for the smaller models) to the trace location: on Mac the one set in Settings (local by default), on iPhone and iPad the app's iCloud folder, on Windows and Linux the trace folder from Settings › Files. If the file can't be created or reaches its size limit, the app tells you."
}, {
  question: "What can I do with a trace file?",
  answer: "You first need the trace file on a computer. On Mac, Windows and Linux it already is. An iPad or iPhone writes it to the app's iCloud folder, so it syncs to iCloud Drive; retrieve it from there on your computer. Download the 'read_trace.py' script from GitHub to convert the binary file to a readable format. The script is available in the 'tools' directory of the GitHub repository."
}, {
  question: "Why does switching to the CPU tab reset the heat map?",
  answer: "The CPU tab only traces while it is visible. When you switch to it, the heat map resets because any activity since you last left would be missing anyway. Exception: if the CPU is already frozen when you switch, the heat map is left intact — there is nothing new to miss."
}, {
  question: "What does FREEZE ON START do in the CPU tab?",
  answer: "In the CPU tab, FREEZE ON START (F.START when the panel is narrow) arms a scan-loop exit trigger: it freezes the moment the calculator leaves the keyboard idle loop — either because you pressed a key (the ROM exits the loop to handle the keystroke) or because the calculator was reset. This lets you catch the very first ROM opcode of a key-press handler without having to time a manual FREEZE. Only one FREEZE ON START can be armed at a time; arming one tab silently disarms the other."
}, {
  question: "How can I step through the reset routine?",
  answer: "Switch to the CPU tab and press FREEZE ON START. Then go to the calculator and press Reset — the CPU will freeze at the first ROM instruction of the reset routine. Use STEP to walk through it one opcode at a time."
}, {
  question: "I used FREEZE ON START in the CPU tab, the freeze triggered on a keypress — but after RESUME the key seems lost. Why?",
  answer: "This is expected. The ROM's key-debouncing logic registers a keypress only for a very short window. When the freeze fires, the CPU freezes at the first instruction after the scan loop exits — but that window has already passed by the time you press RESUME or STEP. The key handler never sees the keypress and the calculator returns to idle. Use a TRACE capture instead: it records the full keystroke sequence without stopping the emulator, so the debounce window is never interrupted."
}, {
  question: "Is there a faster way to read long printer output?",
  answer: "Yes. Copy or cut the output, and paste it into a text editor."
}, {
  question: "How do I create the cards that label the A-E and A'-E' keys?",
  answer: /*#__PURE__*/React.createElement(React.Fragment, null, "Add a ", /*#__PURE__*/React.createElement("strong", null, "CUECARD:"), " section to a preset: set", " ", /*#__PURE__*/React.createElement("strong", null, "Template"), " to ", /*#__PURE__*/React.createElement("code", null, "MagnetCard"), " or", " ", /*#__PURE__*/React.createElement("code", null, "CueCard"), ", then fill in fields ", /*#__PURE__*/React.createElement("strong", null, "A"), " ", "through ", /*#__PURE__*/React.createElement("strong", null, "E"), " and ", /*#__PURE__*/React.createElement("strong", null, "A\u2032"), " through", " ", /*#__PURE__*/React.createElement("strong", null, "E\u2032"), " for the two key rows. Load that file (or write it onto a virtual magnetic card to keep the label with the card) and it appears on screen. See", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/presets/#labeling-keys",
    className: "link-accent"
  }, "Loading a preset \u2192 Labeling the A\u2013E and A\u2032\u2013E\u2032 keys"), " ", "for the format, the math shortcuts, and the loading options.")
}, {
  question: "I wrote a preset file myself, but the app shows it grayed out and won't load it. Why?",
  answer: /*#__PURE__*/React.createElement(React.Fragment, null, "Almost always a hidden ", /*#__PURE__*/React.createElement("strong", null, ".txt"), " extension. Some text editors, and Finder/Explorer with extensions hidden, save", " ", /*#__PURE__*/React.createElement("code", null, "my-preset.ti59"), " as ", /*#__PURE__*/React.createElement("code", null, "my-preset.ti59.txt"), " ", "without showing it \u2014 the file looks right in the file browser, but the preset picker only accepts ", /*#__PURE__*/React.createElement("code", null, ".ti59"), ", ", /*#__PURE__*/React.createElement("code", null, ".ti58"), " ", "and ", /*#__PURE__*/React.createElement("code", null, ".ti58c"), ", so it's shown grayed out and can't be selected. Turn on \"Show file extensions\" (Explorer) or \"Show all filename extensions\" (Finder), or rename the file from a terminal, and it should load normally. See", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/presets/tutorial/#txt-extension",
    className: "link-accent"
  }, "the preset tutorial"), " ", "for more on avoiding this.")
}];
function FaqPage() {
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Help"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "FAQ"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Concise answers to the questions that usually come up first."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 24
    }
  }, FAQS.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "panel",
    style: {
      padding: "16px 20px",
      display: "grid",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      fontSize: 16,
      textTransform: "uppercase",
      letterSpacing: ".05em",
      color: "var(--fg)"
    }
  }, item.question), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      lineHeight: 1.7,
      color: "var(--fg-2)"
    }
  }, item.answer)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
}
function ModulesPage() {
  const modules = [{
    code: "ML",
    name: "Master Library"
  }, {
    code: "ST",
    name: "Applied Statistics"
  }, {
    code: "RE",
    name: "Investment"
  }, {
    code: "SY",
    name: "Surveying"
  }, {
    code: "NG",
    name: "Marine Navigation"
  }, {
    code: "AV",
    name: "Aviation"
  }, {
    code: "LE",
    name: "Leisure Library"
  }, {
    code: "SA",
    name: "Securities Analysis"
  }, {
    code: "BD",
    name: "Business Decisions"
  }, {
    code: "MU",
    name: "Math/Utilities"
  }, {
    code: "EE",
    name: "EE Library"
  }, {
    code: "SE",
    name: "Structural Engineering"
  }, {
    code: "AG",
    name: "Agriculture"
  }, {
    code: "RP",
    name: "RPN Simulator"
  }];
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Modules"), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Library modules"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "The module picker changes the Solid State Software library loaded into the emulator. That affects the cue card, the available programs, and the labels shown on screen."), /*#__PURE__*/React.createElement("div", {
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
  }, "Keep the selected module aligned with the file you are loading. If a preset includes a ", /*#__PURE__*/React.createElement("strong", null, "SOLID-STATE-MODULE:"), " line, the emulator can switch to that module automatically."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "If the cue card or program list looks unexpected, the module selection is the first thing to check.")), /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      marginTop: 24
    }
  }, modules.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.code,
    className: "panel",
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(180deg,#1a0c08,#2c1812)",
      color: "var(--accent)",
      fontFamily: "var(--font-key)",
      fontWeight: 700,
      padding: "8px 12px",
      borderRadius: 4,
      letterSpacing: ".05em",
      fontSize: 13,
      minWidth: 70,
      textAlign: "center",
      border: "1px solid var(--stroke-warm)"
    }
  }, m.code), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "sub",
    style: {
      margin: 0
    }
  }, m.name))))), /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, "Per-module details"), /*#__PURE__*/React.createElement("div", {
    className: "panel",
    style: {
      padding: 20,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "Each module has its own cue card content and program selection. The app loads the matching ROM/library data together with the module metadata so the on-screen card stays in sync with the selected library."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "This is an emulator feature, not a historical TI-59 walkthrough: the purpose is to make the active module understandable while you use the app.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)));
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
  const categories = [{
    heading: "The calendar printer competition, 1978–1981",
    intro: "“52-Notes,” the TI programmable-calculator newsletter, ran a competition from 1978 to write the fastest TI-59 program that prints a full year calendar on the PC-100 printer, using the Master Library module's date routines. Each entry improved on the last; the 1981 winner is here too, with a new entry from 2026. PC-100/PC-100C printer required.",
    items: [{
      file: "calendar-01-Weinberger.ti59",
      title: "Calendar Printer — Jared Weinberger",
      description: "The opening entry in the competition (52-Notes V3N5).",
      printer: true
    }, {
      file: "calendar-02-cargile.ti59",
      title: "Calendar Printer — Lou Cargile",
      description: "A second V3N5 entry, Lou Cargile's first attempt at the calendar problem.",
      printer: true
    }, {
      file: "calendar-03-vanderburgh.ti59",
      title: "Calendar Printer — Richard Vanderburgh",
      description: "A third V3N5 entry, checking for the ML module and warning the user if it's missing.",
      printer: true
    }, {
      file: "calendar-04-skillman.ti59",
      title: "Calendar Printer — Bill Skillman",
      description: "V3N6: a faster print-buffer packing approach, down to about 7½ minutes per year.",
      printer: true
    }, {
      file: "calendar-05-vanderburgh.ti59",
      title: "Calendar Printer — Richard Vanderburgh (revised)",
      description: "V3N6: Vanderburgh folds in Panos Galidas' doubled print-code method and further tightens it, to about 5½ minutes per year.",
      printer: true
    }, {
      file: "calendar-06-cargile.ti59",
      title: "Calendar Printer — Lou Cargile (bugfix)",
      description: "V3N7: a correction to an earlier entry — a missing CLR' meant the 1st of a month could fail to print if it fell on a Thursday.",
      printer: true
    }, {
      file: "calendar-07-calidas.ti59",
      title: "Calendar Printer — Panos Galidas",
      description: "V3N9: the fastest of the 1978 entries, averaging 2 minutes 38.6 seconds per year over a five-year test span.",
      printer: true
    }, {
      file: "calendar-08-acosta.ti59",
      title: "Calendar Printer — Patrick Acosta",
      description: "TI PPC Notes V9N2: the 1981 program that ended the race, using Fast Mode to print the worst-case year 2000 in 1 minute 23 seconds.",
      printer: true
    }, {
      file: "calendar-09-dispatch.ti59",
      title: "Calendar Printer — fast mode with dispatched fix-ups (2026)",
      description: "A new entry, written with the Calc-U 59 tools: Acosta's output format, about 4% faster.",
      printer: true
    }]
  }, {
    heading: "PC-100 printer graphics and tricks",
    intro: "The PC-100/PC-100C thermal printer had an undocumented quirk: interrupting it mid-character exposes partial print heads, which the TI PPC user community turned into a small genre of printer-graphics demos through the early 1980s.",
    items: [{
      file: "characters.ti59",
      title: "Print character table",
      description: "Prints the full TI-59 print-code table with row and column headers."
    }, {
      file: "characters-fastmode.ti59",
      title: "Print characters in Fast Mode",
      description: "K-J Meusch's version of the character table, using Fast Mode to print far faster than normal execution (TI PPC Notes V5N9-10, 1980).",
      printer: true
    }, {
      file: "fast-grafik-3d-plot-part1.ti59",
      title: "Fast-Grafik 3-D Plot — Part 1",
      description: "Peter Poloczek's 3-D surface plotter for the PC-100, built on the printer-interrupt trick (TI PPC Notes V8N2, 1983). Load Part 2 after this one finishes, without resetting.",
      printer: true
    }, {
      file: "fast-grafik-3d-plot-part2.ti59",
      title: "Fast-Grafik 3-D Plot — Part 2",
      description: "The second half of Poloczek's 3-D plotter. Requires Part 1 to have already run in the same session.",
      printer: true
    }, {
      file: "printer-quirks.ti59",
      title: "Printer interrupt character table",
      description: "Dave Leising's print-code table showing each character both normally and interrupted mid-print (PPX Exchange, March/April 1982).",
      printer: true
    }, {
      file: "printer-interrupt.ti59",
      title: "The printer interrupt, smallest form",
      description: "Prints “A0” twice, once normally and once cut off after two of its seven dot rows — the trick the printer-graphics programs here are built on, in a few steps.",
      printer: true
    }, {
      file: "stars-and-stripes.ti59",
      title: "Stars & Stripes",
      description: "Richard Snow's demonstration of PC-100 graphics capability, drawing a flag using the printer-interrupt technique (TI PPC Notes V6N4-5, 1981).",
      printer: true
    }, {
      file: "texas-print.ti59",
      title: "“TI” logo — high-resolution printer graphics",
      description: "Frank Dever's high-resolution “TI” logo (PPX Exchange, March/April 1982). The program corrupts a program-step keycode on purpose to redirect the ROM's dispatcher mid-instruction — the file's header traces exactly which ROM address that lands on.",
      printer: true
    }, {
      file: "trace-quirk.ti59",
      title: "Printer trace-mode quirk",
      description: "A keystroke sequence, found by a TI PPC club member, that puts a TI-58 or TI-59 into an undocumented trace mode once a printer is attached (TI PPC Notes V6N4-5, 1981).",
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
      file: "ram_test_full_fast.ti59",
      title: "Full RAM test (Fast Mode)",
      description: "George Thomson's test of all 100 data registers using indirect addressing and the STF fast-mode trick, printing any mismatch on the PC-100A/PC-100C (TI PPC Notes V9N5, 1985).",
      printer: true
    }, {
      file: "repartition.ti58c",
      title: "TI-58C repartitioning reference",
      description: "Keystroke notes on how the TI-58C's constant-memory feature stores the partition setting, and how to reach the extra 32 steps (480–511) that are otherwise keyboard-only (TI PPC Notes V5N7, 1980)."
    }]
  }, {
    heading: "Fast Mode, keycodes and firmware curiosities",
    intro: "Fast Mode is an undocumented TI-58/TI-58C/TI-59 execution mode, discovered and written up by the TI PPC club over several years — these programs demonstrate it, along with a couple of other undocumented corners of the ROM.",
    items: [{
      file: "fastmode.ti59",
      title: "Fast Mode factorial demo (TI-59)",
      description: "Computes factorials in both normal and Fast Mode so the roughly 70% speed difference is directly comparable — 10! in about 4.6 seconds, 69! in about 31."
    }, {
      file: "fastmode.ti58",
      title: "Fast Mode factorial demo (TI-58)",
      description: "The same Fast Mode factorial comparison, for the TI-58/TI-58C."
    }, {
      file: "fastmode-sst.ti59",
      title: "The shortest way into Fast Mode",
      description: "A new, shorter Fast Mode entry, found by tracing the ROM in 2026; computes 69! like the factorial demo. Loading the file runs the entry sequence automatically."
    }, {
      file: "FastMode_Zero4.ti59",
      title: "Fast Mode zero-padding bug",
      description: "A mistyped Fast Mode program — one leading zero short of the documented five — that puts a real TI-59 into an unusual, reproducible misbehaving state. Kept as a regression case; it also uncovered a display-refresh bug in the emulator, fixed before v1.0.0."
    }, {
      file: "firmware.ti59",
      title: "Firmware listing keystroke sequence",
      description: "An unusual keyboard sequence, originally described by TI PPC Notes editor Maurice Swinnen, that puts the TI-59 into a mode where the ROM firmware itself can be listed."
    }, {
      file: "keycodes.ti59",
      title: "Print all keycodes",
      description: "Jared Weinberger's routine for generating and printing every TI-59 key code, using dynamic program-code modification (TI PPC Notes V5N4-5, 1980)."
    }]
  }, {
    heading: "Utilities",
    intro: "Small, self-contained programs that aren't tied to a particular magazine series.",
    items: [{
      file: "Integer-Base-Conversion.ti59",
      title: "Integer base conversion",
      description: "Converts an integer between arbitrary number bases — hex to binary to decimal and back — originally published in Computer Design magazine, 1980."
    }, {
      file: "Frequency-Transformation.ti59",
      title: "Frequency transformation",
      description: "A filter-design program that transforms a normalized low-pass filter's cutoff frequencies, from the Artech House discrete-time filter design tables."
    }, {
      file: "sum.ti59",
      title: "Sum of N numbers",
      description: "A deliberately simple program — sums N down to 1 — useful as a stopwatch for comparing execution speed across devices running the emulator."
    }]
  }, {
    heading: "CPU-level assembly examples",
    intro: "These target the TMC0501 CPU inside the calculator directly, as raw opcodes rather than a keystroke program, loaded through the ASM Overlay in the app's debug panel. They only run in the full app (Mac, Windows, Linux, iPhone, iPad), not the browser emulator below.",
    items: [{
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
      description: "A real-hardware timing edge case — a phase-shifted WAIT before SET IDLE exposes all 16 hex segment patterns on real silicon. Documented here for the CPU-emulation detail, but it does not reproduce on Calc-U 59: the emulator latches each display position at its own digit strobe, so CPU and display are always in phase and the timing quirk this program depends on has nothing to act on."
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
    href: "/59/presets/"
  }, "preset file"), " \u2014 the calculator's program, registers and (where the original used one) magnetic-card cue card, ready to load. Programs marked ", /*#__PURE__*/React.createElement("strong", null, "Requires printer"), " ", "need the emulated PC-100/PC-100C \u2014 available in the full app, not the browser emulator below."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: 0
    }
  }, "Get Calc-U 59 for ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/mac/"
  }, "Mac"), ",", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/windows-linux/"
  }, "Windows and Linux"), " or", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/iphone-ipad/"
  }, "iPhone and iPad"), ", then open a downloaded file, or try the", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/play/"
  }, "browser emulator"), " first \u2014 it has no printer, but the utilities below that don't need one will run.")), categories.map(cat => /*#__PURE__*/React.createElement(React.Fragment, {
    key: cat.heading
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section"
  }, cat.heading), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      lineHeight: 1.7,
      marginTop: -8
    }
  }, cat.intro), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, cat.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.file,
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
  }, "Download ", it.file.replace(/^assembly\//, ""))), /*#__PURE__*/React.createElement("p", {
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
    href: "https://github.com/tinue/Calc-U-59/tree/main/examples"
  }, "examples/ directory"), " of the Calc-U 59 repository \u2014 its name predates this collection outgrowing \"examples\" \u2014 together with a few internal debugging and screenshot-test files not listed here. The", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/presets/"
  }, "preset file format"), " is documented if you want to write your own \u2014 the", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/presets/tutorial/"
  }, "tutorial"), " walks through building one from scratch \u2014 and the debugger's ASM Overlay is documented for the assembly examples above."), /*#__PURE__*/React.createElement("p", {
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
  return /*#__PURE__*/React.createElement("main", {
    className: "wrap-narrow"
  }, /*#__PURE__*/React.createElement("div", {
    ref: holderRef,
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(PlayCalculator, {
    scale: scale,
    keyboard: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn secondary",
    href: "/59/app/"
  }, "Open as a standalone app ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, "\u2192"))), /*#__PURE__*/React.createElement("h1", {
    className: "page-title",
    style: {
      marginTop: 32
    }
  }, "TI-59 emulator, online"), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("p", null, "The calculator above is a working ", /*#__PURE__*/React.createElement("strong", null, "Texas Instruments TI-59 emulator running in your browser"), " \u2014 no install, no account, nothing to download. It is the Calc-U 59 app's own emulator \u2014 the same code the Mac, Windows and Linux apps run \u2014 compiled to WebAssembly, executing the original TI-59 ROM. The debugger and the printer are not part of this build; everything else works."), /*#__PURE__*/React.createElement("p", null, "Module 01 (Master Library) is loaded by default. Switch modules (that resets the calculator, as swapping the real module did), load one of the curated presets, or upload your own ", /*#__PURE__*/React.createElement("strong", null, ".ti59"), " file below the keyboard \u2014 uploads are read entirely in your browser and never leave your machine. For more programs to try, including several that need the full app's PC-100 printer, see the", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/software/"
  }, "TI-59 Software Collection"), "."), /*#__PURE__*/React.createElement("p", null, "Press ", /*#__PURE__*/React.createElement("strong", null, "2nd"), " then ", /*#__PURE__*/React.createElement("strong", null, "Pgm"), " then a two-digit program number to bring up that program's cue card, the same way it works on the module itself."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Queue Card"), " passes a virtual magnetic card through the reader. To save a program, press ", /*#__PURE__*/React.createElement("strong", null, "2nd Write"), " (bank 1: ", /*#__PURE__*/React.createElement("strong", null, "1 2nd Write"), "), then Queue Card. To load it back, press Queue Card while the calculator is idle and it reads the card. The card starts blank and keeps whatever was last written until you leave the page."), /*#__PURE__*/React.createElement("p", null, "For the TI-58 and TI-58C models, the PC-100C printer, card files you keep and the CPU debugger, use the full app: free on the ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/mac/"
  }, "Mac"), " and on", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/windows-linux/"
  }, "Windows and Linux"), ", or", " ", /*#__PURE__*/React.createElement("a", {
    href: "/59/install/iphone-ipad/"
  }, "on the App Store"), " for iPhone and iPad. If you are not sure what any of this is, ", /*#__PURE__*/React.createElement("a", {
    href: "/59/what-is-a-ti-59/"
  }, "start here"), "."), /*#__PURE__*/React.createElement("p", null, "Prefer this without the browser chrome? ", /*#__PURE__*/React.createElement("a", {
    href: "/59/app/"
  }, "Open the standalone app"), " \u2014 the same calculator alone at its own address, installable to your phone's home screen for a one-tap, full-screen launch.")), /*#__PURE__*/React.createElement("h2", {
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
  }, /*#__PURE__*/React.createElement(BackButton, null)));
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
  FAQS
});