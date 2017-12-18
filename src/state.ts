export enum ProgressDisplay {
  digital,
  radial,
}

class State {
  displayTime: number = 0
  customTimerTime: number = 0
  timerActive: boolean = false
  totalTime: number = 0
  progressDisplay: ProgressDisplay = ProgressDisplay.radial
  private _isSilent: boolean = localStorage.isSilent === 'true'

  get isSilent () {
    return this._isSilent
  }

  set isSilent (val: boolean) {
    localStorage.isSilent = val
    this._isSilent = val
  }
}

export default new State
