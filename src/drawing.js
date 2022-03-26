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
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.stroke();

  // // faster bresenham algo
  // context.fillStyle = color;
  // const dx = Math.abs(x1 - x0);
  // const sx = x0 < x1 ? 1 : -1;
  // const dy = Math.abs(y1 - y0);
  // const sy = y0 < y1 ? 1 : -1;
  // var error,
  //   len,
  //   rev,
  //   count = dx;
  // context.beginPath();
  // if (dx > dy) {
  //   error = dx / 2;
  //   rev = x0 > x1 ? 1 : 0;
  //   if (dy > 1) {
  //     error = 0;
  //     count = dy - 1;
  //     do {
  //       len = (error / dy + 2) | 0;
  //       context.rect(x0 - len * rev, y0, len, 1);
  //       x0 += len * sx;
  //       y0 += sy;
  //       error -= len * dy - dx;
  //     } while (count--);
  //   }
  //   if (error > 0) {
  //     context.rect(x0, y1, x1 - x0, 1);
  //   }
  // } else if (dx < dy) {
  //   error = dy / 2;
  //   rev = y0 > y1 ? 1 : 0;
  //   if (dx > 1) {
  //     error = 0;
  //     count--;
  //     do {
  //       len = (error / dx + 2) | 0;
  //       context.rect(x0, y0 - len * rev, 1, len);
  //       y0 += len * sy;
  //       x0 += sx;
  //       error -= len * dx - dy;
  //     } while (count--);
  //   }
  //   if (error > 0) {
  //     context.rect(x1, y0, 1, y1 - y0);
  //   }
  // } else {
  //   do {
  //     context.rect(x0, y0, 1, 1);
  //     x0 += sx;
  //     y0 += sy;
  //   } while (count--);
  // }
  // context.fill();
};

const rect = (x, y, w, h, color, border) => {
  const { context } = itto;
  if (border) {
    context.strokeStyle = color;
    context.strokeRect(x + 0.5, y + 0.5, w, h);
  } else {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  }
};

const circ = (x, y, r, color, border) => {
  const { context } = itto;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2);
  if (border) {
    context.strokeStyle = color;
    context.stroke();
  } else {
    context.fillStyle = color;
    context.fill();
  }
};

const print = (text, x = 0, y = 0, color = "black", size = 8, font = "itto") => {
  const { context } = itto;
  context.font = `${size}px ${font}`;
  context.fillStyle = color;
  context.fillText(text, x, y);
};

export { cls, line, rect, circ, print };
