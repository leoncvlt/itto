import itto, { cls, text } from "../../itto/core";

itto.game({
  init: () => {
    cls(0x000000);
    text("Hello World!", 4, 8, 0xffffff);
  },
});
