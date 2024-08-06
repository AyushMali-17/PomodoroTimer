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
const soundSelect = document.getElementById('soundSelect');
const clearLogBtn = document.getElementById('clearLogBtn');
const notificationsToggle = document.getElementById('notifications');
const customAlertInput = document.getElementById('customAlert');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const profilePicInput = document.getElementById('profilePic');
const profilePicPreview = document.getElementById('profilePicPreview');
const profileNameInput = document.getElementById('profileName');
const profileEmailInput = document.getElementById('profileEmail');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const resetAnalyticsBtn = document.getElementById('resetAnalyticsBtn');
const pomodoroCountDisplay = document.getElementById('pomodoroCount');
const longestStreakDisplay = document.getElementById('longestStreak');
const calendar = document.getElementById('calendar');

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
                if (soundToggle.checked) {
                    alertSound.src = soundSelect.value;
                    alertSound.play();
                }
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
    const theme = themeSelector.value;
    document.body.className = theme;
}

function updateProfile() {
    const name = profileNameInput.value;
    const email = profileEmailInput.value;
    // Handle profile update logic, e.g., save to server or local storage
    alert('Profile updated!');
}

function handleProfilePicUpload() {
    const file = profilePicInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicPreview.src = e.target.result;
            profilePicPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
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
    if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
    }
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

function setupCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendarObj = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            // Sample events, replace with actual events if needed
            { title: 'Work Session', start: '2024-08-01T09:00:00' },
            { title: 'Break', start: '2024-08-01T10:00:00' }
        ]
    });
    calendarObj.render();
}

function toggleLoginLogout() {
    userLoggedIn = !userLoggedIn;
    loginBtn.style.display = userLoggedIn ? 'none' : 'inline';
    logoutBtn.style.display = userLoggedIn ? 'inline' : 'none';
}

loginBtn.addEventListener('click', toggleLoginLogout);
logoutBtn.addEventListener('click', toggleLoginLogout);
updateProfileBtn.addEventListener('click', updateProfile);
profilePicInput.addEventListener('change', handleProfilePicUpload);
addTodoBtn.addEventListener('click', addTodo);
resetAnalyticsBtn.addEventListener('click', resetAnalytics);
themeSelector.addEventListener('change', switchTheme);

updateDisplay();
switchTheme();
setupCalendar();
