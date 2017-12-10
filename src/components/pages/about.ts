import gradient from '../atoms/gradient'
import './about.css'

const aboutEl = document.querySelector('.about') as HTMLDivElement

aboutEl.addEventListener('animationend', () => {
  if (aboutEl.classList.contains('about--transition-in')) {
    aboutEl.classList.remove('about--transition-in')
  } else if (aboutEl.classList.contains('about--transition-out')) {
    aboutEl.classList.add('page--hidden')
    aboutEl.classList.remove('about--transition-out')
  }
})

class About {
  transitionIn () {
    aboutEl.classList.remove('page--hidden')
    aboutEl.classList.remove('about--transition-out')
    aboutEl.classList.add('about--transition-in')
    gradient.setGradient(2)
  }

  transitionOut () {
    aboutEl.classList.remove('about--transition-in')
    aboutEl.classList.add('about--transition-out')
  }
}

export default new About
