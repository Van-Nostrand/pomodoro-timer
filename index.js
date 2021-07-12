import React from "react";
import ReactDOM from "react-dom";
import TimeCopPonent from "./src/components/TimeCopPonent";
import NoteList from './src/components/NoteList';
import FakeInputElement from './src/components/SecretInput/FakeInputElement';
import "./index.css";
import "./src/scss/main.scss";
import FocusTest from './FocusTest';

ReactDOM.render(
  <div className="dev-wrapper">
    <FakeInputElement />
  </div>
  , 
  document.getElementById("root"));
// ReactDOM.render(<TimeCopPonent />, document.getElementById("root"));
// ReactDOM.render(<NoteList />, document.getElementById("root"));