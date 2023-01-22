# `itto`

An itty bitty javascript game engine

## 🚀 Quick start

Import the default `itto` object, and call `itto.game` to initialize the game loop. The function takes 4 named parameters:
| | | |
| --- | --- | --- |
| settings | <code>object</code> |  an object containing the game settings. See [game settings](#game-settings) |
| init | <code>function</code> |  function which runs once, on game start |
| update | <code>function</code> |  a function which runs on every game tick (by default, game runs at 60 ticks per second) |
| render | <code>function</code> |  a function which runs on every animation frame (always tries to target 60 frames per second) |

```js
import itto, { cls, circle } from "itto";

let x, y;
let dx = Math.sign(Math.random() - 0.5) * 2;
let dy = Math.sign(Math.random() - 0.5) * 2;
const r = 8;

itto.game({
  settings: {
    size: [360, 96],
  },
  init: () => {
    x = itto.width / 2;
    y = itto.height / 2;
  },
  update: () => {
    x = x + dx * itto.delta;
    y = y + dy * itto.delta;

    if (x > itto.width - r / 2 || x < 0) {
      dx = -dx;
    }
    if (y > itto.height - r / 2 || y < 0) {
      dy = -dy;
    }
  },
  draw: () => {
    cls(13);
    circle(x, y, r, 14);
  },
});
```

## 💾 Examples

TODO

## ⚙️ Game settings

The following properties can be passed to the `settings` parameter of the `.game` function:

{[itto/core/settings.js:7]}

## 🧩 Game properties

Inside the `init`, `update` or `render` functions you can access several properties of the `itto` object to query information about the game currently running:

{[itto/core/itto.js:6]}

## 📦 Loading assets

TODO

## ✨ Functions

`itto` offers a barebone set of functions to build your game with. All methods are named imports from the "itto" namespace.

### 🎨 Drawing 

{[itto/core/drawing.js:2]}

### 🕹️ Input

When querying an input with the `input` function, the inputs IDs map is as follows (IDs are case-insensitive):

| ID            | Input  |
| :--           | :----- |
| `up`          | Up Arrow
| `down`        | Down Arrow
| `left`        | Left Arrow
| `right`       | Right Arrow
| `a`           | Z
| `b`           | X
| `c`           | A
| `d`           | S
| `mouse`       | Left Mouse Button
| `mouseright`  | Right Mouse Button
| `mousemid`    | Middle Mouse Button
| `touch`       | One-finger touch
| `touchtwo`    | Two-fingers touch
| `touchthree`  | Three-fingers touch

{[itto/core/input.js:2]}

### 🔊 Sound

{[itto/core/audio.js:2]}