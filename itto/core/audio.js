import { itto } from "./itto";

export const audioContext = new AudioContext();
const channels = [];

/**
 * Plays a sound
 * @param {string} id - id of the asset of the sound file to play
 * @param {object} options - additional options
 * @param {number} options.channel - the channel to play the sound in.
 *  Playing a sound in a specific channel stops other sounds playing in that same channel.
 *  Call this method with a `null` src and a channel to stop the sound playing in that channel.
 * @param {number} options.volume - volume to play the sound at
 * @param {boolean} options.loop - whether to loop the sound or not
 */
export const sound = (id, { channel, volume = 1.0, loop = false } = {}) => {
  if (channels[channel]) {
    console.log(channels[channel]);
    channels[channel].stop();
    delete channels[channel];
  }
  const src = itto.assets[id];
  if (src instanceof AudioBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = src;
    source.loop = loop;
    const gain = audioContext.createGain();
    source.connect(gain).connect(audioContext.destination);
    gain.gain.value = volume;
    if (channel != undefined) {
      channels[channel] = source;
    }
    source.start();
  }
};
