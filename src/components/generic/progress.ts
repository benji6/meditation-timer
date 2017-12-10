import state, {ProgressDisplay} from '../../state'

const progressEl = document.querySelector('.progress') as HTMLDivElement
const meterEl = document.querySelector('.progress__meter') as SVGElement
const circleEl = document.querySelector('.progress__circle') as SVGCircleElement
const circleBackgroundEl = document.querySelector('.progress__circle-background') as SVGCircleElement
const timeEl = document.querySelector('.progress__time') as HTMLDivElement

const radius = 1 / 3
const circumference = 2 * radius * Math.PI

circleEl.setAttribute('stroke-dasharray', String(circumference))
circleEl.setAttribute('r', String(radius))
circleBackgroundEl.setAttribute('r', String(radius))

export const setProgress = (totalTime: number, remainingTime: number) => {
  const offset = remainingTime / totalTime * circumference
  circleEl.setAttribute('stroke-dashoffset', String(offset))

  timeEl.innerText =
    ('0' + Math.floor(remainingTime / 60)).slice(-2) +
    ':' +
    ('0' + remainingTime % 60).slice(-2)
}

export const resetProgress = () => {
  circleEl.classList.remove('progress__circle--transitioning')
  setProgress(1, 1)
  circleEl.classList.add('progress__circle--transitioning')
}

progressEl.onclick = () => {
  if (state.progressDisplay === ProgressDisplay.digital) {
    state.progressDisplay = ProgressDisplay.radial
    timeEl.remove()
    progressEl.appendChild(meterEl)
    return
  }
  meterEl.remove()
  progressEl.appendChild(timeEl)
  state.progressDisplay = ProgressDisplay.digital
}

resetProgress()
timeEl.remove()
