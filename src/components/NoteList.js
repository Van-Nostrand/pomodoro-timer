import React, { useState } from "react";
import SecretInput from './SecretInput/SecretInput';

export default function NoteList() {
 
  const [ notes, setNotes ] = useState([]);
  const [ inputValue, setInputValue ] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    setNotes(oldNotes => [...oldNotes, inputValue]);
    setInputValue("");
  }

  const handleChange = (val) => {
    setInputValue(val);
  }

  const handleSubmit = () => {
    
  }

  const removeNote = (noteId) => {
    let newNotes = [...notes];
    newNotes = newNotes.filter((note, i) => i !== noteId);
    setNotes(newNotes);
  }

  let listItems = notes.map((item, i) => <li className="note-item" key={`notekey${i}`}>{item}</li>);

  return (
    <div className="note-list">
      <h4>NOTELIST</h4>
      <form className="note-form" onSubmit={addNote}>

      {/* SecretInput.defaultProps = {
        maxInputLength: 4, 
        elementWidth: 50,
        elementHeight: 20,
        passValue: () => console.log("pass input value to parent here"), 
        inputValue: "NO VAL FOUND", 
        handleBlur: () => console.log("no blur handler?"),
        inputType: 'number',
        displayMode: false
      } */}

        <SecretInput 
          maxInputLength={50}
          elementWidth={70}
          elementHeight={7.5}
          passValue={handleChange}
          inputValue={inputValue}
          inputType={"text"}
          displayMode={false}
        />
        {/* <input 
          className="note-input" 
          type="text" 
          onChange={handleChange} 
          value={inputValue}
        /> */}
        <button className="note-submit-button" type="submit"  >
          SUBMIT
        </button>
        
      </form>
      <ul className="notelist-list">
        {listItems}
      </ul>
    </div>
  )
}