import './header.css'

const aboutButtonEl = document.querySelector('.header__about') as HTMLButtonElement
const aboutSettingsEl = document.querySelector('.header__settings') as HTMLButtonElement
const headerEl = document.querySelector('.header') as HTMLDivElement

class Header {
  constructor () {
    aboutButtonEl.onclick = () => this.onClickAbout()
    aboutSettingsEl.onclick = () => this.onClickSettings()
  }

  hideControls () {
    headerEl.classList.add('header--hide-controls')
  }

  showControls () {
    headerEl.classList.remove('header--hide-controls')
  }

  public onClickAbout () {}
  public onClickSettings () {}
}

export default new Header
