document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: [
            // Sample events
            { title: 'Meeting', start: '2024-08-05T10:00:00' },
            { title: 'Break', start: '2024-08-06T14:00:00' }
        ],
        dateClick: function(info) {
            alert('Date clicked: ' + info.dateStr);
        },
        eventClick: function(info) {
            alert('Event clicked: ' + info.event.title);
        }
    });
    calendar.render();
});
