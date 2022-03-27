import { itto } from "./core";

const cls = (color) => {
  const { context, width, height } = itto;
  if (color) {
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
  } else {
    context.clearRect(0, 0, width, height);
  }
};

const line = (x0, y0, x1, y1, color) => {
  const { context } = itto;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(Math.round(x0), Math.round(y0));
  context.lineTo(Math.round(x1), Math.round(y1));
  context.stroke();
};

const rect = (x, y, w, h, color, border) => {
  const { context } = itto;
  if (border) {
    context.strokeStyle = color;
    context.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, w, h);
  } else {
    context.fillStyle = color;
    context.fillRect(Math.round(x), Math.round(y), w, h);
  }
};

const circ = (x, y, r, color, border) => {
  const { context } = itto;
  context.beginPath();
  context.arc(Math.round(x), Math.round(y), r, 0, Math.PI * 2);
  if (border) {
    context.strokeStyle = color;
    context.stroke();
  } else {
    context.fillStyle = color;
    context.fill();
  }
};

const spr = (spritesheet, sx = 0, sy = 0, w = 0, h = 0, x = 0, y = 0) => {
  const { context, assets } = itto;
  context.drawImage(assets[spritesheet], sx, sy, w, h, Math.round(x), Math.round(y), w, h);
};

const print = (text, x = 0, y = 0, color = "black", size = 8, font = "itto") => {
  const { context } = itto;
  context.font = `${size}px ${font}`;
  context.fillStyle = color;
  context.fillText(text, Math.round(x), Math.round(y));
};

export { cls, spr, line, rect, circ, print };
