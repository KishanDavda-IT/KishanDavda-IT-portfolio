document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a, button, .project-item');
    const ambientContainer = document.getElementById('ambient-3d-container');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- Holographic Assistant AI ---
    const hologram = document.getElementById('hologram-avatar');
    const terminal = document.getElementById('hologram-terminal');
    const terminalContent = terminal.querySelector('.terminal-content');
    const signalContainer = document.getElementById('signal-alerts');
    const closeBtn = document.getElementById('close-terminal');

    let holoX = Math.random() * (window.innerWidth - 100);
    let holoY = Math.random() * (window.innerHeight - 100);
    let targetX = holoX;
    let targetY = holoY;
    let isDocked = false;

    const SystemData = [
        { q: "IDENTIFY: KISHAN", a: "IDENTITY: KISHAN DAVDA // FULL-STACK ARCHITECT // SPECIALIZING IN THE INTERSECTION OF LOGIC AND AESTHETIC PRECISION. BASED IN GUJARAT, INDIA." },
        { q: "QUERY: CAPABILITIES", a: "CORE_STACK: TYPESCRIPT, PYTHON, NODE.JS, REACT, EXPRESS, SOCKET.IO. SPECIALIZED IN AI ORCHESTRATION, AUTOMATED WORKFLOWS, AND OLED-OPTIMIZED UI DESIGN." },
        { q: "FETCH: KEY_WORKS", a: "PROJECT_LOGS: GEMMA_CHAT (OFFLINE AI AGENT), KUPI_COUPON (REAL-TIME DISCOUNT INTELLIGENCE), OPENENV_SCHEDULER (META HACKATHON CALENDAR ENGINE), RUPEETOOLS (FINANCIAL SUITE)." },
        { q: "STATUS: AVAILABILITY", a: "SYSTEM_STATUS: ACTIVE // OPEN FOR HIGH-IMPACT ROLES IN FULL-STACK OR FRONTEND DEVELOPMENT. READY FOR DEPLOYMENT INTO PRODUCTION ENVIRONMENTS." }
    ];

    function updateHologram() {
        if (!isDocked) {
            // Smooth floating movement
            holoX += (targetX - holoX) * 0.02;
            holoY += (targetY - holoY) * 0.02;

            if (Math.abs(targetX - holoX) < 10) {
                targetX = Math.random() * (window.innerWidth - 100);
                targetY = Math.random() * (window.innerHeight - 100);
            }

            hologram.style.transform = `translate3d(${holoX}px, ${holoY}px, 0)`;
        }
        requestAnimationFrame(updateHologram);
    }

    function spawnSignalMenu() {
        if (isDocked) return;
        
        signalContainer.innerHTML = '';
        const isSmallScreen = window.innerWidth < 768;
        
        SystemData.forEach((data, index) => {
            const alert = document.createElement('div');
            alert.className = 'signal-alert';
            alert.innerHTML = `<span class="signal-text">${data.q}</span>`;
            
            if (isSmallScreen) {
                const offsetTop = (index - (SystemData.length / 2)) * 70;
                alert.style.left = '10%';
                alert.style.top = `${window.innerHeight / 2 + offsetTop}px`;
                alert.style.width = '80%';
            } else {
                const offsetTop = (index - (SystemData.length / 2)) * 60;
                alert.style.left = `${holoX + 80}px`;
                alert.style.top = `${holoY + offsetTop}px`;
            }
            
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(-20px)';
            
            alert.onclick = (e) => {
                e.stopPropagation();
                signalContainer.innerHTML = '';
                executeDataFetch(data.a);
            };

            signalContainer.appendChild(alert);
            
            setTimeout(() => {
                alert.style.transition = 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
                alert.style.opacity = '1';
                alert.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    hologram.onclick = (e) => {
        e.stopPropagation();
        if (signalContainer.children.length > 0) {
            signalContainer.innerHTML = '';
        } else {
            spawnSignalMenu();
        }
    };

    function executeDataFetch(text) {
        if (isDocked) return;
        isDocked = true;
        
        const isSmallScreen = window.innerWidth < 768;
        const dockX = isSmallScreen ? window.innerWidth / 2 - 20 : window.innerWidth - 450;
        const dockY = isSmallScreen ? window.innerHeight - 350 : window.innerHeight - 450;
        
        hologram.style.transform = `translate3d(${dockX}px, ${dockY}px, 0) scale(${isSmallScreen ? 1.2 : 1.5})`;
        
        setTimeout(() => {
            terminal.classList.add('active');
            typeTerminal(text);
        }, 600);
    }

    function typeTerminal(text) {
        terminalContent.innerText = "";
        let i = 0;
        const interval = setInterval(() => {
            terminalContent.innerText += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                setTimeout(closeTerminal, 6000);
            }
        }, 25);
    }

    function closeTerminal() {
        terminal.classList.remove('active');
        isDocked = false;
    }

    terminal.onclick = closeTerminal;
    if (closeBtn) closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeTerminal();
    };

    updateHologram();

    // --- Touch Detection & Custom Cursor ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('active'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // --- Hamburger Menu ---
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- 3D Ambient Background ---
    const shapeCount = 12;
    const shapes = [];
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        const x = Math.random() * 100, y = Math.random() * 100, z = (Math.random() - 0.5) * 500;
        const size = 50 + Math.random() * 150;
        shape.style.left = `${x}%`; shape.style.top = `${y}%`;
        shape.style.width = `${size}px`; shape.style.height = `${size}px`;
        ambientContainer.appendChild(shape);
        shapes.push({ el: shape, x, y, z, rx: Math.random() * 360, ry: Math.random() * 360, speed: 0.05 + Math.random() * 0.1 });
    }

    let mouseX = 0, mouseY = 0, scrollY = window.scrollY;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    window.addEventListener('scroll', () => scrollY = window.scrollY);

    function animateShapes() {
        shapes.forEach(shape => {
            shape.rx += 0.2; shape.ry += 0.3;
            shape.el.style.transform = `translate3d(${mouseX * (shape.z / 5)}px, ${mouseY * (shape.z / 5) - scrollY * shape.speed}px, ${shape.z}px) rotateX(${shape.rx}deg) rotateY(${shape.ry}deg)`;
        });
        requestAnimationFrame(animateShapes);
    }
    animateShapes();

    // --- Section Reveal ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-on-scroll');
        revealObserver.observe(section);
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});