import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Pricing from "@/components/sections/Pricing";
import ParametriXAI from "@/components/sections/ParametriXAI";
import Roadmap from "@/components/sections/Roadmap";
import Technology from "@/components/sections/Technology";
import Contact from "@/components/sections/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";
import LoadingProgress from "@/components/LoadingProgress";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <LoadingProgress />
      <Navigation />
      <Hero />
      <About />
      <Products />
      <Pricing />
      <ParametriXAI />
      <Roadmap />
      <Technology />
      <Contact />
      <Footer />
      <BackToTop />
      <CookieConsent />
    </main>
  );
}

