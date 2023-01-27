import itto, { clear, text } from "../../itto/core";

itto.game({
  settings: {
    offset: [0, 0],
  },
  init: () => {
    clear(0x000000);
    text("Hello World!", 4, 8, 0xffffff);
  },
});
