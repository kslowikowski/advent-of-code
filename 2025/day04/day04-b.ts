import { readFile } from "fs/promises";

class Array2D {
  public data: string[][] = [];

  public width = 0;
  public height = 0;

  constructor(inputData: string) {
    const lines = inputData.split("\n");
    this.height = lines.length;
    this.width = lines[0].length;
    for (const line of lines) {
      this.data.push(line.split(""));
    }

    // console.log(this.data);
  }

  public getValue([x, y]: [number, number]) {
    if (x < 0 || x >= this.width) {
      return null;
    }
    if (y < 0 || y >= this.height) {
      return null;
    }
    return this.data[y][x];
  }

  public setValue([x, y]: [number, number], newValue: string) {
    if (x < 0 || x >= this.width) {
      return;
    }
    if (y < 0 || y >= this.height) {
      return;
    }
    this.data[y][x] = newValue;
  }

  public replaceAll(searchString: string, replaceString: string) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.getValue([x, y]) === searchString) {
          this.setValue([x, y], replaceString);
        }
      }
    }
  }

  public getNeighbours(
    [x, y]: [number, number],
    options?: {
      neighbourType?: "diagonal" | "orthogonal" | "all";
      distance?: number;
    }
  ) {
    const distance = options?.distance ?? 1;
    const neighbourType = options?.neighbourType ?? "all";

    const neighbours = [];
    for (let y2 = y - distance; y2 <= y + distance; y2++) {
      for (let x2 = x - distance; x2 <= x + distance; x2++) {
        if (x2 === x && y2 === y) {
          continue;
        }
        const val = this.getValue([x2, y2]);
        if (!val) {
          continue;
        }
        if (neighbourType === "orthogonal") {
          if (y2 !== y && x2 !== x) {
            continue;
          }
        } else if (neighbourType === "diagonal") {
          if (Math.abs(y - y2) !== Math.abs(x - x2)) {
            continue;
          }
        }
        neighbours.push({ x: x2, y: y2, value: val });
      }
    }

    return neighbours;
  }

  public toString() {
    return this.data.map((line) => line.join("")).join("\n");
  }
}

async function main() {
  const data = await readFile("input.txt");
  const map = new Array2D(data.toString());

  let sum = 0;
  let lastSum = -1;
  while (sum !== lastSum) {
    lastSum = sum;
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        if (map.getValue([x, y]) === "@") {
          const neighbours = map.getNeighbours([x, y]);
          const neighbourPaperStacks = neighbours
            .map((n) => n.value)
            .filter((n) => n === "@" || n === "x").length;

          if (neighbourPaperStacks <= 3) {
            map.setValue([x, y], "x");
            sum++;
          }
        }
      }
    }

    // console.log(map.toString());
    map.replaceAll("x", ".");
  }

  // console.log(map.toString());
  console.log(sum);
}

main();
