import { itto } from "./itto";

const parseColor = (color) => {
  let value = itto.palette[color] || color;
  if (Number.isInteger(value)) {
    value = "#" + value.toString(16).padStart(6, "0");
  }
  return value;
};

const cls = (color) => {
  const { context, width, height } = itto;
  if (color !== null) {
    context.fillStyle = parseColor(color);
    context.fillRect(0, 0, width, height);
  } else {
    context.clearRect(0, 0, width, height);
  }
};

const line = (x0, y0, x1, y1, color = 0) => {
  const { context } = itto;
  context.strokeStyle = parseColor(color);
  context.beginPath();
  context.moveTo(Math.round(x0), Math.round(y0));
  context.lineTo(Math.round(x1), Math.round(y1));
  context.stroke();
};

const rect = (x, y, w, h, color = 0, border = false) => {
  const { context } = itto;
  if (!border) {
    context.fillStyle = parseColor(color);
    context.fillRect(Math.round(x), Math.round(y), w, h);
  }
  context.strokeStyle = parseColor(color);
  context.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, w, h);
};

const circ = (x, y, r, color = 0, border = false) => {
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

const spr = (spritesheet, sx = 0, sy = 0, w = 0, h = 0, x = 0, y = 0) => {
  const { context, assets } = itto;
  context.drawImage(assets[spritesheet], sx, sy, w, h, Math.round(x), Math.round(y), w, h);
};

const print = (text, x = 0, y = 0, color = 0, size = 8, font = "itto") => {
  const { context } = itto;
  context.font = `${size}px ${font}`;
  context.fillStyle = parseColor(color);
  context.fillText(text, Math.round(x), Math.round(y));
};

export { cls, spr, line, rect, circ, print };
