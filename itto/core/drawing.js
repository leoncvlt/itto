import { game } from "./game";

const tempContext = document.createElement("canvas").getContext("2d");

const parseColor = (color, rgb) => {
  let value = game.palette[color] || color;

  // parses hexadecimal numbers
  if (Number.isInteger(value)) {
    value = "#" + value.toString(16).padStart(6, "0");
  }

  // parse standard css colors
  if (!value.startsWith("#")) {
    tempContext.fillStyle = value;
    value = tempContext.fillStyle;
  }

  // return value
  if (rgb) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    value = value.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    return {
      r: parseInt(rgb[1], 16),
      g: parseInt(rgb[2], 16),
      b: parseInt(rgb[3], 16),
    };
  }
  return value;
};

/**
 * Fills the screen with a solid color
 * @param {number|string} color - the color to fill the screen with. Omit to use a transparent color
 */
const clear = (color) => {
  const { context, width, height } = game;
  if (color !== null) {
    context.fillStyle = parseColor(color);
    context.fillRect(0, 0, width, height);
  } else {
    context.clearRect(0, 0, width, height);
  }
};

/**
 * Draws a line
 * @param {number} x0 - x coordinate of the line start point
 * @param {number} y0 - y coordinate of the line start point
 * @param {number} x1 - x coordinate of the line end point
 * @param {number} y1 - y coordinate of the line end point
 * @param {number|string} color - the line color
 */
const line = (x0, y0, x1, y1, color = 0) => {
  const { context } = game;
  context.strokeStyle = parseColor(color);
  context.beginPath();
  context.moveTo(Math.round(x0), Math.round(y0));
  context.lineTo(Math.round(x1), Math.round(y1));
  context.stroke();
};

/**
 * Draws a rectangle
 * @param {number} x - the x coordinate of the rectangle top-left corner
 * @param {number} y - the y coordinate of the rectangle top-left corner
 * @param {number} w - the width of the rectangle
 * @param {number} h - the height of the rectangle
 * @param {number|string} color - the color of the rectangle
 * @param {boolean} border - whether to draw the border only or a filled shape
 */
const rect = (x, y, w, h, color = 0, border = false) => {
  const { context } = game;
  context.save();
  if (!border) {
    context.fillStyle = parseColor(color);
    context.fillRect(Math.round(x), Math.round(y), w, h);
  }
  context.strokeStyle = parseColor(color);
  context.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, w - 1, h - 1);
  context.restore();
};

/**
 * Draws a circle
 * @param {number} x - the x coordinate of the circle center
 * @param {number} y - the y coordinate of the circle center
 * @param {number} r - the circle radius
 * @param {number|string} color - the circle color
 * @param {boolean} border - whether to draw the border only or a filled shape
 */
const circle = (x, y, r, color = 0, border = false) => {
  const { context } = game;
  context.beginPath();
  context.arc(Math.round(x), Math.round(y), r - 0.5, 0, Math.PI * 2);
  if (!border) {
    context.fillStyle = parseColor(color);
    context.fill();
  }
  context.strokeStyle = parseColor(color);
  context.stroke();
};

/**
 * Draws an image
 * @param {string} id - id of the asset of the image to draw
 * @param {number} x - x coordinate to draw the image at
 * @param {number} y - y coordinate to draw the image at
 * @param {number} sx - top-left x coordinate of the portion of the source image to draw
 * @param {number} sy - top-left y coordinate of the portion of the source image to draw
 * @param {object} w - width of the portion of the source image to draw.
 *  If undefined, defaults to the natural width of the image.
 * @param {number} h - height of the portion of the source image to draw.
 *  If undefined, defaults to the natural height of the image.
 * @param {object} options - additional options
 * @param {number[]} options.origin - `[x, y]` tuple of the coordinates of the origin.
 *  Defaults to the top left corner `[0, 0]`
 * @param {number[]} options.anchor - `[x, y]` tuple of the coordinates to apply scale / rotation from
 * @param {number[]} options.scale - `[x, y]` tuple of the scale factor values
 * @param {number} options.angle - angle to rotate the image by
 */
const image = (id, x, y, sx, sy, w, h, { origin = [0, 0], anchor, scale, angle } = {}) => {
  const { context, assets } = game;
  const src = assets[id];
  if (!(src instanceof Image)) {
    console.warn("Attempting to draw an invalid image");
    return;
  }

  if (w === undefined) {
    w = src.width;
  }
  if (h === undefined) {
    h = src.height;
  }

  //TODO: implement using setTransform (should be faster)
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  let restore = false;
  if (scale !== undefined || angle !== undefined) {
    restore = true;
    context.save();
    context.translate(Math.round(x - origin[0]), Math.round(y - origin[1]));
    x = 0;
    y = 0;
    anchor = anchor || [w / 2, h / 2];
    context.translate(anchor[0], anchor[1]);
    if (angle) {
      context.rotate(angle);
    }
    if (scale) {
      context.scale(scale[0], scale[1]);
    }
    context.translate(-anchor[0], -anchor[1]);
  }

  if (sx !== undefined && sy !== undefined) {
    context.drawImage(src, sx, sy, w, h, x, y, w, h);
  } else {
    context.drawImage(src, x, y, w, h);
  }
  if (restore) {
    context.restore();
  }
};

/**
 * Draws text on screen
 * @param {string} text - the text to draw
 * @param {number} x - x coordinate to draw the text at
 * @param {number} y - y coordinate to draw the text at
 * @param {number|string} color - text color
 * @param {object} options - additional options
 * @param {number} options.size - text size, in px
 * @param {string} options.align - horizontal text alignment
 *  (`left` / `center` / `right`, defaults to `left`)
 * @param {string} options.font - id of the font asset to use
 */
const text = (text, x, y, color = 0, { size = 8, align = "left", font = "itto" } = {}) => {
  const { context } = game;
  context.font = `${size}px ${font}`;
  context.textAlign = align;
  context.fillStyle = parseColor(color);
  context.fillText(text, Math.floor(x), Math.floor(y));
};

export { clear as clear, image, line, rect, circle, text };
