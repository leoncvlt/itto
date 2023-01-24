export const set = (key, value) => {
  if (value == undefined) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const get = (key, fallback) => {
  const value = localStorage.getItem(key);
  if (value !== null) {
    return JSON.parse(value);
  } else {
    return fallback;
  }
};
