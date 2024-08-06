document.addEventListener('DOMContentLoaded', function() {
    // Timer Functionality
    const timer = document.getElementById('timer');
    let timerInterval;
    let isRunning = false;
    let isPaused = false;
    let isWorkInterval = true;
    let workInterval = 25 * 60;
    let breakInterval = 5 * 60;
    let currentTime = workInterval;

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

    function updateDisplay() {
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    function startStopTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startStopBtn.textContent = 'Start';
        } else {
            timerInterval = setInterval(() => {
                currentTime--;
                updateDisplay();
                if (currentTime <= 0) {
                    clearInterval(timerInterval);
                    isWorkInterval = !isWorkInterval;
                    currentTime = isWorkInterval ? workInterval : breakInterval;
                    startStopBtn.textContent = 'Start';
                    if (soundToggle.checked) alertSound.play();
                    const alertMessage = customAlertInput.value || "Time's up! Take a break.";
                    showNotification(alertMessage);
                    logEvent(alertMessage);
                }
            }, 1000);
            startStopBtn.textContent = 'Stop';
        }
        isRunning = !isRunning;
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isPaused = true;
            startStopBtn.textContent = 'Resume';
        } else if (isPaused) {
            isPaused = false;
            startStopTimer();
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
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

    if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }

    startStopBtn.addEventListener('click', startStopTimer);
    resetBtn.addEventListener('click', resetTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    clearLogBtn.addEventListener('click', clearLog);
    themeSelector.addEventListener('change', switchTheme);

    updateDisplay();
    switchTheme();

    // Profile Functionality
    const profilePicInput = document.getElementById('profilePic');
    const profilePicPreview = document.getElementById('profilePicPreview');
    
    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicPreview.src = e.target.result;
                profilePicPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // To-Do List Functionality
    const todoForm = document.getElementById('todoForm');
    const newTodoInput = document.getElementById('newTodo');
    const todoList = document.getElementById('todoList');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTodo = newTodoInput.value.trim();
        if (newTodo) {
            const li = document.createElement('li');
            li.textContent = newTodo;
            todoList.appendChild(li);
            newTodoInput.value = '';
        }
    });

    // Analytics Functionality
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Work', 'Break'],
            datasets: [{
                label: 'Time Spent',
                data: [workInterval, breakInterval],
                backgroundColor: ['#ff6347', '#5cb85c'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Calendar Functionality
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: [
            // Sample events
            {
                title: 'Work Session',
                start: '2024-08-10T09:00:00',
                end: '2024-08-10T10:00:00'
            },
            {
                title: 'Break',
                start: '2024-08-10T10:15:00',
                end: '2024-08-10T10:30:00'
            }
        ],
        select: function(info) {
            const title = prompt('Enter Event Title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.startStr,
                    end: info.endStr
                });
            }
        }
    });
    calendar.render();
});
