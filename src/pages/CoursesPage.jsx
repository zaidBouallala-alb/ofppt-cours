import React, { useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";
import SEO from "../components/common/SEO";
import { SkeletonGrid } from "../components/ui/skeletons";
import ResourceList, { ICONS } from "../features/education/components/ResourceList";

export default function CoursesPage() {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const [activeTab, setActiveTab] = useState("cours"); // 'cours', 'controls', 'efm'

    return (
        <div className="relative min-h-screen w-full bg-[var(--bg-page)] text-[var(--text-primary)] font-sans transition-colors duration-200">
            <SEO
                title={`Cours - Module ${moduleId}`}
                description={`Accédez aux cours, contrôles et examens de fin de module pour le module ${moduleId}. Téléchargez les ressources PDF.`}
                keywords={`cours, examens, efm, ofppt, module ${moduleId}, pdf, téléchargement`}
                image="https://ofppt-cours.com/images/courses-cover.jpg"
            />
            <ThemeToggle />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Navigation Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-accent)] flex items-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour aux Modules
                    </button>

                    <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
                        Ressources Pédagogiques
                    </h1>
                    <p className="text-[var(--text-muted)]">
                        Module: <span className="font-semibold text-[var(--color-accent)]">{moduleId}</span>
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl mb-10 w-full max-w-md mx-auto md:mx-0">
                    {['cours', 'controls', 'efm'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab
                                ? "bg-white dark:bg-slate-700 text-[var(--color-accent)] shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                                }`}
                        >
                            {ICONS[tab]("w-4 h-4")}
                            <span className="capitalize">{tab === 'efm' ? 'EFM' : tab}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area with Suspense */}
                <Suspense fallback={<SkeletonGrid count={3} />}>
                    <ResourceList moduleId={moduleId} activeTab={activeTab} />
                </Suspense>
            </div>
        </div>
    );
}
