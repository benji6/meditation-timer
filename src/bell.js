const audioContext = window.AudioContext && new AudioContext

const bufferPromise = audioContext && fetch('assets/meditation-bell.mp3')
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .catch(err => console.error('meditation-bell error:', err)) // eslint-disable-line no-console

let bufferSource = null

export const stopBell = () => {
  if (bufferSource) {
    bufferSource.stop()
    bufferSource.disconnect()
    bufferSource = null
  }
}

export const startBell = () => bufferPromise && bufferPromise
  .then(buffer => {
    stopBell()
    bufferSource = audioContext.createBufferSource()
    bufferSource.connect(audioContext.destination)
    bufferSource.buffer = buffer
    bufferSource.onended = stopBell
    bufferSource.start()
  })
