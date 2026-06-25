/* ========================================
   OGURU ONLINE INSTITUTE - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // DOM Elements
    const loadingScreen = document.getElementById('loading-screen');
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const typingText = document.getElementById('typingText');
    const particlesContainer = document.getElementById('particles');
    const courseSearch = document.getElementById('courseSearch');
    const coursesGrid = document.getElementById('coursesGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('modalBody');
    const contactForm = document.getElementById('contactForm');
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const ttTabs = document.querySelectorAll('.tt-tab');
    const ttContents = document.querySelectorAll('.timetable-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const counters = document.querySelectorAll('.counter');

    /* ========================================
       LOADING SCREEN
       ======================================== */
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });

    /* ========================================
       PARTICLES
       ======================================== */
    function createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    /* ========================================
       TYPING EFFECT
       ======================================== */
    const phrases = [
        'Learn Online Education',
        'Master Class in Geography A/L',
        'Mathematics O/L & A/L',
        'Buddhist Civilization A/L',
        'Join OGURU Institute'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    /* ========================================
       STICKY NAVBAR & SCROLL EFFECTS
       ======================================== */
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Navbar background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (currentScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    /* ========================================
       MOBILE MENU
       ======================================== */
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ========================================
       THEME TOGGLE
       ======================================== */
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    /* ========================================
       SMOOTH SCROLL & ACTIVE NAV LINK
       ======================================== */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    /* ========================================
       BACK TO TOP
       ======================================== */
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ========================================
       ANIMATED COUNTERS
       ======================================== */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ========================================
       COURSE SEARCH & FILTER
       ======================================== */
    courseSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const instructor = card.querySelector('.instructor').textContent.toLowerCase();

            if (title.includes(searchTerm) || instructor.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const courseCards = document.querySelectorAll('.course-card');

            courseCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ========================================
       GALLERY FILTER & MODAL
       ======================================== */
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            galleryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const category = filter.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Modal functionality
    document.querySelectorAll('.view-btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = galleryItems[index];
            const title = item.querySelector('h4').textContent;
            const desc = item.querySelector('p').textContent;
            const bg = item.querySelector('.gallery-img').style.background;

            modalBody.innerHTML = `
                <div style="${bg}; width: 100%; height: 300px; border-radius: 15px; margin-bottom: 20px;"></div>
                <h3>${title}</h3>
                <p>${desc}</p>
                <div style="margin-top: 20px;">
                    <span style="display: inline-block; padding: 8px 20px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: var(--bg); border-radius: 50px; font-weight: 600; font-size: 0.9rem;">
                        <i class="fas fa-check-circle"></i> Completed Project
                    </span>
                </div>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /* ========================================
       TESTIMONIAL SLIDER
       ======================================== */
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonialCards.length;

    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        currentSlide = index;
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);

    testimonialTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
    testimonialTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    /* ========================================
       TIMETABLE TABS
       ======================================== */
    ttTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ttTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const year = tab.getAttribute('data-year');
            ttContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === 'tt-' + year) {
                    content.classList.add('active');
                }
            });
        });
    });

    /* ========================================
       COUNTDOWN TIMER
       ======================================== */
    function updateCountdown() {
        // Set next class to next Wednesday at 8:00 PM
        const now = new Date();
        const nextClass = new Date();
        nextClass.setDate(now.getDate() + ((3 - now.getDay() + 7) % 7));
        nextClass.setHours(20, 0, 0, 0);

        if (nextClass <= now) {
            nextClass.setDate(nextClass.getDate() + 7);
        }

        const diff = nextClass - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ========================================
       CONTACT FORM VALIDATION
       ======================================== */
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Name validation
        if (name.length < 2) {
            showError('name', 'Please enter a valid name');
            isValid = false;
        } else {
            clearError('name');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        } else {
            clearError('email');
        }

        // Phone validation
        const phoneRegex = /^[\+]?[0-9\s\-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError('phone');
        }

        // Message validation
        if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        } else {
            clearError('message');
        }

        if (isValid) {
            // Show success message
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#25D366';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = '#ff4444';

        // Remove existing error
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();

        const error = document.createElement('span');
        error.classList.add('error-message');
        error.style.color = '#ff4444';
        error.style.fontSize = '0.85rem';
        error.style.marginTop = '5px';
        error.style.display = 'block';
        error.textContent = message;
        field.parentElement.appendChild(error);
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = '';
        const error = field.parentElement.querySelector('.error-message');
        if (error) error.remove();
    }

    /* ========================================
       SCROLL REVEAL (Fallback for AOS)
       ======================================== */
    const revealElements = document.querySelectorAll('[data-aos]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ========================================
       LAZY LOADING IMAGES
       ======================================== */
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.removeAttribute('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    /* ========================================
       ENROLL BUTTON POPUP
       ======================================== */
    document.querySelectorAll('.btn-enroll').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Thank you for your interest! Please contact us via WhatsApp or phone to complete enrollment.');
        });
    });

    /* ========================================
       KEYBOARD NAVIGATION
       ======================================== */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    console.log('%c OGURU ONLINE INSTITUTE ', 'background: linear-gradient(135deg, #FFD700, #FFC107); color: #000; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%c Developed by Lakshman Senanayaka ', 'color: #FFD700; font-size: 14px;');
});
