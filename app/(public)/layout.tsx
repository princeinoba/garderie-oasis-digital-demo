import type { ReactNode } from "react";

import { LanguageProvider } from "@/components/i18n/language-provider";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

export default function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <LanguageProvider>
      <a className="skip-link" href="#main-content">
        Skip to main content / Aller au contenu
      </a>
      <div className="demo-ribbon">
        <span>Independent portfolio demonstration</span>
        <span aria-hidden="true">&bull;</span>
        <span>{"D\u00e9monstration de portfolio ind\u00e9pendante"}</span>
      </div>
      <SiteHeader />
      {children}
      <SiteFooter />
    </LanguageProvider>
  );
}
