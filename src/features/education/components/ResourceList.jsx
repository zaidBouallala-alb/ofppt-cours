import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { educationQueries } from "../../../api/queries";
import { downloadFile } from "../../../api/educationService";
import { EmptyState } from "../../../components/ui/States";
import SearchBar from "../../../components/ui/SearchBar";
import { useSearch } from "../../../hooks/useSearch";

// Smarter Premium Icons
const ICONS = {
    cours: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    controls: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
    ),
    efm: (className) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
    )
};

const ResourceList = ({ moduleId, activeTab }) => {
    const getQueryOptions = (tab) => {
        switch (tab) {
            case 'cours': return educationQueries.courses(moduleId);
            case 'controls': return educationQueries.controls(moduleId);
            case 'efm': return educationQueries.efms(moduleId);
            default: return educationQueries.courses(moduleId);
        }
    };

    const { data: currentResources = [] } = useSuspenseQuery(getQueryOptions(activeTab));

    // Search Integration
    const { searchQuery, setSearchQuery, filteredData: filteredResources } = useSearch(currentResources, ['title', 'name']);

    const handleDownload = (e, resource) => {
        e.preventDefault();
        const url = resource.file_url || resource.link;
        const name = resource.title || resource.name || `telechargement-${activeTab}.pdf`;
        downloadFile(url, name);
    };

    if (currentResources.length === 0) {
        return (
            <EmptyState
                icon="doc"
                title="Aucun contenu disponible"
                description="Les ressources pour cette section seront bientôt ajoutées."
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
                    placeholder="Rechercher une ressource..."
                    className="w-full md:w-80"
                />
            </div>

            {/* Results Grid */}
            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource, index) => (
                        <button
                            key={resource.id}
                            onClick={(e) => handleDownload(e, resource)}
                            className="text-left group relative flex flex-col bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl p-5 hover:border-[var(--color-accent)] hover:-translate-y-1 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md animate-slide-up block w-full"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-[var(--color-accent)]`}>
                                    {ICONS[activeTab]("w-6 h-6")}
                                </div>
                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                                    PDF
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                                {resource.title || resource.name}
                            </h3>

                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                                    {activeTab}
                                </span>
                                <div className="flex items-center text-xs font-bold text-[var(--color-accent)] gap-1">
                                    TELECHARGER
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="search"
                    title="Aucun résultat"
                    description={`Aucune ressource ne correspond à "${searchQuery}".`}
                    action={
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-[var(--color-accent)] font-medium hover:underline"
                        >
                            Effacer la recherche
                        </button>
                    }
                />
            )
            }
        </div>
    );
};

export default ResourceList;
export { ICONS };
