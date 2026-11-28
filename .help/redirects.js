// Redirect pages for the addresses a site folder no longer has.
//
// GitHub Pages serves files only, so an old address keeps working as a
// small page of its own: a meta refresh (works without JavaScript), a
// script that keeps the #hash the visitor came with, a canonical link to
// the new address and noindex, so search engines move to it, and a
// visible link for anyone whose browser follows neither.

const fs = require("fs");
const path = require("path");
const { esc, ORIGIN } = require("./render.js");

function redirectPage(to, title) {
  const abs = ORIGIN + to;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>${esc(title)}</title>
<link rel="canonical" href="${esc(abs)}">
<meta http-equiv="refresh" content="0; url=${esc(to)}">
<script>location.replace(${JSON.stringify(to)} + (${JSON.stringify(to)}.indexOf("#") < 0 ? location.hash : ""));</script>
</head>
<body>
<p>This page has moved to <a href="${esc(to)}">${esc(abs)}</a>.</p>
</body>
</html>
`;
}

// table: { "/old/": "/59/new/#anchor" } (addresses); siteDir: the folder.
function writeRedirects({ folder, siteDir, table, title }) {
  for (const [from, to] of Object.entries(table)) {
    if (!from.startsWith(`/${folder}/`) || !from.endsWith("/")) throw new Error(`redirect from ${from}: not a folder address under /${folder}/`);
    const file = path.join(siteDir, from.slice(folder.length + 2), "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, redirectPage(to, title));
  }
}

module.exports = { writeRedirects, redirectPage };
