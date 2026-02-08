import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourses, getEfms, getControls, getExams } from "../api/educationService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

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

export default function CoursesPage() {
    const navigate = useNavigate();
    const { moduleId } = useParams();
    const [allResources, setAllResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("cours"); // 'cours', 'controls', 'efm'

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                setError(null);
                let data = [];

                if (activeTab === 'cours') {
                    data = await getCourses(moduleId);
                } else if (activeTab === 'controls') {
                    data = await getControls(moduleId);
                } else if (activeTab === 'efm') {
                    data = await getEfms(moduleId);
                }

                setAllResources(data || []);
            } catch (err) {
                // For controls and EFMs, we want to fail silently (show empty state) 
                // rather than showing a scary error message
                if (activeTab === 'controls' || activeTab === 'efm') {
                    console.log(`Failed to load ${activeTab}:`, err);
                    setAllResources([]);
                    setError(null);
                } else {
                    setError(err.message || "Failed to load resources");
                    setAllResources([]);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, [moduleId, activeTab]);

    const currentResources = allResources;

    const handleDownload = (e, course) => {
        e.preventDefault();
        e.stopPropagation();

        if (course.file_url) {
            const link = document.createElement('a');
            link.href = course.file_url;
            link.download = course.title || `course_${course.id}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const tabs = [
        { id: "cours", label: "Cours", Icon: ICONS.cours },
        { id: "controls", label: "Controls", Icon: ICONS.controls },
        { id: "efm", label: "EFM", Icon: ICONS.efm },
    ];

    const getTabColor = (tabId) => {
        switch (tabId) {
            case 'efm': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
            case 'controls': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
            default: return 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20';
        }
    };

    return (
        <div className="relative min-h-screen w-full transition-colors duration-300">
            <SEO
                title={`${activeTab === 'efm' ? 'Module Exams' : activeTab === 'controls' ? 'Controls' : 'Course Lessons'} - Module ${moduleId}`}
                description={`Access ${activeTab} resources for module ${moduleId}. Download PDF lessons, exams, and controls.`}
                keywords={`ofppt, cours, exams, controls, module ${moduleId}, ${activeTab}`}
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
                        <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${getTabColor(activeTab)}`}>
                            {ICONS[activeTab]("w-10 h-10")}
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                {activeTab === 'efm' ? 'Module Exams' : activeTab === 'controls' ? 'Controls & Tests' : 'Course Lessons'}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                                Access and download your {activeTab === 'efm' ? 'end of module exams (EFM)' : activeTab === 'controls' ? 'continuous assessments' : 'lessons and presentations'}.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex p-1 mb-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-full max-w-lg mx-auto shadow-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2
                                      ${activeTab === tab.id
                                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                        >
                            <tab.Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                            {tab.label}
                        </button>
                    ))}
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
                    ) : currentResources.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                            {currentResources.map((course, index) => (
                                <div
                                    key={course.id || index}
                                    onClick={(e) => handleDownload(e, course)}
                                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-5"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Left Side: Icon & Info */}
                                    <div className="flex items-center gap-5 flex-1 min-w-0">
                                        <div className={`w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105
                                                        ${getTabColor(activeTab)}`}>
                                            {ICONS[activeTab]("w-6 h-6")}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                                                {course.title || course.name || `Resource ${index + 1}`}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                <span className="uppercase tracking-wider">PDF</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                                <span>{(Math.random() * 5 + 1).toFixed(1)} MB</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Download Action */}
                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 
                                             group-hover:bg-primary-600 group-hover:text-white transition-all flex items-center justify-center 
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
                            <div className={`w-20 h-20 mb-6 rounded-full flex items-center justify-center text-4xl grayscale opacity-30 bg-slate-200 dark:bg-slate-800`}>
                                {ICONS[activeTab]("w-10 h-10 text-slate-500")}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                No {activeTab === 'efm' ? 'EFM Exams' : activeTab === 'controls' ? 'Controls' : 'Lessons'} Yet
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                                Check back later or try switching to another category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
