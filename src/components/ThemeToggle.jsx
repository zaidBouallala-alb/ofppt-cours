import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
    // Theme State
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Apply Theme and Background
    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove old bg classes
        root.classList.remove('app-bg-1', 'app-bg-5');
        
        if (isDark) {
            root.classList.add('dark');
            root.classList.add('app-bg-5');
            root.style.setProperty('--bg-image', `url('/backgrounds/bg-5.png')`);
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('app-bg-1');
            root.style.setProperty('--bg-image', `url('/backgrounds/bg-1.png')`);
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">

            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg 
                     hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group relative overflow-hidden"
                aria-label="Toggle Dark Mode"
            >
                <div className="relative w-6 h-6">
                    {/* Sun Icon */}
                    <svg
                        className={`absolute inset-0 w-6 h-6 text-yellow-400 transform transition-all duration-500 ease-spring
                         ${isDark ? 'translate-y-8 rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>

                    {/* Moon Icon */}
                    <svg
                        className={`absolute inset-0 w-6 h-6 text-indigo-300 transform transition-all duration-500 ease-spring
                         ${isDark ? 'translate-y-0 rotate-0 opacity-100' : '-translate-y-8 -rotate-90 opacity-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </div>

                {/* Glow */}
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 
                          ${isDark ? 'bg-indigo-500/30' : 'bg-yellow-400/30'} opacity-0 group-hover:opacity-100`}></div>
            </button>
        </div>
    );
}
