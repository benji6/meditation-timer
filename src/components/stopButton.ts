import './stop-button.css'

const stopButtonEl = document.querySelector('.stop-button') as HTMLButtonElement

class StopButton {
  constructor () {
    stopButtonEl.onclick = () => this.onStop()
  }

  public onStop () {}
}

export default new StopButton
