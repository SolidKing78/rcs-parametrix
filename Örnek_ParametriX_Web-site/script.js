// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        });

        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
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

        // Active link highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.about-card, .product-card, .pricing-card, .feature-item, .timeline-item, .testimonial, .info-item');
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.animatedElements.forEach(element => {
            element.classList.add('loading');
            observer.observe(element);
        });
    }
}

// Testimonials slider
class TestimonialsSlider {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial');
        this.dots = document.querySelectorAll('.dot');
        this.clientLogos = document.querySelectorAll('.client-logo');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        this.init();
    }

    init() {
        this.setupDots();
        this.setupClientLogos();
        this.startAutoSlide();
    }

    setupDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
    }

    setupClientLogos() {
        this.clientLogos.forEach((logo, index) => {
            logo.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
    }

    goToSlide(slideIndex) {
        // Remove active class from all testimonials, dots and logos
        this.testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        this.clientLogos.forEach(logo => {
            logo.classList.remove('active');
        });

        // Add active class to current slide, dot and logo
        this.testimonials[slideIndex].classList.add('active');
        this.dots[slideIndex].classList.add('active');
        this.clientLogos[slideIndex].classList.add('active');
        
        this.currentSlide = slideIndex;
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
        this.goToSlide(this.currentSlide);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Product cards interaction
class ProductCards {
    constructor() {
        this.productCards = document.querySelectorAll('.product-card');
        this.init();
    }

    init() {
        this.productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, 'enter');
            });

            card.addEventListener('mouseleave', () => {
                this.animateCard(card, 'leave');
            });
        });
    }

    animateCard(card, action) {
        const icon = card.querySelector('.product-icon');
        const features = card.querySelectorAll('.product-features li');

        if (action === 'enter') {
            // Animate icon
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            // Animate features
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(10px)';
                    feature.style.transition = 'all 0.2s ease';
                }, index * 50);
            });
        } else {
            // Reset animations
            icon.style.transform = 'scale(1) rotate(0deg)';
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        }
    }
}

// Pricing cards interaction
class PricingCards {
    constructor() {
        this.pricingCards = document.querySelectorAll('.pricing-card');
        this.init();
    }

    init() {
        this.pricingCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectCard(card);
            });
        });
    }

    selectCard(selectedCard) {
        // Remove selection from all cards
        this.pricingCards.forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        selectedCard.classList.add('selected');

        // Add ripple effect
        this.createRipple(selectedCard);

        // Change background color based on selection
        this.updateBackgroundColor(selectedCard);
    }

    createRipple(card) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';

        card.style.position = 'relative';
        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    updateBackgroundColor(selectedCard) {
        const body = document.body;
        
        if (selectedCard.classList.contains('premium')) {
            body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #7c3aed 100%)';
        } else if (selectedCard.classList.contains('featured')) {
            body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)';
        } else {
            body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)';
        }

        body.style.transition = 'background 0.8s ease';
    }
}

// Floating elements animation
class FloatingElements {
    constructor() {
        this.elements = document.querySelectorAll('.element');
        this.init();
    }

    init() {
        this.elements.forEach((element, index) => {
            this.animateElement(element, index);
        });
    }

    animateElement(element, index) {
        const duration = 3000 + (index * 1000);
        const amplitude = 20 + (index * 10);
        
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * amplitude;
            const randomY = (Math.random() - 0.5) * amplitude;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomX * 2}deg)`;
        }, duration);
    }
}

// Contact form handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });

            // Add input animations
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    if (input.value === '') {
                        input.parentElement.classList.remove('focused');
                    }
                });
            });
        }
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        this.showLoadingState();

        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
        }, 2000);
    }

    showLoadingState() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Mesajınız başarıyla gönderildi!';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            animation: slideIn 0.5s ease;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    }
}

// Parallax effects
class ParallaxEffects {
    constructor() {
        this.parallaxElements = document.querySelectorAll('.hero-visual, .ai-brain');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        this.parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Technology section animations
class TechnologyAnimations {
    constructor() {
        this.brain = document.querySelector('.ai-brain');
        this.connections = document.querySelectorAll('.connection');
        this.init();
    }

    init() {
        this.animateBrain();
        this.animateConnections();
    }

    animateBrain() {
        if (!this.brain) return;

        let rotation = 0;
        setInterval(() => {
            rotation += 1;
            this.brain.style.transform = `rotate(${rotation}deg)`;
        }, 100);
    }

    animateConnections() {
        this.connections.forEach((connection, index) => {
            setInterval(() => {
                const intensity = Math.random() * 0.7 + 0.3;
                connection.style.opacity = intensity;
                connection.style.boxShadow = `0 0 ${intensity * 20}px rgba(37, 99, 235, ${intensity})`;
            }, 1000 + (index * 200));
        });
    }
}

// Scroll progress indicator
class ScrollProgress {
    constructor() {
        this.progressBar = this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        return progressBar;
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            this.progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Mouse cursor effects
class CursorEffects {
    constructor() {
        this.cursor = this.createCursor();
        this.cursorDot = this.createCursorDot();
        this.init();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(37, 99, 235, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }

    createCursorDot() {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #2563eb;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        return dot;
    }

    init() {
        if (window.innerWidth < 768) return; // Disable on mobile

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 20 + 'px';
            this.cursor.style.top = e.clientY - 20 + 'px';
            
            this.cursorDot.style.left = e.clientX - 4 + 'px';
            this.cursorDot.style.top = e.clientY - 4 + 'px';
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .product-card, .pricing-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.borderColor = 'rgba(124, 58, 237, 0.8)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = 'rgba(37, 99, 235, 0.5)';
            });
        });
    }
}

// Theme Toggle
class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        this.body.className = theme === 'light' ? 'light-mode' : '';
        this.themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Search Functionality
class SearchFunctionality {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = this.createSearchResults();
        this.searchData = this.getSearchData();
        
        this.init();
    }

    init() {
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        this.searchInput.addEventListener('focus', () => {
            this.searchResults.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.searchResults.classList.remove('active');
            }
        });
    }

    createSearchResults() {
        const results = document.createElement('div');
        results.className = 'search-results';
        document.querySelector('.search-container').appendChild(results);
        return results;
    }

    getSearchData() {
        return [
            { title: 'ParametriX AI', description: 'Yapay zeka destekli tasarım asistanı', section: 'parametrix-ai' },
            { title: 'Smart 2D→3D', description: 'Teknik çizimlerin otomatik 3D dönüşümü', section: 'parametrix-ai' },
            { title: 'Akıllı Asistan', description: 'Parça sınıflandırma ve maliyet tahmini', section: 'parametrix-ai' },
            { title: 'ParametriX Standart', description: 'SolidWorks süreçlerini hızlandırma', section: 'products' },
            { title: 'ParametriX Pro', description: 'AI desteği ile gelişmiş özellikler', section: 'products' },
            { title: 'ParametriX Premium', description: 'Tam CAD otomasyon hizmeti', section: 'products' },
            { title: 'Fiyatlandırma', description: 'Ürün paketleri ve fiyatlar', section: 'pricing' },
            { title: 'Yol Haritası', description: 'ParametriX AI geliştirme planı', section: 'roadmap' },
            { title: 'Hakkımızda', description: 'RCS Teknoloji vizyon ve misyonu', section: 'about' },
            { title: 'İletişim', description: 'Bizimle iletişime geçin', section: 'contact' }
        ];
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.searchResults.innerHTML = '';
            return;
        }

        const results = this.searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        this.displayResults(results);
    }

    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item">Sonuç bulunamadı</div>';
            return;
        }

        this.searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" data-section="${result.section}">
                <div style="font-weight: 600; margin-bottom: 0.25rem;">${result.title}</div>
                <div style="font-size: 0.875rem; opacity: 0.8;">${result.description}</div>
            </div>
        `).join('');

        // Add click handlers to results
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.navigateToSection(section);
                this.searchResults.classList.remove('active');
                this.searchInput.value = '';
            });
        });
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.backToTopBtn = document.getElementById('backToTop');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        });

        this.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Loading Progress
