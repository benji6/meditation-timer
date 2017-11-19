import * as Hammer from 'hammerjs'
import dimButton from '../atoms/dimButton'
import gradient from '../atoms/gradient'
import playPauseButton from '../atoms/playPauseButton'
import stopButton from '../atoms/stopButton'
import {resetProgress} from '../molecules/progress'
import '../atoms/dimmer-overlay.css'
import '../molecules/progress.css'
import './timer.css'

const dimmerOverlayEl = document.querySelector('.dimmer-overlay') as HTMLDivElement
const timerEl = document.querySelector('.timer') as HTMLDivElement

timerEl.addEventListener('animationend', () => {
  if (timerEl.classList.contains('timer--transition-out')) {
    timerEl.classList.add('timer--hidden')
    timerEl.classList.remove('timer--transition-out')
    resetProgress()
    playPauseButton.stop()
  } else {
    timerEl.classList.remove('timer--transition-in')
  }
})

dimmerOverlayEl.onclick = () => dimmerOverlayEl.classList.remove('dimmer-overlay--on')
dimButton.onClick = () => dimmerOverlayEl.classList.add('dimmer-overlay--on')

const mc = new Hammer.Manager(timerEl, {
  recognizers: [
    [Hammer.Swipe, {direction: Hammer.DIRECTION_RIGHT}],
  ],
})

class Timer {
  constructor () {
    const handleStop = () => this.onStop()
    stopButton.onStop = handleStop
    mc.on('swiperight', handleStop)
  }

  finish () {
    playPauseButton.disable()
    dimmerOverlayEl.classList.remove('dimmer-overlay--on')
  }

  onStop () {}

  transitionIn () {
    timerEl.classList.remove('timer--hidden')
    timerEl.classList.add('timer--transition-in')
    gradient.setGradient(1)
  }

  transitionOut () {
    timerEl.classList.add('timer--transition-out')
    dimmerOverlayEl.classList.remove('dimmer-overlay--on')
  }
}

export default new Timer
