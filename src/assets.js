const loadAsset = (path) =>
  new Promise((resolve) => {
    if (path.endsWith("png")) {
      const image = new Image();
      image.onload = resolve(image);
      image.src = path;
    }
  });

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
