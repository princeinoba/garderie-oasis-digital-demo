"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { useLanguage } from "@/components/i18n/language-provider";

const links = [
  { href: "/programs", key: "programs" },
  { href: "/daily-experience", key: "daily" },
  { href: "/meals", key: "meals" },
  { href: "/fees", key: "fees" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
] as const;

export function SiteHeader() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language-button"
            type="button"
            aria-label={t("language")}
            onClick={() => setLocale(locale === "en" ? "fr" : "en")}
          >
            <strong>{locale === "en" ? "EN" : "FR"}</strong>
            <span aria-hidden="true">|</span>
            <span>{locale === "en" ? "FR" : "EN"}</span>
          </button>
          <Link className="button button-primary header-cta" href="/tours-and-registration">
            {t("tour")}
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X aria-hidden="true" size={22} />
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </button>
        </div>
      </div>
      <nav
        className={open ? "mobile-drawer is-open" : "mobile-drawer"}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
            {t(link.key)}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)}>
          {t("contact")}
        </Link>
        <Link
          className="button button-primary"
          href="/tours-and-registration"
          onClick={() => setOpen(false)}
        >
          {t("tour")}
        </Link>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => setLocale(locale === "en" ? "fr" : "en")}
        >
          {t("language")}
        </button>
      </nav>
    </header>
  );
}
