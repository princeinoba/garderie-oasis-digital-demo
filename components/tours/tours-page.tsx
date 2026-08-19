"use client";

import { ExternalLink, Landmark, Leaf } from "lucide-react";

import { useLanguage } from "@/components/i18n/language-provider";
import { TourForm } from "@/components/tours/tour-form";

export function ToursPageContent() {
  const { locale } = useLanguage();
  return (
    <main className="tours-main" id="main-content">
      <section className="tours-hero page-width">
        <div>
          <p className="eyebrow">
            {locale === "en"
              ? "Visit — Discover — Take the next step"
              : "Visiter — Découvrir — Faire le prochain pas"}
          </p>
          <h1>{locale === "en" ? "Tours & Registration" : "Visites et inscription"}</h1>
          <p>
            {locale === "en"
              ? "Explore a demonstration tour and find the official Ottawa application path—clearly separated."
              : "Explorez une visite de démonstration et trouvez le parcours officiel d'Ottawa — clairement distinct."}
          </p>
        </div>
        <div className="botanical-cluster" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
      <div className="tour-layout page-width">
        <TourForm />
        <aside className="ottawa-card card">
          <span className="ottawa-icon">
            <Landmark aria-hidden="true" />
          </span>
          <Leaf className="ottawa-leaf" aria-hidden="true" />
          <p className="eyebrow">
            {locale === "en" ? "Official application" : "Demande officielle"}
          </p>
          <h2>
            {locale === "en"
              ? "Apply Through the City of Ottawa"
              : "Présenter une demande à la Ville d'Ottawa"}
          </h2>
          <p>
            {locale === "en"
              ? "The City of Ottawa manages the official Child Care Registry and Waitlist. Families seeking licensed childcare must use the City's process."
              : "La Ville d'Ottawa gère le Registre et la Liste d'attente officiels. Les familles à la recherche d'un service de garde agréé doivent utiliser le processus de la Ville."}
          </p>
          <a
            className="button button-secondary"
            href="https://ottawa.ca/en/family-and-social-services/childrens-services/apply-child-care"
            target="_blank"
            rel="noreferrer"
          >
            {locale === "en"
              ? "Apply Through the City of Ottawa"
              : "Accéder au processus de la Ville"}
            <ExternalLink aria-hidden="true" />
          </a>
          <div className="notice notice-coral">
            <span>
              {locale === "en"
                ? "This demonstration form does not add your child to the City of Ottawa Child Care Registry and Waitlist."
                : "Ce formulaire de démonstration n'ajoute pas votre enfant au Registre et à la Liste d'attente d'Ottawa."}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
