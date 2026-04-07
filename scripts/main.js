// main.js

document.addEventListener('DOMContentLoaded', () => {
    // === Splash Screen Animation Logic ===
    const splashScreen = document.getElementById('splash-screen');
    const splashImage = document.getElementById('splash-image');
    
    if (splashScreen) {
        // Prevent body scrolling while splash is active
        document.body.style.overflow = 'hidden';

        // Clear existing static splash content since we will dynamically inject
        splashScreen.innerHTML = '';

        // Pool of images for the random accumulation effect
        const imageFolder = "compressed_splash_images";
        const images = [
            "DSC00615.JPG",
            "DSC00630.JPG",
            "DSC04328.JPG",
            "DSC04535.JPG",
            "DSCF6066.JPG",
            "DSCF6181.JPG",
            "DSCF6222.JPG",
            "IMG_3387のコピー.JPG",
            "IMG_3389のコピー.JPG",
            "IMG_3393のコピー.JPG",
            "Realtime Image from Krea (3).png",
            "Realtime Image from Krea (4).png",
            "Realtime Image from Krea (6).png",
            "_MG_1345.jpg",
            "スクリーンショット 2026-01-25 21.00.37のコピー.png",
            "スクリーンショット 2026-01-25 21.01.01のコピー.png",
            "スクリーンショット 2026-01-25 21.01.24のコピー.png",
            "スクリーンショット 2026-01-25 21.01.59のコピー.png",
            "スクリーンショット 2026-01-25 21.02.22のコピー.png",
            "スクリーンショット 2026-01-25 21.03.10のコピー.png",
            "スクリーンショット 2026-01-25 21.05.31のコピー.png",
            "スクリーンショット 2026-01-25 21.05.50のコピー.png",
            "スクリーンショット 2026-01-25 21.06.16のコピー.png",
            "スクリーンショット 2026-01-25 21.07.07のコピー.png",
            "スクリーンショット 2026-01-25 21.07.28のコピー.png",
            "スクリーンショット 2026-01-25 21.07.48のコピー.png",
            "スクリーンショット 2026-01-25 21.08.09のコピー.png",
            "スクリーンショット 2026-01-25 21.08.25のコピー.png",
            "スクリーンショット 2026-01-25 21.08.46のコピー.png",
            "スクリーンショット 2026-01-25 21.09.14のコピー.png",
            "スクリーンショット 2026-01-25 21.09.41のコピー.png",
            "スクリーンショット 2026-01-25 21.10.02のコピー.png"
        ].map(filename => `${imageFolder}/${filename}`);

        let hasDismissed = false;
        let imageGenerationInterval;
        
        const placedPositions = [];
        const MIN_DISTANCE = 25; // 画面幅・高さに対する割合（vw/vh）で最低限離す距離

        const spawnRandomImage = () => {
            if (hasDismissed) return;

            const img = document.createElement('img');
            img.src = images[Math.floor(Math.random() * images.length)];
            img.className = 'random-floating-image';

            let randomX, randomY;
            let attempts = 0;
            let validPosition = false;

            // 他の写真と被らない位置を探す（最大15回試行）
            while (!validPosition && attempts < 15) {
                randomX = Math.random() * 70; // 0 to 70vw
                randomY = Math.random() * 70; // 0 to 70vh
                validPosition = true;
                
                // 直近に配置された10個の写真の座標と比較
                const recentPositions = placedPositions.slice(-10);
                for (const pos of recentPositions) {
                    const dist = Math.sqrt(Math.pow(randomX - pos.x, 2) + Math.pow(randomY - pos.y, 2));
                    if (dist < MIN_DISTANCE) {
                        validPosition = false;
                        break;
                    }
                }
                attempts++;
            }

            placedPositions.push({ x: randomX, y: randomY });

            img.style.left = `${randomX}vw`;
            img.style.top = `${randomY}vh`;

            splashScreen.appendChild(img);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                });
            });
        };

        // 一度に出す量を増やすために、初期段階で一気に複数枚表示する
        spawnRandomImage();
        spawnRandomImage();
        spawnRandomImage();
        
        // 生成間隔を短くし（200ms）、かつ毎回2枚ずつ生成することで一気に出現させる
        imageGenerationInterval = setInterval(() => {
            spawnRandomImage();
            setTimeout(spawnRandomImage, 100); // 100msずらしてもう1枚
        }, 200);

        // Function to hide the splash screen and reveal the main site
        const dismissSplash = () => {
            if (hasDismissed) return;
            hasDismissed = true;
            
            clearInterval(imageGenerationInterval);
            splashScreen.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Clean up event listeners so we don't leak memory
            window.removeEventListener('wheel', dismissSplash);
            window.removeEventListener('touchmove', dismissSplash);
            document.removeEventListener('keydown', dismissSplash);
            document.removeEventListener('click', dismissSplash);
        };

        // ユーザーの何かしらのアクション（スクロールやクリック）で即座に消す
        window.addEventListener('wheel', dismissSplash, { passive: true }); // Mouse scroll
        window.addEventListener('touchmove', dismissSplash, { passive: true }); // Touch swipe
        document.addEventListener('keydown', dismissSplash); // Any key press
        document.addEventListener('click', dismissSplash); // Any click
    }

    // === Update Clock for JP, Tokyo ===
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const updateTime = () => {
            const now = new Date();
            // Format time with standard JS API in Tokyo timezone
            const timeString = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Tokyo',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).format(now);
            timeElement.textContent = timeString;
        };
        
        updateTime(); // Initial update
        setInterval(updateTime, 1000 * 60); // Update every minute
    }
});
