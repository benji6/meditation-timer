import NoSleep from 'nosleep.js'

const noSleep = new NoSleep()
let isRunning = false
const controls = document.querySelector('.js-controls')
const display = document.querySelector('.js-display')
const startButton = document.querySelector('.js-start-button')
const stopButton = document.querySelector('.js-stop-button')
const timeOutputEl = document.querySelector('.js-time-output')
const timeInput = document.querySelector('.js-time-input')
const gradientBottom = document.querySelector('.gradient-bottom')

startButton.onclick = () => {
  noSleep.enable()
  gradientBottom.classList.add('gradient-bottom--hidden')
  const duration = Number(timeInput.value) * 1000 * 60
  const t0 = Date.now()
  let displayTime
  display.style.display = 'block'
  controls.style.display = 'none'
  isRunning = true

  const renderLoop = () => {
    if (!isRunning) return
    requestAnimationFrame(renderLoop)
    const newDisplayTime = Math.round((duration + t0 - Date.now()) / 1000)
    if (newDisplayTime === displayTime) return
    if (newDisplayTime === 0) isRunning = false
    displayTime = newDisplayTime
    timeOutputEl.innerText =
      ('0' + Math.floor(displayTime / 60)).slice(-2) +
      ':' +
      ('0' + displayTime % 60).slice(-2)
  }

  requestAnimationFrame(renderLoop)
}

stopButton.onclick = () => {
  isRunning = false
  gradientBottom.classList.remove('gradient-bottom--hidden')
  display.style.display = 'none'
  controls.style.display = 'block'
  noSleep.disable()
}
