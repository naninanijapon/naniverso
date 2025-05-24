document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('visitor-counter');
    if (!counterElement) return;

    // Set a random target number for the "Nanitos"
    const target = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    let current = 0;
    let increment = Math.ceil(target / 100); // Adjust speed of the animation

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            if (current > target) {
                current = target;
            }
            // Add commas as thousands separators for better readability
            counterElement.innerText = current.toLocaleString('en-US');
            setTimeout(updateCounter, 20); // Interval in milliseconds
        }
    };

    // A more "glitchy/matrix" animation effect
    const glitchAnimation = () => {
        let glitches = 0;
        const maxGlitches = 20; // How many "glitches" before showing the final number

        const glitch = setInterval(() => {
            if (glitches >= maxGlitches) {
                clearInterval(glitch);
                counterElement.innerText = target.toLocaleString('en-US');
            } else {
                let randomNum = Math.floor(Math.random() * 1000000);
                counterElement.innerText = randomNum.toLocaleString('en-US');
                glitches++;
            }
        }, 50); // Speed of the glitch effect
    };
    
    // Use the glitch animation
    glitchAnimation();
});