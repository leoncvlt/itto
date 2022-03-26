import { itto, game, btn, mouse, circ, cls, line, print, spr } from "../src";

let x, y;
let dx = Math.sign(Math.random() - 0.5) * 2;
let dy = Math.sign(Math.random() - 0.5) * 2;
const r = 8;

game({
  settings: {
    resolution: [240, 136],
    supersampling: 8,
  },

  assets: {
    characters: "characters.png",
  },

  init: () => {
    cls("grey");
    print("Hello World!", 4, 8);
    line(0, 0, 240, 136, "black", true);
    line(0, 136, 136, 0, "black");
    x = itto.width / 2;
    y = itto.height / 2;
  },

  update: () => {
    x = x + dx * itto.delta;
    y = y + dy * itto.delta;

    if (x > itto.width - r / 2 || x < 0) {
      dx = -dx;
    }
    if (y > itto.height - r / 2 || y < 0) {
      dy = -dy;
    }
  },

  draw: () => {
    cls("grey");

    circ(x, y, 4, "orange");

    circ(120, 68, Math.abs(Math.sin(itto.elapsed / 8)) * 8 + 8, "green");

    if (btn(4, false)) {
      console.log("hello!");
    }

    spr("characters", 0, 0, 24, 24, 180, 68);

    const [mx, my, button] = mouse();

    for (let i = itto.elapsed % 8; i < 136; i += 8) {
      line(i, 0, 0, 136 - i, "red", false);
      line(i + 105, 136, 240, 136 - i, "blue", false);
    }

    print("Hello World!", 4, 8, "white");
    print(`Mouse: ${mx} ${my} - ${button}`, 4, 16, "white");
    print(`DT: ${itto.delta.toFixed(3)}`, 4, 24, "white");
  },
});
