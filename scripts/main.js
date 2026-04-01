// main.js

document.addEventListener('DOMContentLoaded', () => {
    // === Splash Screen Animation Logic ===
    const splashScreen = document.getElementById('splash-screen');
    const splashImage = document.getElementById('splash-image');
    
    if (splashScreen && splashImage) {
        // Prevent body scrolling while splash is active
        document.body.style.overflow = 'hidden';

        // Dummy images for the flickering animation
        const images = [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // Abstract 1
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", // Abstract 2
            "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop", // Abstract 3
            "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop", // Abstract 4
            "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop"  // Abstract 5
        ];

        let imgIndex = 0;
        
        // Change image every 150ms for a rapid flicker effect
        const flickerInterval = setInterval(() => {
            imgIndex = (imgIndex + 1) % images.length;
            splashImage.src = images[imgIndex];
        }, 150);

        let hasDismissed = false;

        // Function to hide the splash screen and reveal the main site
        const dismissSplash = () => {
            if (hasDismissed) return;
            hasDismissed = true;
            
            clearInterval(flickerInterval);
            splashScreen.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Clean up event listeners so we don't leak memory
            window.removeEventListener('wheel', dismissSplash);
            window.removeEventListener('touchmove', dismissSplash);
            document.removeEventListener('keydown', dismissSplash);
            document.removeEventListener('click', dismissSplash);
        };

        // Automatically dismiss after 2.5 seconds
        setTimeout(dismissSplash, 2500);

        // Immediate dismissal triggers
        window.addEventListener('wheel', dismissSplash, { passive: true }); // Mouse scroll
        window.addEventListener('touchmove', dismissSplash, { passive: true }); // Touch swipe
        document.addEventListener('keydown', dismissSplash); // Any key press
        document.addEventListener('click', dismissSplash); // Any click
    }
});
