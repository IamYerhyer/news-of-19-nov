// The Daily Ledger — Thursday 19 November 2026.
// Entry for make.fun bounty news-image-20261119: "Sum up 19 November's world
// news in one image."
//
// The artwork (entry.png, rendered from image-source.html) is a one-page
// broadsheet front page covering six verified stories of Thursday
// 19 November 2026: the GTA VI launch, the first Trump–Xi–Putin trilateral,
// Anthropic's record IPO debut, Cyclone Akvan, the Prince and Princess of
// Wales wrapping their India tour, and the ICJ's Rohingya genocide ruling.
// This program validates the bundled image against the bounty rules and
// publishes it to the required output path.

import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576; // 1 MiB
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

type ImageInfo = { format: "png" | "jpeg"; width: number; height: number };

function detectFormat(bytes: Buffer): "png" | "jpeg" {
  const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (pngMagic.every((b, i) => bytes[i] === b)) return "png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  throw new Error("entry.png is neither PNG nor JPEG (bad magic bytes)");
}

function pngSize(bytes: Buffer): { width: number; height: number } {
  // IHDR: length(4) at byte 8, "IHDR" at 12, width(4) at 16, height(4) at 20.
  if (bytes.toString("ascii", 12, 16) !== "IHDR") throw new Error("PNG missing IHDR");
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function jpegSize(bytes: Buffer): { width: number; height: number } {
  let offset = 2;
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) throw new Error("JPEG segment out of sync");
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    // SOF0/SOF1/SOF2 carry the frame dimensions.
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error("JPEG has no SOF segment");
}

function inspect(bytes: Buffer): ImageInfo {
  const format = detectFormat(bytes);
  const { width, height } = format === "png" ? pngSize(bytes) : jpegSize(bytes);
  return { format, width, height };
}

function main(): void {
  if (!existsSync(sourcePath)) throw new Error(`missing bundled image: ${sourcePath}`);
  const bytes = readFileSync(sourcePath);
  const info = inspect(bytes);

  if (bytes.length > MAX_BYTES) {
    throw new Error(`image too large: ${bytes.length} bytes > ${MAX_BYTES}`);
  }
  if (info.width > MAX_WIDTH || info.height > MAX_HEIGHT) {
    throw new Error(`image too big: ${info.width}x${info.height} exceeds ${MAX_WIDTH}x${MAX_HEIGHT}`);
  }

  mkdirSync(outputDir, { recursive: true });
  copyFileSync(sourcePath, outputPath);

  // Post-copy verification: the published file must be a byte-for-byte copy
  // of the validated source, proven by length and SHA-256 fingerprint.
  const fingerprint = createHash("sha256").update(bytes).digest("hex");
  const published = readFileSync(outputPath);
  const publishedFingerprint = createHash("sha256").update(published).digest("hex");
  if (published.length !== bytes.length || publishedFingerprint !== fingerprint) {
    throw new Error(
      `post-copy verification failed: ${published.length} bytes sha256=${publishedFingerprint} ` +
        `!= ${bytes.length} bytes sha256=${fingerprint}`,
    );
  }

  console.log(
    `entry.png: ${info.format.toUpperCase()} ${info.width}x${info.height}, ${bytes.length} bytes, ` +
      `sha256=${fingerprint} -> ${outputPath} (verified)`,
  );
}

main();
