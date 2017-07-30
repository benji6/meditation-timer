const audioContext = new AudioContext

const bufferPromise = fetch('meditation-bell.mp3')
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .catch(err => console.error('meditation-bell error:', err)) // eslint-disable-line no-console

export const startBell = () => bufferPromise
  .then(buffer => {
    const bufferSource = audioContext.createBufferSource()
    bufferSource.connect(audioContext.destination)
    bufferSource.buffer = buffer
    bufferSource.onended = () => bufferSource.disconnect()
    bufferSource.start()
  })
