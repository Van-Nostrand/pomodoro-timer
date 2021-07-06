import React, { useState, useEffect } from "react";
import SecretInput from "./SecretInput/SecretInput";


export default function TimeSetInterface2({ updateTimeUnit, totalMS, hours, minutes, seconds, countdownRunning, displayMode, remainingTime }) { 
  
  const [ secretInputValue, setSecretInputValue ] = useState("");

  const getValue = (value) => {
    setSecretInputValue(value);
  }

  //maintains a clock-like look by keeping 0's on display 
  const handleBlur = (denomination, time) => {
    
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

      <div className="interface-input-wrapper">
        <SecretInput
          maxInputLength={2} 
          elementWidth={15}
          elementHeight={12}
          passValue={(value) => updateTimeUnit("hours", value)}
          inputValue={ displayMode ? remainingTime.hours : hours }
          handleBlur={() => handleBlur("hours", hours)} 
          inputType="number"
          displayMode={displayMode}
        />
      </div>

      <div className="timesetinterface__colons">
        :
      </div>

      <div className="interface-input-wrapper">
        <SecretInput
          maxInputLength={2} 
          elementWidth={15}
          elementHeight={12}
          passValue={(value) => updateTimeUnit("minutes", value)}
          inputValue={ displayMode ? remainingTime.minutes : minutes }
          handleBlur={() => handleBlur("minutes", hours)} 
          inputType="number"
          maxValue={59}
          displayMode={displayMode}
          
        />
      </div>

      <div className="timesetinterface__colons">
        :
      </div>

      <div className="interface-input-wrapper">
        <SecretInput
          maxInputLength={2} 
          elementWidth={15}
          elementHeight={12}
          passValue={(value) => updateTimeUnit("seconds", value)}
          inputValue={ displayMode ? remainingTime.seconds : seconds }
          handleBlur={() => handleBlur("seconds", hours)} 
          inputType="number"
          maxValue={59}
          displayMode={displayMode}
        />
      </div>

    </div>
  )
}