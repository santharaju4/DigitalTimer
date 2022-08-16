// Write your code here

import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonIsDisabled = timeElapsedInSeconds > 0
    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonIsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonIsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(prevState => {
      const {timeElapsedInSeconds, timerLimitInMinutes} = prevState
      console.log(timeElapsedInSeconds)
      console.log(timerLimitInMinutes)
      return {timeElapsedInSeconds: 0, timerLimitInMinutes: 25}
    })
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickButton = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const timerIsCompleted = timeElapsedInSeconds === timerLimitInMinutes

    if (timerIsCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getRenderTimerControl = () => {
    const {isTimerRunning} = this.state

    const StartOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const StartOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-control-container">
        <button
          type="button"
          className="timer-control-btn"
          onClick={this.onClickButton}
        >
          <img
            src={StartOrPauseImageUrl}
            alt={StartOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-control-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-control-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-control-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const Minutes = Math.floor(totalRemainingSeconds / 60)
    const Seconds = Math.floor(totalRemainingSeconds % 60)
    console.log(Minutes)
    console.log(Seconds)
    const stringifiedMinutes = Minutes > 9 ? Minutes : `0${Minutes}`
    const stringifiedSeconds = Seconds > 9 ? Seconds : `0${Seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    const statusValue = isTimerRunning ? 'Running' : 'Paused'

    const controlsTimer = this.getRenderTimerControl()
    const limitSetTimer = this.renderTimerLimitController()

    const timeDisplay = this.getElapsedSecondsInTimeFormat()

    return (
      <div className="app-container">
        <h1 className="title">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-timer-container">
              <h1 className="elapsed-time">{timeDisplay}</h1>
              <p className="statusValue">{statusValue}</p>
            </div>
          </div>
          <div className="controls-container">
            {controlsTimer}
            {limitSetTimer}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
