import { itto } from "./itto";

const KEYMAP = {
  mouse: 0,
  mousemid: 1,
  mouseright: 2,
  touch: 0,
  touchtwo: 1,
  touchthree: 2,
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  a: "KeyZ",
  b: "KeyX",
  x: "KeyA",
  y: "KeyS",
};

const _inputs = {};
const _pointer = { x: 0, y: 0 };

const resetPointerButtons = () => [0, 1, 2].forEach((i) => (_inputs[i] = false));

const handlePointerMove = (event) => {
  if (event.target === itto.canvas) {
    const { clientX } = event.touches?.length ? event.touches[0] : event;
    const { clientY } = event.touches?.length ? event.touches[0] : event;
    const { clientWidth, clientHeight, offsetLeft, offsetTop, width, height } = itto.canvas;
    _pointer.x = parseInt(((clientX - offsetLeft) / clientWidth) * width);
    _pointer.y = parseInt(((clientY - offsetTop) / clientHeight) * height);
  } else {
    resetPointerButtons();
  }
};

const handleTouch = (event) => {
  const touches = event.touches.length - 1;
  if (touches >= 0) {
    _inputs[event.touches.length - 1] = itto.elapsed;
  }
};

export const register = () => {
  document.addEventListener("keydown", (event) => {
    if (!event.repeat) {
      _inputs[event.code] = itto.elapsed;
    }
  });

  document.addEventListener("keyup", (event) => {
    _inputs[event.code] = 0;
  });

  document.addEventListener("pointermove", handlePointerMove);

  document.addEventListener("pointerdown", (event) => {
    if (event.target === itto.canvas) {
      if (!event.touches?.length > 0) {
        _inputs[event.button] = itto.elapsed;
      }
    }
  });

  document.addEventListener("pointerup", (event) => {
    if (event.target === itto.canvas) {
      if (!event.touches?.length > 0) {
        _inputs[event.button] = 0;
      }
    }
  });

  document.addEventListener("touchstart", (event) => {
    console.log(event);
    if (event.target === itto.canvas) {
      handleTouch(event);
      handlePointerMove(event);
    }
  });

  document.addEventListener("touchend", (event) => {
    if (event.target === itto.canvas) {
      resetPointerButtons();
      handleTouch(event);
    }
  });
};

/**
 * Checks if an input (keyboard / gamepad / mouse / touchscreen) is or has been pressed.
 * @param {number} id - the id of the input
 * @param {number} period - if the input is held down,the time in game ticks before the function
 *    returns `true` again. If omitted defaults to an interval of `1`, checking every tick.
 *    Pass `false` or `0` to check for a single press only.
 * @returns {boolean} whether the queried input is pressed or not
 *
 * @example
 * input("up") // returns true as long as the arrow up key is pressed
 * input("a", 60) // if Z is pressed, returns true every 60 ticks (1 seconds), otherwise false
 * input("mouse", 0) // returns true if the left mouse button has just been pressed, otherwise false
 * input() // returns true if any input is being pressed
 */
const input = (id, period = 1) => {
  if (id === undefined || id === null) {
    return Object.values(_inputs).some((i) => !!i);
  }
  const input = KEYMAP[id.toString().toLowerCase()];
  if (_inputs[input]) {
    const delta = itto.elapsed - _inputs[input];
    const triggered = !!period ? delta === 0 || delta > period : true;
    if (triggered) {
      _inputs[input] = period ? _inputs[input] + period * itto.delta : 0;
      return true;
    }
  }
  return false;
};

/**
 * Checks the current pointer position
 * @returns {number[]} `[x, y]` tuple containing the current x and y pointer coordinates
 */
const pointer = () => {
  return [_pointer.x, _pointer.y];
};

export { input, pointer };
