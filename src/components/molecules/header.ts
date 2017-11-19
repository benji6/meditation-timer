import './header.css'
import {getCssVar} from '../../utils'

const buttonEls = document.querySelectorAll('.header__button') as NodeListOf<HTMLButtonElement>

const aboutButtonEl = buttonEls[1]
const settingsButtonEl = buttonEls[0]
const headerEl = document.querySelector('.header') as HTMLDivElement
const homeButton = document.createElement('button')
const timerButtonCount = document.querySelectorAll('.timer-button').length

homeButton.className = 'header__button'
homeButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`

let isTransitioning = true

const aboutTransitionTime = () => parseInt(getCssVar('--timing-base'))
const homeTransitionTime = () => aboutTransitionTime() + parseInt(getCssVar('--timing-fast')) * timerButtonCount

class Header {
  constructor () {
    aboutButtonEl.onclick = () => {
      if (isTransitioning) return
      isTransitioning = true
      setTimeout(() => isTransitioning = false, aboutTransitionTime())
      this.onClickAbout()
    }
    settingsButtonEl.onclick = () => this.onClickSettings()
    homeButton.onclick = () => {
      if (isTransitioning) return
      isTransitioning = true
      setTimeout(() => isTransitioning = false, homeTransitionTime())
      this.onClickHome()
    }
    setTimeout(() => isTransitioning = false, homeTransitionTime())
  }

  switchAboutToHome () {
    aboutButtonEl.remove()
    headerEl.appendChild(homeButton)
  }

  switchHomeToAbout () {
    homeButton.remove()
    headerEl.appendChild(aboutButtonEl)
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
}

export default new Header
