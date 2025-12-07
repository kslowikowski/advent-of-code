import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");

  const cols = [];
  for (let x = 0; x < lines[0].length; x++) {
    const col = [];
    for (let y = 0; y < lines.length; y++) {
      col.push(lines[y][x]);
    }
    cols.push(col);
  }
  // console.log(cols);

  const calculations = [];
  let currentCalc = {
    numbers: [] as number[],
    operator: "",
  };
  for (const col of cols) {
    if (col.join("").trim() === "") {
      calculations.push(currentCalc);
      currentCalc = {
        numbers: [],
        operator: "",
      };
      continue;
    }

    const val = col.at(-1);
    if (val === "+" || val === "*") {
      currentCalc.operator = val;
    }
    currentCalc.numbers.push(parseInt(col.join("")));
  }
  calculations.push(currentCalc);
  // console.log(calculations);

  let sum = 0;
  for (const calc of calculations) {
    if (calc.operator === "+") {
      sum += calc.numbers.reduce((calcSum, val) => calcSum + val, 0);
    } else if (calc.operator === "*") {
      sum += calc.numbers.reduce((calcSum, val) => calcSum * val, 1);
    }
  }
  console.log(sum);
}

main();
