"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { uiCopy, type Locale, type UiKey } from "@/lib/i18n/content";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: UiKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("oasis-locale");
    if (saved === "en" || saved === "fr") {
      queueMicrotask(() => setLocaleState(saved));
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem("oasis-locale", nextLocale);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: UiKey) => uiCopy[locale][key],
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
