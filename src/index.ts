import OfflinePluginRuntime from 'offline-plugin/runtime'
import './components/generic/controls.css'
import './components/generic/dim-button.css'
import header from './components/generic/header'
import './components/generic/icon-button.css'
import './components/generic/notification.css'
import './components/generic/page.css'
import playPauseButton from './components/generic/playPauseButton'
import './components/generic/stop-button.css'
import customTimer from './components/pages/customTimer'
import home from './components/pages/home'
import timer from './components/pages/timer'
import stateMachine from './stateMachine'
import './vars/border.css'
import './vars/color.css'
import './vars/component.css'
import './vars/easing.css'
import './vars/space.css'
import './vars/time.css'
import './vars/typography.css'
import './keyframes.css'
import './global.css'

interface IProcess {
  env: {
    NODE_ENV: string
  }
}

declare let process: IProcess

header.onClickAbout = () => stateMachine.toAbout()
header.onClickHome = () => stateMachine.toHome()
header.onClickSettings = () => stateMachine.toSettings()
home.onClickCustomTimerButton = () => stateMachine.toCustomTimer()
home.onClickTimerButton = (t: number) => stateMachine.startTimer(t)
customTimer.onStart = () => stateMachine.startTimer(customTimer.time)
playPauseButton.onPlay = () => stateMachine.resumeTimer()
playPauseButton.onPause = () => stateMachine.pauseTimer()
timer.onStop = () => stateMachine.stopTimer()

window.onhashchange = ({
  newURL,
  oldURL,
}: {
  newURL: string | null
  oldURL: string | null
}) => {
  if (newURL === null || oldURL === null || newURL.includes('#')) return
  if (stateMachine.stopTimer) return stateMachine.stopTimer()
  if (stateMachine.toHome) stateMachine.toHome()
}

if (location.href.includes('#'))
  history.replaceState('', document.title, location.pathname)

if (process.env.NODE_ENV === 'production') OfflinePluginRuntime.install()
