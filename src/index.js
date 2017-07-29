import NoSleep from 'nosleep.js'

const noSleep = new NoSleep()

const timersEl = document.querySelector('.timers')
const display = document.querySelector('.display')
const timeOutputEl = document.querySelector('.time-output')
const gradientBottom = document.querySelector('.gradient-bottom')
const playPauseEl = document.querySelector('.play-pause')

let isRunning = false

const stopTimer = () => {
  isRunning = false
  noSleep.disable()
}

let displayTime

const startTimer = ({duration = displayTime * 1000, startTime}) => {
  noSleep.enable()
  isRunning = true
  playPauseEl.disabled = false

  const renderLoop = () => {
    if (!isRunning) return
    requestAnimationFrame(renderLoop)
    const newDisplayTime = Math.round((duration + startTime - Date.now()) / 1000)
    if (newDisplayTime === displayTime) return
    if (newDisplayTime === 0) {
      stopTimer()
      playPauseEl.disabled = true
    }
    displayTime = newDisplayTime
    timeOutputEl.innerText =
    ('0' + Math.floor(displayTime / 60)).slice(-2) +
    ':' +
    ('0' + displayTime % 60).slice(-2)
  }

  requestAnimationFrame(renderLoop)
}

for (const el of document.querySelectorAll('.timer-button')) {
  el.onclick = () => {
    gradientBottom.classList.add('gradient-bottom--hidden')
    display.classList.remove('display--hidden')
    timersEl.classList.add('timers--hidden')

    startTimer({
      duration: Number(el.getAttribute('data-time')) * 1000 * 60,
      startTime: Date.now(),
    })
  }
}

playPauseEl.onclick = () => {
  if (playPauseEl.classList.contains('play-pause--playing')) {
    stopTimer()
    playPauseEl.classList.remove('play-pause--playing')
  } else {
    startTimer({startTime: Date.now()})
    playPauseEl.classList.add('play-pause--playing')
  }
}

document.querySelector('.stop-button').onclick = () => {
  stopTimer()
  playPauseEl.classList.add('play-pause--playing')
  gradientBottom.classList.remove('gradient-bottom--hidden')
  display.classList.add('display--hidden')
  timersEl.classList.remove('timers--hidden')
  noSleep.disable()
}
