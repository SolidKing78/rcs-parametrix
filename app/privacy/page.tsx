import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - RCS Teknoloji",
  description: "RCS Teknoloji gizlilik politikası ve kişisel verilerin korunması",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <section className="py-24 pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Gizlilik Politikası</h1>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 space-y-6 text-white/80">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Genel Bilgiler</h2>
              <p className="leading-relaxed">
                RCS Teknoloji olarak, kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu gizlilik politikası, 
                web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda toplanan bilgilerin nasıl işlendiğini açıklar.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Toplanan Bilgiler</h2>
              <p className="leading-relaxed mb-2">
                Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>İletişim formu aracılığıyla sağladığınız ad, e-posta adresi ve şirket bilgileri</li>
                <li>Web sitesi kullanım verileri (IP adresi, tarayıcı türü, ziyaret edilen sayfalar)</li>
                <li>Çerezler (cookies) aracılığıyla toplanan bilgiler</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Bilgilerin Kullanımı</h2>
              <p className="leading-relaxed mb-2">
                Toplanan bilgiler aşağıdaki amaçlarla kullanılır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                <li>Müşteri desteği sağlamak</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Web sitesi deneyimini iyileştirmek</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Veri Güvenliği</h2>
              <p className="leading-relaxed">
                Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri kullanıyoruz. 
                Ancak, internet üzerinden veri aktarımının %100 güvenli olmadığını unutmayın.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Çerezler</h2>
              <p className="leading-relaxed">
                Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Tarayıcı ayarlarınızdan 
                çerezleri yönetebilirsiniz.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Haklarınız</h2>
              <p className="leading-relaxed mb-2">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
                <li>Kişisel verilerinizin silinmesini veya düzeltilmesini isteme</li>
                <li>İşlenen verilerin muhafaza edilmesini talep etme</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">7. İletişim</h2>
              <p className="leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                <br />
                <strong className="text-white">E-posta:</strong> info@rcsteknoloji.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Değişiklikler</h2>
              <p className="leading-relaxed">
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlandığında yürürlüğe girer.
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





