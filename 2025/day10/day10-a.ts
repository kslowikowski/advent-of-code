import { readFile } from "fs/promises";

class Machine {
  public size: number;
  public targetLightState: number;
  public buttons: number[];

  constructor(machineString: string) {
    const firstSpaceIndex = machineString.indexOf(" ");
    const lastSpaceIndex = machineString.lastIndexOf(" ");

    this.size = firstSpaceIndex - 2;
    this.targetLightState = parseInt(
      machineString
        .substring(1, firstSpaceIndex - 1)
        .replaceAll(".", "0")
        .replaceAll("#", "1"),
      2
    );
    const buttonsStrings = machineString
      .substring(firstSpaceIndex + 1, lastSpaceIndex)
      .split(" ")
      .map((b) => b.substring(1, b.length - 1));

    this.buttons = buttonsStrings.map((b) => this.parseBtn(b));
  }

  private parseBtn(btnString: string) {
    const button = new Array(this.size).fill("0");
    btnString
      .split(",")
      .map((n) => parseInt(n))
      .forEach((n) => {
        button[n] = "1";
      });

    return parseInt(button.join(""), 2);
  }

  public pressBtn(btn: number, lightState: number) {
    return btn ^ lightState;
  }

  private countBinaryOnes(bin: number) {
    let cnt = 0;
    while (bin > 0) {
      cnt += bin & 1;
      bin = bin >> 1;
    }

    return cnt;
  }

  public solveByBruteForce(
    lightState: number,
    buttonsPressed: number,
    currentShortestPath: number
  ) {
    if (lightState === this.targetLightState) {
      return this.countBinaryOnes(buttonsPressed);
    }
    if (this.countBinaryOnes(buttonsPressed) >= currentShortestPath) {
      return;
    }

    let shortestPath = this.buttons.length;
    for (let i = 0; i < this.buttons.length; i++) {
      if ((buttonsPressed & (1 << i)) > 0) {
        continue;
      }

      const btn = this.buttons[i];
      const newLightState = this.pressBtn(btn, lightState);
      const ret = this.solveByBruteForce(
        newLightState,
        buttonsPressed | (1 << i),
        shortestPath
      );
      if (ret && ret < shortestPath) {
        shortestPath = ret;
      }
    }

    return shortestPath;
  }

  public toString() {
    return {
      size: this.size,
      targetLightState: this.targetLightState.toString(2),
      buttons: this.buttons.map((b) => b.toString(2)),
    };
  }
}

async function main() {
  const data = await readFile("input.txt");
  const lines = data.toString().split("\n");

  const machines: Machine[] = [];
  for (const line of lines) {
    const machine = new Machine(line);
    machines.push(machine);
  }

  let sum = 0;
  let i = 0;
  for (const machine of machines) {
    let pathLength = machine.solveByBruteForce(0, 0, machine.buttons.length);
    console.log(i, pathLength);
    sum += pathLength ?? 0;
    i++;
  }

  console.log(sum);

  // [.#.....##.]
  //  0123456789  => 178

  // (0,3,8) x
  // (0,4,5)
  // (0,5,6)
  // (0,8,9) x
  // (1,2,3) x
  // (1,2,4) x
  // (5,7,9)
  // (0,5,6,7) x
  // (0,3,6,7,9)
  // (0,1,2,3,6,8)
  // (0,1,3,5,6,7) x
  // (1,2,3,4,7,8,9) x
}

main();
