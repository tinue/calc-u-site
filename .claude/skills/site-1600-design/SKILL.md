---
name: site-1600-design
description: Use when designing or restyling anything for the Calc-U-1600 website (1600/) — pages, components, the help page frame, diagrams, mockups — so it matches the PC-1600 design: brushed aluminium, the display band, SHIFT orange, the green LCD.
user-invocable: true
---

# Calc-U-1600 design

The design is the canvas "Calc-U-1600 Hilfeseite – Design-Vorschau"
(https://claude.ai/artifact/Xut3yBpuUFWXvQozuVYuws: the home page, a help
chapter, the tokens). Production code is `1600/site.css`; its `:root`
tokens are the canvas's. The structure, type and breakpoints follow the 59
site; the palette and the ground are sampled from the PC-1600 faceplate
the emulator draws.

## The look

| Part | Value |
|---|---|
| Ground | brushed aluminium `--alu` `#bcc1c6` with a faint line texture; panels and tables `--alu-hi` `#dcdfe2` |
| Header, footer, table heads | the display band `--band` `#443a31`, ink `#ecebe7`, a bezel-grey edge `#7f848a` |
| Accent | SHIFT orange `--accent` `#d4683a`: the primary button, the open chapter's keycap, the current item |
| Small text accent | legend red `--legend` `#8f2a22`: eyebrows, the title's `<em>` |
| Links | `#7a2418`, always underlined (colour alone does not separate them on aluminium) |
| Code and the LCD | fenced code is the `.lcd` box: green glass `#a6b19e`, ink `#202818`, grey bezel; inline `code` a light green chip |
| Type | Archivo (body 16/1.55, headings 700 uppercase with tracking), Barlow Condensed 700 for keycaps, IBM Plex Mono for code; all in `1600/fonts/` |
| Keycaps | `.k` in the faceplate's colours: `blk` (letter keys), `gry` (number block), `org` (SHIFT); the only icon system |
| Buttons | `.btn.primary` orange, `.btn.dark` black, `.btn.grey` grey: the three key colours |
| Radii | 6 / 7 / 10 px |

Contrast holds at 4.5:1 or better on every ground (the canvas lists the
ratios); keep new colours to the tokens.

## Writing for it

- Reuse the classes of `site.css` (`panel`, `lcd`, `tbl-box`, `grid-2`,
  `grid-3`, `eyebrow`, `title`, `lede`, `h2`, `h3`) over new ones.
- Diagrams are the help's Mermaid blocks, coloured in `.site/build.js`
  (`diagrams`): panel boxes, the band for decisions, grey lines.
- Plain text, no emoji, no icon library, no gradients beyond the key and
  band shading the canvas has. Touch targets 44 px.
- Fonts and pictures are served from the folder: a mockup may load Google
  Fonts, the site never does.
- Every page works at phone width: tables scroll in their box, the
  chapter rail moves below the article.
