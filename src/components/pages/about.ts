import share from '../../share'
import gradient from '../generic/gradient'
import './about.css'

const aboutEl = document.querySelector('.about') as HTMLDivElement
const notificationEl = document.querySelector('.notification') as HTMLDivElement
const shareButtonEl = document.querySelector(
  '.about__share-button',
) as HTMLButtonElement

shareButtonEl.onclick = () => {
  share({
    onCopy: () => {
      notificationEl.classList.add('notification--show')
      setTimeout(
        () => notificationEl.classList.remove('notification--show'),
        2000,
      )
    },
    title: document.title,
    url: location.host,
  })
}

aboutEl.addEventListener('animationend', () => {
  if (aboutEl.classList.contains('about--transition-in')) {
    aboutEl.classList.remove('about--transition-in')
  } else if (aboutEl.classList.contains('about--transition-out')) {
    aboutEl.classList.add('page--hidden')
    aboutEl.classList.remove('about--transition-out')
  }
})

class About {
  public transitionIn() {
    aboutEl.classList.remove('page--hidden')
    aboutEl.classList.remove('about--transition-out')
    aboutEl.classList.add('about--transition-in')
    gradient.setGradient(2)
  }

  public transitionOut() {
    aboutEl.classList.remove('about--transition-in')
    aboutEl.classList.add('about--transition-out')
  }
}

export default new About()
