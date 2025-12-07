import { readFile } from "fs/promises";

let wheelPosition = 50;
let zeroCounter = 0;

function turnWheel(input: string) {
  const direction = input[0] === "L" ? -1 : 1;
  const distance = parseInt(input.substring(1));

  const fullRotations = Math.floor(distance / 100);
  zeroCounter += fullRotations;
  const remainingRotation = distance - fullRotations * 100;

  const prevWheelPosition = wheelPosition;
  wheelPosition += direction * remainingRotation;

  if (wheelPosition === 0) {
    zeroCounter += 1;
  } else if (wheelPosition >= 100) {
    zeroCounter += 1;
    wheelPosition -= 100;
  } else if (wheelPosition < 0) {
    if (prevWheelPosition !== 0) {
      zeroCounter += 1;
    }
    wheelPosition += 100;
  }
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
