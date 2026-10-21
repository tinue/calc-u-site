#!/usr/bin/env node
// Renders every articles/*.md to a standalone HTML page (pandoc, GitHub
// Markdown, the same front end md2pdf uses) and to a PDF (md2pdf). Both
// outputs are committed: the CI build has neither tool. Run after editing an
// article:  node .seo/articles.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const DIR = path.join(__dirname, "..", "articles");

for (const md of fs.readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const name = md.replace(/\.md$/, "");
  const text = fs.readFileSync(path.join(DIR, md), "utf8");
  const title = text.match(/^# (.+)$/m)[1];
  // The description is the first paragraph, cut at a word near 160 chars.
  const para = text.split(/\n\s*\n/).find((b) => !/^\s*(#|[-*|]|```|\d+\.)/.test(b))
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[`*]/g, "").replace(/\s+/g, " ").trim();
  const description = para.length <= 160 ? para : para.slice(0, para.lastIndexOf(" ", 157)) + "…";

  execFileSync("pandoc", [
    md, "-f", "gfm", "-t", "html5", "-s", "--wrap=none",
    `--template=${path.join(__dirname, "article-template.html")}`,
    "-M", `pagetitle=${title}`, "-M", `description=${description}`, "-M", `name=${name}`,
    "-o", `${name}.html`,
  ], { cwd: DIR, stdio: "inherit" });
  execFileSync("md2pdf", [md, `${name}.pdf`], { cwd: DIR, stdio: "inherit" });
  console.log(`articles: ${name}.html, ${name}.pdf`);
}
