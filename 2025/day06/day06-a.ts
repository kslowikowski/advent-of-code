import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");
  const values = lines.map((l) => l.trim().split(/\s+/));

  const calculations = [];
  for (let x = 0; x < values[0].length; x++) {
    calculations[x] = {
      numbers: [] as number[],
      operator: "",
    };
    for (let y = 0; y < values.length; y++) {
      const val = values[y][x];
      if (val === "+" || val === "*") {
        calculations[x].operator = val;
      } else {
        calculations[x].numbers.push(parseInt(val));
      }
    }
  }
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
