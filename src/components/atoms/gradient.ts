import './gradient.css'

const gradientEl = document.querySelector('.gradient') as HTMLDivElement

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
