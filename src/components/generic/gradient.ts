import { getCssVar, setCssVar } from '../../utils'
import './gradient.css'

const rotationInterval = 1000 * 60 * 30

const gradientEl = document.querySelector('.gradient') as HTMLDivElement

let gradientAngle = getCssVar('--gradient-angle')

const render = () => {
  requestAnimationFrame(render)

  const ratioOfDayCompleted = (Date.now() % rotationInterval) / rotationInterval
  const newGradientAngle = (ratioOfDayCompleted * 360).toFixed(0) + 'deg'

  if (newGradientAngle === gradientAngle) return

  gradientAngle = newGradientAngle

  setCssVar('--gradient-angle', gradientAngle)
}

render()

type GradientRange = 0 | 1 | 2 | 3 | 4

class Gradient {
  public setGradient(n: GradientRange) {
    const newLayerEl = document.createElement('div')
    newLayerEl.classList.add('gradient__layer', `gradient__layer--${n}`)
    newLayerEl.addEventListener('animationend', () => {
      ;(document.querySelector('.gradient__layer') as HTMLDivElement).remove()
    })
    gradientEl.appendChild(newLayerEl)
  }
}

export default new Gradient()
