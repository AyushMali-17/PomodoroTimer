// Calendar-related JavaScript logic

document.addEventListener('DOMContentLoaded', function() {
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
