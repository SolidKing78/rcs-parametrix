import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları - RCS Teknoloji",
  description: "RCS Teknoloji web sitesi kullanım şartları ve koşulları",
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <section className="py-24 pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Kullanım Şartları</h1>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 space-y-6 text-white/80">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Genel Koşullar</h2>
              <p className="leading-relaxed">
                RCS Teknoloji web sitesini kullanarak, aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. 
                Bu şartları kabul etmiyorsanız, lütfen web sitemizi kullanmayın.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Hizmetlerin Kullanımı</h2>
              <p className="leading-relaxed mb-2">
                Web sitemiz aracılığıyla sunulan hizmetler:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Yalnızca yasal amaçlarla kullanılabilir</li>
                <li>Başkalarının haklarını ihlal edemez</li>
                <li>Zararlı yazılım veya kod içeremez</li>
                <li>Spam veya istenmeyen içerik gönderemez</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Fikri Mülkiyet</h2>
              <p className="leading-relaxed">
                Web sitemizdeki tüm içerik, tasarım, logo ve markalar RCS Teknoloji'nin mülkiyetindedir. 
                İzinsiz kopyalama, dağıtma veya kullanım yasaktır.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Sorumluluk Reddi</h2>
              <p className="leading-relaxed">
                Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır. RCS Teknoloji, web sitesindeki 
                bilgilerin doğruluğu, güncelliği veya eksiksizliği konusunda garanti vermez.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Üçüncü Taraf Linkler</h2>
              <p className="leading-relaxed">
                Web sitemizde üçüncü taraf web sitelerine linkler bulunabilir. Bu linklerin içeriğinden 
                RCS Teknoloji sorumlu değildir.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Hizmet Değişiklikleri</h2>
              <p className="leading-relaxed">
                RCS Teknoloji, herhangi bir bildirimde bulunmaksızın web sitesi içeriğini, hizmetlerini 
                veya kullanım şartlarını değiştirme hakkını saklı tutar.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">7. İptal ve İade</h2>
              <p className="leading-relaxed">
                Satın alınan hizmetlerle ilgili iptal ve iade koşulları, ilgili hizmet sözleşmesinde belirtilmiştir.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Uygulanacak Hukuk</h2>
              <p className="leading-relaxed">
                Bu kullanım şartları Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir uyuşmazlık durumunda 
                İstanbul mahkemeleri yetkilidir.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">9. İletişim</h2>
              <p className="leading-relaxed">
                Kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                <br />
                <strong className="text-white">E-posta:</strong> info@rcsteknoloji.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Değişiklikler</h2>
              <p className="leading-relaxed">
                Bu kullanım şartlarını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlandığında yürürlüğe girer.
                <br />
                <strong className="text-white">Son Güncelleme:</strong> Ocak 2025
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}





