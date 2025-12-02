'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type FloatingMessage = {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  expiresAt: number;
};

type ShootingStar = {
  id: number;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  angle: number;
  duration: number;
  delay: number;
  length: number;
  cycle: number;
};

const STAR_COUNT = 4;
const MESSAGE_LIMIT = 5;
const MESSAGE_LIFETIME_RANGE = [5000, 8200];

const messageTexts = [
  "AR-GE ekibiniz vizyona odaklansın, tekrar eden CAD işleri ParametriX'e emanet.",
  "Standart tasarım süreçlerini biz otomatiğe alalım, siz yeni ürün geliştirin.",
  "ParametriX ile üretime hazır dosyalar dakikalar içinde tamamlanır.",
  "Birlikte çalışalım, fabrikanızın tasarım hızını yeniden yazalım.",
  "Tek tıkla üretim paketleri müşterilerinize ışık hızında teslimatlar sağlar.",
  "Toplantıdan önce tüm çizim verilerini biz hazırlayalım.",
  "ParametriX AI, mühendislik ekibinizin daimi stratejik partneri olmaya hazır.",
  "Siz inovasyona odaklanın, çizim akışlarını biz yönetelim.",
  "Karmaşık projelerinizde %80'e varan zaman kazancına ulaşabilirsiniz.",
  "İletişim formunu doldurun, canlı demo ile süreci birlikte inceleyelim.",
  "Tekrarlayan görevleri otomatikleştirip maliyetlerinizi düşürün.",
  "ParametriX ile hassas üretim verilerini zahmetsizce oluşturun.",
  "Standart parçaları algoritmamız modelken siz yeni çözümler geliştirin.",
  "Ekibinizin enerjisini AR-GE'ye kaydırmak için hemen bize ulaşın.",
];

