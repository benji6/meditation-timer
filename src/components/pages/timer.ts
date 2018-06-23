import dimButton from '../generic/dimButton'
import '../generic/dimmer-overlay.css'
import gradient from '../generic/gradient'
import playPauseButton from '../generic/playPauseButton'
import { resetProgress } from '../generic/progress'
import '../generic/progress.css'
import stopButton from '../generic/stopButton'
import './timer.css'

const dimmerOverlayEl = document.querySelector(
  '.dimmer-overlay',
) as HTMLDivElement
const timerEl = document.querySelector('.timer') as HTMLDivElement

timerEl.addEventListener('animationend', () => {
  if (timerEl.classList.contains('timer--transition-out')) {
    timerEl.classList.add('page--hidden')
    timerEl.classList.remove('timer--transition-out')
    resetProgress()
    playPauseButton.stop()
  } else {
    timerEl.classList.remove('timer--transition-in')
  }
})

dimmerOverlayEl.onclick = () =>
  dimmerOverlayEl.classList.remove('dimmer-overlay--on')
dimButton.onClick = () => dimmerOverlayEl.classList.add('dimmer-overlay--on')

class Timer {
  constructor() {
    stopButton.onStop = () => this.onStop()
  }

  public finish() {
    playPauseButton.disable()
    dimmerOverlayEl.classList.remove('dimmer-overlay--on')
  }

  public onStop() {
    // empty
  }

  public transitionIn() {
    timerEl.classList.remove('page--hidden')
    timerEl.classList.add('timer--transition-in')
    gradient.setGradient(1)
  }

  public transitionOut() {
    timerEl.classList.add('timer--transition-out')
    dimmerOverlayEl.classList.remove('dimmer-overlay--on')
  }
}

export default new Timer()
