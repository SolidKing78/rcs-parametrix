// ==========================================
// PARAMETRIX MANAGEMENT SYSTEM - ADVANCED UI
// Mükemmel JavaScript Implementation
// ==========================================

// Valid Users Database
const validUsers = [
    { email: 'admin@rcsteknoloji.com', password: 'admin123', name: 'Ahmet Yılmaz', role: 'Super Admin' },
    { email: 'support.senior@rcsteknoloji.com', password: 'support123', name: 'Ayşe Demir', role: 'Teknik Destek' },
    { email: 'support.junior@rcsteknoloji.com', password: 'support456', name: 'Can Özkan', role: 'Teknik Destek' },
    { email: 'sales.manager@rcsteknoloji.com', password: 'sales123', name: 'Zeynep Arslan', role: 'Satış' },
    { email: 'sales.representative@rcsteknoloji.com', password: 'sales456', name: 'Mehmet Kaya', role: 'Satış' },
    { email: 'developer@rcsteknoloji.com', password: 'dev123', name: 'Elif Yılmaz', role: 'Geliştirici' },
    { email: 'analyst@rcsteknoloji.com', password: 'analyst123', name: 'Emre Şahin', role: 'Sistem Analisti' },
    { email: 'manager@rcsteknoloji.com', password: 'manager123', name: 'Fatma Öztürk', role: 'Proje Müdürü' },
    { email: 'hr@rcsteknoloji.com', password: 'hr123', name: 'Hasan Çelik', role: 'İnsan Kaynakları' },
    { email: 'finance@rcsteknoloji.com', password: 'finance123', name: 'Seda Güven', role: 'Finans' },
    { email: 'marketing@rcsteknoloji.com', password: 'marketing123', name: 'Burak Aydın', role: 'Pazarlama' },
    { email: 'quality@rcsteknoloji.com', password: 'quality123', name: 'Deniz Korkmaz', role: 'Kalite Kontrol' },
    { email: 'operations@rcsteknoloji.com', password: 'ops123', name: 'Gökhan Taş', role: 'Operasyon' },
    { email: 'research@rcsteknoloji.com', password: 'research123', name: 'İpek Moral', role: 'AR-GE' }
];

// Sample Data for Demo
const sampleData = {
    licenses: [
        { id: 'PX-PRE-2024-001', customer: 'TechVision Ltd.', type: 'Premium', status: 'Aktif', expiry: '2025-12-31', devices: '5/10', usage: 89 },
        { id: 'PX-PRO-2024-002', customer: 'AutoMech Industries', type: 'Pro', status: 'Aktif', expiry: '2025-06-15', devices: '3/5', usage: 76 },
        { id: 'PX-STD-2024-003', customer: 'DefenseCorp Systems', type: 'Standart', status: 'Aktif', expiry: '2025-03-20', devices: '2/3', usage: 92 },
        { id: 'PX-PRE-2024-004', customer: 'InnovateDesign Co.', type: 'Premium', status: 'Beklemede', expiry: '2025-09-10', devices: '0/15', usage: 0 },
        { id: 'PX-PRO-2024-005', customer: 'Precision Engineering', type: 'Pro', status: 'Aktif', expiry: '2025-11-05', devices: '4/8', usage: 65 }
    ],
    tickets: [
        { id: 'ST-2024-001', title: 'ParametriX AI 2D→3D dönüşüm hatası', customer: 'TechVision Ltd.', priority: 'Yüksek', status: 'Açık', assignee: 'Ayşe Demir', time: '2 dakika önce', category: 'Teknik' },
        { id: 'ST-2024-002', title: 'Lisans aktivasyon sorunu', customer: 'AutoMech Industries', priority: 'Orta', status: 'İşlemde', assignee: 'Can Özkan', time: '15 dakika önce', category: 'Lisans' },
        { id: 'ST-2024-003', title: 'SolidWorks entegrasyon hatası', customer: 'DefenseCorp Systems', priority: 'Düşük', status: 'Çözüldü', assignee: 'Ayşe Demir', time: '1 saat önce', category: 'Entegrasyon' }
    ],
    users: [
        { name: 'Ahmet Yılmaz', email: 'admin@rcsteknoloji.com', role: 'Super Admin', status: 'Çevrimiçi', lastSeen: 'Şimdi' },
        { name: 'Ayşe Demir', email: 'support.senior@rcsteknoloji.com', role: 'Teknik Destek', status: 'Çevrimiçi', lastSeen: '5 dakika önce' },
        { name: 'Can Özkan', email: 'support.junior@rcsteknoloji.com', role: 'Teknik Destek', status: 'Meşgul', lastSeen: '1 saat önce' }
    ],
    activities: [
        { type: 'license', icon: 'fas fa-key', text: 'TechVision Ltd. yeni lisans aktivasyonu', time: '2 dakika önce', priority: 'normal' },
        { type: 'support', icon: 'fas fa-headset', text: 'AutoMech Industries destek talebi açtı', time: '15 dakika önce', priority: 'high' },
        { type: 'user', icon: 'fas fa-user', text: 'DefenseCorp Systems yeni kullanıcı kaydı', time: '1 saat önce', priority: 'normal' }
    ]
};

// Current User
let currentUser = null;
let currentTheme = 'dark';

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('parametrix-user');
    const savedTheme = localStorage.getItem('parametrix-theme') || 'dark';
    
    currentTheme = savedTheme;
    applyTheme(currentTheme);
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showLogin();
    }
    
    setupEventListeners();
    startRealTimeUpdates();
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
            updateActiveNav(item);
        });
    });

    // Global click handler for dynamic buttons
    document.addEventListener('click', handleDynamicButtons);
}

// ==========================================
// AUTHENTICATION
// ==========================================

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Validate email domain
    if (!email.endsWith('@rcsteknoloji.com')) {
        showNotification('E-posta adresi @rcsteknoloji.com ile bitmelidir!', 'error');
        return;
    }
    
    // Check credentials
    const user = validUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('parametrix-user', JSON.stringify(user));
        showNotification(`Hoş geldiniz, ${user.name}!`, 'success');
        showDashboard();
    } else {
        showNotification('Geçersiz e-posta veya şifre!', 'error');
        
        // Add shake animation
        const loginContainer = document.querySelector('.login-container');
        loginContainer.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginContainer.style.animation = '';
        }, 500);
    }
}

function handleLogout() {
    localStorage.removeItem('parametrix-user');
    currentUser = null;
    showNotification('Güvenli bir şekilde çıkış yaptınız.', 'success');
    showLogin();
}

function showLogin() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('dashboard').classList.add('hidden');
    
    // Reset form
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function showDashboard() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Update user info
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRole').textContent = currentUser.role.toUpperCase();
        document.getElementById('userInitials').textContent = 
            currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    
    // Initialize dashboard data
    populateAllSections();
}

// ==========================================
// THEME MANAGEMENT
// ==========================================

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('parametrix-theme', currentTheme);
    
    showNotification(`${currentTheme === 'dark' ? 'Karanlık' : 'Aydınlık'} tema aktif edildi`, 'success');
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// ==========================================
// NAVIGATION
// ==========================================

function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Populate section data
        populateSectionData(sectionName);
    }
}

function updateActiveNav(activeItem) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    activeItem.classList.add('active');
}

// ==========================================
// DATA POPULATION
// ==========================================

function populateAllSections() {
    populateDashboard();
    populateLicenses();
    populateSupport();
    populateMonitoring();
    populateReports();
    populateUsers();
}

function populateSectionData(sectionName) {
    switch (sectionName) {
        case 'dashboard':
            populateDashboard();
            break;
        case 'licenses':
            populateLicenses();
            break;
        case 'support':
            populateSupport();
            break;
        case 'monitoring':
            populateMonitoring();
            break;
        case 'reports':
            populateReports();
            break;
        case 'users':
            populateUsers();
            break;
    }
}

function populateDashboard() {
    populateStats();
    populateRecentActivities();
    populateSystemStatus();
}

