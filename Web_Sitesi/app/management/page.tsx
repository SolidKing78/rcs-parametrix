'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// Icons are now using Font Awesome

const validUsers = [
  { email: 'admin@rcsteknoloji.com', password: 'admin123', name: 'Ahmet Yılmaz', role: 'Super Admin' },
  { email: 'support.senior@rcsteknoloji.com', password: 'support123', name: 'Ayşe Demir', role: 'Teknik Destek' },
  { email: 'support.junior@rcsteknoloji.com', password: 'support456', name: 'Can Özkan', role: 'Teknik Destek' },
];

export default function ManagementPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email.endsWith('@rcsteknoloji.com')) {
      alert('E-posta adresi @rcsteknoloji.com ile bitmelidir!');
      return;
    }

    const user = validUsers.find(
      u => u.email === loginData.email && u.password === loginData.password
    );
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    } else {
      alert('Geçersiz e-posta veya şifre!');
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
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-cube text-white"></i>
              </div>
              <span>ParametriX</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Kurumsal Yönetim Sistemi</h2>
            <p className="text-white/70">Güvenli girişiniz için kurumsal e-posta adresinizi kullanın</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <i className="fas fa-envelope"></i>
                E-posta Adresi
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                placeholder="ornek@rcsteknoloji.com"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2 flex items-center gap-2">
                <i className="fas fa-lock"></i>
                Şifre
              </label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-in-alt"></i>
              Güvenli Giriş
            </button>
          </form>

          <p className="text-center text-white/60 text-sm mt-6">
            © 2024 RCS Teknoloji - ParametriX Management System
          </p>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Genel Bakış' },
    { id: 'licenses', icon: 'fas fa-key', label: 'Lisans Yönetimi' },
    { id: 'support', icon: 'fas fa-headset', label: 'Teknik Destek' },
    { id: 'monitoring', icon: 'fas fa-chart-line', label: 'Canlı İzleme' },
    { id: 'reports', icon: 'fas fa-chart-bar', label: 'Raporlar' },
    { id: 'users', icon: 'fas fa-users', label: 'Kullanıcı Yönetimi' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-background' : 'bg-gray-50'} transition-colors`}>
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 text-xl font-bold text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-cube text-white"></i>
              </div>
              <span>ParametriX</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
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
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-white font-semibold">{currentUser?.name}</div>
                  <div className="text-white/70 text-xs">{currentUser?.role.toUpperCase()}</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {currentUser?.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center gap-2"
                >
                  <i className="fas fa-sign-out-alt w-5 h-5"></i>
                  <span className="hidden md:inline">Çıkış</span>
                </button>
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
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Genel Bakış</h1>
                  <p className="text-white/70">ParametriX sistem durumu ve önemli metrikler</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                    <i className="fas fa-download w-4 h-4"></i>
                    Rapor İndir
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                    <i className="fas fa-sync-alt w-4 h-4"></i>
                    Yenile
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: 'fas fa-key', value: '1,294', label: 'Aktif Lisans', change: '+12%', color: 'text-blue-400' },
                  { icon: 'fas fa-users', value: '916', label: 'Aktif Kullanıcı', change: '+8%', color: 'text-green-400' },
                  { icon: 'fas fa-ticket-alt', value: '26', label: 'Açık Destek Talebi', change: '-3%', color: 'text-yellow-400' },
                  { icon: 'fas fa-server', value: '100.0%', label: 'Sistem Uptime', change: 'Stabil', color: 'text-purple-400' },
                ].map((stat, index) => {
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                      <i className={`${stat.icon} ${stat.color} text-2xl mb-3 block`}></i>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                      <div className="text-green-400 text-xs flex items-center gap-1">
                        <i className="fas fa-arrow-up"></i>
                        {stat.change}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Activities */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Son Aktiviteler</h3>
                  <div className="space-y-3">
                    {[
                      { icon: 'fas fa-key', text: 'TechVision Ltd. yeni lisans aktivasyonu', time: '2 dakika önce' },
                      { icon: 'fas fa-headset', text: 'AutoMech Industries destek talebi açtı', time: '15 dakika önce' },
                      { icon: 'fas fa-users', text: 'DefenseCorp Systems yeni kullanıcı kaydı', time: '1 saat önce' },
                    ].map((activity, index) => {
                      return (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                          <i className={`${activity.icon} text-primary mt-0.5`}></i>
                          <div className="flex-1">
                            <p className="text-white text-sm">{activity.text}</p>
                            <p className="text-white/50 text-xs mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">Sistem Durumu</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                      <i className="fas fa-circle text-xs"></i>
                      Çevrimiçi
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'API Sunucuları', status: 'Normal', value: '98%' },
                      { label: 'Veritabanı', status: 'Normal', value: '99%' },
                      { label: 'Ağ Bağlantısı', status: 'Normal', value: '100%' },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/70 text-sm">{item.label}</span>
                          <span className="text-white font-semibold">{item.value}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: item.value }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                  <h1 className="text-3xl font-bold text-white mb-2">Lisans Yönetimi</h1>
                  <p className="text-white/70">Tüm ParametriX lisanslarını yönetin</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                    <i className="fas fa-download w-4 h-4"></i>
                    Dışa Aktar
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                    <i className="fas fa-plus w-4 h-4"></i>
                    Yeni Lisans
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Aktif Lisanslar</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Lisans ara..."
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary"
                    />
                    <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary">
                      <option>Tüm Türler</option>
                      <option>Standart</option>
                      <option>Pro</option>
                      <option>Premium</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-3 text-left text-white/70 text-sm font-semibold">Lisans Anahtarı</th>
                        <th className="px-6 py-3 text-left text-white/70 text-sm font-semibold">Müşteri</th>
                        <th className="px-6 py-3 text-left text-white/70 text-sm font-semibold">Tür</th>
                        <th className="px-6 py-3 text-left text-white/70 text-sm font-semibold">Durum</th>
                        <th className="px-6 py-3 text-left text-white/70 text-sm font-semibold">Bitiş Tarihi</th>
                        <th className="px-6 py-3 text-left text-white/70 text-sm font-semibold">Cihaz Sayısı</th>
                        <th className="px-6 py-3 text-left text-white/70 text-sm font-semibold">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'PX-PRE-2024-001', customer: 'TechVision Ltd.', type: 'Premium', status: 'Aktif', expiry: '2025-12-31', devices: '5/10' },
                        { id: 'PX-PRO-2024-002', customer: 'AutoMech Industries', type: 'Pro', status: 'Aktif', expiry: '2025-06-15', devices: '3/5' },
                        { id: 'PX-STD-2024-003', customer: 'DefenseCorp Systems', type: 'Standart', status: 'Aktif', expiry: '2025-03-20', devices: '2/3' },
                      ].map((license) => (
                        <tr key={license.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white font-mono text-sm">{license.id}</td>
                          <td className="px-6 py-4 text-white">{license.customer}</td>
                          <td className="px-6 py-4 text-white">{license.type}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                              {license.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white/70">{license.expiry}</td>
                          <td className="px-6 py-4 text-white/70">{license.devices}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors text-sm">
                              Detaylar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                  <p className="text-white/70">Müşteri destek taleplerini yönetin</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                    <i className="fas fa-filter w-4 h-4"></i>
                    Filtrele
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                    <i className="fas fa-plus w-4 h-4"></i>
                    Yeni Talep
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: 'ST-2024-001', title: 'ParametriX AI 2D→3D dönüşüm hatası', customer: 'TechVision Ltd.', priority: 'Yüksek', status: 'Açık', assignee: 'Ayşe Demir' },
                  { id: 'ST-2024-002', title: 'Lisans aktivasyon sorunu', customer: 'AutoMech Industries', priority: 'Orta', status: 'İşlemde', assignee: 'Can Özkan' },
                  { id: 'ST-2024-003', title: 'SolidWorks entegrasyon hatası', customer: 'DefenseCorp Systems', priority: 'Düşük', status: 'Çözüldü', assignee: 'Ayşe Demir' },
                ].map((ticket) => (
                  <div key={ticket.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white font-mono text-sm">{ticket.id}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        ticket.priority === 'Yüksek' ? 'bg-red-500/20 text-red-400' :
                        ticket.priority === 'Orta' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{ticket.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{ticket.customer}</p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        ticket.status === 'Açık' ? 'bg-yellow-500/20 text-yellow-400' :
                        ticket.status === 'İşlemde' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className="text-white/70 text-xs">{ticket.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentSection === 'monitoring' && (
            <motion.div
              key="monitoring"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Canlı İzleme</h1>
                  <p className="text-white/70">Gerçek zamanlı sistem performansı ve analitikler</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
                    Duraklat
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                    <i className="fas fa-sync-alt w-4 h-4"></i>
                    Yenile
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: 'fas fa-users', value: '487', label: 'Anlık Aktif Kullanıcı', change: '+12 son 5dk', color: 'text-green-400' },
                  { icon: 'fas fa-server', value: '23%', label: 'Sistem Yükü', change: 'Normal', color: 'text-blue-400' },
                  { icon: 'fas fa-chart-line', value: '1,247', label: 'API İstekleri/dk', change: '+5.2%', color: 'text-purple-400' },
                  { icon: 'fas fa-heartbeat', value: '99.98%', label: 'Uptime (30 gün)', change: 'Mükemmel', color: 'text-green-400' },
                ].map((stat, index) => {
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                      <i className={`${stat.icon} ${stat.color} text-2xl mb-3 block`}></i>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                      <div className="text-green-400 text-xs">{stat.change}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentSection === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Raporlar</h1>
                  <p className="text-white/70">Detaylı analiz, metrikler ve raporlama sistemi</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
                    Tarih Aralığı
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                    <i className="fas fa-download w-4 h-4"></i>
                    Tüm Raporları İndir
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: 'fas fa-chart-line', value: '₺2.47M', label: 'Toplam Gelir (Bu Yıl)', change: '+23.5%', color: 'text-blue-400' },
                  { icon: 'fas fa-users', value: '347', label: 'Aktif Müşteri', change: '+12.8%', color: 'text-green-400' },
                  { icon: 'fas fa-sync-alt', value: '94.2%', label: 'Yenileme Oranı', change: '+2.1%', color: 'text-yellow-400' },
                  { icon: 'fas fa-clock', value: '127h', label: 'Ortalama Kullanım (Aylık)', change: '+8.4%', color: 'text-purple-400' },
                ].map((stat, index) => {
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                      <i className={`${stat.icon} ${stat.color} text-2xl mb-3 block`}></i>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-white/70 text-sm mb-2">{stat.label}</div>
                      <div className="text-green-400 text-xs flex items-center gap-1">
                        <i className="fas fa-arrow-up"></i>
                        {stat.change}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentSection === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Kullanıcı Yönetimi</h1>
                  <p className="text-white/70">Sistem kullanıcılarını yönetin</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                    <i className="fas fa-filter w-4 h-4"></i>
                    Filtrele
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                    <i className="fas fa-user-plus w-4 h-4"></i>
                    Yeni Kullanıcı
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {validUsers.map((user) => (
                  <div key={user.email} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{user.name}</div>
                        <div className="text-white/70 text-sm">{user.role}</div>
                      </div>
                    </div>
                    <div className="text-white/70 text-sm mb-4">{user.email}</div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors text-sm">
                        Düzenle
                      </button>
                      <button className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm">
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

