# The renderer's tests

`npm test` (in `.help/`) runs `render.test.js`:

- `anchor_cases.txt` — a copy of `library/help/anchor_cases.txt` of
  tinue/Calc-U, the headings and the anchors GitHub's rule gives them.
  Copy it again when the source repository adds cases.
- `Demo-Product-help.zip` — the test asset: the help tool's fixture tree
  built into a help asset. It was made in the source repository at commit
  5734a998 with

  ```bash
  python3 tools/help build demo --root tools/helptool/tests/fixtures/good --out <dir>
  ```

  Build it again the same way when the asset format changes. The tests make
  broken copies of it (a missing file, a link that leads nowhere, an
  unrewritten link, raw HTML) in memory.
