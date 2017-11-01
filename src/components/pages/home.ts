import '../atoms/timer-button.css'

const timersEl = document.querySelector('.timers') as HTMLDivElement

timersEl.addEventListener('animationend', () => {
  if (timersEl.classList.contains('timers--transition-out')) {
    timersEl.classList.add('timers--hidden')
    timersEl.classList.remove('timers--transition-out')
  }
})

class Home {
  transitionIn () {
    timersEl.classList.remove('timers--hidden')
  }

  transitionOut () {
    timersEl.classList.add('timers--transition-out')
  }
}

export default new Home
