// Reads a zip file into memory: Map { name → Buffer }, in the zip's order.
//
// The help assets are plain zips (stored or deflated entries, no zip64, no
// encryption; docs/formats/help.md §4 of tinue/Calc-U), so a reader on
// node's zlib is enough and the renderer needs no unzip tool.

const zlib = require("zlib");

function readZip(buf) {
  // End of central directory: signature 0x06054b50, within the last 64 KiB.
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 0xffff); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("not a zip file (no end of central directory)");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);

  const entries = new Map();
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("zip: bad central directory entry");
    const method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20);
    const usize = buf.readUInt32LE(p + 24);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    p += 46 + nameLen + extraLen + commentLen;
    if (name.endsWith("/")) continue;

    if (buf.readUInt32LE(local) !== 0x04034b50) throw new Error(`zip: bad local header for ${name}`);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(start, start + csize);
    let data;
    if (method === 0) data = Buffer.from(raw);
    else if (method === 8) data = zlib.inflateRawSync(raw);
    else throw new Error(`zip: ${name} uses compression method ${method}`);
    if (data.length !== usize) throw new Error(`zip: ${name} has ${data.length} bytes, expected ${usize}`);
    entries.set(name, data);
  }
  return entries;
}

module.exports = { readZip };
