import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const blocks = data.toString().split("\n\n"); //.split("\n");
  const [rawRanges, rawIds] = blocks.map((b) => b.split("\n"));
  // console.log(rawRanges, rawIds);

  const ranges = rawRanges.map((r) => {
    const parts = r.split("-");
    return {
      start: parseInt(parts[0]),
      end: parseInt(parts[1]),
    };
  });
  // console.log(ranges);

  let sum = 0;
  for (const rawId of rawIds) {
    const id = parseInt(rawId);
    for (const range of ranges) {
      if (id >= range.start && id <= range.end) {
        sum++;
        break;
      }
    }
  }

  console.log(sum);
}

main();
