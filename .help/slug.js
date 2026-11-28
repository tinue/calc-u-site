// Heading anchors by GitHub's rule for Markdown headings, as
// docs/formats/help.md §1.5 of tinue/Calc-U specifies them and
// library/help/anchor_cases.txt there tests them (a copy is in tests/):
//
//   the visible text (link and picture marks reduced to their text, HTML
//   tags, backticks and emphasis marks removed), lower-cased, every
//   character that is not a letter, digit, space, "-" or "_" removed, each
//   space turned into "-"; a repeat within one file gets "-1", "-2", …,
//   checked against every anchor already used in that file.

// The visible text of a heading's inline tokens (markdown-it).
function inlineText(children) {
  let s = "";
  for (const t of children || []) {
    if (t.type === "text" || t.type === "code_inline") s += t.content;
    else if (t.type === "image") s += inlineText(t.children);
    else if (t.type === "softbreak" || t.type === "hardbreak") s += " ";
    else if (t.type === "html_inline") { /* tags are removed */ }
    else if (t.type === "text_special") s += t.content;
    else if (t.type === "entity") s += t.content;
  }
  return s;
}

function baseSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M} _-]/gu, "")
    .replace(/ /g, "-");
}

// One per file: hands out unique anchors in document order.
function slugger() {
  const used = new Set();
  return function slug(text) {
    const base = baseSlug(text);
    let s = base;
    for (let n = 1; used.has(s); n++) s = `${base}-${n}`;
    used.add(s);
    return s;
  };
}

module.exports = { inlineText, baseSlug, slugger };
