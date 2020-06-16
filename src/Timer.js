import React, {Component} from "react";
import "./Timer.css";

export default class Timer extends Component{
  constructor(props){
    super(props);

    this.state = {
      remainingTime: 0,
      minutes: 0,
      seconds: 0
    }
  }

  render(){
    return(
      <div id="timer-container">
        <div id="remaining-time">{this.state.remainingTime}</div>
        <button>Start Timer</button>
      </div>
    )
  }
}