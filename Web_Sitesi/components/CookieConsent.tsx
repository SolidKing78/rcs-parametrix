'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShowConsent(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-background-secondary/95 backdrop-blur-md border-t border-white/10 p-6 z-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/90 text-sm md:text-base flex-1">
                Bu web sitesi deneyiminizi geliştirmek için çerezler kullanır. Devam ederek çerez kullanımını kabul etmiş olursunuz.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Kabul Et
                </button>
                <button
                  onClick={declineCookies}
                  className="px-6 py-2 bg-transparent border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  Reddet
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

