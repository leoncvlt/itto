import itto, { cls, image, text } from "../../itto/core";

class Alien {
  constructor() {
    this.type = Math.floor(Math.random() * 4);
    this.x = Math.random() * (itto.width - 24);
    this.y = Math.random() * (itto.height - 24);
    this.dx = Math.random();
    this.dy = Math.random();
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
      angle: (itto.elapsed / 60) * this.speed,
      // scale: [0.5, 0.5],
    });
  }
}

const aliens = [];

itto.game({
  settings: {
    size: [640, 360],
    supersampling: 0,
    assets: {
      characters: "/characters.png",
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

    aliens.forEach((alien) => alien.update(itto.delta));
  },

  draw: () => {
    if (!itto.ready) {
      cls(0);
      return;
    }

    cls("slategrey");

    aliens.forEach((alien) => alien.draw(itto.delta));

    text(`Aliens: ${aliens.length}`, 4, 8);
    text(`FPS: ${Math.round(60 / itto.delta)}`, 4, 16);
  },
});