function populateStats() {
    // Update stats with animated counting
    animateNumber('totalLicenses', sampleData.licenses.length, 1500);
    animateNumber('activeUsers', 916, 1200);
    animateNumber('openTickets', sampleData.tickets.filter(t => t.status === 'Açık').length, 800);
    
    document.getElementById('systemUptime').textContent = '100.0%';
    
    // Add click handlers to stat cards
    setTimeout(() => {
        const licenseCard = document.getElementById('totalLicenses')?.closest('.stat-card');
        const ticketCard = document.getElementById('openTickets')?.closest('.stat-card');
        const userCard = document.getElementById('activeUsers')?.closest('.stat-card');
        
        if (licenseCard) {
            licenseCard.style.cursor = 'pointer';
            licenseCard.onclick = () => {
                switchSection('licenses');
                updateActiveNav(document.querySelector('[data-section="licenses"]'));
                showNotification('Lisans yönetimi sayfasına yönlendirildiniz', 'success');
            };
        }
        
        if (ticketCard) {
            ticketCard.style.cursor = 'pointer';
            ticketCard.onclick = () => {
                switchSection('support');
                updateActiveNav(document.querySelector('[data-section="support"]'));
                showNotification('Teknik destek sayfasına yönlendirildiniz', 'success');
            };
        }
        
        if (userCard) {
            userCard.style.cursor = 'pointer';
            userCard.onclick = () => {
                switchSection('users');
                updateActiveNav(document.querySelector('[data-section="users"]'));
                showNotification('Kullanıcı yönetimi sayfasına yönlendirildiniz', 'success');
            };
        }
    }, 2000);
}

