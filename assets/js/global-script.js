document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui');
    if (!uiSound) {
        console.error("UI Sound element not found!"); // エラーを見つけやすくするため
        return;
    }

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
        // 'click'イベントはスマホのタップでも通常は機能します
        link.addEventListener('click', (event) => {
            // pendingクラスがついているリンク（準備中のページ）は何もしない
            if (link.classList.contains('pending')) {
                event.preventDefault(); // ページ遷移を止める
            }
            playSound(uiSound);
        });
    });

    // Add sound to all social icon links (✨ここが新しい追加部分✨)
    const socialIconLinks = document.querySelectorAll('.social-icon-link');
    socialIconLinks.forEach(link => {
        link.addEventListener('click', () => {
            playSound(uiSound);
        });
    });
});