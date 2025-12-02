'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// Icons are now using Font Awesome

const demoUsers = [
  { email: 'demo@techvision.com', password: 'demo123', company: 'TechVision Ltd.', name: 'Ahmet Yılmaz', role: 'CTO' },
  { email: 'demo@automech.com', password: 'demo123', company: 'AutoMech Industries', name: 'Elif Demir', role: 'Proje Yöneticisi' },
];

export default function CustomerPortalPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoUsers.find(
      u => u.email === loginData.email.toLowerCase() && u.password === loginData.password
    );
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      alert('Email veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginData({ email: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 text-3xl font-bold text-white mb-2">
              <i className="fas fa-cube text-primary"></i>
              <span>ParametriX</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Müşteri Portalı</h2>
            <p className="text-white/70">Lisanslarınızı yönetin ve destek alın</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Email Adresi</label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                placeholder="ornek@sirketiniz.com"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Şifre</label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                placeholder="Şifrenizi girin"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Demo Kullanıcılar:</h4>
            <div className="space-y-2 text-sm">
              {demoUsers.map((user) => (
                <div key={user.email} className="text-white/70">
                  <strong className="text-white">{user.company}</strong><br />
                  <code className="text-xs">{user.email} / {user.password}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/portal-selector" className="text-primary hover:underline text-sm">
              Portal Seçimine Dön
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-background' : 'bg-gray-50'} transition-colors`}>
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <i className="fas fa-cube text-primary"></i>
                <span>ParametriX</span>
              </div>
              <div className="text-white/70 text-sm">{currentUser?.company}</div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              {[
                { id: 'dashboard', icon: 'fas fa-home', label: 'Ana Sayfa' },
                { id: 'licenses', icon: 'fas fa-key', label: 'Lisanslarım' },
                { id: 'support', icon: 'fas fa-headset', label: 'Destek' },
                { id: 'billing', icon: 'fas fa-file-invoice', label: 'Faturalar' },
                { id: 'profile', icon: 'fas fa-user', label: 'Profil' },
              ].map((item) => {
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentSection === item.id
                        ? 'bg-primary text-white'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <i className={`${item.icon} w-4 h-4`}></i>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {isDarkMode ? <i className="fas fa-sun w-5 h-5"></i> : <i className="fas fa-moon w-5 h-5"></i>}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <i className="fas fa-user-circle w-5 h-5"></i>
                  <span className="hidden md:inline">{currentUser?.name}</span>
                  <i className="fas fa-chevron-down w-4 h-4"></i>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
                    <button className="w-full text-left px-4 py-2 text-white hover:bg-white/5 flex items-center gap-2">
                      <i className="fas fa-user w-4 h-4"></i>
                      Profil Ayarları
                    </button>
                    <button className="w-full text-left px-4 py-2 text-white hover:bg-white/5 flex items-center gap-2">
                      <i className="fas fa-bell w-4 h-4"></i>
                      Bildirimler
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <i className="fas fa-sign-out-alt w-4 h-4"></i>
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentSection === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-white mb-4">Hoş Geldiniz</h1>
              <p className="text-white/70 mb-8">ParametriX müşteri portalınıza genel bakış</p>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: 'fas fa-key', value: '3', label: 'Aktif Lisans', color: 'text-green-400' },
                  { icon: 'fas fa-clock', value: '45', label: 'Gün Kaldı', color: 'text-blue-400' },
                  { icon: 'fas fa-headset', value: '2', label: 'Açık Talep', color: 'text-yellow-400' },
                  { icon: 'fas fa-file-invoice', value: '₺0', label: 'Bekleyen Ödeme', color: 'text-purple-400' },
                ].map((stat, index) => {
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                      <i className={`${stat.icon} ${stat.color} text-2xl mb-3 block`}></i>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/70 text-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentSection === 'licenses' && (
            <motion.div
              key="licenses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Lisanslarım</h1>
                  <p className="text-white/70">ParametriX lisanslarınızı yönetin ve izleyin</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <i className="fas fa-plus w-5 h-5"></i>
                  Yeni Lisans Talebi
                </button>
              </div>

              <div className="grid gap-4">
                {[
                  { id: 'PX-PRO-2024-001', type: 'Pro', status: 'Aktif', expiry: '2025-12-31', devices: '3/5' },
                  { id: 'PX-STD-2024-002', type: 'Standart', status: 'Aktif', expiry: '2025-06-15', devices: '2/3' },
                  { id: 'PX-PRE-2024-003', type: 'Premium', status: 'Beklemede', expiry: '2025-09-10', devices: '0/10' },
                ].map((license) => (
                  <div key={license.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{license.id}</h3>
                        <div className="flex gap-4 text-sm text-white/70">
                          <span>Tür: {license.type}</span>
                          <span>Durum: {license.status}</span>
                          <span>Bitiş: {license.expiry}</span>
                          <span>Cihaz: {license.devices}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        Detaylar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentSection === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Teknik Destek</h1>
                  <p className="text-white/70">Destek taleplerinizi oluşturun ve takip edin</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <i className="fas fa-plus w-5 h-5"></i>
                  Yeni Destek Talebi
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Destek Taleplerim</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'ST-2024-001', title: 'ParametriX AI 2D→3D dönüşüm hatası', status: 'Açık' },
                      { id: 'ST-2024-002', title: 'Lisans aktivasyon sorunu', status: 'İşlemde' },
                    ].map((ticket) => (
                      <div key={ticket.id} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-white font-semibold">{ticket.id}</span>
                          <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">{ticket.status}</span>
                        </div>
                        <p className="text-white/70 text-sm">{ticket.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Sık Sorulan Sorular</h3>
                  <div className="space-y-4">
                    {[
                      { q: 'Lisansımı nasıl aktive edebilirim?', a: 'Lisans anahtarınızı ParametriX uygulamasında "Lisans" bölümünden giriniz.' },
                      { q: '2D→3D dönüşüm nasıl çalışır?', a: 'Teknik çizimlerinizi yükleyin, AI teknolojisi otomatik olarak 3D modeli oluşturacaktır.' },
                    ].map((faq, index) => (
                      <div key={index}>
                        <h4 className="text-white font-semibold mb-1">{faq.q}</h4>
                        <p className="text-white/70 text-sm">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === 'billing' && (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-white mb-4">Faturalar & Ödemeler</h1>
              <p className="text-white/70 mb-8">Ödeme geçmişinizi ve faturalarınızı görüntüleyin</p>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white">Son Faturalar</h3>
                  <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                    <i className="fas fa-download w-4 h-4"></i>
                    Tümünü İndir
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'INV-2024-001', date: '2024-01-15', amount: '₺4.999', status: 'Ödendi' },
                    { id: 'INV-2024-002', date: '2024-02-15', amount: '₺4.999', status: 'Ödendi' },
                  ].map((invoice) => (
                    <div key={invoice.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{invoice.id}</div>
                        <div className="text-white/70 text-sm">{invoice.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{invoice.amount}</div>
                        <div className="text-green-400 text-sm">{invoice.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-white mb-4">Profil Ayarları</h1>
              <p className="text-white/70 mb-8">Hesap bilgilerinizi ve tercihlerinizi yönetin</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">Şirket Bilgileri</h3>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                      <i className="fas fa-edit w-4 h-4"></i>
                      Düzenle
                    </button>
                  </div>
                  <div className="space-y-2 text-white/70">
                    <p><strong className="text-white">Şirket:</strong> {currentUser?.company}</p>
                    <p><strong className="text-white">Ad Soyad:</strong> {currentUser?.name}</p>
                    <p><strong className="text-white">Rol:</strong> {currentUser?.role}</p>
                    <p><strong className="text-white">Email:</strong> {currentUser?.email}</p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Güvenlik</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                      <i className="fas fa-key w-4 h-4"></i>
                      Şifre Değiştir
                    </button>
                    <button className="w-full px-4 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                      <i className="fas fa-shield-alt w-4 h-4"></i>
                      İki Faktörlü Doğrulama
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

