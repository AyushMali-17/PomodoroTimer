// Example functionality for the profile page
document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    const profilePicPreview = document.getElementById('profilePicPreview');

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Profile updated!');
    });

    // Load profile picture if available
    const profilePicInput = document.getElementById('profilePic');
    if (profilePicInput.files.length > 0) {
        const file = profilePicInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicPreview.src = e.target.result;
            profilePicPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
