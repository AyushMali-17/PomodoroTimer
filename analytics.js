// Example functionality for the analytics page
document.addEventListener('DOMContentLoaded', function() {
    // Placeholder for analytics functionality
    const chartCanvas = document.getElementById('chartCanvas');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Work Sessions',
                    data: [5, 10, 15, 20, 25, 30],
                    borderColor: '#ff6347',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y;
                            }
                        }
                    }
                }
            }
        });
    }
});
