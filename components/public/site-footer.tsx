"use client";

import Link from "next/link";

import { BrandMark } from "@/components/brand/brand-mark";
import { useLanguage } from "@/components/i18n/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <BrandMark compact />
        <nav aria-label="Footer">
          <Link href="/privacy">{t("privacy")}</Link>
          <Link href="/accessibility">{t("accessibility")}</Link>
          <Link href="/contact">{t("contact")}</Link>
          <Link href="/director">{t("director")}</Link>
        </nav>
      </div>
      <p className="footer-disclaimer">{t("footerNotice")}</p>
    </footer>
  );
}
