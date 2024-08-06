let timer;
let isRunning = false;
let isPaused = false;
let isWorkInterval = true;
let workInterval = 25 * 60;
let breakInterval = 5 * 60;
let currentTime = workInterval;
let pomodoroCount = 0;
let longestStreak = 0;
let currentStreak = 0;
let userLoggedIn = false;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const pauseBtn = document.getElementById('pauseBtn');
const workIntervalInput = document.getElementById('workInterval');
const breakIntervalInput = document.getElementById('breakInterval');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const alertSound = document.getElementById('alertSound');
const logList = document.getElementById('logList');
const themeSelector = document.getElementById('theme');
const soundToggle = document.getElementById('soundToggle');
const clearLogBtn = document.getElementById('clearLogBtn');
const notificationsToggle = document.getElementById('notifications');
const customAlertInput = document.getElementById('customAlert');
const profilePicInput = document.getElementById('profilePic');
const profilePicPreview = document.getElementById('profilePicPreview');
const profileNameInput = document.getElementById('profileName');
const profileEmailInput = document.getElementById('profileEmail');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const pomodoroCountDisplay = document.getElementById('pomodoroCount');
const longestStreakDisplay = document.getElementById('longestStreak');
const resetAnalyticsBtn = document.getElementById('resetAnalyticsBtn');
const soundSelect = document.getElementById('soundSelect');

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
            if (isPaused) return;
            currentTime--;
            updateDisplay();

            if (currentTime <= 0) {
                clearInterval(timer);
                isWorkInterval = !isWorkInterval;
                currentTime = isWorkInterval ? workInterval : breakInterval;
                startStopBtn.textContent = 'Start';
                pomodoroCount++;
                if (isWorkInterval) {
                    currentStreak++;
                    if (currentStreak > longestStreak) longestStreak = currentStreak;
                } else {
                    currentStreak = 0;
                }
                if (soundToggle.checked) alertSound.play();
                const alertMessage = customAlertInput.value || "Time's up! Take a break.";
                showNotification(alertMessage);
                logEvent(alertMessage);
                updateAnalytics();
            }
        }, 1000);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isPaused = true;
        startStopBtn.textContent = 'Resume';
    } else if (isPaused) {
        isPaused = false;
        startStopTimer();
    }
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

function showNotification(message) {
    if (notificationsToggle.checked && Notification.permission === 'granted') {
        new Notification(message);
    }
}

function logEvent(message) {
    const li = document.createElement('li');
    li.textContent = message;
    logList.appendChild(li);
}

function clearLog() {
    logList.innerHTML = '';
}

function switchTheme() {
    document.body.classList.toggle('dark', themeSelector.value === 'dark');
    document.body.classList.toggle('blue', themeSelector.value === 'blue');
    document.body.classList.toggle('green', themeSelector.value === 'green');
}

function updateAnalytics() {
    pomodoroCountDisplay.textContent = pomodoroCount;
    longestStreakDisplay.textContent = longestStreak;
}

function resetAnalytics() {
    pomodoroCount = 0;
    longestStreak = 0;
    currentStreak = 0;
    updateAnalytics();
}

function handleProfilePicChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilePicPreview.src = reader.result;
            profilePicPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function updateProfile() {
    if (userLoggedIn) {
        // Save profile information (this example uses localStorage)
        localStorage.setItem('profileName', profileNameInput.value);
        localStorage.setItem('profileEmail', profileEmailInput.value);
        alert('Profile updated successfully');
    } else {
        alert('Please log in to update your profile');
    }
}

function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        todoList.appendChild(li);
        todoInput.value = '';
    }
}

function handleSoundSelectChange() {
    alertSound.src = soundSelect.value;
}

function init() {
    if (localStorage.getItem('profileName')) {
        profileNameInput.value = localStorage.getItem('profileName');
    }
    if (localStorage.getItem('profileEmail')) {
        profileEmailInput.value = localStorage.getItem('profileEmail');
    }
    updateAnalytics();
}

profilePicInput.addEventListener('change', handleProfilePicChange);
updateProfileBtn.addEventListener('click', updateProfile);
addTodoBtn.addEventListener('click', addTodo);
soundSelect.addEventListener('change', handleSoundSelectChange);
resetAnalyticsBtn.addEventListener('click', resetAnalytics);

startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);
clearLogBtn.addEventListener('click', clearLog);
themeSelector.addEventListener('change', switchTheme);

init();
updateDisplay();
switchTheme();
