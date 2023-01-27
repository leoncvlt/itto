import { game, clear, text } from "../../itto/core";

game.play({
  init: () => {
    clear(0x000000);
    text("Hello World!", 4, 8, 0xffffff);
  },
});
