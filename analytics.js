document.addEventListener('DOMContentLoaded', function() {
    const resetAnalyticsBtn = document.getElementById('resetAnalyticsBtn');
    const pomodoroCountSpan = document.getElementById('pomodoroCount');
    const longestStreakSpan = document.getElementById('longestStreak');

    let pomodoroCount = 0;
    let longestStreak = 0;

    // Fetch stored analytics
    // For demo purposes, use local storage or a real backend

    resetAnalyticsBtn.addEventListener('click', function() {
        pomodoroCount = 0;
        longestStreak = 0;
        pomodoroCountSpan.textContent = pomodoroCount;
        longestStreakSpan.textContent = longestStreak;
        alert('Analytics Reset');
    });
});
