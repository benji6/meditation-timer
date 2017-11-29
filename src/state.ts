export enum ProgressDisplay {
  digital,
  radial,
}

interface State {
  displayTime: number
  timerActive: boolean,
  totalTime: number,
  progressDisplay: ProgressDisplay,
}

export default {
  displayTime: 0,
  timerActive: false,
  totalTime: 0,
  progressDisplay: ProgressDisplay.radial,
} as State
