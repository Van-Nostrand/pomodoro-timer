import React from "react";
import ReactDOM from "react-dom";
import TimeCopPonent from "./src/components/TimeCopPonent";
import TimeSetInterface from "./src/components/TimeSetInterface";
import TimeCopPonent2 from "./src/components/TimeCopPonent2";
import SecretInputBox from "./src/components/SecretInputBox";
import "./index.css";
import "./src/scss/main.scss";

ReactDOM.render(
  <div className="dev-wrapper">
    <SecretInputBox />
  </div>
  , 
  document.getElementById("root"));
// ReactDOM.render(<TimeCopPonent2 />, document.getElementById("root"));