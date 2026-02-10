import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { educationQueries } from "../../../api/queries";
import { EmptyState } from "../../../components/ui/States";

// EFF Icon
const EffIcon = (className) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const EffList = ({ formationId }) => {
    const { data: effs } = useSuspenseQuery(educationQueries.effs(formationId));

    const handleDownload = (e, eff) => {
        window.open(eff.link, '_blank');
    };

    if (effs.length === 0) {
        return (
            <EmptyState
                icon="doc"
                title="Aucun Examen EFF Trouvé"
                description="Les examens de fin de formation seront disponibles une fois publiés."
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
            {effs.map((eff, index) => (
                <a
                    key={eff.id || index}
                    href={eff.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-5 animate-slide-up block"
                    style={{ animationDelay: `${index * 0.05}s` }}
                >
                    {/* Left Side: Icon & Info */}
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition-transform group-hover:scale-105">
                            {EffIcon("w-6 h-6")}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                                {eff.title || eff.name || `EFF ${index + 1}`}
                            </h3>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                <span className="uppercase tracking-wider">PDF</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                <span>Final Exam</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Download Action */}
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 
                             group-hover:bg-rose-600 group-hover:text-white transition-all flex items-center justify-center 
                             flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default EffList;
export { EffIcon };
