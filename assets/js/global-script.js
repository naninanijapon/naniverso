document.addEventListener('DOMContentLoaded', function() {
    const navSound = document.getElementById('sound-nav');         // ✨新しいナビゲーションサウンド要素を取得✨
    const socialSound = document.getElementById('sound-social');   // ✨SNS専用サウンド要素を取得✨
    const memberHoverSound = document.getElementById('sound-member-click');
    
    // --- 要素の存在確認ログ（より詳細に） ---
    if (!navSound) { console.error("Audio element with ID 'sound-nav' NOT FOUND!"); } 
    else { console.log("Audio element 'sound-nav' found."); navSound.load(); }

    if (!socialSound) { console.error("Audio element with ID 'sound-social' NOT FOUND!"); }
    else { console.log("Audio element 'sound-social' found."); socialSound.load(); }

    if (!memberHoverSound) { console.error("Audio element with ID 'sound-member-click' NOT FOUND!"); }
    else { console.log("Audio element 'sound-member-click' found."); memberHoverSound.load(); }


    // --- 再利用可能なサウンド再生関数 ---
    function playSound(soundElement, elementName) {
        if (soundElement && typeof soundElement.play === 'function') {
            if (!soundElement.paused) {
                soundElement.pause();
            }
            soundElement.currentTime = 0;
            soundElement.volume = 0.5; // 音量は適宜調整
            
            const playPromise = soundElement.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log(elementName + " sound played successfully!");
                }).catch(e => {
                    console.error("Error playing " + elementName + " sound:", e);
                });
            }
        } else {
            console.error(elementName + " sound element is invalid, not found, or missing play method.");
        }
    }

    // --- Navigation Links ---
    const navLinks = document.querySelectorAll('nav.nav-matrix a.neon-link');
    console.log("Found " + navLinks.length + " navigation links.");

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = link.getAttribute('href');
            const isPending = link.classList.contains('pending');
            console.log("Navigation link clicked. Href: " + href + ", Pending: " + isPending);

            if (isPending) {
                event.preventDefault(); // ページ遷移を止める
                // pending のリンクはクリック音を鳴らさない (または別の音にする場合はここで指定)
                console.log("Pending link - navigation prevented, no sound played.");
            } else if (navSound) { // pending でないリンクの場合に音を鳴らす
                event.preventDefault(); // まず遷移を止める
                playSound(navSound, "Navigation");
                // 音が鳴り終わるのを少し待ってから遷移
                setTimeout(() => {
                    window.location.href = href;
                }, 150); // 0.15秒待つ (この時間は調整可能)
            } else {
                // navSound がない場合、通常通り遷移 (音なし)
                console.log("Navigation sound not found, navigating directly.");
            }
        });
    });

    // --- Social Icon Links ---
    const socialIconLinks = document.querySelectorAll('.social-icon-link');
    console.log("Found " + socialIconLinks.length + " social icon links.");

    socialIconLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // まず遷移を止める
            const href = link.getAttribute('href');
            console.log("Social icon link clicked. Href: " + href);
            if (socialSound) {
                playSound(socialSound, "Social Icon");
                // 音が鳴り終わるのを少し待ってから遷移 (新しいタブで開く場合は挙動注意)
                // target="_blank" の場合は、遷移を止めずに音だけ鳴らす方が自然かもしれません。
                // ここでは、新しいタブで開く場合も遷移を少し遅らせます。
                const isNewTab = link.getAttribute('target') === '_blank';
                setTimeout(() => {
                    if (isNewTab) {
                        window.open(href, '_blank');
                    } else {
                        window.location.href = href;
                    }
                }, 150);
            } else {
                // socialSound がない場合
                const isNewTab = link.getAttribute('target') === '_blank';
                 if (isNewTab) {
                    window.open(href, '_blank');
                } else {
                    window.location.href = href;
                }
            }
        });
    });

    // --- Member Card Sound on Hover ---
    const memberCards = document.querySelectorAll('.member-card');
    console.log("Found " + memberCards.length + " member cards.");
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            console.log("Mouse entered member card.");
            if (memberHoverSound) playSound(memberHoverSound, "Member Card Hover");
        });
    });
});