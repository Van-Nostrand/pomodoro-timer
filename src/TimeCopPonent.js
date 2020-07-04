import React, {Component} from "react";
import "./TimeCopPonent.css";
import mouthpop from "./mouthpop.wav";

class TimeCopPonent extends Component{
  constructor(props){
    super(props);

    this.state = {
      countDownTime: 0,
      countDownOn: false,
      hoursField: "",
      minutesField: "",
      secondsField: "",
      errorMessage: "",
      timeObject: {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  }

  startCountdown = (e) => {
    let time = parseInt(this.state.minutesField);

    let hours = this.state.hoursField !== "" ? parseInt(this.state.hoursField) : 0;
    let minutes = this.state.minutesField !== "" ? parseInt(this.state.minutesField) : 0;
    let seconds = this.state.secondsField !== "" ? parseInt(this.state.secondsField) : 0;

    let timeObject = {
      hours,
      minutes,
      seconds 
    }

    this.setState({
      countDownTime: time,
      countDownOn: true,
      hoursField: "",
      minutesField: "",
      secondsField: "",
      errorMessage: "",
      timeObject
    });
  }

  updateMinutes = (e) => {
    
    if(/^\d+$/.test(e.target.value) || e.target.value === ""){
      this.setState({
        minutesField: e.target.value,
        errorMessage: ""
      })
    } 
    else {
      console.log("no");
      this.setState({
        errorMessage: "only enter numbers"
      })
    }
  }

  updateSeconds = (e) => {
    if(/^\d+$/.test(e.target.value) || e.target.value === ""){
      this.setState({
        secondsField: e.target.value, 
        errorMessage: ""
      });
    } 
    else {
      this.setState({
        errorMessage: "only enter numbers", 
        secondsField: 0
      });
    }
  }

  updateHours = (e) => {
    if(/^\d+$/.test(e.target.value) || e.target.value === ""){
      this.setState({
        hoursField: e.target.value, 
        errorMessage: ""
      });
    }
    else {
      this.setState({
        errorMessage: "only enter numbers"
      })
    }
  }

  stopCountdown = () => {
    console.log("stopcountdown");
    // this.playSound();
    this.setState({
      countDownOn: false
    });
  }

  playSound = () => {
    document.querySelector("audio").play();
  }

  render(){
    let blankCountdown = <span>
      Hours: 0<br />
      Minutes: 0<br />
      Seconds: 0<br /> 
      Milliseconds: 0<br />
    </span>
    return(
      <div>
        <div>
          Time Left<br /> { this.state.countDownOn ? 
            <CountDown 
              time={this.state.countDownTime} 
              timeObject={this.state.timeObject}
              playSound={this.playSound}
              done={this.stopCountdown} /> 
            : blankCountdown
          }
        </div>
        <div className="time-input-div">
          <label htmlFor="hours-input">Hours</label>
          <input 
            type="text" 
            label="hours-input"
            value={this.state.hoursField} 
            onChange={this.updateHours} />
        </div>
        <div className="time-input-div">
          <label htmlFor="minutes-input">Minutes</label>
          <input 
            type="text" 
            label="minutes-input"
            value={this.state.minutesField} 
            onChange={this.updateMinutes} />
        </div>
        <div className="time-input-div">
          <label htmlFor="seconds-input">Seconds</label>
          <input 
            type="text"
            name="seconds-input"
            value={this.state.secondsField}
            onChange={this.updateSeconds} />
        </div>
        <button onClick={this.startCountdown}>da start button</button>
        <button onClick={this.stopCountdown}>da stop button</button>
        <button onClick={this.playSound}>play da sound</button>

        <div>{this.state.errorMessage}</div>
        <audio src={mouthpop}></audio>
      </div>
    )
  }
}


class CountDown extends Component{
  constructor(props){
    super(props);

    this.state = {
      countDownTime: 0,
      countDownTimeStart: 0,
      countDownMS: 0,
      startingObject: this.props.timeObject,
      newTimeObject: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      },
      timeObject: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        absolute: 0
      }
    }
  }

  calculateTimePassed = () => {
    const timeNow = +new Date();
    const difference = timeNow - this.state.countDownTimeStart;
    const goalDiff = this.state.countDownTimeGoal - timeNow;

    let timeObject = {};
    let newTimeObject = {};

    if(difference > 0) {

      newTimeObject = {
        hours: Math.floor((goalDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((goalDiff / 1000 / 60) % 60),
        seconds: Math.floor((goalDiff / 1000) % 60),
        milliseconds: goalDiff
      }

      timeObject = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milliseconds: difference,
        absolute: timeNow
      };
    }

    return [timeObject, newTimeObject];
  };

  componentDidMount(){
    const INTERVAL_TIME = 200;
    const BUFFER = 1000;

    let thetime = this.props.time;

    let ms = 0;
    ms = ms + (this.state.startingObject.hours * 60 * 60 * 1000);
    ms = ms + (this.state.startingObject.minutes * 60 * 1000);
    ms = ms + (this.state.startingObject.seconds * 1000);

    let hereNow = +new Date();

    this.setState({
      countDownTime: thetime,
      countDownTimeStart: hereNow,
      countDownTimeGoal: ms + hereNow + BUFFER,
      countDownMS: ms
    });
    this.timer = setInterval(() => {
      
      let timeArr = this.calculateTimePassed();
      let timeObject = timeArr[0];
      let newTimeObject = timeArr[1];
      if(newTimeObject.milliseconds > 0){
        this.setState({
          timeObject,
          newTimeObject
        });
      } 
      else if (newTimeObject.milliseconds <= 0){
        this.props.playSound();
        this.props.done();
      }
    }, INTERVAL_TIME);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
  
    return(
      <span>
        Hours: {this.state.newTimeObject.hours}<br />
        Minutes: {this.state.newTimeObject.minutes}<br />
        Seconds: {this.state.newTimeObject.seconds}<br /> 
        Milliseconds: {this.state.newTimeObject.milliseconds}<br />
      </span>
    )
  }
}

export default TimeCopPonent;