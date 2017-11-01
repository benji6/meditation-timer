import './dim-button.css'

const stopButtonEl = document.querySelector('.dim-button') as HTMLButtonElement

class DimButton {
  constructor () {
    stopButtonEl.onclick = () => this.onClick()
  }

  public onClick () {}
}

export default new DimButton
