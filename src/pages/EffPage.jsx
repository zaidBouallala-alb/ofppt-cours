import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";
import SEO from "../components/common/SEO";
import { SkeletonGrid } from "../components/ui/skeletons";
import EffList from "../features/education/components/EffList";

export default function EffPage() {
    const navigate = useNavigate();
    const { formationId } = useParams();

    return (
        <div className="relative min-h-screen w-full bg-[var(--bg-page)] text-[var(--text-primary)] font-sans transition-colors duration-200">
            <SEO
                title={`Examens de Fin de Formation (EFF) - ${formationId}`}
                description="Téléchargez les examens de fin de formation (EFF) et pratiquez pour vos épreuves finales."
                keywords="eff, examens, formation, ofppt, pdf"
            />
            <ThemeToggle />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-10 animate-fade-in">
                    <button
                        onClick={() => navigate(-1)} // Go back to formation modules or direct formation page? usually modules.
                        className="mb-6 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-accent)] flex items-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wider uppercase">
                            Epreuve Finale
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
                        Examens de Fin de Formation
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Préparez-vous efficacement avec les archives des examens nationaux.
                    </p>
                </div>

                {/* Content List with Suspense */}
                <div className="flex-1 w-full">
                    <Suspense fallback={<SkeletonGrid count={4} />}>
                        <EffList formationId={formationId} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

