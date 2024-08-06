// Analytics-related JavaScript logic

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Work', 'Break'],
            datasets: [{
                label: 'Time Spent',
                data: [25, 5], // Use dynamic data here
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
});
