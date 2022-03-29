import { itto } from "./itto";

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
const pointer = { x: 0, y: 0, buttons: [false, false, false] };

document.addEventListener("keydown", (event) => {
  if (event.code in KEYMAP && !inputs[KEYMAP[event.code]] && !event.repeat) {
    inputs[KEYMAP[event.code]] = itto.elapsed;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code in KEYMAP) {
    inputs[KEYMAP[event.code]] = 0;
  }
});

document.addEventListener("pointermove", (event) => {
  if (event.target === itto.canvas) {
    const { clientX, clientY } = event;
    const { clientWidth, clientHeight, offsetLeft, offsetTop, width, height } = itto.canvas;
    pointer.x = parseInt(((clientX - offsetLeft) / clientWidth) * width);
    pointer.y = parseInt(((clientY - offsetTop) / clientHeight) * height);
  } else {
    pointer.buttons.fill(false);
  }
});

document.addEventListener("pointerdown", (event) => {
  if (event.target === itto.canvas) {
    const button = event.touches?.length > 0 ? 0 : event.button;
    pointer.buttons[button] = true;
  }
});

document.addEventListener("pointerup", () => {
  pointer.buttons.fill(false);
});

const btn = (id, period = 1) => {
  if (id === undefined) {
    return inputs.some((i) => !!i);
  }
  if (inputs[id]) {
    const delta = itto.elapsed - inputs[id];
    const triggered = !!period ? delta === 0 || delta > period : true;
    if (triggered) {
      inputs[id] = period ? inputs[id] + period * itto.delta : 0;
      return true;
    }
  }
  return false;
};

const mouse = () => {
  const button = pointer.buttons.findIndex((b) => !!b);
  return [pointer.x, pointer.y, button !== -1 ? button : null];
};

export { btn, mouse };
