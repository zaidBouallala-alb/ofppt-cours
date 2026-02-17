import React, { Suspense } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";
import SEO from "../components/common/SEO";
import { SkeletonGrid } from "../components/ui/skeletons";
import ModulesList from "../features/education/components/ModulesList";

export default function ModulesPage() {
    const navigate = useNavigate();
    const { formationId } = useParams();
    const location = useLocation();
    const formation = location.state?.formation;

    return (
        <div className="relative min-h-screen w-full transition-colors duration-200 bg-[var(--bg-page)] text-[var(--text-primary)] font-sans">
            <SEO
                title={formation ? `Modules - ${formation.name}` : `Modules - Formation ${formationId}`}
                description={`Explorez les modules de la formation ${formation?.name || formationId}. Accédez aux détails des cours et aux ressources.`}
                keywords={`ofppt, modules, ${formation?.code || ''}, formation ${formationId}, cours, éducation`}
                image="https://ofppt-cours.com/images/modules-cover.jpg"
            />
            <ThemeToggle />

            {/* Main Container - Lightweight Academic Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header - Minimalist */}
                <div className="mb-10 animate-fade-in">
                    <button
                        onClick={() => navigate(`/formations/${formation?.year_id || 1}`)}
                        className="mb-6 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-accent)] flex items-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour aux Filières
                    </button>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] opacity-70">
                            {formation?.code || "Module List"}
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                            {formation?.name || "Modules"}
                        </h1>
                        <p className="text-[var(--text-muted)] max-w-2xl mt-1 text-lg">
                            Sélectionnez un module pour accéder aux cours, résumés et travaux pratiques.
                        </p>
                    </div>
                </div>

                {/* Grid Content with Suspense/Skeleton */}
                <Suspense fallback={<SkeletonGrid count={6} />}>
                    <ModulesList formationId={formationId} />
                </Suspense>
            </div>
        </div>
    );
}