const taglineVariants = [
  { id: 'tr', text: 'Araştırma ve Yaratıcı Çözümler Teknolojisi' },
  { id: 'en', text: 'Research and Creative Solutions Technology' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroBounds, setHeroBounds] = useState({ width: 1920, height: 900 });
  const [messages, setMessages] = useState<FloatingMessage[]>([]);
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const lastMessageRef = useRef<string | null>(null);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const processedStarCycles = useRef(new Set<string>());

  const ambientStars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3.5 + 1.5,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })),
    []
  );

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  useEffect(
    () => () => {
      clearAllTimeouts();
    },
    [clearAllTimeouts]
  );

  useEffect(() => {
    const updateBounds = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setHeroBounds({ width: rect.width, height: rect.height });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const getRandomMessageText = useCallback(() => {
    const available = messageTexts.filter((msg) => msg !== lastMessageRef.current);
    const pool = available.length ? available : messageTexts;
    const text = pool[Math.floor(Math.random() * pool.length)];
    lastMessageRef.current = text;
    return text;
  }, []);

  const createStar = useCallback(
    (id: number, cycle = 0): ShootingStar => {
      const width = heroBounds.width || window.innerWidth || 1920;
      const height = heroBounds.height || window.innerHeight || 1080;
      const marginX = width * 0.08;
      const marginY = height * 0.08;

      const startX = marginX + Math.random() * (width - marginX * 2);
      const startY = marginY + Math.random() * (height * 0.45);

      const angle = -28 + Math.random() * 56;
      const radians = (angle * Math.PI) / 180;
      const distance = width * (0.38 + Math.random() * 0.32);

      const deltaX = Math.cos(radians) * distance;
      const deltaY = Math.sin(radians) * distance;

      const duration = 1.5 + Math.random() * 0.8;
      const delay = 0;
      const length = 110 + Math.random() * 90;

      return {
        id,
        startX,
        startY,
        deltaX,
        deltaY,
        angle,
        duration,
        delay,
        length,
        cycle,
      };
    },
    [heroBounds]
  );

  useEffect(() => {
    if (!heroBounds.width || !heroBounds.height) return;
    processedStarCycles.current.clear();
    const initialStars = Array.from({ length: STAR_COUNT }).map((_, index) => createStar(index, 0));
    setStars(initialStars);

    const updateStars = () => {
      setStars((prev) =>
        prev.map((star) => {
          const newStar = createStar(star.id, star.cycle + 1);
          return {
            ...newStar,
            cycle: star.cycle + 1,
          };
        })
      );
    };

    const interval = setInterval(() => {
      updateStars();
    }, 2300);

    return () => clearInterval(interval);
  }, [createStar, heroBounds]);

  const spawnMessage = useCallback(() => {
    if (!heroBounds.width || !heroBounds.height) return;

    setMessages((prev) => {
      const now = Date.now();
      const lifetime =
        MESSAGE_LIFETIME_RANGE[0] +
        Math.random() * (MESSAGE_LIFETIME_RANGE[1] - MESSAGE_LIFETIME_RANGE[0]);

      const safeMargin = Math.max(80, Math.min(heroBounds.width, heroBounds.height) * 0.1);
      const centerX = heroBounds.width / 2;
      const centerY = heroBounds.height / 2;
      const exclusionRadius = Math.min(heroBounds.width, heroBounds.height) * 0.28;

      let x = centerX;
      let y = centerY;
      let attempts = 0;

      while (attempts < 18) {
        x = safeMargin + Math.random() * (heroBounds.width - safeMargin * 2);
        y = safeMargin + Math.random() * (heroBounds.height - safeMargin * 2);

        const dx = x - centerX;
        const dy = y - centerY;
        if (Math.hypot(dx, dy) > exclusionRadius) {
          break;
        }
        attempts += 1;
      }

      const rotation = -8 + Math.random() * 16;
      const scale = 0.95 + Math.random() * 0.2;

      const message: FloatingMessage = {
        id: now + Math.random(),
        text: getRandomMessageText(),
        x,
        y,
        rotation,
        scale,
        expiresAt: now + lifetime,
      };

      const trimmed = prev.filter((item) => item.expiresAt > now);
      const nextMessages = [...trimmed, message].slice(-MESSAGE_LIMIT);

      const removal = setTimeout(() => {
        setMessages((current) => current.filter((item) => item.id !== message.id));
        timeoutsRef.current = timeoutsRef.current.filter((entry) => entry !== removal);
      }, lifetime);

      timeoutsRef.current.push(removal);

      return nextMessages;
    });
  }, [getRandomMessageText, heroBounds]);

  useEffect(() => {
    if (!heroBounds.width || !heroBounds.height) return;

    // Initial burst
    const initialCount = Math.min(MESSAGE_LIMIT, 3);
    for (let i = 0; i < initialCount; i += 1) {
      const timeout = setTimeout(() => {
        spawnMessage();
        timeoutsRef.current = timeoutsRef.current.filter((entry) => entry !== timeout);
      }, i * 350);
      timeoutsRef.current.push(timeout);
    }

    const interval = setInterval(() => {
      spawnMessage();
    }, 2400);

    return () => clearInterval(interval);
  }, [heroBounds, spawnMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglineVariants.length);
    }, 7200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Ambient Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {ambientStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full blur-sm"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background:
                'radial-gradient(circle, rgba(124, 58, 237, 0.8) 0%, rgba(37, 99, 235, 0.6) 50%, transparent 100%)',
            }}
            animate={{
              opacity: [0.25, 0.85, 0.25],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}-${star.cycle}`}
            className="absolute pointer-events-none"
            style={{
              left: star.startX,
              top: star.startY,
              rotate: star.angle,
              transformOrigin: '0% 50%',
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, star.deltaX * 0.7, star.deltaX * 0.95, star.deltaX],
              y: [0, star.deltaY * 0.7, star.deltaY * 0.95, star.deltaY],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          >
            <span
              className="block h-[2px] rounded-full"
              style={{
                width: `${star.length}px`,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 65%, rgba(255,255,255,1) 100%)',
                filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))',
              }}
            />
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(147, 51, 234, 1) 0%, rgba(79, 70, 229, 0.8) 60%, rgba(59,130,246,0.6) 75%, rgba(255,255,255,0) 100%)',
                boxShadow: '0 0 12px rgba(147, 51, 234, 0.8)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Messages */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: message.x, top: message.y }}
              initial={{ opacity: 0, scale: 0.85, rotate: message.rotation - 6 }}
              animate={{ opacity: 0.65, scale: message.scale, rotate: message.rotation }}
              exit={{ opacity: 0, scale: 0.7, rotate: message.rotation + 12 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 shadow-lg shadow-primary/10 max-w-xs text-left">
                <p className="text-sm text-white/80 leading-relaxed">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 space-y-4"
          >
            <span className="block leading-tight">
              <span className="text-white">RCS&nbsp;</span>
              <span className="gradient-text hero-animated-gradient inline-block">Teknoloji</span>
            </span>
            <AnimatePresence mode="wait">
              {taglineVariants.map(
                (variant, index) =>
                  index === taglineIndex && (
                    <motion.span
                      key={variant.id}
                      className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90"
                      initial={{ opacity: 0, y: 12, clipPath: 'inset(0% 0% 0% 100%)' }}
                      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                      exit={{ opacity: 0, y: -12, clipPath: 'inset(0% 100% 0% 0%)' }}
                      transition={{ duration: 0.75, ease: 'easeInOut' }}
                    >
                      {variant.text}
                    </motion.span>
                  )
              )}
            </AnimatePresence>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Yeniliğin sınırlarını zorlayan AR-GE firması olarak, mühendislik dünyasında devrim
            yaratan ParametriX ile 3D CAD tasarım süreçlerini dönüştürüyoruz. Daha fazla bilgi için
            hemen şimdi iletişime geçin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#parametrix-ai"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>ParametriX'i Keşfet</span>
            </Link>
            <Link
              href="#about"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-background transition-all duration-300 flex items-center gap-2"
            >
              Hakkımızda
            </Link>
          </motion.div>
        </div>
      </div>

      {/* CTA Card */}
      <Link
        href="#contact"
        className="pointer-events-auto absolute bottom-8 right-6 sm:bottom-10 sm:right-10 md:bottom-12 md:right-16 z-30 group focus:outline-none"
        aria-label="İletişim bölümüne git"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 max-w-xs shadow-lg shadow-primary/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Daha Fazla Bilgi Alın</h3>
              <p className="text-xs text-white/70">
                Tek tıkla iletişim formumuza gidin ve ekibimizle buluşun.
              </p>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="text-white/60 text-sm">Aşağı kaydırın</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

