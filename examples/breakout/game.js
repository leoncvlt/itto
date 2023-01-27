import { game, input, circle, clear, get, text, rect, set } from "../../itto/core";

let score, top, lives;
let started = false;

const paddle = { x: 0, y: 0, w: 32, h: 6 };
const ball = { x: 0, y: 0, r: 4, dx: 0, dy: 0, speed: 0 };
const bricks = [];

const restart = () => {
  score = 0;
  top = get("highscore", 0);
  lives = 3;
  reset();
  rebuild();
};

const reset = () => {
  paddle.x = game.width / 2 - paddle.w / 2;
  paddle.y = 112;
  ball.x = game.width / 2;
  ball.y = 98;
  ball.dx = ball.dy = ball.speed = 0;
};

const launch = () => {
  ball.dx = Math.random() < 0.5 ? -1 : 1;
  ball.dy = -1;
  ball.speed = 1;
};

const collide = (ball, rect) => {
  if (
    ball.x - ball.r < rect.x + rect.w &&
    ball.x + ball.r > rect.x &&
    ball.y - ball.r < rect.y + rect.h &&
    ball.y + ball.r > rect.y
  ) {
    return true;
  }
  return false;
};

const rebuild = () => {
  bricks.length = 0;
  const w = 30;
  const h = 8;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 6; y++) {
      bricks.push({ x: x * w, y: 8 + y * h, w, h, color: y + 2 });
    }
  }
};

game.play({
  settings: {
    size: [240, 136],
    offset: [96, 64],
    // supersampling: 8,
    palette: [
      0x1a1c2c, 0x5d275d, 0xb13e53, 0xef7d57, 0xffcd75, 0xa7f070, 0x38b764, 0x257179, 0x29366f,
      0x3b5dc9, 0x41a6f6, 0x73eff7, 0xf4f4f4, 0x94b0c2, 0x566c86, 0x333c57,
    ],
  },
  init: () => {
    restart();
  },
  tick: () => {
    if (!started) {
      // if the game is not running, wait for user input to start the game and launch the ball
      if (input("A", false)) {
        started = true;
        launch();
      }
    } else {
      // move the paddle within the game bounds
      if (input("left")) {
        if (paddle.x > 0) {
          paddle.x -= 2 * game.delta;
        }
      }
      if (input("right")) {
        if (paddle.x < game.width - paddle.w) {
          paddle.x += 2 * game.delta;
        }
      }

      // if the ball is still, move it above the paddle so the user can launch it
      // if not, move the ball according to its speed and direction
      if (ball.speed === 0) {
        if (input("A", false)) {
          launch();
        }
        ball.x = paddle.x + paddle.w / 2;
      } else {
        ball.x += ball.dx * ball.speed * game.delta;
        ball.y += ball.dy * ball.speed * game.delta;
      }

      // if the ball collided with the paddle, bounce it upwards
      // and increase its speed slightly up to a max value
      if (collide(ball, paddle)) {
        ball.speed = Math.min(ball.speed + 0.02, 2);
        if (ball.y < paddle.y) {
          ball.dy = -Math.abs(ball.dy);
        }
      }

      for (let i = bricks.length - 1; i >= 0; i--) {
        if (collide(ball, bricks[i])) {
          if (ball.x + ball.r > bricks[i].x && ball.x - ball.r < bricks[i].x + bricks[i].w) {
            ball.dy *= -1;
          } else {
            ball.dx *= -1;
          }
          bricks.splice(i, 1);
          score++;
          break;
        }
      }

      // bounce the ball against the walls
      if (ball.x < 0 || ball.x > game.width) {
        ball.dx *= -1;
      }
      if (ball.y < 8) {
        ball.dy = 1;
      }

      // if the balls falls through the lower bound, decrease the lives and reset the ball
      // if all lives have been lost, save the high score if needed and restart the game
      if (ball.y > game.height) {
        if (lives > 0) {
          lives--;
        } else {
          started = false;
          if (score > top) {
            set("highscore", score);
          }
          restart();
        }
        reset();
      }

      if (bricks.length === 0) {
        rebuild();
        restart();
      }
    }
  },

  draw: () => {
    // clear the screen
    clear(13);

    // draw the bricks
    bricks.forEach((brick) => {
      rect(brick.x, brick.y, brick.w, brick.h, brick.color);
    });

    // draw the ball, and a highlight
    circle(ball.x, ball.y, ball.r, 15);
    circle(ball.x + 1, ball.y - 1, ball.r / 2, 14);

    // draw the paddle
    rect(paddle.x, paddle.y, paddle.w, paddle.h, 15);

    // draw the interface background
    rect(0, 0, game.width, 8, 15);

    if (!started) {
      // if the game has not started, draw the high score and instructions to start
      text(`TOP ${top.toString().padStart(3, "0")}`, 2, 7, 14);
      text(`Press (A) to start`, game.width - 2, 7, 14, { align: "right" });
    } else {
      // if the game is running, draw the current score and the number of lives
      text(`SCORE ${score.toString().padStart(3, "0")}`, 2, 7, 14);
      for (let i = 0; i < lives; i++) {
        circle(game.width - 4 - i * 6, 4, 2, 14);
      }
    }
  },
});
