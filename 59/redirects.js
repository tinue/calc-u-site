// Calc-U 59 — the addresses of the old hand-written help pages (2.3.0 and
// before), and where their content is in the help built from the asset.
//
// .seo/build.js writes a small redirect page at each old address
// (.help/redirects.js); tests/tests/redirects.spec.js walks the whole table.
// Site paths, without the /59 prefix. A help address is the one
// .help/render.js gives the chapter's file; check.js fails when one leads
// nowhere.
module.exports = {
  REDIRECTS: {
    "/what-is-a-ti-59/":                     "/help/01-introduction/",
    "/getting-started/":                     "/help/02-getting-started/getting-started/",
    "/install/iphone-ipad/":                 "/help/02-getting-started/installing/#iphone-and-ipad",
    "/install/mac/":                         "/help/02-getting-started/installing/#mac-windows-and-linux",
    "/install/windows-linux/":               "/help/02-getting-started/installing/#mac-windows-and-linux",
    "/install/android/":                     "/help/02-getting-started/installing/#android",
    "/getting-started/install-iphone-ipad/": "/help/02-getting-started/installing/#iphone-and-ipad",
    "/getting-started/install-mac/":         "/help/02-getting-started/installing/#mac-windows-and-linux",
    "/getting-started/printer/":             "/help/05-peripherals-and-paper/printer/",
    "/presets/":                             "/help/06-presets/presets/",
    "/state-files/":                         "/help/06-presets/presets/",
    "/getting-started/presets/":             "/help/06-presets/presets/",
    "/getting-started/state-files/":         "/help/06-presets/presets/",
    "/presets/tutorial/":                    "/help/06-presets/preset-tutorial/",
    "/debugger/":                            "/help/07-debugger/debugger/",
    "/getting-started/debugger/":            "/help/07-debugger/debugger/",
    // The old App Reference described the controls first; they are in the
    // product part of chapter 2, its other parts in chapters 5, 7 and 8.
    "/reference/":                           "/help/02-getting-started/getting-started/",
    "/modules/":                             "/help/09-product-topics/modules/",
    "/faq/":                                 "/help/09-product-topics/faq/",
  },
};
