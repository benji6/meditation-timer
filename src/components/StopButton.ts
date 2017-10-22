import './stop-button.css'

const stopButtonEl = document.querySelector('.stop-button') as HTMLButtonElement

export default class StopButton {
  constructor () {
    stopButtonEl.onclick = () => this.onStop()
  }

  public onStop () {}
}
