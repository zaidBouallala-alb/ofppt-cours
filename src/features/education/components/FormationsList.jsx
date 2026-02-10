import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { educationQueries } from "../../../api/queries";
import { EmptyState } from "../../../components/ui/States";

// Helper for meta (inline if not imported, preserving logic from previous view)
const getFormationMeta = (name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes('dev') || lower.includes('full')) return { label: 'DEV', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' };
    if (lower.includes('infra') || lower.includes('sys')) return { label: 'INFRA', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' };
    if (lower.includes('gestion') || lower.includes('commerce')) return { label: 'GESTION', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' };
    return { label: 'FORMATION', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };
};

const FormationsList = ({ yearId }) => {
    const navigate = useNavigate();
    const { data: formations } = useSuspenseQuery(educationQueries.formations(yearId));

    if (formations.length === 0) {
        return (
            <EmptyState
                icon="folder"
                title="Aucune formation trouvée"
                description="Nous travaillons à l'ajout de contenu pour cette année."
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation) => {
                const meta = getFormationMeta(formation.name);
                return (
                    <div
                        key={formation.id}
                        className="card-interactive relative group"
                    >
                        {/* Main Link Overlay */}
                        <Link
                            to={`/modules/${formation.id}`}
                            state={{ formation }}
                            className="absolute inset-0 z-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
                            aria-label={`View modules for ${formation.name}`}
                        />

                        <div className="relative z-10 pointer-events-none">
                            {/* 1. Badge */}
                            <div className="mb-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meta.color}`}>
                                    {meta.label}
                                </span>
                            </div>

                            {/* 2. Title */}
                            <h3 className="heading-md mb-3 line-clamp-1" title={formation.name}>
                                {formation.name || formation.code}
                            </h3>

                            {/* 3. Description */}
                            <p className="text-muted mb-6 line-clamp-2">
                                Accédez à des ressources complètes, y compris des notes de cours et des examens antérieurs pour cette filière.
                            </p>
                        </div>

                        {/* 4. Action Area */}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 relative z-20">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline pointer-events-none">
                                Voir les Modules
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </span>

                            {/* EFF Button - Hidden for 1st and 4th Year */}
                            {yearId !== '1' && yearId !== '4' && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/eff/${formation.id}`, { state: { formation } });
                                    }}
                                    className="text-xs font-semibold px-3 py-1 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200 dark:bg-rose-900 dark:text-rose-100 dark:hover:bg-rose-800 transition-colors pointer-events-auto"
                                >
                                    Examens EFF
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FormationsList;
