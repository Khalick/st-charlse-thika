// St. Charles School Thika - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ===== Mobile Dropdown Toggle =====
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // ===== Hero Slider =====
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-nav .prev');
    const nextBtn = document.querySelector('.slider-nav .next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Handle index boundaries
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialize slider if elements exist
    if (slides.length > 0) {
        // Event listeners for navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            });
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        // Start automatic slideshow
        startSlideshow();
    }

    // ===== Quotes Slider =====
    const quotes = document.querySelectorAll('.quotes-slider .quote');
    let currentQuote = 0;
    let quoteInterval;

    function showQuote(index) {
        if (index >= quotes.length) {
            currentQuote = 0;
        } else if (index < 0) {
            currentQuote = quotes.length - 1;
        } else {
            currentQuote = index;
        }

        quotes.forEach((quote, i) => {
            quote.classList.remove('active');
            if (i === currentQuote) {
                quote.classList.add('active');
            }
        });
    }

    function nextQuote() {
        showQuote(currentQuote + 1);
    }

    // Initialize quotes slider
    if (quotes.length > 0) {
        quoteInterval = setInterval(nextQuote, 6000);
    }

    // ===== Testimonials Slider =====
    const testimonials = document.querySelectorAll('.testimonials-slider .testimonial');
    const testimonialPrev = document.querySelector('.testimonial-nav .prev');
    const testimonialNext = document.querySelector('.testimonial-nav .next');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        if (index >= testimonials.length) {
            currentTestimonial = 0;
        } else if (index < 0) {
            currentTestimonial = testimonials.length - 1;
        } else {
            currentTestimonial = index;
        }

        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === currentTestimonial) {
                testimonial.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function prevTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }

    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 7000);
    }

    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }

    // Initialize testimonials slider
    if (testimonials.length > 0) {
        if (testimonialNext) {
            testimonialNext.addEventListener('click', function() {
                stopTestimonialSlider();
                nextTestimonial();
                startTestimonialSlider();
            });
        }

        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function() {
                stopTestimonialSlider();
                prevTestimonial();
                startTestimonialSlider();
            });
        }

        startTestimonialSlider();
    }

    // ===== Sticky Header =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== Form Validation & Submission =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message (in a real application, this would send data to a server)
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // ===== Newsletter Form =====
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    });

    // ===== Animation on Scroll =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .academic-card, .news-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .academic-card, .news-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // ===== Back to Top Button =====
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #1a5f7a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 18px;
    `;
    document.body.appendChild(backToTop);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect for back to top
    backToTop.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#134b61';
        this.style.transform = 'translateY(-5px)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#1a5f7a';
        this.style.transform = 'translateY(0)';
    });

    // ===== Current Year in Footer =====
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
    }

});
