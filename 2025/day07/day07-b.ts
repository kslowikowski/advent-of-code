import { readFile } from "fs/promises";

class Array2D {
  public data: string[][] = [];

  public width = 0;
  public height = 0;

  constructor(inputData: string | Buffer<ArrayBuffer>) {
    const lines = inputData.toString().split("\n");
    this.height = lines.length;
    this.width = lines[0].length;
    for (const line of lines) {
      this.data.push(line.split(""));
    }
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

  public find(c: string) {
    const results: [x: number, y: number][] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const val = this.getValue([x, y]);
        if (val === c) {
          results.push([x, y]);
        }
      }
    }

    return results;
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

  public getNext([x, y]: [number, number], direction: 'north' | 'east' | 'south' | 'west') {
    const offsets = {
      north: [0, -1],
      east: [1, 0],
      south: [0, 1],
      west: [-1, 0],
    }

    const offset = offsets[direction];
    const nextCoords: [number, number] = [x + offset[0], y + offset[1]];
    const next = this.getValue(nextCoords);

    if (!next) {
      return null;
    }
    return {
      coords: nextCoords,
      value: next,
    }
  }

  public getNeighbours(
    [x, y]: [number, number],
    options?: {
      neighbourType?: "diagonal" | "orthogonal" | "all" | "horizontal" | "vertical";
      distance?: number;
    }
  ) {
    const distance = options?.distance ?? 1;
    const neighbourType = options?.neighbourType ?? "all";

    const neighbours: { coords: [number, number], value: string }[] = [];
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
        } else if (neighbourType === "horizontal") {
          if (y2 !== y) {
            continue;
          }
        } else if (neighbourType === "vertical") {
          if (x2 !== x) {
            continue;
          }
        }
        neighbours.push({ coords: [x2, y2], value: val });
      }
    }

    return neighbours;
  }

  public toString() {
    return this.data.map((line) => line.join("")).join("\n");
  }
}

const cache: { coords: [number, number], cnt: number }[] = [];

function followPathTillEnd(map: Array2D, start: [number, number]) {
  const cachedData = cache.find(m => m.coords[0] === start[0] && m.coords[1] === start[1]);
  if (cachedData) {
    return cachedData.cnt;
  }
  // if (map.getValue(start) === '.') {
  //   map.setValue(start, '|');
  // }

  let next = map.getNext(start, 'south');
  while (next?.value === '.') {
    // map.setValue(next.coords, '|');
    next = map.getNext(next.coords, 'south');
  }

  let cnt = 0;
  if (!next) {
    cnt++;
  }
  if (next?.value === '^') {
    const neighbours = map.getNeighbours(next.coords, { neighbourType: 'horizontal' });
    for (const neighbour of neighbours) {
      if (neighbour.value === '.') {
        cnt += followPathTillEnd(map, neighbour.coords);
      }
    }
  }

  if (!cache.find(m => m.coords[0] === start[0] && m.coords[1] === start[1])) {
    cache.push({
      coords: start,
      cnt: cnt,
    })
  }


  return cnt;
}

async function main() {
  const data = await readFile("input.txt"); 0
  const map = new Array2D(data);

  const start = map.find('S')[0];
  const cnt = followPathTillEnd(map, start);
  // console.log(map.toString());
  console.log(cnt)
}

main();
