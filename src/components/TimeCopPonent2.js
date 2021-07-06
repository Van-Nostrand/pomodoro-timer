import React, {useState, useEffect} from "react";
import mouthpop from "../assets/mouthpop.wav";
import Countdown from "./Countdown";
import TimeSetInterface2 from "./TimeSetInterface2";
import moment from 'moment';

export default function TimeCopPonent2() {

  const [ countdownRunning, setCountdownRunning ] = useState(false);
  const [ startTime, setStartTime ] = useState(Date.now());
  const [ hours, setHours ] = useState("00");
  const [ minutes, setMinutes ] = useState("00");
  const [ seconds, setSeconds ] = useState("00");
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ totalMS, setTotalMS ] = useState(0);
  const [ timeObject, setTimeObject ] = useState({hours: 0, minutes: 0, seconds: 0});
  const [ inputDisplayMode, setInputDisplayMode ] = useState(false);
  const [ remainingTimeObject, setRemainingTimeObject ] = useState();

  console.log("minutes is ", minutes)


  const startCountdown = (e) => {
    determineMilliseconds();
    setCountdownRunning(true);
    setStartTime(Date.now());
    setTimeObject({hours, minutes, seconds})
    setRemainingTimeObject({hours, minutes, seconds});
    setInputDisplayMode(true);
    // setHours("");
    // setMinutes("");
    // setSeconds("");
    setErrorMessage("");
  }

  const stopCountdown = () => {
    console.log("stopcountdown");
    setCountdownRunning(false);
    setInputDisplayMode(false);
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

  const determineMilliseconds = () => {
    let total = 
      (parseInt(hours) * 60 * 60 * 1000) + 
      (parseInt(minutes) * 60 * 1000) + 
      (parseInt(seconds) * 1000);

    setTotalMS(total);
  }

  const updateTimeUnit = (denomination, amount) => {
    // console.log('denomination is ', denomination);
    // console.log('amount is ', amount);
    
    

    //each option tests that input is either a number or blank, and keeps the length between 0-2 characters
    switch(denomination){
      case "hours": 
          setHours(amount);
        break;
      case "minutes": 
          setMinutes(amount);
        break;
      case "seconds": 
          setSeconds(amount);
        break;
      default: console.log("error in updateTimeUnit switch statement");
    }
  }

 

  const triggerDisplayMode = () => {
    setInputDisplayMode(!inputDisplayMode);
  }

  const updateRemainingTime = (t) => {
    setRemainingTimeObject({...t});
  }



  return(
    <div className="pomodoro-app">
      
      <TimeSetInterface2 
        updateTimeUnit={updateTimeUnit}  
        hours={hours} 
        minutes={minutes} 
        seconds={seconds}
        totalMS={totalMS}
        countdownRunning={countdownRunning} 
        displayMode={inputDisplayMode}
        remainingTime={remainingTimeObject}
      />

      <button onClick={startCountdown}>
        da start button
      </button>
      <button onClick={stopCountdown}>
        da stop button
      </button>
      <button onClick={playSound}>
        play da sound
      </button>

      {/* { showCountdown && (
        // timeAtStart, timeObject, playSound, done
        <Countdown 
          timeAtStart={}
          timeObject={}
          playSound={}
          done={}
        />
      )} */}

      <Countdown 
        timeAtStart={startTime}
        timeObject={timeObject}
        playSound={playSound}
        done={stopCountdown}
        running={countdownRunning}
        passTimeUp={updateRemainingTime}
      />

      <div className="pomodoro-app__error-div">
        {errorMessage}
      </div>
      <audio src={mouthpop}></audio>

    </div>
  )
}