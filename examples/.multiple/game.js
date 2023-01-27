import { game, clear, rect, text } from "../../itto/core";

game.play({
  settings: {
    width: 120,
    height: 120,
    canvas: document.querySelector("#itto-a"),
    palette: [0x1a1c2c, 0x94b0c2, 0xb13e53],
  },
  draw() {
    clear(0);
    text("Hello ITTO 1!", game.width / 2, 8, 1, { align: "center" });
    for (let i = 0; i < 4; i++) {
      rect(game.width / 2 - 16 + Math.sin(game.elapsed / 16) * 16, game.height / 2 - 16, 32, 32, 2);
    }
  },
});

game.play({
  settings: {
    width: 120,
    height: 150,
    canvas: document.querySelector("#itto-b"),
    palette: [0x1a1c2c, 0x94b0c2, 0x41a6f6],
  },
  draw() {
    clear(0);
    text("Hello ITTO 2!", game.width / 2, 8, 1, { align: "center" });
    for (let i = 0; i < 4; i++) {
      rect(game.width / 2 - 16, game.height / 2 - 16 + Math.sin(game.elapsed / 16) * 16, 32, 32, 2);
    }
  },
});

game.play({
  settings: {
    width: 120,
    height: 180,
    canvas: document.querySelector("#itto-c"),
    palette: [0x1a1c2c, 0x94b0c2, 0x38b764],
  },
  init() {
    console.dir(itto);
  },
  draw() {
    clear(0);
    text("Hello ITTO 3!", game.width / 2, 8, 1, { align: "center" });
    for (let i = 0; i < 4; i++) {
      rect(
        game.width / 2 - 16 + Math.cos(game.elapsed / 16) * 16,
        game.height / 2 - 16 + Math.sin(game.elapsed / 16) * 32,
        32,
        32,
        2
      );
    }
  },
});
