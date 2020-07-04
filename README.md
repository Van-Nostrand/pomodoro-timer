# Pomodoro Timer App
I struggle with ADHD and know the value of a good Pomodoro timer system, so I thought I'd try making one before I invariably get sucked back into cleaning for the thousandth time. This app will start off browser based but eventually I'd like to port it to electron.

### TODO
* Clean up my current timer, it's too messy
  * Consider switching some of this code over to hooks
* Try a couple other timer methods and test to see what's more performative
* The timer should have a customizable time range, but keep the user within certain boundaries
  * a standard Pomodoro timer runs every 25 minutes with 5 minute breaks, but being human, allow for pausing and adjusted timing
* Add fancy sound effects (half-done!)
* Build a note-taking app that tracks the time of each note
* Build yet another separate note-taking app, but one that will be formatted in a "daily goal" kind-of way
* Explore whether I'd rather use SVG or Canvas for some pretty clock-related visuals
* Smoosh all of the apps together and slap a pretty interface on it and sell it for a bajillion dollars
* Maybe implement a system to export notes to text files? 
* User memory and storage?
* Scream at Lodash devs until they stop pollutin' m'damn prototypes

I took inspiration from examples at these URLs, give em virtual high-fives: 
  https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3/
  https://www.florin-pop.com/blog/2019/05/countdown-built-with-react/
  https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks 