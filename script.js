document.addEventListener('DOMContentLoaded', function () {

    // ── Footer Year ──────────────────────────────────────────────
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── Mobile Menu Toggle ────────────────────────────────────────
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    function openMobileMenu() {
        document.body.classList.add('show-mobile-menu');
    }

    function closeMobileMenu() {
        document.body.classList.remove('show-mobile-menu');
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // ── Smooth Scrolling ──────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                closeMobileMenu();
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Card Scroll Animations (IntersectionObserver) ─────────────
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.card, .profile-card').forEach(card => cardObserver.observe(card));

    // ── Active Nav Link on Scroll ─────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // ── Reading Progress Bar + Scroll to Top ──────────────────────
    const progressBar = document.getElementById('readingProgress');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
        // Progress bar
        if (progressBar) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }

        // Scroll to top button visibility
        if (scrollToTopBtn) {
            scrollToTopBtn.classList.toggle('visible', window.scrollY > 400);
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Dark Mode Toggle ──────────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');

    function setDarkMode(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkMode(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setDarkMode(!document.body.classList.contains('dark-mode'));
        });
    }

    // ── Typing Effect ─────────────────────────────────────────────
    const nameElement = document.querySelector('.name');
    const titleElement = document.querySelector('.title');

    if (nameElement && titleElement) {
        const nameText = 'Rishabh Bhardwaj';
        const titleText = 'Analytics Consultant | Data Analyst';

        nameElement.textContent = '';
        titleElement.textContent = '';

        let i = 0;
        const typeName = setInterval(() => {
            if (i < nameText.length) {
                nameElement.textContent += nameText.charAt(i++);
            } else {
                clearInterval(typeName);
                let j = 0;
                const typeTitle = setInterval(() => {
                    if (j < titleText.length) {
                        titleElement.textContent += titleText.charAt(j++);
                    } else {
                        clearInterval(typeTitle);
                    }
                }, 50);
            }
        }, 100);
    }

    // ── Animated Counters ─────────────────────────────────────────
    function animateCounter(el) {
        const raw = el.textContent.trim();
        const target = parseInt(raw);
        const suffix = raw.replace(/[0-9]/g, '');
        if (isNaN(target)) return;

        const duration = 1200;
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) statsObserver.observe(statsSection);

    // ── Hover Effects ─────────────────────────────────────────────
    document.querySelectorAll('.btn-primary, .btn-secondary, .skill-tag, .social-link, .stat-item, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });
        el.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ── Contact Form ──────────────────────────────────────────────
    function sendMail() {
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const msg = document.getElementById('formMessage');

        if (!name || !email || !message) {
            msg.textContent = 'Please fill in all required fields.';
            msg.className = 'form-message error';
            msg.style.display = 'block';
            return;
        }

        const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
        const mailtoLink = `mailto:Rishabhbhardwaj2424@gmail.com?subject=${encodeURIComponent(subject || 'Contact from Portfolio')}&body=${emailBody}`;
        const clipboardText = `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`;

        navigator.clipboard.writeText(clipboardText)
            .then(() => {
                msg.textContent = 'Message copied to clipboard! Opening your email client...';
                msg.className = 'form-message success';
                msg.style.display = 'block';
                setTimeout(() => { window.location.href = mailtoLink; }, 1000);
            })
            .catch(() => {
                window.location.href = mailtoLink;
            });
    }

    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) sendBtn.addEventListener('click', sendMail);

});
