import React, { useState, useEffect } from "react";

export default function TimeSetInterface(){

  let [ hoursSection, setHoursSection ] = useState("00");
  let [ minutesSection, setMinutesSection ] = useState("00");
  let [ secondsSection, setSecondsSection ] = useState("00");

  const updateTimeUnit = (type, e) => {
    e.preventDefault();

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

  const submitTime = () => {
    console.log("here ya go!")
  }

  return(
    <div className="timesetinterface">
      <input type="text" value={hoursSection} onBlur={() => handleBlur("hours", hoursSection)} onChange={(e) => updateTimeUnit("hours", e)} />
      <div className="timesetinterface__colons">:</div>
      <input type="text" value={minutesSection} onBlur={() => handleBlur("minutes", minutesSection)} onChange={(e) => updateTimeUnit("minutes", e)} />
      <div className="timesetinterface__colons">:</div>
      <input type="text" value={secondsSection} onBlur={() => handleBlur("seconds", secondsSection)} onChange={(e) => updateTimeUnit("seconds", e)} />
      <div>
        <button onClick={submitTime}>Submit</button>
      </div>
    </div>
  )
}