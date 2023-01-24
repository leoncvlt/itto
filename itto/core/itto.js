import { loadAssets } from "./assets";
import defaultSettings from "./settings";

// add input events listeners
import { register } from "./input";
register();

const preload = async () => {
  // load the deafult font (04b11) as an embedded base64 font
  const font = new FontFace(
    "itto",
    "url(data:application/font-woff2;charset=utf-8;base64,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)"
  );
  await font.load();
  document.fonts.add(font);
};

let _data = {};
let _current = null;
let instances = 0;

/**
 * Itto object
 */
const itto = {
  /**
   * The canvas element the game is being drawn in
   * @type {HTMLElement}
   */
  get canvas() {
    return _data[_current].canvas;
  },
  /**
   * Drawing context of the canvas element the game is being drawn in
   * @type {CanvasContext}
   */
  get context() {
    return _data[_current].context;
  },
  /**
   * Width of the game area, in pixels
   * @type {number}
   */
  get width() {
    return _data[_current].width;
  },
  /**
   * Height of the game area, in pixels
   * @type {number}
   */
  get height() {
    return _data[_current].height;
  },
  /**
   * Delta time since last frame
   * @type {number}
   */
  get delta() {
    return _data[_current].delta;
  },
  /**
   * Time elapsed since the game start, in ticks (1 second = 60 ticks)
   * @type {number}
   */
  get elapsed() {
    return Math.floor(_data[_current].elapsed);
  },
  /**
   * Whether the game assets have finished loading or not
   * @type {boolean}
   */
  get ready() {
    return _data[_current].ready;
  },
  /**
   * The array of colors
   * @type {Array<number>}
   */
  get palette() {
    return _data[_current].palette;
  },
  /**
   * The loaded assets, in a key:data format
   * @type {object}
   */
  get assets() {
    return _data[_current].assets;
  },
  /**
   * Initializes the game and starts the game loop
   * @memberof itto
   * @method game
   * @ignore
   * @param {Object} game
   * @param {Settings} game.settings - an object containing the game settings
   * @param {function} game.init - a function which runs on game start
   * @param {function} game.update - a function which runs on every game tick
   * @param {function} game.draw - a function which runs on every animation frame
   */
  game: async ({ settings, init, update, draw }) => {
    // apply the game settings on top of the default ones
    settings = { ...defaultSettings, ...settings };
    const [width, height] = settings.size;

    // generate a random uuid to associate the game's data with the canvas
    const id = instances;
    instances++;

    // initialize the game canvas
    const canvas = settings.canvas;
    canvas.dataset.itto = id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText +=
      "image-rendering: optimizeSpeed;" +
      "image-rendering: -moz-crisp-edges;" +
      "image-rendering: -o-crisp-edges;" +
      "image-rendering: -webkit-crisp-edges;" +
      "image-rendering: crisp-edges;" +
      "image-rendering: -webkit-optimize-contrast;" +
      "image-rendering: pixelated; " +
      "-ms-interpolation-mode: nearest-neighbor;";

    // get the canvas 2D context
    const canvasContext = canvas.getContext("2d");
    let context = canvasContext;
    let supersampledCanvas;

    // if super-sampling is enabled, create a separate scaled up canvas
    // and set its 2D context as the active context used for drawing
    if (settings.supersampling > 0) {
      supersampledCanvas = document.createElement("canvas");
      const scale = settings.supersampling * window.devicePixelRatio;
      supersampledCanvas.width = width * scale;
      supersampledCanvas.height = height * scale;

      context = supersampledCanvas.getContext("2d");
      context.scale(scale, scale);
    }

    context.imageSmoothingEnabled = false;
    context.textRendering = "geometricPrecision";

    // set the game parameters
    _data[id] = {
      canvas,
      context,
      width,
      height,
      delta: 0,
      elapsed: 0,
      ready: false,
      assets: settings.assets,
      palette: settings.palette,
      timescale: 1,
    };
    _current = id;

    const instance = _data[id];

    // for (const key of Object.keys(_data[id]))
    //   Object.defineProperty(itto, key, {
    //     get() {
    //       return _data[_current][key];
    //     },
    //   });
    // console.log(itto);

    await preload();

    init?.();

    let last, now, difference;
    const target = 1000 / 60;
    last = performance.now();

    // set up the game loop
    const loop = () => {
      now = performance.now();
      difference = now - last;
      last = now;

      instance.delta = (difference / target) * instance.timescale;
      instance.elapsed += instance.delta;

      // set the game's id as the current game being updated
      // this allows multiple itto games to run on the same page
      itto._current = id;

      update?.();
      draw?.();

      // if supersampled canvas is being used, draw a scaled-down version of it to the original canvas.
      // If not, all draw operations will happen on the original canvas by default.
      if (supersampledCanvas) {
        canvasContext.drawImage(
          supersampledCanvas,
          0,
          0,
          supersampledCanvas.width,
          supersampledCanvas.height,
          0,
          0,
          width,
          height
        );
      }

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);

    document.addEventListener("visibilitychange", () => {
      // reset the time counters when the page visibility change to avoid big delta swings
      // when the page becomes visible again
      now = last = performance.now();
      difference = 0;
    });

    const resize = () => {
      const parentWidth = canvas.parentElement.clientWidth;
      const parentHeight = canvas.parentElement.clientHeight;
      const offsetWidth = settings.offset[0] ?? settings.offset;
      const offsetHeight = settings.offset[1] ?? settings.offset;

      switch (settings.resize) {
        case "integer":
          let targetWidth = width;
          let targetHeight = height;
          const spareWidth = parentWidth - width;
          const spareHeight = parentHeight - height;
          if (spareWidth < 0 || spareHeight < 0) {
            return;
          }
          while (
            targetWidth + offsetWidth < spareWidth &&
            targetHeight + offsetHeight < spareHeight
          ) {
            targetWidth = targetWidth + width;
            targetHeight = targetHeight + height;
          }
          canvas.style.width = `${targetWidth}px`;
          canvas.style.height = `${targetHeight}px`;
          break;

        case "linear":
          const targetAspect = width / height;
          const currentAspect = parentWidth / parentHeight;
          if (targetAspect > currentAspect) {
            canvas.style.width = "100%";
            canvas.style.height = "auto";
          } else {
            canvas.style.width = "auto";
            canvas.style.height = "100%";
          }
          break;

        default:
          return;
      }
    };

    window.addEventListener("resize", resize);
    resize();

    await loadAssets(settings.assets, instance.assets);
    instance.ready = true;
  },
};

export { itto };
