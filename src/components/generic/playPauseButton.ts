import './play-pause-button.css'

const playPauseEl = document.querySelector(
  '.play-pause-button',
) as HTMLButtonElement

class PlayPauseButton {
  private isPaused: boolean

  constructor() {
    this.isPaused = false

    playPauseEl.onclick = () => {
      playPauseEl.classList.toggle('play-pause-button--paused')
      playPauseEl.classList.toggle('play-pause-button--playing')

      if (this.isPaused) this.onPlay()
      else this.onPause()

      this.isPaused = !this.isPaused
    }
  }

  public disable() {
    playPauseEl.disabled = true
  }

  public enable() {
    playPauseEl.disabled = false
  }

  public onPause() {
    // empty
  }

  public onPlay() {
    // empty
  }

  public stop() {
    this.isPaused = false
    playPauseEl.classList.remove('play-pause-button--playing')
    playPauseEl.classList.add('play-pause-button--paused')
  }
}

export default new PlayPauseButton()
