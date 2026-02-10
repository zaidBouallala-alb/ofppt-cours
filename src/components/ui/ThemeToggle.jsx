import React, { useState, useEffect } from 'react';

/**
 * Smart Theme Toggle
 * Cycles between: Light -> Dark -> System (Auto)
 */
export default function ThemeToggle() {
    // Initialize with stored preference or default to 'light' (since we removed system)
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Strictly add/remove 'dark' class
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Save to localStorage
        localStorage.setItem('theme', theme);

    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={toggleTheme}
                className="group relative flex items-center justify-center w-10 h-10 rounded-full 
                         bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 
                         shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
                {/* Icons Container */}
                <div className="relative w-5 h-5 text-slate-600 dark:text-slate-300">

                    {/* Sun (Show when Light) */}
                    <svg
                        className={`absolute inset-0 w-full h-full transition-all duration-300 transform
                        ${theme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>

                    {/* Moon (Show when Dark) */}
                    <svg
                        className={`absolute inset-0 w-full h-full transition-all duration-300 transform
                        ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </div>
            </button>
        </div>
    );
}
