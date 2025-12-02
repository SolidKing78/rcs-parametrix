'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Standart',
    price: '200',
    currency: '$',
    period: '/yıllık',
    featured: true,
    badges: ['En Popüler'],
    features: [
      'SolidWorks entegrasyonu',
      'Temel otomasyon',
      'Email destek',
      '1 kullanıcı',
      'Eğitim',
    ],
    link: '#contact',
  },
  {
    name: 'Pro',
    price: 'Yakında',
    badges: ['Yakında'],
    features: [
      'Tüm Standart özellikler',
      'Yapay zeka desteği',
      '2D/3D dönüşüm',
      '1 kullanıcı',
      'Eğitim',
    ],
    link: '#contact',
  },
  {
    name: 'Premium',
    price: 'Teklif Al',
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
    link: '#contact',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background-secondary to-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Fiyatlandırma</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            İhtiyacınıza uygun paketi seçin
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-md border rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                plan.featured
                  ? 'border-primary scale-105'
                  : plan.premium
                  ? 'border-secondary bg-gradient-to-br from-secondary/10 to-primary/10'
                  : 'border-white/10'
              }`}
            >
              {plan.badges && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {plan.badges.map((badge) => (
                    <span
                      key={`${plan.name}-${badge}`}
                      className="inline-flex bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">{plan.name}</h3>
                {plan.currency || plan.period ? (
                  <div className="flex items-baseline justify-center gap-2">
                    {plan.currency && <span className="text-xl text-white/80">{plan.currency}</span>}
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && <span className="text-lg text-white/80">{plan.period}</span>}
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white">{plan.price}</div>
                )}
              </div>
              <ul className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.link}
                className={`mt-auto text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.featured
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                    : plan.premium
                    ? 'bg-gradient-to-r from-secondary to-primary text-white hover:shadow-lg'
                    : 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Teklif Al
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

