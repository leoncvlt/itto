import { itto } from "./core";

const KEYMAP = {
  ArrowUp: 0,
  ArrowDown: 1,
  ArrowLeft: 2,
  ArrowRight: 3,
  KeyZ: 4,
  KeyX: 5,
  KeyA: 6,
  KeyS: 7,
};

const inputs = Array.from(Object.keys(KEYMAP)).fill(0);

document.addEventListener("keypress", (event) => {
  if (event.code in KEYMAP && !inputs[KEYMAP[event.code]]) {
    inputs[KEYMAP[event.code]] = itto.elapsed;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code in KEYMAP) {
    inputs[KEYMAP[event.code]] = 0;
  }
});

const btn = (id, period = 1) => {
  if (inputs[id]) {
    const delta = itto.elapsed - inputs[id];
    const triggered = !!period ? delta === 0 || delta > period : delta === 0;
    if (triggered) {
      inputs[id] += period || 0;
      return true;
    }
  }
  return false;
};

export { btn };
