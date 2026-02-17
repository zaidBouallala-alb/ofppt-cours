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
                title={`Formations - Année ${yearId} | OFPPT Cours`}
                description={`Découvrez les filières de l'année ${yearId}. Accédez aux cours, modules et examens pour le Développement Digital, Infrastructure, et plus.`}
                keywords={`formations année ${yearId}, ofppt, dev, infra, gestion, cours`}
            />
            <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans transition-colors duration-200">
                <ThemeToggle />

                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent pointer-events-none" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />

                {/* Main Container */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* Header */}
                    <div className="mb-16 md:text-center max-w-3xl mx-auto animate-fade-in">
                        <button
                            onClick={() => navigate('/levels')}
                            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-accent)] transition-colors px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Retour aux Niveaux
                        </button>

                        <div className="space-y-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 backdrop-blur-md">
                                Année {yearId}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                                Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Filière</span>
                            </h1>
                            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed text-balance">
                                Explorez nos programmes de formation spécialisés. Accédez aux ressources pédagogiques, modules et examens pour réussir votre parcours.
                            </p>
                        </div>
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
