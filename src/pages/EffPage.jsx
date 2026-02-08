import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEffs } from "../api/educationService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

// EFF Icon
const EffIcon = (className) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export default function EffPage() {
    const navigate = useNavigate();
    const { formationId } = useParams();
    const [effs, setEffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEffs = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getEffs(formationId);
                setEffs(data || []);
            } catch (err) {
                // Fail silently for EFFs - show empty state instead of error
                console.log('Failed to load EFFs:', err);
                setEffs([]);
                setError(null);
            } finally {
                setLoading(false);
            }
        };
        fetchEffs();
    }, [formationId]);

    const handleDownload = (e, eff) => {
        e.preventDefault();
        e.stopPropagation();

        if (eff.file_url) {
            const link = document.createElement('a');
            link.href = eff.file_url;
            link.download = eff.title || `eff_${eff.id}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="relative min-h-screen w-full transition-colors duration-300">
            <SEO
                title={`EFF - Formation ${formationId}`}
                description={`Access EFF (Examen de Fin de Formation) resources for formation ${formationId}. Download final training exams.`}
                keywords={`ofppt, eff, examen fin formation, formation ${formationId}`}
            />
            <ThemeToggle />

            <div className="page-container flex flex-col min-h-screen">

                {/* Header */}
                <div className="flex flex-col mb-10 w-full animate-slide-up bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start mb-6 btn-secondary text-sm px-4 py-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400">
                            {EffIcon("w-10 h-10")}
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Examen de Fin de Formation
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                                Access and download your final formation exams (EFF).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content List */}
                <div className="flex-1 w-full">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage
                            message={error}
                            onRetry={() => window.location.reload()}
                        />
                    ) : effs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                            {effs.map((eff, index) => (
                                <div
                                    key={eff.id || index}
                                    onClick={(e) => handleDownload(e, eff)}
                                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-5"
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
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-20 p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                            <div className="w-20 h-20 mb-6 rounded-full flex items-center justify-center text-4xl grayscale opacity-30 bg-slate-200 dark:bg-slate-800">
                                {EffIcon("w-10 h-10 text-slate-500")}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                No EFF Exams Yet
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                                Final formation exams will be available here when published.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
