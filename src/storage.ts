let isSilent = localStorage.isSilent === 'true'

export default {
  get isSilent() {
    return isSilent
  },
  set isSilent(val: boolean) {
    localStorage.isSilent = val
    isSilent = val
  },
}
