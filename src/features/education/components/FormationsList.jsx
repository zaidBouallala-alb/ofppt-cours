import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { educationQueries } from "../../../api/queries";
import { EmptyState } from "../../../components/ui/States";

// Category Configuration: Icons and Colors
const getCategoryConfig = (name = "") => {
    const lower = name.toLowerCase();

    if (lower.includes('dev') || lower.includes('full') || lower.includes('digital')) {
        return {
            label: 'DEV DIGITAL',
            gradient: 'from-blue-500 to-indigo-600',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-700 dark:text-blue-300',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        };
    }
    if (lower.includes('infra') || lower.includes('sys') || lower.includes('cloud')) {
        return {
            label: 'INFRASTRUCTURE',
            gradient: 'from-cyan-500 to-blue-600',
            bg: 'bg-cyan-50 dark:bg-cyan-900/20',
            text: 'text-cyan-700 dark:text-cyan-300',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            )
        };
    }
    if (lower.includes('gestion') || lower.includes('commerce') || lower.includes('business')) {
        return {
            label: 'GESTION',
            gradient: 'from-emerald-500 to-teal-600',
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
            text: 'text-emerald-700 dark:text-emerald-300',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        };
    }

    // Default
    return {
        label: 'FORMATION',
        gradient: 'from-slate-500 to-slate-600',
        bg: 'bg-slate-50 dark:bg-slate-800/50',
        text: 'text-slate-700 dark:text-slate-300',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    };
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map((formation, index) => {
                const config = getCategoryConfig(formation.name);

                return (
                    <div
                        key={formation.id}
                        className="group relative flex flex-col h-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border-card)] shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Decorative Gradient Bar */}
                        <div className={`h-1.5 w-full bg-gradient-to-r ${config.gradient}`} />

                        <div className="p-7 flex flex-col flex-grow">

                            {/* Header: Icon + Badge */}
                            <div className="flex justify-between items-start mb-5">
                                <div className={`p-3 rounded-xl ${config.bg} ${config.text} ring-1 ring-inset ring-black/5 dark:ring-white/10`}>
                                    {config.icon}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}>
                                    {config.label}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                                {formation.name || formation.code}
                            </h3>

                            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-grow">
                                Accédez à tous les modules, résumés de cours et examens régionaux/nationaux pour cette filière.
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-auto">
                                <Link
                                    to={`/modules/${formation.id}`}
                                    state={{ formation }}
                                    className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all group-hover:shadow-md"
                                >
                                    Voir Modules
                                </Link>

                                {yearId !== '1' && yearId !== '4' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/eff/${formation.id}`, { state: { formation } });
                                        }}
                                        className="inline-flex justify-center items-center px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-semibold text-sm hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                                        title="Examens de Fin de Formation"
                                    >
                                        EFF
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FormationsList;
