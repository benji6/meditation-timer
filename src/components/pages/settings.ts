import gradient from '../generic/gradient'
import state from '../../state'
import './settings.css'

const settingsEl = document.querySelector('.settings') as HTMLDivElement
const toggleSilentButton = document.querySelector('.toggle-silent-button') as HTMLButtonElement
const noisyEl = document.querySelector('.toggle-silent-button__noisy') as SVGElement
const silentEl = document.querySelector('.toggle-silent-button__silent') as SVGElement
const silentMsgEl = document.querySelector('.settings__silent-msg') as HTMLParagraphElement

const silentOffMsg = 'Silent mode is off'
const silentOnMsg = 'Silent mode is on'

silentEl.remove()
silentMsgEl.textContent = silentOffMsg

toggleSilentButton.onclick = () => {
  const {isSilent} = state
  if (isSilent) {
    silentEl.remove()
    toggleSilentButton.appendChild(noisyEl)
    silentMsgEl.textContent = silentOffMsg
  } else {
    noisyEl.remove()
    toggleSilentButton.appendChild(silentEl)
    silentMsgEl.textContent = silentOnMsg
  }
  state.isSilent = !isSilent
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
