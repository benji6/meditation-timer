/// <reference path="./typings/nosleep.js.d.ts" />

import * as Hammer from 'hammerjs'
import * as NoSleep from 'nosleep.js'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import {startBell, stopBell} from './bell'
import playPauseButton from './components/playPauseButton'
import stopButton from './components/stopButton'
import {resetProgress, setProgress} from './components/progress'
import state from './state'
import './vars.css'
import './index.css'
import './components/gradient.css'
import './components/header.css'
import './components/progress.css'
import './components/timer-button.css'

interface Process {
  env: {
    NODE_ENV: string,
  }
}

declare var process: Process

const noSleep = new NoSleep()

const timersEl = document.querySelector('.timers') as HTMLDivElement
const displayEl = document.querySelector('.display') as HTMLDivElement
const gradientBottomEl = document.querySelector('.gradient--bottom') as HTMLDivElement
const timerButtonEls = document.querySelectorAll('.timer-button') as NodeListOf<HTMLButtonElement>

displayEl.addEventListener('animationend', () => {
  if (displayEl.classList.contains('display--transition-out')) {
    displayEl.classList.add('display--hidden')
    displayEl.classList.remove('display--transition-out')
    resetProgress()
  } else {
    displayEl.classList.remove('display--transition-in')
  }
})
timersEl.addEventListener('animationend', () => {
  if (timersEl.classList.contains('timers--transition-out')) {
    timersEl.classList.add('timers--hidden')
    timersEl.classList.remove('timers--transition-out')
  }
})

const stopTimer = () => {
  state.timerActive = false
  noSleep.disable()
}

const startTimer = (durationParam: number | null) => {
  const startTime = Date.now()
  const duration = durationParam === null ? state.displayTime * 1000 : durationParam

  if (durationParam !== null) state.totalTime = durationParam / 1000

  noSleep.enable()
  state.timerActive = true
  playPauseButton.enable()

  const renderLoop = () => {
    if (!state.timerActive) return
    requestAnimationFrame(renderLoop)
    let newDisplayTime = Math.round((duration + startTime - Date.now()) / 1000)
    if (newDisplayTime === state.displayTime) return
    if (newDisplayTime <= 0) {
      newDisplayTime = 0
      stopTimer()
      playPauseButton.disable()
      startBell()
    }
    state.displayTime = newDisplayTime

    setProgress(state.totalTime, state.displayTime)
  }

  requestAnimationFrame(renderLoop)
}

for (let i = 0; i < timerButtonEls.length; i++) {
  const timerButton = timerButtonEls[i]

  timerButton.onclick = () => {
    location.hash = 'timer'
    gradientBottomEl.classList.add('gradient--bottom--hidden')
    displayEl.classList.remove('display--hidden')
    timersEl.classList.add('timers--transition-out')
    displayEl.classList.add('display--transition-in')

    startTimer(Number(timerButton.getAttribute('data-time')) * 1000 * 60)
  }
}

playPauseButton.onPlay = startTimer.bind(null, null)
playPauseButton.onPause = stopTimer

const navigateBack = history.back.bind(history)

const handleStop = () => {
  stopTimer()
  stopBell()
  playPauseButton.stop()
  gradientBottomEl.classList.remove('gradient--bottom--hidden')
  timersEl.classList.remove('timers--hidden')
  displayEl.classList.add('display--transition-out')
  noSleep.disable()
}

stopButton.onStop = navigateBack

const mc = new Hammer.Manager(displayEl, {
  recognizers: [
    [Hammer.Swipe, {direction: Hammer.DIRECTION_RIGHT}],
  ],
})

mc.on('swiperight', navigateBack)

window.onhashchange = ({newURL, oldURL}) => {
  if (newURL === null || oldURL === null) return
  if (newURL.indexOf('#timer') === -1 && oldURL.indexOf('#timer') !== -1) {
    handleStop()
  }
}

if (location.href.indexOf('#') !== -1) {
  history.replaceState('', document.title, location.pathname)
}

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}
