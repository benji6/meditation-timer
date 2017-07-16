import NoSleep from 'nosleep.js'

const noSleep = new NoSleep()

const controls = document.querySelector('.controls')
const display = document.querySelector('.display')
const pauseButton = document.querySelector('.pause-button')
const playButton = document.querySelector('.play-button')
const startButton = document.querySelector('.start-button')
const stopButton = document.querySelector('.stop-button')
const timeOutputEl = document.querySelector('.time-output')
const timeInput = document.querySelector('.time-input')
const gradientBottom = document.querySelector('.gradient-bottom')

let isRunning = false

const stopTimer = () => {
  isRunning = false
  noSleep.disable()
}

let displayTime

const startTimer = ({duration = displayTime * 1000, startTime}) => {
  noSleep.enable()
  isRunning = true
  pauseButton.disabled = false

  const renderLoop = () => {
    if (!isRunning) return
    requestAnimationFrame(renderLoop)
    const newDisplayTime = Math.round((duration + startTime - Date.now()) / 1000)
    if (newDisplayTime === displayTime) return
    if (newDisplayTime === 0) {
      stopTimer()
      pauseButton.disabled = true
    }
    displayTime = newDisplayTime
    timeOutputEl.innerText =
    ('0' + Math.floor(displayTime / 60)).slice(-2) +
    ':' +
    ('0' + displayTime % 60).slice(-2)
  }

  requestAnimationFrame(renderLoop)
}

startButton.onclick = () => {
  gradientBottom.classList.add('gradient-bottom--hidden')
  display.classList.remove('display--hidden')
  controls.classList.add('controls--hidden')

  startTimer({
    duration: Number(timeInput.value) * 1000 * 60,
    startTime: Date.now(),
  })
}

pauseButton.onclick = () => {
  stopTimer()
  pauseButton.classList.add('pause-button--hidden')
  playButton.classList.remove('play-button--hidden')
}

playButton.onclick = () => {
  startTimer({startTime: Date.now()})
  pauseButton.classList.remove('pause-button--hidden')
  playButton.classList.add('play-button--hidden')
}

stopButton.onclick = () => {
  stopTimer()
  gradientBottom.classList.remove('gradient-bottom--hidden')
  display.classList.add('display--hidden')
  controls.classList.remove('controls--hidden')
  pauseButton.classList.remove('pause-button--hidden')
  playButton.classList.add('play-button--hidden')
  noSleep.disable()
}
