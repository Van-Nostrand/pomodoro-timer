import React, {Component} from "react";
import "./App.css";
import TimeCopPonent from "./TimeCopPonent";
import Goals from "./Goals";
import NoteList from "./NoteList";

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
   
    }
  }
  
  render(){
  
    return(
      <div id="main-div">
          
        <TimeCopPonent />
      </div>
    )
  }
}

export default App;