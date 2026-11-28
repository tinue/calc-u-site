# Assembly Examples

All assembly examples in this directory are derived from the PDF:

**Calculators TI–58/59 HW programming guide**  
Written by Hynek Sladský

## File Format

Each example is an ASM overlay file in the ASM overlay format, version 2.0,
the only version Calc-U-59 reads. The help's reference chapter describes the format
from Calc-U-59 3.0 on; until then this section does.

```
Calc-U-59 ASM 2.0
PROGRAM:
; human-readable assembly listing with comments
1800:   01D8    MOV     A.ALL,#0
        ...

HEX:
01D8 01DB ...   ; a comment after a semicolon
```

- The first line is exactly `Calc-U-59 ASM 2.0`. A file without it, or with
  another version, cannot be read: Calc-U-59 refuses it and says so.
- Everything up to the line `HEX:` (any case, alone on its line) is for the
  reader and is not read: here the annotated assembly listing.
- After `HEX:`, a `;` starts a comment that runs to the end of its line.
  What remains is runs of hexadecimal digits (either case, each optionally
  after `0x`) parted by spaces and line ends. A run of four digits is one
  instruction; a run of eight, twelve and so on is that many, four digits
  each.
- An instruction is a value from `0000` to `1FFF`. The first goes to the
  address `1800`, each further one to the next address; at most 2048 fit
  (`1800` to `1FFF`).
- Lines end with LF or CRLF.

A file is refused, with a notice that says why, when its first line is
not that one, has no `HEX:` line, has no instructions after it, has a run that is
not a multiple of four digits long, an instruction above `1FFF`, anything
after `HEX:` that is neither hexadecimal digits nor a comment, or more than
2048 instructions. The instructions loaded before stay.

## How to Run

1. Open the emulator and show the **Debug** panel.
2. Select the **CPU** tab.
3. In the **ASM Overlay** section at the bottom, click **Select File** and pick a `.asm` file
   (or drop the file on the calculator, or open it with `calcu`'s `open <file>` or
   `c59 asm load <file>`).
4. Click **Run** to execute the program (`c59 asm run`). Run enters the overlay at `1800`
   with the processor's COND flag set; `DPT.asm` needs it.

The loaded code runs in the calculator's ROM overlay area (`0x1800–0x1FFF`) and updates the
display in real time. While it runs, the CALCULATOR tab cannot be chosen; FREEZE, STEP and
RESUME of the CPU tab work on its instructions. A Reset ends its run and keeps it loaded (Run
enters it again); a Cold boot, a preset or a model switch removes it. The overlay works the
same in the Mac/iOS, Windows/Linux and Web apps; `docs/developer/Debug-API.md` § "ASM Overlay"
describes it.
