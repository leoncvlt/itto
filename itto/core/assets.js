import { audioContext } from "./audio";

const testExtension = (path, extensions = []) => {
  const extension = path.substring(path.lastIndexOf(".") + 1, path.length) || path;
  return extensions.includes(extension.toLowerCase());
};

const loadAsset = async (path) => {
  if (testExtension(path, ["jpg", "jpeg", "png"])) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = resolve(image);
      image.src = path;
    });
  } else if (testExtension(path, ["wav", "mp3", "ogg"])) {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
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
