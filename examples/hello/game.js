import { cls, game, text } from "../../itto/core";

game({
  init: () => {
    cls(0x000000);
    text("Hello World!", 4, 8, 0xffffff);
  },
});
