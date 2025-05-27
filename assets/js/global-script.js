document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui');
    const memberClickSound = document.getElementById('sound-member-click'); // ✨新しいサウンド要素を取得✨
    
    if (!uiSound) {
        console.error("Audio element with ID 'sound-ui' NOT FOUND!");
    } else {
        console.log("Audio element 'sound-ui' found.");
    }
    if (!memberClickSound) { // ✨新しいサウンド要素の存在確認✨
        console.error("Audio element with ID 'sound-member-click' NOT FOUND!");
    } else {
        console.log("Audio element 'sound-member-click' found.");
    }

    function playSound(soundElement, elementName) {
        if (soundElement && typeof soundElement.play === 'function') {
            soundElement.volume = 0.5;
            soundElement.currentTime = 0;
            soundElement.play().then(() => {
                console.log(elementName + " sound played successfully!");
            }).catch(e => {
                console.error("Error playing " + elementName + " sound:", e);
            });
        } else {
            if (soundElement) { // 要素はあるがplayメソッドがない場合
                 console.error(elementName + " sound element is invalid or missing play method. Element:", soundElement);
            } else { // 要素そのものがない場合
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

    // --- ✨ Member Card Click Sound (New) ✨ ---
    const memberCards = document.querySelectorAll('.member-card');
    console.log("Found " + memberCards.length + " member cards.");
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            // ここではページ遷移は伴わないので、preventDefaultは不要
            // カード自体がリンクでないことを想定
            console.log("Member card clicked.");
            if (memberClickSound) playSound(memberClickSound, "Member Card");
        });
    });
});