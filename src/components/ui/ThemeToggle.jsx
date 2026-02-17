import React, { useState, useEffect } from 'react';

/**
 * Theme Toggle
 * Cycles between: Light <-> Dark (No System Mode)
 */
export default function ThemeToggle() {
    // Initialize state
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            // Check stored preference
            const stored = localStorage.getItem('theme');
            if (stored === 'dark' || stored === 'light') {
                return stored;
            }
            // Fallback to system preference locally but store as concrete value
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light'; // Default fallback
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Persist preference
        localStorage.setItem('theme', theme);

    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <button
                onClick={toggleTheme}
                className="group relative flex items-center justify-center w-10 h-10 rounded-full 
                         bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 
                         shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Current theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
            >
                {/* Icons Container */}
                <div className="relative w-5 h-5 text-slate-600 dark:text-slate-300">

                    {/* Sun (Light) - Show when theme is LIGHT */}
                    <svg
                        className={`absolute inset-0 w-full h-full transition-all duration-500 transform
                        ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>

                    {/* Moon (Dark) - Show when theme is DARK */}
                    <svg
                        className={`absolute inset-0 w-full h-full transition-all duration-500 transform
                        ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>

                </div>
            </button>
        </div>
    );
}
