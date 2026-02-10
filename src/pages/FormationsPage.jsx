import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";
import SEO from "../components/common/SEO";
import { SkeletonGrid } from "../components/ui/skeletons";
import FormationsList from "../features/education/components/FormationsList";

export default function FormationsPage() {
    const navigate = useNavigate();
    const { yearId } = useParams();

    return (
        <>
            <SEO
                title={`Formations - Année ${yearId}`}
                description="Découvrez nos filières de formation. Cliquez pour voir les modules et cours."
                keywords="formations, ofppt, filières, éducation"
            />
            <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans transition-colors duration-200">
                <ThemeToggle />

                {/* Main Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header */}
                    <div className="mb-12 animate-fade-in">
                        <button
                            onClick={() => navigate('/levels')}
                            className="mb-6 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-accent)] flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Retour
                        </button>
                        <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] opacity-70">
                            Année {yearId}
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight mt-2 text-[var(--text-primary)]">
                            Sélectionnez Votre Filière
                        </h1>
                        <p className="mt-4 text-xl text-[var(--text-muted)] max-w-2xl">
                            Choississez une formation pour accéder aux modules, cours et ressources pédagogiques.
                        </p>
                    </div>

                    {/* Content with Suspense */}
                    <Suspense fallback={<SkeletonGrid count={6} />}>
                        <FormationsList yearId={yearId} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
