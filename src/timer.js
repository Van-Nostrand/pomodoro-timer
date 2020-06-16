//when you want to clear a setinterval timer, setting it equal to 0 is a sure-fire way to know it's gone.
//a setinterval instance is guaranteed to equal a number other than 0
//I mean.... duh... 
let count = 0;
let repeater = setInterval(function(){
  console.log(count++);
  if(count > 100) clearInterval(repeater);
}, 100);
//this produces a timer that clears itself

console.log(repeater);

//this one creates a countdown and displays info about it for 
theButton.addEventListener("click", function(){
  if(!isNaN(theInput.value)){
    let timenow = Date.now();
    console.log(`time is ${timenow} and countdown is set for ${theInput.value} seconds \n the time will be ${theInput.value * 1000 + timenow}`);
    setTimeout(function(){
      console.log(`done, and the time is ${Date.now()}`);
    }, Number(theInput.value) * 1000);
  }
});