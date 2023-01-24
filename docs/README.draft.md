# `itto`

An itty bitty javascript game engine

## ⬇️ Install & Usage

### Global Object

`<script src="path/to/itto.js"></script>`

`const { play, game } = itto`

### Bundler

`npm i itto`

`import { play, game } from "itto"`

## 🚀 Quick start

Import and call the `game` function to initialize the game loop. The function takes on object with 4 named parameters:

* `settings` - an `object` containing the game settings. See [game settings](#game-settings)
* `init` - a `function` which runs once, on game start
* `tick` - a `function` which runs on every game tick (by default, game runs at 60 ticks per second)
* `draw` - a `function` which runs on every animation frame (always tries to target 60 frames per second)

```js
import { play, game, cls, circle } from "itto";

let x, y;
let dx = Math.sign(Math.random() - 0.5) * 2;
let dy = Math.sign(Math.random() - 0.5) * 2;
const r = 8;

play({
  settings: {
    size: [360, 96],
  },
  init: () => {
    x = game.width / 2;
    y = game.height / 2;
  },
  tick: () => {
    x = x + dx * game.delta;
    y = y + dy * game.delta;

    if (x > game.width - r / 2 || x < 0) {
      dx = -dx;
    }
    if (y > game.height - r / 2 || y < 0) {
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

The following properties can be passed to the `settings` parameter of the `game` function:

{[itto/core/settings.js:7]}

## 🧩 Game properties

Import the `game` object to query information about the game currently running from inside the `init`, `tick` or `draw` methods:

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