import { readFile } from "fs/promises";

async function main() {
  const data = await readFile("input.txt");
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
      const area = Math.abs(p1.x - p2.x + 1) * Math.abs(p1.y - p2.y + 1);
      areas.push({ p1, p2, area });
    }
  }
  areas.sort((a, b) => b.area - a.area);
  // console.log(areas);

  console.log(areas[0].area);
}

main();
