// Example functionality for the calendar page
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: [
                { title: 'Work Session', start: '2024-08-07' },
                { title: 'Break', start: '2024-08-08' }
            ]
        });
        calendar.render();
    }
});
