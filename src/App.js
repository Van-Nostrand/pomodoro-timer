import React, {Component} from "react";

class App extends Component{
  render(){
    return(
      <div id="main-div">
        <div>
          <h2>pomodoro timer app</h2>
          <div id="wishlist">
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
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default App;