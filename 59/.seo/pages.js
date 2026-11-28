// Per-page <head> content for the static build, keyed by the route path
// in ../routes.js. Build-time only — never shipped to the browser. The help
// pages take theirs from the help asset (.help/render.js).
//
// Rules of thumb used here:
//   title       ≤ 60 chars where possible, most distinctive words first,
//               brand last. Every title carries a model name, because
//               "TI-59" / "TI-58C" is what people actually type.
//   description 140–160 chars, written as a sentence a human would read
//               in a result list, not a keyword list.

const PAGES = {
  "/": {
    title: "Calc-U 59 — TI-59, TI-58 and TI-58C Emulator for Mac, PC, iPhone and iPad",
    description:
      "A TI-59, TI-58 and TI-58C emulator that runs the original Texas Instruments ROM: all 14 library modules, magnetic cards, PC-100C printer and a CPU debugger.",
    heading: "Calc-U 59 — TI-59 emulator",
  },

  "/play/": {
    title: "Online TI-59 Emulator — run a TI-59 in your browser",
    description:
      "Run a Texas Instruments TI-59, TI-58 or TI-58C in your browser: the app's real emulator in WebAssembly, with all 14 modules, the PC-100C printer and cards. No install.",
    heading: "TI-59 emulator, online",
  },

  "/software/": {
    title: "TI-59 Software Collection — Calendar Printer, RAM Test, Fast Mode",
    description:
      "A TI-59, TI-58 and TI-58C software collection: the 1978 calendar printer competition, PC-100 printer graphics tricks, RAM and diagnostic self-tests, and Fast Mode demos.",
    heading: "TI-59 Software Collection",
  },
};

// Routes with a canonical in routes.js take the metadata of the page it
// names. FALLBACK is for a route added without an entry here.
const FALLBACK = {
  title: "Calc-U 59 — TI-59, TI-58 and TI-58C Emulator",
  description:
    "Calc-U 59 is a TI-59, TI-58 and TI-58C emulator for Mac, Windows, Linux, iPhone and iPad that runs the original Texas Instruments ROM.",
  heading: "Calc-U 59",
};

module.exports = { PAGES, FALLBACK };
