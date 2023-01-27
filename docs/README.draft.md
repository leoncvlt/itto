# `itto`

An itty bitty javascript game engine

## ⬇️ Install & Usage

### Global Object

`<script src="https://unpkg.com/itto/itto.js"></script>`

`const { game } = itto`

### ES Module

`<script type="module" src="https://unpkg.com/itto/itto.mjs"></script>`

`import { game } from "itto"`

### Bundler

`npm i itto`

`import { game } from "itto"`

## 🚀 Quick start

Call `game.play` to initialize the game loop. The function takes on object with 4 named parameters:

* `settings` - an `object` containing the game settings. See [game settings](#%EF%B8%8F-game-settings)
* `init` - a `function` which runs once, on game start
* `tick` - a `function` which runs on every game tick (by default, game runs at 60 ticks per second)
* `draw` - a `function` which runs on every animation frame (always tries to target 60 frames per second)

```js
import { game, clear, circle } from "itto";

let x, y;
let dx = Math.sign(Math.random() - 0.5) * 2;
let dy = Math.sign(Math.random() - 0.5) * 2;
const r = 8;

game.play({
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
    clear(13);
    circle(x, y, r, 14);
  },
});
```

## 💾 Examples

[[examples]]

## ⚙️ Game settings

The following properties can be passed to the `settings` parameter of the `game.play` function:

{[itto/core/settings.js:7]}

## 🧩 Game properties

Inside `init`, `tick` or `draw` methods you can query different parameters from the `game` object to get specific properties of the game currently running:

{[itto/core/game.js:6]}

## 📦 Loading assets

In the game settings, you can use the `assets` object to map specific IDs to external resources you'd want to use during the game (for example, images to draw with the `image` function, or sounds to play with the `sound` function). The assets will be preloaded and processed accordingly. The `game.ready` variable will be set to `true` as soon as all assets are loaded, allowing you to create loading screens. 

```js
import { game, image, text } from "itto";

game.play({
  settings: {
    assets: {
      logo: "/assets/logo.png"
    }
  },
  draw: () => {
    if (itto.ready) {
     clear(0);
     text("Loading...", 8, 8)
    }
    clear(1);
    image(logo, 16, 16);
  },
});
```

Assets are processed based on their extension:

| Extension | Processed as  |
| :--       | :-- |
| `.jpg` `.jpeg` `.png` | [`HTMLImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
| `.wav` `.mp3` `.ogg` | [`AudioBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer)
| everything else | Raw URL of the asset

While assets are normally used by passing their IDs to specific functions, they can also be accessed at any time inside `game` by accessing `game.assets[id]`, provided they are loaded (if not, it will return a promise).

## ✨ Functions

The library offers a barebone set of functions to build your game with. All methods are named imports from the `"itto"` namespace or the global `itto` object.

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