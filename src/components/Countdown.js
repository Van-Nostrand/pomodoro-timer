import React , { useEffect, useState } from "react";
/**
 * 
 * @param {number} timeAtStart the time in milliseconds when Countdown is created
 * @param {Object} timeObject an object with key/values describing the amount of time the user wants the countdown to use
 * @param {function} playSound a function that plays a sound when the countdown hits zero
 * @param {function} done a function that causes the parent component to unmount Countdown
 */
export const Countdown = ({ timeAtStart, timeObject, playSound, done}) => {

  let ms =  (timeObject.hours * 60 * 60 * 1000) + 
            (timeObject.minutes * 60 * 1000) + 
            (timeObject.seconds * 1000);

  const TIMER_INTERVAL = 150;
  
  let [ timeAtLastUpdate,   setTimeAtLastUpdate ] = useState(timeAtStart);
  let [ totalMSLeft,        setTotalMSLeft ]      = useState(ms);
  let [ timeNowObject,      setTimeNowObject ]    = useState({hours: 0, minutes: 0, seconds: 0, milliseconds: 0});


  const calculateTimePassed = () => {

    const timeNow = Date.now();
    const difference = timeNow - timeAtLastUpdate;
    const newMSLeft = totalMSLeft - difference;

    let newTimeNowObject = {
      hours: Math.floor((newMSLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor(newMSLeft / (1000 * 60)) % 60,
      seconds: Math.floor(newMSLeft / 1000) % 60,
      milliseconds: newMSLeft % 1000
    };

    return [ newTimeNowObject, newMSLeft, timeNow ];
  };

  useEffect(() => {
    
    const TIMER = setInterval(() => { 
      
      let [ newTimeNowObject, newMSLeft, timeNow ] = calculateTimePassed();

      if(newMSLeft <= 0){
        playSound();
        done();
      }
      else {
        setTotalMSLeft(newMSLeft);
        setTimeNowObject(newTimeNowObject);
        setTimeAtLastUpdate(timeNow);
      }
      
    }, TIMER_INTERVAL);
    return () => clearInterval(TIMER);
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