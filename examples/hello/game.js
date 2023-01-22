import itto, { cls, text } from "../../itto/core";

const str = "HELLO ITTO!";
const size = 8;
const frq = 4;
const spd = 0.1;
const amp = 8;

itto.game({
  draw() {
    cls(0);
    for (let i = 0; i < str.length; i++) {
      text(
        str[i],
        itto.width / 2 + i * size - (str.length * size) / 2,
        itto.height / 2 + Math.sin((itto.elapsed - i * frq) * spd) * amp,
        ((i + Math.floor(itto.elapsed * 0.1)) % 15) + 1
      );
    }
  },
});
