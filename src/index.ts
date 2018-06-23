import NoSleep from 'nosleep.js'
import OfflinePluginRuntime from 'offline-plugin/runtime'
import bell from './bell'
import './components/generic/controls.css'
import header from './components/generic/header'
import './components/generic/icon-button.css'
import './components/generic/notification.css'
import './components/generic/page.css'
import playPauseButton from './components/generic/playPauseButton'
import { setProgress } from './components/generic/progress'
import about from './components/pages/about'
import customTimer, {
  CustomTimerTransitionTypes,
} from './components/pages/customTimer'
import home, { HomeTransitionTypes } from './components/pages/home'
import settings from './components/pages/settings'
import timer from './components/pages/timer'
import './index.css'
import './keyframes.css'
import state from './state'
import './typings/nosleep.js.d.ts'
import './vars.css'

const navigateBack = history.back.bind(history)

header.onClickAbout = () => {
  if (location.hash === '#custom-timer') location.replace('#about')
  else location.hash = 'about'
}
header.onClickHome = navigateBack
header.onClickSettings = () => {
  if (location.hash === '#custom-timer') location.replace('#settings')
  else location.hash = 'settings'
}
home.onClickCustomTimerButton = () => (location.hash = 'custom-timer')
home.onClickTimerButton = (t: number) => {
  state.displayTime = state.totalTime = t
  location.hash = 'timer'
  startTimer()
}
customTimer.onStart = () => {
  state.displayTime = state.totalTime = state.customTimerTime
  location.replace('#timer')
  startTimer()
}

interface IProcess {
  env: {
    NODE_ENV: string
  }
}

declare var process: IProcess

const noSleep = new NoSleep()

const stopTimer = () => {
  state.timerActive = false
  noSleep.disable()
}

const startTimer = () => {
  const startTime = Date.now()
  const duration = state.displayTime * 1000

  state.timerActive = true

  noSleep.enable()
  playPauseButton.enable()
  setProgress(state.totalTime, state.displayTime)

  const renderLoop = () => {
    if (!state.timerActive) return
    requestAnimationFrame(renderLoop)
    let newDisplayTime = Math.round((duration + startTime - Date.now()) / 1000)
    if (newDisplayTime === state.displayTime) return
    if (newDisplayTime <= 0) {
      newDisplayTime = 0
      stopTimer()
      timer.finish()
      bell.start()
    }
    state.displayTime = newDisplayTime

    setProgress(state.totalTime, state.displayTime)
  }

  requestAnimationFrame(renderLoop)
}

playPauseButton.onPlay = startTimer.bind(null)
playPauseButton.onPause = stopTimer

timer.onStop = navigateBack

const urlHash = (s: string) => {
  const hashIndex = s.indexOf('#')
  if (hashIndex === -1) return ''
  return s.slice(hashIndex + 1)
}

window.onhashchange = ({ newURL, oldURL }) => {
  if (newURL === null || oldURL === null) return

  const newHash = urlHash(newURL)
  const oldHash = urlHash(oldURL)

  switch (oldHash) {
    case '':
      switch (newHash) {
        case 'custom-timer':
          home.transitionOut(HomeTransitionTypes.vertical)
          break
        case 'settings':
          home.transitionOut(HomeTransitionTypes.right)
          break
        default:
          home.transitionOut(HomeTransitionTypes.left)
      }
      break
    case 'about':
      header.switchHomeToAbout()
      about.transitionOut()
      break
    case 'custom-timer':
      switch (newHash) {
        case '':
          customTimer.transitionOut(CustomTimerTransitionTypes.zoom)
          break
        case 'settings':
          customTimer.transitionOut(CustomTimerTransitionTypes.right)
          break
        default:
          customTimer.transitionOut(CustomTimerTransitionTypes.left)
      }
      break
    case 'settings':
      header.switchHomeToSettings()
      settings.transitionOut()
      break
    case 'timer':
      stopTimer()
      bell.stop()
      timer.transitionOut()
      noSleep.disable()
      header.showControls()
  }

  switch (newHash) {
    case '':
      home.transitionIn()
      break
    case 'about':
      header.switchAboutToHome()
      about.transitionIn()
      break
    case 'custom-timer':
      customTimer.transitionIn()
      break
    case 'settings':
      header.switchSettingsToHome()
      settings.transitionIn()
      break
    case 'timer':
      header.hideControls()
      timer.transitionIn()
  }
}

if (location.href.indexOf('#') !== -1) {
  history.replaceState('', document.title, location.pathname)
}

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}
