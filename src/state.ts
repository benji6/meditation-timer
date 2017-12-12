export enum ProgressDisplay {
  digital,
  radial,
}

interface State {
  displayTime: number
  customTimerTime: number
  isSilent: boolean
  timerActive: boolean
  totalTime: number
  progressDisplay: ProgressDisplay
}

export default {
  displayTime: 0,
  customTimerTime: 0,
  isSilent: false,
  timerActive: false,
  totalTime: 0,
  progressDisplay: ProgressDisplay.radial,
} as State
