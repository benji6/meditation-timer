import './header.css'
import {getCssVar} from '../../utils'

const buttonEls = document.querySelectorAll('.header__button') as NodeListOf<HTMLButtonElement>

const aboutButtonEl = buttonEls[1]
const settingsButtonEl = buttonEls[0]
const headerEl = document.querySelector('.header') as HTMLDivElement
const homeButtonEl = document.createElement('button')
const timerButtonCount = document.querySelectorAll('.timer-button').length

homeButtonEl.className = 'header__button'
homeButtonEl.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`

let isTransitioning = true

const aboutTransitionTime = () => parseInt(getCssVar('--timing-base'))
const homeTransitionTime = () => aboutTransitionTime() + parseInt(getCssVar('--timing-faster')) * timerButtonCount

class Header {
  constructor () {
    aboutButtonEl.onclick = () => {
      if (isTransitioning) return
      isTransitioning = true
      setTimeout(() => isTransitioning = false, aboutTransitionTime())
      this.onClickAbout()
    }
    settingsButtonEl.onclick = () => this.onClickSettings()
    homeButtonEl.onclick = () => {
      if (isTransitioning) return
      isTransitioning = true
      setTimeout(() => isTransitioning = false, homeTransitionTime())
      this.onClickHome()
    }
    setTimeout(() => isTransitioning = false, homeTransitionTime())
  }

  switchAboutToHome () {
    this.hideSettingsButton()
    aboutButtonEl.remove()
    headerEl.appendChild(homeButtonEl)
  }

  switchHomeToAbout () {
    homeButtonEl.remove()
    headerEl.appendChild(aboutButtonEl)
    this.showSettingsButton()
  }

  switchHomeToSettings () {
    homeButtonEl.remove()
    headerEl.insertAdjacentElement('afterbegin', settingsButtonEl)
    this.showAboutButton()
  }

  switchSettingsToHome () {
    this.hideAboutButton()
    settingsButtonEl.remove()
    headerEl.insertAdjacentElement('afterbegin', homeButtonEl)
  }

  hideControls () {
    headerEl.classList.add('header--hide-controls')
  }

  showControls () {
    headerEl.classList.remove('header--hide-controls')
  }

  public onClickAbout () {}
  public onClickHome () {}
  public onClickSettings () {}

  private hideAboutButton () {
    aboutButtonEl.classList.add('header__button--hide')
    aboutButtonEl.disabled = true
  }

  private hideSettingsButton () {
    settingsButtonEl.classList.add('header__button--hide')
    settingsButtonEl.disabled = true
  }

  private showAboutButton () {
    aboutButtonEl.disabled = false
    aboutButtonEl.classList.remove('header__button--hide')
  }

  private showSettingsButton () {
    settingsButtonEl.disabled = false
    settingsButtonEl.classList.remove('header__button--hide')
  }
}

export default new Header
