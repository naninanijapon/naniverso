document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui');
    if (!uiSound) return;

    // A reusable function to play sounds
    function playSound(soundElement) {
        if (soundElement) {
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.error("Error playing sound:", e));
        }
    }

    // Add sound to all navigation links
    const navLinks = document.querySelectorAll('.neon-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            playSound(uiSound);
        });
    });

    // Add sound to all social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            playSound(uiSound);
        });
    });
});