document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui');
    if (!uiSound) {
        console.error("UI Sound element not found!");
        return;
    }

    function playSound(soundElement) {
        if (soundElement) {
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.error("Error playing sound:", e));
        }
    }

    // --- Navigation Links ---
    const navLinks = document.querySelectorAll('.neon-link');
    navLinks.forEach(link => {
        // 'touchend' はスマホのタップ終了時に発火しやすいイベントです。
        // 'click' も残しつつ、両方で試してみる価値があります。
        // ただし、二重に音が鳴らないように注意が必要です。
        // ここでは、より確実性を高めるために、touchstartで音を鳴らしてみます。
        link.addEventListener('touchstart', function(event) {
            //音が鳴ることを優先し、pendingの場合の遷移防止はclickイベントで行う
            playSound(uiSound);
        }, { passive: true }); // passive:true はスクロール性能を阻害しないためのおまじない

        link.addEventListener('click', function(event) {
            // pendingクラスがついているリンク（準備中のページ）
            if (link.classList.contains('pending')) {
                event.preventDefault(); // ページ遷移を止める
                // touchstartで既に音が鳴っているので、ここでは鳴らさない
            } else {
                // pendingでないリンクの場合、touchstartで音が鳴っていればここでは不要
                // もしtouchstartで音が鳴らない場合やPCのために、ここで再度鳴らすことも検討できますが、
                // まずはtouchstartでの反応を見ます。
                // PCの場合はこのclickイベントで音が鳴ります。
                if (!('ontouchstart' in window)) { // PC（タッチ非対応）の場合
                    playSound(uiSound);
                }
            }
        });
    });

    // --- Social Icon Links ---
    const socialIconLinks = document.querySelectorAll('.social-icon-link');
    socialIconLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            playSound(uiSound);
        }, { passive: true });

        link.addEventListener('click', function() {
             if (!('ontouchstart' in window)) { // PC（タッチ非対応）の場合
                playSound(uiSound);
            }
        });
    });
});