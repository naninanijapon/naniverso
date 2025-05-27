document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui');
    const memberClickSound = document.getElementById('sound-member-click');
    
    if (!uiSound) {
        console.error("Audio element with ID 'sound-ui' NOT FOUND!");
    } else {
        console.log("Audio element 'sound-ui' found.");
    }
    if (!memberClickSound) {
        console.error("Audio element with ID 'sound-member-click' NOT FOUND!");
    } else {
        console.log("Audio element 'sound-member-click' found.");
    }

    function playSound(soundElement, elementName) {
        if (soundElement && typeof soundElement.play === 'function') {
            // 音の重複再生を防ぐために、再生中の場合は一度止めてから再生
            if (!soundElement.paused) {
                soundElement.pause();
                soundElement.currentTime = 0;
            }
            soundElement.volume = 0.5;
            soundElement.currentTime = 0;
            soundElement.play().then(() => {
                console.log(elementName + " sound played successfully!");
            }).catch(e => {
                console.error("Error playing " + elementName + " sound:", e);
            });
        } else {
            if (soundElement) {
                 console.error(elementName + " sound element is invalid or missing play method. Element:", soundElement);
            } else {
                 console.error(elementName + " sound element NOT FOUND.");
            }
        }
    }

    // --- Navigation Links ---
    const navLinks = document.querySelectorAll('nav.nav-matrix a.neon-link');
    console.log("Found " + navLinks.length + " navigation links.");
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = link.getAttribute('href');
            console.log("Navigation link clicked. Href: " + href + ", Classes: " + link.className);
            if (link.classList.contains('pending')) {
                event.preventDefault();
                console.log("Pending link clicked, navigation prevented.");
            } else {
                console.log("Normal navigation link clicked, sound NOT played.");
            }
        });
    });

    // --- Social Icon Links ---
    const socialIconLinks = document.querySelectorAll('.social-icon-link');
    console.log("Found " + socialIconLinks.length + " social icon links.");
    socialIconLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = link.getAttribute('href');
            console.log("Social icon link clicked. Href: " + href);
            if (uiSound) playSound(uiSound, "Social Icon");
        });
    });

    // --- ✨ Member Card Sound on Hover (Updated) ✨ ---
    const memberCards = document.querySelectorAll('.member-card');
    console.log("Found " + memberCards.length + " member cards.");
    memberCards.forEach(card => {
        // マウスが乗った時のイベントリスナーに変更
        card.addEventListener('mouseenter', function() {
            console.log("Mouse entered member card.");
            if (memberClickSound) playSound(memberClickSound, "Member Card Hover");
        });
        // クリック時のサウンド再生は削除（またはコメントアウト）
        // card.addEventListener('click', function() {
        //     console.log("Member card clicked.");
        //     // if (memberClickSound) playSound(memberClickSound, "Member Card"); // クリック音は鳴らさない
        // });
    });
});