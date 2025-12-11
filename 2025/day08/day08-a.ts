import { readFile } from "fs/promises";

type Junction = { x: number, y: number, z: number, circuit: number };

async function main() {
  const data = await readFile("input_sample.txt");
  const lines = data.toString().split("\n");
  const connections = 10;

  const junctions = lines.map((l) => {
    const [x, y, z] = l.trim().split(',').map(n => parseInt(n));
    return { x, y, z, circuit: -1 };
  });
  // console.log(junctions);

  const pairs: { j1: Junction, j2: Junction, distance: number }[] = [];
  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      const j1 = junctions[i];
      const j2 = junctions[j];
      const distance = Math.pow(j1.x - j2.x, 2) + Math.pow(j1.y - j2.y, 2) + Math.pow(j1.z - j2.z, 2);
      pairs.push({ j1, j2, distance });
    }
  }
  pairs.sort((a, b) => a.distance - b.distance);
  // console.log(pairs);

  const circuits: { no: number, junctions: Junction[] }[] = []
  for (let i = 0; i < connections; i++) {
    const { j1, j2 } = pairs[i];
    if (j1.circuit === -1 && j2.circuit === -1) {
      const no = circuits.length;
      circuits.push({
        no,
        junctions: [j1, j2],
      });
      j1.circuit = no;
      j2.circuit = no
    }
    else if (j1.circuit === -1) {
      const circuit = circuits.find((c) => c.no === j2.circuit);
      if (circuit) {
        circuit.junctions.push(j1);
        j1.circuit = circuit.no;
      }
    } else if (j2.circuit === -1) {
      const circuit = circuits.find((c) => c.no === j1.circuit);
      if (circuit) {
        circuit.junctions.push(j2);
        j2.circuit = circuit.no;
      }
    } else {
      if (j1.circuit !== j2.circuit) {
        const c1 = circuits.find(c => c.no === j1.circuit);
        const c2 = circuits.find(c => c.no === j2.circuit);
        if (c1 && c2) {
          for (const junction of c2.junctions) {
            c1.junctions.push(junction);
            junction.circuit = c1.no;
          }

          circuits.splice(circuits.indexOf(c2), 1);
        }
      }
    }
  }
  circuits.sort((a, b) => b.junctions.length - a.junctions.length);
  console.log(circuits[0].junctions.length, circuits[1].junctions.length, circuits[2].junctions.length)

  let result = 1;
  for (let i = 0; i < 3; i++) {
    result *= circuits[i].junctions.length;
  }

  console.log(result);
  // 644736 - too high
}

main();
