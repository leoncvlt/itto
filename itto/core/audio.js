import { itto } from "./itto";

export const audioContext = new AudioContext();

export const sound = (src, volume = 1.0, loop = false) => {
  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  source.connect(gain).connect(audioContext.destination);
  source.buffer = itto.assets[src];
  source.loop = loop;
  gain.gain.value = volume;
  source.start();
};
