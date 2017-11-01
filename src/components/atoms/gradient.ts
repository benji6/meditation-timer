import './gradient.css'

const gradientBottomEl = document.querySelector('.gradient--bottom') as HTMLDivElement

class Gradient {
  setState (n: number) {
    if (n === 0) gradientBottomEl.classList.remove('gradient--bottom--hidden')
    else gradientBottomEl.classList.add('gradient--bottom--hidden')
  }
}

export default new Gradient
