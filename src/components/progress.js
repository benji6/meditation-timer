const progressEl = document.querySelector('.progress')
const meterEl = document.querySelector('.progress__meter')
const circleEl = document.querySelector('.progress__circle')
const timeEl = document.querySelector('.progress__time')

const radius = 1 / 3
const circumference = 2 * radius * Math.PI

circleEl.setAttribute('stroke-dasharray', circumference)
circleEl.setAttribute('r', radius)

export const setProgress = (totalTime, remainingTime) => {
  const offset = remainingTime / totalTime * circumference
  circleEl.setAttribute('stroke-dashoffset', offset)

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

timeEl.onclick = () => {
  timeEl.remove()
  progressEl.appendChild(meterEl)
}

meterEl.onclick = () => {
  meterEl.remove()
  progressEl.appendChild(timeEl)
}

resetProgress()
timeEl.remove()
