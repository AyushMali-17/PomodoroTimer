document.addEventListener('DOMContentLoaded', function() {
    // Shared functionality
    const themeSelector = document.getElementById('theme');
    const alertSound = document.getElementById('alertSound');
    const soundSelect = document.getElementById('soundSelect');
    const profilePicPreview = document.getElementById('profilePicPreview');

    // Theme switcher
    themeSelector.addEventListener('change', function() {
        document.body.classList.remove('light', 'dark', 'blue', 'green');
        document.body.classList.add(themeSelector.value);
    });

    // Sound selector
    soundSelect.addEventListener('change', function() {
        alertSound.src = soundSelect.value;
    });

    // File preview
    const profilePicInput = document.getElementById('profilePic');
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
});
