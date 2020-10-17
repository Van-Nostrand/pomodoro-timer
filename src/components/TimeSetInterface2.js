import React, { useState, useEffect } from "react";


export const TimeSetInterface2 = ({updateTimeUnit, totalMS, hours, minutes, seconds, countdownRunning}) => {  

  //maintains a clock-like look by keeping 0's on display 
  const handleBlur = (denomination, time) => {
    // console.log(denomination)
    // console.log(time)
    if(time.length == 0){
      switch(denomination){
        case "hours": updateTimeUnit("hours", "00"); break;
        case "minutes" : updateTimeUnit("minutes", "00"); break;
        case "seconds" : updatetimeUnit("seconds", "00"); break;
        default: console.log("error in handleBlur");
      }
    }
    else if (time.length === 1){
      switch(denomination){
        case "hours": updateTimeUnit("hours", "0" + hours); break;
        case "minutes" : updateTimeUnit("minutes", "0" + minutes); break;
        case "seconds" : updateTimeUnit("seconds", "0" + seconds); break;
        default: console.log("error in handleBlur AGAIN");
      }
    }
  }
  
  return(
    <div className="timesetinterface">
      <div className="fake-background"></div>

      <input 
        type="text" 
        value={hours} 
        onBlur={(e) => handleBlur("hours", e.target.value)} 
        onChange={(e) => updateTimeUnit("hours", e.target.value)} />

      <div className="timesetinterface__colons">
        :
      </div>

      <div className="fake-background"></div>

      <input 
        type="text" 
        value={minutes} 
        onBlur={(e) => handleBlur("minutes", e.target.value)} 
        onChange={(e) => updateTimeUnit("minutes", e.target.value)} />

      <div className="timesetinterface__colons">
        :
      </div>

      <div className="fake-background"></div>

      <input 
        type="text" 
        value={seconds} 
        onBlur={(e) => handleBlur("seconds", e.target.value)} 
        onChange={(e) => updateTimeUnit("seconds", e.target.value)} />

    </div>
  )
}