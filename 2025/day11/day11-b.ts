import { readFile } from "fs/promises";

const cache: { [key: string]: { dac: boolean, fft: boolean, outCount: number } } = {};

function rec(connections: { [key: string]: string[] }, from: string, visistedDac: boolean, visistedFft: boolean) {
  // if (cache[from]) {
  //   console.log('cache...')
  //   return cache[from];
  // }

  const to = connections[from];
  if (to[0] === 'out') {
    return {
      dac: visistedDac,
      fft: visistedFft,
      outCount: (visistedDac && visistedFft) ? 1 : 0
    }
  }

  let sum = 0;
  for (const next of to) {
    const nextRet = rec(connections, next, visistedDac || from === 'dac', visistedFft || from === 'fft');
    sum += nextRet.outCount;

    cache[next] = nextRet;
  }

  // cache[from] = {
  //   dac: visistedDac || from === 'dac',
  //   fft: visistedFft || from === 'fft',
  //   outCount: sum,
  // };

  return {
    dac: visistedDac || from === 'dac',
    fft: visistedFft || from === 'fft',
    outCount: sum,
  };
}

async function main() {
  const data = await readFile("input_sample_b.txt");
  const lines = data.toString().split("\n");

  const connections: { [key: string]: string[] } = {}
  for (const line of lines) {
    const [from, to] = line.split(':').map(s => s.trim());
    connections[from] = to.split(' ');
  }
  // console.log(connections);

  const totalPaths = rec(connections, 'svr', false, false);
  console.log(totalPaths);
}

main();
