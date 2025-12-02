'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

const roadmapItems = [
  {
    date: '2026 Q4',
    title: 'Smart 2D/3D Beta Sürüm Çalışmaları',
    description: 'Teknik çizimlerin 3D modellere otomatik dönüşümü',
    status: 'planned',
    statusText: 'Planlandı',
  },
  {
    date: '2027 Q1',
    title: 'Akıllı Asistan Gelişmiş Versiyon',
    description: 'Parça sınıflandırma ve maliyet tahmini özellikleri',
    status: 'planned',
    statusText: 'Planlandı',
  },
  {
    date: '2027 veya 2028',
    title: 'Akıllı Tasarım Partneri',
    description: 'Sohbet tabanlı AI destekli tasarım asistanı',
    status: 'future',
    statusText: 'Gelecek',
  },
  {
    date: '',
    title: 'Tam Entegre Otonom Tasarım Ekosistemi',
    description: 'Yapay zeka ile tamamen otomatik tasarım süreci',
    status: 'vision',
    statusText: 'Vizyon',
  },
];

const emphasizeParametriX = (text: string): ReactNode => text.replace(/ParametriX/gi, 'ParametriX');

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📅 Parametri<span className="hero-letter-accent">X</span> AI Yol Haritası
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Geleceğin teknolojisini bugünden planlıyoruz
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative pb-24">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 overflow-hidden pointer-events-none">
            <div className="w-full h-full vertical-gradient-flow" />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-white/50 mb-1">
                Hedefimiz Gelecek
              </span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.div>
          </div>
          <div className="space-y-16">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.date}
                initial={{ opacity: 0, x: index % 2 === 0 ? -45 : 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                whileHover={{
                  translateY: -6,
                  transition: { type: 'spring', stiffness: 320, damping: 24, mass: 0.45 },
                }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2">
                  <div className={`bg-white/5 backdrop-blur-md border rounded-xl p-6 hover:bg-white/10 transition-all duration-300 ${
                    item.status === 'current' ? 'border-accent' : 'border-white/10'
                  }`}>
                    <div className={`text-primary font-semibold mb-2 ${item.date ? '' : 'opacity-0'}`}>{item.date || 'Vizyon'}</div>
                    <h4 className="text-xl font-semibold text-white mb-2">{emphasizeParametriX(item.title)}</h4>
                    <p className="text-white/70 mb-3">{emphasizeParametriX(item.description)}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'current'
                        ? 'bg-accent text-white'
                        : item.status === 'planned'
                        ? 'bg-primary text-white'
                        : item.status === 'future'
                        ? 'bg-secondary text-white'
                        : 'bg-gradient-to-r from-secondary to-primary text-white'
                    }`}>
                      {item.statusText}
                    </span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-4 border-background z-10 ${
                  item.status === 'current'
                    ? 'bg-accent'
                    : item.status === 'planned'
                    ? 'bg-primary'
                    : item.status === 'future'
                    ? 'bg-secondary'
                    : 'bg-gradient-to-br from-secondary to-primary'
                }`} />
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

