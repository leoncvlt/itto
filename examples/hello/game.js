import { cls, game, print } from "../../itto/core";

game({
  init: () => {
    cls(0x000000);
    print("Hello World!", 4, 8, 0xffffff);
  },
});
