#Pomodoro Timer App
As someone who copes with ADHD daily, I know the value of a good pomodoro timer system. This app will start off browser based, but eventually I'll port it to electron and have it be stand-alone. 

I took inspiration from an example in an article from this address -> https:dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3

Here's the example:
`
function App() {
  const [counter, setCounter] = React.useState(60);

  Third Attempts
  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="App">
      <div>Countdown: {counter}</div>
    </div>
  );
}
`

So what they've done is created a situation where an instance of setInterval is called and cleared every second until the counter is gone. I wonder why they didn't just use setTimeout? I'll have to test and find out. 

someone posted this comment on the article:
"I had good success creating a timer by storing the current datetime when starting the timer, and then on every interval getting the new current datetime again and doing the math to find the difference. If any computation takes longer than it should - it doesn't matter. The date time is always valid"

The original author linked to a codesandbox, but it doesn't appear to exist anymore. So on my own, I'll investigate this method as well. 

### TODO (for now)
1. construct a timer using the authors method, but creating functions for seconds, minutes, etc
1. test and figure out why they didn't just use setTimeout
1. test the commenters method
1. determine which approach is the most performative and use that

### TODO (for the future)
* The app should have a customizable time range
  * a standard pomodoro timer runs every 25 minutes with 5 minute breaks, but being human, allow for pausing and adjusted timing
* a note taking system with time stamps
* maybe a system to export notes to text files? 