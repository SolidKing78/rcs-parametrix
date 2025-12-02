'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    text: "Eskiden 2 gün süren işimizi şimdi 2 saatte tamamlıyoruz. ParametriX AI bizim için bir devrim.",
    author: "Ahmet Yılmaz",
    company: "TechVision Ltd. - Tasarım Müdürü",
  },
  {
    text: "Maliyetleri %40 düşürdük. Hatalar neredeyse sıfırlandı. ParametriX AI'nin sağladığı doğruluk inanılmaz.",
    author: "Mehmet Kaya",
    company: "AutoMech Industries - Proje Mühendisi",
  },
  {
    text: "Yapay zeka ile çalışmak inanılmaz bir deneyim. Adeta yanımda bir mühendis var. 2D'den 3D'ye dönüşüm süreci harika.",
    author: "Ayşe Demir",
    company: "DefenseCorp Systems - Tasarım Uzmanı",
  },
  {
    text: "ParametriX AI sayesinde tasarım süreçlerimiz %80 hızlandı. Müşteri memnuniyetimiz arttı.",
    author: "Can Özkan",
    company: "InnovateDesign Co. - CTO",
  },
  {
    text: "Premium sürümün API entegrasyonu sayesinde kendi sistemlerimizle mükemmel uyum sağladık.",
    author: "Zeynep Arslan",
    company: "Precision Engineering - Sistem Mimarı",
  },
];

const clients = [
  'TechVision Ltd.',
  'AutoMech Industries',
  'DefenseCorp Systems',
  'InnovateDesign Co.',
  'Precision Engineering',
];

export default function References() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="references" className="py-24 bg-gradient-to-b from-background-secondary to-background relative opacity-50 pointer-events-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Referanslar & Başarılar</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-4">
            Müşterilerimizin başarı hikayeleri
          </p>
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-200 text-sm font-semibold">
              ⚠️ Unutmayalım: Bu bölüm yakında açılacak!
            </p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8"
              >
                <p className="text-xl text-white/90 italic mb-6 leading-relaxed">
                  "{testimonials[currentSlide].text}"
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {testimonials[currentSlide].author}
                  </h4>
                  <span className="text-white/70 text-sm">
                    {testimonials[currentSlide].company}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-primary w-8' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setCurrentSlide(index)}
              className={`bg-white/5 backdrop-blur-md border rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 ${
                index === currentSlide ? 'border-primary bg-white/10' : 'border-white/10'
              }`}
            >
              <div className="text-white font-semibold opacity-80">{client}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

