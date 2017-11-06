import './gradient.css'

const gradient0El = document.querySelector('.gradient__0') as HTMLDivElement
const gradient1El = document.querySelector('.gradient__1') as HTMLDivElement
const gradient2El = document.querySelector('.gradient__2') as HTMLDivElement

class Gradient {
  setGradient (n: number) {
    if (n === 0) {
      gradient0El.classList.remove('gradient__0--hidden')
      gradient2El.classList.add('gradient__2--hidden')
    } else if (n === 1) {
      gradient0El.classList.add('gradient__0--hidden')
      gradient1El.classList.remove('gradient__1--hidden')
      gradient2El.classList.add('gradient__2--hidden')
    } else {
      gradient0El.classList.add('gradient__0--hidden')
      gradient1El.classList.add('gradient__1--hidden')
      gradient2El.classList.remove('gradient__2--hidden')
    }
  }
}

export default new Gradient
