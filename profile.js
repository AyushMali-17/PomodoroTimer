document.addEventListener('DOMContentLoaded', function() {
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    updateProfileBtn.addEventListener('click', function() {
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        alert(`Profile Updated!\nName: ${name}\nEmail: ${email}`);
    });
});