function populateRecentActivities() {
    const container = document.getElementById('recentActivities');
    if (!container) return;
    
    const html = sampleData.activities.map(activity => `
        <div class="flex items-center gap-3 p-3 mb-2 border border-opacity-20 rounded-lg hover:bg-opacity-5 hover:bg-white transition-all cursor-pointer scale-on-hover">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <i class="${activity.icon}"></i>
            </div>
            <div class="flex-1">
                <p class="text-sm font-medium text-white">${activity.text}</p>
                <p class="text-xs text-gray-400">${activity.time}</p>
            </div>
            <div class="w-2 h-2 rounded-full ${activity.priority === 'high' ? 'bg-red-500' : activity.priority === 'normal' ? 'bg-yellow-500' : 'bg-green-500'} pulse-animation"></div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function populateSystemStatus() {
    const container = document.getElementById('systemStatus');
    if (!container) return;
    
    const statusItems = [
        { name: 'API Sunucuları', status: 'Çevrimiçi', icon: 'fas fa-server', color: 'success' },
        { name: 'Veritabanı', status: 'Çevrimiçi', icon: 'fas fa-database', color: 'success' },
        { name: 'Lisans Sunucusu', status: 'Çevrimiçi', icon: 'fas fa-key', color: 'success' },
        { name: 'E-posta Servisi', status: 'Yavaş', icon: 'fas fa-envelope', color: 'warning' }
    ];
    
    const html = statusItems.map(item => `
        <div class="flex items-center justify-between p-3 mb-2 border border-opacity-20 rounded-lg hover:bg-opacity-5 hover:bg-white transition-all">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm">
                    <i class="${item.icon}"></i>
                </div>
                <span class="text-sm font-medium text-white">${item.name}</span>
            </div>
            <div class="badge badge-${item.color}">
                <i class="fas fa-circle"></i>
                ${item.status}
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function populateLicenses(filteredData = null) {
    const tbody = document.getElementById('licensesTableBody');
    if (!tbody) return;
    
    const dataToShow = filteredData || sampleData.licenses;
    
    const html = dataToShow.map(license => `
        <tr class="license-row" onclick="selectLicenseRow(this)" data-license-id="${license.id}">
            <td style="font-family: monospace; font-size: 0.9rem;">${license.id}</td>
            <td style="font-weight: 500;">${license.customer}</td>
            <td>
                <span class="badge badge-${license.type === 'Premium' ? 'primary' : license.type === 'Pro' ? 'secondary' : 'success'}">
                    ${license.type}
                </span>
            </td>
            <td>
                <span class="badge badge-${license.status === 'Aktif' ? 'success' : license.status === 'Beklemede' ? 'warning' : 'error'}">
                    ${license.status}
                </span>
            </td>
            <td>${license.expiry}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 0.9rem;">${license.devices}</span>
                    <div style="width: 4rem; height: 0.5rem; background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #06b6d4); transition: all 0.3s ease; width: ${license.usage}%;"></div>
                    </div>
                </div>
            </td>
            <td>
                <div style="display: flex; gap: 0.25rem;">
                    <button class="btn btn-sm btn-secondary" onclick="editLicense('${license.id}')" title="Düzenle">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="viewLicenseHistory('${license.id}')" title="Geçmiş">
                        <i class="fas fa-history"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = html;
    
    // Setup search and filter
    setupLicenseSearchAndFilter();
}

function selectLicenseRow(row) {
    // Remove previous selection
    document.querySelectorAll('.license-row').forEach(r => r.classList.remove('selected'));
    // Add selection to clicked row
    row.classList.add('selected');
}

function setupLicenseSearchAndFilter() {
    const searchInput = document.querySelector('#licensesSection .search-input');
    const filterSelect = document.querySelector('#licensesSection .form-select');
    
    if (searchInput) {
        searchInput.oninput = (e) => {
            filterLicenses();
        };
    }
    
    if (filterSelect) {
        filterSelect.onchange = (e) => {
            filterLicenses();
        };
    }
}

function filterLicenses() {
    const searchInput = document.querySelector('#licensesSection .search-input');
    const filterSelect = document.querySelector('#licensesSection .form-select');
    
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const filterType = filterSelect?.value || '';
    
    let filteredLicenses = sampleData.licenses.filter(license => {
        const matchesSearch = 
            license.id.toLowerCase().includes(searchTerm) ||
            license.customer.toLowerCase().includes(searchTerm) ||
            license.type.toLowerCase().includes(searchTerm) ||
            license.status.toLowerCase().includes(searchTerm);
            
        const matchesFilter = !filterType || filterType === 'Tüm Türler' || license.type === filterType;
        
        return matchesSearch && matchesFilter;
    });
    
    populateLicenses(filteredLicenses);
}

function populateSupport() {
    const container = document.getElementById('supportTickets');
    if (!container) return;
    
    const html = sampleData.tickets.map(ticket => `
        <div class="ticket-card glow-effect">
            <div class="ticket-header">
                <div>
                    <div class="ticket-title">${ticket.title}</div>
                    <div class="text-sm text-gray-400 mt-1">#${ticket.id}</div>
                </div>
                <span class="badge badge-${ticket.priority === 'Yüksek' ? 'error' : ticket.priority === 'Orta' ? 'warning' : 'success'}">
                    ${ticket.priority}
                </span>
            </div>
            <div class="mt-3">
                <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <i class="fas fa-building"></i>
                    ${ticket.customer}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <i class="fas fa-tag"></i>
                    ${ticket.category}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <i class="fas fa-clock"></i>
                    ${ticket.time}
                </div>
                ${ticket.assignee ? `
                <div class="flex items-center gap-2 text-sm text-gray-400">
                    <i class="fas fa-user"></i>
                    ${ticket.assignee}
                </div>
                ` : ''}
            </div>
            <div class="ticket-actions">
                <button class="btn btn-sm btn-primary" onclick="assignTicket('${ticket.id}')">
                    <i class="fas fa-user-plus"></i>
                    Atama
                </button>
                <button class="btn btn-sm btn-secondary" onclick="viewTicketDetails('${ticket.id}')">
                    <i class="fas fa-eye"></i>
                    Detay
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function populateMonitoring() {
    populatePerformanceCharts();
    populateLiveMetrics();
    populateSystemHealth();
    populateLiveActivities();
    populateCriticalAlerts();
    populateGeographicData();
    
    // Setup monitoring controls
    setupMonitoringControls();
}

function setupMonitoringControls() {
    const pauseBtn = document.getElementById('pauseMonitoring');
    const refreshBtn = document.getElementById('refreshMonitoring');
    
    if (pauseBtn) {
        pauseBtn.onclick = () => {
            const isPaused = pauseBtn.textContent.includes('Devam');
            if (isPaused) {
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Duraklat';
                showNotification('Canlı izleme devam ettirildi', 'success');
            } else {
                pauseBtn.innerHTML = '<i class="fas fa-play"></i> Devam Et';
                showNotification('Canlı izleme duraklatıldı', 'warning');
            }
        };
    }
    
    if (refreshBtn) {
        refreshBtn.onclick = () => {
            showNotification('Monitoring verileri yenileniyor...', 'success');
            populateMonitoring();
        };
    }
}

function populatePerformanceCharts() {
    const container = document.getElementById('performanceCharts');
    if (!container) return;
    
    // Generate sample performance data
    const cpuData = Array.from({length: 20}, () => Math.floor(Math.random() * 40) + 10);
    const memData = Array.from({length: 20}, () => Math.floor(Math.random() * 30) + 40);
    const netData = Array.from({length: 20}, () => Math.floor(Math.random() * 60) + 20);
    
    container.innerHTML = `
        <div style="display: grid; gap: 1.5rem;">
            <div>
                <h5 style="color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-microchip" style="color: #3b82f6;"></i>
                    CPU Kullanımı (Son 20 dakika)
                </h5>
                <div style="height: 60px; background: var(--bg-glass); border-radius: var(--border-radius); padding: 1rem; position: relative; overflow: hidden;">
                    <div style="display: flex; align-items: end; height: 100%; gap: 2px;">
                        ${cpuData.map((value, index) => `
                            <div style="
                                height: ${value}%; 
                                background: linear-gradient(to top, #3b82f6, #06b6d4); 
                                width: ${100/cpuData.length}%; 
                                border-radius: 2px;
                                transition: height 0.3s ease;
                                opacity: ${0.5 + (index/cpuData.length) * 0.5};
                            "></div>
                        `).join('')}
                    </div>
                    <div style="position: absolute; top: 0.5rem; right: 1rem; font-size: 1.5rem; font-weight: bold; color: var(--text-primary);">
                        ${cpuData[cpuData.length-1]}%
                    </div>
                </div>
            </div>
            
            <div>
                <h5 style="color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-memory" style="color: #10b981;"></i>
                    Bellek Kullanımı
                </h5>
                <div style="height: 60px; background: var(--bg-glass); border-radius: var(--border-radius); padding: 1rem; position: relative;">
                    <div style="display: flex; align-items: end; height: 100%; gap: 2px;">
                        ${memData.map((value, index) => `
                            <div style="
                                height: ${value}%; 
                                background: linear-gradient(to top, #10b981, #22c55e); 
                                width: ${100/memData.length}%; 
                                border-radius: 2px;
                                opacity: ${0.5 + (index/memData.length) * 0.5};
                            "></div>
                        `).join('')}
                    </div>
                    <div style="position: absolute; top: 0.5rem; right: 1rem; font-size: 1.5rem; font-weight: bold; color: var(--text-primary);">
                        ${memData[memData.length-1]}%
                    </div>
                </div>
            </div>
            
            <div>
                <h5 style="color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-wifi" style="color: #f59e0b;"></i>
                    Ağ Trafiği
                </h5>
                <div style="height: 60px; background: var(--bg-glass); border-radius: var(--border-radius); padding: 1rem; position: relative;">
                    <div style="display: flex; align-items: end; height: 100%; gap: 2px;">
                        ${netData.map((value, index) => `
                            <div style="
                                height: ${value}%; 
                                background: linear-gradient(to top, #f59e0b, #fbbf24); 
                                width: ${100/netData.length}%; 
                                border-radius: 2px;
                                opacity: ${0.5 + (index/netData.length) * 0.5};
                            "></div>
                        `).join('')}
                    </div>
                    <div style="position: absolute; top: 0.5rem; right: 1rem; font-size: 1.5rem; font-weight: bold; color: var(--text-primary);">
                        ${netData[netData.length-1]}%
                    </div>
                </div>
            </div>
        </div>
    `;
}

function populateLiveMetrics() {
    const container = document.getElementById('liveMetrics');
    if (!container) return;
    
    const metrics = [
        { name: 'Response Time', value: '1.2ms', icon: 'fas fa-clock', color: '#10b981' },
        { name: 'Throughput', value: '847/s', icon: 'fas fa-tachometer-alt', color: '#3b82f6' },
        { name: 'Error Rate', value: '0.03%', icon: 'fas fa-exclamation-triangle', color: '#f59e0b' },
        { name: 'Connections', value: '1,247', icon: 'fas fa-link', color: '#7c3aed' },
        { name: 'Queue Size', value: '12', icon: 'fas fa-list', color: '#06b6d4' },
        { name: 'Cache Hit', value: '94.2%', icon: 'fas fa-database', color: '#10b981' }
    ];
    
    container.innerHTML = metrics.map(metric => `
        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary); margin-bottom: 0.75rem;">
            <div style="width: 40px; height: 40px; background: ${metric.color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="${metric.icon}" style="color: ${metric.color}; font-size: 1.1rem;"></i>
            </div>
            <div style="flex: 1;">
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.25rem;">${metric.name}</div>
                <div style="font-size: 1.25rem; font-weight: bold; color: var(--text-primary);">${metric.value}</div>
            </div>
        </div>
    `).join('');
}

function populateSystemHealth() {
    const container = document.getElementById('systemHealth');
    if (!container) return;
    
    const services = [
        { name: 'API Gateway', status: 'healthy', uptime: '99.9%', latency: '12ms' },
        { name: 'Authentication', status: 'healthy', uptime: '99.8%', latency: '8ms' },
        { name: 'Database', status: 'healthy', uptime: '100%', latency: '3ms' },
        { name: 'License Server', status: 'healthy', uptime: '99.7%', latency: '15ms' },
        { name: 'File Storage', status: 'warning', uptime: '99.2%', latency: '45ms' },
        { name: 'Email Service', status: 'healthy', uptime: '98.9%', latency: '120ms' }
    ];
    
    container.innerHTML = services.map(service => `
        <div style="display: flex; align-items: center; justify-content: between; padding: 0.75rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary); margin-bottom: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: ${service.status === 'healthy' ? '#10b981' : service.status === 'warning' ? '#f59e0b' : '#ef4444'}; box-shadow: 0 0 8px ${service.status === 'healthy' ? '#10b981' : service.status === 'warning' ? '#f59e0b' : '#ef4444'}50;"></div>
                <div>
                    <div style="font-weight: 500; color: var(--text-primary); font-size: 0.9rem;">${service.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Uptime: ${service.uptime} • Latency: ${service.latency}</div>
                </div>
            </div>
            <span class="badge badge-${service.status === 'healthy' ? 'success' : service.status === 'warning' ? 'warning' : 'error'}">
                ${service.status === 'healthy' ? 'Sağlıklı' : service.status === 'warning' ? 'Uyarı' : 'Hata'}
            </span>
        </div>
    `).join('');
}

function populateLiveActivities() {
    const container = document.getElementById('liveActivities');
    if (!container) return;
    
    if (!window.liveActivitiesData) {
        window.liveActivitiesData = [
            { time: new Date().toLocaleTimeString(), action: 'Kullanıcı girişi', user: 'ayse.demir@rcsteknoloji.com', icon: 'fas fa-sign-in-alt', type: 'success' },
            { time: new Date(Date.now() - 30000).toLocaleTimeString(), action: 'Lisans aktivasyonu', user: 'TechVision Ltd.', icon: 'fas fa-key', type: 'primary' },
            { time: new Date(Date.now() - 60000).toLocaleTimeString(), action: 'API çağrısı başarısız', user: 'AutoMech Industries', icon: 'fas fa-exclamation-triangle', type: 'warning' },
            { time: new Date(Date.now() - 120000).toLocaleTimeString(), action: 'Yedekleme tamamlandı', user: 'System', icon: 'fas fa-download', type: 'success' }
        ];
    }
    
    container.innerHTML = `
        <div style="max-height: 300px; overflow-y: auto;">
            ${window.liveActivitiesData.map(activity => `
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary); margin-bottom: 0.5rem;">
                    <div style="width: 32px; height: 32px; background: var(--${activity.type === 'success' ? 'success' : activity.type === 'warning' ? 'warning' : activity.type === 'error' ? 'error' : 'primary'}-color)20; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="${activity.icon}" style="color: var(--${activity.type === 'success' ? 'success' : activity.type === 'warning' ? 'warning' : activity.type === 'error' ? 'error' : 'primary'}-color); font-size: 0.9rem;"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">${activity.action}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${activity.user} • ${activity.time}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function populateCriticalAlerts() {
    const container = document.getElementById('criticalAlerts');
    if (!container) return;
    
    // Mock critical alerts (normally empty)
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
            <i class="fas fa-shield-alt" style="font-size: 2rem; margin-bottom: 1rem; color: var(--success-color);"></i>
            <div style="font-size: 0.9rem;">Sistem sağlıklı çalışıyor</div>
            <div style="font-size: 0.8rem; margin-top: 0.5rem;">Kritik uyarı bulunmuyor</div>
        </div>
    `;
}

function populateGeographicData() {
    const container = document.getElementById('geographicData');
    if (!container) return;
    
    const regions = [
        { name: 'İstanbul', users: 342, percentage: 45.2 },
        { name: 'Ankara', users: 178, percentage: 23.5 },
        { name: 'İzmir', users: 124, percentage: 16.4 },
        { name: 'Bursa', users: 67, percentage: 8.9 },
        { name: 'Diğer', users: 46, percentage: 6.0 }
    ];
    
    container.innerHTML = `
        <div>
            ${regions.map(region => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary); margin-bottom: 0.5rem;">
                    <div>
                        <div style="font-weight: 500; color: var(--text-primary); font-size: 0.9rem;">${region.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${region.users} kullanıcı</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 600; color: var(--text-primary);">%${region.percentage}</div>
                        <div style="width: 60px; height: 4px; background: var(--bg-glass); border-radius: 2px; overflow: hidden; margin-top: 0.25rem;">
                            <div style="height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); width: ${region.percentage}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function clearActivityLog() {
    window.liveActivitiesData = [];
    populateLiveActivities();
    showNotification('Aktivite geçmişi temizlendi', 'success');
}

function populateReports() {
    populateRevenueChart();
    populateProductDistribution();
    populateUsageAnalytics();
    populatePerformanceReports();
    populateCustomerSatisfaction();
    populateIssueAnalysis();
    populateDetailedSalesReport();
    
    // Setup report controls
    setupReportControls();
}

function setupReportControls() {
    const dateRangeBtn = document.getElementById('selectDateRange');
    const downloadBtn = document.getElementById('downloadReports');
    
    if (dateRangeBtn) {
        dateRangeBtn.onclick = () => {
            showNotification('Tarih aralığı seçici açılıyor...', 'success');
        };
    }
    
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            showNotification('Tüm raporlar hazırlanıyor ve indiriliyor...', 'success');
            setTimeout(() => {
                const reportData = generateComprehensiveReport();
                downloadFile('parametrix_comprehensive_report.json', JSON.stringify(reportData, null, 2));
                showNotification('Kapsamlı rapor başarıyla indirildi!', 'success');
            }, 2000);
        };
    }
}

function populateRevenueChart() {
    const container = document.getElementById('revenueChart');
    if (!container) return;
    
    // Generate sample revenue data
    const monthlyData = [
        { month: 'Oca', revenue: 180000 },
        { month: 'Şub', revenue: 195000 },
        { month: 'Mar', revenue: 167000 },
        { month: 'Nis', revenue: 220000 },
        { month: 'May', revenue: 245000 },
        { month: 'Haz', revenue: 232000 },
        { month: 'Tem', revenue: 278000 },
        { month: 'Ağu', revenue: 289000 },
        { month: 'Eyl', revenue: 312000 },
        { month: 'Eki', revenue: 295000 },
        { month: 'Kas', revenue: 334000 },
        { month: 'Ara', revenue: 356000 }
    ];
    
    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
    
    container.innerHTML = `
        <div style="height: 300px; position: relative;">
            <div style="display: flex; align-items: end; height: 250px; gap: 8px; margin-bottom: 1rem;">
                ${monthlyData.map((data, index) => {
                    const height = (data.revenue / maxRevenue) * 100;
                    const color = index === monthlyData.length - 1 ? '#3b82f6' : '#06b6d4';
                    return `
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%;">
                            <div style="height: ${height}%; background: linear-gradient(to top, ${color}, ${color}80); border-radius: 4px 4px 0 0; width: 100%; position: relative; transition: all 0.3s ease; cursor: pointer;" 
                                 onmouseover="showRevenueTooltip(event, '${data.month}', '₺${(data.revenue/1000).toFixed(0)}K')"
                                 onmouseout="hideRevenueTooltip()">
                            </div>
                            <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-secondary);">${data.month}</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
                <span>₺0</span>
                <span>₺${(maxRevenue/1000).toFixed(0)}K</span>
            </div>
        </div>
    `;
}

function populateProductDistribution() {
    const container = document.getElementById('productDistribution');
    if (!container) return;
    
    const products = [
        { name: 'Standard', count: 124, percentage: 52.3, color: '#10b981' },
        { name: 'Pro', count: 67, percentage: 28.2, color: '#3b82f6' },
        { name: 'Premium', count: 46, percentage: 19.5, color: '#7c3aed' }
    ];
    
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${products.map(product => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: ${product.color};"></div>
                        <div>
                            <div style="font-weight: 500; color: var(--text-primary);">${product.name}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">${product.count} lisans</div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 600; color: var(--text-primary);">%${product.percentage}</div>
                        <div style="width: 60px; height: 4px; background: var(--bg-glass); border-radius: 2px; overflow: hidden; margin-top: 0.25rem;">
                            <div style="height: 100%; background: ${product.color}; width: ${product.percentage}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function populateUsageAnalytics() {
    const container = document.getElementById('usageAnalytics');
    if (!container) return;
    
    const usageData = [
        { feature: '2D→3D Dönüşüm', usage: 1234, trend: '+15%', color: '#3b82f6' },
        { feature: 'Akıllı Asistan', usage: 856, trend: '+23%', color: '#10b981' },
        { feature: 'CAD Otomasyon', usage: 542, trend: '+8%', color: '#7c3aed' },
        { feature: 'Dosya Dönüştürme', usage: 378, trend: '+12%', color: '#f59e0b' },
        { feature: 'Toplu İşlemler', usage: 267, trend: '+5%', color: '#ef4444' }
    ];
    
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${usageData.map(item => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${item.color};"></div>
                        <span style="font-size: 0.9rem; color: var(--text-primary);">${item.feature}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span style="font-weight: 600; color: var(--text-primary);">${item.usage.toLocaleString()}</span>
                        <span style="font-size: 0.8rem; color: var(--success-color);">${item.trend}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function populatePerformanceReports() {
    const container = document.getElementById('performanceReports');
    if (!container) return;
    
    const metrics = [
        { name: 'Sistem Uptime', value: '99.98%', status: 'excellent' },
        { name: 'Ortalama Yanıt Süresi', value: '1.2ms', status: 'good' },
        { name: 'API Başarı Oranı', value: '99.7%', status: 'excellent' },
        { name: 'Hata Oranı', value: '0.03%', status: 'excellent' },
        { name: 'Veri İşleme Hızı', value: '847/s', status: 'good' }
    ];
    
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${metrics.map(metric => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                    <span style="font-size: 0.9rem; color: var(--text-primary);">${metric.name}</span>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight: 600; color: var(--text-primary);">${metric.value}</span>
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${metric.status === 'excellent' ? '#10b981' : metric.status === 'good' ? '#f59e0b' : '#ef4444'};"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function populateCustomerSatisfaction() {
    const container = document.getElementById('customerSatisfaction');
    if (!container) return;
    
    const ratings = [
        { stars: 5, count: 178, percentage: 72.4 },
        { stars: 4, count: 45, percentage: 18.3 },
        { stars: 3, count: 15, percentage: 6.1 },
        { stars: 2, count: 5, percentage: 2.0 },
        { stars: 1, count: 3, percentage: 1.2 }
    ];
    
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
            ${ratings.map(rating => `
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                    <div style="display: flex; gap: 2px;">
                        ${Array.from({length: 5}, (_, i) => `
                            <i class="fas fa-star" style="color: ${i < rating.stars ? '#fbbf24' : '#374151'}; font-size: 0.8rem;"></i>
                        `).join('')}
                    </div>
                    <div style="flex: 1; height: 4px; background: var(--bg-glass); border-radius: 2px; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #fbbf24, #f59e0b); width: ${rating.percentage}%; transition: width 0.3s ease;"></div>
                    </div>
                    <span style="font-size: 0.8rem; color: var(--text-muted); min-width: 2rem;">${rating.count}</span>
                </div>
            `).join('')}
        </div>
        <div style="text-center; padding: 1rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--text-primary); margin-bottom: 0.25rem;">4.8/5.0</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">246 değerlendirme</div>
        </div>
    `;
}

function populateIssueAnalysis() {
    const container = document.getElementById('issueAnalysis');
    if (!container) return;
    
    const issues = [
        { type: 'Lisans Aktivasyon', count: 12, severity: 'warning', trend: '-23%' },
        { type: '2D→3D Dönüşüm', count: 8, severity: 'error', trend: '+15%' },
        { type: 'SolidWorks Entegrasyon', count: 5, severity: 'warning', trend: '-8%' },
        { type: 'Performans', count: 3, severity: 'error', trend: '+50%' },
        { type: 'Diğer', count: 7, severity: 'info', trend: '-12%' }
    ];
    
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${issues.map(issue => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${issue.severity === 'error' ? '#ef4444' : issue.severity === 'warning' ? '#f59e0b' : '#06b6d4'};"></div>
                        <span style="font-size: 0.9rem; color: var(--text-primary);">${issue.type}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span style="font-weight: 600; color: var(--text-primary);">${issue.count}</span>
                        <span style="font-size: 0.8rem; color: ${issue.trend.startsWith('+') ? '#ef4444' : '#10b981'};">${issue.trend}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function populateDetailedSalesReport() {
    const container = document.getElementById('detailedSalesReport');
    if (!container) return;
    
    const salesData = [
        { date: '2024-12-15', customer: 'TechVision Ltd.', product: 'Premium', amount: 15000, status: 'Tamamlandı' },
        { date: '2024-12-14', customer: 'AutoMech Industries', product: 'Pro', amount: 8500, status: 'Tamamlandı' },
        { date: '2024-12-13', customer: 'DefenseCorp Systems', product: 'Standard', amount: 4200, status: 'Tamamlandı' },
        { date: '2024-12-12', customer: 'InnovateDesign Co.', product: 'Premium', amount: 15000, status: 'Beklemede' },
        { date: '2024-12-11', customer: 'Precision Engineering', product: 'Pro', amount: 8500, status: 'Tamamlandı' }
    ];
    
    container.innerHTML = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--bg-glass); border-bottom: 1px solid var(--border-secondary);">
                        <th style="padding: 1rem; text-align: left; font-weight: 600; color: var(--text-primary);">Tarih</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600; color: var(--text-primary);">Müşteri</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600; color: var(--text-primary);">Ürün</th>
                        <th style="padding: 1rem; text-align: right; font-weight: 600; color: var(--text-primary);">Tutar</th>
                        <th style="padding: 1rem; text-align: center; font-weight: 600; color: var(--text-primary);">Durum</th>
                    </tr>
                </thead>
                <tbody>
                    ${salesData.map(sale => `
                        <tr style="border-bottom: 1px solid var(--border-muted); transition: background 0.2s ease;" onmouseover="this.style.background='var(--bg-glass)'" onmouseout="this.style.background='transparent'">
                            <td style="padding: 1rem; color: var(--text-secondary);">${sale.date}</td>
                            <td style="padding: 1rem; color: var(--text-primary); font-weight: 500;">${sale.customer}</td>
                            <td style="padding: 1rem;">
                                <span class="badge badge-${sale.product === 'Premium' ? 'primary' : sale.product === 'Pro' ? 'secondary' : 'success'}">
                                    ${sale.product}
                                </span>
                            </td>
                            <td style="padding: 1rem; text-align: right; color: var(--text-primary); font-weight: 600;">₺${sale.amount.toLocaleString()}</td>
                            <td style="padding: 1rem; text-align: center;">
                                <span class="badge badge-${sale.status === 'Tamamlandı' ? 'success' : 'warning'}">
                                    ${sale.status}
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Report utility functions
function changeRevenueView(type) {
    showNotification(`Gelir görünümü ${type === 'monthly' ? 'aylık' : 'çeyreklik'} olarak değiştirildi`, 'success');
    populateRevenueChart();
}

function exportUsageData() {
    showNotification('Kullanım verileri CSV formatında indiriliyor...', 'success');
}

function filterSalesReport(period) {
    showNotification(`Satış raporu ${period} dönemi için filtrelendi`, 'success');
    populateDetailedSalesReport();
}

function exportSalesReport() {
    showNotification('Satış raporu Excel formatında indiriliyor...', 'success');
}

function generateComprehensiveReport() {
    return {
        timestamp: new Date().toISOString(),
        reportType: 'Comprehensive Business Report',
        period: 'Last 12 Months',
        summary: {
            totalRevenue: '₺2.47M',
            totalCustomers: 347,
            renewalRate: '94.2%',
            avgUsageTime: '127h'
        },
        revenue: {
            monthly: [180000, 195000, 167000, 220000, 245000, 232000, 278000, 289000, 312000, 295000, 334000, 356000],
            growth: '+23.5%'
        },
        products: {
            standard: { count: 124, percentage: 52.3 },
            pro: { count: 67, percentage: 28.2 },
            premium: { count: 46, percentage: 19.5 }
        },
        performance: {
            uptime: '99.98%',
            responseTime: '1.2ms',
            successRate: '99.7%',
            errorRate: '0.03%'
        },
        satisfaction: {
            average: 4.8,
            totalReviews: 246,
            distribution: [178, 45, 15, 5, 3]
        }
    };
}

function showRevenueTooltip(event, month, amount) {
    // Tooltip implementation would go here
    console.log(`${month}: ${amount}`);
}

function hideRevenueTooltip() {
    // Hide tooltip implementation
}

function populateUsers() {
    const container = document.getElementById('usersGrid');
    if (!container) return;
    
    const html = sampleData.users.map(user => `
        <div class="user-card glow-effect">
            <div class="user-header">
                <div class="flex items-center gap-3">
                    <div class="user-avatar">
                        ${user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                        <div class="user-name">${user.name}</div>
                        <div class="text-sm text-gray-400">${user.email}</div>
                    </div>
                </div>
                <span class="badge badge-${user.status === 'Çevrimiçi' ? 'success' : user.status === 'Meşgul' ? 'warning' : 'error'}">
                    ${user.status}
                </span>
            </div>
            <div class="mt-3">
                <div class="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <i class="fas fa-user-tag"></i>
                    ${user.role}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                    <i class="fas fa-clock"></i>
                    Son görülme: ${user.lastSeen}
                </div>
            </div>
            <div class="user-actions">
                <button class="btn btn-sm btn-secondary" onclick="editUser('${user.email}')">
                    <i class="fas fa-edit"></i>
                    Düzenle
                </button>
                <button class="btn btn-sm btn-secondary" onclick="viewUserHistory('${user.email}')">
                    <i class="fas fa-history"></i>
                    Geçmiş
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// ==========================================
// DYNAMIC BUTTON HANDLERS
// ==========================================

function handleDynamicButtons(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    const buttonText = target.textContent.trim();
    const buttonIcon = target.querySelector('i');
    
    if (buttonText.includes('Yeni Lisans') || buttonIcon?.classList.contains('fa-plus')) {
        handleNewLicense();
    } else if (buttonText.includes('Dışa Aktar') || buttonIcon?.classList.contains('fa-download')) {
        handleExport();
    } else if (buttonText.includes('Yeni Talep')) {
        handleNewTicket();
    } else if (buttonText.includes('Yenile') || buttonIcon?.classList.contains('fa-sync-alt')) {
        handleRefresh();
    } else if (buttonText.includes('Rapor İndir')) {
        handleDownloadReport();
    } else if (buttonText.includes('Yeni Kullanıcı') || buttonIcon?.classList.contains('fa-user-plus')) {
        handleNewUser();
    }
}

function handleNewLicense() {
    showModal('Yeni Lisans Oluştur', createLicenseForm());
}

function handleExport() {
    showNotification('Lisans verileri CSV formatında indiriliyor...', 'success');
    setTimeout(() => {
        const csvContent = generateCSV(sampleData.licenses);
        downloadFile('parametrix_licenses.csv', csvContent);
        showNotification('CSV dosyası başarıyla indirildi!', 'success');
    }, 1000);
}

function handleNewTicket() {
    showModal('Yeni Destek Talebi', createTicketForm());
}

function handleRefresh() {
    showNotification('Veriler yenileniyor...', 'success');
    populateAllSections();
    updateRealTimeData();
    setTimeout(() => {
        showNotification('Tüm veriler başarıyla yenilendi!', 'success');
    }, 1500);
}

function handleDownloadReport() {
    showNotification('Sistem raporu hazırlanıyor...', 'success');
    setTimeout(() => {
        const reportData = generateReport();
        downloadFile('parametrix_report.json', JSON.stringify(reportData, null, 2));
        showNotification('Rapor başarıyla indirildi!', 'success');
    }, 1000);
}

function handleNewUser() {
    showModal('Yeni Kullanıcı Ekle', createUserForm());
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function animateNumber(elementId, targetNumber, duration = 1000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startNumber = 0;
    const increment = targetNumber / (duration / 16);
    let currentNumber = startNumber;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            element.textContent = targetNumber.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentNumber).toLocaleString();
        }
    }, 16);
}

function showNotification(message, type = 'success') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// ==========================================
// REAL-TIME UPDATES
// ==========================================

function startRealTimeUpdates() {
    // Update every 30 seconds
    setInterval(updateRealTimeData, 30000);
}

function updateRealTimeData() {
    // Update stats
    populateStats();
    
    // Update monitoring data
    populateRealtimeUsers();
    populateSystemPerformance();
    populateDeviceLogs();
    
    // Add new random activity
    const randomActivities = [
        'Yeni lisans aktivasyonu tamamlandı',
        'Sistem performans kontrolü yapıldı',
        'Kullanıcı oturum açma kaydedildi',
        'Otomatik yedekleme tamamlandı',
        'Güvenlik taraması başlatıldı'
    ];
    
    const randomActivity = {
        type: 'system',
        icon: 'fas fa-cog',
        text: randomActivities[Math.floor(Math.random() * randomActivities.length)],
        time: 'Şimdi',
        priority: 'normal'
    };
    
    sampleData.activities.unshift(randomActivity);
    if (sampleData.activities.length > 10) {
        sampleData.activities.pop();
    }
    
    populateRecentActivities();
}

// ==========================================
// INDIVIDUAL FUNCTION HANDLERS
// ==========================================

function editLicense(licenseId) {
    showNotification(`${licenseId} lisansı düzenleniyor...`, 'success');
}

function viewLicenseHistory(licenseId) {
    showNotification(`${licenseId} lisans geçmişi görüntüleniyor...`, 'success');
}

function assignTicket(ticketId) {
    const ticket = sampleData.tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    const technicians = [
        'Ayşe Demir - Kıdemli Teknik Destek',
        'Can Özkan - Teknik Destek',
        'Zeynep Arslan - Sistem Analisti',
        'Elif Yılmaz - Yazılım Geliştirici',
        'Emre Şahin - Sistem Analisti'
    ];
    
    showModal('Teknik Personel Atama', `
        <div style="margin-bottom: 1rem;">
            <strong>Talep:</strong> ${ticket.title}<br>
            <strong>Müşteri:</strong> ${ticket.customer}<br>
            <strong>Öncelik:</strong> <span class="badge badge-${ticket.priority === 'Yüksek' ? 'error' : ticket.priority === 'Orta' ? 'warning' : 'success'}">${ticket.priority}</span>
        </div>
        <form id="assignForm" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
                <label class="form-label">Teknik Personel</label>
                <select name="technician" class="form-select" required>
                    <option value="">Personel seçin</option>
                    ${technicians.map(tech => `<option value="${tech}">${tech}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Öncelik Güncelle</label>
                <select name="priority" class="form-select">
                    <option value="${ticket.priority}">${ticket.priority} (Mevcut)</option>
                    <option value="Düşük">Düşük</option>
                    <option value="Orta">Orta</option>
                    <option value="Yüksek">Yüksek</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Atama Notu</label>
                <textarea name="note" rows="3" class="form-textarea" placeholder="Atama ile ilgili notlarınızı yazın..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-user-plus"></i>
                Personel Ata
            </button>
        </form>
    `);
    
    document.getElementById('assignForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Update ticket
        ticket.assignee = formData.get('technician').split(' - ')[0];
        ticket.priority = formData.get('priority');
        ticket.status = 'İşlemde';
        
        populateSupport();
        closeModal();
        showNotification(`Talep ${ticket.assignee} kişisine atandı`, 'success');
    });
}

function viewTicketDetails(ticketId) {
    const ticket = sampleData.tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    const ticketDetails = {
        'ST-2024-001': {
            description: 'ParametriX AI 2D→3D dönüşüm işlemi sırasında karmaşık teknik çizimlerde hata alınıyor. Sistem AutoCAD DWG dosyalarını tanımakta zorlanıyor.',
            steps: ['Kullanıcı DWG dosyasını yükledi', 'AI işlem başlatıldı', 'Dönüşüm %45\'te durdu', 'Hata mesajı: "Complex geometry not supported"'],
            systemInfo: 'Windows 11, 16GB RAM, ParametriX AI v2.1.0',
            attachments: ['hata_ekran_goruntusu.png', 'dwg_dosyasi.zip', 'sistem_log.txt']
        },
        'ST-2024-002': {
            description: 'Kullanıcı lisans aktivasyonu yapamıyor. "License server unreachable" hatası alıyor.',
            steps: ['Lisans anahtarı girildi', 'Internet bağlantısı kontrol edildi', 'Firewall ayarları incelendi', 'Hâlâ bağlantı sorunu var'],
            systemInfo: 'Windows 10, SolidWorks 2023, ParametriX v2.0.5',
            attachments: ['network_diagnostics.txt', 'license_log.txt']
        },
        'ST-2024-003': {
            description: 'SolidWorks entegrasyonu çalışmıyor. Add-in menüde görünmüyor.',
            steps: ['SolidWorks yeniden başlatıldı', 'Add-in manuel olarak etkinleştirildi', 'Registry kontrol edildi', 'Sorun devam ediyor'],
            systemInfo: 'Windows 11, SolidWorks 2024, ParametriX v2.1.0',
            attachments: ['solidworks_addin_log.txt', 'registry_backup.reg']
        }
    };
    
    const details = ticketDetails[ticketId] || {
        description: 'Bu talep için detaylı açıklama henüz eklenmemiş.',
        steps: ['Talep oluşturuldu', 'İnceleme bekleniyor'],
        systemInfo: 'Sistem bilgisi bekleniyor',
        attachments: []
    };
    
    showModal('Talep Detayları', `
        <div style="max-height: 60vh; overflow-y: auto;">
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">${ticket.title}</h4>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    <span><strong>ID:</strong> ${ticket.id}</span>
                    <span><strong>Müşteri:</strong> ${ticket.customer}</span>
                    <span><strong>Kategori:</strong> ${ticket.category}</span>
                    <span><strong>Zaman:</strong> ${ticket.time}</span>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <span class="badge badge-${ticket.priority === 'Yüksek' ? 'error' : ticket.priority === 'Orta' ? 'warning' : 'success'}">
                        ${ticket.priority} Öncelik
                    </span>
                    <span class="badge badge-${ticket.status === 'Açık' ? 'warning' : ticket.status === 'İşlemde' ? 'primary' : 'success'}">
                        ${ticket.status}
                    </span>
                    ${ticket.assignee ? `<span><strong>Atanan:</strong> ${ticket.assignee}</span>` : '<span style="color: var(--warning-color);">Atama Bekleniyor</span>'}
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-file-alt"></i> Sorun Açıklaması
                </h5>
                <p style="color: var(--text-secondary); line-height: 1.6; background: var(--bg-glass); padding: 1rem; border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                    ${details.description}
                </p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-list-ol"></i> Gerçekleştirilen Adımlar
                </h5>
                <ul style="color: var(--text-secondary); padding-left: 1.5rem;">
                    ${details.steps.map(step => `<li style="margin-bottom: 0.5rem;">${step}</li>`).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h5 style="color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-desktop"></i> Sistem Bilgileri
                </h5>
                <p style="color: var(--text-secondary); background: var(--bg-glass); padding: 1rem; border-radius: var(--border-radius); border: 1px solid var(--border-secondary); font-family: monospace;">
                    ${details.systemInfo}
                </p>
            </div>
            
            ${details.attachments.length > 0 ? `
            <div>
                <h5 style="color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-paperclip"></i> Ekler
                </h5>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${details.attachments.map(file => `
                        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                            <i class="fas fa-file" style="color: var(--primary-color);"></i>
                            <span style="color: var(--text-secondary);">${file}</span>
                            <button class="btn btn-sm btn-secondary" style="margin-left: auto;" onclick="downloadAttachment('${file}')">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
        
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-secondary); display: flex; gap: 1rem;">
            <button class="btn btn-primary" onclick="assignTicket('${ticketId}'); closeModal();">
                <i class="fas fa-user-plus"></i>
                Personel Ata
            </button>
            <button class="btn btn-secondary" onclick="updateTicketStatus('${ticketId}', 'Çözüldü'); closeModal();">
                <i class="fas fa-check"></i>
                Çözüldü Olarak İşaretle
            </button>
        </div>
    `);
}

function downloadAttachment(filename) {
    showNotification(`${filename} dosyası indiriliyor...`, 'success');
}

function updateTicketStatus(ticketId, newStatus) {
    const ticket = sampleData.tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = newStatus;
        populateSupport();
        showNotification(`Talep durumu "${newStatus}" olarak güncellendi`, 'success');
    }
}

function editUser(userEmail) {
    const user = sampleData.users.find(u => u.email === userEmail);
    if (!user) return;
    
    showModal('Kullanıcı Düzenle', `
        <form id="editUserForm" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
                <strong>Mevcut Kullanıcı:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}<br>
                <strong>Mevcut Rol:</strong> ${user.role}
            </div>
            
            <div class="form-group">
                <label class="form-label">Kullanıcı Adı</label>
                <input type="text" name="name" class="form-input" value="${user.name}" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" name="email" class="form-input" value="${user.email}" required readonly style="background: var(--bg-glass); opacity: 0.7;">
                <small style="color: var(--text-muted); font-size: 0.8rem;">Email değiştirilemez</small>
            </div>
            
            <div class="form-group">
                <label class="form-label">Rol</label>
                <select name="role" class="form-select" required>
                    <option value="Super Admin" ${user.role === 'Super Admin' ? 'selected' : ''}>Super Admin</option>
                    <option value="Technical Support" ${user.role === 'Technical Support' ? 'selected' : ''}>Technical Support</option>
                    <option value="Sales" ${user.role === 'Sales' ? 'selected' : ''}>Sales</option>
                    <option value="Developer" ${user.role === 'Developer' ? 'selected' : ''}>Developer</option>
                    <option value="Customer" ${user.role === 'Customer' ? 'selected' : ''}>Customer</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Durum</label>
                <select name="status" class="form-select" required>
                    <option value="Aktif" ${user.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                    <option value="Pasif" ${user.status === 'Pasif' ? 'selected' : ''}>Pasif</option>
                    <option value="Askıda" ${user.status === 'Askıda' ? 'selected' : ''}>Askıda</option>
                </select>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1;">
                    <i class="fas fa-save"></i>
                    Değişiklikleri Kaydet
                </button>
                <button type="button" class="btn btn-error" onclick="deleteUser('${user.email}')" style="min-width: auto;">
                    <i class="fas fa-trash"></i>
                    Sil
                </button>
            </div>
        </form>
    `);
    
    document.getElementById('editUserForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Update user data
        user.name = formData.get('name');
        user.role = formData.get('role');
        user.status = formData.get('status');
        user.lastUpdated = new Date().toLocaleDateString('tr-TR');
        
        populateUsers();
        closeModal();
        showNotification('Kullanıcı bilgileri başarıyla güncellendi', 'success');
    });
}

function deleteUser(userEmail) {
    if (confirm(`${userEmail} kullanıcısını silmek istediğinizden emin misiniz?`)) {
        const userIndex = sampleData.users.findIndex(u => u.email === userEmail);
        if (userIndex !== -1) {
            sampleData.users.splice(userIndex, 1);
            populateUsers();
            closeModal();
            showNotification('Kullanıcı başarıyla silindi', 'success');
        }
    }
}

function viewUserHistory(userEmail) {
    const user = sampleData.users.find(u => u.email === userEmail);
    if (!user) return;
    
    // Generate sample user history
    const userHistory = [
        { date: '2024-12-15 14:30', action: 'Kullanıcı girişi', details: 'IP: 192.168.1.101', icon: 'fas fa-sign-in-alt', type: 'success' },
        { date: '2024-12-15 09:15', action: 'Lisans aktivasyonu', details: 'PX-TUR-2024-157', icon: 'fas fa-key', type: 'primary' },
        { date: '2024-12-14 16:45', action: 'Profil güncelleme', details: 'Telefon numarası değiştirildi', icon: 'fas fa-user-edit', type: 'info' },
        { date: '2024-12-14 11:20', action: 'Dosya indirme', details: 'parametrix_manual.pdf', icon: 'fas fa-download', type: 'success' },
        { date: '2024-12-13 13:55', action: 'Destek talebi', details: 'ST-2024-003: SolidWorks entegrasyonu', icon: 'fas fa-question-circle', type: 'warning' },
        { date: '2024-12-12 08:30', action: 'Kullanıcı girişi', details: 'IP: 192.168.1.101', icon: 'fas fa-sign-in-alt', type: 'success' }
    ];
    
    showModal('Kullanıcı Geçmişi', `
        <div style="margin-bottom: 1.5rem; padding: 1rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary);">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">${user.name}</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
                <span><strong>Email:</strong> ${user.email}</span>
                <span><strong>Rol:</strong> ${user.role}</span>
                <span><strong>Durum:</strong> ${user.status}</span>
                <span><strong>Kayıt Tarihi:</strong> ${user.joinDate}</span>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <span class="badge badge-${user.status === 'Aktif' ? 'success' : user.status === 'Pasif' ? 'secondary' : 'warning'}">
                    ${user.status}
                </span>
                <span><strong>Son Güncelleme:</strong> ${user.lastUpdated || 'Hiçbir zaman'}</span>
            </div>
        </div>
        
        <div>
            <h5 style="color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-history"></i> 
                Aktivite Geçmişi (Son 7 Gün)
            </h5>
            <div style="max-height: 400px; overflow-y: auto;">
                ${userHistory.map(activity => `
                    <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-glass); border-radius: var(--border-radius); border: 1px solid var(--border-secondary); margin-bottom: 0.75rem;">
                        <div style="width: 36px; height: 36px; background: var(--${activity.type === 'success' ? 'success' : activity.type === 'warning' ? 'warning' : activity.type === 'error' ? 'error' : 'primary'}-color)20; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="${activity.icon}" style="color: var(--${activity.type === 'success' ? 'success' : activity.type === 'warning' ? 'warning' : activity.type === 'error' ? 'error' : 'primary'}-color); font-size: 1rem;"></i>
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 0.25rem;">${activity.action}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">${activity.details}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${activity.date}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-secondary); display: flex; gap: 1rem;">
            <button class="btn btn-primary" onclick="editUser('${user.email}'); closeModal();">
                <i class="fas fa-edit"></i>
                Kullanıcıyı Düzenle
            </button>
            <button class="btn btn-secondary" onclick="exportUserHistory('${user.email}')">
                <i class="fas fa-download"></i>
                Geçmişi Dışa Aktar
            </button>
        </div>
    `);
}

function exportUserHistory(userEmail) {
    showNotification(`${userEmail} kullanıcı geçmişi CSV formatında indiriliyor...`, 'success');
}

// ==========================================
// MODAL & FORM FUNCTIONS
// ==========================================

function showModal(title, content) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="glass-card" style="max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 1rem; border-bottom: 1px solid var(--border-secondary); margin-bottom: 1.5rem;">
                <h3 style="color: var(--text-primary); font-size: 1.25rem; font-weight: 600;">${title}</h3>
                <button onclick="closeModal()" style="background: none; border: 1px solid var(--border-secondary); border-radius: var(--border-radius); padding: 0.5rem; color: var(--text-secondary); cursor: pointer; transition: var(--transition);">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div>
                ${content}
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-overlay);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Setup form handlers
    setupFormHandlers();
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function setupFormHandlers() {
    // Use global event delegation for all dynamically created forms
    document.addEventListener('submit', handleFormSubmission);
}

function handleFormSubmission(e) {
    if (e.target.id === 'licenseForm') {
        e.preventDefault();
        console.log('License form submitted via delegation');
        const formData = new FormData(e.target);
        const newLicense = {
            id: `PX-TUR-2024-${String(sampleData.licenses.length + 1).padStart(3, '0')}`,
            customer: formData.get('customer'),
            type: formData.get('type'),
            status: 'Aktif',
            expiry: formData.get('expiry'),
            devices: `0/${formData.get('devices')}`,
            usage: Math.floor(Math.random() * 30) + 5
        };
        
        sampleData.licenses.unshift(newLicense);
        populateLicenses();
        populateStats(); // Update dashboard
        closeModal();
        showNotification(`Yeni lisans başarıyla oluşturuldu: ${newLicense.id}`, 'success');
        return;
    }
    
    if (e.target.id === 'ticketForm') {
        e.preventDefault();
        console.log('Ticket form submitted via delegation');
        const formData = new FormData(e.target);
        const newTicket = {
            id: `ST-2024-${String(sampleData.tickets.length + 1).padStart(3, '0')}`,
            title: formData.get('title'),
            customer: formData.get('customer'),
            category: formData.get('category') || 'Genel',
            priority: formData.get('priority'),
            status: 'Açık',
            assignee: null,
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        };
        
        sampleData.tickets.unshift(newTicket);
        populateSupport();
        populateStats(); // Update dashboard
        closeModal();
        showNotification(`Yeni destek talebi oluşturuldu: ${newTicket.id}`, 'success');
        return;
    }
    
    if (e.target.id === 'userForm') {
        e.preventDefault();
        console.log('User form submitted via delegation');
        const formData = new FormData(e.target);
        
        const email = formData.get('email');
        if (!email.endsWith('@rcsteknoloji.com')) {
            showNotification('Email adresi @rcsteknoloji.com ile bitmelidir', 'error');
            return;
        }
        
        // Check if user already exists
        if (sampleData.users.find(u => u.email === email)) {
            showNotification('Bu email adresi zaten kullanımda', 'error');
            return;
        }
        
        const newUser = {
            name: formData.get('name'),
            email: email,
            role: formData.get('role'),
            status: 'Aktif',
            joinDate: new Date().toLocaleDateString('tr-TR'),
            lastActivity: 'Hiçbir zaman',
            lastUpdated: new Date().toLocaleDateString('tr-TR')
        };
        
        sampleData.users.unshift(newUser);
        
        // Add to valid users for login
        const password = formData.get('password') || 'password123';
        validUsers.push({
            email: email,
            password: password,
            name: newUser.name,
            role: newUser.role
        });
        
        populateUsers();
        populateStats(); // Update dashboard
        closeModal();
        showNotification(`Yeni kullanıcı eklendi: ${newUser.name}`, 'success');
        return;
    }
    
    // Legacy forms (keep existing handlers as fallback)
    const licenseForm = document.getElementById('licenseForm');
    if (licenseForm) {
        licenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newLicense = {
                id: `PX-${formData.get('type').substring(0,3).toUpperCase()}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
                customer: formData.get('customer'),
                type: formData.get('type'),
                status: 'Aktif',
                expiry: formData.get('expiry'),
                devices: `0/${formData.get('devices')}`,
                usage: 0
            };
            
            sampleData.licenses.unshift(newLicense);
            populateLicenses();
            closeModal();
            showNotification(`Yeni lisans başarıyla oluşturuldu: ${newLicense.id}`, 'success');
        });
    }
    
    // Ticket form
    const ticketForm = document.getElementById('ticketForm');
    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newTicket = {
                id: `ST-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
                title: formData.get('title'),
                customer: formData.get('customer'),
                priority: formData.get('priority'),
                status: 'Açık',
                assignee: null,
                time: 'Şimdi',
                category: 'Genel'
            };
            
            sampleData.tickets.unshift(newTicket);
            populateSupport();
            closeModal();
            showNotification(`Yeni destek talebi oluşturuldu: #${newTicket.id}`, 'success');
        });
    }
    
    // User form
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            if (!formData.get('email').endsWith('@rcsteknoloji.com')) {
                showNotification('E-posta adresi @rcsteknoloji.com ile bitmelidir!', 'error');
                return;
            }
            
            const newUser = {
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role'),
                status: 'Çevrimdışı',
                lastSeen: 'Henüz giriş yapmadı'
            };
            
            sampleData.users.push(newUser);
            validUsers.push({
                email: formData.get('email'),
                password: formData.get('password'),
                name: formData.get('name'),
                role: formData.get('role')
            });
            
            populateUsers();
            closeModal();
            showNotification(`Yeni kullanıcı eklendi: ${newUser.name}`, 'success');
        });
    }
}

function createLicenseForm() {
    return `
        <form id="licenseForm" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
                <label class="form-label">Müşteri Adı</label>
                <input type="text" name="customer" class="form-input" placeholder="Müşteri adını girin" required>
            </div>
            <div class="form-group">
                <label class="form-label">Lisans Türü</label>
                <select name="type" class="form-select" required>
                    <option value="Standart">Standart</option>
                    <option value="Pro">Pro</option>
                    <option value="Premium">Premium</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Cihaz Sayısı</label>
                <input type="number" name="devices" class="form-input" placeholder="Maksimum cihaz sayısı" min="1" max="50" required>
            </div>
            <div class="form-group">
                <label class="form-label">Bitiş Tarihi</label>
                <input type="date" name="expiry" class="form-input" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-plus"></i>
                Lisans Oluştur
            </button>
        </form>
    `;
}

function createTicketForm() {
    return `
        <form id="ticketForm" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
                <label class="form-label">Başlık</label>
                <input type="text" name="title" class="form-input" placeholder="Sorun başlığını girin" required>
            </div>
            <div class="form-group">
                <label class="form-label">Müşteri</label>
                <select name="customer" class="form-select" required>
                    <option value="">Müşteri seçin</option>
                    <option value="TechVision Ltd.">TechVision Ltd.</option>
                    <option value="AutoMech Industries">AutoMech Industries</option>
                    <option value="DefenseCorp Systems">DefenseCorp Systems</option>
                    <option value="InnovateDesign Co.">InnovateDesign Co.</option>
                    <option value="Precision Engineering">Precision Engineering</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Öncelik</label>
                <select name="priority" class="form-select" required>
                    <option value="Düşük">Düşük</option>
                    <option value="Orta">Orta</option>
                    <option value="Yüksek">Yüksek</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Açıklama</label>
                <textarea name="description" rows="4" class="form-textarea" placeholder="Sorun detaylarını açıklayın" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-ticket-alt"></i>
                Talep Oluştur
            </button>
        </form>
    `;
}

function createUserForm() {
    return `
        <form id="userForm" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
                <label class="form-label">Ad Soyad</label>
                <input type="text" name="name" class="form-input" placeholder="Kullanıcı adını girin" required>
            </div>
            <div class="form-group">
                <label class="form-label">E-posta</label>
                <input type="email" name="email" class="form-input" placeholder="ornek@rcsteknoloji.com" required>
            </div>
            <div class="form-group">
                <label class="form-label">Rol</label>
                <select name="role" class="form-select" required>
                    <option value="Teknik Destek">Teknik Destek</option>
                    <option value="Satış">Satış</option>
                    <option value="Geliştirici">Geliştirici</option>
                    <option value="Super Admin">Super Admin</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Şifre</label>
                <input type="password" name="password" class="form-input" placeholder="Güçlü şifre girin" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-user-plus"></i>
                Kullanıcı Ekle
            </button>
        </form>
    `;
}

function generateCSV(data) {
    const headers = ['Lisans Anahtarı', 'Müşteri', 'Tür', 'Durum', 'Bitiş Tarihi', 'Cihaz Sayısı'];
    const csvContent = [
        headers.join(','),
        ...data.map(item => [
            item.id,
            `"${item.customer}"`,
            item.type,
            item.status,
            item.expiry,
            `"${item.devices}"`
        ].join(','))
    ].join('\n');
    
    return csvContent;
}

function generateReport() {
    return {
        timestamp: new Date().toISOString(),
        summary: {
            totalLicenses: sampleData.licenses.length,
            activeUsers: 916,
            openTickets: sampleData.tickets.filter(t => t.status === 'Açık').length,
            systemUptime: '100.0%'
        },
        licenses: sampleData.licenses,
        tickets: sampleData.tickets,
        users: sampleData.users,
        activities: sampleData.activities
    };
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add fadeIn/fadeOut keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Global window functions for inline handlers
window.editLicense = editLicense;
window.viewLicenseHistory = viewLicenseHistory;
window.assignTicket = assignTicket;
window.viewTicketDetails = viewTicketDetails;
window.editUser = editUser;
window.viewUserHistory = viewUserHistory;
window.deleteUser = deleteUser;
window.exportUserHistory = exportUserHistory;
window.closeModal = closeModal;
window.clearActivityLog = clearActivityLog;
window.downloadAttachment = downloadAttachment;
window.updateTicketStatus = updateTicketStatus;
window.selectLicenseRow = selectLicenseRow;
window.changeRevenueView = changeRevenueView;
window.exportUsageData = exportUsageData;
window.filterSalesReport = filterSalesReport;
window.exportSalesReport = exportSalesReport;
window.showRevenueTooltip = showRevenueTooltip;
window.hideRevenueTooltip = hideRevenueTooltip;
