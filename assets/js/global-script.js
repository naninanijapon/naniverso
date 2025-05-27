document.addEventListener('DOMContentLoaded', function() {
    const uiSound = document.getElementById('sound-ui'); // SNSアイコン用に残します
    
    // sound-ui要素が見つかるかどうかの確認ログ
    if (!uiSound) {
        console.error("Audio element with ID 'sound-ui' NOT FOUND!");
        // return; // SNS用に残すため、ここでは処理を止めません
    } else {
        console.log("Audio element 'sound-ui' found for potential use by other elements.");
    }

    // 再利用可能なサウンド再生関数 (他の要素で使う可能性があるので残します)
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
            console.error(elementName + " sound element is invalid or missing play method.");
        }
    }

    // --- Navigation Links ---
    const navLinks = document.querySelectorAll('nav.nav-matrix a.neon-link');
    console.log("Found " + navLinks.length + " navigation links.");

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = link.getAttribute('href');
            console.log("Navigation link clicked. Href: " + href + ", Classes: " + link.className);

            // pendingクラスのリンクは何もしない（ページ遷移も止める）
            if (link.classList.contains('pending')) {
                event.preventDefault();
                console.log("Pending link clicked, navigation prevented.");
                // 音は鳴らさない
            } else {
                // 通常のリンクも音は鳴らさない
                console.log("Normal navigation link clicked, sound NOT played.");
            }
        });
    });

    // --- Social Icon Links (こちらは音を残します) ---
    const socialIconLinks = document.querySelectorAll('.social-icon-link');
    console.log("Found " + socialIconLinks.length + " social icon links.");

    socialIconLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // SNSリンクの場合、新しいタブで開くことが多いので、
            // event.preventDefault() は通常不要ですが、音を鳴らした後に遷移させる場合は必要でした。
            // 今回は音の再生タイミングを調整しないので、デフォルトの動作に任せつつ音を鳴らします。
            const href = link.getAttribute('href');
            console.log("Social icon link clicked. Href: " + href);
            if (uiSound) { // uiSound が存在する場合のみ再生
                 playSound(uiSound, "Social Icon");
            }
        });
    });
});