/* eslint-disable @typescript-eslint/no-use-before-define */
import NoSleep from 'nosleep.js'
import playPauseButton from './components/generic/playPauseButton'
import { setProgress } from './components/generic/progress'
import bell from './bell'
import timer from './components/pages/timer'
import header from './components/generic/header'
import settings from './components/pages/settings'
import about from './components/pages/about'
import home, { HomeTransitionTypes } from './components/pages/home'
import customTimer, {
  CustomTimerTransitionTypes,
} from './components/pages/customTimer'

const noSleep = new NoSleep()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never

type ValueOf<T> = T[keyof T]

type State = ValueOf<typeof states>

const stateMachineObject = {} as UnionToIntersection<State>

const getState = (): State => Object.getPrototypeOf(stateMachineObject)
const transitionTo = (stateObject: State): UnionToIntersection<State> =>
  Object.setPrototypeOf(stateMachineObject, stateObject)

const data: {
  displayTime?: number
  totalTime?: number
} = {}

const startRenderLoop = (startTime: number) =>
  requestAnimationFrame(function renderLoop() {
    if (getState() !== states.timing) return
    requestAnimationFrame(renderLoop)
    const newDisplayTime = Math.max(
      Math.round((data.totalTime! * 1000 + startTime - Date.now()) / 1000),
      0,
    )
    if (newDisplayTime === data.displayTime) return
    if (!newDisplayTime) stateMachineObject.finishTimer()
    data.displayTime = newDisplayTime
    setProgress(data.totalTime!, data.displayTime)
  })

const states = {
  about: {
    toHome() {
      transitionTo(states.home)
      history.back()
      header.switchHomeToAbout()
      about.transitionOut()
      home.transitionIn()
    },
  },
  customTimer: {
    toAbout() {
      transitionTo(states.about)
      customTimer.transitionOut(CustomTimerTransitionTypes.left)
      location.replace('#about')
      header.switchAboutToHome()
      about.transitionIn()
    },
    toHome() {
      transitionTo(states.home)
      customTimer.transitionOut(CustomTimerTransitionTypes.zoom)
      home.transitionIn()
    },
    startTimer(timerLengthInSeconds: number) {
      transitionTo(states.timing)
      location.replace('#timer')
      header.hideControls()
      timer.transitionIn()
      customTimer.transitionOut(CustomTimerTransitionTypes.left)
      playPauseButton.enable()
      data.totalTime = timerLengthInSeconds
      noSleep.enable()
      startRenderLoop(Date.now())
    },
    toSettings() {
      transitionTo(states.settings)
      customTimer.transitionOut(CustomTimerTransitionTypes.right)
      location.replace('#settings')
      header.switchSettingsToHome()
      settings.transitionIn()
    },
  },
  finished: {
    stopTimer() {
      transitionTo(states.home)
      timer.transitionOut()
      home.transitionIn()
      header.showControls()
      history.back()
      noSleep.disable()
      bell.stop()
    },
  },
  home: {
    toAbout() {
      transitionTo(states.about)
      location.hash = 'about'
      header.switchAboutToHome()
      home.transitionOut(HomeTransitionTypes.left)
      about.transitionIn()
    },
    toCustomTimer() {
      transitionTo(states.customTimer)
      location.hash = 'custom-timer'
      home.transitionOut(HomeTransitionTypes.vertical)
      customTimer.transitionIn()
    },
    toSettings() {
      transitionTo(states.settings)
      location.hash = 'settings'
      header.switchSettingsToHome()
      home.transitionOut(HomeTransitionTypes.right)
      settings.transitionIn()
    },
    startTimer(timerLengthInSeconds: number) {
      transitionTo(states.timing)
      location.hash = 'timer'
      header.hideControls()
      home.transitionOut(HomeTransitionTypes.left)
      timer.transitionIn()
      playPauseButton.enable()
      data.totalTime = timerLengthInSeconds
      noSleep.enable()
      startRenderLoop(Date.now())
    },
  },
  paused: {
    resumeTimer() {
      transitionTo(states.timing)
      playPauseButton.enable()
      noSleep.enable()
      startRenderLoop(Date.now() - (data.totalTime! - data.displayTime!) * 1000)
    },
    stopTimer() {
      transitionTo(states.home)
      timer.transitionOut()
      header.showControls()
      history.back()
      home.transitionIn()
      noSleep.disable()
    },
  },
  settings: {
    toHome() {
      transitionTo(states.home)
      history.back()
      header.switchHomeToSettings()
      settings.transitionOut()
      home.transitionIn()
    },
  },
  timing: {
    pauseTimer() {
      transitionTo(states.paused)
    },
    finishTimer() {
      transitionTo(states.finished)
      timer.finish()
      bell.start()
    },
    stopTimer() {
      transitionTo(states.home)
      history.back()
      timer.transitionOut()
      header.showControls()
      home.transitionIn()
      noSleep.disable()
    },
  },
}

export default transitionTo(states.home)
