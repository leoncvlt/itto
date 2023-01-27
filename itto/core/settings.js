/**
 * Game settings
 * @typedef Settings
 * @type {object}
 * @property {HTMLElement} [canvas=document.querySelector("canvas")] - The canvas element. Defaults to the first canvas in the page.
 * @property {number[]} [size=[240, 236]] - `[x, y]` tuple defining the width and height of the game
 * @property {string} resize=integer] - The resizing behaviour - `itto` will attempt to resize the canvas to fill up its parent, while keeping the aspect ratio. "integer" will scale the canvas in integer increments (2x, 3x, etc). "linear" will always scale it to the max size. "none" or `null` will disable the automatic scaling, leaving you to sort out the canvas sizing manually
 * @property {number|number[]} [offset=0] - The amount of pixels to keep around the game area when resizing it. Pass a number for the same amount across all dimensions, or a `[x, y]` tuple to have different offset for the sides and the top/bottom
 * @property {number} [supersampling=0] - Scale the game's graphics up by this amount, before rendering them on the canvas. Can make text / shapes sharper (especially on Chrome) at the expense of worse performance
 * @property {object} [assets={}] - An ojbect containing ID/Urls pairs for the external resources you want to preload and use in the game. See [Loading Assets](#-loading-assets)
 * @property {number[]} [palette=[sweetie16]] - An array containing colors whose index can be passed to drawing functions (such as `clear` or `rect`. Defaults to the [Sweetie 16](https://lospec.com/palette-list/sweetie-16) palette)
 */
const settings = {
  canvas: document.querySelector("canvas"),
  size: [240, 136],
  resize: "integer",
  offset: 0,
  supersampling: 0,
  assets: {},
  palette: [
    0x1a1c2c, 0x5d275d, 0xb13e53, 0xef7d57, 0xffcd75, 0xa7f070, 0x38b764, 0x257179, 0x29366f,
    0x3b5dc9, 0x41a6f6, 0x73eff7, 0xf4f4f4, 0x94b0c2, 0x566c86, 0x333c57,
  ],
};

export default settings;