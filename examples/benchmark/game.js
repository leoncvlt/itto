import itto, { cls, image, input, rect, text } from "../../itto/core";

let rotate = true;
let scale = true;
let fps = 60;

class Alien {
  constructor() {
    this.type = Math.floor(Math.random() * 4);
    this.x = Math.random() * (itto.width - 24);
    this.y = Math.random() * (itto.height - 24);
    this.dx = Math.random();
    this.dy = Math.random();
    this.sz = Math.random() + 0.5;
    this.speed = (Math.random() - 0.5) * 4;
  }

  update(delta) {
    this.x = this.x + this.dx * (this.speed * delta);
    this.y = this.y + this.dy * (this.speed * delta);

    if (this.x > itto.width - 24 || this.x < 0) {
      this.dx = -this.dx;
    }
    if (this.y > itto.height - 24 || this.y < 0) {
      this.dy = -this.dy;
    }
  }

  draw() {
    image("characters", this.x, this.y, this.type * 48, 0, 24, 24, {
      angle: rotate ? (itto.elapsed / 60) * this.speed : 0,
      scale: scale ? [this.sz, this.sz] : [1, 1],
    });
  }
}

const aliens = [];

itto.game({
  settings: {
    size: [640, 360],
    supersampling: 0,
    assets: {
      characters: "characters.png",
    },
  },
  init: () => {
    for (let i = 0; i < 512; i++) {
      aliens.push(new Alien());
    }
  },

  update: () => {
    if (!itto.ready) {
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

    aliens.forEach((alien) => alien.update(itto.delta));

    if (itto.elapsed % 10 === 0) {
      fps = 60 / itto.delta;
    }
  },

  draw: () => {
    if (!itto.ready) {
      cls(0);
      return;
    }

    cls(14);

    aliens.forEach((alien) => alien.draw(itto.delta));

    text(`⬅️/➡️ Aliens: ${aliens.length}`, 4, 12);
    text(`🅰 Rotate: ${scale}`, 4, 20);
    text(`🅱️ Scale: ${rotate}`, 4, 28);
    text(`${Math.round(fps)}`, 4, 42, 0, { size: 16 });
  },
});
