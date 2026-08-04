'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { Send, CheckCircle } from 'lucide-react';

export function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="relative rounded-3xl overflow-hidden border border-border gold-glow">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-noir-card to-noir-card" />
          <div className="absolute inset-0">
            <div className="absolute top-0 start-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 end-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 py-16 lg:py-20 px-6 lg:px-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-text mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              {t('newsletter.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  required
                  className="flex-1 bg-noir border border-border rounded-full px-6 py-3.5 text-foreground placeholder-muted-foreground outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  className="gold-btn px-8 py-3.5 rounded-full text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={18} />
                      OK
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('newsletter.subscribe')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}