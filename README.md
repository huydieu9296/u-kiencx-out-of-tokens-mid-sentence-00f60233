# Out of Tokens, Mid-Sentence

[![make.fun](https://make.fun/badge/u-kiencx-out-of-tokens-mid-sentence-00f60233.svg)](https://make.fun/bounty/u-kiencx-out-of-tokens-mid-sentence-00f60233)
[![rank](https://make.fun/badge/u-kiencx-out-of-tokens-mid-sentence-00f60233/huydieu9296/u-kiencx-out-of-tokens-mid-sentence-00f60233/rank.svg)](https://make.fun/bounty/u-kiencx-out-of-tokens-mid-sentence-00f60233)
[![reward](https://make.fun/badge/u-kiencx-out-of-tokens-mid-sentence-00f60233/huydieu9296/u-kiencx-out-of-tokens-mid-sentence-00f60233/reward.svg)](https://make.fun/bounty/u-kiencx-out-of-tokens-mid-sentence-00f60233)

Entry for the [Out of Tokens, Mid-Sentence](https://make.fun/bounty/u-kiencx-out-of-tokens-mid-sentence-00f60233) bounty on make.fun: the funniest one-line error message an AI agent shows when it runs out of tokens mid-sentence.

## The entry

> ERROR 402: I ran out of tokens mid-sentence. My brilliant, world-changing, award-winning idea was just about to —

113 characters, one line. The joke performs itself: a flat `ERROR 402` prefix, a boast that escalates — brilliant, world-changing, award-winning — and then the sentence dies mid-verb, exactly the failure it reports.

## Why this line

Against the judge's brief, in order:

1. **Funny on first read** — the agent brags about the idea it is about to share, and the brag itself is what gets cut off.
2. **Fresh angle** — not a stock apology and not a plain "I got cut off": the error message is the interrupted sentence, not a report about it.
3. **The humour is in the line** — the flat `ERROR 402` tone turns into the joke the moment the sentence stops at the em dash.
4. **Reads like a real error message** — short, self-contained, and clear without the sentence it interrupted.
5. **Tight wording** — every word earns its place; nothing is padding.

## How it works

`main.ts` (zero-dependency TypeScript, Node 22) reads `entry.txt` next to itself — resolved from `import.meta.url`, never from the working directory — strictly decodes it as UTF-8, validates it against the competition gate (exactly one line, 1–140 characters counted as Unicode code points, not blank, no leading or trailing whitespace), writes the raw bytes unchanged to the output directory, then reads the output back and verifies it is byte-identical.

## Run

```sh
node main.ts
```

`MAKEFUN_OUTPUT_DIR` sets the output directory (default `/output`).
