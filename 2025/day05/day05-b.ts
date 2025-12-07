import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const blocks = data.toString().split("\n\n"); //.split("\n");
  const [rawRanges] = blocks.map((b) => b.split("\n"));
  // console.log(rawRanges, rawIds);

  const ranges = rawRanges.map((r) => {
    const parts = r.split("-");
    return {
      start: parseInt(parts[0]),
      end: parseInt(parts[1]),
    };
  });
  ranges.sort((a, b) => a.start - b.start);
  // console.log(ranges);

  const compressedRanges: typeof ranges = [];
  for (const range of ranges) {
    const prevRangeIndex = compressedRanges.length - 1;
    const prevRange = compressedRanges[prevRangeIndex];
    if (
      prevRange &&
      prevRange.start <= range.start &&
      prevRange.end >= range.start
    ) {
      if (prevRange.end < range.end) {
        compressedRanges[prevRangeIndex].end = range.end;
      }
    } else {
      compressedRanges.push(range);
    }
  }
  console.log(compressedRanges);

  let sum = 0;
  for (const range of compressedRanges) {
    sum += range.end - range.start + 1;
  }
  console.log(sum);
}

main();
