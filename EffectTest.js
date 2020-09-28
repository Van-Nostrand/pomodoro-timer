import React, { useState, useEffect } from "react";

export default function EffectTest(){
  let [ aNumber, setANumber ] = useState(0);

  // useEffect(() => {
  //   setANumber(60);

  //   let TIMER = setInterval(() => {
  //     console.log(aNumber);

  //     if(aNumber > 5){
  //       setANumber(aNumber - 1);
  //       console.log(aNumber);
  //     }
  //     else {
  //       console.log("times up");
  //     }
  //   }, 1000);

  // }, []);

  return(
    <div>open the console</div>
  )
}