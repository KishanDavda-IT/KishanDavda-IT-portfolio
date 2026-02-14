document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Loader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);

    // --- 1.5 Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // Close menu when overlay is clicked
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    });

    // --- 2. Dark Mode Warp Effect ---
    const toggle = document.querySelector('.theme-switch input');

    toggle.addEventListener('change', (e) => {
        if (!document.startViewTransition) {
            document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
            return;
        }

        const x = e.clientX ?? window.innerWidth / 2;
        const y = e.clientY ?? window.innerHeight / 2;
        const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        const transition = document.startViewTransition(() => {
            document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
                { duration: 500, easing: 'ease-in', pseudoElement: '::view-transition-new(root)' }
            );
        });
    });

    // --- 3. Typing Animation ---
    const textElement = document.querySelector('.typing-text');
    if (!textElement) {
        // Create it if it doesn't exist in the HTML structure
        const target = document.querySelector('.headline');
        const span = document.createElement('span');
        span.className = 'highlight typing-text';
        target.appendChild(span);
    }

    const words = ["Frontend UI", "Backend Architecture", "Full-Stack Logic", "API Integration"];
    let i = 0, j = 0, isDeleting = false;

    function type() {
        const currentWord = words[i];
        document.querySelector('.typing-text').textContent = isDeleting ? currentWord.substring(0, j--) : currentWord.substring(0, j++);

        if (!isDeleting && j > currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }
    type();

    // --- 4. Counter Animation ---
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.dataset.target;
                let count = 0;
                const update = () => {
                    if (count < target) {
                        count += Math.ceil(target / 50);
                        entry.target.innerText = count > target ? target : count;
                        setTimeout(update, 30);
                    }
                }
                update();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    stats.forEach(stat => observer.observe(stat));
});