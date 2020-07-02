import React, {Component} from "react";
import NoteList from "./NoteList";
import Timer from "./Timer";
import "./App.css";

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
  
  render(){
    let time = this.state.clock;
    return(
      <div id="main-div">
        <div>
          <h2>pomodoro timer app</h2>
          <Timer />
        </div>
        <div id="content-div">
          <NoteList />

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