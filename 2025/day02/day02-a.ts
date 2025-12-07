import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");
  const idRanges = lines[0]?.split(",") || [];

  // console.log(idRanges);
  let sum = 0;
  for (const range of idRanges) {
    const [start, end] = range.split("-");
    console.log(start, end);
    for (let i = parseInt(start as string); i <= parseInt(end as string); i++) {
      const nrString = i.toString();
      const half = nrString.length / 2;
      if (nrString.substring(0, half) === nrString.substring(half)) {
        // console.log(i);
        sum += i;
      }
    }
  }

  console.log(sum);
}

main();
