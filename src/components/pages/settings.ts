import storage from '../../storage'
import gradient from '../generic/gradient'
import './settings.css'

const settingsEl = document.querySelector<HTMLDivElement>('.settings')!
const toggleSilentButton = document.querySelector<HTMLButtonElement>(
  '.toggle-silent-button',
)!
const noisyEl = document.querySelector<SVGElement>(
  '.toggle-silent-button__noisy',
)!
const silentEl = document.querySelector<SVGElement>(
  '.toggle-silent-button__silent',
)!
const silentMsgEl = document.querySelector<HTMLParagraphElement>(
  '.settings__silent-msg',
)!

const silentOffMsg = 'Silent mode is off'
const silentOnMsg = 'Silent mode is on'

if (storage.isSilent) {
  noisyEl.remove()
  silentMsgEl.textContent = silentOnMsg
} else {
  silentEl.remove()
  silentMsgEl.textContent = silentOffMsg
}

toggleSilentButton.onclick = () => {
  const { isSilent } = storage
  if (isSilent) {
    silentEl.remove()
    toggleSilentButton.appendChild(noisyEl)
    silentMsgEl.textContent = silentOffMsg
  } else {
    noisyEl.remove()
    toggleSilentButton.appendChild(silentEl)
    silentMsgEl.textContent = silentOnMsg
  }
  storage.isSilent = !isSilent
}

settingsEl.addEventListener('animationend', () => {
  if (settingsEl.classList.contains('settings--transition-in')) {
    settingsEl.classList.remove('settings--transition-in')
  } else if (settingsEl.classList.contains('settings--transition-out')) {
    settingsEl.classList.add('page--hidden')
    settingsEl.classList.remove('settings--transition-out')
  }
})

class Settings {
  public transitionIn() {
    settingsEl.classList.remove('page--hidden')
    settingsEl.classList.remove('settings--transition-out')
    settingsEl.classList.add('settings--transition-in')
    gradient.setGradient(3)
  }

  public transitionOut() {
    settingsEl.classList.remove('settings--transition-in')
    settingsEl.classList.add('settings--transition-out')
  }
}

export default new Settings()
