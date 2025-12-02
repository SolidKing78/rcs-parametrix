'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Bot, TrendingUp } from 'lucide-react';

const techFeatures = [
  {
    icon: Zap,
    title: 'Hız',
    description: "ParametriX AI ile mühendislik süreçlerinde %80'e varan hız artışı sağlayın",
  },
  {
    icon: Target,
    title: 'Doğruluk',
    description: '2D teknik resimlerden 3D modellere %99.5 doğruluk oranında otomatik dönüşüm',
  },
  {
    icon: Bot,
    title: 'Otomasyon',
    description: 'CAD süreçlerini tamamen otomatikleştirin, yaratıcı tasarım çalışmalarına odaklanın',
  },
  {
    icon: TrendingUp,
    title: 'Verimlilik',
    description: 'Firmaların rekabet gücünü artırın, maliyetleri azaltın ve üretim verimliliğini maksimuma çıkarın',
  },
];

const cardLayout = [
  { x: -12, y: -16, rotate: -5 },
  { x: 6, y: -4, rotate: -2 },
  { x: 12, y: 12, rotate: 2 },
  { x: -4, y: 24, rotate: 4 },
];

export default function Technology() {
  return (
    <section id="technology" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Yapay Zeka ile Tasarımın Geleceğini Keşfedin
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            ParametriX'in AI gücüyle CAD süreçlerinizi dönüştürün
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-[20%] bg-gradient-to-br from-accent to-primary rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </div>
          </motion.div>

          <div className="relative py-8">
            <span className="hidden md:block absolute top-0 bottom-0 left-4 w-56 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2),_transparent_65%)] blur-3xl" />
            <div className="space-y-6 relative">
              {techFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const layout = cardLayout[index] || { x: 0, y: 0, rotate: 0 };
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: layout.x + 60, y: layout.y }}
                    whileInView={{ opacity: 1, x: layout.x, y: layout.y, rotate: layout.rotate }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.07, y: layout.y - 6, rotate: layout.rotate * 0.6 }}
                    className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-lg shadow-primary/5 hover:bg-white/12 hover:border-primary/40 hover:z-20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/30">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-white/70 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

