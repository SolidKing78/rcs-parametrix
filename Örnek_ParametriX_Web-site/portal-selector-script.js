// Portal Selector - Interactive 3D System
class PortalSelector {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.createParticleEffects();
        this.startBackgroundAnimations();
    }

    init() {
        console.log('ParametriX Portal Selector initialized');
        this.hideLoadingScreen();
        this.createFloatingElements();
    }

    setupEventListeners() {
        // Portal card hover effects
        const portalCards = document.querySelectorAll('.portal-card');
        portalCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e, true));
            card.addEventListener('mouseleave', (e) => this.handleCardHover(e, false));
            card.addEventListener('mousemove', (e) => this.handleCardMouseMove(e));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    handleCardHover(event, isEntering) {
        const card = event.currentTarget;
        const icon = card.querySelector('.icon-3d');
        
        if (isEntering) {
            this.playHoverSound();
            card.style.transform = 'translateY(-15px) rotateX(8deg) rotateY(5deg)';
            this.createSparkleEffect(card);
        } else {
            card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        }
    }

    handleCardMouseMove(event) {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.goHome();
        } else if (event.key === '1') {
            this.selectPortal('management');
        } else if (event.key === '2') {
            this.selectPortal('customer');
        }
    }

    handleResize() {
        // Recalculate particle positions on resize
        this.createParticleEffects();
    }

    createParticleEffects() {
        const container = document.querySelector('.floating-particles');
        
        // Clear existing particles
        const existingParticles = container.querySelectorAll('.particle');
        existingParticles.forEach(p => p.remove());
        
        // Create new particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, #3b82f6, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * -20}s;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            container.appendChild(particle);
        }
    }

    createFloatingElements() {
        const main = document.querySelector('.portal-main');
        
        // Create geometric shapes
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 60 + 40}px;
                height: ${Math.random() * 60 + 40}px;
                border: 2px solid rgba(59, 130, 246, 0.2);
                border-radius: ${Math.random() > 0.5 ? '50%' : '12px'};
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 80 + 10}%;
                animation: shapeFloat ${Math.random() * 15 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * -10}s;
                pointer-events: none;
                z-index: 0;
            `;
            main.appendChild(shape);
        }
    }

    createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #06b6d4, transparent);
                border-radius: 50%;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkleAnimation 1.5s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    startBackgroundAnimations() {
        // Create additional star field
        this.createStarField();
        
        // Start neural network animation
        this.animateNeuralNetwork();
    }

    createStarField() {
        const starsContainer = document.querySelector('.stars');
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: radial-gradient(circle, #ffffff, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: starTwinkle ${Math.random() * 4 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * -4}s;
            `;
            starsContainer.appendChild(star);
        }
    }

    animateNeuralNetwork() {
        const network = document.querySelector('.neural-network');
        
        setInterval(() => {
            const pulse = document.createElement('div');
            pulse.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #3b82f6, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: networkPulse 3s ease-out forwards;
            `;
            network.appendChild(pulse);
            
            setTimeout(() => pulse.remove(), 3000);
        }, 2000);
    }

    showLoadingScreen(message = 'Portal hazırlanıyor...') {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingMessage = document.getElementById('loadingMessage');
        
        loadingMessage.textContent = message;
        loadingScreen.classList.add('active');
        
        return new Promise(resolve => {
            setTimeout(() => {
                this.hideLoadingScreen();
                resolve();
            }, 2000);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.remove('active');
    }

    playHoverSound() {
        // Create a subtle audio feedback (optional)
        if ('AudioContext' in window) {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }

    async selectPortal(portalType) {
        console.log(`Portal selected: ${portalType}`);
        
        const card = document.querySelector(`.${portalType}-portal`);
        if (card) {
            // Add selection animation
            card.style.transform = 'scale(1.1) rotateY(360deg)';
            card.style.zIndex = '1000';
            
            // Create expanding circle effect
            const expandEffect = document.createElement('div');
            expandEffect.style.cssText = `
                position: fixed;
                width: 50px;
                height: 50px;
                background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: expandCircle 2s ease-out forwards;
                z-index: 999;
                pointer-events: none;
            `;
            document.body.appendChild(expandEffect);
            
            setTimeout(() => expandEffect.remove(), 2000);
        }
        
        // Show loading with specific message
        const messages = {
            management: 'Yönetim Merkezi açılıyor...',
            customer: 'Müşteri Portalı hazırlanıyor...'
        };
        
        await this.showLoadingScreen(messages[portalType]);
        
        // Navigate to selected portal
        if (portalType === 'management') {
            window.location.href = 'management.html';
        } else if (portalType === 'customer') {
            window.location.href = 'customer-portal.html';
        }
    }

    goHome() {
        window.location.href = 'index.html';
    }
}

// Portal navigation functions (global for onclick handlers)
function selectPortal(portalType) {
    portalSelector.selectPortal(portalType);
}

function goHome() {
    portalSelector.goHome();
}

// Additional CSS animations via JavaScript
const additionalStyles = `
    @keyframes particleFloat {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes shapeFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(120deg); }
        66% { transform: translateY(20px) rotate(240deg); }
    }
    
    @keyframes sparkleAnimation {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes starTwinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes networkPulse {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    @keyframes expandCircle {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(50); opacity: 0; }
    }
`;

// Add additional styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize portal selector when DOM is loaded
let portalSelector;

document.addEventListener('DOMContentLoaded', () => {
    portalSelector = new PortalSelector();
});

// Add some utility functions for enhanced interactions
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.animate();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    }
    
    createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 3 + 1,
            color: `rgba(59, 130, 246, ${Math.random() * 0.8 + 0.2})`
        };
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
    
    addParticles(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(x, y));
        }
    }
}

// Initialize particle system for enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem();
    
    // Add particles on mouse move over portal cards
    document.addEventListener('mousemove', (e) => {
        const portalCard = e.target.closest('.portal-card');
        if (portalCard && Math.random() < 0.1) {
            particleSystem.addParticles(e.clientX, e.clientY, 2);
        }
    });
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        particleSystem.canvas.width = window.innerWidth;
        particleSystem.canvas.height = window.innerHeight;
    });
});
