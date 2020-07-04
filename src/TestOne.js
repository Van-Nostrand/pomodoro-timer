import React, {useState, useEffect} from "react";

function TestOne(){
  const [counter, setCounter] = useState(60);
  

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => {

      setCounter(counter -1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>
      <div>Countdown: {counter}</div>
    </div>
  )
}

export default TestOne;
