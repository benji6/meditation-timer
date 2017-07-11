var isRunning = false
var controls = document.querySelector('.js-controls')
var display = document.querySelector('.js-display')
var startButton = document.querySelector('.js-start-button')
var stopButton = document.querySelector('.js-stop-button')
var timeOutputEl = document.querySelector('.js-time-output')
var timeInput = document.querySelector('.js-time-input')

startButton.onclick = function () {
  var duration = Number(timeInput.value) * 1000 * 60
  var t0 = Date.now()
  var displayTime
  display.style.display = 'block'
  controls.style.display = 'none'
  isRunning = true

  requestAnimationFrame(function renderLoop () {
    if (!isRunning) return
    requestAnimationFrame(renderLoop)
    var newDisplayTime = Math.round((duration + t0 - Date.now()) / 1000)
    if (newDisplayTime === displayTime) return
    if (newDisplayTime === 0) isRunning = false
    displayTime = newDisplayTime
    timeOutputEl.innerText =
      ('0' + Math.floor(displayTime / 60)).slice(-2)
      + ':'
      + ('0' + displayTime % 60).slice(-2)
  })
}

stopButton.onclick = function () {
  isRunning = false
  display.style.display = 'none'
  controls.style.display = 'block'
}
