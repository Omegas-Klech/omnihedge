document.addEventListener('DOMContentLoaded', function() {
    // Set language attribute on HTML tag
    try {
        const userLang = navigator.language || navigator.userLanguage; 
        if (userLang) {
            document.documentElement.lang = userLang.split('-')[0];
            console.log(`User language detected: ${userLang.split('-')[0]}`);
        }
    } catch (e) {
        console.warn("Could not detect browser language.", e);
    }
    

    // Promo Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        // Set offer end date: 65 days from now
        const offerEndDate = new Date();
        offerEndDate.setDate(offerEndDate.getDate() + 65);
        offerEndDate.setHours(23, 59, 59, 999); // End of the 65th day

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = offerEndDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = "L'offre a expiré !";
                if (timerInterval) clearInterval(timerInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if(hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if(minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if(secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        const timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('header nav a[href^="#"], .logo a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's an internal link before preventing default
            if (href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    // Consider header height for accurate scrolling
                    const headerOffset = document.getElementById('main-header').offsetHeight || 70;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;
            
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

});

