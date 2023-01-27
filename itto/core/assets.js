import { audioContext } from "./audio";

const loadAsset = async (path) => {
  if (Array.isArray(path)) {
    const assets = await Promise.all(path.map((nestedAsset) => loadAsset(nestedAsset)));
    return assets;
  }
  if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(path)) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = resolve(image);
      image.src = path;
    });
  } else if (/\.(wav|mp3|ogg)$/i.test(path)) {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  } else {
    console.warn(`Unsure how to load asset ${path}, setting raw URL`);
    return path;
  }
};

export const loadAssets = async (assets, store) => {
  const promises = Object.entries(assets).map(
    ([key, path]) =>
      new Promise((resolve) => {
        loadAsset(path).then((asset) => {
          store[key] = asset;
          resolve();
        });
      })
  );
  await Promise.all(promises);
};
