import React from "react";
import ReactDOM from "react-dom";
import TimeCopPonent from "./src/components/TimeCopPonent";
import NoteList from './src/components/NoteList';
import "./index.css";
import "./src/scss/main.scss";

// ReactDOM.render(
//   <div className="dev-wrapper">
//     <SecretInput />
//   </div>
//   , 
//   document.getElementById("root"));
// ReactDOM.render(<TimeCopPonent />, document.getElementById("root"));
ReactDOM.render(<NoteList />, document.getElementById("root"));