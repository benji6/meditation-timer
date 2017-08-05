import Hammer from 'hammerjs'
import NoSleep from 'nosleep.js'
import {startBell, stopBell} from './bell'
import './index.css'
import './components/control-button.css'
import './components/gradient.css'
import './components/header.css'
import './components/time-display.css'
import './components/timer-button.css'

const noSleep = new NoSleep()

const timersEl = document.querySelector('.timers')
const display = document.querySelector('.display')
const timeOutputEl = document.querySelector('.time-display')
const gradientBottom = document.querySelector('.gradient--bottom')
const playPauseEl = document.querySelector('.control-button--pause')

display.addEventListener('animationend', () => {
  if (display.classList.contains('display--transition-out')) {
    display.classList.add('display--hidden')
    display.classList.remove('display--transition-out')
  } else {
    display.classList.remove('display--transition-in')
  }
})
timersEl.addEventListener('animationend', () => {
  if (timersEl.classList.contains('timers--transition-out')) {
    timersEl.classList.add('timers--hidden')
    timersEl.classList.remove('timers--transition-out')
  } else {
    timersEl.classList.remove('timers--transition-in')
  }
})

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
    let newDisplayTime = Math.round((duration + startTime - Date.now()) / 1000)
    if (newDisplayTime === displayTime) return
    if (newDisplayTime <= 0) {
      newDisplayTime = 0
      stopTimer()
      playPauseEl.disabled = true
      startBell()
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
    gradientBottom.classList.add('gradient--bottom--hidden')
    display.classList.remove('display--hidden')
    timersEl.classList.add('timers--transition-out')
    display.classList.add('display--transition-in')

    startTimer({
      duration: Number(el.getAttribute('data-time')) * 1000 * 60,
      startTime: Date.now(),
    })
  }
}

playPauseEl.onclick = () => {
  if (playPauseEl.classList.contains('control-button--pause')) {
    stopTimer()
    playPauseEl.classList.remove('control-button--pause')
    playPauseEl.classList.add('control-button--play')
  } else {
    startTimer({startTime: Date.now()})
    playPauseEl.classList.remove('control-button--play')
    playPauseEl.classList.add('control-button--pause')
  }
}

const handleStop = () => {
  stopTimer()
  stopBell()
  playPauseEl.classList.remove('control-button--play')
  playPauseEl.classList.add('control-button--pause')
  gradientBottom.classList.remove('gradient--bottom--hidden')
  timersEl.classList.remove('timers--hidden')
  display.classList.add('display--transition-out')
  timersEl.classList.add('timers--transition-in')
  noSleep.disable()
}

document.querySelector('.control-button--stop').onclick = handleStop

const mc = new Hammer.Manager(document.querySelector('.time-display'), {
  recognizers: [
    [Hammer.Swipe, {direction: Hammer.DIRECTION_RIGHT}],
  ],
})

mc.on('swiperight', handleStop)