class LoadingProgress {
    constructor() {
        this.progressBar = document.getElementById('loadingProgress');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.progressBar.style.width = '100%';
            setTimeout(() => {
                this.progressBar.style.opacity = '0';
            }, 500);
        });

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) {
                progress = 90;
                clearInterval(interval);
            }
            this.progressBar.style.width = progress + '%';
        }, 200);
    }
}

// Cookie Consent
class CookieConsent {
    constructor() {
        this.cookieConsent = document.getElementById('cookieConsent');
        this.acceptBtn = document.getElementById('acceptCookies');
        this.declineBtn = document.getElementById('declineCookies');
        this.hasConsent = localStorage.getItem('cookieConsent');
        
        this.init();
    }

    init() {
        if (!this.hasConsent) {
            setTimeout(() => {
                this.cookieConsent.classList.add('show');
            }, 2000);
        }

        this.acceptBtn.addEventListener('click', () => {
            this.acceptCookies();
        });

        this.declineBtn.addEventListener('click', () => {
            this.declineCookies();
        });
    }

    acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        this.cookieConsent.classList.remove('show');
        this.initializeAnalytics();
    }

    declineCookies() {
        localStorage.setItem('cookieConsent', 'declined');
        this.cookieConsent.classList.remove('show');
    }

    initializeAnalytics() {
        // Simple analytics tracking
        console.log('Analytics initialized');
        
        // Track page views
        this.trackPageView();
        
        // Track user interactions
        this.trackInteractions();
    }

    trackPageView() {
        const pageData = {
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // In a real implementation, you would send this to your analytics service
        console.log('Page view tracked:', pageData);
    }

    trackInteractions() {
        // Track button clicks
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('Button clicked:', e.target.textContent);
            });
        });

        // Track form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                console.log('Form submitted:', e.target.id);
            });
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Debounce scroll events
        this.debounceScrollEvents();
        
        // Optimize animations based on device performance
        this.optimizeAnimations();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    debounceScrollEvents() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            // Update all scroll-dependent effects here
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    optimizeAnimations() {
        // Reduce animations on low-performance devices
        if (navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        }

        // Disable animations if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', 'none');
        }
    }
}

// Add CSS animations for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .pricing-card.selected {
        transform: translateY(-15px) scale(1.02);
        box-shadow: 0 25px 50px rgba(37, 99, 235, 0.3);
        border-color: #2563eb;
    }

    .form-group.focused label {
        color: #2563eb;
        transform: translateY(-5px);
        font-size: 0.875rem;
    }

    .nav-link.active {
        background: rgba(37, 99, 235, 0.2);
        color: #2563eb;
    }

    .loading {
        opacity: 0;
        transform: translateY(30px);
    }

    .loading.fade-in-up {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new TestimonialsSlider();
    new ProductCards();
    new PricingCards();
    new FloatingElements();
    new ContactForm();
    new ParallaxEffects();
    new TechnologyAnimations();
    new ScrollProgress();
    new CursorEffects();
    new ThemeToggle();
    new BackToTop();
    new LoadingProgress();
    new CookieConsent();
    new PerformanceOptimizer();

    // Add loading animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Show the page after everything is loaded
    document.body.style.opacity = '1';
});

// Add initial loading state
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f172a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(37, 99, 235, 0.3);
        border-top: 3px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    preloader.appendChild(spinner);
    document.body.insertBefore(preloader, document.body.firstChild);
    
    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
});
