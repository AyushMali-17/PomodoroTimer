let timer;
let isRunning = false;
let isPaused = false;
let isWorkInterval = true;
let workInterval = 25 * 60;
let breakInterval = 5 * 60;
let currentTime = workInterval;
let userLoggedIn = false;
let pomodoroCount = 0;
let longestStreak = 0;
let currentStreak = 0;

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
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const profileNameInput = document.getElementById('profileName');
const profileEmailInput = document.getElementById('profileEmail');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const resetAnalyticsBtn = document.getElementById('resetAnalyticsBtn');
const pomodoroCountDisplay = document.getElementById('pomodoroCount');
const longestStreakDisplay = document.getElementById('longestStreak');

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
}

function saveSettings() {
    workInterval = parseInt(workIntervalInput.value) * 60;
    breakInterval = parseInt(breakIntervalInput.value) * 60;
    localStorage.setItem('workInterval', workInterval);
    localStorage.setItem('breakInterval', breakInterval);
    alert("Settings saved.");
}

function loadSettings() {
    const savedWorkInterval = localStorage.getItem('workInterval');
    const savedBreakInterval = localStorage.getItem('breakInterval');

    if (savedWorkInterval) {
        workInterval = parseInt(savedWorkInterval);
        workIntervalInput.value = workInterval / 60;
    }

    if (savedBreakInterval) {
        breakInterval = parseInt(savedBreakInterval);
        breakIntervalInput.value = breakInterval / 60;
    }
}

function authenticateUser() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    // Simple mock authentication
    if (username && password) {
        userLoggedIn = true;
        authSection.style.display = 'none';
        appSection.style.display = 'block';
        loadSettings();
    } else {
        alert("Please enter both username and password.");
    }
}

function signUpUser() {
    // Mock sign-up logic
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username && password) {
        // Normally you'd save user credentials to a database here
        alert("Sign up successful! Please log in.");
    } else {
        alert("Please enter both username and password.");
    }
}

function updateProfile() {
    const name = profileNameInput.value;
    const email = profileEmailInput.value;
    if (name && email) {
        // Save profile information
        alert("Profile updated.");
    } else {
        alert("Please enter both name and email.");
    }
}

function addTodo() {
    const task = todoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        todoList.appendChild(li);
        todoInput.value = '';
    }
}

function updateAnalytics() {
    pomodoroCount++;
    currentStreak++;
    longestStreak = Math.max(longestStreak, currentStreak);
    pomodoroCountDisplay.textContent = pomodoroCount;
    longestStreakDisplay.textContent = longestStreak;
}

function resetAnalytics() {
    pomodoroCount = 0;
    longestStreak = 0;
    currentStreak = 0;
    pomodoroCountDisplay.textContent = pomodoroCount;
    longestStreakDisplay.textContent = longestStreak;
}

loginBtn.addEventListener('click', authenticateUser);
signupBtn.addEventListener('click', signUpUser);
startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);
clearLogBtn.addEventListener('click', clearLog);
themeSelector.addEventListener('change', switchTheme);
saveSettingsBtn.addEventListener('click', saveSettings);
updateProfileBtn.addEventListener('click', updateProfile);
addTodoBtn.addEventListener('click', addTodo);
resetAnalyticsBtn.addEventListener('click', resetAnalytics);

if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission();
}

updateDisplay();
switchTheme();
