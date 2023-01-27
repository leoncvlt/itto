import { game, clear, image, input, text } from "../../itto/core";

let rotate = true;
let scale = true;
let fps = 60;

class Alien {
  constructor() {
    this.type = Math.floor(Math.random() * 4);
    this.x = Math.random() * (game.width - 24);
    this.y = Math.random() * (game.height - 24);
    this.dx = Math.random();
    this.dy = Math.random();
    this.sz = Math.random() + 0.5;
    this.speed = (Math.random() - 0.5) * 4;
  }

  update(delta) {
    this.x = this.x + this.dx * (this.speed * delta);
    this.y = this.y + this.dy * (this.speed * delta);

    if (this.x > game.width - 24 || this.x < 0) {
      this.dx = -this.dx;
    }
    if (this.y > game.height - 24 || this.y < 0) {
      this.dy = -this.dy;
    }
  }

  draw() {
    image("characters", this.x, this.y, this.type * 48, 0, 24, 24, {
      angle: rotate ? (game.elapsed / 60) * this.speed : 0,
      scale: scale ? [this.sz, this.sz] : [1, 1],
    });
  }
}

const aliens = [];

game.play({
  settings: {
    size: [640, 360],
    supersampling: 0,
    assets: {
      characters: "../assets/characters.png",
    },
  },
  init: () => {
    for (let i = 0; i < 512; i++) {
      aliens.push(new Alien());
    }
  },

  tick: () => {
    if (!game.ready) {
      return;
    }

    if (input("right")) {
      for (let i = 0; i < 8; i++) aliens.push(new Alien());
    }
    if (input("left")) {
      for (let i = 0; i < 8; i++) aliens.pop();
    }
    if (input("a", 0)) {
      rotate = !rotate;
    }
    if (input("b", 0)) {
      scale = !scale;
    }

    aliens.forEach((alien) => alien.update(game.delta));

    if (game.elapsed % 10 === 0) {
      fps = 60 / game.delta;
    }
  },

  draw: () => {
    if (!game.ready) {
      clear(0);
      return;
    }

    clear(14);

    aliens.forEach((alien) => alien.draw(game.delta));

    text(`⬅️/➡️ Aliens: ${aliens.length}`, 4, 12);
    text(`🅰 Rotate: ${scale}`, 4, 20);
    text(`🅱️ Scale: ${rotate}`, 4, 28);
    text(`${Math.round(fps)}`, 4, 42, 0, { size: 16 });
  },
});
