'use client';

import { motion } from 'framer-motion';

const aiFeatures = [
  {
    icon: 'fas fa-cube',
    title: 'Smart 2D ➝ 3D',
    badge: 'Beta',
    features: [
      'Teknik resimleri analiz eder, yorumlar ve hatasız bir şekilde 3D modellere dönüştürür',
      'Karmaşık çizimleri milisaniyeler içinde işler, yeniden modellemeye gerek bırakmaz',
      'Zaman tasarrufu sağlar, insan hatalarını minimize eder',
    ],
    highlight: '💡 Kağıt üzerindeki bir çizim bile anında üretime hazır 3D dataya dönüşür.',
  },
  {
    icon: 'fas fa-brain',
    title: 'Akıllı Asistan',
    badge: 'Beta',
    features: [
      'Çizilen parçaları otomatik olarak sınıflandırır',
      'En uygun üretim yöntemlerini kullanıcıya bildirir',
      'Üretim maliyetlerini tahmin ederek projelerinizi daha verimli planlamanızı sağlar',
      'Her seferinde daha akıllı ve doğru tahminler yapar',
    ],
    highlight: '💡 Maliyet sürprizlerine son! ParametriX AI her zaman yanınızda.',
  },
  {
    icon: 'fas fa-comments',
    title: 'Akıllı Tasarım Partneri',
    badge: 'Yakında',
    comingSoon: true,
    features: [
      'Tasarım sırasında sohbet tabanlı yapay zeka desteği ile sorularınızı yanıtlar',
      'İhtiyacınıza uygun parçaları önerir, analiz eder ve anında oluşturur',
      'Çalışmalarınızı öğrenerek kişisel tasarım partneriniz haline gelir',
    ],
    highlight: '💡 Sadece bir yazılım değil, gerçek bir “tasarım dostu”.',
  },
];

const advantages = [
  {
    icon: '⏱️',
    title: "%80'e kadar zaman tasarrufu",
    description: 'Çizimden üretime giden yolu kısaltır',
  },
  {
    icon: '💰',
    title: '%50 daha düşük maliyet',
    description: 'Hataları azaltır, en uygun üretim yöntemini seçer',
  },
  {
    icon: '🤖',
    title: 'Tam otomasyon',
    description: 'İnsan müdahalesine gerek kalmadan birçok işlemi yapar',
  },
  {
    icon: '🧠',
    title: 'Öğrenen yapay zeka',
    description: 'Her kullanımda daha akıllı hale gelir',
  },
];

const targetAudience = [
  {
    icon: 'fas fa-rocket',
    title: 'Mühendisler',
    description: 'Tasarım süreçlerini hızlandırmak ve inovasyonu öne çıkarmak için',
  },
  {
    icon: 'fas fa-industry',
    title: 'Üreticiler',
    description: 'Maliyetleri azaltıp, hataları minimize etmek isteyen üretim ekipleri',
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Öğrenciler',
    description: 'Eğitim projelerinde hızlı ve etkili çözümler arayan geleceğin mühendisleri',
  },
  {
    icon: 'fas fa-flask',
    title: 'AR-GE Merkezleri',
    description: 'İnovasyonu destekleyen yapay zeka partnerine ihtiyaç duyan ekipler',
  },
];

