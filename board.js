// -------------------------------
// SCORES
// -------------------------------
let score1 = 0;
let score2 = 0;

const scoreEl1 = document.querySelector(".teamScore1");
const scoreEl2 = document.querySelector(".teamScore2");

function updateScoreDisplays() {
  if (scoreEl1) scoreEl1.textContent = String(score1).padStart(3, "0");
  if (scoreEl2) scoreEl2.textContent = String(score2).padStart(3, "0");
}

function increment1Team1() {
  score1++;
  updateScoreDisplays();
}
function increment1Team2() {
  score2++;
  updateScoreDisplays();
}
function increment2Team1() {
  score1 += 2;
  updateScoreDisplays();
}
function increment2Team2() {
  score2 += 2;
  updateScoreDisplays();
}
function increment3Team1() {
  score1 += 3;
  updateScoreDisplays();
}
function increment3Team2() {
  score2 += 3;
  updateScoreDisplays();
}
function incrementNeg1Team1() {
  if (score1 > 0) {
    score1 -= 1;
    updateScoreDisplays();
  }
}
function incrementNeg1Team2() {
  if (score2 > 0) {
    score2 -= 1;
    updateScoreDisplays();
  }
}

// -------------------------------
// TIMER & QUARTER (12 minutes per quarter, 4 quarters)
// -------------------------------
const TOTAL_SECONDS = 12 * 60; // 12:00 per quarter

let remainingSeconds = TOTAL_SECONDS;
let intervalId = null;
let quarter = 1; // 1..4

const timerDisplay = document.getElementById("timerDisplay");
const timerStartBtn = document.getElementById("timerStartBtn");
const timerResetBtn = document.getElementById("timerResetBtn");
const quarterDisplay = document.getElementById("quarterDisplay");
const periodDots = document.querySelectorAll(".period .dot-design");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function updateTimerDisplay() {
  if (timerDisplay) timerDisplay.textContent = formatTime(remainingSeconds);
}

function updateQuarterDisplay() {
  if (quarterDisplay) quarterDisplay.textContent = String(quarter);
}

// Light up the dot for the current quarter (1–4 → index 0–3)
function updatePeriodDots() {
  if (!periodDots.length) return;
  periodDots.forEach((dot, i) => {
    if (i === quarter - 1) dot.classList.add("active");
    else dot.classList.remove("active");
  });
}

function startTimer() {
  if (intervalId !== null) return;

  if (timerStartBtn) timerStartBtn.textContent = "PAUSE";
  updateTimerDisplay();

  intervalId = setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds < 0) remainingSeconds = 0;
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      if (timerStartBtn) timerStartBtn.textContent = "▷ START";

      if (quarter < 4) {
        quarter += 1;
        updateQuarterDisplay();
        updatePeriodDots();
        remainingSeconds = TOTAL_SECONDS;
        updateTimerDisplay();
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (timerStartBtn) timerStartBtn.textContent = "▷ START";
}

function toggleStartPause() {
  if (intervalId === null) startTimer();
  else pauseTimer();
}

function resetTimer() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  remainingSeconds = TOTAL_SECONDS;
  updateTimerDisplay();
  if (timerStartBtn) timerStartBtn.textContent = "▷ START";
}

// Jump to a specific quarter (e.g. when clicking a period dot)
function setQuarter(q) {
  const num = Math.max(1, Math.min(4, Math.floor(Number(q))));
  quarter = num;
  updateQuarterDisplay();
  updatePeriodDots();
  remainingSeconds = TOTAL_SECONDS;
  updateTimerDisplay();
  pauseTimer();
}

// -------------------------------
// FULL RESET (top-right RESET button)
// -------------------------------
function resetAll() {
  // Scores
  score1 = 0;
  score2 = 0;
  updateScoreDisplays();

  // Timer state
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  remainingSeconds = TOTAL_SECONDS;
  updateTimerDisplay();
  if (timerStartBtn) timerStartBtn.textContent = "▷ START";

  // Quarter and period dots
  quarter = 1;
  updateQuarterDisplay();
  updatePeriodDots();
}

// -------------------------------
// WIRE EVENTS
// -------------------------------
if (timerStartBtn) timerStartBtn.addEventListener("click", toggleStartPause);
if (timerResetBtn) timerResetBtn.addEventListener("click", resetTimer);

periodDots.forEach((dot) => {
  const q = dot.getAttribute("data-quarter");
  dot.addEventListener("click", () => setQuarter(q));
});

const resetAllBtn = document.getElementById("resetAllBtn");
if (resetAllBtn) resetAllBtn.addEventListener("click", resetAll);

// -------------------------------
// INIT
// -------------------------------
updateTimerDisplay();
updateQuarterDisplay();
updatePeriodDots();
updateScoreDisplays();
