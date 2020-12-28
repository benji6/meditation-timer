import storage from "./storage";

const meditationBellUri = require("./assets/meditation-bell.mp3");
const audioContext = typeof AudioContext !== "undefined" && new AudioContext();

const bufferPromise =
  audioContext &&
  fetch(meditationBellUri)
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data));

let bufferSource: AudioBufferSourceNode | null = null;

class Bell {
  public start() {
    if (!storage.isSilent && audioContext && bufferPromise) {
      bufferPromise.then((buffer: AudioBuffer) => {
        this.stop();
        bufferSource = audioContext.createBufferSource();
        bufferSource.connect(audioContext.destination);
        bufferSource.buffer = buffer;
        bufferSource.onended = this.stop;
        bufferSource.start();
      });
    }
  }

  public stop() {
    if (bufferSource) {
      bufferSource.stop();
      bufferSource.disconnect();
      bufferSource = null;
    }
  }
}

export default new Bell();
