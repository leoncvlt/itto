import { game, clear, text } from "../../itto/core";

const str = "HELLO ITTO!";
const size = 8;
const frq = 4;
const spd = 0.1;
const amp = 8;

game.play({
  draw() {
    clear(0);
    for (let i = 0; i < str.length; i++) {
      text(
        str[i],
        game.width / 2 + i * size - (str.length * size) / 2,
        game.height / 2 + Math.sin((game.elapsed - i * frq) * spd) * amp,
        ((i + Math.floor(game.elapsed * 0.1)) % 15) + 1
      );
    }
  },
});
