/* tslint:disable variable-name */

export enum ProgressDisplay {
  digital,
  radial,
}

class State {
  public displayTime: number = 0
  public customTimerTime: number = 0
  public timerActive: boolean = false
  public totalTime: number = 0
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
