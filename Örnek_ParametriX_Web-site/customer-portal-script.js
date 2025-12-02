// Customer Portal - Interactive System
class CustomerPortal {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.themeManager = new ThemeManager();
        this.init();
    }

    init() {
        console.log('Customer Portal initialized');
        this.setupEventListeners();
        this.populateDemoData();
        this.showLoginModal();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('customerLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.themeManager.toggleTheme());
        }

        // User menu toggle
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                this.closeUserMenu();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    // Login System
    handleLogin(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const email = formData.get('email').toLowerCase().trim();
        const password = formData.get('password');

        console.log('Login attempt:', email);

        // Demo users database
        const demoUsers = [
            {
                email: 'demo@techvision.com',
                password: 'demo123',
                company: 'TechVision Ltd.',
                name: 'Ahmet Yılmaz',
                role: 'CTO'
            },
            {
                email: 'demo@automech.com',
                password: 'demo123',
                company: 'AutoMech Industries',
                name: 'Elif Demir',
                role: 'Proje Yöneticisi'
            },
            {
                email: 'demo@innovate.com',
                password: 'demo123',
                company: 'InnovateDesign Co.',
                name: 'Can Özkan',
                role: 'Tasarım Müdürü'
            }
        ];

        // Find user
        const user = demoUsers.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            this.showDashboard();
            this.populateUserData();
            this.showNotification('Başarıyla giriş yapıldı!', 'success');
        } else {
            this.showNotification('Email veya şifre hatalı!', 'error');
            this.shakeLoginForm();
        }
    }

    shakeLoginForm() {
        const loginContent = document.querySelector('.login-content');
        loginContent.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginContent.style.animation = '';
        }, 500);
    }

    showLoginModal() {
        const loginModal = document.getElementById('loginModal');
        const dashboard = document.getElementById('customerDashboard');
        
        loginModal.classList.add('active');
        dashboard.classList.remove('active');
    }

    showDashboard() {
        const loginModal = document.getElementById('loginModal');
        const dashboard = document.getElementById('customerDashboard');
        
        loginModal.classList.remove('active');
        
        setTimeout(() => {
            dashboard.classList.add('active');
            this.switchSection('dashboard');
        }, 300);
    }

    populateUserData() {
        if (!this.currentUser) return;

        // Update header info
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('companyName').textContent = this.currentUser.company;

        // Update company profile
        this.populateCompanyProfile();
    }

    logout() {
        this.currentUser = null;
        this.showLoginModal();
        this.showNotification('Çıkış yapıldı', 'info');
    }

    // Navigation
    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}Section`).classList.add('active');

        this.currentSection = sectionName;

        // Populate section data
        this.populateSectionData(sectionName);
    }

    populateSectionData(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.populateDashboard();
                break;
            case 'licenses':
                this.populateLicenses();
                break;
            case 'support':
                this.populateSupport();
                break;
            case 'billing':
                this.populateBilling();
                break;
            case 'profile':
                this.populateProfile();
                break;
        }
    }

    // Dashboard Data
    populateDashboard() {
        this.populateRecentActivities();
        this.populateLicenseOverview();
    }

    populateRecentActivities() {
        const container = document.getElementById('recentActivities');
        if (!container) return;

        const activities = [
            {
                type: 'license',
                title: 'Lisans Aktivasyonu',
                description: 'ParametriX Pro lisansı başarıyla aktive edildi',
                time: '2 saat önce',
                icon: 'fas fa-key',
                color: 'success'
            },
            {
                type: 'support',
                title: 'Destek Talebi Yanıtlandı',
                description: 'ST-2024-156 numaralı talep çözüldü',
                time: '1 gün önce',
                icon: 'fas fa-headset',
                color: 'primary'
            },
            {
                type: 'billing',
                title: 'Fatura Ödendi',
                description: 'Ocak 2024 faturası ödeme alındı',
                time: '3 gün önce',
                icon: 'fas fa-file-invoice',
                color: 'success'
            },
            {
                type: 'system',
                title: 'Sistem Güncellemesi',
                description: 'ParametriX v2.1.5 güncellemesi yüklendi',
                time: '1 hafta önce',
                icon: 'fas fa-download',
                color: 'info'
            }
        ];

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.color}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    populateLicenseOverview() {
        const container = document.getElementById('licenseOverview');
        if (!container) return;

        const licenses = [
            {
                type: 'ParametriX Pro',
                status: 'Aktif',
                expiry: '2024-08-15',
                devices: '3/5',
                usage: 65,
                id: 'PX-PRO-2024-001'
            },
            {
                type: 'ParametriX Standard',
                status: 'Aktif',
                expiry: '2024-12-20',
                devices: '2/3',
                usage: 40,
                id: 'PX-STD-2024-002'
            },
            {
                type: 'ParametriX AI',
                status: 'Süresi Doluyor',
                expiry: '2024-02-28',
                devices: '1/1',
                usage: 85,
                id: 'PX-AI-2024-003'
            }
        ];

        container.innerHTML = licenses.map(license => `
            <div class="license-card">
                <div class="license-header">
                    <div class="license-type">${license.type}</div>
                    <div class="license-status ${license.status === 'Aktif' ? 'status-active' : 'status-expiring'}">
                        ${license.status}
                    </div>
                </div>
                <div class="license-info">
                    <div class="license-detail">
                        <span>Lisans ID:</span>
                        <span>${license.id}</span>
                    </div>
                    <div class="license-detail">
                        <span>Bitiş Tarihi:</span>
                        <span>${license.expiry}</span>
                    </div>
                    <div class="license-detail">
                        <span>Cihaz Kullanımı:</span>
                        <span>${license.devices}</span>
                    </div>
                    <div class="license-detail">
                        <span>Kullanım Oranı:</span>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <div style="width: 60px; height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); width: ${license.usage}%; transition: width 0.3s ease;"></div>
                            </div>
                            <span>${license.usage}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Licenses Section
    populateLicenses() {
        const container = document.getElementById('licensesGrid');
        if (!container) return;

        const licenses = [
            {
                type: 'ParametriX Pro',
                status: 'Aktif',
                expiry: '2024-08-15',
                devices: '3/5',
                features: ['2D→3D Dönüşüm', 'SolidWorks Entegrasyonu', 'Batch İşlem'],
                id: 'PX-PRO-2024-001',
                price: '₺8,500/ay'
            },
            {
                type: 'ParametriX Standard',
                status: 'Aktif',
                expiry: '2024-12-20',
                devices: '2/3',
                features: ['Temel 2D→3D', 'CAD Export'],
                id: 'PX-STD-2024-002',
                price: '₺4,200/ay'
            },
            {
                type: 'ParametriX AI',
                status: 'Süresi Doluyor',
                expiry: '2024-02-28',
                devices: '1/1',
                features: ['AI Asistan', 'Smart Design', 'ML Optimize'],
                id: 'PX-AI-2024-003',
                price: '₺15,000/ay'
            }
        ];

        container.innerHTML = licenses.map(license => `
            <div class="license-card">
                <div class="license-header">
                    <div class="license-type">${license.type}</div>
                    <div class="license-status ${license.status === 'Aktif' ? 'status-active' : 'status-expiring'}">
                        ${license.status}
                    </div>
                </div>
                <div class="license-info">
                    <div class="license-detail">
                        <span>Lisans ID:</span>
                        <span style="font-family: monospace;">${license.id}</span>
                    </div>
                    <div class="license-detail">
                        <span>Aylık Ücret:</span>
                        <span style="color: var(--primary-color); font-weight: 600;">${license.price}</span>
                    </div>
                    <div class="license-detail">
                        <span>Bitiş Tarihi:</span>
                        <span>${license.expiry}</span>
                    </div>
                    <div class="license-detail">
                        <span>Cihaz Kullanımı:</span>
                        <span>${license.devices}</span>
                    </div>
                    <div style="margin-top: 1rem;">
                        <strong style="color: var(--text-primary); font-size: 0.9rem;">Özellikler:</strong>
                        <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${license.features.map(feature => `
                                <span style="padding: 0.25rem 0.75rem; background: var(--bg-glass); border: 1px solid var(--border-secondary); border-radius: 20px; font-size: 0.8rem; color: var(--text-secondary);">
                                    ${feature}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
                        <button class="btn btn-sm btn-primary" onclick="downloadLicenseFile('${license.id}')">
                            <i class="fas fa-download"></i>
                            Dosyaları İndir
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="renewLicense('${license.id}')">
                            <i class="fas fa-sync"></i>
                            Yenile
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Support Section
    populateSupport() {
        const container = document.getElementById('supportTickets');
        if (!container) return;

        const tickets = [
            {
                id: 'ST-2024-156',
                title: '2D→3D Dönüşüm Hatası',
                description: 'Karmaşık AutoCAD dosyalarında dönüşüm işlemi başarısız oluyor',
                priority: 'Yüksek',
                status: 'Çözüldü',
                date: '2024-01-15',
                assignee: 'Teknik Destek Ekibi'
            },
            {
                id: 'ST-2024-157',
                title: 'SolidWorks Entegrasyon Sorunu',
                description: 'Add-in menüde görünmüyor, manuel etkinleştirme gerekiyor',
                priority: 'Orta',
                status: 'İşlemde',
                date: '2024-01-14',
                assignee: 'Ahmet Kaya'
            }
        ];

        container.innerHTML = tickets.map(ticket => `
            <div class="ticket-item">
                <div class="ticket-header">
                    <div>
                        <div class="ticket-title">${ticket.title}</div>
                        <div class="ticket-id">#${ticket.id}</div>
                    </div>
                    <div class="ticket-priority priority-${ticket.priority.toLowerCase()}">
                        ${ticket.priority}
                    </div>
                </div>
                <div class="ticket-description">${ticket.description}</div>
                <div class="ticket-footer">
                    <span>Oluşturulma: ${ticket.date}</span>
                    <span class="license-status ${ticket.status === 'Çözüldü' ? 'status-active' : 'status-expiring'}">
                        ${ticket.status}
                    </span>
                </div>
            </div>
        `).join('');
    }

    // Billing Section
    populateBilling() {
        const invoicesContainer = document.getElementById('invoicesList');
        const paymentContainer = document.getElementById('paymentInfo');
        
        if (invoicesContainer) {
            const invoices = [
                {
                    number: 'INV-2024-001',
                    date: '2024-01-01',
                    amount: '₺28,200',
                    status: 'Ödendi',
                    dueDate: '2024-01-15'
                },
                {
                    number: 'INV-2023-012',
                    date: '2023-12-01',
                    amount: '₺28,200',
                    status: 'Ödendi',
                    dueDate: '2023-12-15'
                },
                {
                    number: 'INV-2023-011',
                    date: '2023-11-01',
                    amount: '₺28,200',
                    status: 'Ödendi',
                    dueDate: '2023-11-15'
                }
            ];

            invoicesContainer.innerHTML = invoices.map(invoice => `
                <div class="invoice-item">
                    <div class="invoice-header">
                        <div>
                            <div class="invoice-number">${invoice.number}</div>
                            <div class="invoice-date">${invoice.date}</div>
                        </div>
                        <div>
                            <div class="invoice-amount">${invoice.amount}</div>
                            <div class="invoice-status status-${invoice.status === 'Ödendi' ? 'paid' : 'pending'}">
                                ${invoice.status}
                            </div>
                        </div>
                    </div>
                    <div class="invoice-actions">
                        <button class="btn btn-sm btn-secondary" onclick="downloadInvoice('${invoice.number}')">
                            <i class="fas fa-download"></i>
                            PDF İndir
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="viewInvoiceDetails('${invoice.number}')">
                            <i class="fas fa-eye"></i>
                            Detaylar
                        </button>
                    </div>
                </div>
            `).join('');
        }

        if (paymentContainer) {
            paymentContainer.innerHTML = `
                <div class="payment-method">
                    <h4>Kayıtlı Ödeme Yöntemi</h4>
                    <div class="payment-details">
                        <div class="payment-detail">
                            <span>Kart Türü:</span>
                            <span>Visa</span>
                        </div>
                        <div class="payment-detail">
                            <span>Kart Numarası:</span>
                            <span>**** **** **** 1234</span>
                        </div>
                        <div class="payment-detail">
                            <span>Son Kullanma:</span>
                            <span>12/26</span>
                        </div>
                        <div class="payment-detail">
                            <span>Kart Sahibi:</span>
                            <span>${this.currentUser?.name || 'Müşteri'}</span>
                        </div>
                    </div>
                </div>
                <div class="payment-method">
                    <h4>Otomatik Ödeme</h4>
                    <div class="payment-details">
                        <div class="payment-detail">
                            <span>Durum:</span>
                            <span style="color: var(--success-color);">Aktif</span>
                        </div>
                        <div class="payment-detail">
                            <span>Sonraki Ödeme:</span>
                            <span>01.02.2024</span>
                        </div>
                        <div class="payment-detail">
                            <span>Tutar:</span>
                            <span>₺28,200</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Profile Section
    populateProfile() {
        this.populateCompanyProfile();
    }

    populateCompanyProfile() {
        const container = document.getElementById('companyProfile');
        if (!container && !this.currentUser) return;

        container.innerHTML = `
            <div class="profile-field">
                <label>Şirket Adı:</label>
                <span>${this.currentUser.company}</span>
            </div>
            <div class="profile-field">
                <label>Yetkili Kişi:</label>
                <span>${this.currentUser.name}</span>
            </div>
            <div class="profile-field">
                <label>Pozisyon:</label>
                <span>${this.currentUser.role}</span>
            </div>
            <div class="profile-field">
                <label>Email:</label>
                <span>${this.currentUser.email}</span>
            </div>
            <div class="profile-field">
                <label>Müşteri ID:</label>
                <span>CST-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</span>
            </div>
            <div class="profile-field">
                <label>Kayıt Tarihi:</label>
                <span>15.06.2023</span>
            </div>
        `;
    }

    // Utility Functions
    populateDemoData() {
        // This method can be called to refresh demo data
        console.log('Demo data populated');
    }

    handleKeydown(event) {
        // ESC key closes modals
        if (event.key === 'Escape') {
            this.closeUserMenu();
        }
    }

    handleResize() {
        // Handle responsive layout changes
        console.log('Window resized');
    }

    toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        dropdown.classList.toggle('active');
    }

    closeUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        dropdown.classList.remove('active');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--bg-card);
            backdrop-filter: blur(15px);
            border: 1px solid var(--border-secondary);
            border-radius: var(--border-radius);
            padding: 1rem 1.5rem;
            color: var(--text-primary);
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('customer-theme') || 'dark';
        this.applyTheme();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('customer-theme', this.currentTheme);
    }

    applyTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#themeToggle i');

        if (this.currentTheme === 'light') {
            body.classList.add('light-mode');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            body.classList.remove('light-mode');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    }
}

// Global Functions for onclick handlers
function switchSection(sectionName) {
    if (window.customerPortal) {
        window.customerPortal.switchSection(sectionName);
    }
}

function toggleUserMenu() {
    if (window.customerPortal) {
        window.customerPortal.toggleUserMenu();
    }
}

function logout() {
    if (window.customerPortal) {
        window.customerPortal.logout();
    }
}

function toggleTheme() {
    if (window.customerPortal) {
        window.customerPortal.themeManager.toggleTheme();
    }
}

// Action Functions
function createSupportTicket() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Yeni destek talebi formu açılıyor...', 'info');
        switchSection('support');
    }
}

function downloadLicenseInfo() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Lisans bilgileri indiriliyor...', 'success');
    }
}

function renewLicense(licenseId = null) {
    if (window.customerPortal) {
        window.customerPortal.showNotification(`Lisans yenileme işlemi başlatılıyor${licenseId ? ` (${licenseId})` : ''}...`, 'info');
    }
}

function downloadLicenseFile(licenseId) {
    if (window.customerPortal) {
        window.customerPortal.showNotification(`${licenseId} lisans dosyaları indiriliyor...`, 'success');
    }
}

function requestNewLicense() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Yeni lisans talep formu açılıyor...', 'info');
    }
}

function downloadAllLicenses() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Tüm lisans dosyaları hazırlanıyor...', 'success');
    }
}

function downloadInvoice(invoiceNumber) {
    if (window.customerPortal) {
        window.customerPortal.showNotification(`${invoiceNumber} faturası PDF olarak indiriliyor...`, 'success');
    }
}

function viewInvoiceDetails(invoiceNumber) {
    if (window.customerPortal) {
        window.customerPortal.showNotification(`${invoiceNumber} fatura detayları görüntüleniyor...`, 'info');
    }
}

function downloadAllInvoices() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Tüm faturalar ZIP olarak indiriliyor...', 'success');
    }
}

function updatePaymentMethod() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Ödeme yöntemi güncelleme formu açılıyor...', 'info');
    }
}

function editProfile() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Profil düzenleme formu açılıyor...', 'info');
    }
}

function changePassword() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Şifre değiştirme formu açılıyor...', 'info');
    }
}

function enable2FA() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('İki faktörlü doğrulama ayarları açılıyor...', 'info');
    }
}

function viewAllActivities() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Tüm aktiviteler görüntüleniyor...', 'info');
    }
}

function showNotifications() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Bildirimler paneli açılıyor...', 'info');
    }
}

function showForgotPassword() {
    if (window.customerPortal) {
        window.customerPortal.showNotification('Şifre sıfırlama emaili gönderiliyor...', 'info');
    }
}

function goToPortalSelector() {
    window.location.href = 'portal-selector.html';
}

// Add shake animation CSS
const shakeAnimation = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeAnimation;
document.head.appendChild(styleSheet);

// Initialize Customer Portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.customerPortal = new CustomerPortal();
});
