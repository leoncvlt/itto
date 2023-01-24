import { game, cls, text } from "../../itto/core";

game.play({
  init: () => {
    cls(0x000000);
    text("Hello World!", 4, 8, 0xffffff);
  },
});
