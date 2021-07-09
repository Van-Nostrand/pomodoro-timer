import React, { useState, useEffect } from "react";
import SecretInput from "./SecretInput/SecretInput";


export default function TimeSetInterface({ 
  updateTimeUnit, 
  totalMS, 
  hours, 
  minutes, 
  seconds, 
  countdownRunning, 
  displayMode, 
  remainingTime 
}) { 
  
  const MAX_INPUT_LENGTH = 2;


  const handleBlur = (denomination, time) => {    
    // let updatedTime = prependWithZeros(time);
    updateTimeUnit(denomination, time);
  }

  return(
    <div className="timesetinterface">

      <div className="interface-input-wrapper">
        <SecretInput
          maxInputLength={MAX_INPUT_LENGTH} 
          elementWidth={15}
          elementHeight={12}
          passValue={(value) => updateTimeUnit("hours", value)}
          inputValue={ displayMode ? remainingTime.hours + "" : hours }
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
          maxInputLength={MAX_INPUT_LENGTH} 
          elementWidth={15}
          elementHeight={12}
          passValue={(value) => updateTimeUnit("minutes", value)}
          inputValue={ displayMode ? remainingTime.minutes + "" : minutes }
          handleBlur={() => handleBlur("minutes", minutes)} 
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
          maxInputLength={MAX_INPUT_LENGTH} 
          elementWidth={15}
          elementHeight={12}
          passValue={(value) => updateTimeUnit("seconds", value)}
          inputValue={ displayMode ? remainingTime.seconds + "" : seconds }
          handleBlur={() => handleBlur("seconds", seconds)} 
          inputType="number"
          maxValue={59}
          displayMode={displayMode}
        />
      </div>

    </div>
  )
}