'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { Eye, Target, Users, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type AboutCardConfig = {
  icon: typeof Eye;
  title: string;
  description: string;
  type: 'vision' | 'mission' | 'team';
};

const aboutCards: AboutCardConfig[] = [
  {
    icon: Eye,
    title: 'Vizyonumuz',
    description:
      'Benzersiz ve yenilikçi çözümler sunarak sektörleri dönüştürmeyi ve hayatları değiştirmeyi amaçlıyoruz. Mümkün olanın sınırlarını zorlamak ve dünyada anlamlı bir fark yaratmak için çalışıyoruz.',
    type: 'vision',
  },
  {
    icon: Target,
    title: 'Misyonumuz',
    description:
      'Müşterilerimizle yakın bir şekilde çalışarak ihtiyaçlarını anlıyor ve onları aşan özel çözümler geliştiriyoruz. Yeni yazılım uygulamaları geliştirmek, keskin çözümler tasarlamak ve veri analizi için yenilikçi yaklaşımlar oluşturmak odağımızdır.',
    type: 'mission',
  },
  {
    icon: Users,
    title: 'Biz Kimiz?',
    description:
      'Mühendislik ve Ar-Ge ve 3D Teknik tasarımlar (CAD) konusunda alanında uzman 10+ tecrübeli ekibimiz ile imalat ve tasarım süreçlerini CAD otomasyonu ile dijitalde hatasız ve sürdürülebilir bir sistem geliştiriyoruz. Size özel yazılım kuruyoruz.',
    type: 'team',
  },
];

const timeline = [
  { year: '2022', event: "RCS'nin kuruluşu" },
  {
    year: '2023',
    event: 'İlk AR-GE faaliyetlerinin denenmesi ve Teknopark işbirlikleri',
  },
  {
    year: '2024',
    event:
      'İlk olarak SolidWorks tabanlı CAD otomasyon sistemlerinin faaliyete geçirilmesi ve demo kurulumları',
  },
  { year: '2025', event: "ParametriX'in piyasaya sürülmesi" },
];

const renderParametriXText = (text: string): ReactNode => text.replace(/ParametriX/gi, 'ParametriX');

function VisionIcon({ trigger }: { trigger: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!trigger) return;
    controls.start({
      scaleY: [1, 0.2, 1],
      transition: { duration: 0.24, ease: 'easeInOut' },
    });
  }, [trigger, controls]);

  return (
    <motion.div
      className="relative origin-center flex items-center justify-center w-full h-full"
      initial={{ scaleY: 1 }}
      animate={controls}
    >
      <Eye className="w-10 h-10 text-white" />
      <motion.span
        className="absolute top-1/2 left-1/2 w-12 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-white/70 to-white/10"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 0], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.24, ease: 'easeInOut', delay: 0.04 }}
      />
    </motion.div>
  );
}

function MissionIcon({ trigger }: { trigger: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!trigger) return;
    controls.start({
      x: [-26, 4, 0],
      rotate: [-18, -4, -2],
      opacity: [0, 1, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    });
  }, [trigger, controls]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Target className="w-10 h-10 text-white opacity-90" />
      <motion.span
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-8 bg-white rounded-full origin-right shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        initial={{ x: -26, opacity: 0 }}
        animate={controls}
      >
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-white/90" />
      </motion.span>
      <motion.span
        className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/30"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1, 0.9], opacity: [0, 1, 0.2] }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      />
    </div>
  );
}

function TeamIcon({ trigger }: { trigger: number }) {
  const orbitControls = useAnimationControls();

  useEffect(() => {
    if (!trigger) return;
    orbitControls.start({
      rotate: [0, 360],
      transition: { duration: 1.2, ease: 'easeInOut' },
    });
  }, [trigger, orbitControls]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Users className="w-10 h-10 text-white" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={orbitControls}
      >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_8px_rgba(124,58,237,0.7)]" />
        <span className="absolute -bottom-2 left-3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
        <span className="absolute -bottom-1 right-4 w-2 h-2 rounded-full bg-gradient-to-br from-secondary to-primary shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
      </motion.div>
    </div>
  );
}

function AboutCard({ card, index }: { card: AboutCardConfig; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const handleHoverStart = () => {
    setIsHovered(true);
    setTrigger((prev) => prev + 1);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_60%)] ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-primary/20 relative overflow-hidden">
        {card.type === 'vision' && <VisionIcon trigger={trigger} />}
        {card.type === 'mission' && <MissionIcon trigger={trigger} />}
        {card.type === 'team' && <TeamIcon trigger={trigger} />}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4 text-center">{card.title}</h3>
      <p className="text-white/80 text-center leading-relaxed">{card.description}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-background to-background-secondary relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Hakkımızda</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Teknolojinin geleceğini şekillendiren multidisipliner ekibimiz
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {aboutCards.map((card, index) => (
            <AboutCard key={card.title} card={card} index={index} />
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative pb-24">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 overflow-hidden pointer-events-none">
            <div className="w-full h-full vertical-gradient-flow" />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/50 mb-1">
                Yönümüz Hep İleri
              </span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.div>
          </div>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg shadow-primary/10">
                    <h4 className="text-2xl font-bold text-primary mb-2">{item.year}</h4>
                    <p className="text-white/80 leading-relaxed">{renderParametriXText(item.event)}</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="w-6 h-6 rounded-full border-4 border-background bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_0_12px_rgba(59,130,246,0.45)] block" />
                </div>
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


