document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect for Hero Section
    const textToType = "React Native Developer";
    const typingElement = document.querySelector('.hero-text .subtitle');
    
    if (typingElement) {
        typingElement.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                typingElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.getAttribute('data-target');
                // Extract number and suffix (e.g., "500+" -> 500, "+")
                const numValue = parseInt(value);
                const suffix = value.replace(/[0-9]/g, '');
                
                animateValue(target, 0, numValue, 2000, suffix);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        // Store original text as target percentage
        const targetText = stat.textContent;
        stat.setAttribute('data-target', targetText);
        stat.textContent = '0' + targetText.replace(/[0-9]/g, '');
        statsObserver.observe(stat);
    });

    function animateValue(obj, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Scroll Animations (Fade Up)
    const fadeElements = document.querySelectorAll('.card, .project-card, .skill-category, .section-title');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Optional: Add animation to hamburger itself
        });
    }

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
});
