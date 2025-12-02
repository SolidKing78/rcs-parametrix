'use client';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

type PortalType = 'management' | 'customer';

type SupportState = {
  isOpen: boolean;
  label: string;
  statusLabel: string;
};

type PortalDefinition = {
  type: PortalType;
  title: string;
  description: string;
  color: string;
  icon: string;
  features: Array<{
    icon: string;
    title: string;
    detail: string;
  }>;
  cta: string;
};

const portals: PortalDefinition[] = [
  {
    type: 'management',
    title: 'Yönetim Merkezi',
    description:
      'Operasyon evreninizi yönetin, üretim güvenliğini sağlayın, tüm analizlere tek ekrandan hükmedin.',
    color: '#9F6CFF',
    icon: 'fas fa-cogs',
    features: [
      {
        icon: 'fas fa-chart-line',
        title: 'Analitikler & Raporlar',
        detail: 'Gerçek zamanlı KPI panolarıyla operasyon hızını ölçün.',
      },
      {
        icon: 'fas fa-id-badge',
        title: 'Lisans Yönetimi',
        detail: 'Takım yetkilerini saniyeler içinde tanımlayın ve yönetin.',
      },
      {
        icon: 'fas fa-satellite-dish',
        title: 'Sistem İzleme',
        detail: 'ParametriX altyapısının nabzını 7/24 takip edin.',
      },
    ],
    cta: 'Yönetim Portalına Giriş',
  },
  {
    type: 'customer',
    title: 'Müşteri Portalı',
    description:
      'Üretim projelerinizi düzenleyin, faturalandırmayı yönetin ve destek ekibiyle anında iletişime geçin.',
    color: '#00D1FF',
    icon: 'fas fa-user-astronaut',
    features: [
      {
        icon: 'fas fa-file-invoice-dollar',
        title: 'Faturalar & Ödemeler',
        detail: 'Sözleşme ve ödeme geçmişinizi tek bakışta takip edin.',
      },
      {
        icon: 'fas fa-plug',
        title: 'Lisans Aktivasyonu',
        detail: 'Yeni projeleri saniyeler içinde hayata geçirin.',
      },
      {
        icon: 'fas fa-headset',
        title: 'Canlı Destek Merkezi',
        detail: 'ParametriX uzmanlarıyla gerçek zamanlı çözüm üretin.',
      },
    ],
    cta: 'Müşteri Portalına Giriş',
  },
];

const newsItems = [
  {
    id: 'px-20',
    tag: 'Güncelleme',
    title: 'ParametriX 2.0 Güncellemesi',
    description:
      'Yeni nesil otomasyon çekirdeği ve kuantum hazır altyapı yükseltmesi 18 Kasım haftasında yayında.',
    accent: '#9F6CFF',
    timestamp: 'Kas 2025',
  },
  {
    id: 'px-ai',
    tag: 'Lansman',
    title: 'ParametriX AI Lansmanı',
    description:
      'ParametriX AI ile üretim planlamasında %32’ye varan optimizasyonu canlı yayınla tanıtıyoruz.',
    accent: '#00D1FF',
    timestamp: 'Aralık 2025',
  },
  {
    id: 'rcs-report',
    tag: 'RCS Teknoloji',
    title: '2025 Endüstri 4.0 Trend Raporu',
    description:
      'RCS Teknoloji araştırma ekibi, üretim hatlarında dijital ikiz uygulamalarını derinlemesine inceledi.',
    accent: '#38E08C',
    timestamp: 'Ocak 2026',
  },
];

const motionEase = [0.22, 0.61, 0.36, 1];

