import './header.css'

const aboutButtonEl = document.querySelector('.header__about') as HTMLButtonElement
const headerEl = document.querySelector('.header') as HTMLDivElement

class Header {
  constructor () {
    aboutButtonEl.onclick = () => this.onClickAbout()
  }

  hideControls () {
    headerEl.classList.add('header--hide-controls')
  }

  showControls () {
    headerEl.classList.remove('header--hide-controls')
  }

  public onClickAbout () {}
}

export default new Header
