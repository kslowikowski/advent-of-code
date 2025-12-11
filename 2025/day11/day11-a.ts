import { readFile } from "fs/promises";

const cache: { [key: string]: number } = {};

function rec(connections: { [key: string]: string[] }, from: string) {
  if (cache[from]) {
    return cache[from];
  }

  const to = connections[from];
  if (to[0] === 'out') {
    return 1;
  }

  let sum = 0;
  for (const next of to) {
    sum += rec(connections, next);
  }

  cache[from] = sum;
  return sum;
}

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");

  const connections: { [key: string]: string[] } = {}
  for (const line of lines) {
    const [from, to] = line.split(':').map(s => s.trim());
    connections[from] = to.split(' ');
  }
  // console.log(connections);

  const totalPaths = rec(connections, 'you');
  console.log(totalPaths);
}

main();
