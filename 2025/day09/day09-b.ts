import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input_sample.txt");
  const lines = data.toString().split("\n");

  const points = lines.map((l) => {
    const [x, y] = l.trim().split(',').map(n => parseInt(n));
    return { x, y };
  });
  // console.log(points);

  const areas: { p1: { x: number, y: number }, p2: { x: number, y: number }, area: number }[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const p3 = { x: p1.x, y: p2.y };
      const p4 = { x: p2.x, y: p1.y };

      const p3or4inList = points.some((p) => (p.x === p3.x && p.y === p3.y) || (p.x === p4.x && p.y === p4.y));

      if (p3or4inList) {
        const area = Math.abs(p1.x - p2.x + 1) * Math.abs(p1.y - p2.y + 1);
        areas.push({ p1, p2, area });
      }
    }
  }
  areas.sort((a, b) => b.area - a.area);
  console.log(areas);

  // console.log(areas[0].area);
}

main();
