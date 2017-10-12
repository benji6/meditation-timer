import Hammer from 'hammerjs'
import NoSleep from 'nosleep.js'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import {startBell, stopBell} from './bell'
import './index.css'
import './components/control-button.css'
import './components/gradient.css'
import './components/header.css'
import './components/progress.css'
import './components/timer-button.css'
import {resetProgress, setProgress} from './components/progress'

const noSleep = new NoSleep()

const timersEl = document.querySelector('.timers')
const display = document.querySelector('.display')
const gradientBottom = document.querySelector('.gradient--bottom')
const playPauseEl = document.querySelector('.control-button--pause')

display.addEventListener('animationend', () => {
  if (display.classList.contains('display--transition-out')) {
    display.classList.add('display--hidden')
    display.classList.remove('display--transition-out')
    resetProgress()
  } else {
    display.classList.remove('display--transition-in')
  }
})
timersEl.addEventListener('animationend', () => {
  if (timersEl.classList.contains('timers--transition-out')) {
    timersEl.classList.add('timers--hidden')
    timersEl.classList.remove('timers--transition-out')
  }
})

let isRunning = false

const stopTimer = () => {
  isRunning = false
  noSleep.disable()
}

let displayTime
let totalTime

const startTimer = duration => {
  const startTime = Date.now()

  if (duration) totalTime = duration / 1000
  else duration = displayTime * 1000

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

    setProgress(totalTime, displayTime)
  }

  requestAnimationFrame(renderLoop)
}

for (const el of document.querySelectorAll('.timer-button')) {
  el.onclick = () => {
    location.hash = 'timer'
    gradientBottom.classList.add('gradient--bottom--hidden')
    display.classList.remove('display--hidden')
    timersEl.classList.add('timers--transition-out')
    display.classList.add('display--transition-in')

    startTimer(Number(el.getAttribute('data-time')) * 1000 * 60)
  }
}

playPauseEl.onclick = () => {
  if (playPauseEl.classList.contains('control-button--pause')) {
    stopTimer()
    playPauseEl.classList.remove('control-button--pause')
    playPauseEl.classList.add('control-button--play')
  } else {
    startTimer()
    playPauseEl.classList.remove('control-button--play')
    playPauseEl.classList.add('control-button--pause')
  }
}

const navigateBack = history.back.bind(history)

const handleStop = () => {
  stopTimer()
  stopBell()
  playPauseEl.classList.remove('control-button--play')
  playPauseEl.classList.add('control-button--pause')
  gradientBottom.classList.remove('gradient--bottom--hidden')
  timersEl.classList.remove('timers--hidden')
  display.classList.add('display--transition-out')
  noSleep.disable()
}

document.querySelector('.control-button--stop').onclick = navigateBack

const mc = new Hammer.Manager(document.querySelector('.display'), {
  recognizers: [
    [Hammer.Swipe, {direction: Hammer.DIRECTION_RIGHT}],
  ],
})

mc.on('swiperight', navigateBack)

window.onhashchange = ({newURL, oldURL}) => {
  if (newURL.indexOf('#timer') === -1 && oldURL.indexOf('#timer') !== -1) {
    handleStop()
  }
}

window.onload = () => {
  if (location.href.indexOf('#') !== -1) {
    history.replaceState('', document.title, location.pathname)
  }
}

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}
