import state from '../../state'
import gradient from '../generic/gradient'
import './custom-timer.css'

const customTimerEl = document.querySelector('.custom-timer') as HTMLDivElement
const deleteButtonEl = document.querySelector(
  '.custom-timer__delete-button',
) as HTMLButtonElement
const numberButtonEls = document.querySelectorAll(
  '.custom-timer__number-button',
) as NodeListOf<HTMLButtonElement>
const startButtonEl = document.querySelector(
  '.custom-timer__start-button',
) as HTMLButtonElement
const timeDisplayEl = document.querySelector(
  '.custom-timer__time-display',
) as HTMLOutputElement

const numberToText = (n: number): string => `${n < 600 ? '0' : ''}${n / 60}m`

const handleNumberInput = (n: number): void => {
  if (n !== 0) deleteButtonEl.disabled = startButtonEl.disabled = false
  const { customTimerTime } = state

  if (customTimerTime >= 600) return

  state.customTimerTime = customTimerTime * 10 + n * 60

  timeDisplayEl.value = numberToText(state.customTimerTime)
}

const handleBackspace = () => {
  const { customTimerTime } = state

  if (customTimerTime < 600) {
    state.customTimerTime = 0
    deleteButtonEl.disabled = startButtonEl.disabled = true
  } else {
    state.customTimerTime = Math.floor(customTimerTime / 600) * 60
  }

  timeDisplayEl.value = numberToText(state.customTimerTime)
}

deleteButtonEl.onclick = handleBackspace

for (let i = 0; i < numberButtonEls.length; i++) {
  const numberButtonEl = numberButtonEls[i]
  const n = Number(numberButtonEl.getAttribute('data-val'))
  numberButtonEl.onclick = () => handleNumberInput(n)
}

customTimerEl.addEventListener('animationend', () => {
  if (customTimerEl.classList.contains('custom-timer--transition-in')) {
    customTimerEl.classList.remove('custom-timer--transition-in')
  } else if (
    customTimerEl.classList.contains('custom-timer--transition-out-left') ||
    customTimerEl.classList.contains('custom-timer--transition-out-right') ||
    customTimerEl.classList.contains('custom-timer--transition-out-zoom')
  ) {
    timeDisplayEl.value = numberToText((state.customTimerTime = 0))
    deleteButtonEl.disabled = startButtonEl.disabled = true
    customTimerEl.classList.add('page--hidden')
    customTimerEl.classList.remove('custom-timer--transition-out-left')
    customTimerEl.classList.remove('custom-timer--transition-out-right')
    customTimerEl.classList.remove('custom-timer--transition-out-zoom')
  }
})

export enum CustomTimerTransitionTypes {
  zoom,
  left,
  right,
}

let isListeningToKeys = false

class CustomTimer {
  constructor() {
    startButtonEl.onclick = () => this.onStart()
  }

  public transitionIn() {
    gradient.setGradient(4)
    customTimerEl.classList.remove('page--hidden')
    customTimerEl.classList.remove('custom-timer--transition-out-left')
    customTimerEl.classList.remove('custom-timer--transition-out-right')
    customTimerEl.classList.remove('custom-timer--transition-out-zoom')
    customTimerEl.classList.add('custom-timer--transition-in')
    isListeningToKeys = true
  }

  public transitionOut(type: CustomTimerTransitionTypes) {
    isListeningToKeys = false
    customTimerEl.classList.remove('custom-timer--transition-in')
    switch (type) {
      case CustomTimerTransitionTypes.left:
        customTimerEl.classList.add('custom-timer--transition-out-left')
        return
      case CustomTimerTransitionTypes.right:
        customTimerEl.classList.add('custom-timer--transition-out-right')
        return
      default:
        customTimerEl.classList.add('custom-timer--transition-out-zoom')
    }
  }

  public onStart() {
    // empty
  }
}

const customTimer = new CustomTimer()

document.onkeydown = e => {
  if (!isListeningToKeys) return
  const { keyCode } = e
  if (keyCode >= 48 && keyCode <= 57) {
    handleNumberInput(keyCode - 48)
  } else if (keyCode === 8 || keyCode === 46) {
    handleBackspace()
  } else if (keyCode === 13 || keyCode === 32) {
    customTimer.onStart()
  }
}

export default customTimer
