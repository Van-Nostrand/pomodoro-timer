import React, {Component} from "react";

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      count: 0,
      timer: "nada",
      clock: 0,
      inputNumber: 0
    }
  }

  trigger = () => {
    let length = 1000; // one second by default

    let timer = setTimeout(function(){
      console.log("times up");
    }, this.state.inputNumber);

    setInterval(() => {
      this.setState({
        clock: Date.now()
      });
    }, length);
  }


  updateInput = (e) => {
    if(isNaN(Number(e.target.value))) return;
    else {
      console.log(e.target.value);
      this.setState({inputNumber: e.target.value});
    }
  }
  render(){
    let time = this.state.clock;
    return(
      <div id="main-div">
        <div>
          <h2>pomodoro timer app</h2>
          <div id="clock">{time}</div>
          <button onClick={this.trigger}>trigger!</button>
          <input name="time-input" type="text"
     onChange={this.updateInput} value={this.state.inputNumber} />
        </div>

      </div>
    )
  }
}

export default App;

/* <div id="wishlist">
  <h5>things I'd like to implement</h5>
  <ul>
    <li>a customizable timer<br/>
      <ul>
        <li>implement sounds</li>
        <li>look into setting up a hotkey on the keyboard</li>
      </ul>
    </li>
    <li>a list of notes<br/>
      <ul>
        <li>maybe they have timestamps?</li>
      </ul>
    </li>
    <li>somewhere to write a goal, or a list of goals, or subgoals, things like that
      <br/>
      <ul>
        <li>potentially have ETA's</li>
      </ul>
    </li>
    <li>
      templates! <br/>
      <ul>
        <li>this will need a database</li>
      </ul>
    </li>
  </ul>
</div> */