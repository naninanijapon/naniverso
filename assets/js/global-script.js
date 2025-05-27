document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui');
    
    if (!uiSound) {
        console.error("Audio element with ID 'sound-ui' NOT FOUND!");
        return;
    } else {
        console.log("Audio element 'sound-ui' found.");
    }

    function playSoundAndNavigate(soundElement, href, isPending) {
        if (soundElement && soundElement.play) {
            soundElement.volume = 0.5;
            soundElement.currentTime = 0;
            
            const playPromise = soundElement.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // 音声再生が開始された（または完了した）後にページ遷移
                    console.log("Sound played, then navigate to: " + href);
                    if (!isPending && href && href !== "#") {
                        setTimeout(function() { // 音が聞こえるように少し待つ
                            window.location.href = href;
                        }, 150); // 150ミリ秒待つ (0.15秒) - この時間は調整可能
                    }
                }).catch(error => {
                    console.error("Error playing sound, but will navigate anyway: ", error);
                    // 音声再生に失敗しても、ページ遷移は試みる
                    if (!isPending && href && href !== "#") {
                        window.location.href = href;
                    }
                });
            }
        } else {
            console.error("Sound element is invalid. Navigating directly to: " + href);
            // サウンド要素が無効でも、ページ遷移は試みる
            if (!isPending && href && href !== "#") {
                window.location.href = href;
            }
        }
    }

    // --- Navigation Links ---
    const navLinks = document.querySelectorAll('nav.nav-matrix a.neon-link');
    console.log("Found " + navLinks.length + " navigation links.");

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // まずデフォルトのページ遷移を止める
            const href = link.getAttribute('href');
            const isPending = link.classList.contains('pending');
            console.log("Navigation link clicked. Href: " + href + ", Pending: " + isPending);
            
            if (isPending) {
                // pending の場合は音だけ鳴らして遷移しない（以前のテストのため音を鳴らす）
                if (uiSound && uiSound.play) {
                    uiSound.currentTime = 0;
                    uiSound.play().catch(e => console.error("Error playing pending sound:", e));
                }
                console.log("Pending link - navigation prevented.");
            } else {
                playSoundAndNavigate(uiSound, href, false);
            }
        });
    });

    // --- Social Icon Links ---
    const socialIconLinks = document.querySelectorAll('.social-icon-link');
    console.log("Found " + socialIconLinks.length + " social icon links.");

    socialIconLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // まずデフォルトのページ遷移を止める
            const href = link.getAttribute('href');
            console.log("Social icon link clicked. Href: " + href);
            playSoundAndNavigate(uiSound, href, false); // SNSリンクは常に遷移すると仮定
        });
    });
});