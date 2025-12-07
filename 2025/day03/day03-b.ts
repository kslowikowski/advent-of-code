import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");

  let sum = 0;
  for (const line of lines) {
    const nrs = line.split("").map((n) => parseInt(n));
    let relevantNrs = nrs.slice();
    const highestNr = [];
    for (let i = 1; i <= 12; i++) {
      if (highestNr.length > 0) {
        const lastHighestNr = highestNr.at(-1) as number;
        // console.log(lastHighestNr);
        relevantNrs = relevantNrs.slice(relevantNrs.indexOf(lastHighestNr) + 1);
      }
      // console.log("Rel", relevantNrs);
      if (i < 12) {
        highestNr.push(Math.max(...relevantNrs.slice(0, i - 12)));
      } else {
        highestNr.push(Math.max(...relevantNrs));
      }
    }

    sum += parseInt(highestNr.join(""));
  }

  console.log(sum);
}

main();
