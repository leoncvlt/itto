# `itto`

An itty bitty javascript game engine

## ⬇️ Install & Usage

### Global Object

`<script src="path/to/itto.js"></script>`

`const { game } = itto`

### ES Module

`<script type="module" src="path/to/itto.mjs"></script>`

`import { game } from "itto"`

### Bundler

`npm i itto`

`import { game } from "itto"`

## 🚀 Quick start

Call `game.play` to initialize the game loop. The function takes on object with 4 named parameters:

* `settings` - an `object` containing the game settings. See [game settings](#game-settings)
* `init` - a `function` which runs once, on game start
* `tick` - a `function` which runs on every game tick (by default, game runs at 60 ticks per second)
* `draw` - a `function` which runs on every animation frame (always tries to target 60 frames per second)

```js
import { game, cls, circle } from "itto";

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
    cls(13);
    circle(x, y, r, 14);
  },
});
```

## 💾 Examples

`🚧 TODO`

## ⚙️ Game settings

The following properties can be passed to the `settings` parameter of the `game.play` function:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [canvas] | <code>HTMLElement</code> | <code>document.querySelector(&quot;canvas&quot;)</code> | The canvas element. Defaults to the first canvas in the page. |
| [size] | <code>Array.&lt;number&gt;</code> | <code>[240, 236]</code> | `[x, y]` tuple defining the width and height of the game |



## 🧩 Game properties

Inside `init`, `tick` or `draw` methods you can query different parameters from the `game` object to get specific properties of the game currently running:

* [`game`](#game)
    * [`.canvas`](#game.canvas) : <code>HTMLElement</code>
    * [`.context`](#game.context) : <code>CanvasContext</code>
    * [`.width`](#game.width) : <code>number</code>
    * [`.height`](#game.height) : <code>number</code>
    * [`.delta`](#game.delta) : <code>number</code>
    * [`.elapsed`](#game.elapsed) : <code>number</code>
    * [`.ready`](#game.ready) : <code>boolean</code>
    * [`.palette`](#game.palette) : <code>Array.&lt;number&gt;</code>
    * [`.assets`](#game.assets) : <code>object</code>

<a name="game.canvas"></a>

#### `game.canvas` : <code>HTMLElement</code>
The canvas element the game is being drawn in

<a name="game.context"></a>

#### `game.context` : <code>CanvasContext</code>
Drawing context of the canvas element the game is being drawn in

<a name="game.width"></a>

#### `game.width` : <code>number</code>
Width of the game area, in pixels

<a name="game.height"></a>

#### `game.height` : <code>number</code>
Height of the game area, in pixels

<a name="game.delta"></a>

#### `game.delta` : <code>number</code>
Delta time since last frame

<a name="game.elapsed"></a>

#### `game.elapsed` : <code>number</code>
Time elapsed since the game start, in ticks (1 second = 60 ticks)

<a name="game.ready"></a>

#### `game.ready` : <code>boolean</code>
Whether the game assets have finished loading or not

<a name="game.palette"></a>

#### `game.palette` : <code>Array.&lt;number&gt;</code>
The array of colors

<a name="game.assets"></a>

#### `game.assets` : <code>object</code>
The loaded assets, in a key:data format



## 📦 Loading assets

`🚧 TODO`

## ✨ Functions

The library offers a barebone set of functions to build your game with. All methods are named imports from the `"itto"` namespace.

### 🎨 Drawing 

<dl>
<dt><a href="#cls">`cls(color)`</a></dt>
<dd><p>Fills the screen with a solid color</p>
</dd>
<dt><a href="#line">`line(x0, y0, x1, y1, color)`</a></dt>
<dd><p>Draws a line</p>
</dd>
<dt><a href="#rect">`rect(x, y, w, h, color, border)`</a></dt>
<dd><p>Draws a rectangle</p>
</dd>
<dt><a href="#circle">`circle(x, y, r, color, border)`</a></dt>
<dd><p>Draws a circle</p>
</dd>
<dt><a href="#image">`image(id, x, y, sx, sy, w, h, options)`</a></dt>
<dd><p>Draws an image</p>
</dd>
<dt><a href="#text">`text(text, x, y, color, options)`</a></dt>
<dd><p>Draws text on screen</p>
</dd>
</dl>

<a name="cls"></a>

### `cls(color)`
Fills the screen with a solid color


| Param | Type | Description |
| --- | --- | --- |
| color | <code>number</code> \| <code>string</code> | the color to fill the screen with. Omit to use a transparent color |

<a name="line"></a>

### `line(x0, y0, x1, y1, color)`
Draws a line


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x0 | <code>number</code> |  | x coordinate of the line start point |
| y0 | <code>number</code> |  | y coordinate of the line start point |
| x1 | <code>number</code> |  | x coordinate of the line end point |
| y1 | <code>number</code> |  | y coordinate of the line end point |
| color | <code>number</code> \| <code>string</code> | <code>0</code> | the line color |

<a name="rect"></a>

### `rect(x, y, w, h, color, border)`
Draws a rectangle


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | the x coordinate of the rectangle top-left corner |
| y | <code>number</code> |  | the y coordinate of the rectangle top-left corner |
| w | <code>number</code> |  | the width of the rectangle |
| h | <code>number</code> |  | the height of the rectangle |
| color | <code>number</code> \| <code>string</code> | <code>0</code> | the color of the rectangle |
| border | <code>boolean</code> | <code>false</code> | whether to draw the border only or a filled shape |

<a name="circle"></a>

### `circle(x, y, r, color, border)`
Draws a circle


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | the x coordinate of the circle center |
| y | <code>number</code> |  | the y coordinate of the circle center |
| r | <code>number</code> |  | the circle radius |
| color | <code>number</code> \| <code>string</code> | <code>0</code> | the circle color |
| border | <code>boolean</code> | <code>false</code> | whether to draw the border only or a filled shape |

<a name="image"></a>

### `image(id, x, y, sx, sy, w, h, options)`
Draws an image


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id of the asset of the image to draw |
| x | <code>number</code> | x coordinate to draw the image at |
| y | <code>number</code> | y coordinate to draw the image at |
| sx | <code>number</code> | top-left x coordinate of the portion of the source image to draw |
| sy | <code>number</code> | top-left y coordinate of the portion of the source image to draw |
| w | <code>object</code> | width of the portion of the source image to draw.  If undefined, defaults to the natural width of the image. |
| h | <code>number</code> | height of the portion of the source image to draw.  If undefined, defaults to the natural height of the image. |
| options | <code>object</code> | additional options |
| options.origin | <code>Array.&lt;number&gt;</code> | `[x, y]` tuple of the coordinates of the origin.  Defaults to the top left corner `[0, 0]` |
| options.anchor | <code>Array.&lt;number&gt;</code> | `[x, y]` tuple of the coordinates to apply scale / rotation from |
| options.scale | <code>Array.&lt;number&gt;</code> | `[x, y]` tuple of the scale factor values |
| options.angle | <code>number</code> | angle to rotate the image by |

<a name="text"></a>

### `text(text, x, y, color, options)`
Draws text on screen


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string</code> |  | the text to draw |
| x | <code>number</code> |  | x coordinate to draw the text at |
| y | <code>number</code> |  | y coordinate to draw the text at |
| color | <code>number</code> \| <code>string</code> | <code>0</code> | text color |
| options | <code>object</code> |  | additional options |
| options.size | <code>number</code> |  | text size, in px |
| options.align | <code>string</code> |  | horizontal text alignment  (`left` / `center` / `right`, defaults to `left`) |
| options.font | <code>string</code> |  | id of the font asset to use |



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

<dl>
<dt><a href="#input">`input(id, period)`</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if an input (keyboard / gamepad / mouse / touchscreen) is or has been pressed.</p>
</dd>
<dt><a href="#pointer">`pointer()`</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Checks the current pointer position</p>
</dd>
</dl>

<a name="input"></a>

### `input(id, period)` ⇒ <code>boolean</code>
Checks if an input (keyboard / gamepad / mouse / touchscreen) is or has been pressed.

**Returns**: <code>boolean</code> - whether the queried input is pressed or not  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | the id of the input |
| period | <code>number</code> | <code>1</code> | if the input is held down,the time in game ticks before the function    returns `true` again. If omitted defaults to an interval of `1`, checking every tick.    Pass `false` or `0` to check for a single press only. |

**Example**  
```js
input("up") // returns true as long as the arrow up key is pressed
input("a", 60) // if Z is pressed, returns true every 60 ticks (1 seconds), otherwise false
input("mouse", 0) // returns true if the left mouse button has just been pressed, otherwise false
input() // returns true if any input is being pressed
```
<a name="pointer"></a>

### `pointer()` ⇒ <code>Array.&lt;number&gt;</code>
Checks the current pointer position

**Returns**: <code>Array.&lt;number&gt;</code> - `[x, y]` tuple containing the current x and y pointer coordinates  


### 🔊 Sound

### `sound`
Plays a sound


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id of the asset of the sound file to play |
| options | <code>object</code> | additional options |
| options.channel | <code>number</code> | the channel to play the sound in.  Playing a sound in a specific channel stops other sounds playing in that same channel.  Call this method with a `null` src and a channel to stop the sound playing in that channel. |
| options.volume | <code>number</code> | volume to play the sound at |
| options.loop | <code>boolean</code> | whether to loop the sound or not |

