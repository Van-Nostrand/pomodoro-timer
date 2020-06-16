import React, {Component} from "react";
import "./NoteList.css";

export default class NoteList extends Component{
  constructor(props){
    super(props);

    this.state = {
      newNoteValue: "",
      notes: []
    }
  }

  uploadNote = (e) => {
    e.preventDefault();
    let newNotes = [...this.state.notes];
    newNotes.push(this.state.newNoteValue);
    this.setState({notes: newNotes, newNoteValue: ""});
  }

  handleChange = (e) => {
    this.setState({newNoteValue: e.target.value});
  }

  handleSubmit = () => {
    
  }

  removeNote = (noteId) => {
    let newNotes = [...this.state.notes];
    newNotes = newNotes.filter((note, i) => i !== noteId);
    this.setState({notes: newNotes});
  }

  render(){
    let listItems = this.state.notes.map((item, i)=> <li className="note-item" key={`notekey${i}`}>{item}</li>);

    return(
      <div className="notelist-div">
        <h4>NOTELIST</h4>
        <form onSubmit={this.uploadNote}>
          <input 
            id="note-input" 
            type="text" 
            onChange={this.handleChange} 
            value={this.state.newNoteValue}
            ></input>
          <button 
            id="note-submit-button" 
            >SUBMIT</button>
          
        </form>
        <ul className="notelist-list">
          {listItems}
        </ul>
      </div>
    )
  }
}