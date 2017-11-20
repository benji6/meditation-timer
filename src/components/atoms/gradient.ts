import './gradient.css'
import {getCssVar, setCssVar} from '../../utils'

const rotationInterval = 1000 * 60 * 10

const gradientEl = document.querySelector('.gradient') as HTMLDivElement

let gradientAngle = getCssVar('--gradient-angle')

const render = () => {
  requestAnimationFrame(render)

  const ratioOfDayCompleted = Date.now() % rotationInterval / rotationInterval
  const newGradientAngle = (ratioOfDayCompleted * 360).toFixed(0) + 'deg'

  if (newGradientAngle === gradientAngle) return

  gradientAngle = newGradientAngle

  setCssVar('--gradient-angle', gradientAngle)
}

render()

class Gradient {
  setGradient (n: number) {
    const newLayerEl = document.createElement('div')
    newLayerEl.classList.add('gradient__layer', `gradient__layer--${n}`)
    newLayerEl.addEventListener('animationend', () => {
      (document.querySelector('.gradient__layer') as HTMLDivElement).remove()
    })
    gradientEl.appendChild(newLayerEl)
  }
}

export default new Gradient
