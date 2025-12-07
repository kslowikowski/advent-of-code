import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");

  let sum = 0;
  for (const line of lines) {
    const nrs = line.split("").map((n) => parseInt(n));
    const firstNr = Math.max(...nrs.slice(0, -1));
    // console.log(nrs);
    const secondHalf = nrs.slice(nrs.indexOf(firstNr) + 1);
    const secondNr = Math.max(...secondHalf);
    const result = parseInt("" + firstNr + secondNr);
    // console.log(result);
    sum += result;
  }

  console.log(sum);
}

main();
