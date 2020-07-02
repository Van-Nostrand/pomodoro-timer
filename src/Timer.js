import React, {Component} from "react";
import "./Timer.css";

export default class Timer extends Component{
  constructor(props){
    super(props);

    this.state = {
      remainingTime: 0,
      minutes: 0,
      seconds: 0,
      inputNumber: 0,
      clock: 0
    }
  }

  trigger = (e) => {
    let timer ;
    if(this.state.inputNumber === 0) timer = 1000;
    else timer = this.state.inputNumber * 1000;
    setTimeout(() => console.log("times up!"), timer);

    // setInterval(() => {
    //   this.setState({
    //     clock: Date.now()
    //   });
    // }, length);
  }

  startCountdown = (e) => {
    let time;
    if(this.state.inputNumber === 0) time = 1000;
    else time = this.state.inputNumber * 1000;
    setInterval(() => this.setState({remainingTime: this.state.inputNumber - 1000}), 1000);
  }

  updateInput = (e) => {
    //doesn't allow characters other than numbers
    //easier than using input[type=number]
    if(isNaN(Number(e.target.value))) return;
    else {
      console.log(e.target.value);
      this.setState({inputNumber: e.target.value});
    }
  }

  render(){
    return(
      <div id="timer-container">
        <div id="clock">{this.state.remainingTime}</div>
        <input
          name="time-input"
          type="text"
          onChange={this.updateInput}
          value={this.state.inputNumber} />
        <button onClick={this.trigger}>Start Timer</button>
      </div>
    )
  }
}