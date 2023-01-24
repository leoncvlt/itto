/**
 * Game settings
 * @typedef Settings
 * @type {object}
 * @property {HTMLElement} [canvas=document.querySelector("canvas")] - The canvas element. Defaults to the first canvas in the page.
 * @property {number[]} [size=[240, 236]] - `[x, y]` tuple defining the width and height of the game
 */
const settings = {
  canvas: document.querySelector("canvas"),
  size: [240, 136],
  resize: "integer",
  supersampling: 0,
  offset: 0,
  assets: {},
  palette: [
    0x1a1c2c, 0x5d275d, 0xb13e53, 0xef7d57, 0xffcd75, 0xa7f070, 0x38b764, 0x257179, 0x29366f,
    0x3b5dc9, 0x41a6f6, 0x73eff7, 0xf4f4f4, 0x94b0c2, 0x566c86, 0x333c57,
  ],
};

export default settings;