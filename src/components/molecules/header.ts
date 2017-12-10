import './header.css'
import {getCssVar} from '../../utils'

const buttonEls = document.querySelectorAll('.header__button') as NodeListOf<HTMLButtonElement>

const aboutButtonEl = buttonEls[1]
const settingsButtonEl = buttonEls[0]
const headerEl = document.querySelector('.header') as HTMLDivElement
const homeButtonEl = document.createElement('button')

homeButtonEl.className = 'header__button'
homeButtonEl.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`

let isTransitioning = true

const getCssTime = (s: string): number => parseFloat(getCssVar(s)) * 1000

const aboutTransitionTime = (): number => getCssTime('--timing-base')
const settingsTransitionTime = aboutTransitionTime
const homeTransitionTime = (): number => getCssTime('--timing-base') * 2

class Header {
  constructor () {
    aboutButtonEl.onclick = () => {
      if (isTransitioning) return
      isTransitioning = true
      setTimeout(() => isTransitioning = false, aboutTransitionTime())
      this.onClickAbout()
    }
    settingsButtonEl.onclick = () => {
      if (isTransitioning) return
      isTransitioning = true
      setTimeout(() => isTransitioning = false, settingsTransitionTime())
      this.onClickSettings()
    }
    homeButtonEl.onclick = () => {
      if (isTransitioning) return
      isTransitioning = true
      setTimeout(() => isTransitioning = false, homeTransitionTime())
      this.onClickHome()
    }
    setTimeout(() => isTransitioning = false, homeTransitionTime())
  }

  switchAboutToHome () {
    settingsButtonEl.disabled = true
    aboutButtonEl.remove()
    headerEl.appendChild(homeButtonEl)
  }

  switchHomeToAbout () {
    homeButtonEl.remove()
    headerEl.appendChild(aboutButtonEl)
    settingsButtonEl.disabled = false
  }

  switchHomeToSettings () {
    homeButtonEl.remove()
    headerEl.insertAdjacentElement('afterbegin', settingsButtonEl)
    aboutButtonEl.disabled = false
  }

  switchSettingsToHome () {
    aboutButtonEl.disabled = true
    settingsButtonEl.remove()
    headerEl.insertAdjacentElement('afterbegin', homeButtonEl)
  }

  hideControls () {
    aboutButtonEl.classList.add('header__button--delay')
    requestAnimationFrame(() => {
      aboutButtonEl.disabled = true
      settingsButtonEl.disabled = true
      requestAnimationFrame(() => aboutButtonEl.classList.remove('header__button--delay'))
    })
  }

  showControls () {
    settingsButtonEl.classList.add('header__button--delay')
    requestAnimationFrame(() => {
      aboutButtonEl.disabled = false
      settingsButtonEl.disabled = false
      requestAnimationFrame(() => settingsButtonEl.classList.remove('header__button--delay'))
    })
  }

  public onClickAbout () {}
  public onClickHome () {}
  public onClickSettings () {}
}

export default new Header
