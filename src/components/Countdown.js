import React , { useEffect, useState } from "react";
import PropTypes from 'prop-types';
/**
 * 
 * @param {number} timeAtStart the time in milliseconds when Countdown is created
 * @param {Object} timeObject an object with key/values describing the amount of time the user wants the countdown to use
 * @param {function} playSound a function that plays a sound when the countdown hits zero
 * @param {function} done a function that causes the parent component to unmount Countdown
 */
export default function Countdown({ 
  done, 
  passTimeUp,
  playSound, 
  running, 
  timeAtStart, 
  timeObject, 
}) {

  const TIMER_INTERVAL = 150;

  const calculateTotalMs = (t) => {
    let ms =  (parseInt(t.hours) * 60 * 60 * 1000) + 
              (parseInt(t.minutes) * 60 * 1000) + 
              (parseInt(t.seconds) * 1000);
    return ms;
  }
  
  const [ timeAtLastUpdate,   setTimeAtLastUpdate ]   = useState(timeAtStart);
  const [ totalMSLeft,        setTotalMSLeft ]        = useState(calculateTotalMs(timeObject));
  const [ timeNowObject,      setTimeNowObject ]      = useState({ hours: "0", minutes: "0", seconds: "0", milliseconds: "0" });
  const [ needsToBeStarted,   setNeedsToBeStarted ]   = useState(false);
  const [ timerRef,           setTimerRef ]           = useState(null);

  

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

  const startCountdown = () => {
      const TIMER = setInterval(() => { 
        
        let [ newTimeNowObject, newMSLeft, timeNow ] = calculateTimePassed();
        
        if (newMSLeft <= 0) {
          playSound();
          clearInterval(TIMER); 
        }
        else {
          setTotalMSLeft(newMSLeft);
          setTimeNowObject(newTimeNowObject);
          setTimeAtLastUpdate(timeNow);
          passTimeUp(newTimeNowObject)
        }
        
      }, TIMER_INTERVAL);

      setTimerRef(TIMER);
      setNeedsToBeStarted(false);
  }


  useEffect(() => {
    if (running) {
      setTotalMSLeft(calculateTotalMs(timeObject))
      setTimeAtLastUpdate(Date.now());
      setNeedsToBeStarted(true);
    }
    else {
      clearInterval(timerRef);
    }
  }, [running]);


  if (needsToBeStarted) startCountdown();

  return <></>
  // return(
  //   <div className="countdown-div">
  //     <div className="countdown-div-unit">Hours: {timeNowObject.hours}</div>
  //     <div className="countdown-div-unit">Minutes: {timeNowObject.minutes}</div>
  //     <div className="countdown-div-unit">Seconds: {timeNowObject.seconds}</div> 
  //     <div className="countdown-div-unit">Milliseconds: {timeNowObject.milliseconds}</div>
  //   </div>
  // )

}

Countdown.defaultProps = {
  timeAtStart: Date.now(), 
  timeObject: { hours: "0", minutes: "0", seconds: "0" }, 
  playSound: () => console.log("play da sound"), 
  done: () => console.log("STAAHP"), 
  running: false
}

Countdown.propTypes = {
  done: PropTypes.func, 
  passTimeUp: PropTypes.func,
  playSound: PropTypes.func, 
  running: PropTypes.bool, 
  timeAtStart: PropTypes.number, 
  timeObject: PropTypes.object, 
}