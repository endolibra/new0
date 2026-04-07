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
        const images = [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", 
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", 
            "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop", 
            "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop", 
            "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop"
        ];

        let hasDismissed = false;
        let imageGenerationInterval;

        const spawnRandomImage = () => {
            if (hasDismissed) return;

            const img = document.createElement('img');
            // Select random image from pool
            img.src = images[Math.floor(Math.random() * images.length)];
            img.className = 'random-floating-image';

            // Random positioning (keeping some margin from the screen edges)
            // assuming max image width is around 300px(30vw), let's keep max X at 70% and max Y at 70%
            const randomX = Math.random() * 70;
            const randomY = Math.random() * 70;
            img.style.left = `${randomX}vw`;
            img.style.top = `${randomY}vh`;

            // Append to DOM
            splashScreen.appendChild(img);

            // Trigger fade-in after a tiny delay for browser to register the element
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                });
            });
        };

        // Start accumulating images at a fast speed (e.g. every 300ms)
        // Spawn the first image immediately
        spawnRandomImage();
        imageGenerationInterval = setInterval(spawnRandomImage, 300);

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
