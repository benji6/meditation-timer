import './gradient.css'

const gradientEl = document.querySelector<HTMLDivElement>('.gradient')!

type GradientRange = 0 | 1 | 2 | 3 | 4

class Gradient {
  public setGradient(n: GradientRange) {
    const newLayerEl = document.createElement('div')
    newLayerEl.classList.add('gradient__layer', `gradient__layer--${n}`)
    newLayerEl.addEventListener('animationend', () => {
      document.querySelector<HTMLDivElement>('.gradient__layer')!.remove()
    })
    gradientEl.appendChild(newLayerEl)
  }
}

export default new Gradient()
