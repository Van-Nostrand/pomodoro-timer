import React , { useEffect, useState } from "react";

//                                    playsound and done are functions
export const CountDown = ({ timeObject, playSound, done}) => {

  let [countDownTimeStart,  setCountDownTimeStart] = useState(0);
  let [totalMSLeft,         setTotalMSLeft] = useState(0);
  let [countDownTimeGoal,   setCountDownTimeGoal] = useState(0);
  let [startingObject,      setStartingObject] = useState(timeObject);
  let [countdownObject,     setCountdownObject] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
  let [timeNowObject,       setTimeNowObject] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, absolute: 0});

  const calculateTimePassed = () => {

    const timeNow = +new Date();
    const difference = timeNow - countDownTimeStart;
    const goalDiff = countDownTimeGoal - timeNow;

    let newTimeNowObject = {};
    let newCountdownObject = {};

    if(difference > 0) {

      newCountdownObject = {
        hours: Math.floor((goalDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((goalDiff / 1000 / 60) % 60),
        seconds: Math.floor((goalDiff / 1000) % 60),
        milliseconds: goalDiff
      }

      newTimeNowObject = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milliseconds: difference,
        absolute: timeNow
      };
    }

    setTimeNowObject(newTimeNowObject);
    setCountdownObject(newCountdownObject);
    setTotalMSLeft(totalMSLeft - difference);

    console.log("total ms left in calculate function");
    console.log(totalMSLeft);
    // return [newTimeNowObject, newCountdownObject];
  };

  useEffect(() => {
    const INTERVAL_TIME = 200;
    const BUFFER = 1000;

    // let thetime = time;

    let ms = 0;
    ms = ms + (startingObject.hours * 60 * 60 * 1000);
    ms = ms + (startingObject.minutes * 60 * 1000);
    ms = ms + (startingObject.seconds * 1000);

    let hereNow = +new Date();

    // setCountDownTime(thetime);
    setCountDownTimeStart(hereNow);
    setCountDownTimeGoal(ms + hereNow + BUFFER);
    setTotalMSLeft(ms);

    console.log("total ms left in effect prep");
    console.log(totalMSLeft);

    const TIMER = setInterval(() => {
      
      // let [ newTimeNowObject, newCountdownObject ] = calculateTimePassed();
      // calculateTimePassed();
      console.log("total ms left");
      console.log(totalMSLeft);

      if(totalMSLeft > 0){
        // setTimeNowObject(timeNowObject);
        // setCountdownObject(countdownObject);
        calculateTimePassed();
      } 
      else if (totalMSLeft <= 0){
        playSound();
        done();
      }
    }, INTERVAL_TIME);

    return () => {

      clearInterval(TIMER);
    }
    
  }, []);
  
  return(
    <span>
      Hours: {timeNowObject.hours}<br />
      Minutes: {timeNowObject.minutes}<br />
      Seconds: {timeNowObject.seconds}<br /> 
      Milliseconds: {timeNowObject.milliseconds}<br />
    </span>
  )
}