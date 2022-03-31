import { itto } from "./itto";

const parseColor = (color) => {
  let value = itto.palette[color] || color;
  if (Number.isInteger(value)) {
    value = "#" + value.toString(16).padStart(6, "0");
  }
  return value;
};

/**
 * Fills the screen with a solid color
 * @param {number|string} color - the color to fill the screen with. Omit to use a transparent color
 */
const cls = (color) => {
  const { context, width, height } = itto;
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
  const { context } = itto;
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
  const { context } = itto;
  if (!border) {
    context.fillStyle = parseColor(color);
    context.fillRect(Math.round(x), Math.round(y), w, h);
  }
  context.strokeStyle = parseColor(color);
  context.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, w - 1, h - 1);
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
  const { context } = itto;
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
 * @param {string|object} image - id of the asset or the image asset to draw
 * @param {number} x - x coordinate to draw the image at
 * @param {number} y - y coordinate to draw the image at
 * @param {number} sx - top-left x coordinate of the portion of the source image to draw
 * @param {number} sy - top-left y coordinate of the portion of the source image to draw
 * @param {object} w - width of the portion of the source image to draw.
 *  If undefined, defaults to the natural width of the image.
 * @param {number} h - height of the portion of the source image to draw.
 *  If undefined, defaults to the natural height of the image.
 * @param {object} options - additional options
 * @param {number[]} options.origin - array of [x, y] coordinates of the origin.
 *  Defaults to the top left corner [0, 0]
 * @param {number[]} options.anchor - array of [x, y] coordinates to apply scale / rotation from
 * @param {number[]} options.scale - array of [x, y] scale factor values
 * @param {number} options.angle - angle to rotate the image by
 */
const image = (image, x, y, sx, sy, w, h, { origin = [0, 0], anchor, scale, angle } = {}) => {
  const { context, assets } = itto;
  const src = typeof image === "string" ? assets[image] : image;
  if (!(src instanceof Image)) {
    console.warn("Attempting to draw a non-image object");
    return;
  }

  if (w === undefined) {
    w = src.width;
  }
  if (h === undefined) {
    h = src.height;
  }

  context.save();
  context.translate(Math.round(x - origin[0]), Math.round(y - origin[1]));
  if (scale !== undefined || angle !== undefined) {
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
    context.drawImage(src, sx, sy, w, h, 0, 0, w, h);
  } else {
    context.drawImage(src, 0, 0, w, h);
  }
  context.restore();
};

/**
 * Draws text on screen
 * @param {string} text - the text to draw
 * @param {number} x - x coordinate to draw the text at
 * @param {number} y - y coordinate to draw the text at
 * @param {number|string} color - text color
 * @param {object} options - additional options
 * @param {number} options.size - text size, in px
 * @param {string} options.align - horizontal text alignment (left / center / right, default left)
 * @param {string} options.font - id of the font asset to use
 */
const text = (text, x, y, color = 0, { size = 8, align = "left", font = "itto" } = {}) => {
  const { context } = itto;
  context.font = `${size}px ${font}`;
  context.textAlign = align;
  context.fillStyle = parseColor(color);
  context.fillText(text, Math.round(x), Math.round(y));
};

export { cls, image as image, line, rect, circle, text };
