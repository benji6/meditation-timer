import gradient from '../atoms/gradient'
import state from '../../state'
import './custom-timer.css'

const customTimerEl = document.querySelector('.custom-timer') as HTMLDivElement
const deleteButtonEl = document.querySelector('.custom-timer__delete-button') as HTMLButtonElement
const numberButtonEls = document.querySelectorAll('.custom-timer__number-button') as NodeListOf<HTMLButtonElement>
const startButtonEl = document.querySelector('.custom-timer__start-button') as HTMLButtonElement
const timeDisplayEl = document.querySelector('.custom-timer__time-display') as HTMLOutputElement

const numberToText = (n: number): string => `${n < 600 ? '0' : ''}${n / 60}m`

deleteButtonEl.onclick = () => {
  const {customTimerTime} = state

  if (customTimerTime < 600) {
    state.customTimerTime = 0
    deleteButtonEl.disabled = startButtonEl.disabled = true
  } else {
    state.customTimerTime = Math.floor(customTimerTime / 600) * 60
  }

  timeDisplayEl.value = numberToText(state.customTimerTime)
}

for (let i = 0; i < numberButtonEls.length; i++) {
  const numberButtonEl = numberButtonEls[i]
  const n = Number(numberButtonEl.getAttribute('data-val'))
  numberButtonEl.onclick = () => {
    if (n !== 0) deleteButtonEl.disabled = startButtonEl.disabled = false
    const {customTimerTime} = state

    if (customTimerTime >= 600) return

    state.customTimerTime = customTimerTime * 10 + n * 60

    timeDisplayEl.value = numberToText(state.customTimerTime)
  }
}

customTimerEl.addEventListener('animationend', () => {
  if (customTimerEl.classList.contains('custom-timer--transition-in')) {
    customTimerEl.classList.remove('custom-timer--transition-in')
  } else if (
    customTimerEl.classList.contains('custom-timer--transition-out-slide') ||
    customTimerEl.classList.contains('custom-timer--transition-out-zoom')
  ) {
    timeDisplayEl.value = numberToText(state.customTimerTime = 0)
    deleteButtonEl.disabled = startButtonEl.disabled = true
    customTimerEl.classList.add('custom-timer--hidden')
    customTimerEl.classList.remove('custom-timer--transition-out-slide')
    customTimerEl.classList.remove('custom-timer--transition-out-zoom')
  }
})

export enum CustomTimerTransitionTypes {
  zoom,
  slide,
}

class CustomTimer {
  constructor () {
    startButtonEl.onclick = () => this.onStart()
  }

  transitionIn () {
    gradient.setGradient(4)
    customTimerEl.classList.remove('custom-timer--hidden')
    customTimerEl.classList.remove('custom-timer--transition-out-slide')
    customTimerEl.classList.remove('custom-timer--transition-out-zoom')
    customTimerEl.classList.add('custom-timer--transition-in')
  }

  transitionOut (type: CustomTimerTransitionTypes) {
    customTimerEl.classList.remove('custom-timer--transition-in')
    if (type === CustomTimerTransitionTypes.slide) {
      customTimerEl.classList.add('custom-timer--transition-out-slide')
    } else {
      customTimerEl.classList.add('custom-timer--transition-out-zoom')
    }
  }

  public onStart () {}
}

export default new CustomTimer
