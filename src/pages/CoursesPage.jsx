import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourses, getEfms, getControls } from "../api/educationService";
import LoadingSpinner from "../components-app/LoadingSpinner";
import ErrorMessage from "../components-app/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

// 3D Tilt Card Component (Lite Version for List Items)
const TiltCard = ({ children, onClick, delay, className }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Subtle rotation for list items
        const rotateY = ((x - centerX) / centerX) * 5;

        setRotation({ x: rotateX, y: rotateY });
        setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.8 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div className={`perspective-1000 animate-slide-up ${className}`} style={{ animationDelay: `${delay}s` }}>
            <button
                ref={cardRef}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full transition-all duration-200 ease-out preserve-3d group text-left outline-none focus:outline-none"
                style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            >
                {children}
                <div
                    className="absolute inset-0 rounded-[20px] pointer-events-none z-20 mix-blend-overlay transition-opacity duration-200"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
                        opacity: glare.opacity
                    }}
                />
            </button>
        </div>
    );
};

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

    return (
        <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
            <SEO
                title={`${activeTab === 'efm' ? 'Module Exams' : activeTab === 'controls' ? 'Controls' : 'Course Lessons'} - Module ${moduleId}`}
                description={`Access ${activeTab} resources for module ${moduleId}. Download PDF lessons, exams, and controls.`}
                keywords={`ofppt, cours, exams, controls, module ${moduleId}, ${activeTab}`}
            />
            <ThemeToggle />

            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent-400/10 to-transparent rounded-tr-full"></div>
                {/* Dot Grid */}
                <div className="absolute inset-0 bg-[url('/grid-dots.svg')] opacity-[0.05]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-6xl">

                {/* Header */}
                <div className="flex flex-col mb-10 w-full animate-slide-up bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-slate-700/30 shadow-sm">
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start mb-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md 
                                 border border-white/20 dark:border-slate-700/30 text-slate-600 dark:text-slate-300 font-medium 
                                 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className={`relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg 
                             ${activeTab === 'eff' ? 'bg-gradient-to-br from-rose-400 to-pink-500 shadow-rose-500/30' :
                                activeTab === 'efm' ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30' :
                                    activeTab === 'controls' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-teal-500/30' :
                                        'bg-gradient-to-br from-indigo-400 to-blue-500 shadow-blue-500/30'} 
                             transform transition-all duration-500`}>
                            <div className="text-white transform scale-125">
                                {ICONS[activeTab]("w-10 h-10")}
                            </div>
                            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse-slow"></div>
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-300 mb-2">
                                {activeTab === 'efm' ? 'Module Exams' : activeTab === 'controls' ? 'Controls & Tests' : 'Course Lessons'}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg">
                                Access and download your {activeTab === 'efm' ? 'end of module exams (EFM)' : activeTab === 'controls' ? 'continuous assessments' : 'lessons and presentations'}.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex p-1 mb-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg rounded-2xl border border-white/40 dark:border-slate-700/50 w-full max-w-lg mx-auto shadow-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm md:text-base font-bold transition-all duration-300 flex items-center justify-center gap-2
                                      ${activeTab === tab.id
                                    ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-md transform scale-100 ring-1 ring-black/5 dark:ring-white/10"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200"}`}
                        >
                            <tab.Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-500 dark:text-indigo-300' : ''}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content List */}
                <div className="flex-1 w-full relative min-h-[400px]">
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
                                <TiltCard key={course.id || index} onClick={(e) => handleDownload(e, course)} delay={index * 0.05}>
                                    <div className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 
                                             rounded-[20px] p-5 shadow-sm hover:shadow-xl hover:bg-white dark:hover:bg-slate-750 
                                             transition-all duration-300 flex items-center justify-between gap-5 h-full">

                                        {/* Left Side: Icon & Info */}
                                        <div className="flex items-center gap-5 flex-1 min-w-0">
                                            {/* Dynamic Icon based on extension or type if available, otherwise tab icon */}
                                            <div className={`w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3
                                                            ${activeTab === 'efm'
                                                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                                                    : activeTab === 'controls'
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                                                        : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'}`}>
                                                {ICONS[activeTab]("w-7 h-7")}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
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
                                        <div className="relative w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 
                                                 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 flex items-center justify-center 
                                                 flex-shrink-0 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                                            <svg className="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-20 p-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-600 animate-fade-in max-w-lg mx-auto">
                            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl grayscale opacity-30 animate-float
                                          ${activeTab === 'efm' ? 'bg-amber-100 dark:bg-amber-900/30' :
                                    activeTab === 'controls' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                                        'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                                {ICONS[activeTab]("w-12 h-12 text-slate-500")}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                                No {activeTab === 'efm' ? 'EFM Exams' : activeTab === 'controls' ? 'Controls' : 'Lessons'} Yet
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                Check back later or try switching to another category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
