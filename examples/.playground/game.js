import { game, input, pointer, circle, cls, line, text, image, sound } from "../../itto/core";

let x, y;
let dx = Math.sign(Math.random() - 0.5) * 2;
let dy = Math.sign(Math.random() - 0.5) * 2;
const r = 8;

game.play({
  settings: {
    resolution: [240, 136],
    offset: [96, 64],
    supersampling: 0,
    assets: {
      characters: "/characters.png",
      jump: "/jump.wav",
    },
    palette: [
      0x1a1c2c, 0x5d275d, 0xb13e53, 0xef7d57, 0xffcd75, 0xa7f070, 0x38b764, 0x257179, 0x29366f,
      0x3b5dc9, 0x41a6f6, 0x73eff7, 0xf4f4f4, 0x94b0c2, 0x566c86, 0x333c57,
    ],
  },
  init: () => {
    cls("grey");
    text("Hello World!", 4, 8);
    line(0, 0, 240, 136, "black", true);
    line(0, 136, 136, 0, "black");
    x = game.width / 2;
    y = game.height / 2;
  },

  tick: () => {
    if (!game.ready) {
      return;
    }

    x = x + dx * game.delta;
    y = y + dy * game.delta;

    if (x > game.width - r / 2 || x < 0) {
      dx = -dx;
    }
    if (y > game.height - r / 2 || y < 0) {
      dy = -dy;
    }
  },

  draw: () => {
    if (!game.ready) {
      cls(0);
      text("Now Loading...", 4, 8, 14);
      return;
    }

    cls(13);

    circle(x, y, 4, 14);

    circle(120, 68, Math.abs(Math.sin(game.elapsed / 8)) * 8 + 8, 6);

    if (input("A", false)) {
      sound("jump");
    }
    if (input("B", false)) {
      sound("jump", { channel: 0, loop: true });
    }
    if (input("x", false)) {
      sound(null, { channel: 0 });
    }

    const [mx, my] = pointer();

    image("characters", game.width * 0.33 - 12, game.height / 2 - 12, 48, 0, 24, 24, {
      scale: [Math.sin(game.elapsed / 8), 1],
    });

    image("characters", game.width * 0.66 - 12, game.height / 2 - 12, 96, 0, 24, 24, {
      angle: game.elapsed / 8,
    });

    image("characters", mx - 12, my - 12, 0, 0, 24, 24);

    for (let i = game.elapsed % 8; i < 136; i += 8) {
      line(i, 0, 0, 136 - i, 2, false);
      line(i + 105, 136, 240, 136 - i, 9, false);
    }

    let touches = 0;
    if (input("touchthree")) touches = 3;
    else if (input("touchtwo")) touches = 2;
    else if (input("touch")) touches = 1;
    else touches = 0;

    const LN = 8;
    text("Hello World!", 4, LN);
    text(`pointer: ${mx} ${my} ${input("mouse")}`, 4, LN * 2);
    text(`touches: ${[touches]}`, 4, LN * 3);
    text(`Delta: ${game.delta.toFixed(3)}`, 4, LN * 4);
  },
});
