import React, {useState, useEffect} from "react";

function TestTwo(){
  const [dateTime, setDateTime] = useState(Date.now());

  useEffect(() => {
    
  });

  return (
    <div>
      <div>Datetime is {dateTime}</div>
    </div>
  )
}

export default TestTwo;
