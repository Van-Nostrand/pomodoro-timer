import React, {useState, useEffect} from "react";
import "./TimeCopPonent.css";
import mouthpop from "./mouthpop.wav";
import { CountDown } from "./CountDown";

export default function TimeCopPonent(){

  const [countDownOn, setCountDownOn] = useState(false);
  const [hoursField, setHoursField] = useState("");
  const [minutesField, setMinutesField] = useState("");
  const [secondsField, setSecondsField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timeObject, setTimeObject] = useState({hours: 0, minutes: 0, seconds: 0});

  const startCountdown = (e) => {

    let time = parseInt(minutesField);
    let hours = hoursField !== "" ? parseInt(hoursField) : 0;
    let minutes = minutesField !== "" ? parseInt(minutesField) : 0;
    let seconds = secondsField !== "" ? parseInt(secondsField) : 0;

    let timeObject = {
      hours,
      minutes,
      seconds 
    }
    
    // setCountDownTime(time);
    setCountDownOn(true);
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
    setCountDownOn(false);
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
  console.log(countDownOn);

  return(
    <div>
      <div>
        Time Left
        <br /> 
        { 
          countDownOn ? 
            <CountDown
              timeAtStart={Date.now()}
              timeObject={timeObject}
              playSound={playSound}
              done={stopCountdown} /> 
            : blankCountdown
        }
      </div>
      <div className="time-input-div">
        <label htmlFor="hours-input">Hours</label>
        <input 
          type="text" 
          label="hours-input"
          value={hoursField} 
          onChange={updateHours} />
      </div>
      <div className="time-input-div">
        <label htmlFor="minutes-input">Minutes</label>
        <input 
          type="text" 
          label="minutes-input"
          value={minutesField} 
          onChange={updateMinutes} />
      </div>
      <div className="time-input-div">
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

      <div>{errorMessage}</div>
      <audio src={mouthpop}></audio>
    </div>
  )
  
}

// //                                    playsound and done are functions
// const CountDown = ({time, timeObject, playSound, done}) => {

//   let [countDownTime, setCountDownTime] = useState(0);
//   let [countDownTimeStart, setCountDownTimeStart] = useState(0);
//   let [countDownMS, setCountDownMS] = useState(0);
//   let [countDownTimeGoal, setCountDownTimeGoal] = useState(0);
//   let [startingObject, setStartingObject] = useState(timeObject);
//   let [timeGoalObject, setTimeGoalObject] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
//   let [timeNowObject, setTimeNowObject] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, absolute: 0});
  

//   const calculateTimePassed = () => {

//     const timeNow = +new Date();
//     const difference = timeNow - countDownTimeStart;
//     const goalDiff = countDownTimeGoal - timeNow;

//     let newTimeNowObject = {};
//     let newTimeGoalObject = {};

//     if(difference > 0) {

//       newTimeGoalObject = {
//         hours: Math.floor((goalDiff / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((goalDiff / 1000 / 60) % 60),
//         seconds: Math.floor((goalDiff / 1000) % 60),
//         milliseconds: goalDiff
//       }

//       newTimeNowObject = {
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//         milliseconds: difference,
//         absolute: timeNow
//       };
//     }

//     return [newTimeNowObject, newTimeGoalObject];
//   };

//   useEffect(() => {
//     const INTERVAL_TIME = 200;
//     const BUFFER = 1000;

//     let thetime = time;

//     let ms = 0;
//     ms = ms + (startingObject.hours * 60 * 60 * 1000);
//     ms = ms + (startingObject.minutes * 60 * 1000);
//     ms = ms + (startingObject.seconds * 1000);

//     let hereNow = +new Date();

//     setCountDownTime(thetime);
//     setCountDownTimeStart(hereNow);
//     setCountDownTimeGoal(ms + hereNow + BUFFER);
//     setCountDownMS(ms);

//     const TIMER = setInterval(() => {
      
//       // let timeNowGoalArr = calculateTimePassed();
//       let [ newTimeNowObject, newTimeGoalObject ] = calculateTimePassed();
//       // let newTimeNowObject = timeNowGoalArr[0];
//       // let newTimeGoalObject = timeNowGoalArr[1];

//       if(newTimeGoalObject.milliseconds > 0){
        
//         setTimeNowObject(newTimeNowObject);
//         setTimeGoalObject(newTimeGoalObject);
//       } 
//       else if (newTimeGoalObject.milliseconds <= 0){
//         playSound();
//         done();
//       }
//     }, INTERVAL_TIME);

//     return () => {

//       clearInterval(TIMER);
//     }
    
//   }, []);
  
//   return(
//     <span>
//       Hours: {timeNowObject.hours}<br />
//       Minutes: {timeNowObject.minutes}<br />
//       Seconds: {timeNowObject.seconds}<br /> 
//       Milliseconds: {timeNowObject.milliseconds}<br />
//     </span>
//   )
// }