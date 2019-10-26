export enum ProgressDisplay {
  digital,
  radial,
}

class State {
  public displayTime = 0
  public customTimerTime = 0
  public timerActive = false
  public totalTime = 0
  public progressDisplay: ProgressDisplay = ProgressDisplay.radial
  private _isSilent: boolean = localStorage.isSilent === 'true'

  get isSilent() {
    return this._isSilent
  }

  set isSilent(val: boolean) {
    localStorage.isSilent = val
    this._isSilent = val
  }
}

export default new State()
