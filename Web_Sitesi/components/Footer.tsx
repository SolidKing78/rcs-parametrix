'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background-secondary/95 backdrop-blur-md border-t border-white/10 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">RCS Teknoloji</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Yeniliğin sınırlarını zorlayan teknoloji çözümleri geliştiren, AR-GE odaklı teknoloji şirketi.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-white/70 hover:text-white text-sm transition-colors">Hakkımızda</Link></li>
              <li><Link href="#products" className="text-white/70 hover:text-white text-sm transition-colors">Ürünler</Link></li>
              <li><Link href="#pricing" className="text-white/70 hover:text-white text-sm transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="#contact" className="text-white/70 hover:text-white text-sm transition-colors">İletişim</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Ürünler</h4>
            <ul className="space-y-2">
              <li><Link href="#products" className="text-white/70 hover:text-white text-sm transition-colors">ParametriX Standart</Link></li>
              <li><Link href="#products" className="text-white/70 hover:text-white text-sm transition-colors">ParametriX Pro</Link></li>
              <li><Link href="#products" className="text-white/70 hover:text-white text-sm transition-colors">ParametriX Premium</Link></li>
              <li><Link href="#parametrix-ai" className="text-white/70 hover:text-white text-sm transition-colors">ParametriX AI</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">İletişim</h4>
            <p className="text-white/70 text-sm mb-2">
              Teknopark İstanbul<br />
              İstanbul, Türkiye
            </p>
            <p className="text-white/70 text-sm">info@rcsteknoloji.com</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2025 RCS Teknoloji. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 items-center">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              Kullanım Şartları
            </Link>
            <Link href="#contact" className="text-white/60 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

