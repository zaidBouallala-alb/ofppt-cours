import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { educationQueries } from "../../../api/queries";
import { EmptyState } from "../../../components/ui/States";
import SearchBar from "../../../components/ui/SearchBar";
import { useSearch } from "../../../hooks/useSearch";
import SearchBar from "../../../components/ui/SearchBar";
import { useSearch } from "../../../hooks/useSearch";

const ModulesList = ({ formationId }) => {
    const navigate = useNavigate();
    const { data: modules } = useSuspenseQuery(educationQueries.modules(formationId));

    // Search Integration
    const { searchQuery, setSearchQuery, filteredData: filteredModules } = useSearch(modules, ['name', 'code']);

    if (modules.length === 0) {
        return (
            <EmptyState
                icon="folder"
                title="Aucun Module Trouvé"
                description="Nous travaillons à l'ajout de contenu pour cette filière."
            />
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Search Input */}
            <div className="flex justify-end animate-fade-in">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Rechercher un module (ex: M104, Gestion...)"
                    className="w-full md:w-80"
                />
            </div>

            {/* Results Grid */}
            {filteredModules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredModules.map((module, index) => (
                        <Link
                            key={module.id}
                            to={`/courses/${module.id}`}
                            className="group relative flex flex-col p-6 rounded-xl 
                             bg-[var(--bg-card)] border border-[var(--border-card)] 
                             hover:border-[var(--color-accent)] cursor-pointer 
                             shadow-[var(--shadow-card)] transition-all duration-200 
                             animate-slide-up hover:-translate-y-1 block"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Card Header: Icon + Code */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-slate-400 dark:text-slate-500 group-hover:text-[var(--color-accent)] transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                                <div className="flex gap-2 mb-4">
                                    {['Cours', 'Résumé', 'TP'].map((tag, i) => (
                                        <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center text-sm font-semibold text-[var(--color-accent)] group-hover:underline underline-offset-4 decoration-2">
                                    Commencer le Module
                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            );
};

            export default ModulesList;
