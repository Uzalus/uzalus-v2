'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { type Locale, translations, isRtl } from './i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType>({
  locale: 'fr',
  setLocale: () => {},
  t: (k) => k,
  dir: 'ltr',
});

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('uzalus-locale') as Locale | null;
    if (saved && ['fr', 'en', 'es', 'ar'].includes(saved)) {
      return saved;
    }
  }
  return 'fr';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const mountedRef = useRef(false);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('uzalus-locale', l);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[locale]?.[key] || translations['en']?.[key] || key;
    },
    [locale]
  );

  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [dir, locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
