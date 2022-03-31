import { btn, circle, cls, game, get, itto, text, rect, set } from "../../itto/core";

let timer = 0;
let score, top;
let alive = true;

const snake = { x: 0, y: 0, cx: 0, cy: 0, dx: 0, dy: 0, speed: 0, body: [] };
const food = { x: 0, y: 0 };

const reset = () => {
  alive = true;
  score = 0;
  top = get("highscore", 0);
  Object.assign(snake, {
    x: itto.width / 2,
    y: itto.height / 2 - 4,
    cx: 0,
    cy: 0,
    dx: 0,
    dy: 0,
    speed: 4,
    body: [],
  });
  grow();
  grow();
  grow();
  spawn();
};

const spawn = () => {
  let x, y;
  while (!x || !y || collide(x, y)) {
    x = Math.floor(Math.random() * (itto.width / 8)) * 8;
    y = Math.floor(Math.random() * (itto.height / 8)) * 8;
  }
  food.x = x;
  food.y = y;
};

const grow = () => {
  const last = snake.body[snake.body.length - 1] || snake;
  snake.body.push({ x: last.x, y: last.y });
};

const collide = (x, y) => {
  for (const body of snake.body) {
    if (x === body.x && y === body.y) {
      return true;
    }
  }
  return false;
};

game({
  settings: {
    resolution: [240, 136],
    supersampling: 18,
    palette: [
      0x1a1c2c, 0x5d275d, 0xb13e53, 0xef7d57, 0xffcd75, 0xa7f070, 0x38b764, 0x257179, 0x29366f,
      0x3b5dc9, 0x41a6f6, 0x73eff7, 0xf4f4f4, 0x94b0c2, 0x566c86, 0x333c57,
    ],
  },
  init: () => {
    reset();
  },
  update: () => {
    if (!alive) {
      if (btn()) {
        reset();
      }
      return;
    }

    if (snake.cy === 0) {
      if (btn(0)) {
        snake.dx = 0;
        snake.dy = -1;
      }
      if (btn(1)) {
        snake.dx = 0;
        snake.dy = 1;
      }
    }
    if (snake.cx === 0) {
      if (btn(2)) {
        snake.dx = -1;
        snake.dy = 0;
      }
      if (btn(3)) {
        snake.dx = 1;
        snake.dy = 0;
      }
    }

    if (snake.x > itto.width) {
      snake.x = 0;
    }
    if (snake.x < 0) {
      snake.x = itto.width - 8;
    }
    if (snake.y > itto.height - 8) {
      snake.y = 8;
    }
    if (snake.y < 8) {
      snake.y = itto.height - 8;
    }

    if (!snake.dx && !snake.dy) {
      return;
    }

    timer += itto.delta;
    if (timer > 60 / snake.speed) {
      for (let i = snake.body.length - 1; i >= 0; i--) {
        const body = snake.body[i];
        const previous = i > 0 ? snake.body[i - 1] : snake;
        body.x = previous.x;
        body.y = previous.y;
      }
      const nx = snake.x + snake.dx * 8;
      const ny = snake.y + snake.dy * 8;

      if (collide(nx, ny)) {
        alive = false;
        if (score > top) {
          set("highscore", top);
        }
      } else {
        snake.x = nx;
        snake.y = ny;
        snake.cx = snake.dx;
        snake.cy = snake.dy;
      }

      timer -= 60 / snake.speed;
    }

    if (snake.x === food.x && snake.y === food.y) {
      grow();
      spawn();
      score++;
      snake.speed = Math.min(snake.speed + 0.2, 10);
    }
  },

  draw: () => {
    // clear the screen
    cls(6);

    circle(snake.x + 4, snake.y + 4, 4, alive ? 7 : 15);
    snake.body.forEach((body) => {
      circle(body.x + 4, body.y + 4, 4, alive ? 7 : 15);
    });

    circle(food.x + 4, food.y + 4, 4, 2);

    rect(0, 0, itto.width, 8, 15);
    text(`SCORE ${score.toString().padStart(3, "0")}`, 2, 7, 14);
    text(`TOP ${top.toString().padStart(3, "0")}`, itto.width - 47, 7, 14);
  },
});
