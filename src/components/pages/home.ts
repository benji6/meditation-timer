import gradient from '../atoms/gradient'
import './home.css'
import '../atoms/timer-button.css'

const homeEl = document.querySelector('.home') as HTMLDivElement

homeEl.addEventListener('animationend', () => {
  if (homeEl.classList.contains('home--transition-out')) {
    homeEl.classList.add('home--hidden')
    homeEl.classList.remove('home--transition-out')
  }
})

class Home {
  transitionIn () {
    homeEl.classList.remove('home--hidden')
    homeEl.classList.remove('home--transition-out')
    gradient.setGradient(0)
  }

  transitionOut () {
    homeEl.classList.add('home--transition-out')
  }
}

export default new Home
