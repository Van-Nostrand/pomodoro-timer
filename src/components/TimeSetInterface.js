import React, { useState, useEffect } from "react";

export default function TimeSetInterface(){

  let [ hoursSection, setHoursSection ] = useState("00");
  let [ minutesSection, setMinutesSection ] = useState("00");
  let [ secondsSection, setSecondsSection ] = useState("00");
  let [ totalMS, setTotalMS ] = useState(0);
  let [ timerRunning, setTimerRunning ] = useState(false);

  const updateTimeUnit = (type, e) => {
    e.preventDefault();

    //each option tests that input is either a number or blank, and keeps the length between 0-2 characters
    switch(type){
      case "hours": 
        if((/^\d+$/.test(e.target.value) || e.target.value === "") && e.target.value.length <= 2){
          setHoursSection(e.target.value);
        }
        break;
      case "minutes": 
        if((/^\d+$/.test(e.target.value) || e.target.value === "") && e.target.value.length <= 2){
          setMinutesSection(e.target.value);
        }
        break;
      case "seconds": 
        if((/^\d+$/.test(e.target.value) || e.target.value === "") && e.target.value.length <= 2){
          setSecondsSection(e.target.value);
        }
        break;
      default: console.log("error in TimeSetInterface switch statement");
    }
  }

  //maintains a clock-like look by keeping 0's on display 
  const handleBlur = (denomination, time) => {
    if(time.length == 0){
      switch(denomination){
        case "hours": setHoursSection("00"); break;
        case "minutes" : setMinutesSection("00"); break;
        case "seconds" : setSecondsSection("00"); break;
        default: console.log("error in handleBlur");
      }
    }
    else if (time.length === 1){
      switch(denomination){
        case "hours": setHoursSection("0" + hoursSection); break;
        case "minutes" : setMinutesSection("0" + minutesSection); break;
        case "seconds" : setSecondsSection("0" + secondsSection); break;
        default: console.log("error in handleBlur AGAIN");
      }
    }
  }

  const convertToMS = (denomination, value) => {
    switch(denomination){
      case "hours": setTotalMS(parseInt(value) * 60 * 60 * 1000); break;
      case "minutes": setTotalMS(parseInt(value) * 60 * 1000); break;
      case "seconds": setTotalMS(parseInt(value) * 1000); break;
      default: console.log("error in convertToMS");
    }
  }

  const determineMilliseconds = () => {
    let total = 0;
    total += parseInt(hoursSection) * 60 * 60 * 1000;
    total += parseInt(minutesSection) * 60 * 1000;
    total += parseInt(secondsSection) * 1000;

    setTotalMS(total);
  }

  const submitTime = () => {
    console.log("here ya go!")
  }

  useEffect(() => {
    determineMilliseconds();
  });
  
  return(
    <div className="timesetinterface">
      {/* <div className="fake-caret-border-top"></div> */}
      <div className="fake-background"></div>

      <input 
        type="text" 
        value={hoursSection} 
        onBlur={() => handleBlur("hours", hoursSection)} 
        onChange={(e) => updateTimeUnit("hours", e)} />

      {/* <div className="fake-caret-border-bottom"></div> */}

      <div className="timesetinterface__colons">
        :
      </div>

      <div className="fake-background"></div>

      <input 
        type="text" 
        value={minutesSection} 
        onBlur={() => handleBlur("minutes", minutesSection)} 
        onChange={(e) => updateTimeUnit("minutes", e)} />

      {/* <div className="fake-caret-border-bottom"></div> */}

      <div className="timesetinterface__colons">
        :
      </div>

      {/* <div className="fake-caret-border-top"></div> */}
      <div className="fake-background"></div>

      <input 
        type="text" 
        value={secondsSection} 
        onBlur={() => handleBlur("seconds", secondsSection)} 
        onChange={(e) => updateTimeUnit("seconds", e)} />

      {/* <div className="fake-caret-border-bottom"></div> */}

      <div>
        <button onClick={submitTime}>Submit</button>
      </div>

      <div>total ms is: {totalMS || 0}</div>
    </div>
  )
}