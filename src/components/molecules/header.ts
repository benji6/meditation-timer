import './header.css'

const buttonEls = document.querySelectorAll('.header__button') as NodeListOf<HTMLButtonElement>

const aboutButtonEl = buttonEls[1]
const settingsButtonEl = buttonEls[0]
const headerEl = document.querySelector('.header') as HTMLDivElement
const homeIcon = document.createElement('button')

homeIcon.className = 'header__button'
homeIcon.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`

class Header {
  constructor () {
    aboutButtonEl.onclick = () => this.onClickAbout()
    settingsButtonEl.onclick = () => this.onClickSettings()
    homeIcon.onclick = () => this.onClickHome()
  }

  switchAboutToHome () {
    aboutButtonEl.remove()
    headerEl.appendChild(homeIcon)
  }

  switchHomeToAbout () {
    homeIcon.remove()
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
