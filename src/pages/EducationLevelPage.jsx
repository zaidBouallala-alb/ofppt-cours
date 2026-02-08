import React from "react";
import { useNavigate } from "react-router-dom";
import { useYears } from "../hooks/useYears";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

export default function EducationLevelPage() {
  const navigate = useNavigate();
  const { years, loading, error } = useYears();

  // Smart metadata for years
  const getYearMetadata = (yearName, index) => {
    const name = (yearName || "").toLowerCase();

    if (name.includes("1") || name.includes("premier")) {
      return {
        subtitle: "Début du parcours",
        colorClass: "text-blue-600 dark:text-blue-400"
      };
    } else if (name.includes("2") || name.includes("deux")) {
      return {
        subtitle: "Orientation Professionnelle",
        colorClass: "text-violet-600 dark:text-violet-400"
      };
    } else if (name.includes("3") || name.includes("trois") || name.includes("licence")) {
      return {
        subtitle: "Maîtrise & Expertise",
        colorClass: "text-amber-600 dark:text-amber-400"
      };
    }

    // Default fallback
    return {
      subtitle: "Année Académique",
      colorClass: "text-slate-600 dark:text-slate-400"
    };
  };

  return (
    <div className="relative min-h-screen w-full transition-colors duration-200 bg-[var(--bg-page)] text-[var(--text-primary)] font-sans">
      <SEO
        title="Niveaux d'Éducation"
        description="Sélectionnez votre niveau d'études pour parcourir les formations et les cours."
        keywords="ofppt, niveaux éducation, formations, cours"
      />
      <ThemeToggle />

      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">

        {/* Header Section */}
        <header className="flex flex-col items-center mb-10 text-center max-w-lg mx-auto animate-fade-in">
          <div className="w-16 h-16 mb-6 p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border-card)] shadow-sm">
            <img src="/logo.png" alt="OFPPT Logo" width="64" height="64" className="w-full h-full object-contain" />
          </div>

          <h1 className="heading-xl mb-3 tracking-tight">
            Sélectionner un Niveau
          </h1>
          <p className="text-body text-lg text-[var(--text-muted)]">
            Choisissez votre année de formation pour continuer.
          </p>
        </header>

        {/* Cards Container - Centered, Single Column, Max Width 640px */}
        <main className="w-full max-w-[640px] flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="w-full">
              <ErrorMessage message={error} onRetry={() => window.location.reload()} />
            </div>
          ) : (
            years.map((year, index) => {
              const meta = getYearMetadata(year.name, index);
              return (
                <div
                  key={year.id}
                  onClick={() => navigate(`/formations/${year.id}`)}
                  className="group relative flex items-center justify-between p-6 rounded-lg 
                             bg-[var(--bg-card)] border border-[var(--border-card)] 
                             hover:border-[var(--color-accent)] cursor-pointer 
                             shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-200 
                             animate-slide-up hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Content */}
                  <div className="flex flex-col items-start gap-1">
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${meta.colorClass}`}>
                      {meta.subtitle}
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {year.name}
                    </h3>
                  </div>

                  {/* Simple Action Icon */}
                  <div className="text-[var(--text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })
          )}
        </main>

        {/* Simple Footer/Context (Optional, kept minimal as requested) */}
        <footer className="mt-16 text-center max-w-md mx-auto">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest opacity-60">
            Plateforme Officielle d'Apprentissage
          </p>
        </footer>

      </div>
    </div>
  );
}
