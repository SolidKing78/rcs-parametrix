'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Clock3 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Mesajınız başarıyla gönderildi!');
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">İletişim</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Bizimle iletişime geçin, size özel çözümler geliştirelim
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="ornek@sirketiniz.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-white font-medium mb-2">
                  Şirket
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Şirket Adı"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">E-posta</h4>
                  <p className="text-white/70">info@rcsteknoloji.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">İş Birliği Fikirleri</h4>
                  <p className="text-white/70">
                    ParametriX ekibi, yeni projeler ve yaratıcı AR-GE ortaklıkları için her zaman hazır.
                    Birlikte zincirleme inovasyon hikayeleri yazalım.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Hızlı Yanıt Sözümüz</h4>
                  <p className="text-white/70">
                    Formunuzu iletin, 24 saat içinde dönüş yapalım. Her sorunuz bizim için yeni bir
                    keşif fırsatı.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/10 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <i className="fab fa-linkedin text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">LinkedIn'den bizi takip edin</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Güncel kalın, ParametriX AI dünyasındaki en yeni gelişmeleri anında öğrenin.
                  </p>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/company/rcs-tecnology/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold hover:bg-white/30 transition-all"
              >
                Takip Et
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

