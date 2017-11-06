import gradient from '../atoms/gradient'
import dimButton from '../atoms/dimButton'
import playPauseButton from '../atoms/playPauseButton'
import stopButton from '../atoms/stopButton'
import '../atoms/dimmer-overlay.css'
import '../molecules/progress.css'
import './timer.css'

const dimmerOverlayEl = document.querySelector('.dimmer-overlay') as HTMLDivElement
const timerEl = document.querySelector('.timer') as HTMLDivElement

dimmerOverlayEl.onclick = () => dimmerOverlayEl.classList.remove('dimmer-overlay--on')
dimButton.onClick = () => dimmerOverlayEl.classList.add('dimmer-overlay--on')

class Timer {
  constructor () {
    stopButton.onStop = () => this.onStop()
  }

  finish () {
    playPauseButton.disable()
    dimmerOverlayEl.classList.remove('dimmer-overlay--on')
  }

  onStop () {}

  transitionIn () {
    timerEl.classList.remove('timer--hidden')
    timerEl.classList.add('timer--transition-in')
    gradient.setState(1)
  }

  transitionOut () {
    timerEl.classList.add('timer--transition-out')
    dimmerOverlayEl.classList.remove('dimmer-overlay--on')
    gradient.setState(0)
  }
}

export default new Timer
