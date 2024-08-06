let timer;
let isRunning = false;
let isWorkInterval = true;
let workInterval = 25 * 60;
let breakInterval = 5 * 60;
let currentTime = workInterval;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const workIntervalInput = document.getElementById('workInterval');
const breakIntervalInput = document.getElementById('breakInterval');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startStopTimer() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            currentTime--;
            updateDisplay();

            if (currentTime <= 0) {
                clearInterval(timer);
                isWorkInterval = !isWorkInterval;
                currentTime = isWorkInterval ? workInterval : breakInterval;
                startStopBtn.textContent = 'Start';
                alert(isWorkInterval ? 'Work interval finished! Take a break.' : 'Break finished! Back to work.');
            }
        }, 1000);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    workInterval = parseInt(workIntervalInput.value) * 60;
    breakInterval = parseInt(breakIntervalInput.value) * 60;
    currentTime = workInterval;
    isWorkInterval = true;
    updateDisplay();
}

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
