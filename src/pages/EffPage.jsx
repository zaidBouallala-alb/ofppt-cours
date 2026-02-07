import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEffs } from "../api/educationService";
import LoadingSpinner from "../components-app/LoadingSpinner";
import ErrorMessage from "../components-app/ErrorMessage";
import ThemeToggle from "../components/ThemeToggle";
import SEO from "../components/SEO";

// 3D Tilt Card Component
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

        const rotateX = ((y - centerY) / centerY) * -5;
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
        <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
            <SEO
                title={`EFF - Formation ${formationId}`}
                description={`Access EFF (Examen de Fin de Formation) resources for formation ${formationId}. Download final training exams.`}
                keywords={`ofppt, eff, examen fin formation, formation ${formationId}`}
            />
            <ThemeToggle />

            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-rose-400/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-400/10 to-transparent rounded-tr-full"></div>
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
                        <div className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg 
                             bg-gradient-to-br from-rose-400 to-pink-500 shadow-rose-500/30 transform transition-all duration-500">
                            <div className="text-white transform scale-125">
                                {EffIcon("w-10 h-10")}
                            </div>
                            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse-slow"></div>
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-rose-600 dark:from-white dark:to-rose-300 mb-2">
                                Examen de Fin de Formation
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg">
                                Access and download your final formation exams (EFF).
                            </p>
                        </div>
                    </div>
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
                    ) : effs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                            {effs.map((eff, index) => (
                                <TiltCard key={eff.id || index} onClick={(e) => handleDownload(e, eff)} delay={index * 0.05}>
                                    <div className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 
                                             rounded-[20px] p-5 shadow-sm hover:shadow-xl hover:bg-white dark:hover:bg-slate-750 
                                             transition-all duration-300 flex items-center justify-between gap-5 h-full">

                                        {/* Left Side: Icon & Info */}
                                        <div className="flex items-center gap-5 flex-1 min-w-0">
                                            <div className="w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3
                                                            bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                                                {EffIcon("w-7 h-7")}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 leading-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
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
                                        <div className="relative w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 
                                                 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 flex items-center justify-center 
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
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl grayscale opacity-30 animate-float
                                          bg-rose-100 dark:bg-rose-900/30">
                                {EffIcon("w-12 h-12 text-slate-500")}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                                No EFF Exams Yet
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                                Final formation exams will be available here when published.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
