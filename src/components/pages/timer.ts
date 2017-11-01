import gradient from '../atoms/gradient'
import dimButton from '../atoms/dimButton'
import stopButton from '../atoms/stopButton'
import '../atoms/dimmer-overlay.css'
import '../molecules/progress.css'

const dimmerOverlayEl = document.querySelector('.dimmer-overlay') as HTMLDivElement
const displayEl = document.querySelector('.display') as HTMLDivElement

dimmerOverlayEl.onclick = () => dimmerOverlayEl.classList.remove('dimmer-overlay--on')
dimButton.onClick = () => dimmerOverlayEl.classList.add('dimmer-overlay--on')

class Timer {
  constructor () {
    stopButton.onStop = () => this.onStop()
  }

  onStop () {}

  transitionIn () {
    displayEl.classList.remove('display--hidden')
    displayEl.classList.add('display--transition-in')
    gradient.setState(1)
  }

  transitionOut () {
    displayEl.classList.add('display--transition-out')
    dimmerOverlayEl.classList.remove('dimmer-overlay--on')
    gradient.setState(0)
  }
}

export default new Timer
