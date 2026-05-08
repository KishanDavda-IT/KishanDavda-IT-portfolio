document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a, button, .project-item');
    const ambientContainer = document.getElementById('ambient-3d-container');

    // --- Create Ambient 3D Shapes ---
    const shapeCount = 12;
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Random initial positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const z = (Math.random() - 0.5) * 500;
        const size = 50 + Math.random() * 150;
        const rotation = Math.random() * 360;

        shape.style.left = `${x}%`;
        shape.style.top = `${y}%`;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        ambientContainer.appendChild(shape);
        shapes.push({
            el: shape,
            x, y, z,
            rx: Math.random() * 360,
            ry: Math.random() * 360,
            speed: 0.05 + Math.random() * 0.1
        });
    }

    // --- Mouse & Scroll Following Logic ---
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Cursor movement
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    function animateShapes() {
        shapes.forEach((shape, i) => {
            const parallaxX = mouseX * (shape.z / 5);
            const parallaxY = mouseY * (shape.z / 5);
            const scrollOffset = scrollY * shape.speed;

            shape.rx += 0.2;
            shape.ry += 0.3;

            shape.el.style.transform = `
                translate3d(${parallaxX}px, ${parallaxY - scrollOffset}px, ${shape.z}px) 
                rotateX(${shape.rx}rx) 
                rotateY(${shape.ry}deg)
            `;
        });
        requestAnimationFrame(animateShapes);
    }
    animateShapes();

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // --- Section Reveal Logic ---
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-on-scroll');
        revealObserver.observe(section);
    });

    // --- Project Item Hover Image Reveal (Optional enhancement) ---
    // This could be expanded with real image reveals if assets were available
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            // Logic for moving an image preview could go here
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
