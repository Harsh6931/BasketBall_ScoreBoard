let score1 = 0;
let score2 = 0;
function increment1Team1() {
  score1++;
  const el = document.querySelector(".teamScore1");  // select the element
  el.textContent = String(score1).padStart(3, "0");// format as 3 digits and show
}
function increment1Team2() {
  score2++;
  const el = document.querySelector(".teamScore2");
  el.textContent = String(score2).padStart(3, "0");
}
function increment2Team1() {
  score1+=2;
  const el = document.querySelector(".teamScore1");  
  el.textContent = String(score1).padStart(3, "0");
}
function increment2Team2() {
  score2+=2;
  const el = document.querySelector(".teamScore2");
  el.textContent = String(score2).padStart(3, "0");
}
function increment3Team1() {
  score1+=3;
  const el = document.querySelector(".teamScore1");  
  el.textContent = String(score1).padStart(3, "0");
}
function increment3Team2() {
  score2+=3;
  const el = document.querySelector(".teamScore2");
  el.textContent = String(score2).padStart(3, "0");
}
function incrementNeg1Team1() {
    if (score1 > 0){
  score1-=1;
  const el = document.querySelector(".teamScore1");  // select the element
  el.textContent = String(score1).padStart(3, "0");// format as 3 digits and show
    }
}
function incrementNeg1Team2() {
    if(score2>0){
  score2-=1;
  const el = document.querySelector(".teamScore2");
  el.textContent = String(score2).padStart(3, "0");
    }
}

// TIMER COMPONENT
// ------------------------------------------
// BASIC TIMER SETUP
// ------------------------------------------

let totalSeconds = 12 * 60;        // 12 minutes = 720 seconds
let remainingSeconds = totalSeconds;
let intervalId = null;             // Will store the setInterval ID

// Select the timer display from your HTML
const timerDisplay = document.querySelector(".timer .number-size");


// ------------------------------------------
// UPDATE THE TIMER DISPLAY
// ------------------------------------------
function updateTimerDisplay() {
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    // Convert to MM:SS format
    let m = String(minutes).padStart(2, "0");
    let s = String(seconds).padStart(2, "0");

    timerDisplay.textContent = `${m}:${s}`;
}


// ------------------------------------------
// START THE TIMER
// ------------------------------------------
function startTimer() {

    // If timer is already running → do nothing
    if (intervalId !== null) {
        return;
    }

    intervalId = setInterval(function () {

        remainingSeconds--;

        updateTimerDisplay();     // Update UI on every tick

        // Stop timer when it hits 0
        if (remainingSeconds <= 0) {
            clearInterval(intervalId);
            intervalId = null;
        }

    }, 1000);
}


// ------------------------------------------
// PAUSE THE TIMER
// ------------------------------------------
function pauseTimer() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}


// ------------------------------------------
// RESET THE TIMER
// ------------------------------------------
function resetTimer() {
    pauseTimer();                      // stop timer if running
    remainingSeconds = totalSeconds;   // reset value
    updateTimerDisplay();              // update UI
}


// ------------------------------------------
// INITIAL DISPLAY UPDATE
// ------------------------------------------
updateTimerDisplay();

