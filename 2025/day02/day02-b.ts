import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");
  const idRanges = lines[0]?.split(",") || [];

  // console.log(idRanges);
  let sum = 0;
  for (const range of idRanges) {
    const [start, end] = range.split("-");
    // console.log(start, end);
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      const nrString = i.toString();
      const bucket: Record<string, number> = {};
      for (const char of nrString) {
        if (bucket[char]) {
          bucket[char]++;
        } else {
          bucket[char] = 1;
        }
      }

      const values = Object.values(bucket);
      if (values.every((val) => val > 1)) {
        for (let l = values.length; l <= nrString.length / 2; l++) {
          const part = nrString.substring(0, l);
          // console.log(nrString, bucket, l);
          if (nrString.split(part).join("") === "") {
            // console.log("^ added");
            sum += i;
            break;
          }
        }
        // const len = values.length;
        // for (let s = 0; s < nrString.length; s += len) {
        //   console.log(nrString.substring(s, s + len));
        // }
        // if (values.length === 1) {
        //   sum += i;
        // }
      }
    }
  }

  console.log(sum);
}

main();
