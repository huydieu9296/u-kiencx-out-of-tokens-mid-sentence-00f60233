// Out of Tokens, Mid-Sentence — make.fun text bounty entry.
//
// Reads entry.txt (kept next to this file) and writes it unchanged to the
// output directory, validating it against the competition gate on the way:
// UTF-8 text, exactly one line, 1–140 characters, not blank, no leading or
// trailing whitespace. The output is read back and verified byte-identical.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 140;
const MIN_CHARS = 1;

/** Count characters as Unicode code points, as the gate counts them. */
function countChars(text: string): number {
  return [...text].length;
}

/**
 * Validate the decoded entry against the competition gate and return its
 * character count. Every failure throws with a message naming the rule.
 */
function validateEntry(text: string): number {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line (no CR/LF)");
  }
  const chars = countChars(text);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}–${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank or whitespace-only");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  return chars;
}

/** Resolve a path relative to this file, never relative to the CWD. */
function here(name: string): string {
  return join(dirname(fileURLToPath(import.meta.url)), name);
}

const entryPath = here("entry.txt");
const raw = readFileSync(entryPath);

// Strict UTF-8 decode: invalid bytes fail loudly instead of being replaced.
const text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
const chars = validateEntry(text);

/**
 * Resolve the output directory: MAKEFUN_OUTPUT_DIR when set to a non-empty
 * value, otherwise the /output fallback. Always resolved to an absolute path.
 */
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return resolve(fromEnv && fromEnv.length > 0 ? fromEnv : "/output");
}

/**
 * Write the raw entry bytes unchanged to the output directory, then read
 * them back and verify they are byte-identical. Returns the output path.
 */
function writeAndVerify(rawBytes: Buffer, outDir: string): string {
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, rawBytes);
  const back = readFileSync(outPath);
  if (!back.equals(rawBytes)) {
    throw new Error("output is not byte-identical to entry.txt");
  }
  return outPath;
}

const outPath = writeAndVerify(raw, resolveOutputDir());

console.log(`source: ${entryPath}`);
console.log(`output: ${outPath}`);
console.log(`chars: ${chars}`);
console.log(`bytes: ${raw.length}`);
console.log(`entry: ${text}`);