export default function ParametriXAI() {
  return (
    <section
      id="parametrix-ai"
      className="py-24 bg-gradient-to-b from-background to-background-secondary relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),_transparent_55%)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/10 text-xs uppercase tracking-[0.35em] text-white/70 mb-5">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            Vizyon Projemiz
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            <span className="gradient-text hero-animated-gradient">
              Parametri<span className="hero-letter-accent">X</span> AI
            </span>{' '}
            ile Tasarımın Geleceğini Yazıyoruz
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
            Akıllı otomasyon, üretim zekâsı ve kişiselleştirilmiş mühendislik desteğini tek bir
            ekosistemde buluşturarak, CAD süreçlerini yepyeni bir seviyeye taşıyoruz.
          </p>
          <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
            Parametri<span className="hero-letter-accent">X</span> AI, 2D çizimlerden 3D modellere dönüşüm, parça
            sınıflandırma, üretim önerileri ve tasarım sırasında gerçek zamanlı akıllı sohbet desteğiyle
            mühendislik ekiplerine güç katıyor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.08,
                y: -12,
                transition: { type: 'spring', stiffness: 360, damping: 24, mass: 0.4 },
              }}
              className={`group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col gap-5 hover:border-primary/40 hover:shadow-[0_18px_45px_rgba(37,99,235,0.25)] hover:z-20 ${
                feature.comingSoon ? 'border-secondary/40' : ''
              }`}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),_transparent_70%)]" />
              <div className="relative flex items-center gap-3 mb-2">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 ${
                    feature.comingSoon
                      ? 'bg-gradient-to-br from-secondary to-primary'
                      : 'bg-gradient-to-br from-primary to-secondary'
                  }`}
                >
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    {feature.title}
                    <span
                      className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider ${
                        feature.badge === 'Beta'
                          ? 'bg-white/15 border border-white/20 text-white/80'
                          : 'bg-secondary text-white'
                      }`}
                    >
                      {feature.badge}
                    </span>
                  </h3>
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
                </div>
              </div>
              <ul className="relative space-y-2 text-sm text-white/80 leading-relaxed flex-1">
                {feature.features.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="relative bg-primary/20 border border-primary/30 rounded-xl p-4 text-white/90 text-sm italic shadow-inner shadow-primary/20">
                {feature.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_24px_60px_rgba(15,23,42,0.45)] overflow-hidden"
          >
            <span className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-3">
                Parametri<span className="hero-letter-accent">X</span> AI'nin Sunduğu Avantajlar
              </h3>
              <p className="text-white/70 max-w-xl">
                Yapay zekanın gücüyle mühendislik süreçlerinizi hızlandırın, maliyetleri düşürün ve
                üretimde fark yaratın.
              </p>
              <div className="grid sm:grid-cols-2 gap-5 mt-8">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={advantage.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    whileHover={{
                      y: -6,
                      scale: 1.03,
                      transition: { type: 'spring', stiffness: 320, damping: 22, mass: 0.35 },
                    }}
                    className="relative bg-white/8 border border-white/15 rounded-2xl p-5 shadow-inner shadow-primary/10 transition-all duration-300"
                  >
                    <span className="text-3xl mb-3 block">{advantage.icon}</span>
                    <h4 className="text-lg font-semibold text-white mb-2">{advantage.title}</h4>
                    <p className="text-white/70 text-sm">{advantage.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">Kimler İçin?</h3>
              <p className="text-white/70">
                ParametriX AI, tasarım ve üretim ekiplerinin yanı sıra öğrenme ve keşif yolculuğundaki
                herkes için tasarlandı.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {targetAudience.map((audience, index) => (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                  whileHover={{
                    scale: 1.04,
                    y: -4,
                    transition: { type: 'spring', stiffness: 320, damping: 24, mass: 0.38 },
                  }}
                  className="bg-white/8 border border-white/10 rounded-2xl p-4 text-left transition-all duration-300 hover:border-primary/40"
                >
                  <i className={`${audience.icon} text-2xl text-primary mb-3 block`}></i>
                  <h4 className="text-lg font-semibold text-white mb-1">{audience.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{audience.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/15 border border-primary/25 rounded-3xl p-10 shadow-[0_20px_50px_rgba(15,23,42,0.45)]"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            “Daha Akıllı, Daha Hızlı, Daha Ulaşılabilir Tasarım.”
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            ParametriX AI, tasarım ve üretim kültürünüzü dönüştürmek üzere geliştirilen vizyon
            projemizdir. Geleceğin mühendislik standartlarına bugünden ulaşmak için bizimle bu
            yolculuğa katılın.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

