import { itto, game, btn, mouse, circ, cls, line, print, spr, sound } from "../src";

let x, y;
let dx = Math.sign(Math.random() - 0.5) * 2;
let dy = Math.sign(Math.random() - 0.5) * 2;
const r = 8;

game({
  settings: {
    resolution: [240, 136],
    supersampling: 8,
    assets: {
      characters: "characters.png",
      jump: "jump.wav",
    },
    palette: [
      0x1a1c2c, 0x5d275d, 0xb13e53, 0xef7d57, 0xffcd75, 0xa7f070, 0x38b764, 0x257179, 0x29366f,
      0x3b5dc9, 0x41a6f6, 0x73eff7, 0xf4f4f4, 0x94b0c2, 0x566c86, 0x333c57,
    ],
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
    if (!itto.ready) {
      return;
    }

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
    if (!itto.ready) {
      cls(0);
      print("Now Loading...", 4, 8, 14);
      return;
    }

    cls(13);

    circ(x, y, 4, 14);

    circ(120, 68, Math.abs(Math.sin(itto.elapsed / 8)) * 8 + 8, 6);

    if (btn(4, false)) {
      console.log("hello!");
    }

    if (btn(5, false)) {
      sound("jump");
    }

    const [mx, my, button] = mouse();
    spr("characters", 0, 0, 24, 24, mx - 12, my - 12);

    for (let i = itto.elapsed % 8; i < 136; i += 8) {
      line(i, 0, 0, 136 - i, 2, false);
      line(i + 105, 136, 240, 136 - i, 9, false);
    }

    print("Hello World!", 4, 8);
    print(`Mouse: ${mx} ${my} - ${button}`, 4, 16);
    print(`Delta: ${itto.delta.toFixed(3)}`, 4, 24);
  },
});
