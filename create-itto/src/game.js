import itto, { cls, text } from "../../itto/core";

itto.game({
  settings: {
    offset: [0, 0],
  },
  init: () => {
    cls(0x000000);
    text("Hello World!", 4, 8, 0xffffff);
  },
});
