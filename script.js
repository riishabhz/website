document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
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

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            closeMobileMenu();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation for Cards
    function animateOnScroll() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial run on load

    // ASMR-inspired Hover Effects
    const interactiveElements = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .skill-tag, .social-link, .stat-item, .nav-link'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Typing Effect in Hero Section
    const nameElement = document.querySelector('.name');
    const titleElement = document.querySelector('.title');

    if (nameElement && titleElement) {
        const nameText = "Rishabh Bhardwaj";
        const titleText = "Data Analyst";

        nameElement.textContent = '';
        titleElement.textContent = '';

        let i = 0;
        const typeName = setInterval(() => {
            if (i < nameText.length) {
                nameElement.textContent += nameText.charAt(i);
                i++;
            } else {
                clearInterval(typeName);

                let j = 0;
                const typeTitle = setInterval(() => {
                    if (j < titleText.length) {
                        titleElement.textContent += titleText.charAt(j);
                        j++;
                    } else {
                        clearInterval(typeTitle);
                    }
                }, 100);
            }
        }, 150);
    }

    // Contact Form: Send Email via mailto & Copy to Clipboard
    function sendMail() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        const msg = document.getElementById('formMessage');

        if (!name || !email || !message) {
            msg.textContent = 'Please fill all required fields';
            msg.style.display = 'block';
            msg.style.color = 'red';
            return;
        }

        const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
        const mailtoLink = `mailto:Rishabhbhardwaj2424@gmail.com?subject=${encodeURIComponent(subject || 'Contact from Portfolio')}&body=${emailBody}`;

        const clipboardText = `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`;

        navigator.clipboard.writeText(clipboardText)
            .then(() => {
                msg.textContent = 'Message copied to clipboard! Opening your email client...';
                msg.style.display = 'block';
                msg.style.color = 'green';

                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 1000);
            })
            .catch(err => {
                console.error('Clipboard error:', err);
                window.location.href = mailtoLink;
            });
    }

    // Attach Send Mail Function
    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMail);
    }

});
