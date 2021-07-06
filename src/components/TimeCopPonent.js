import React, {useState, useEffect} from "react";
import mouthpop from "../assets/mouthpop.wav";
import Countdown from "./Countdown";
import TimeSetInterface from "./TimeSetInterface";

export default function TimeCopPonent(){

  const [countDownOn, setCountdownOn] = useState(false);
  const [hoursField, setHoursField] = useState("");
  const [minutesField, setMinutesField] = useState("");
  const [secondsField, setSecondsField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timeObject, setTimeObject] = useState({hours: 0, minutes: 0, seconds: 0});

  const startCountdown = (e) => {

    // let time = parseInt(minutesField);
    let hours = hoursField !== "" ? parseInt(hoursField) : 0;
    let minutes = minutesField !== "" ? parseInt(minutesField) : 0;
    let seconds = secondsField !== "" ? parseInt(secondsField) : 0;

    let timeObject = {
      hours,
      minutes,
      seconds 
    }
    
    setCountdownOn(true);
    setHoursField("");
    setMinutesField("");
    setSecondsField("");
    setErrorMessage("");
    setTimeObject(timeObject);
  }

  const updateMinutes = (e) => {
    if(/^\d+$/.test(e.target.value) || e.target.value === ""){
      setMinutesField(e.target.value);
      setErrorMessage("");
    } 
    else {
      console.log("error in updateMinutes");
      setErrorMessage("only enter numbers");
    }
  }

  const updateSeconds = (e) => {
    if(/^\d+$/.test(e.target.value) || e.target.value === ""){
      setSecondsField(e.target.value);
      setErrorMessage("");
    } 
    else {
      console.log("error in updateSeconds");
      setSecondsField(0);
      setErrorMessage("only enter numbers")
    }
  }

  const updateHours = (e) => {
    if(/^\d+$/.test(e.target.value) || e.target.value === ""){
      setHoursField(e.target.value);
      setErrorMessage("");
    }
    else {
      console.log("error in updateHours");
      setErrorMessage("only enter numbers");
    }
  }

  const stopCountdown = () => {
    console.log("stopcountdown");
    setCountdownOn(false);
  }

  const playSound = () => {
    document.querySelector("audio").play();
  }

  let blankCountdown = (
    <span>
      Hours: 0<br />
      Minutes: 0<br />
      Seconds: 0<br /> 
      Milliseconds: 0<br />
    </span>
  );

  return(
    <div className="pomodoro-app">
      <div className="pomodoro-app__countdown">
        Time Left
        <br /> 
        { 
          countDownOn ? 
            <Countdown
              timeAtStart={Date.now()}
              timeObject={timeObject}
              playSound={playSound}
              done={stopCountdown} /> 
            : blankCountdown
        }
      </div>
      <div className="pomodoro-app__time-input">
        <label htmlFor="hours-input">Hours</label>
        <input 
          type="text" 
          label="hours-input"
          value={hoursField} 
          onChange={updateHours} />
      </div>
      <div className="pomodoro-app__time-input">
        <label htmlFor="minutes-input">Minutes</label>
        <input 
          type="text" 
          label="minutes-input"
          value={minutesField} 
          onChange={updateMinutes} />
      </div>
      <div className="pomodoro-app__time-input">
        <label htmlFor="seconds-input">Seconds</label>
        <input 
          type="text"
          name="seconds-input"
          value={secondsField}
          onChange={updateSeconds} />
      </div>
      <button onClick={startCountdown}>da start button</button>
      <button onClick={stopCountdown}>da stop button</button>
      <button onClick={playSound}>play da sound</button>

      <div className="pomodoro-app__error-div">{errorMessage}</div>
      <audio src={mouthpop}></audio>

    </div>
  )
}