import gradient from '../generic/gradient'
import './settings.css'

const settingsEl = document.querySelector('.settings') as HTMLDivElement

settingsEl.addEventListener('animationend', () => {
  if (settingsEl.classList.contains('settings--transition-in')) {
    settingsEl.classList.remove('settings--transition-in')
  } else if (settingsEl.classList.contains('settings--transition-out')) {
    settingsEl.classList.add('page--hidden')
    settingsEl.classList.remove('settings--transition-out')
  }
})

class Settings {
  transitionIn () {
    settingsEl.classList.remove('page--hidden')
    settingsEl.classList.remove('settings--transition-out')
    settingsEl.classList.add('settings--transition-in')
    gradient.setGradient(3)
  }

  transitionOut () {
    settingsEl.classList.remove('settings--transition-in')
    settingsEl.classList.add('settings--transition-out')
  }
}

export default new Settings
