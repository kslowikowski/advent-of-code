import { readFile } from "fs/promises";

let wheelPosition = 50;
let zeroCounter = 0;

function turnWheel(input: string) {
  const direction = input[0] === "L" ? -1 : 1;
  const distance = parseInt(input.substring(1));

  wheelPosition = (wheelPosition + direction * distance) % 100;
  if (wheelPosition < 0) wheelPosition += 100;

  if (wheelPosition === 0) zeroCounter++;
}

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");

  for (const line of lines) {
    turnWheel(line);
  }

  console.log(zeroCounter);
}

main();