export default function PortalSelectorPage() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotionRef = useRef<boolean>(false);

  const [activePortal, setActivePortal] = useState<PortalType | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionPortal, setTransitionPortal] = useState<PortalType | null>(null);
  const [streaks, setStreaks] = useState<Array<{ id: number; angle: number; delay: number }>>([]);
  const [supportState, setSupportState] = useState<SupportState>({
    isOpen: false,
    label: 'Kırmızı',
    statusLabel: 'Not Bırakın',
  });
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [loginModalPortal, setLoginModalPortal] = useState<PortalType | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);

  const secondaryNews = useMemo(
    () => newsItems.filter((_, index) => index !== activeNewsIndex),
    [activeNewsIndex]
  );

  const loginPortalDefinition = useMemo(
    () => portals.find((portal) => portal.type === loginModalPortal) ?? null,
    [loginModalPortal]
  );

  const modalTimeoutRef = useRef<number | null>(null);
  const loginNavTimeoutRef = useRef<number | null>(null);
  const loginPortalResetTimeoutRef = useRef<number | null>(null);
  const loginSupportTimeoutRef = useRef<number | null>(null);

  const streakCount = 12;

  const portalIntensity = useMemo(() => {
    if (transitioning && transitionPortal) {
      return transitionPortal === 'management'
        ? {
            leftScale: 2,
            rightScale: 1.4,
            leftOpacity: 1.35,
            rightOpacity: 1.15,
          }
        : {
            leftScale: 1.4,
            rightScale: 2,
            leftOpacity: 1.15,
            rightOpacity: 1.35,
          };
    }

    if (activePortal === 'management') {
      return { leftScale: 1.6, rightScale: 0.7, leftOpacity: 1.3, rightOpacity: 0.45 };
    }

    if (activePortal === 'customer') {
      return { leftScale: 0.7, rightScale: 1.6, leftOpacity: 0.45, rightOpacity: 1.3 };
    }

    return { leftScale: 1, rightScale: 1, leftOpacity: 0.85, rightOpacity: 0.85 };
  }, [activePortal, transitionPortal, transitioning]);

  const applyIntensity = useCallback(() => {
    if (!rootRef.current) return;
    const { leftScale, rightScale, leftOpacity, rightOpacity } = portalIntensity;
    const style = rootRef.current.style;
    style.setProperty('--left-scale', leftScale.toString());
    style.setProperty('--right-scale', rightScale.toString());
    style.setProperty('--left-opacity', leftOpacity.toString());
    style.setProperty('--right-opacity', rightOpacity.toString());
  }, [portalIntensity]);

  const handlePortalHover = useCallback((portal: PortalType | null) => {
    setActivePortal(portal);
  }, []);

  const evaluateSupportState = useCallback((): SupportState => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Istanbul',
      hour: 'numeric',
      weekday: 'short',
    });
    const formatted = formatter.formatToParts(now);
    const weekday = formatted.find((part) => part.type === 'weekday')?.value ?? 'Mon';
    const hour = Number(formatted.find((part) => part.type === 'hour')?.value ?? '0');

    const workdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const isOpen = workdays.includes(weekday) && hour >= 9 && hour < 17;

    return {
      isOpen,
      label: isOpen ? 'Yeşil' : 'Kırmızı',
      statusLabel: isOpen ? 'Canlı Desteğe Bağlan' : 'Not Bırakın',
    };
  }, []);

  const generateStreaks = useCallback(() => {
    if (reducedMotionRef.current) return;
    const freshStreaks = Array.from({ length: streakCount }).map((_, index) => ({
      id: index,
      angle: Math.random() * 360,
      delay: Math.random() * 0.3,
    }));
    setStreaks(freshStreaks);
  }, [streakCount]);

  const handlePortalSelect = useCallback(
    (portal: PortalType) => {
      if (transitioning) return;

      if (modalTimeoutRef.current) {
        window.clearTimeout(modalTimeoutRef.current);
      }
      if (loginPortalResetTimeoutRef.current) {
        window.clearTimeout(loginPortalResetTimeoutRef.current);
      }

      setActivePortal(null);
      setLoginModalPortal(portal);

      if (reducedMotionRef.current) {
        setLoginModalOpen(true);
        return;
      }

      setTransitionPortal(portal);
      setTransitioning(true);
      generateStreaks();

      modalTimeoutRef.current = window.setTimeout(() => {
        setLoginModalOpen(true);
      }, 460);
    },
    [generateStreaks, transitioning]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;
    const handleChange = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    applyIntensity();
  }, [applyIntensity, portalIntensity]);

  useEffect(() => {
    setSupportState(evaluateSupportState());
    const interval = setInterval(() => {
      setSupportState(evaluateSupportState());
    }, 60000);
    return () => clearInterval(interval);
  }, [evaluateSupportState]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveNewsIndex((previous) => (previous + 1) % newsItems.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || reducedMotionRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const particleCount = 120;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.splice(0, particles.length);
      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1.2 + 0.2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 2.2 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.2,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 10 * p.z);
        gradient.addColorStop(0, `rgba(255,255,255,${p.baseAlpha})`);
        gradient.addColorStop(0.3, `rgba(155, 150, 255, ${p.baseAlpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(18,18,35,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 8 * p.z, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    resizeCanvas();
    initParticles();
    render();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!transitioning) {
      setStreaks([]);
      return;
    }
    const timeout = setTimeout(() => {
        setTransitioning(false);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [transitioning]);

  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) {
        window.clearTimeout(modalTimeoutRef.current);
      }
      if (loginNavTimeoutRef.current) {
        window.clearTimeout(loginNavTimeoutRef.current);
      }
      if (loginPortalResetTimeoutRef.current) {
        window.clearTimeout(loginPortalResetTimeoutRef.current);
      }
      if (loginSupportTimeoutRef.current) {
        window.clearTimeout(loginSupportTimeoutRef.current);
      }
    };
  }, []);

  const handleLoginClose = useCallback(() => {
    setLoginModalOpen(false);
    if (modalTimeoutRef.current) {
      window.clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
    if (loginPortalResetTimeoutRef.current) {
      window.clearTimeout(loginPortalResetTimeoutRef.current);
    }
    loginPortalResetTimeoutRef.current = window.setTimeout(() => {
      setLoginModalPortal(null);
    }, 320);
  }, []);

  const handleLoginSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!loginModalPortal) return;

      const targetHref = loginModalPortal === 'management' ? '/management' : '/customer-portal';

      if (modalTimeoutRef.current) {
        window.clearTimeout(modalTimeoutRef.current);
        modalTimeoutRef.current = null;
      }
      if (loginPortalResetTimeoutRef.current) {
        window.clearTimeout(loginPortalResetTimeoutRef.current);
      }
      if (loginNavTimeoutRef.current) {
        window.clearTimeout(loginNavTimeoutRef.current);
      }

      setLoginModalOpen(false);

      if (reducedMotionRef.current) {
        router.push(targetHref);
        setLoginModalPortal(null);
        return;
      }

      setTransitionPortal(loginModalPortal);
      setTransitioning(true);
      generateStreaks();

      loginNavTimeoutRef.current = window.setTimeout(() => {
        router.push(targetHref);
      }, 900);

      loginPortalResetTimeoutRef.current = window.setTimeout(() => {
        setLoginModalPortal(null);
      }, 520);
    },
    [generateStreaks, loginModalPortal, router]
  );

  const handleNavigateHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleLoginSupportRedirect = useCallback(() => {
    handleLoginClose();
    if (loginSupportTimeoutRef.current) {
      window.clearTimeout(loginSupportTimeoutRef.current);
    }
    loginSupportTimeoutRef.current = window.setTimeout(() => {
      setSupportModalOpen(true);
    }, 320);
  }, [handleLoginClose]);

  return (
    <div
      ref={rootRef}
      className={clsx(
        'portal-root relative min-h-screen w-full overflow-hidden text-white',
        reducedMotionRef.current && 'reduce-motion'
      )}
    >
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-20" />

      <div className="portal-background fixed inset-0 -z-30" />

      <header className="pointer-events-none absolute top-12 left-1/2 z-10 -translate-x-1/2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: motionEase }}
          className="text-4xl md:text-5xl font-bold tracking-[0.35em] uppercase text-white/85"
        >
          ParametriX Portal Merkezi
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.2, ease: motionEase, delay: 0.4 }}
          className="mt-3 text-xs md:text-sm tracking-[0.42em] uppercase text-white/60"
        >
          Hangi dokunuş mühendislik akışınızı hızlandıracak? Yönetim mi deneyim mi?
        </motion.div>
      </header>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-16 pb-40">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {portals.map((portal) => {
            const isActive = activePortal === portal.type;
            const isTransitionPortal = transitionPortal === portal.type && transitioning;

            return (
              <motion.div
                key={portal.type}
                className="portal-card-wrapper"
                style={{ '--portal-accent': portal.color } as CSSProperties}
                whileHover={{ rotateX: -6, rotateY: portal.type === 'management' ? -6 : 6, translateZ: 18 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.7, ease: motionEase }}
                onHoverStart={() => handlePortalHover(portal.type)}
                onHoverEnd={() => handlePortalHover(null)}
              >
                <motion.article
                  className={clsx('portal-card group', isActive && 'portal-card--active')}
                  animate={
                    isTransitionPortal
                      ? {
                          scale: 1.32,
                          filter: 'brightness(1.45) blur(1.6px)',
                        }
                      : { scale: 1, filter: 'brightness(1) blur(0px)' }
                  }
                  transition={{ duration: 0.75, ease: motionEase }}
                >
                  <div className="portal-card__halo" aria-hidden="true" />
                  <div className="portal-card__header">
                    <motion.div
                      className="portal-card__icon"
                      style={{ color: portal.color }}
                      animate={
                        isActive
                          ? {
                              rotateY: 360,
                              scale: 1.1,
                            }
                          : {
                              rotateY: 0,
                              scale: 1,
                            }
                      }
                      transition={{ duration: 0.9, ease: motionEase }}
                    >
                      <i className={portal.icon}></i>
                    </motion.div>
                    <h2 className="portal-card__title">{portal.title}</h2>
                    <p className="portal-card__description">{portal.description}</p>
                  </div>

                  <ul className="portal-card__features">
                    {portal.features.map((feature) => (
                      <li key={feature.title} className="portal-card__feature">
                        <span className="portal-card__feature-icon">
                          <i className={feature.icon}></i>
                        </span>
                        <div>
                          <div className="portal-card__feature-title">{feature.title}</div>
                          <div className="portal-card__feature-detail">{feature.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="portal-card__cta">
                    <button
                      type="button"
                      aria-label={portal.cta}
                      onClick={() => handlePortalSelect(portal.type)}
                    >
                      {portal.cta}
                    </button>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </main>

      <aside className="portal-info-cluster">
        <div className="portal-info-card">
          <div className="portal-info-card__icon">
            <i className="fas fa-signal"></i>
          </div>
          <div>
            <div className="portal-info-card__label">Sistem Uptime</div>
            <div className="portal-info-card__value">99.9% SLA</div>
          </div>
        </div>
        <div className="portal-info-card">
          <div className="portal-info-card__icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div>
            <div className="portal-info-card__label">Sistem Durumu</div>
            <div className="portal-info-card__value">Tüm servisler aktif</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setSupportModalOpen(true)}
          className={clsx(
            'portal-support-card',
            supportState.isOpen ? 'portal-support-card--online' : 'portal-support-card--offline'
          )}
        >
          <span className="portal-support-card__dot" />
          <div>
            <div className="portal-support-card__label">Canlı Destek</div>
            <div className="portal-support-card__value">{supportState.statusLabel}</div>
          </div>
        </button>
      </aside>

      <aside className="portal-news-panel">
        <div className="portal-news-panel__heading">
          <i className="fas fa-newspaper"></i>
          <span>RCS Teknoloji Haberleri</span>
        </div>
        <div className="portal-news-panel__ticker">
          <AnimatePresence mode="wait">
            <motion.article
              key={newsItems[activeNewsIndex].id}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 1 }}
              transition={{ duration: 0.55, ease: motionEase }}
              className="portal-news-panel__card"
              style={{ '--accent': newsItems[activeNewsIndex].accent } as CSSProperties}
            >
              <header>
                <span className="portal-news-panel__tag">{newsItems[activeNewsIndex].tag}</span>
                <span className="portal-news-panel__time">{newsItems[activeNewsIndex].timestamp}</span>
              </header>
              <h3>{newsItems[activeNewsIndex].title}</h3>
              <p>{newsItems[activeNewsIndex].description}</p>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="portal-news-panel__indicators">
          {newsItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNewsIndex(index)}
              className={clsx(
                'portal-news-panel__indicator',
                index === activeNewsIndex && 'portal-news-panel__indicator--active'
              )}
              aria-label={`${item.title} haber kartını görüntüle`}
            />
          ))}
        </div>
        <ul className="portal-news-panel__list">
          {secondaryNews.map((item) => (
            <li key={item.id} className="portal-news-panel__list-item">
              <span className="portal-news-panel__list-time">{item.timestamp}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <footer className="portal-footer-nav">
        <button type="button" className="portal-footer-nav__link" onClick={handleNavigateHome}>
          <span className="portal-footer-nav__icon">
            <i className="fas fa-home"></i>
          </span>
          <span>Ana Sayfaya Dön</span>
        </button>
        <button
          type="button"
          className="portal-footer-nav__link"
          onClick={() => setHelpModalOpen(true)}
        >
          <span className="portal-footer-nav__icon">
            <i className="fas fa-question-circle"></i>
          </span>
          <span>Yardım &amp; S.S.S.</span>
        </button>
        <span className="portal-footer-nav__copy">© 2025 ParametriX Portal Merkezi</span>
      </footer>

      <AnimatePresence>
        {helpModalOpen && (
          <motion.div
            key="help-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="portal-modal__backdrop"
            onClick={() => setHelpModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.45, ease: motionEase }}
              className="portal-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="portal-modal__header">
                <h3>Portal Rehberi &amp; Sık Sorulan Sorular</h3>
                <button
                  type="button"
                  aria-label="Yardım penceresini kapat"
                  onClick={() => setHelpModalOpen(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <section className="portal-modal__body">
                <article>
                  <h4>Yönetim Merkezi ne sağlar?</h4>
                  <p>
                    Dağıtım orkestrasyonu, kullanıcı yetkilendirme ve analitik paneller tek ekranda.
                    Operasyon ekipleri tüm altyapının ritmini buradan yönetir.
                  </p>
                </article>
                <article>
                  <h4>Müşteri Portalı kimler için?</h4>
                  <p>
                    Lisans sahipleri, satın alma ve üretim ekipleri; faturalar, destek kayıtları ve
                    proje aktivasyonlarını bu portal üzerinden yürütür.
                  </p>
                </article>
                <article>
                  <h4>Sık Sorulanlar</h4>
                  <ul className="portal-modal__faq">
                    <li>
                      <strong>Portal erişimini nasıl alırım?</strong>
                      <span>
                        Yönetim tarafı için sistem yöneticinizden rol isteyin; müşteri tarafı için
                        sözleşme e-postanızdaki aktivasyon bağlantısını kullanın.
                      </span>
                    </li>
                    <li>
                      <strong>Canlı destek hangi kanalları sunuyor?</strong>
                      <span>
                        Çalışma saatlerinde canlı chat ve görüntülü görüşme; diğer zamanlarda size
                        geri dönüş yapabilmemiz için form bırakabilirsiniz.
                      </span>
                    </li>
                    <li>
                      <strong>Güvenlik denetimleri kimde?</strong>
                      <span>
                        SOC2 uyumlu altyapımızda tüm dağıtımlar yönetim portalı üzerinden audite edilir
                        ve loglanır.
                      </span>
                    </li>
                  </ul>
                </article>
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {supportModalOpen && (
          <motion.div
            key="support-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="portal-modal__backdrop"
            onClick={() => setSupportModalOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.45, ease: motionEase }}
              className="portal-modal portal-modal--support"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="portal-modal__header">
                <h3>{supportState.isOpen ? 'Canlı Destek Kanalı' : 'Not Bırakın'}</h3>
                <button
                  type="button"
                  aria-label="Destek penceresini kapat"
                  onClick={() => setSupportModalOpen(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <section className="portal-modal__body">
                {supportState.isOpen ? (
                  <form className="portal-modal__form" onSubmit={(event) => event.preventDefault()}>
                    <label>
                      Ad Soyad
                      <input type="text" name="support-name" required placeholder="Adınızı girin" />
                    </label>
                    <label>
                      E-posta
                      <input type="email" name="support-email" required placeholder="ornek@firma.com" />
                    </label>
                    <label>
                      Konu
                      <input
                        type="text"
                        name="support-subject"
                        required
                        placeholder="Destek talebinizin başlığı"
                      />
                    </label>
                    <label>
                      Mesajınız
                      <textarea
                        name="support-message"
                        rows={4}
                        required
                        placeholder="Nasıl yardımcı olabiliriz?"
                      />
                    </label>
                    <button type="submit" className="portal-modal__submit">
                      Canlı Uzmanla Görüş
                    </button>
                  </form>
                ) : (
                  <form className="portal-modal__form" onSubmit={(event) => event.preventDefault()}>
                    <p>
                      Çalışma saatlerimiz dışında bize ulaştınız. Mesajınızı bırakın; ilk mesai
                      başlangıcında dönüş yapacağız.
                    </p>
                    <label>
                      E-posta
                      <input
                        type="email"
                        name="support-email-offline"
                        required
                        placeholder="ornek@firma.com"
                      />
                    </label>
                    <label>
                      Mesajınız
                      <textarea
                        name="support-message-offline"
                        rows={4}
                        required
                        placeholder="Sorununuzu veya talebinizi paylaşın"
                      />
                    </label>
                    <button type="submit" className="portal-modal__submit">
                      Notu Gönder
                    </button>
                  </form>
                )}
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loginPortalDefinition && loginModalOpen && (
          <motion.div
            key="login-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: motionEase }}
            className="portal-login__backdrop"
            onClick={handleLoginClose}
          >
            <motion.div
              initial={{ y: 32, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 32, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: motionEase }}
              className="portal-login"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="portal-login__header">
                <span
                  className="portal-login__glyph"
                  style={{ '--accent': loginPortalDefinition.color } as CSSProperties}
                >
                  <i className={loginPortalDefinition.icon}></i>
                </span>
                <div>
                  <h3>{loginPortalDefinition.title} Giriş Portali</h3>
                  <p>{loginPortalDefinition.description}</p>
                </div>
                <button
                  type="button"
                  aria-label="Giriş penceresini kapat"
                  onClick={handleLoginClose}
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <section className="portal-login__body">
                <form className="portal-login__form" onSubmit={handleLoginSubmit}>
                  <label>
                    Kurumsal E-Posta
                    <input type="email" name="login-email" required placeholder="ornek@parametrix.com" />
                  </label>
                  <label>
                    Parola
                    <input type="password" name="login-password" required placeholder="••••••••" />
                  </label>
                  <label>
                    MFA Kodu
                    <input type="text" name="login-otp" required placeholder="000000" inputMode="numeric" />
                  </label>
                  <div className="portal-login__actions">
                    <button type="submit" className="portal-login__submit">
                      Sinematik Geçiş ile Giriş
                    </button>
                    <button
                      type="button"
                      className="portal-login__support"
                      onClick={handleLoginSupportRedirect}
                    >
                      Uzmanla Hemen Görüş
                    </button>
                  </div>
                  <p className="portal-login__note">
                    Sertifika tabanlı erişimler <span>ParametriX Vault</span> üzerinden doğrulanır.
                  </p>
                </form>
                <aside className="portal-login__brief">
                  <h4>Hızlı Öne Çıkanlar</h4>
                  <ul>
                    {loginPortalDefinition.features.map((feature) => (
                      <li key={feature.title}>
                        <span className="portal-login__brief-icon">
                          <i className={feature.icon}></i>
                        </span>
                        <div>
                          <strong>{feature.title}</strong>
                          <p>{feature.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </aside>
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transitioning && (
          <>
            <motion.div
              key="energy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: motionEase }}
              className="portal-energy"
            />
            <div className="portal-streaks" aria-hidden="true">
              {streaks.map((streak) => (
                <motion.span
                  key={streak.id}
                  className="portal-streaks__line"
                  style={{ '--angle': `${streak.angle}deg` } as CSSProperties}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.8,
                    ease: motionEase,
                    delay: streak.delay,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .portal-root {
          --left-scale: 1;
          --right-scale: 1;
          --left-opacity: 0.85;
          --right-opacity: 0.85;
        }

        .portal-background {
          background: radial-gradient(circle at 20% 50%, rgba(159, 108, 255, 0.45) 0%, transparent 55%),
            radial-gradient(circle at 80% 50%, rgba(0, 209, 255, 0.45) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%, rgba(40, 50, 80, 0.9) 0%, #0b0f1e 85%);
          filter: blur(0);
        }

        .portal-background::before,
        .portal-background::after {
          content: '';
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          background-size: 60% 60%;
          animation: swirl 28s linear infinite;
          mix-blend-mode: screen;
        }

        .portal-background::after {
          animation-direction: reverse;
          animation-duration: 36s;
          opacity: 0.6;
        }

        .portal-card-wrapper {
          position: relative;
          perspective: 1600px;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(${motionEase.join(',')});
        }

        .portal-card-wrapper::before,
        .portal-card-wrapper::after {
          content: '';
          position: absolute;
          inset: -2%;
          border-radius: 36px;
          pointer-events: none;
        }

        .portal-card-wrapper::before {
          border: 1px solid rgba(255, 255, 255, 0.18);
          opacity: 0.4;
        }

        .portal-card-wrapper::after {
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.16), transparent 65%);
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(${motionEase.join(',')});
        }

        .portal-card-wrapper:hover::after {
          opacity: 0.35;
        }

        .portal-card {
          position: relative;
          border-radius: 32px;
          padding: 3rem 2.6rem;
          background: linear-gradient(140deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          box-shadow: 0 35px 70px rgba(6, 8, 20, 0.45);
          transition: transform 0.8s cubic-bezier(${motionEase.join(',')}),
            border-color 0.6s cubic-bezier(${motionEase.join(',')}),
            box-shadow 0.6s cubic-bezier(${motionEase.join(',')}),
            background 0.6s cubic-bezier(${motionEase.join(',')});
          transform-style: preserve-3d;
        }

        .portal-card::before,
        .portal-card::after {
          content: '';
          position: absolute;
          inset: -40%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 70%);
          opacity: 0;
          transform: scale(0.75);
          transition: opacity 0.6s cubic-bezier(${motionEase.join(',')}),
            transform 0.8s cubic-bezier(${motionEase.join(',')});
        }

        .portal-card:hover::before,
        .portal-card:hover::after {
          opacity: 0.35;
          transform: scale(1);
        }

        .portal-card__halo {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.14), transparent 60%);
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(${motionEase.join(',')});
        }

        .portal-card__header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .portal-card__icon {
          width: 88px;
          height: 88px;
          margin: 0 auto 1.5rem auto;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 1.9rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 12px 30px rgba(10, 14, 42, 0.35);
          transition: transform 0.8s cubic-bezier(${motionEase.join(',')});
        }

        .portal-card__title {
          font-size: clamp(1.6rem, 2vw, 2rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .portal-card__description {
          color: rgba(226, 232, 255, 0.75);
          font-size: 0.95rem;
          max-width: 26ch;
          margin: 0 auto;
          line-height: 1.6;
        }

        .portal-card__features {
          display: grid;
          gap: 0.9rem;
          margin: 0;
          padding: 0;
          list-style: none;
          position: relative;
          z-index: 2;
        }

        .portal-card__feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.3rem;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: border-color 0.4s cubic-bezier(${motionEase.join(',')}),
            transform 0.4s cubic-bezier(${motionEase.join(',')}),
            background 0.4s cubic-bezier(${motionEase.join(',')});
          transform: translateZ(0);
        }

        .portal-card__feature:hover {
          transform: translate3d(0, -4px, 0);
          border-color: var(--portal-accent);
          background: rgba(255, 255, 255, 0.12);
        }

        .portal-card__feature-icon {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--portal-accent);
          font-size: 1.1rem;
          box-shadow: inset 0 0 16px rgba(255, 255, 255, 0.18);
        }

        .portal-card__feature-title {
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .portal-card__feature-detail {
          font-size: 0.82rem;
          color: rgba(226, 232, 255, 0.7);
          line-height: 1.5;
        }

        .portal-card__cta {
          margin-top: 2.6rem;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .portal-card__cta button {
          position: relative;
          padding: 0.95rem 2.6rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transform: translateZ(0);
          transition: transform 0.55s cubic-bezier(${motionEase.join(',')}),
            background 0.5s cubic-bezier(${motionEase.join(',')}),
            box-shadow 0.5s cubic-bezier(${motionEase.join(',')});
        }

        .portal-card__cta button:hover {
          transform: translate3d(0, -6px, 0) scale3d(1.04, 1.04, 1.04);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 45px rgba(0, 209, 255, 0.25);
        }

        .portal-card--active .portal-card__halo {
          opacity: 0.4;
        }

        .portal-info-cluster {
          position: absolute;
          bottom: 128px;
          left: clamp(16px, 6vw, 96px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 20;
        }

        .portal-info-card,
        .portal-support-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 1.4rem;
          border-radius: 22px;
          background: rgba(12, 16, 35, 0.55);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 45px rgba(8, 12, 28, 0.28);
        }

        .portal-info-card__label {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(226, 232, 255, 0.6);
        }

        .portal-info-card__value {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .portal-info-card__icon {
          width: 40px;
          height: 40px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05));
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: grid;
          place-items: center;
          color: rgba(255, 255, 255, 0.85);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.12);
        }

        .portal-support-card {
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(${motionEase.join(',')}),
            background 0.4s cubic-bezier(${motionEase.join(',')});
        }

        .portal-support-card:hover {
          transform: translate3d(0, -6px, 0);
        }

        .portal-support-card__dot {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.35);
        }

        .portal-support-card--online .portal-support-card__dot {
          background: rgba(34, 197, 94, 0.95);
          box-shadow: 0 0 24px rgba(34, 197, 94, 0.85);
        }

        .portal-support-card--offline .portal-support-card__dot {
          background: rgba(239, 68, 68, 0.95);
          box-shadow: 0 0 24px rgba(239, 68, 68, 0.85);
        }

        .portal-support-card__label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: rgba(226, 232, 255, 0.65);
        }

        .portal-support-card__value {
          font-size: 0.92rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.92);
          letter-spacing: 0.08em;
        }

        .portal-news-panel {
          position: absolute;
          bottom: 118px;
          right: clamp(16px, 6vw, 90px);
          width: min(340px, 82vw);
          padding: 1.6rem 1.8rem;
          border-radius: 26px;
          background: rgba(12, 16, 32, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(14px);
          box-shadow: 0 24px 65px rgba(6, 10, 26, 0.52);
          display: grid;
          gap: 1.2rem;
          z-index: 20;
        }

        .portal-news-panel__heading {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.92rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.8);
        }

        .portal-news-panel__heading i {
          color: rgba(0, 209, 255, 0.85);
        }

        .portal-news-panel__ticker {
          position: relative;
          min-height: 150px;
        }

        .portal-news-panel__card {
          position: relative;
          display: grid;
          gap: 0.75rem;
          padding: 1.3rem 1.2rem 1.4rem 1.2rem;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(12, 16, 32, 0.3));
          border-left: 3px solid var(--accent);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.28);
        }

        .portal-news-panel__card header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .portal-news-panel__card h3 {
          font-size: 1.05rem;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.92);
          margin: 0;
        }

        .portal-news-panel__card p {
          margin: 0;
          font-size: 0.86rem;
          color: rgba(226, 232, 255, 0.74);
          line-height: 1.6;
        }

        .portal-news-panel__tag {
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          background: rgba(159, 108, 255, 0.18);
          border: 1px solid rgba(159, 108, 255, 0.4);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.78);
        }

        .portal-news-panel__time {
          font-size: 0.72rem;
          color: rgba(226, 232, 255, 0.55);
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .portal-news-panel__indicators {
          display: inline-flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .portal-news-panel__indicator {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(${motionEase.join(',')});
        }

        .portal-news-panel__indicator--active {
          transform: scale(1.28);
          background: rgba(255, 255, 255, 0.75);
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.55);
        }

        .portal-news-panel__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.9rem;
        }

        .portal-news-panel__list-item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.9rem;
          align-items: start;
        }

        .portal-news-panel__list-time {
          padding: 0.35rem 0.7rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
        }

        .portal-news-panel__list h4 {
          margin: 0 0 0.2rem 0;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.84);
        }

        .portal-news-panel__list p {
          margin: 0;
          font-size: 0.78rem;
          color: rgba(226, 232, 255, 0.63);
          line-height: 1.6;
        }

        .portal-footer-nav {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: repeat(3, auto);
          align-items: center;
          gap: clamp(24px, 10vw, 120px);
          padding: 0.75rem 1.5rem;
          border-radius: 999px;
          background: rgba(10, 12, 25, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(14px);
          box-shadow: 0 18px 40px rgba(6, 10, 24, 0.4);
          z-index: 25;
        }

        .portal-footer-nav__link {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(226, 232, 255, 0.78);
          transition: color 0.35s cubic-bezier(${motionEase.join(',')});
        }

        .portal-footer-nav__link:hover {
          color: rgba(255, 255, 255, 0.95);
        }

        .portal-footer-nav__link .portal-footer-nav__icon {
          width: 32px;
          height: 32px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.85);
          box-shadow: inset 0 0 16px rgba(255, 255, 255, 0.18);
        }

        .portal-footer-nav__copy {
          font-size: 0.78rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(226, 232, 255, 0.55);
          text-align: right;
        }

        .portal-modal__backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6, 10, 24, 0.72);
          backdrop-filter: blur(18px);
          display: grid;
          place-items: center;
          z-index: 40;
        }

        .portal-modal {
          width: min(680px, 92vw);
          border-radius: 28px;
          background: rgba(6, 10, 24, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 40px 90px rgba(4, 8, 20, 0.6);
          padding: 2.4rem 2.6rem;
          color: rgba(226, 232, 255, 0.9);
          display: grid;
          gap: 1.6rem;
        }

        .portal-modal--support {
          width: min(520px, 92vw);
        }

        .portal-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
        }

        .portal-modal__header h3 {
          font-size: 1.1rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.82);
        }

        .portal-modal__header button {
          width: 36px;
          height: 36px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.85);
          display: grid;
          place-items: center;
        }

        .portal-modal__body {
          display: grid;
          gap: 1.4rem;
        }

        .portal-modal__body h4 {
          font-size: 0.92rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 0.4rem;
        }

        .portal-modal__body p {
          margin: 0;
          line-height: 1.6;
          color: rgba(226, 232, 255, 0.75);
        }

        .portal-modal__faq {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.8rem;
        }

        .portal-modal__faq li {
          background: rgba(255, 255, 255, 0.06);
          padding: 0.9rem 1.1rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          line-height: 1.5;
        }

        .portal-modal__faq strong {
          display: block;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.3rem;
          color: rgba(255, 255, 255, 0.88);
        }

        .portal-modal__form {
          display: grid;
          gap: 1rem;
        }

        .portal-modal__form label {
          display: grid;
          gap: 0.45rem;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.68);
        }

        .portal-modal__form input,
        .portal-modal__form textarea {
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(12, 16, 32, 0.6);
          color: rgba(255, 255, 255, 0.88);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.08);
        }

        .portal-modal__form textarea {
          resize: none;
        }

        .portal-modal__submit {
          justify-self: flex-start;
          padding: 0.85rem 2.4rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: linear-gradient(135deg, rgba(159, 108, 255, 0.85), rgba(0, 209, 255, 0.85));
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .portal-login__backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 12, 24, 0.72);
          backdrop-filter: blur(18px);
          display: grid;
          place-items: center;
          z-index: 40;
        }

        .portal-login {
          width: min(920px, 94vw);
          border-radius: 30px;
          background: rgba(6, 10, 24, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 45px 120px rgba(4, 8, 20, 0.65);
          padding: 2.8rem 3rem;
          color: rgba(226, 232, 255, 0.9);
          display: grid;
          gap: 2rem;
        }

        .portal-login__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.6rem;
        }

        .portal-login__glyph {
          width: 72px;
          height: 72px;
          border-radius: 24px;
          display: grid;
          place-items: center;
          font-size: 1.6rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: var(--accent);
          box-shadow: 0 25px 45px rgba(0, 0, 0, 0.35);
        }

        .portal-login__header h3 {
          margin: 0 0 0.45rem 0;
          font-size: 1.3rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.86);
        }

        .portal-login__header p {
          margin: 0;
          font-size: 0.92rem;
          color: rgba(226, 232, 255, 0.68);
          max-width: 40ch;
          line-height: 1.6;
        }

        .portal-login__header button {
          width: 40px;
          height: 40px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.78);
          display: grid;
          place-items: center;
        }

        .portal-login__body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 2.2rem;
        }

        .portal-login__form {
          display: grid;
          gap: 1.1rem;
        }

        .portal-login__form label {
          display: grid;
          gap: 0.5rem;
          font-size: 0.84rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
        }

        .portal-login__form input {
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(12, 16, 32, 0.58);
          color: rgba(255, 255, 255, 0.9);
          padding: 0.85rem 1.1rem;
          font-size: 0.95rem;
          box-shadow: inset 0 0 14px rgba(255, 255, 255, 0.08);
        }

        .portal-login__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          margin-top: 0.6rem;
        }

        .portal-login__submit {
          padding: 0.9rem 2.6rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: linear-gradient(135deg, rgba(159, 108, 255, 0.9), rgba(0, 209, 255, 0.9));
          color: rgba(255, 255, 255, 0.96);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .portal-login__support {
          padding: 0.9rem 2.2rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.88);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .portal-login__note {
          margin: 0.3rem 0 0 0;
          font-size: 0.78rem;
          color: rgba(226, 232, 255, 0.55);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .portal-login__note span {
          color: rgba(0, 209, 255, 0.85);
        }

        .portal-login__brief {
          display: grid;
          gap: 1rem;
          padding: 1.4rem 1.6rem;
          border-radius: 20px;
          background: rgba(12, 16, 32, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .portal-login__brief h4 {
          margin: 0;
          font-size: 0.9rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.78);
        }

        .portal-login__brief ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.9rem;
        }

        .portal-login__brief li {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.9rem;
          align-items: start;
        }

        .portal-login__brief-icon {
          width: 38px;
          height: 38px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.8);
          box-shadow: inset 0 0 16px rgba(255, 255, 255, 0.18);
        }

        .portal-login__brief strong {
          display: block;
          font-size: 0.84rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.84);
          margin-bottom: 0.2rem;
        }

        .portal-login__brief p {
          margin: 0;
          font-size: 0.78rem;
          color: rgba(226, 232, 255, 0.6);
          line-height: 1.5;
        }

        .portal-energy {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0%, transparent 60%);
          mix-blend-mode: screen;
          filter: blur(12px);
          animation: energy-burst 1s cubic-bezier(${motionEase.join(',')}) forwards;
        }

        .portal-streaks {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .portal-streaks__line {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40vw;
          height: 2px;
          transform-origin: 0% 50%;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 65%, rgba(255, 255, 255, 0) 100%);
          filter: drop-shadow(0 0 35px rgba(255, 255, 255, 0.7));
          transform: rotate(var(--angle)) translateY(-50%);
        }

        @keyframes swirl {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1.05);
          }
        }

        @keyframes energy-burst {
          0% {
            opacity: 0;
            transform: scale(0.4);
            filter: blur(20px);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            filter: blur(35px);
          }
          100% {
            opacity: 0;
            transform: scale(2.5);
            filter: blur(40px);
          }
        }

        .reduce-motion .portal-card,
        .reduce-motion .portal-streaks__line,
        .reduce-motion .portal-energy {
          transition: none !important;
          animation: none !important;
        }

        .reduce-motion .portal-card__icon,
        .reduce-motion .portal-card__feature,
        .reduce-motion .portal-card__cta button {
          transition: none !important;
        }

        .reduce-motion .portal-background::before,
        .reduce-motion .portal-background::after {
          animation: none;
        }

        .reduce-motion .portal-card-wrapper,
        .reduce-motion .portal-footer-nav,
        .reduce-motion .portal-info-card,
        .reduce-motion .portal-support-card,
        .reduce-motion .portal-insight-panel {
          transition: none !important;
          transform: none !important;
        }

        .reduce-motion .portal-modal,
        .reduce-motion .portal-modal__backdrop,
        .reduce-motion .portal-login,
        .reduce-motion .portal-login__backdrop {
          transition: none !important;
          animation: none !important;
        }

        @media (max-width: 768px) {
          .portal-info-cluster {
            position: static;
            margin: 0 auto;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 90vw;
          }

          .portal-footer-nav {
            grid-template-columns: 1fr;
            gap: 0.9rem;
            padding: 1rem 1.6rem;
          }

          .portal-footer-nav__copy {
            text-align: center;
          }

          .portal-news-panel {
            position: static;
            width: 100%;
            max-width: 90vw;
            margin: 1.2rem auto 0 auto;
          }

          .portal-login__body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
