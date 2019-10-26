import '../generic/dimmer-overlay.css'
import gradient from '../generic/gradient'
import playPauseButton from '../generic/playPauseButton'
import { resetProgress } from '../generic/progress'
import '../generic/progress.css'
import './timer.css'

const dimButtonEl = document.querySelector<HTMLButtonElement>('.dim-button')!
const stopButtonEl = document.querySelector<HTMLButtonElement>('.stop-button')!

const dimmerOverlayEl = document.querySelector<HTMLDivElement>(
  '.dimmer-overlay',
)!
const timerEl = document.querySelector<HTMLDivElement>('.timer')!

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
dimButtonEl.onclick = () => dimmerOverlayEl.classList.add('dimmer-overlay--on')

class Timer {
  constructor() {
    stopButtonEl.onclick = () => this.onStop()
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
