import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input_sample.txt");
  const lines = data.toString().split("\n");
}

main();
