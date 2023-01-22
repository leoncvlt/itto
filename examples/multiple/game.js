import itto, { cls, rect, text } from "../../itto/core";

itto.game({
  settings: {
    width: 120,
    height: 120,
    canvas: document.querySelector("#itto-a"),
    palette: [0x1a1c2c, 0x94b0c2, 0xb13e53],
  },
  draw() {
    cls(0);
    text("Hello ITTO 1!", itto.width / 2, 8, 1, { align: "center" });
    for (let i = 0; i < 4; i++) {
      rect(itto.width / 2 - 16 + Math.sin(itto.elapsed / 16) * 16, itto.height / 2 - 16, 32, 32, 2);
    }
  },
});

itto.game({
  settings: {
    width: 120,
    height: 150,
    canvas: document.querySelector("#itto-b"),
    palette: [0x1a1c2c, 0x94b0c2, 0x41a6f6],
  },
  draw() {
    cls(0);
    text("Hello ITTO 2!", itto.width / 2, 8, 1, { align: "center" });
    for (let i = 0; i < 4; i++) {
      rect(itto.width / 2 - 16, itto.height / 2 - 16 + Math.sin(itto.elapsed / 16) * 16, 32, 32, 2);
    }
  },
});

itto.game({
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
    cls(0);
    text("Hello ITTO 3!", itto.width / 2, 8, 1, { align: "center" });
    for (let i = 0; i < 4; i++) {
      rect(
        itto.width / 2 - 16 + Math.cos(itto.elapsed / 16) * 16,
        itto.height / 2 - 16 + Math.sin(itto.elapsed / 16) * 32,
        32,
        32,
        2
      );
    }
  },
});
