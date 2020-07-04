//this works pretty well...

import React, {Component} from "react";

class TestThree extends Component{
  constructor(props){
    super(props);

    this.state = {
      countDownTime: 0,
      countDownOn: false,
      inputField: "",
    }

  }

  

  startCountdown = (e) => {
    let time = parseInt(this.state.inputField);

    this.setState({
      countDownTime: time,
      countDownOn: true,
      inputField: ""
    });
    
  }

  updateInput = (e) => {
    this.setState({
      inputField: e.target.value
    })
  }

  stopCountdown = () => {
    console.log("stopcountdown");
    this.setState({countDownOn: false});
  }

  render(){
    

    return(
      <div>
        <div>Time Left: {
            this.state.countDownOn ? 
            <CountDown time={this.state.countDownTime} done={this.stopCountdown} /> :
            0
          }
        </div>
        <input 
          type="text" 
          value={this.state.inputField} 
          onChange={this.updateInput} />
        <button onClick={this.startCountdown}>da start button</button>
        
      </div>
    )
  }
}

class CountDown extends Component{
  constructor(props){
    super(props);

    this.state = {
      countDownTime: 0,
      countDownTimeStart: 0
    }

  }

  calculateTimeLeft = () => {
    const difference = +new Date("2020-01-01") - +new Date();
    let timeLeft = {};

    if(difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  componentDidMount(){

    let thetime = this.props.time;
    this.setState({
      countDownTime: thetime,
      countDownTimeStart: +new Date()
    });
    this.timer = setInterval(() => {
      if(this.state.countDownTime > 0){
        this.setState({
          countDownTime: this.state.countDownTime - 1
        });
      } else {
        this.props.done();
      }
      
    }, 1000);
    
  }

  componentWillUnmount(){
    // console.log("clearing interval");
    clearInterval(this.timer);
  }

  render(){
    
    return(
      <span>{this.state.countDownTime}</span>
    )
  }
}

export default TestThree;