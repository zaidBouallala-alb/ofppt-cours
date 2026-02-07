import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormations } from "../api/educationService";
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

        const rotateX = ((y - centerY) / centerY) * -8; // Slight rotation
        const rotateY = ((x - centerX) / centerX) * 8;

        setRotation({ x: rotateX, y: rotateY });
        setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
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
                className="relative w-full h-full transition-all duration-200 ease-out preserve-3d group outline-none focus:outline-none"
                style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            >
                {children}
                <div
                    className="absolute inset-0 rounded-[20px] pointer-events-none z-20 mix-blend-overlay transition-opacity duration-200"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`,
                        opacity: glare.opacity
                    }}
                />
            </button>
        </div>
    );
};

// Smart Metadata Logic for Formations
const getFormationStyle = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("dev") || n.includes("full") || n.includes("web") || n.includes("app")) {
        return {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            gradient: "from-cyan-500 to-blue-600",
            glow: "bg-cyan-500/20",
            label: "Sotware Development"
        };
    }
    if (n.includes("sys") || n.includes("res") || n.includes("infra") || n.includes("cloud")) {
        return {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            gradient: "from-violet-500 to-purple-600",
            glow: "bg-violet-500/20",
            label: "Infrastructure & Cloud"
        };
    }
    if (n.includes("des") || n.includes("art") || n.includes("media") || n.includes("ui")) {
        return {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            gradient: "from-pink-500 to-rose-600",
            glow: "bg-pink-500/20",
            label: "Digital Design"
        };
    }
    // Default
    return {
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        gradient: "from-indigo-500 to-blue-600",
        glow: "bg-indigo-500/20",
        label: "Specialization"
    };
};

export default function FormationsPage() {
    const navigate = useNavigate();
    const { yearId } = useParams();
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getFormations(yearId);
                setFormations(data || []);
            } catch (err) {
                setError(err.message || "Failed to load formations");
                setFormations([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFormations();
    }, [yearId]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
            <SEO
                title={`Formations - Year ${yearId}`}
                description={`Select your formation for year ${yearId}.`}
                keywords={`ofppt, formations, year ${yearId}, education`}
            />
            <ThemeToggle />

            {/* Background Decor */}
            {/* Background Blobs (Optional - can be kept or removed if too busy with image) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-float"></div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-5xl">

                {/* Header */}
                <div className="flex flex-col mb-10 w-full animate-slide-up bg-white/30 dark:bg-slate-800/30 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-slate-700/30">
                    <button
                        onClick={() => navigate("/levels")}
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
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-indigo-600 dark:from-white dark:to-indigo-300 mb-2">
                                Select Formation
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Choose your specialized track to proceed
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 w-full relative min-h-[400px]">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorMessage
                            message={error}
                            onRetry={() => window.location.reload()}
                        />
                    ) : formations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
                            {formations.map((formation, index) => {
                                const style = getFormationStyle(formation.name);
                                return (
                                    <TiltCard key={formation.id} onClick={() => navigate(`/modules/${formation.id}`)} delay={index * 0.1}>
                                        <div className="relative overflow-hidden bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-slate-700/60
                                                     rounded-[24px] p-6 shadow-xl h-full flex flex-col items-start gap-4 group">

                                            {/* Top Label */}
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300`}>
                                                {style.label}
                                            </span>

                                            <div className="flex items-start gap-5 w-full">
                                                {/* Icon Box */}
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${style.gradient} 
                                                               transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0`}>
                                                    {style.icon}
                                                </div>

                                                {/* Text Content */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-tight mb-2 line-clamp-2">
                                                        {formation.name || formation.code}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                                        Tap to view modules, courses, and resources for this track.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Bottom Action Area */}
                                            <div className="w-full mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4">
                                                <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400 group-hover:underline">
                                                    View Curriculum
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {/* EFF Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/eff/${formation.id}`);
                                                        }}
                                                        className="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 
                                                                 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/50 
                                                                 transition-all duration-300 hover:scale-105 border border-rose-200 dark:border-rose-800/50"
                                                        title="Examen de Fin de Formation"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                        </svg>
                                                        EFF
                                                    </button>
                                                    {/* Arrow Button */}
                                                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Glow Blob */}
                                            <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${style.glow}`}></div>
                                        </div>
                                    </TiltCard>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center mt-20 p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-600 animate-fade-in">
                            <div className="text-6xl mb-4 opacity-50">📂</div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">No Formations Found</h3>
                            <p className="text-slate-500 dark:text-slate-400">There are no formations available for this year yet.</p>
                        </div>
                    )}
                </div>

                {/* Character */}
                <div className="fixed bottom-0 left-4 w-40 h-40 pointer-events-none z-50 hidden md:block animate-slide-up">
                    <img src="/student.png" alt="Student" className="w-full h-full object-contain transform scale-x-[-1] drop-shadow-2xl" />
                </div>
            </div>
        </div>
    );
}
