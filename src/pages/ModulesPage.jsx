import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getModules } from "../api/educationService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

export default function ModulesPage() {
    const navigate = useNavigate();
    const { formationId } = useParams();
    const location = useLocation();
    const formation = location.state?.formation;
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getModules(formationId);
                setModules(data || []);
            } catch (err) {
                setError(err.message || "Échec du chargement des modules");
                setModules([]);
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, [formationId]);

    return (
        <div className="relative min-h-screen w-full transition-colors duration-200 bg-[var(--bg-page)] text-[var(--text-primary)] font-sans">
            <SEO
                title={`Modules - Formation ${formationId}`}
                description={`Explorez les modules de la formation ${formationId}. Accédez aux détails des cours et aux ressources.`}
                keywords={`ofppt, modules, formation ${formationId}, cours, éducation`}
            />
            <ThemeToggle />

            {/* Main Container - Lightweight Academic Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header - Minimalist */}
                <div className="mb-10 animate-fade-in">
                    <button
                        onClick={() => navigate(`/formations/${formation?.id_annee || 1}`)}
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

                {/* Grid Content */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <LoadingSpinner />
                    </div>
                ) : error ? (
                    <ErrorMessage
                        message={error}
                        onRetry={() => window.location.reload()}
                    />
                ) : modules.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {modules.map((module, index) => {
                            return (
                                <div
                                    key={module.id}
                                    onClick={() => navigate(`/courses/${module.id}`)}
                                    className="group relative flex flex-col p-6 rounded-xl 
                                             bg-[var(--bg-card)] border border-[var(--border-card)] 
                                             hover:border-[var(--color-accent)] cursor-pointer 
                                             shadow-[var(--shadow-card)] transition-all duration-200 
                                             animate-slide-up hover:-translate-y-1"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Card Header: Icon + Code */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-slate-400 dark:text-slate-500 group-hover:text-[var(--color-accent)] transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                            {module.code}
                                        </span>
                                    </div>

                                    {/* Card Content: Title + Desc */}
                                    <div className="flex-1 mb-6">
                                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                                            {module.name}
                                        </h3>
                                        <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                                            {module.description || "Maîtrisez cette compétence clé pour votre développement professionnel."}
                                        </p>
                                    </div>

                                    {/* Card Footer: Metadata + CTA */}
                                    <div className="mt-auto">
                                        {/* Resource Chips */}
                                        <div className="flex gap-2 mb-4">
                                            {['Cours', 'Résumé', 'TP'].map((tag, i) => (
                                                <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center text-sm font-semibold text-[var(--color-accent)] group-hover:underline underline-offset-4 decoration-2">
                                            Commencer le Module
                                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-2xl border border-dashed border-[var(--border-card)]">
                        <div className="text-4xl mb-4 opacity-50 grayscale">📂</div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Aucun Module Trouvé</h3>
                        <p className="text-[var(--text-muted)]">
                            Nous travaillons à l'ajout de contenu pour cette filière.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
