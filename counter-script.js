document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('visitor-counter');
    if (!counterElement) return;

    const target = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    
    let glitches = 0;
    const maxGlitches = 20;

    const glitch = setInterval(() => {
        if (glitches >= maxGlitches) {
            clearInterval(glitch);
            counterElement.innerText = target.toLocaleString('en-US');
        } else {
            let randomNum = Math.floor(Math.random() * 1000000);
            counterElement.innerText = randomNum.toLocaleString('en-US');
            glitches++;
        }
    }, 50);
});