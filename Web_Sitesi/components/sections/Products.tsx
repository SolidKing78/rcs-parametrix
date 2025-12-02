'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const products = [
  {
    name: 'Standart Sürüm',
    icon: 'fas fa-cog',
    featured: true,
    badges: ['Popüler'],
    features: [
      'SolidWorks programında çeşitli özellikler',
      'CAD süreçlerini hızlandırma',
      'Kullanıcı dostu arayüz',
      'Temel verimlilik araçları',
    ],
    link: '#pricing',
  },
  {
    name: 'Pro Sürüm',
    icon: 'fas fa-brain',
    comingSoon: true,
    badges: ['Yakında'],
    beta: true,
    features: [
      'Tüm Standart özellikler',
      'ParametriX AI desteği',
      'Parçaları otomatik tanıma',
      '2D teknik resmi → 3D model dönüşümü',
      'Uygun imalat yöntemi seçimi',
    ],
    link: '#pricing',
  },
  {
    name: 'Premium Sürüm',
    icon: 'fas fa-crown',
    premium: true,
    badges: ['Kurumsal', 'En İyi Paket'],
    features: [
      'Tüm Pro özellikler',
      'Firmanıza özel 3D CAD Konfigüratörü',
      '3D Tasarım ve montaj oluşturma',
      'Tek tıkla tüm üretim paketleri',
      '1 kullanıcı',
      'Özel eğitim',
    ],
    link: '#pricing',
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Parametri<span className="hero-letter-accent">X</span> Ürün Ailesi
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            SolidWorks süreçlerinizi yapay zeka ile dönüştürün
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: product.comingSoon ? 1.05 : 1.08,
                y: -10,
                transition: { type: 'spring', stiffness: 360, damping: 24, mass: 0.4 },
              }}
              className={`bg-white/5 backdrop-blur-md border rounded-xl p-8 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-primary/10 hover:z-20 ${
                product.featured
                  ? 'border-primary'
                  : product.premium
                  ? 'border-secondary bg-gradient-to-br from-secondary/10 to-primary/10'
                  : product.comingSoon
                  ? 'border-secondary/60 bg-gradient-to-br from-secondary/10 to-primary/5'
                  : 'border-white/10'
              }`}
            >
              {product.badges && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {product.badges.map((badge) => (
                    <span
                      key={`${product.name}-${badge}`}
                      className="inline-flex bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${product.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {product.name}
                  {product.beta && <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">Beta</span>}
                </h3>
              </div>
              <ul className="flex-grow space-y-3 mb-6">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={product.link}
                className={`mt-auto text-center py-3 px-6 rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-primary/20 ${
                  product.featured
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                    : product.premium
                    ? 'bg-gradient-to-r from-secondary to-primary text-white hover:shadow-lg'
                    : product.comingSoon
                    ? 'bg-gradient-to-r from-secondary to-primary text-white'
                    : 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Detaylı İncele
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

